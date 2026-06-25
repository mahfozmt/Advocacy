const https = require('https');
const fs = require('fs');
const path = require('path');

const resourceDir = path.join('F:', 'Mahfoz', 'Advocacy', 'Resource', 'Judgements');

// Since we are running in a linux container for testing, override resourceDir:
const localResourceDir = path.join(__dirname, '..', 'Resource', 'Judgements');

if (!fs.existsSync(localResourceDir)) {
    fs.mkdirSync(localResourceDir, { recursive: true });
}

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,bn;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://bdlawreference.com",
    "referer": "https://bdlawreference.com/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36"
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
                    resolve(body); // Sometimes it might not be JSON if error
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

const searchGroups = [
    {
        theory: "SA_PRESUMPTION",
        anykeys: [
            "SA khatian presumption", "record of rights presumption", "finally published khatian",
            "section 144A", "record of rights", "entry in record of rights",
            "presumption of correctness", "ROR presumption", "finally published record"
        ],
        moreOnes: ["144A", "record", "rights", "khatian", "settlement", "presumption"]
    },
    {
        theory: "RECORD_CORRECTION",
        anykeys: [
            "record correction", "correction of record", "khatian correction",
            "wrong entry in khatian", "correction proceeding", "143A", "section 143A"
        ],
        moreOnes: ["notice", "hearing", "correction", "settlement", "record"]
    },
    {
        theory: "MUTATION_DOES_NOT_CREATE_TITLE",
        anykeys: [
            "mutation", "mutation proceeding", "mutation entry",
            "revenue record", "name mutation", "mutation case"
        ],
        moreOnes: ["title", "ownership", "presumption", "revenue officer", "section 143"]
    },
    {
        theory: "MISC_CASE_CANNOT_DECIDE_TITLE",
        anykeys: [
            "miscellaneous case", "misc case", "misc proceeding", "miscellaneous proceeding"
        ],
        moreOnes: ["title", "declaration", "civil suit", "jurisdiction", "specific relief"]
    },
    {
        theory: "ABSENCE_OF_BEST_EVIDENCE",
        anykeys: [
            "certified copy", "best evidence", "withholding document",
            "suppression of document", "adverse inference", "section 114(g)"
        ],
        moreOnes: ["certified", "copy", "document", "evidence"]
    },
    {
        theory: "PARTITION",
        anykeys: [
            "partition suit", "partial partition", "co sharer partition",
            "hotchpot", "non joinder", "necessary party"
        ],
        moreOnes: ["partition", "co sharer", "government"]
    },
    {
        theory: "COURT_OF_WARDS_ESTATE_RECOGNITION",
        anykeys: [
            "court of wards", "estate return", "tenant recognition",
            "zamindar return", "nawab estate", "chief manager"
        ],
        moreOnes: ["tenant", "estate", "recognition", "court of wards"]
    },
    {
        theory: "FRAUDULENT_ALTERATION",
        anykeys: [
            "different ink", "interpolation", "tampering", "forged entry",
            "fraudulent correction", "alteration of khatian", "unauthorised insertion"
        ],
        moreOnes: ["record", "entry", "correction", "forgery"]
    },
    {
        theory: "BURDEN_OF_PROOF",
        anykeys: [
            "burden of proof", "onus", "section 103 evidence act",
            "initial burden", "shift of burden"
        ],
        moreOnes: ["record", "correction", "title", "proof"]
    },
    {
        theory: "TITLE_VS_REVENUE_JURISDICTION",
        anykeys: [
            "revenue authority no jurisdiction", "mutation jurisdiction",
            "title adjudication", "revenue officer not court"
        ],
        moreOnes: ["title", "jurisdiction", "revenue", "court"]
    }
];

let existingCases = new Map();

function loadExistingCases() {
    console.log("Scanning existing files...");
    const files = fs.readdirSync(localResourceDir);
    for (const file of files) {
        if (file.endsWith('.json')) {
            try {
                const data = JSON.parse(fs.readFileSync(path.join(localResourceDir, file), 'utf8'));
                // Batched files will be arrays
                if (Array.isArray(data)) {
                    for (const item of data) {
                        if (item.Id) existingCases.set(item.Id, item);
                    }
                } else {
                    if (data.Id) existingCases.set(data.Id, data);
                }
            } catch (e) {
                console.error(`Error reading existing file ${file}:`, e.message);
            }
        }
    }
    console.log(`Loaded ${existingCases.size} existing cases.`);
}

let batchCount = 1;
let currentBatch = [];
const BATCH_SIZE = 50;

function saveBatch(force = false) {
    if (currentBatch.length >= BATCH_SIZE || (force && currentBatch.length > 0)) {
        // Find next available batch number
        while (fs.existsSync(path.join(localResourceDir, `batch_${batchCount}.json`))) {
            batchCount++;
        }

        const batchPath = path.join(localResourceDir, `batch_${batchCount}.json`);
        fs.writeFileSync(batchPath, JSON.stringify(currentBatch, null, 2), 'utf8');
        console.log(`\n>>> Saved ${currentBatch.length} cases to ${batchPath}\n`);

        currentBatch = [];
        batchCount++;
    }
}

async function run() {
    loadExistingCases();
    let totalHarvested = 0;

    for (const group of searchGroups) {
        console.log(`\n======================================================`);
        console.log(`Starting Group: ${group.theory}`);
        console.log(`======================================================\n`);

        for (const anykey of group.anykeys) {
            for (const moreOne of group.moreOnes) {
                console.log(`--- Search: anykey="${anykey}" | MoreOne="${moreOne}" ---`);
                let pageNo = 1;
                let consecutiveErrors = 0;

                while (true) {
                    console.log(`    Fetching Page ${pageNo}...`);
                    let response;
                    try {
                        const postData = `page_no=${pageNo}&getFullData=false&para_id=1&anykey=${encodeURIComponent(anykey)}&MoreOne=${encodeURIComponent(moreOne)}`;
                        response = await postRequest("https://api.lcmsbd.com/Api/LoadJudgements", postData);
                        consecutiveErrors = 0;
                    } catch (err) {
                        console.log(`    [!] Error fetching page ${pageNo}: ${err.message}`);
                        consecutiveErrors++;
                        if (consecutiveErrors >= 3) {
                            console.log("    Too many consecutive errors. Moving to next combination.");
                            break;
                        }
                        await delay(3000);
                        continue;
                    }

                    if (!response || !response.result || !response.result.fulldatas || response.result.fulldatas.length === 0) {
                        console.log("    No more results for this combination.");
                        break;
                    }

                    const items = response.result.fulldatas;
                    console.log(`    Found ${items.length} judgments.`);

                    for (const item of items) {
                        if (!item.full_judgment || item.full_judgment.trim().length === 0) continue;

                        let caseToSave = {
                            Id: item.Id,
                            caseno: item.caseno,
                            parties: item.parties,
                            book_ref: item.book_ref,
                            jud_year: item.jud_year,
                            theory: group.theory,
                            anykey: anykey,
                            moreOne: moreOne,
                            full_judgment: item.full_judgment,
                            justice_names: [],
                            case_type_name: ""
                        };

                        if (existingCases.has(item.Id)) {
                            const existing = existingCases.get(item.Id);
                            let updated = false;

                            // Check if we need to update full_judgment
                            if (existing.full_judgment && existing.full_judgment.length < item.full_judgment.length) {
                                existing.full_judgment = item.full_judgment;
                                updated = true;
                                console.log(`      Updated full_judgment for Case ${item.Id}`);
                            }

                            // Add theory tags if missing
                            if (!existing.theories) existing.theories = [];
                            if (!existing.theories.includes(group.theory)) {
                                existing.theories.push(group.theory);
                                updated = true;
                            }

                            // Make sure it's enriched
                            if (!existing.justice_names || existing.justice_names.length === 0) {
                                console.log(`      Enriching existing Case ${item.Id}...`);
                                const { justiceNames, caseTypeName } = await enrichCase(item.Id);
                                existing.justice_names = justiceNames;
                                existing.case_type_name = caseTypeName;
                                updated = true;
                            }

                            if (updated) {
                                currentBatch.push(existing);
                                saveBatch();
                            } else {
                                // console.log(`      Case ${item.Id} already exists and up to date.`);
                            }
                        } else {
                            console.log(`      New Case ${item.Id}. Enriching...`);
                            const { justiceNames, caseTypeName } = await enrichCase(item.Id);
                            caseToSave.justice_names = justiceNames;
                            caseToSave.case_type_name = caseTypeName;
                            caseToSave.theories = [group.theory];

                            existingCases.set(item.Id, caseToSave);
                            currentBatch.push(caseToSave);
                            totalHarvested++;
                            saveBatch();
                        }
                    }

                    if (items.length < 10) {
                        break; // Last page
                    }

                    pageNo++;
                    await delay(1000); // Politeness delay between pages
                }
            }
        }
    }

    // Save any remaining cases in the final batch
    saveBatch(true);
    console.log(`\nHarvesting completed. Total new cases fetched: ${totalHarvested}`);
}

run().catch(console.error);
