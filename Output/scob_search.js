const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const SCOB_DIR = "f:\\Mahfoz\\Advocacy\\Resource\\SCOB";
const OUTPUT_FILE = "f:\\Mahfoz\\Advocacy\\scratch\\scob_keyword_results.txt";

const KEYWORDS = [
    /S\.A\./i,
    /\bS\.A\b/i,
    /\bSA\s+khatian\b/i,
    /\bSA\s+record\b/i,
    /\bSA\s+plot\b/i,
    /\bSA\s+survey\b/i,
    /\bpatta\b/i,
    /\bpattan\b/i,
    /\bkabuliyot\b/i,
    /\bkabuliyat\b/i,
    /Dhaka\s+Nawab/i,
    /Dhaka\s+Nowab/i,
    /Nawab\s+Estate/i,
    /Nowab\s+Estate/i,
    /Court\s+of\s+Wards/i,
    /\bpartition\b/i,
    /\braiyat\b/i,
    /\braiyati\b/i,
    /State\s+Acquisition/i,
    /SAT\s+Act/i,
    /\bkhas\s+land\b/i,
    /\bkhasland\b/i,
    /\bdiluvion\b/i,
    /\bvesting\b/i,
    /\bhotchpot\b/i,
    /record\s+of\s+rights/i,
    /\btenancy\b/i,
    /\bestoppel\b/i,
    /adverse\s+inference/i,
    /section\s+144/i,
    /section\s+86/i,
    /\bpreemption\b/i,
    /pre\.emption/i,
];

const CIVIL_EXCLUDE = [
    /Nari\.O\.Shishu/i, /narcotics/i,
    /Administrative\s+Tribunal/i, /Customs\s+Duty/i, /Company\s+Law/i,
];

async function scanPdfs() {
    console.log("Starting scan of SCOB PDFs...");
    const files = fs.readdirSync(SCOB_DIR).filter(f => f.endsWith('.pdf'));
    let out = fs.createWriteStream(OUTPUT_FILE);

    for (let file of files) {
        console.log(`Scanning ${file}...`);
        try {
            let dataBuffer = fs.readFileSync(path.join(SCOB_DIR, file));
            let data = await pdf(dataBuffer); 
            let text = data.text;

            let isCriminal = CIVIL_EXCLUDE.some(rx => rx.test(text));
            if (isCriminal) {
                console.log(`Skipping ${file} (likely criminal or administrative)`);
                continue;
            }

            let foundKws = [];
            for (let rx of KEYWORDS) {
                if (rx.test(text)) {
                    foundKws.push(rx.source);
                }
            }

            if (foundKws.length > 0) {
                out.write(`File: ${file}\n`);
                out.write(`Matches: ${foundKws.join(', ')}\n\n`);
                console.log(`Matched ${foundKws.length} keywords in ${file}`);
            }

        } catch (e) {
            console.log(`Error parsing ${file}: ${e.message}`);
        }
    }
    
    out.close();
    console.log("Scan complete. Results saved to " + OUTPUT_FILE);
}

scanPdfs();
