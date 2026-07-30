const fs = require('fs');
const path = require('path');

const localResourceDir = path.join(__dirname, '..', 'Resource', 'Judgements');
const outputFilePath = path.join(__dirname, '..', 'Output', 'Targeted_Case_Research_v58.md');

let cases = new Map();

function loadBatchedCases() {
    const files = fs.readdirSync(localResourceDir);
    for (const file of files) {
        if (file.endsWith('.json') && file.startsWith('batch_')) {
            try {
                const data = JSON.parse(fs.readFileSync(path.join(localResourceDir, file), 'utf8'));
                if (Array.isArray(data)) {
                    for (const item of data) {
                        if (item.Id) cases.set(item.Id, item);
                    }
                }
            } catch (e) {}
        }
    }
}

// Searching for highly specific factual matches based on Stage 2 requirements
const searchTargets = [
    { name: "Failure to Produce Parent Order / Decree", terms: [/parent order/i, /failure to produce.*decree/i, /certified copy.*not produced/i, /suppression of.*document/i] },
    { name: "Mutation Creates No Title", terms: [/mutation.*no title/i, /mutation.*does not create/i, /revenue record.*not document of title/i] },
    { name: "Misc Case Cannot Decide Title", terms: [/misc case.*cannot decide title/i, /miscellaneous proceeding.*title/i, /summary proceeding.*title/i] },
    { name: "Burden Remains on Challenger of Record", terms: [/burden.*challeng/i, /onus.*challeng/i, /presumption of correctness.*rebut/i] },
    { name: "Adverse Inference (114g)", terms: [/adverse inference/i, /114\(g\)/i, /withholding.*evidence/i] },
    { name: "Administrative Note vs Published Record", terms: [/margin note/i, /volume note/i, /administrative order.*finally published/i] },
    { name: "Correction Without Notice / Jurisdiction Void", terms: [/correction.*without notice/i, /void ab initio/i, /without jurisdiction/i, /ex-parte.*void/i] }
];

function run() {
    loadBatchedCases();
    let results = {};
    searchTargets.forEach(st => results[st.name] = []);

    cases.forEach(c => {
        const text = (c.full_judgment || "").toLowerCase();

        searchTargets.forEach(st => {
            for (const term of st.terms) {
                if (term.test(text)) {
                    // Extract snippet
                    const match = text.match(term);
                    let snippet = text.substring(Math.max(0, match.index - 200), Math.min(text.length, match.index + 200)).replace(/\s+/g, ' ');

                    results[st.name].push({
                        ref: c.book_ref || c.caseno || 'N/A',
                        parties: (c.parties || 'N/A').replace(/\s+/g, ' '),
                        court: c.case_type_name || '',
                        snippet: "..." + snippet + "..."
                    });
                    break;
                }
            }
        });
    });

    let md = `# Targeted Case Research (v58)\n\n`;
    md += `This document contains targeted authorities attacking the specific findings of the Trial Court.\n\n`;

    for (const [category, matches] of Object.entries(results)) {
        md += `## ${category}\n\n`;
        // Sort to prefer Appellate Division or AD in text
        matches.sort((a, b) => {
             const aAD = a.court.toLowerCase().includes('appellate') ? 1 : 0;
             const bAD = b.court.toLowerCase().includes('appellate') ? 1 : 0;
             return bAD - aAD;
        });

        matches.slice(0, 5).forEach((m, idx) => {
            md += `### [${idx + 1}] ${m.ref}\n`;
            md += `- **Parties:** ${m.parties}\n`;
            md += `- **Court:** ${m.court}\n`;
            md += `- **Context Snippet:** > *"${m.snippet}"*\n\n`;
        });

        if (matches.length === 0) {
            md += `*(No direct textual matches found in the current batched DB for this exact phrasing, but general principles apply).* \n\n`;
        }
    }

    fs.writeFileSync(outputFilePath, md, 'utf8');
    console.log("Targeted Case Research generated successfully.");
}

run();
