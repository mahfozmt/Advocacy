const fs = require('fs');
const path = require('path');
const https = require('https');

const judgementsDir = 'f:\\Mahfoz\\Advocacy\\Resource\\Judgements';
const outputFilePath = 'f:\\Mahfoz\\Advocacy\\Resource\\Judgements_Level_Search.md';

const searchCategories = [
  {
    key: 'Level_1',
    title: 'Level 1 — SA Khatian Presumption',
    terms: [
      /SA\s+khatian\s+presumption\s+of\s+correctness/i,
      /finally\s+published\s+record\s+of\s+rights/i,
      /record\s+of\s+rights\s+presumption\s+rebuttal/i,
      /burden\s+to\s+rebut\s+SA\s+record/i,
      /settlement\s+record\s+room/i,
      /presumption\s+attached\s+to\s+SA\s+khatian/i,
      /revenue\s+record\s+presumption/i,
      /finally\s+published\s+khatian/i,
      /record\s+of\s+rights\s+carries\s+presumption/i,
      /entry\s+in\s+record\s+of\s+rights\s+not\s+rebutted/i,
      /এস\s+এ\s+খতিয়ানের\s+সঠিকতার\s+অনুমান/i,
      /চূড়ান্ত\s+প্রকাশিত\s+খতিয়ান/i,
      /রেকর্ড\s+অব\s+রাইটস/i,
      /খতিয়ান\s+সংশোধনের\s+दाय/i,
      /খতিয়ানের\s+প্রামাণিকতা/i,
      /চূড়ান্ত\s+খতিয়ান/i
    ]
  },
  {
    key: 'Level_2',
    title: 'Level 2 — Mutation / Volume Entry Does Not Create Title',
    terms: [
      /mutation\s+does\s+not\s+confer\s+title/i,
      /mutation\s+entry\s+no\s+title/i,
      /revenue\s+entry\s+does\s+not\s+create\s+ownership/i,
      /mutation\s+proceeding\s+fiscal\s+purpose/i,
      /volume\s+entry\s+no\s+evidentiary\s+value/i,
      /revenue\s+record\s+not\s+title\s+document/i,
      /mutation\s+cannot\s+override\s+title/i,
      /নামজারি\s+স্বত্ব\s+সৃষ্টি\s+করে\s+না/i,
      /মিউটেশন\s+স্বত্বের\s+প্রমাণ\s+নয়/i,
      /ভলিউম\s+এন্ট্রি/i,
      /রাজস্ব\s+রেকর্ড/i,
      /নামজারি\s+কেবল\s+রাজস্ব\s+উদ্দেশ্যে/i
    ]
  },
  {
    key: 'Level_3',
    title: 'Level 3 — Misc Case Cannot Decide Title',
    terms: [
      /miscellaneous\s+case\s+cannot\s+decide\s+title/i,
      /title\s+dispute\s+requires\s+title\s+suit/i,
      /declaration\s+of\s+title\s+by\s+civil\s+suit/i,
      /misc\s+case\s+no\s+decree/i,
      /misc\s+proceeding\s+not\s+adjudication\s+of\s+title/i,
      /order\s+not\s+decree/i,
      /specific\s+relief\s+act\s+section\s+42\s+title/i,
      /মিস\s+মোকদ্দমায়\s+স্বত্ব\s+নির্ধারণ\s+হয়\s+না/i,
      /স্বত্ব\s+ঘোষণা\s+মামলা/i,
      /ডিক্রি\s+বনাম\s+আদেশ/i,
      /মিস\s+কেসে\s+ডিক্রি\s+হয়\s+না/i
    ]
  },
  {
    key: 'Level_4',
    title: 'Level 4 — Absence of Best Evidence',
    terms: [
      /adverse\s+inference\s+withholding\s+document/i,
      /failure\s+to\s+produce\s+certified\s+copy/i,
      /best\s+evidence\s+rule/i,
      /non\s+production\s+of\s+document\s+adverse\s+inference/i,
      /section\s+114\(g\)\s+evidence\s+act/i,
      /suppression\s+of\s+best\s+evidence/i,
      /সেরা\s+সাক্ষ্য\s+গোপন/i,
      /প্রতিকূল\s+অনুমান/i,
      /নথি\s+গোপন/i,
      /সার্টিফায়েড\s+কপি\s+দাখিল\s+না\s+করা/i
    ]
  },
  {
    key: 'Level_5',
    title: 'Level 5 — Non-joinder / Hotchpot',
    terms: [
      /partial\s+partition\s+maintainable/i,
      /co\s+sharer\s+partition\s+of\s+part\s+property/i,
      /non\s+joinder\s+government\s+partition\s+suit/i,
      /government\s+not\s+necessary\s+party/i,
      /hotchpot\s+partition\s+suit/i,
      /separate\s+khatian\s+separate\s+tenancy/i,
      /আংশিক\s+বাটোয়ারা/i,
      /পৃথক\s+খতিয়ান/i,
      /সরকার\s+আবশ্যকীয়\s+পক্ষ\s+নয়/i,
      /হচপট/i
    ]
  },
  {
    key: 'Level_6',
    title: 'Level 6 — Court of Wards / Estate Recognition',
    terms: [
      /court\s+of\s+wards\s+recognition\s+of\s+tenant/i,
      /estate\s+return\s+recognition\s+of\s+tenant/i,
      /zamindar\s+return\s+accepted\s+by\s+state/i,
      /state\s+acquisition\s+return\s+tenant/i,
      /record\s+prepared\s+from\s+landlord\s+return/i,
      /tenant\s+recognised\s+by\s+estate/i,
      /কোর্ট\s+অব\s+ওয়ার্ডস/i,
      /জমিদার\s+রিটার্ন/i,
      /রাষ্ট্র\s+কর্তৃক\s+স্বীকৃত\s+প্রজা/i,
      /রিটার্নে\s+নাম/i
    ]
  },
  {
    key: 'Level_7',
    title: 'Level 7 — Notice Mandatory Before Correction',
    terms: [
      /correction\s+without\s+notice\s+void/i,
      /mutation\s+without\s+notice/i,
      /natural\s+justice\s+revenue\s+proceeding/i,
      /record\s+correction\s+notice\s+hearing/i,
      /alteration\s+without\s+notice\s+illegal/i,
      /নোটিশ\s+ছাড়া\s+সংশোধন/i,
      /শুনানি\s+ছাড়া\s+নামজারি/i,
      /ন্যাচারাল\s+জাস্টিস/i,
      /রেকর্ড\s+সংশোধন/i
    ]
  }
];

const headers = {
  "accept": "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9",
  "content-type": "application/json",
  "origin": "https://bdlawreference.com",
  "referer": "https://bdlawreference.com/",
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
};

function postRequest(url, data, isJson = true) {
  return new Promise((resolve, reject) => {
    const postData = isJson ? JSON.stringify(data) : data;
    const currentHeaders = { ...headers };
    if (!isJson) {
      currentHeaders['content-type'] = 'application/x-www-form-urlencoded';
    }
    currentHeaders['Content-Length'] = Buffer.byteLength(postData);

    const options = {
      method: 'POST',
      timeout: 10000,
      headers: currentHeaders
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.write(postData);
    req.end();
  });
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function enrichCase(caseId) {
  let justiceNames = [];
  let caseTypeName = '';

  try {
    const justiceRes = await postRequest(
      "https://api.lcmsbd.com/Api/get_justice",
      { id: caseId }
    );
    if (Array.isArray(justiceRes)) {
      justiceNames = justiceRes.map(j => j.name).filter(Boolean);
    }
  } catch (e) {
    console.error(`  [!] Error fetching justice for case ${caseId}: ${e.message}`);
  }

  await delay(200);

  try {
    const casetypeRes = await postRequest(
      "https://api.lcmsbd.com/Api/get_casetype/" + caseId,
      {}
    );
    if (Array.isArray(casetypeRes) && casetypeRes.length > 0) {
      caseTypeName = casetypeRes[0].name || '';
    }
  } catch (e) {
    console.error(`  [!] Error fetching casetype for case ${caseId}: ${e.message}`);
  }

  return { justiceNames, caseTypeName };
}

async function run() {
  console.log("Scanning judgments for 7-level matches...");
  const files = fs.readdirSync(judgementsDir).filter(file => file.endsWith('.json'));
  console.log(`Total files to scan: ${files.length}`);

  const results = {};
  searchCategories.forEach(cat => {
    results[cat.key] = [];
  });

  let scannedCount = 0;
  for (const filename of files) {
    scannedCount++;
    if (scannedCount % 1000 === 0) {
      console.log(`  Scanned ${scannedCount}/${files.length} files...`);
    }

    const filepath = path.join(judgementsDir, filename);
    try {
      const start = Date.now();
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);

      const fullJud = data.full_judgment || "";
      const bookRef = data.book_ref || "";
      const caseno = data.caseno || "";
      const parties = data.parties || "";
      const scrapedKw = data._scraped_keyword || "";

      const headerText = `${bookRef} ${caseno} ${parties} ${fullJud.substring(0, 1000)}`;
      
      // Safer regex patterns to prevent exponential backtracking
      const isCivil = !/(Criminal|Writ Petition|Death Reference|State VS|State \-\-\-\-\-\-|Condemned|Convict|Penal Code|First Information Report|FIR |Murder |Rape |Bail |Police Station|dacoity|Arms Act|Narcotics)/i.test(headerText) && 
                      !/State\s*[-=]*vs/i.test(headerText) && 
                      !/vs\s*[-=]*State/i.test(headerText);
      
      if (!isCivil) continue;

      const contentToSearch = `${filename} ${bookRef} ${caseno} ${parties} ${fullJud} ${scrapedKw}`;

      searchCategories.forEach(cat => {
        const matched = [];
        cat.terms.forEach(term => {
          if (term.test(contentToSearch)) {
            matched.push(term.toString());
          }
        });

        if (matched.length > 0) {
          let snippet = '';
          for (const term of cat.terms) {
            const match = fullJud.match(term);
            if (match) {
              const idx = match.index;
              const startIdx = Math.max(0, idx - 400);
              const endIdx = Math.min(fullJud.length, idx + 400);
              snippet = "..." + fullJud.substring(startIdx, endIdx).replace(/\n/g, ' ') + "...";
              break;
            }
          }
          if (!snippet) {
             snippet = "Matched in metadata: " + matched.join(', ');
          }

          results[cat.key].push({
            file: filename,
            id: data.Id,
            book_ref: bookRef || 'N/A',
            caseno: caseno || 'N/A',
            parties: parties || 'N/A',
            match_count: matched.length,
            matched_terms: matched,
            full_text_len: fullJud.length,
            snippet: snippet,
            justice_names: data.justice_names || null,
            case_type_name: data.case_type_name || null
          });
        }
      });

      const duration = Date.now() - start;
      if (duration > 200) {
        console.log(`  [!] Scanning ${filename} took ${duration}ms`);
      }
    } catch (err) {
      // ignore
    }
  }

  // Now, collect top 5 matched cases for each category to enrich
  const toEnrich = [];
  searchCategories.forEach(cat => {
    const matches = results[cat.key];
    matches.sort((a, b) => {
      if (b.match_count !== a.match_count) {
        return b.match_count - a.match_count;
      }
      return b.full_text_len - a.full_text_len;
    });

    const top5 = matches.slice(0, 5);
    top5.forEach(m => {
      if (!m.justice_names || !m.case_type_name) {
        toEnrich.push(m);
      }
    });
  });

  console.log(`Found ${toEnrich.length} top-matched cases needing enrichment.`);

  // Enrich them sequentially
  for (let i = 0; i < toEnrich.length; i++) {
    const item = toEnrich[i];
    console.log(`[${i+1}/${toEnrich.length}] Enriching Case ${item.id} (${item.book_ref || item.caseno})...`);
    
    const { justiceNames, caseTypeName } = await enrichCase(item.id);
    
    // Save to the file
    const filepath = path.join(judgementsDir, item.file);
    try {
      const content = fs.readFileSync(filepath, 'utf-8');
      const data = JSON.parse(content);
      data.justice_names = justiceNames;
      data.case_type_name = caseTypeName;
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
      
      // Update local item reference
      item.justice_names = justiceNames;
      item.case_type_name = caseTypeName;
      console.log(`  -> Saved. Justices: ${justiceNames.join(', ')} | Type: ${caseTypeName}`);
    } catch (e) {
      console.error(`  [!] Error writing file ${filepath}: ${e.message}`);
    }
    
    await delay(300);
  }

  // Compile final markdown report with enriched details
  console.log("Generating enriched report...");
  let md = `# Judgements Search & Precedent Reference Library - 7 Level Strategy (Enriched)\n\n`;
  
  searchCategories.forEach(cat => {
    md += `## ${cat.title}\n\n`;
    const matches = results[cat.key];
    
    matches.sort((a, b) => {
      if (b.match_count !== a.match_count) {
        return b.match_count - a.match_count;
      }
      return b.full_text_len - a.full_text_len;
    });

    matches.slice(0, 5).forEach((m, idx) => {
      const cleanParties = m.parties.replace(/\r/g, ' ').replace(/\n/g, ' ').trim();
      const cleanRef = m.book_ref.trim();
      const cleanCase = m.caseno.trim();
      
      md += `### [${idx + 1}] Precedent: ${cleanRef !== 'N/A' ? cleanRef : cleanCase}\n`;
      if (m.case_type_name) {
        md += `- **Case Type:** ${m.case_type_name}\n`;
      }
      if (m.justice_names && m.justice_names.length > 0) {
        md += `- **Bench / Justices:** ${m.justice_names.join(', ')}\n`;
      }
      md += `- **Parties:** *${cleanParties}*\n`;
      md += `  > *"${m.snippet.substring(0, 1000)}${m.snippet.length > 1000 ? '...' : ''}"*\n\n`;
    });

    md += `---\n\n`;
  });

  fs.writeFileSync(outputFilePath, md, 'utf-8');
  console.log(`Enriched references successfully written to: ${outputFilePath}`);
}

run().catch(console.error);
