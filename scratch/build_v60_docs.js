const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Output');
const authMatrix = JSON.parse(fs.readFileSync(path.join(outDir, 'Authority_Matrix_v60.json'), 'utf8'));
const attackMap = JSON.parse(fs.readFileSync(path.join(outDir, 'Plaintiff_Attack_Map_v60.json'), 'utf8'));

let briefMd = `# জেলা জজ আদালত, টাঙ্গাইল
## আপীল মামলা নং ৩৮/২০২৬
### হাতেম আলী ও অন্যান্য বনাম আলহাজ উদ্দিন ও অন্যান্য
**আপীল্যান্টপক্ষের পূর্ণাঙ্গ লিখিত যুক্তিতর্ক (Version 60 — The State Recognition Brief)**

---

## প্রারম্ভিক বক্তব্য

মহামান্য আদালত,

এই আপীলের উদ্দেশ্য কেবল আইনগত নীতি বর্ণনা করা নহে। এই আপীলের উদ্দেশ্য হলো—বিজ্ঞ ট্রায়াল কোর্ট কীভাবে একটি ভিত্তিহীন 'মূল স্বত্ব' (Root Title) ধরিয়া লইয়াছেন, একটি অপ্রমাণিত আদেশের উপর নির্ভর করিয়াছেন এবং প্রমাণের সম্পূর্ণ দায়ভার (Burden of Proof) বেআইনিভাবে উল্টাইয়া দিয়া একটি চূড়ান্তভাবে প্রকাশিত State Record-কে বাতিল করিয়াছেন, তাহা আদালতের সম্মুখে প্রমাণ করা।

আমাদের আপীল একটি সুনির্দিষ্ট আইনি পরিক্রমার উপর ভিত্তি করিয়া গঠিত:
১. আব্দুল করিমের রায়তি স্বত্বের মূল ভিত্তি আদালতে প্রমাণিত হয় নাই।
২. State Acquisition-এর মাধ্যমে রাষ্ট্র আব্দুল আলীকে একক রায়ত হিসেবে চূড়ান্ত স্বীকৃতি দিয়াছে।
৩. এস.এ খতিয়ান উপস্থাপনের পর ইহা ভুল প্রমাণের সম্পূর্ণ দায়ভার বিবাদীদের উপর বর্তাইয়াছিল।
৪. বিবাদীরা Misc Case-এর কোনো parent order দাখিল করিতে চরমভাবে ব্যর্থ হইয়াছেন।
৫. Parent order-এর অনুপস্থিতিতে AC Land ভলিউমের ভিন্ন কালিতে লেখা মার্জিন নোট আইনি মূল্যহীন।
৬. বিবাদীদের নিজেদের ১৯৭৫ সালের দলিলই প্রমাণ করে যে ১৯৬৯ সালের সংশোধনের গল্পটি একটি জালিয়াতি।

---

`;

let summaryMd = `# আপীল শুনানির সারাংশ (v60)
**টাঙ্গাইল সিভিল আপীল নং ৩৮/২০২৬**

মহামান্য আদালত, বিজ্ঞ ট্রায়াল কোর্টের রায়টি মূলত নিম্নোক্ত পাঁচটি আইনি ভুলের (Errors of Law) কারণে বাতিলযোগ্য:

`;

attackMap.forEach((chapter, index) => {
    // Brief Generation
    briefMd += `## ${chapter.chapter_title}\n\n`;
    briefMd += `**বিজ্ঞ ট্রায়াল কোর্ট যাহা সাব্যস্ত করিয়াছেন:**\n> "${chapter.trial_court_finding}"\n\n`;
    briefMd += `**কেন এই সিদ্ধান্ত আইনত অসম্ভব:**\n${chapter.impossibility}\n\n`;
    briefMd += `**যে সাক্ষ্য ট্রায়াল কোর্টের সিদ্ধান্তকে ধ্বংস করে:**\n${chapter.contradicting_evidence}\n\n`;

    chapter.auth_ids.forEach(authId => {
        const auth = authMatrix.find(a => a.id === authId);
        if (auth) {
            briefMd += `**যে নজির ট্রায়াল কোর্টের সিদ্ধান্তকে সরাসরি বাতিল করে:**\n`;
            briefMd += `> **নজির:** **${auth.citation}** (*${auth.parties}*)\n`;
            briefMd += `> **Legal Principle (আইনি নীতি):** ${auth.principle}\n`;
            briefMd += `> **Application (বর্তমান আপীলে প্রয়োগ):** ${auth.application}\n\n`;
        }
    });

    briefMd += `**অতএব বিজ্ঞ ট্রায়াল কোর্টের এই সিদ্ধান্ত আইন ও সাক্ষ্যের পরিপন্থী এবং বাতিলযোগ্য।**\n\n---\n\n`;

    // Summary Generation
    summaryMd += `**${index + 1}. ${chapter.chapter_title.replace(`অধ্যায় ${index + 1}: `, '')}**\n`;
    summaryMd += `- **ট্রায়াল কোর্টের ভুল:** ${chapter.trial_court_finding}\n`;
    summaryMd += `- **আমাদের খণ্ডন:** ${chapter.impossibility}\n`;
    chapter.auth_ids.forEach(authId => {
        const auth = authMatrix.find(a => a.id === authId);
        if (auth) {
            summaryMd += `- **নজির প্রয়োগ:** **${auth.citation}** (${auth.principle})\n`;
        }
    });
    summaryMd += `\n`;
});

briefMd += `## প্রার্থনা\nঅতএব, মহামান্য আদালতের নিকট বিনীত প্রার্থনা এই যে, বিজ্ঞ ট্রায়াল কোর্টের রায় বাতিল করিয়া আপীলটি মঞ্জুর করা হোক।\n`;
summaryMd += `**সিদ্ধান্ত:** ট্রায়াল কোর্ট সম্পূর্ণ বেআইনিভাবে একটি State Record বাতিল করিয়াছেন। অতএব উক্ত রায় আইনত বাতিলযোগ্য।\n`;

fs.writeFileSync(path.join(outDir, 'appellate_argument_v60_Brief.md'), briefMd, 'utf8');
fs.writeFileSync(path.join(outDir, 'appellate_argument_v60_Summary.md'), summaryMd, 'utf8');

// Also update the Authority Matrix markdown
let matrixMd = `# Authority Matrix (v60)\n\n`;
matrixMd += `| Authority | Court | Legal Principle | Trial Court Finding Destroyed | Priority Score |\n`;
matrixMd += `|---|---|---|---|---|\n`;

authMatrix.forEach(auth => {
    matrixMd += `| **${auth.citation}** <br> *${auth.parties}* | ${auth.court} | ${auth.principle} | ${auth.destroyed_finding} | ${auth.priority} |\n`;
});
fs.writeFileSync(path.join(outDir, 'Authority_Matrix_v60.md'), matrixMd, 'utf8');


console.log("v60 Briefs generated successfully.");
