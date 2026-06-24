const https = require('https');
const fs = require('fs');
const path = require('path');

const resourceDir = path.join('F:', 'Mahfoz', 'Advocacy', 'Resource', 'Judgements');
const stateFile = path.join(__dirname, 'batch_4_state.json');

if (!fs.existsSync(resourceDir)) {
    fs.mkdirSync(resourceDir, { recursive: true });
}

let fetchState = {};
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

const batch4Queries = [
    { anykey: 'revenue officer cannot decide title', MoreOne: 'title' },
    { anykey: 'mutation authority cannot decide title', MoreOne: 'mutation' },
    { anykey: 'adjudication of title', MoreOne: 'revenue officer' },
    { anykey: 'collector cannot decide title', MoreOne: 'mutation' }
];

async function run() {
    const existingFiles = fs.readdirSync(resourceDir);
    let totalSaved = 0;

    for (let i = 0; i < batch4Queries.length; i++) {
        const query = batch4Queries[i];
        const queryId = `query_${i}`;
        
        if (!fetchState[queryId]) {
            fetchState[queryId] = { last_page: 0, completed: false };
        }

        if (fetchState[queryId].completed) {
            console.log(`Skipping query ${i+1}/${batch4Queries.length}: ${query.anykey} (Already completed)`);
            continue;
        }

        console.log(`\n--- Starting Query ${i+1}/${batch4Queries.length}: anykey="${query.anykey}", MoreOne="${query.MoreOne}" ---`);
        let pageNo = fetchState[queryId].last_page + 1;
        let consecutiveErrors = 0;

        while (true) {
            console.log(`Fetching Page ${pageNo}...`);
            let response;
            try {
                const encodedAnykey = encodeURIComponent(query.anykey);
                const encodedMoreOne = encodeURIComponent(query.MoreOne);
                response = await postRequest(
                    "https://api.lcmsbd.com/Api/LoadJudgements",
                    `page_no=${pageNo}&getFullData=false&para_id=1&anykey=${encodedAnykey}&MoreOne=${encodedMoreOne}`
                );
                consecutiveErrors = 0;
            } catch (err) {
                console.log(`  [!] Error fetching page ${pageNo}: ${err.message}`);
                consecutiveErrors++;
                if (consecutiveErrors >= 3) {
                    console.log("  Too many consecutive errors. Moving to next query.");
                    break;
                }
                await delay(3000);
                continue;
            }

            if (!response || !response.result || !response.result.fulldatas || response.result.fulldatas.length === 0) {
                console.log("  No more results. Marking query completed.");
                fetchState[queryId].completed = true;
                fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));
                break;
            }

            const items = response.result.fulldatas;
            console.log(`  Found ${items.length} judgments on page ${pageNo}`);

            for (const item of items) {
                if (!item.full_judgment || item.full_judgment.trim().length === 0) {
                    continue;
                }

                const filenameSafeAnykey = query.anykey.replace(/ /g, '_');
                const caseFile = path.join(resourceDir, `case_${item.Id}_batch4_${filenameSafeAnykey}.json`);
                let localItem = item;

                let matchedFile = existingFiles.find(f => f.startsWith(`case_${item.Id}_`));
                let filepath = matchedFile ? path.join(resourceDir, matchedFile) : caseFile;

                if (fs.existsSync(filepath)) {
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
                    console.log(`    -> Case ${item.Id} saved with ${justiceNames.length} justices and casetype: ${caseTypeName}`);
                    totalSaved++;
                    await delay(300);
                }
            }

            fetchState[queryId].last_page = pageNo;
            fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));

            if (items.length < 10) {
                console.log("  Last page reached. Marking query completed.");
                fetchState[queryId].completed = true;
                fs.writeFileSync(stateFile, JSON.stringify(fetchState, null, 2));
                break;
            }

            pageNo++;
            await delay(1000);
        }
    }

    console.log(`\nBatch-4 Search finished. Total enriched: ${totalSaved}`);
}

run().catch(console.error);
