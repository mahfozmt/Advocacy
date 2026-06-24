const fs = require('fs');
const path = require('path');

const resourceDir = path.join('F:', 'Mahfoz', 'Advocacy', 'Resource', 'Judgements');
const files = fs.readdirSync(resourceDir).filter(f => f.startsWith('case_') && f.endsWith('.json'));

let results = [];

for (const file of files) {
    const filepath = path.join(resourceDir, file);
    try {
        const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        const text = data.full_judgment || "";
        
        const paragraphs = text.split(/\n\s*\n|\r\n\s*\r\n/);
        for (const p of paragraphs) {
            // Looking for paragraphs mentioning title AND (revenue officer OR mutation OR adjudicate)
            if (/title/i.test(p) && (/revenue officer/i.test(p) || /mutation/i.test(p) || /adjudicat/i.test(p) || /ac land/i.test(p) || /assistant commissioner/i.test(p))) {
                results.push({
                    id: data.Id,
                    case_no: data.caseno,
                    parties: data.parties,
                    book_ref: data.book_ref,
                    court: data.division_name,
                    casetype: data.case_type_name,
                    justices: data.justice_names ? data.justice_names.join(', ') : '',
                    paragraph: p.trim()
                });
            }
        }
    } catch (e) {}
}

const uniqueResults = [];
const seenIds = new Set();
for (const r of results) {
    if (!seenIds.has(r.id + r.paragraph.substring(0, 100))) {
        seenIds.add(r.id + r.paragraph.substring(0, 100));
        uniqueResults.push(r);
    }
}

uniqueResults.sort((a, b) => {
    let scoreA = a.court === 'Appellate Division' ? 100 : 0;
    let scoreB = b.court === 'Appellate Division' ? 100 : 0;
    if (a.book_ref) scoreA += 10;
    if (b.book_ref) scoreB += 10;
    
    // strongly prefer explicitly stating they cannot decide
    if (/cannot/i.test(a.paragraph)) scoreA += 20;
    if (/cannot/i.test(b.paragraph)) scoreB += 20;
    
    return scoreB - scoreA;
});

fs.writeFileSync('F:\\Mahfoz\\Advocacy\\scratch\\batch4_analysis.json', JSON.stringify(uniqueResults.slice(0, 50), null, 2));
console.log(`Found ${uniqueResults.length} relevant paragraphs. Saved to batch4_analysis.json`);
