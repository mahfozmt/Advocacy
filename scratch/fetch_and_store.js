const https = require('https');
const fs = require('fs');
const path = require('path');

const keywords = [
    // 1. Dhaka Nawab variations (priority)
    "Dhaka Nowab State", "Dhaka Nawab State", "Dhaka Nowab Estate", "Dhaka Nawab Estate",
    "Nobab", "Nawab",
    
    // 2. Kabuliyat/Patta variations
    "kabuliyot", "kabuliyat", "kobuliyat", "koboliat",
    "patta", "pattan", "rent roll",

    // 3. CS Khas variations
    "cs khas", "cadastral survey", "2 no khas katiyan",

    // 3.5 Specific Authorities / Manuals
    "Court of Wards", "Bengal Government Estate Manual (1932)", "The Government Estates Manual (1958)",
    "BTA 1885", "Bengal Tenancy",

    // 4. Hotchpot/Joinder variations
    "common hotchpot", "hotchpot", "হচপট দোষ",
    "non-joinder", "misjoinder", "পক্ষদোষ",

    // 5. Presumption & Burden of Proof
    "presumption", "sa khatian", "50 dlr 186",
    "burden of proof", "reversal",

    // 6. SA & CS variations (keep at the end due to volume/noise)
    "state acquisition and tenancy act", "sata", "act, 1950", "sa act", "SAT Act",
    "SA", "S.A.", "cs"
];

const resourceDir = path.join('F:', 'Mahfoz', 'Advocacy', 'Resource', 'Judgements');
const stateFile = path.join(__dirname, 'fetch_state.json');

// Ensure directories exist
if (!fs.existsSync(resourceDir)) {
    fs.mkdirSync(resourceDir, { recursive: true });
}

// Load previous state if exists
let fetchState = {};
if (fs.existsSync(stateFile)) {
    try {
        fetchState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch (e) {
        console.error("Error reading state file, starting fresh.");
    }
}

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
        // getFullData=false forces the server to return the full_judgment
        const postData = `page_no=${pageNo}&getFullData=false&para_id=1&anykey=${encodeURIComponent(keyword)}`;
        
        const options = {
            method: 'POST',
            timeout: 15000, 
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
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        req.write(postData);
        req.end();
    });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sanitizeKeyword(kw) {
    return kw.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

async function run() {
    console.log("Starting robust fetch process...");
    
    let totalSaved = 0;
    
    for (const keyword of keywords) {
        console.log(`\n=== Keyword: ${keyword} ===`);
        
        if (!fetchState[keyword]) {
            fetchState[keyword] = { last_page: 0, completed: false };
        }
        
        if (fetchState[keyword].completed) {
            console.log(`  Already fully downloaded. Skipping.`);
            continue;
        }

        let pageNo = fetchState[keyword].last_page + 1;
        let consecutiveErrors = 0;
        const MAX_PAGES = 50; 

        while (pageNo <= fetchState[keyword].last_page + MAX_PAGES) {
            console.log(`  Fetching Page ${pageNo}...`);
            let response;
            try {
                response = await fetchPage(keyword, pageNo);
                consecutiveErrors = 0; 
            } catch (err) {
                console.log(`  [!] Error on page ${pageNo}: ${err.message}`);
                consecutiveErrors++;
                if (consecutiveErrors >= 3) {
                    console.log(`  Too many consecutive errors. Pausing this keyword.`);
                    break;
                }
                await delay(2000);
                continue; 
            }
            
            if (!response || !response.result || !response.result.fulldatas || response.result.fulldatas.length === 0) {
                console.log(`  [+] No more results found for '${keyword}'. Marking completed.`);
                fetchState[keyword].completed = true;
                fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));
                break;
            }

            const items = response.result.fulldatas;
            let pageSavedCount = 0;
            
            for (const item of items) {
                if (!item.full_judgment || item.full_judgment.trim().length === 0) {
                    continue;
                }
                
                const safeKw = sanitizeKeyword(keyword);
                const caseFile = path.join(resourceDir, `case_${item.Id}_${safeKw}.json`);
                
                if (!fs.existsSync(caseFile)) {
                    item._scraped_keyword = keyword;
                    fs.writeFileSync(caseFile, JSON.stringify(item, null, 2), 'utf8');
                    pageSavedCount++;
                    totalSaved++;
                }
            }
            
            console.log(`    -> Saved ${pageSavedCount} new cases (total on page: ${items.length})`);
            
            fetchState[keyword].last_page = pageNo;
            fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));

            if (items.length < 10) { 
                console.log(`  [+] Last page reached for '${keyword}'. Marking completed.`);
                fetchState[keyword].completed = true;
                fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));
                break;
            }
            
            pageNo++;
            await delay(1000); 
        }
    }

    console.log(`\nProcess finished. Total new cases saved in this run: ${totalSaved}`);
    console.log(`All judgements are stored in: ${resourceDir}`);
}

run().catch(console.error);
