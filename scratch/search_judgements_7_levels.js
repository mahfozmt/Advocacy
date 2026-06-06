const fs = require('fs');
const path = require('path');

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
      /খতিয়ান\s+সংশোধনের\s+দায়/i,
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

const results = {};
searchCategories.forEach(cat => {
  results[cat.key] = [];
});

try {
  const files = fs.readdirSync(judgementsDir).filter(file => file.endsWith('.json'));
  console.log(`Scanning ${files.length} judgment files...`);

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

      const headerText = `${bookRef} ${caseno} ${parties} ${fullJud.substring(0, 1000)}`;
      const isCivil = !/(Criminal|Writ Petition|Death Reference|State VS|State \-\-\-\-\-\-|Condemned|Convict|Penal Code|First Information Report|FIR |Murder |Rape |Bail |Police Station|dacoity|Arms Act|Narcotics)/i.test(headerText) && !/State\s*[-=]*\s*vs/i.test(headerText) && !/vs\.*[\s\-]*State/i.test(headerText);
      
      if (!isCivil) return;

      const contentToSearch = `${filename} ${bookRef} ${caseno} ${parties} ${fullJud} ${scrapedKw}`;

      searchCategories.forEach(cat => {
        const matched = [];
        cat.terms.forEach(term => {
          if (term.test(contentToSearch)) {
            matched.push(term.toString());
          }
        });

        if (matched.length > 0) {
          // Find exact context window around the match
          let snippet = '';
          for (const term of cat.terms) {
            const match = fullJud.match(term);
            if (match) {
              const idx = match.index;
              const start = Math.max(0, idx - 400);
              const end = Math.min(fullJud.length, idx + 400);
              snippet = "..." + fullJud.substring(start, end).replace(/\n/g, ' ') + "...";
              break;
            }
          }
          if (!snippet) {
             // If not in fullJud, maybe it's in the parties or bookRef
             snippet = "Matched in metadata: " + matched.join(', ');
          }

          results[cat.key].push({
            file: filename,
            book_ref: bookRef || 'N/A',
            caseno: caseno || 'N/A',
            parties: parties || 'N/A',
            match_count: matched.length,
            matched_terms: matched,
            full_text_len: fullJud.length,
            snippet: snippet,
            full_judgment: fullJud
          });
        }
      });
    } catch (err) {
      // ignore
    }
  });

  // Compile Markdown report
  let md = `# Judgements Search & Precedent Reference Library - 7 Level Strategy\n\n`;
  
  searchCategories.forEach(cat => {
    md += `## ${cat.title}\n\n`;
    const matches = results[cat.key];
    
    // Sort: most unique matches first, then longest judgment (to find deep analyses)
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
      md += `- **Parties:** *${cleanParties}*\n`;
      md += `  > *"${m.snippet.substring(0, 1000)}${m.snippet.length > 1000 ? '...' : ''}"*\n\n`;
    });

    md += `---\n\n`;
  });

  fs.writeFileSync(outputFilePath, md, 'utf-8');
  console.log(`Successfully wrote 7-Level references to: ${outputFilePath}`);

} catch (err) {
  console.error(`Fatal search error: ${err.message}`);
}
