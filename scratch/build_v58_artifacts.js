const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, '..', 'Output', 'Trial_Court_Reasoning_Map_v58.json');
const localResourceDir = path.join(__dirname, '..', 'Resource', 'Judgements');

const redTeamPath = path.join(__dirname, '..', 'Output', 'Red_Team_Analysis_v58.md');
const briefPath = path.join(__dirname, '..', 'Output', 'appellate_argument_v58_Brief.md');
const summaryPath = path.join(__dirname, '..', 'Output', 'appellate_argument_v58_Summary.md');

// Load the structured reasoning map
const reasoningMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

// Load batched cases
let harvestedCases = [];
const files = fs.readdirSync(localResourceDir);
for (const file of files) {
    if (file.endsWith('.json') && file.startsWith('batch_')) {
        try {
            const data = JSON.parse(fs.readFileSync(path.join(localResourceDir, file), 'utf8'));
            if (Array.isArray(data)) harvestedCases.push(...data);
        } catch (e) {}
    }
}

// Helper to find best matching case for a finding based on keywords
function findBestCase(keywords) {
    let bestCase = null;
    let maxScore = -1;

    harvestedCases.forEach(c => {
        const text = (c.full_judgment || "").toLowerCase();
        let score = 0;
        keywords.forEach(kw => {
            if (text.includes(kw.toLowerCase())) score++;
        });

        // Bonus for Appellate Division
        if (c.case_type_name && c.case_type_name.toLowerCase().includes('appellate')) score += 2;

        if (score > maxScore && score > 0) {
            maxScore = score;
            bestCase = c;
        }
    });
    return bestCase;
}

// Ensure the map drives the output without hardcoding
let redTeamMd = `# Red Team Analysis (v58)\n\nThis adversarial review is dynamically derived from the mapped findings in the Trial Court Judgement.\n\n`;

reasoningMap.findings.forEach((finding, idx) => {
    redTeamMd += `## Attack Point ${idx + 1}: ${finding.description}\n`;
    redTeamMd += `**Trial Court Finding (Extracted Text):**\n> "${finding.source_text_trial_court}"\n\n`;
    redTeamMd += `**Adversarial Defense:** A defense counsel would argue this logic stands because it follows the physical realities recorded in local working copies, excusing the strict documentary proof where long possession is asserted.\n\n`;
    redTeamMd += `**Destructive Rebuttal:** ${finding.vulnerability_reason}\n\n`;

    // Find supporting authority dynamically
    let keywords = [finding.type];
    if (finding.description.toLowerCase().includes("misc case")) keywords.push("misc case", "adverse inference");
    if (finding.description.toLowerCase().includes("volume")) keywords.push("margin note", "working copy");

    const bestCase = findBestCase(keywords);
    if (bestCase) {
        redTeamMd += `**Counter-Authority from Repository:** ${bestCase.book_ref || bestCase.caseno} (${bestCase.parties}) - ${bestCase.case_type_name}\n`;
    }
    redTeamMd += `---\n\n`;
});

fs.writeFileSync(redTeamPath, redTeamMd, 'utf8');

// Generate the Appellate Argument Brief
let briefMd = `# appellate_argument_v58_Brief.md\n\n## Introduction\nThe Trial Court's judgment must be set aside as it relies on legally unsustainable reasoning, reversed burdens, and the explicit ignorance of material evidence.\n\n`;

reasoningMap.findings.forEach((finding, idx) => {
    briefMd += `### Issue ${idx + 1}: The Court's Finding on ${finding.type.toUpperCase()}\n`;
    briefMd += `**The Court Held:**\n> "${finding.source_text_trial_court}"\n\n`;
    briefMd += `**Appellate Refutation:**\n${finding.vulnerability_reason}\n\n`;

    if (finding.source_text_appeal_memo && finding.source_text_appeal_memo.length > 30) {
         briefMd += `**Alignment with Appeal Memo:**\n> "${finding.source_text_appeal_memo}"\n\n`;
    }

    let keywords = [finding.type];
    if (finding.description.toLowerCase().includes("misc case")) keywords.push("misc case", "adverse inference");
    const bestCase = findBestCase(keywords);
    if (bestCase && bestCase.book_ref) {
        briefMd += `**Supporting Precedent:**\n> **${bestCase.book_ref}** (${bestCase.parties})\n\n`;
    }
});

fs.writeFileSync(briefPath, briefMd, 'utf8');

// Generate the Appellate Argument Summary
let summaryMd = `# appellate_argument_v58_Summary.md\n\n`;

reasoningMap.findings.forEach((finding, idx) => {
    summaryMd += `**${idx + 1}. ${finding.description}**\n`;
    summaryMd += `   - **Error:** "${finding.source_text_trial_court.substring(0, 150)}..."\n`;
    summaryMd += `   - **Law:** ${finding.vulnerability_reason}\n\n`;
});

fs.writeFileSync(summaryPath, summaryMd, 'utf8');

console.log("Data-driven documents generated successfully without Bengali hardcoded blocks.");
