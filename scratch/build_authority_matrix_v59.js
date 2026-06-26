const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Output');
const authMatrix = JSON.parse(fs.readFileSync(path.join(outDir, 'Authority_Matrix_v59.json'), 'utf8'));

let md = `# Authority Matrix (v59)\n\n`;
md += `| Authority | Court | Legal Principle | Trial Court Finding Destroyed | Priority Score |\n`;
md += `|---|---|---|---|---|\n`;

authMatrix.forEach(auth => {
    md += `| **${auth.citation}** <br> *${auth.parties}* | ${auth.court} | ${auth.principle} | ${auth.destroyed_finding} | ${auth.priority} |\n`;
});

fs.writeFileSync(path.join(outDir, 'Authority_Matrix_v59.md'), md, 'utf8');
console.log("Authority Matrix MD generated.");
