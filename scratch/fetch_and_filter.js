const https = require('https');
const fs = require('fs');
const path = require('path');

const keywords = [
    "SA", "S.A.", "patta", "pattan", "kabuliyot", "kabuliyat", 
    "Dhaka Nawab State", "Dhaka Nowab State"
];

const categoryKeywords = {
    "Partition suits": ["partition", "batoara"],
    "Land survey/record-of-rights disputes": ["survey", "record of right", "record-of-right", "khatian"],
    "Tenancy and raiyati rights cases": ["tenancy", "raiyat", "korfa"],
    "State Acquisition and Tenancy Act": ["state acquisition", "tenancy act"],
    "Diluvion, vesting, khas land": ["diluvion", "alluvion", "vesting", "vested", "khas"],
    "Family/inheritance cases involving immovable property": ["inheritance", "succession", "heir", "immovable property"]
};

const url = "https://api.lcmsbd.com/Api/LoadJudgements";

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,bn;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://bdlawreference.com",
    "referer": "https://bdlawreference.com/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36"
};

function fetchPage(keyword, pageNo) {
    return new Promise((resolve, reject) => {
        const postData = `page_no=${pageNo}&getFullData=false&para_id=1&anykey=${encodeURIComponent(keyword)}`;
        
        const options = {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json);
                } catch (e) {
                    resolve(null); // Ignore parse errors, maybe end of data or server issue
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    const allCases = new Map();

    for (const keyword of keywords) {
        console.log(`\nFetching for keyword: ${keyword}`);
        let pageNo = 1;
        
        while (true) {
            console.log(`  Page ${pageNo}...`);
            const response = await fetchPage(keyword, pageNo);
            
            if (!response || !response.result || !response.result.fulldatas || response.result.fulldatas.length === 0) {
                console.log(`  No more results for ${keyword}.`);
                break;
            }

            const items = response.result.fulldatas;
            let addedCount = 0;
            for (const item of items) {
                if (!allCases.has(item.Id)) {
                    allCases.set(item.Id, item);
                    addedCount++;
                }
            }
            console.log(`  Added ${addedCount} new cases (total from page: ${items.length})`);
            
            if (items.length < 10) { // Assuming page size is 10 or more. If less, it's the last page.
                break;
            }
            
            pageNo++;
            await delay(500); // Politely delay between requests
        }
    }

    console.log(`\nTotal unique cases fetched: ${allCases.size}`);

    // Process and filter cases
    const relevantCases = [];

    for (const [id, item] of allCases.entries()) {
        const text = (item.full_judgment || "") + " " + (item.summery || "");
        const lowerText = text.toLowerCase();

        // 1. Check if it actually contains any of the target 8 keywords
        const matchedPrimary = keywords.filter(kw => lowerText.includes(kw.toLowerCase()));
        
        // 2. Check which categories it falls into
        const matchedCategories = [];
        for (const [catName, catKeywords] of Object.entries(categoryKeywords)) {
            if (catKeywords.some(catKw => lowerText.includes(catKw))) {
                matchedCategories.push(catName);
            }
        }

        if (matchedPrimary.length > 0 && matchedCategories.length > 0) {
            relevantCases.push({
                Id: item.Id,
                caseno: item.caseno,
                book_ref: item.book_ref,
                parties: item.parties,
                jud_year: item.jud_year,
                primary_matches: matchedPrimary,
                categories: matchedCategories
            });
        }
    }

    console.log(`Cases matching both primary keywords and categories: ${relevantCases.length}`);

    // Generate Markdown report
    let md = `# Relevant Judgements for Property & Land Disputes\n\n`;
    md += `Total unique cases evaluated: ${allCases.size}\n`;
    md += `Cases matching criteria: ${relevantCases.length}\n\n`;

    for (const c of relevantCases) {
        md += `### Case: ${c.caseno || 'N/A'}\n`;
        if (c.parties) md += `**Parties:** ${c.parties}\n`;
        if (c.book_ref) md += `**Reference:** ${c.book_ref}\n`;
        if (c.jud_year) md += `**Year:** ${c.jud_year}\n`;
        md += `**Matched Keywords:** ${c.primary_matches.join(', ')}\n`;
        md += `**Categories:**\n`;
        for (const cat of c.categories) {
            md += `- ${cat}\n`;
        }
        md += `\n---\n\n`;
    }

    const outputPath = path.join(__dirname, 'relevant_cases.md');
    fs.writeFileSync(outputPath, md, 'utf-8');
    console.log(`\nReport generated at: ${outputPath}`);
}

run().catch(console.error);
