const https = require('https');
const fs = require('fs');
const path = require('path');

const resourceDir = path.join('F:', 'Mahfoz', 'Advocacy', 'Resource', 'Judgements');
const stateFile = path.join(__dirname, 'fetch_munsif_state.json');

// Ensure directories exist
if (!fs.existsSync(resourceDir)) {
    fs.mkdirSync(resourceDir, { recursive: true });
}

let fetchState = { last_page: 0, completed: false };
if (fs.existsSync(stateFile)) {
    try {
        fetchState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch (e) {
        console.error("Error reading state file, starting fresh.");
    }
}

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://bdlawreference.com",
    "referer": "https://bdlawreference.com/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
};

function postRequest(url, data, isJson = false) {
    return new Promise((resolve, reject) => {
        const postData = isJson ? JSON.stringify(data) : data;
        const currentHeaders = { ...headers };
        if (isJson) {
            currentHeaders['content-type'] = 'application/json';
        }
        currentHeaders['Content-Length'] = Buffer.byteLength(postData);

        const options = {
            method: 'POST',
            timeout: 15000,
            headers: currentHeaders
        };

        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.write(postData);
        req.end();
    });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch case type and justice names for a case
async function enrichCase(caseId) {
    let justiceNames = [];
    let caseTypeName = '';

    try {
        const justiceRes = await postRequest(
            "https://api.lcmsbd.com/Api/get_justice",
            { id: caseId },
            true
        );
        if (Array.isArray(justiceRes)) {
            justiceNames = justiceRes.map(j => j.name).filter(Boolean);
        }
    } catch (e) {
        console.error(`  [!] Error fetching justice for case ${caseId}: ${e.message}`);
    }

    await delay(200);

    try {
        const casetypeRes = await postRequest(
            "https://api.lcmsbd.com/Api/get_casetype/" + caseId,
            {},
            true
        );
        if (Array.isArray(casetypeRes) && casetypeRes.length > 0) {
            caseTypeName = casetypeRes[0].name || '';
        }
    } catch (e) {
        console.error(`  [!] Error fetching casetype for case ${caseId}: ${e.message}`);
    }

    return { justiceNames, caseTypeName };
}

async function run() {
    console.log("Starting scraping and enrichment of 'record correction' with 'munsif'...");
    
    // First, scan local files to know what we have
    const downloadedCaseIds = new Set();
    const existingFiles = fs.readdirSync(resourceDir);
    for (const file of existingFiles) {
        const match = file.match(/^case_(\d+)/);
        if (match) {
            downloadedCaseIds.add(parseInt(match[1]));
        }
    }
    console.log(`Loaded ${downloadedCaseIds.size} existing cases from directory.`);

    let pageNo = fetchState.last_page + 1;
    let consecutiveErrors = 0;
    let totalSaved = 0;
    
    if (fetchState.completed) {
        console.log("Scraping already completed according to state file. Checking for enrichment only.");
    } else {
        while (true) {
            console.log(`\nFetching LoadJudgements Page ${pageNo}...`);
            let response;
            try {
                response = await postRequest(
                    "https://api.lcmsbd.com/Api/LoadJudgements",
                    `page_no=${pageNo}&getFullData=false&para_id=1&anykey=record%20correction&MoreOne=munsif`
                );
                consecutiveErrors = 0;
            } catch (err) {
                console.log(`  [!] Error fetching page ${pageNo}: ${err.message}`);
                consecutiveErrors++;
                if (consecutiveErrors >= 3) {
                    console.log("  Too many consecutive errors. Stopping scraper.");
                    break;
                }
                await delay(3000);
                continue;
            }

            if (!response || !response.result || !response.result.fulldatas || response.result.fulldatas.length === 0) {
                console.log("  No more results. Marking completed.");
                fetchState.completed = true;
                fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));
                break;
            }

            const items = response.result.fulldatas;
            console.log(`  Found ${items.length} judgments on page ${pageNo}`);

            for (const item of items) {
                if (!item.full_judgment || item.full_judgment.trim().length === 0) {
                    continue;
                }

                // Check if file exists. If it does, we can read it and check if it already has enrichment
                const caseFile = path.join(resourceDir, `case_${item.Id}_record_correction_munsif.json`);
                let localItem = item;
                let exists = false;

                // Check if any file with this ID exists (might have a different keyword suffix)
                let matchedFile = existingFiles.find(f => f.startsWith(`case_${item.Id}_`));
                let filepath = matchedFile ? path.join(resourceDir, matchedFile) : caseFile;

                if (fs.existsSync(filepath)) {
                    exists = true;
                    try {
                        localItem = JSON.parse(fs.readFileSync(filepath, 'utf8'));
                    } catch (e) {
                        console.error(`  [!] Error reading existing file ${filepath}: ${e.message}`);
                    }
                }

                if (localItem.justice_names && localItem.case_type_name) {
                    console.log(`  Case ${item.Id} already enriched. Skipping API details.`);
                } else {
                    console.log(`  Enriching Case ${item.Id}...`);
                    const { justiceNames, caseTypeName } = await enrichCase(item.Id);
                    localItem.justice_names = justiceNames;
                    localItem.case_type_name = caseTypeName;
                    
                    fs.writeFileSync(filepath, JSON.stringify(localItem, null, 2), 'utf8');
                    console.log(`    -> Case ${item.Id} updated with ${justiceNames.length} justices and casetype: ${caseTypeName}`);
                    totalSaved++;
                    await delay(300);
                }
            }

            fetchState.last_page = pageNo;
            fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));

            if (items.length < 10) {
                console.log("  Last page reached. Marking completed.");
                fetchState.completed = true;
                fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));
                break;
            }

            pageNo++;
            await delay(1000);
        }
    }

    console.log(`\nScraping phase finished. Total enriched: ${totalSaved}`);
}

run().catch(console.error);
