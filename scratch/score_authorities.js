const fs = require('fs');
const path = require('path');

const localResourceDir = path.join(__dirname, '..', 'Resource', 'Judgements');
const outputFilePath = path.join(__dirname, '..', 'Top_Authorities_v57.md');

let cases = new Map();

function loadBatchedCases() {
    console.log("Scanning batched files...");
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
            } catch (e) {
                console.error(`Error reading file ${file}:`, e.message);
            }
        }
    }
    console.log(`Loaded ${cases.size} unique cases for scoring.`);
}

function calculateScore(c) {
    let score = 0;
    let factors = [];

    const court = (c.case_type_name || "").toLowerCase();
    const justices = c.justice_names || [];
    const judText = (c.full_judgment || "").toLowerCase();
    const theories = c.theories || [c.theory];

    // Appellate Division = +10
    if (court.includes('appellate') || court.includes('ad')) {
        score += 10;
        factors.push("Appellate Division (+10)");
    } else if (court.includes('high court') || court.includes('hcd')) {
        score += 3; // base HCD score to differentiate from random
        factors.push("High Court Division (+3)");
    }

    // Five Judge Bench = +8
    if (justices.length >= 5) {
        score += 8;
        factors.push("Five Judge Bench (+8)");
    } else if (justices.length >= 3) {
        score += 4;
        factors.push("Full Bench (+4)");
    }

    // Section 144A = +7
    if (theories.includes("SA_PRESUMPTION") || judText.includes("144a") || judText.includes("144-a")) {
        score += 7;
        factors.push("Section 144A (+7)");
    }

    // Mutation No Title = +7
    if (theories.includes("MUTATION_DOES_NOT_CREATE_TITLE") || (judText.includes("mutation") && judText.includes("no title"))) {
        score += 7;
        factors.push("Mutation No Title (+7)");
    }

    // Misc Case No Title = +7
    if (theories.includes("MISC_CASE_CANNOT_DECIDE_TITLE") || (judText.includes("misc case") && judText.includes("title"))) {
        score += 7;
        factors.push("Misc Case No Title (+7)");
    }

    // Void Record Correction = +7
    if (theories.includes("RECORD_CORRECTION") || judText.includes("correction without notice") || judText.includes("void ab initio")) {
        score += 7;
        factors.push("Void Record Correction (+7)");
    }

    // Burden of Proof = +6
    if (theories.includes("BURDEN_OF_PROOF") || judText.includes("burden of proof") || judText.includes("section 103")) {
        score += 6;
        factors.push("Burden of Proof (+6)");
    }

    // Adverse Inference = +5
    if (theories.includes("ABSENCE_OF_BEST_EVIDENCE") || judText.includes("adverse inference") || judText.includes("114(g)")) {
        score += 5;
        factors.push("Adverse Inference (+5)");
    }

    // Partition = +5
    if (theories.includes("PARTITION") || judText.includes("partition suit")) {
        score += 5;
        factors.push("Partition (+5)");
    }

    // Government Not Necessary Party = +5
    if (judText.includes("government not necessary party") || judText.includes("non joinder") && judText.includes("government")) {
        score += 5;
        factors.push("Government Not Necessary Party (+5)");
    }

    // Direct Fact Match = +10 (approximation based on relevant concepts clustering)
    if (theories.includes("SA_PRESUMPTION") && theories.includes("MUTATION_DOES_NOT_CREATE_TITLE") && theories.includes("MISC_CASE_CANNOT_DECIDE_TITLE")) {
        score += 10;
        factors.push("Direct Fact Match Cluster (+10)");
    } else {
        // Pseudo direct-fact logic
        let factMatches = 0;
        if (judText.includes("ac land")) factMatches++;
        if (judText.includes("s.a. khatian") || judText.includes("sa khatian")) factMatches++;
        if (judText.includes("different ink")) factMatches++;
        if (judText.includes("record room")) factMatches++;

        if (factMatches >= 3) {
            score += 10;
            factors.push("Direct Fact Match Keyword Cluster (+10)");
        }
    }

    return { score, factors };
}

function run() {
    loadBatchedCases();

    let scoredCases = [];

    cases.forEach(c => {
        const { score, factors } = calculateScore(c);
        if (score > 0) {
            scoredCases.push({
                ...c,
                totalScore: score,
                scoringFactors: factors
            });
        }
    });

    // Sort descending by score
    scoredCases.sort((a, b) => b.totalScore - a.totalScore);

    let md = `# Top Authorities (v57)\n\n`;
    md += `This document contains the mathematically ranked authorities based on the scoring criteria for **Appeal No. 38/2026**.\n\n`;

    // Take top 50
    scoredCases.slice(0, 50).forEach((c, idx) => {
        const cleanParties = (c.parties || 'N/A').replace(/\r/g, ' ').replace(/\n/g, ' ').trim();
        const cleanRef = (c.book_ref || 'N/A').trim();
        const cleanCase = (c.caseno || 'N/A').trim();
        const court = c.case_type_name || 'N/A';

        md += `### [${idx + 1}] Score: ${c.totalScore} | ${cleanRef !== 'N/A' && cleanRef !== '' ? cleanRef : cleanCase}\n`;
        md += `- **Parties:** *${cleanParties}*\n`;
        md += `- **Court:** ${court}\n`;
        md += `- **Factors:** ${c.scoringFactors.join(', ')}\n`;
        md += `- **Theories:** ${(c.theories || []).join(', ')}\n`;
        md += `---\n\n`;
    });

    fs.writeFileSync(outputFilePath, md, 'utf-8');
    console.log(`Successfully wrote Top Authorities to: ${outputFilePath}`);
}

run();
