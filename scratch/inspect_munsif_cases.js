const fs = require('fs');
const path = require('path');

const judgementsDir = 'f:\\Mahfoz\\Advocacy\\Resource\\Judgements';

const munsifIds = [
    8215, 11648, 7888, 1443, 17797, 9160, 11370, 8242, 204, 11356, 
    15900, 3081, 15715, 12586, 10111, 7291, 5673, 14878, 9396, 16350,
    6946, 6306, 4093, 14884, 6184, 17654, 5348, 7501, 3215, 4924, 
    17905, 11881, 11976, 7659, 6791, 10902, 13194, 5006, 9217, 8986,
    1531, 1253, 11159, 10665, 17289, 16987, 12156, 11527, 8399, 10514, 
    12887, 9994, 9632, 14825, 88, 15899, 5479, 4299, 16951, 8910,
    4964, 13936, 4994, 5042
];

console.log(`Checking for ${munsifIds.length} target IDs in judgements folder...`);

const files = fs.readdirSync(judgementsDir).filter(file => {
    const match = file.match(/^case_(\d+)_/);
    if (match) {
        const id = parseInt(match[1]);
        return munsifIds.includes(id);
    }
    return false;
});

console.log(`Found ${files.length} matching local files.`);

const matchedCases = [];

files.forEach(filename => {
    const filepath = path.join(judgementsDir, filename);
    try {
        const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        const fullJud = data.full_judgment || "";
        
        matchedCases.push({
            id: data.Id,
            filename: filename,
            book_ref: data.book_ref || 'N/A',
            caseno: data.caseno || 'N/A',
            parties: data.parties || 'N/A',
            case_type_name: data.case_type_name || 'N/A',
            justice_names: data.justice_names || [],
            length: fullJud.length,
            full_judgment: fullJud
        });
    } catch (e) {
        // ignore
    }
});

// Sort by length to find the most detailed judgments
matchedCases.sort((a, b) => b.length - a.length);

console.log("\nTop 15 detailed judgments:");
matchedCases.slice(0, 15).forEach((c, idx) => {
    console.log(`[${idx+1}] ID: ${c.id} | Ref: ${c.book_ref} | Case: ${c.caseno} | Type: ${c.case_type_name}`);
    console.log(`    Parties: ${c.parties.replace(/\n/g, ' ').replace(/\r/g, '')}`);
    console.log(`    Justices: ${c.justice_names.join(', ')}`);
    console.log(`    Snippet: ${c.full_judgment.substring(0, 600).replace(/\n/g, ' ').replace(/\r/g, '')}...`);
    console.log("--------------------------------------------------------------------------------");
});
