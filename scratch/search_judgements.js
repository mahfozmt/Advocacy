const fs = require('fs');
const path = require('path');

const judgementsDir = 'f:\\Mahfoz\\Advocacy\\Resource\\Judgements';
const searchTerms = {
  presumption_sa: [/50\s*DLR\s*186/i, /presumption/i, /correctness/i, /rebut/i],
  nawab_court_of_wards: [/nawab/i, /court of wards/i, /chief manager/i, /unregistered pattan/i],
  misc_case_title: [/\bmisc\b/i, /miscellaneous case/i, /decree/i, /title suit/i, /section 42/i],
  volume_note: [/volume note/i, /koronlipi/i, /different ink/i, /order sheet/i, /parent file/i],
  burden_of_proof: [/burden of proof/i, /onus/i, /plaintiff/i, /defendant/i, /section 103/i],
  non_joinder_govt: [/non-joinder/i, /non joinder/i, /necessary party/i, /government/i],
  hotchpot: [/hotchpot/i, /partition/i, /separate khatian/i, /separate tenancy/i]
};

const results = {};
Object.keys(searchTerms).forEach(cat => {
  results[cat] = [];
});

try {
  const files = fs.readdirSync(judgementsDir).filter(file => file.endsWith('.json'));

  files.forEach(filename => {
    const filepath = path.join(judgementsDir, filename);
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);

      const fullJud = data.full_judgment || "";
      const bookRef = data.book_ref || "";
      const caseno = data.caseno || "";
      const parties = data.parties || "";
      const scrapedKw = data._scraped_keyword || "";

      const contentToSearch = `${bookRef} ${caseno} ${parties} ${fullJud} ${scrapedKw}`;

      Object.entries(searchTerms).forEach(([category, regexes]) => {
        const matchedPatterns = [];
        regexes.forEach(regex => {
          if (regex.test(contentToSearch)) {
            matchedPatterns.push(regex.toString());
          }
        });

        if (matchedPatterns.length > 0) {
          results[category].push({
            file: filename,
            book_ref: bookRef,
            caseno: caseno,
            parties: parties,
            scraped_kw: scrapedKw,
            match_count: matchedPatterns.length,
            matched_patterns: matchedPatterns,
            full_text_len: fullJud.length,
            full_judgment: fullJud
          });
        }
      });
    } catch (err) {
      // ignore
    }
  });

  let outputStr = '';
  // Display top matches
  Object.entries(results).forEach(([category, matches]) => {
    outputStr += `\n================================ CATEGORY: ${category} ================================\n`;
    matches.sort((a, b) => {
      if (b.match_count !== a.match_count) {
        return b.match_count - a.match_count;
      }
      return b.full_text_len - a.full_text_len;
    });

    matches.slice(0, 5).forEach(m => {
      outputStr += `File: ${m.file}\n`;
      outputStr += `Ref: ${m.book_ref} | Case No: ${m.caseno}\n`;
      outputStr += `Parties: ${m.parties.replace(/\r/g, ' ').replace(/\n/g, ' ')}\n`;
      outputStr += `Matched Patterns (${m.match_count}): ${m.matched_patterns.join(', ')}\n`;
      // Find a matching paragraph in full_judgment
      const paras = m.full_judgment.split('\n');
      let snippet = '';
      for (const p of paras) {
        if (p.toLowerCase().includes('presumption') || p.toLowerCase().includes('court of wards') || p.toLowerCase().includes('misc') || p.toLowerCase().includes('volume') || p.toLowerCase().includes('burden') || p.toLowerCase().includes('non-joinder') || p.toLowerCase().includes('hotchpot')) {
          snippet = p.trim();
          break;
        }
      }
      if (!snippet && paras.length > 0) snippet = paras[0].trim();
      outputStr += `Snippet: ${snippet.substring(0, 400)}...\n`;
      outputStr += '-'.repeat(40) + '\n';
    });
  });

  fs.writeFileSync('f:\\Mahfoz\\Advocacy\\scratch\\search_results.txt', outputStr, 'utf-8');
  console.log("Results written to scratch/search_results.txt successfully.");

} catch (err) {
  console.error(`Error: ${err.message}`);
}
