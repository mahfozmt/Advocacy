const https = require('https');
const fs = require('fs');
const path = require('path');

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
        if (isJson) currentHeaders['content-type'] = 'application/json';
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
                try { resolve(JSON.parse(body)); } catch (e) { resolve(body); }
            });
        });

        req.on('error', (e) => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
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
        const justiceRes = await postRequest("https://api.lcmsbd.com/Api/get_justice", { id: caseId }, true);
        if (Array.isArray(justiceRes)) justiceNames = justiceRes.map(j => j.name).filter(Boolean);
    } catch (e) { }

    await delay(200);

    try {
        const casetypeRes = await postRequest("https://api.lcmsbd.com/Api/get_casetype/" + caseId, {}, true);
        if (Array.isArray(casetypeRes) && casetypeRes.length > 0) caseTypeName = casetypeRes[0].name || '';
    } catch (e) { }

    return { justiceNames, caseTypeName };
}

const searchGroups = [
    {
        theory: "FAILURE_TO_PROVE_ROOT_TITLE",
        anykeys: ["root of title not proved", "root tenancy not proved", "source of tenancy", "origin of title", "burden to prove root title", "failure to prove landlord-tenant relationship"],
        moreOnes: ["title", "patta", "kabuliyat", "landlord", "tenancy", "evidence"]
    },
    {
        theory: "STATE_RECOGNITION_OF_TENANT",
        anykeys: ["state recognized tenant", "estate acquisition recognition", "landlord return accepted", "court of wards tenant recognition", "estate return", "state acquisition record prevails"],
        moreOnes: ["recognition", "return", "acquisition", "tenant", "estate"]
    },
    {
        theory: "ORIGINAL_RECORD_VS_OFFICE_COPY",
        anykeys: ["original record prevails", "record room copy", "alteration register", "settlement record room", "working copy versus original record"],
        moreOnes: ["original", "volume", "record room", "prevail", "copy"]
    },
    {
        theory: "RENT_RECEIPT_EVIDENTIARY_VALUE",
        anykeys: ["rent receipt does not create title", "isolated rent receipt", "dakhila no title", "rent receipt vs record of rights"],
        moreOnes: ["receipt", "title", "dakhila", "evidence", "rent"]
    }
];

let existingCases = new Map();

function loadExistingCases() {
    console.log("Scanning existing files...");
    const files = fs.readdirSync(localResourceDir);
    for (const file of files) {
        if (file.endsWith('.json') && file.startsWith('batch_')) {
            try {
                const data = JSON.parse(fs.readFileSync(path.join(localResourceDir, file), 'utf8'));
                if (Array.isArray(data)) {
                    for (const item of data) {
                        if (item.Id) existingCases.set(item.Id, item);
                    }
                }
            } catch (e) { }
        }
    }
    console.log(`Loaded ${existingCases.size} existing cases.`);
}

let batchCount = 1;
let currentBatch = [];
const BATCH_SIZE = 50;

function saveBatch(force = false) {
    if (currentBatch.length >= BATCH_SIZE || (force && currentBatch.length > 0)) {
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
        for (const anykey of group.anykeys) {
            for (const moreOne of group.moreOnes) {
                console.log(`--- Search: anykey="${anykey}" | MoreOne="${moreOne}" ---`);
                let pageNo = 1;
                let consecutiveErrors = 0;

                while (true) {
                    let response;
                    try {
                        const postData = `page_no=${pageNo}&getFullData=false&para_id=1&anykey=${encodeURIComponent(anykey)}&MoreOne=${encodeURIComponent(moreOne)}`;
                        response = await postRequest("https://api.lcmsbd.com/Api/LoadJudgements", postData);
                        consecutiveErrors = 0;
                    } catch (err) {
                        consecutiveErrors++;
                        if (consecutiveErrors >= 3) break;
                        await delay(3000);
                        continue;
                    }

                    if (!response || !response.result || !response.result.fulldatas || response.result.fulldatas.length === 0) break;

                    const items = response.result.fulldatas;

                    for (const item of items) {
                        if (!item.full_judgment || item.full_judgment.trim().length === 0) continue;

                        let caseToSave = {
                            Id: item.Id, caseno: item.caseno, parties: item.parties, book_ref: item.book_ref, jud_year: item.jud_year,
                            theory: group.theory, anykey: anykey, moreOne: moreOne, full_judgment: item.full_judgment, justice_names: [], case_type_name: ""
                        };

                        if (existingCases.has(item.Id)) {
                            const existing = existingCases.get(item.Id);
                            let updated = false;
                            if (existing.full_judgment && existing.full_judgment.length < item.full_judgment.length) {
                                existing.full_judgment = item.full_judgment; updated = true;
                            }
                            if (!existing.theories) existing.theories = [];
                            if (!existing.theories.includes(group.theory)) {
                                existing.theories.push(group.theory); updated = true;
                            }
                            if (!existing.justice_names || existing.justice_names.length === 0) {
                                const { justiceNames, caseTypeName } = await enrichCase(item.Id);
                                existing.justice_names = justiceNames; existing.case_type_name = caseTypeName; updated = true;
                            }
                            if (updated) { currentBatch.push(existing); saveBatch(); }
                        } else {
                            const { justiceNames, caseTypeName } = await enrichCase(item.Id);
                            caseToSave.justice_names = justiceNames; caseToSave.case_type_name = caseTypeName; caseToSave.theories = [group.theory];
                            existingCases.set(item.Id, caseToSave); currentBatch.push(caseToSave); totalHarvested++; saveBatch();
                        }
                    }
                    if (items.length < 10) break;
                    pageNo++;
                    await delay(1000);
                }
            }
        }
    }
    saveBatch(true);
    console.log(`\nHarvesting completed. Total new cases fetched: ${totalHarvested}`);
}

run().catch(console.error);
