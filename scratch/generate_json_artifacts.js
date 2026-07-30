const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Output');

// Defendant Theory Map
const defTheory = {
    "theory_name": "The Abdul Karim & Misc Case Defense",
    "components": [
        {
            "id": "D1",
            "claim": "Abdul Karim acquired 349 decimals via Nawab Estate Patta in 1934.",
            "evidence_offered": "Oral assertion, alleged 1334 BS rent receipt (No. 349).",
            "vulnerability": "No registered patta, no kabuliyat. Rent receipt is chronologically impossible (numbered higher than a receipt 23 years newer) and does not create title."
        },
        {
            "id": "D2",
            "claim": "Sona Bhanu inherited a share and sued in 1st Munsif Court (Misc Case 1181/1969).",
            "evidence_offered": "None (No decree or certified copy produced).",
            "vulnerability": "Withholding primary evidence triggers adverse inference under Sec 114(g) Evidence Act."
        },
        {
            "id": "D3",
            "claim": "SA Khatian was corrected to include Sona Bhanu based on the Misc Case.",
            "evidence_offered": "AC Land Volume photocopy showing name in different ink (Exhibit G-1).",
            "vulnerability": "Margin note in administrative copy cannot override finally published DC Record Room Khatian (Sec 144A presumption). Mutation authority has no jurisdiction to decide title."
        }
    ]
};
fs.writeFileSync(path.join(outDir, 'Defendant_Theory_Map_v58.json'), JSON.stringify(defTheory, null, 4));


// Plaintiff Attack Map
const pltAttack = {
    "attack_strategy": "Root Destruction & Evidentiary Strictness",
    "attacks": [
        {
            "id": "A1",
            "target": "D1 (Root Title)",
            "argument": "The Trial Court accepted derivative title without proving root title. Absent a registered patta or estate return, Abdul Karim was never a legal tenant. Therefore, his heirs had nothing to inherit.",
            "type": "factual_and_legal"
        },
        {
            "id": "A2",
            "target": "D2 (Misc Case)",
            "argument": "The Trial Court illegally shifted the burden of proof. Plaintiffs proved SA Khatian (State Recognition). Defendants failed to produce the Misc Case decree. Court must presume the decree did not exist or was unfavorable.",
            "type": "burden_of_proof"
        },
        {
            "id": "A3",
            "target": "D3 (Volume Note)",
            "argument": "The Trial Court illegally elevated a fraudulent, different-ink margin note in a revenue working copy over the constitutionally mandated DC Record Room original. Furthermore, defendants' own 1975 deed contradicts the 1969 correction theory.",
            "type": "evidentiary"
        }
    ]
};
fs.writeFileSync(path.join(outDir, 'Plaintiff_Attack_Map_v58.json'), JSON.stringify(pltAttack, null, 4));

// Authority Matrix (Mapping concepts to actual fetched cases)
const localResourceDir = path.join(__dirname, '..', 'Resource', 'Judgements');
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

function getCasesByKeywords(keywords) {
    let matches = [];
    harvestedCases.forEach(c => {
        let text = (c.full_judgment || "").toLowerCase();
        let match = keywords.some(kw => text.includes(kw.toLowerCase()));
        if (match) matches.push({ ref: c.book_ref || c.caseno, parties: c.parties, court: c.case_type_name });
    });
    // Deduplicate and return top 3
    let unique = [];
    let seen = new Set();
    for (let m of matches) {
        if (!seen.has(m.ref) && m.ref) {
            seen.add(m.ref);
            unique.push(m);
        }
    }
    return unique.slice(0, 3);
}

const authorityMatrix = {
    "A1_Root_Title": getCasesByKeywords(["unregistered patta", "kabuliyat", "source of title"]),
    "A2_Misc_Case_Adverse_Inference": getCasesByKeywords(["adverse inference", "114(g)", "withholding document"]),
    "A3_Volume_Note_Mutation": getCasesByKeywords(["mutation no title", "administrative note", "margin note"]),
    "SA_Presumption": getCasesByKeywords(["144a", "presumption of correctness"])
};
fs.writeFileSync(path.join(outDir, 'Authority_Matrix_v58.json'), JSON.stringify(authorityMatrix, null, 4));

console.log("Intermediate JSON artifacts generated.");
