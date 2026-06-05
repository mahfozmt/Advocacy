const fs = require('fs');
const path = require('path');

const judgementsDir = 'f:\\Mahfoz\\Advocacy\\Resource\\Judgements';
const files = fs.readdirSync(judgementsDir).filter(file => file.endsWith('.json'));

const targets = [
  { kw: '50 DLR 186', regex: /50\s*DLR\s*186/i, name: 'Dayal Chandra Mondal vs. Asst. Custodian' },
  { kw: 'different ink', regex: /different\s+ink/i, name: 'Different Ink Entry' },
  { kw: 'volume note', regex: /volume\s+note/i, name: 'Volume Note' },
  { kw: 'misc case', regex: /misc(ellaneous)?\s+case/i, name: 'Misc Case' },
  { kw: 'non-joinder', regex: /non[- ]joinder/i, name: 'Non-joinder' },
  { kw: 'hotchpot', regex: /hotchpot/i, name: 'Hotchpot' },
  { kw: 'nawab', regex: /nawab/i, name: 'Nawab' }
];

const found = [];

files.forEach(filename => {
  const filepath = path.join(judgementsDir, filename);
  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(content);
    const fullJud = data.full_judgment || "";
    const bookRef = data.book_ref || "";
    const caseno = data.caseno || "";
    const parties = data.parties || "";

    targets.forEach(target => {
      if (target.regex.test(fullJud)) {
        // Find the paragraph containing the match
        const paragraphs = fullJud.split('\n');
        paragraphs.forEach(para => {
          if (target.regex.test(para)) {
            found.push({
              file: filename,
              kw: target.kw,
              ref: bookRef,
              case: caseno,
              parties: parties.replace(/\r/g, ' ').replace(/\n/g, ' '),
              para: para.trim()
            });
          }
        });
      }
    });
  } catch (err) {
    // ignore
  }
});

let output = '';
targets.forEach(target => {
  output += `\n================================ TARGET: ${target.kw} ================================\n`;
  const matches = found.filter(f => f.kw === target.kw);
  output += `Total matches: ${matches.length}\n\n`;
  matches.slice(0, 10).forEach(m => {
    output += `File: ${m.file}\n`;
    output += `Ref: ${m.ref} | Case: ${m.case}\n`;
    output += `Parties: ${m.parties}\n`;
    output += `Paragraph: ${m.para}\n`;
    output += '-'.repeat(50) + '\n';
  });
});

fs.writeFileSync('f:\\Mahfoz\\Advocacy\\scratch\\extracted_quotes.txt', output, 'utf-8');
console.log("Extracted quotes written to scratch/extracted_quotes.txt");
