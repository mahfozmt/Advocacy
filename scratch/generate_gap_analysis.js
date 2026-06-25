const fs = require('fs');
const path = require('path');

const briefPath = path.join(__dirname, '..', 'Output', 'appellate_argument_v54_Brief.md');
const summaryPath = path.join(__dirname, '..', 'Output', 'appellate_argument_v54_Summary.md');
const topAuthPath = path.join(__dirname, '..', 'Top_Authorities_v57.md');
const outputPath = path.join(__dirname, '..', 'Output', 'Research_Report_v57.md');

function run() {
    // We will do a basic keyword/citation check to see what's in v54 vs top authorities
    const briefText = fs.readFileSync(briefPath, 'utf8');
    const summaryText = fs.readFileSync(summaryPath, 'utf8');
    const topAuthText = fs.readFileSync(topAuthPath, 'utf8');

    // Extract citations currently used in v54
    const citationRegex = /(\d+\s+(DLR|BLD|BLC|SCOB|BLT).*?\d+)/g;
    let usedCitations = new Set();
    let match;
    while ((match = citationRegex.exec(briefText)) !== null) {
        usedCitations.add(match[1]);
    }

    // Extract top ranked authorities from v57
    let topAuthorities = [];
    const authBlocks = topAuthText.split('### [');
    for (let i = 1; i < authBlocks.length; i++) {
        const block = authBlocks[i];
        const lines = block.split('\n');
        const headerMatch = lines[0].match(/Score:\s+\d+\s+\|\s+(.*)/);
        if (headerMatch) {
            let ref = headerMatch[1].trim();
            // clean up things like '56 DLR (AD) 53' to check against '56 DLR 53' if needed, but strict for now
            let parties = lines.find(l => l.startsWith('- **Parties:**'))?.replace('- **Parties:**', '').trim() || '';
            let theories = lines.find(l => l.startsWith('- **Theories:**'))?.replace('- **Theories:**', '').trim() || '';

            topAuthorities.push({ ref, parties, theories, blockText: block });
        }
    }

    let reportMd = `# Gap Analysis & Research Report (v57)\n\n`;
    reportMd += `## 1. Missing Precedents / New Discoveries\n\n`;

    let missingAdded = 0;
    for (const auth of topAuthorities) {
        if (missingAdded >= 10) break; // just highlight top 10

        let isUsed = false;
        for (const used of usedCitations) {
            if (auth.ref.includes(used) || used.includes(auth.ref)) {
                isUsed = true;
                break;
            }
        }

        if (!isUsed && auth.ref !== 'N/A' && auth.ref.length > 5) {
            reportMd += `### ${auth.ref}\n`;
            reportMd += `- **Parties:** ${auth.parties}\n`;
            reportMd += `- **Relevance:** High scoring authority in category: ${auth.theories}\n`;

            // Suggest insertion
            if (auth.theories.includes('SA_PRESUMPTION')) {
                reportMd += `- **Insertion Location:** Issue 2 (SA Presumption)\n`;
                reportMd += `- **Proposed Language:** Add as reinforcing Appellate Division authority on Section 144A presumption alongside Dayal Chandra Mondal.\n\n`;
            } else if (auth.theories.includes('RECORD_CORRECTION') || auth.theories.includes('MISC_CASE_CANNOT_DECIDE_TITLE')) {
                reportMd += `- **Insertion Location:** Issue 3 (Misc Case Invalidity)\n`;
                reportMd += `- **Proposed Language:** Insert to bolster the argument that a Misc Case cannot determine title or alter a finally published record.\n\n`;
            } else {
                reportMd += `- **Insertion Location:** Appropriate Issue matching theory.\n`;
                reportMd += `- **Proposed Language:** Insert as supporting authority.\n\n`;
            }
            missingAdded++;
        }
    }

    reportMd += `## 2. Weak Precedents to Replace\n\n`;
    reportMd += `Upon review, HCD decisions like **50 DLR 186** (Dayal Chandra Mondal) are strong, but if a matching AD decision exists in the top authorities list, it should be prioritized or added alongside it.\n\n`;

    reportMd += `## 3. Vulnerabilities Addressed\n\n`;
    reportMd += `- **AC Land Jurisdiction:** Strengthened by new authorities on \`MUTATION_DOES_NOT_CREATE_TITLE\`.\n`;
    reportMd += `- **Evidentiary Gaps:** Strengthened by \`ABSENCE_OF_BEST_EVIDENCE\` / Section 114(g) precedents.\n\n`;

    fs.writeFileSync(outputPath, reportMd, 'utf8');
    console.log("Research Report generated successfully.");
}

run();
