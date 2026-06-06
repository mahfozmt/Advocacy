const https = require('https');
const fs = require('fs');
const path = require('path');

const keywords = [
    // Level 1 — SA Khatian Presumption
    "SA khatian presumption of correctness", "finally published record of rights", "record of rights presumption rebuttal", "burden to rebut SA record", "settlement record room", "presumption attached to SA khatian", "revenue record presumption", "finally published khatian", "record of rights carries presumption", "entry in record of rights not rebutted", "এস এ খতিয়ানের সঠিকতার অনুমান", "চূড়ান্ত প্রকাশিত খতিয়ান", "রেকর্ড অব রাইটস", "খতিয়ান সংশোধনের দায়", "খতিয়ানের প্রামাণিকতা", "চূড়ান্ত খতিয়ান",

    // Level 2 — Mutation / Volume Entry Does Not Create Title
    "mutation does not confer title", "mutation entry no title", "revenue entry does not create ownership", "mutation proceeding fiscal purpose", "volume entry no evidentiary value", "revenue record not title document", "mutation cannot override title", "নামজারি স্বত্ব সৃষ্টি করে না", "মিউটেশন স্বত্বের প্রমাণ নয়", "ভলিউম এন্ট্রি", "রাজস্ব রেকর্ড", "নামজারি কেবল রাজস্ব উদ্দেশ্যে",

    // Level 3 — Misc Case Cannot Decide Title
    "miscellaneous case cannot decide title", "title dispute requires title suit", "declaration of title by civil suit", "misc case no decree", "misc proceeding not adjudication of title", "order not decree", "specific relief act section 42 title", "মিস মোকদ্দমায় স্বত্ব নির্ধারণ হয় না", "স্বত্ব ঘোষণা মামলা", "ডিক্রি বনাম আদেশ", "মিস কেসে ডিক্রি হয় না",

    // Level 4 — Absence of Best Evidence
    "adverse inference withholding document", "failure to produce certified copy", "best evidence rule", "non production of document adverse inference", "section 114(g) evidence act", "suppression of best evidence", "সেরা সাক্ষ্য গোপন", "প্রতিকূল অনুমান", "নথি গোপন", "সার্টিফায়েড কপি দাখিল না করা",

    // Level 5 — Non-joinder / Hotchpot
    "partial partition maintainable", "co sharer partition of part property", "non joinder government partition suit", "government not necessary party", "hotchpot partition suit", "separate khatian separate tenancy", "আংশিক বাটোয়ারা", "পৃথক খতিয়ান", "সরকার আবশ্যকীয় পক্ষ নয়", "হচপট",

    // Level 6 — Court of Wards / Estate Recognition
    "court of wards recognition of tenant", "estate return recognition of tenant", "zamindar return accepted by state", "state acquisition return tenant", "record prepared from landlord return", "tenant recognised by estate", "কোর্ট অব ওয়ার্ডস", "জমিদার রিটার্ন", "রাষ্ট্র কর্তৃক স্বীকৃত প্রজা", "রিটার্নে নাম",

    // Level 7 — Notice Mandatory Before Correction
    "correction without notice void", "mutation without notice", "natural justice revenue proceeding", "record correction notice hearing", "alteration without notice illegal", "নোটিশ ছাড়া সংশোধন", "শুনানি ছাড়া নামজারি", "ন্যাচারাল জাস্টিস", "রেকর্ড সংশোধন",

    // Core Legacy / Volume keywords (keep at end because they yield huge results)
    "69700", "পত্তন", "খাস খতিয়ান", "ভারত সম্রাট",
    "Dhaka Nawab", "Nawab Estate", "Court of Wards", "Chief Manager", "khas mahal", 
    "cs khas", "cadastral survey", "2 no khas katiyan", "kabuliyot", "kabuliyat", "kobuliyat", "koboliat",
    "patta", "pattan", "rent roll", "state acquisition and tenancy act", "sata", "act, 1950", "sa act", "SAT Act", "cs", "SA", "S.A."
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
    
    // Track already downloaded case IDs to prevent duplicates across keywords
    const downloadedCaseIds = new Set();
    const existingFiles = fs.readdirSync(resourceDir);
    for (const file of existingFiles) {
        const match = file.match(/^case_(\d+)/);
        if (match) {
            downloadedCaseIds.add(parseInt(match[1]));
        }
    }
    console.log(`Loaded ${downloadedCaseIds.size} existing cases to skip duplicates.`);
    
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
                
                if (downloadedCaseIds.has(item.Id)) {
                    continue;
                }
                
                const safeKw = sanitizeKeyword(keyword);
                const caseFile = path.join(resourceDir, `case_${item.Id}_${safeKw}.json`);
                
                if (!fs.existsSync(caseFile)) {
                    item._scraped_keyword = keyword;
                    fs.writeFileSync(caseFile, JSON.stringify(item, null, 2), 'utf8');
                    downloadedCaseIds.add(item.Id);
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
