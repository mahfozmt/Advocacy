// Upgraded case-law harvester for Appeal No. 38/2026 (Partition Suit 66/2016), Tangail.
// Pipeline (see scratch/README_case38_upgrade.md for findings that justify this design):
//   Phase 1 (discovery): Api/LoadJudgements with expanded keyword list -> candidate case Ids (no keyword misses full corpus,
//            but LoadJudgements alone only gives a search-relevance snippet, not the whole judgment).
//   Phase 2 (retrieval): Api/CopyJudgment?judid=<Id> per unique candidate Id -> guaranteed COMPLETE, clean full_judgment text,
//            independent of which keyword found it. No login required for either endpoint.
// Output: one clean case_<Id>.json per case in OUTPUT_DIR, tagged with the theory/keyword(s) that surfaced it.
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'Resource', 'Judgements_Appeal38_2026');
const STATE_FILE = path.join(__dirname, 'fetch_case38_state.json');
const REQUEST_DELAY_MS = 1000; // ~1 req/sec, politeness-first per instruction
const MAX_PAGES_PER_KEYWORD = 30; // safety cap; logged if hit

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,bn;q=0.8",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://bdlawreference.com",
    "referer": "https://bdlawreference.com/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36"
};

// --- Existing theories (Levels 1-7, carried over from scratch/fetch_and_store.js) ---
// --- New theories (Levels 8-13) derived independently from Output/appellate_argument_v94_Brief.md,
//     covering arguments raised there that the old keyword list did not target. ---
const KEYWORD_GROUPS = [
    {
        theory: "L1_SA_KHATIAN_PRESUMPTION",
        anykeys: ["SA khatian presumption of correctness", "finally published record of rights", "record of rights presumption rebuttal", "burden to rebut SA record", "settlement record room", "presumption attached to SA khatian", "revenue record presumption", "finally published khatian", "record of rights carries presumption", "entry in record of rights not rebutted", "এস এ খতিয়ানের সঠিকতার অনুমান", "চূড়ান্ত প্রকাশিত খতিয়ান", "রেকর্ড অব রাইটস", "খতিয়ান সংশোধনের দায়", "খতিয়ানের প্রামাণিকতা", "চূড়ান্ত খতিয়ান"]
    },
    {
        theory: "L2_MUTATION_NO_TITLE",
        anykeys: ["mutation does not confer title", "mutation entry no title", "revenue entry does not create ownership", "mutation proceeding fiscal purpose", "volume entry no evidentiary value", "revenue record not title document", "mutation cannot override title", "নামজারি স্বত্ব সৃষ্টি করে না", "মিউটেশন স্বত্বের প্রমাণ নয়", "ভলিউম এন্ট্রি", "রাজস্ব রেকর্ড", "নামজারি কেবল রাজস্ব উদ্দেশ্যে"]
    },
    {
        theory: "L3_MISC_CASE_NO_TITLE_ADJUDICATION",
        anykeys: ["miscellaneous case cannot decide title", "title dispute requires title suit", "declaration of title by civil suit", "misc case no decree", "misc proceeding not adjudication of title", "order not decree", "specific relief act section 42 title", "মিস মোকদ্দমায় স্বত্ব নির্ধারণ হয় না", "স্বত্ব ঘোষণা মামলা", "ডিক্রি বনাম আদেশ", "মিস কেসে ডিক্রি হয় না"]
    },
    {
        theory: "L4_ADVERSE_INFERENCE_BEST_EVIDENCE",
        anykeys: ["adverse inference withholding document", "failure to produce certified copy", "best evidence rule", "non production of document adverse inference", "section 114(g) evidence act", "suppression of best evidence", "সেরা সাক্ষ্য গোপন", "প্রতিকূল অনুমান", "নথি গোপন", "সার্টিফায়েড কপি দাখিল না করা"]
    },
    {
        theory: "L5_HOTCHPOT_NONJOINDER_PARTITION",
        anykeys: ["partial partition maintainable", "co sharer partition of part property", "non joinder government partition suit", "government not necessary party", "hotchpot partition suit", "separate khatian separate tenancy", "আংশিক বাটোয়ারা", "পৃথক খতিয়ান", "সরকার আবশ্যকীয় পক্ষ নয়", "হচপট"]
    },
    {
        theory: "L6_COURT_OF_WARDS_ESTATE",
        anykeys: ["court of wards recognition of tenant", "estate return recognition of tenant", "zamindar return accepted by state", "state acquisition return tenant", "record prepared from landlord return", "tenant recognised by estate", "কোর্ট অব ওয়ার্ডস", "জমিদার রিটার্ন", "রাষ্ট্র কর্তৃক স্বীকৃত প্রজা", "রিটার্নে নাম"]
    },
    {
        theory: "L7_NOTICE_MANDATORY_CORRECTION",
        anykeys: ["correction without notice void", "mutation without notice", "natural justice revenue proceeding", "record correction notice hearing", "alteration without notice illegal", "নোটিশ ছাড়া সংশোধন", "শুনানি ছাড়া নামজারি", "ন্যাচারাল জাস্টিস", "রেকর্ড সংশোধন"]
    },
    // --- New: Level 8 - SAT Act 145A/145F Land Survey Tribunal jurisdiction bar (raised as threshold issue in v94, not searched before) ---
    {
        theory: "L8_LST_JURISDICTION_BAR",
        anykeys: ["land survey tribunal jurisdiction", "section 145A state acquisition tenancy act", "section 145F civil court jurisdiction barred", "last revised record of rights suit tribunal", "civil court bars jurisdiction survey tribunal", "ভূমি জরিপ ট্রাইব্যুনাল এখতিয়ার", "১৪৫ক ধারা", "১৪৫চ ধারা দেওয়ানী আদালতের এখতিয়ার রহিত", "সর্বশেষ সংশোধিত রেকর্ড অব রাইটস মামলা"]
    },
    // --- New: Level 9 - Compromise/solenama by one defendant, effect on co-defendants ---
    {
        theory: "L9_COMPROMISE_CODEFENDANT_EFFECT",
        anykeys: ["solenama compromise decree partition", "compromise petition one defendant effect on others", "admission by one defendant not binding co-defendants", "consent decree partition suit binding", "সোলেনামা আপোষ মীমাংসা বাটোয়ারা", "একজন বিবাদীর স্বীকৃতি অন্যান্যদের বাধ্যকর নয়"]
    },
    // --- New: Level 10 - Approbate/reprobate, estoppel against own inconsistent document ---
    {
        theory: "L10_APPROBATE_REPROBATE_ESTOPPEL",
        anykeys: ["approbate and reprobate", "party cannot blow hot and cold", "estoppel inconsistent stand own document", "registered deed contradicts own case", "নিজের দলিলের সঙ্গে অসামঞ্জস্যপূর্ণ দাবি", "একই সঙ্গে দুই বিপরীত অবস্থান গ্রহণ করা যায় না"]
    },
    // --- New: Level 11 - Subsequent registered transaction as corroboration of recorded tenancy ---
    {
        theory: "L11_SUBSEQUENT_DEED_CORROBORATION",
        anykeys: ["subsequent registered deed corroborates record of rights", "registered transaction consistent with SA record", "recorded tenant subsequent transfer evidentiary value", "রেকর্ডীয় স্বত্বের সমর্থনে পরবর্তী নিবন্ধিত দলিল"]
    },
    // --- New: Level 12 - Genealogy/heirship does not by itself identify the disputed specific holding ---
    {
        theory: "L12_GENEALOGY_NOT_HOLDING_IDENTIFICATION",
        anykeys: ["heirship does not prove title to specific plot", "genealogy alone insufficient identification of holding", "proof of relationship not proof of title to disputed land", "উত্তরাধিকার প্রমাণিত হইলেই নির্দিষ্ট দাগের স্বত্ব প্রমাণ হয় না", "বংশতালিকা প্রমাণই নির্দিষ্ট সম্পত্তি সনাক্তকরণ নহে"]
    },
    // --- New: Level 13 - Direct citation lookups for authorities ALREADY relied upon in v94 brief.
    //     Priority: verify/replace any paraphrase with the true CopyJudgment full text before final filing. ---
    {
        theory: "L13_CITED_AUTHORITIES_VERIFY",
        anykeys: ["56 DLR (AD) 53", "45 DLR (AD) 124", "Nuruddin Ahmed Md Jaman", "27 BLD 544", "53 DLR 19", "29 BLC 160", "1 BLT 18", "49 DLR (AD) 15"]
    }
];

function post(url, postData) {
    return new Promise((resolve, reject) => {
        const h = { ...headers, 'Content-Length': Buffer.byteLength(postData) };
        const req = https.request(url, { method: 'POST', headers: h, timeout: 20000 }, res => {
            let d = '';
            res.on('data', c => d += c);
            res.on('end', () => {
                try { resolve(JSON.parse(d)); } catch (e) { resolve(null); }
            });
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
        req.write(postData);
        req.end();
    });
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function loadState() {
    if (fs.existsSync(STATE_FILE)) {
        try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch (e) { /* fall through */ }
    }
    return { discovery: {}, candidates: {}, fetched: {} };
}
function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

async function discoverKeyword(theory, anykey, state) {
    const key = `${theory}::${anykey}`;
    if (state.discovery[key]?.completed) return;
    let pageNo = (state.discovery[key]?.last_page || 0) + 1;
    let consecutiveErrors = 0;

    while (pageNo <= MAX_PAGES_PER_KEYWORD) {
        let resp;
        try {
            const postData = `page_no=${pageNo}&getFullData=false&para_id=1&anykey=${encodeURIComponent(anykey)}`;
            resp = await post('https://api.lcmsbd.com/Api/LoadJudgements', postData);
            consecutiveErrors = 0;
        } catch (e) {
            consecutiveErrors++;
            console.log(`  [!] error page ${pageNo} for "${anykey}": ${e.message}`);
            if (consecutiveErrors >= 3) break;
            await delay(3000);
            continue;
        }

        const items = resp?.result?.fulldatas;
        if (!items || items.length === 0) {
            state.discovery[key] = { last_page: pageNo, completed: true };
            saveState(state);
            break;
        }

        for (const item of items) {
            if (!state.candidates[item.Id]) {
                state.candidates[item.Id] = { theories: [], caseno: item.caseno, book_ref: item.book_ref, jud_year: item.jud_year, division_name: item.division_name };
            }
            if (!state.candidates[item.Id].theories.includes(theory)) {
                state.candidates[item.Id].theories.push(theory);
            }
        }

        state.discovery[key] = { last_page: pageNo, completed: items.length < 20 };
        saveState(state);
        console.log(`  [discover] ${theory} :: "${anykey}" page ${pageNo} -> ${items.length} items, candidates so far: ${Object.keys(state.candidates).length}`);

        if (items.length < 20) break;
        pageNo++;
        await delay(REQUEST_DELAY_MS);
    }
    if (pageNo > MAX_PAGES_PER_KEYWORD) {
        console.log(`  [!] hit MAX_PAGES_PER_KEYWORD cap for "${anykey}" - results beyond this page were NOT scanned.`);
    }
    await delay(REQUEST_DELAY_MS);
}

async function fetchFullJudgment(id, state) {
    if (state.fetched[id]) return;
    const outFile = path.join(OUTPUT_DIR, `case_${id}.json`);
    if (fs.existsSync(outFile)) {
        state.fetched[id] = true;
        saveState(state);
        return;
    }

    let resp;
    try {
        resp = await post(`https://api.lcmsbd.com/Api/CopyJudgment?judid=${id}`, '');
    } catch (e) {
        console.log(`  [!] CopyJudgment error for Id ${id}: ${e.message}`);
        await delay(REQUEST_DELAY_MS);
        return;
    }

    const item = resp?.result?.pdfGenerate?.[0];
    if (!item || !item.full_judgment) {
        console.log(`  [!] no full_judgment for Id ${id}, skipping (will retry next run).`);
        await delay(REQUEST_DELAY_MS);
        return;
    }

    item._theories = state.candidates[id]?.theories || [];
    fs.writeFileSync(outFile, JSON.stringify(item, null, 2), 'utf8');
    state.fetched[id] = true;
    saveState(state);
    console.log(`  [fetch] saved case_${id}.json (${item.full_judgment.length} chars, theories=${item._theories.join(',')})`);
    await delay(REQUEST_DELAY_MS);
}

async function run() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const state = loadState();

    console.log('=== interleaved: discover each theory group, then fetch its full text right away ===');
    for (const group of KEYWORD_GROUPS) {
        console.log(`\n--- Theory: ${group.theory} ---`);
        for (const anykey of group.anykeys) {
            await discoverKeyword(group.theory, anykey, state);
        }

        const pending = Object.keys(state.candidates).filter(id => !state.fetched[id]);
        console.log(`  [retrieve] ${group.theory} discovery done, ${pending.length} case(s) awaiting full text...`);
        let done = 0;
        for (const id of pending) {
            await fetchFullJudgment(id, state);
            done++;
            if (done % 25 === 0) console.log(`  progress: ${done}/${pending.length} for this group`);
        }
    }

    console.log(`\nAll done. Total candidates: ${Object.keys(state.candidates).length}, saved cases in: ${OUTPUT_DIR}`);
}

run().catch(e => console.error('FATAL:', e));
