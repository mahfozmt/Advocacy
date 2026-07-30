const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Output');
const authMatrix = JSON.parse(fs.readFileSync(path.join(outDir, 'Authority_Matrix_v59.json'), 'utf8'));
const attackMap = JSON.parse(fs.readFileSync(path.join(outDir, 'Plaintiff_Attack_Map_v59.json'), 'utf8'));

let briefMd = `# জেলা জজ আদালত, টাঙ্গাইল
## আপীল মামলা নং ৩৮/২০২৬
### হাতেম আলী ও অন্যান্য বনাম আলহাজ উদ্দিন ও অন্যান্য
**আপীল্যান্টপক্ষের পূর্ণাঙ্গ লিখিত যুক্তিতর্ক (Version 59)**

---

## প্রারম্ভিক বক্তব্য

মহামান্য আদালত,
এই আপীলের মূল বিষয়বস্তু কেবলমাত্র এস.এ ২৩৮ খতিয়ানের শুদ্ধতা প্রমাণ করা নহে। বরং, বিজ্ঞ ট্রায়াল কোর্ট কীভাবে একটি অপ্রমাণিত মূল স্বত্ব (Root Title)-এর উপর ভিত্তি করিয়া এবং সম্পূর্ণ বেআইনিভাবে প্রমাণের দায়ভার (Burden of Proof) উল্টাইয়া দিয়া একটি State Record-কে বাতিল করিয়াছেন, তাহা আদালতের নজরে আনাই এই আপীলের উদ্দেশ্য।

---
`;

let summaryMd = `# আপীল শুনানির সারাংশ (v59)
**টাঙ্গাইল সিভিল আপীল নং ৩৮/২০২৬**

মহামান্য আদালত, বিজ্ঞ ট্রায়াল কোর্টের রায়টি মূলত নিম্নোক্ত মারাত্মক ভুলের (Errors of Law) উপর দাঁড়িয়ে আছে:

`;

attackMap.forEach((chapter, index) => {
    // Brief
    briefMd += `# অধ্যায় ${index + 1}: ${chapter.chapter_title}\n\n`;
    briefMd += `**বিজ্ঞ ট্রায়াল কোর্টের সিদ্ধান্ত:**\n> "${chapter.trial_court_finding}"\n\n`;
    briefMd += `**আমাদের আইনি খণ্ডন:**\n${chapter.argument}\n\n`;

    chapter.auth_ids.forEach(authId => {
        const auth = authMatrix.find(a => a.id === authId);
        if (auth) {
            briefMd += `> **নজির:** **${auth.citation}** (*${auth.parties}*)\n`;
            briefMd += `> **Legal Principle:** ${auth.principle}\n`;
            briefMd += `> **Application to Present Appeal:** ${auth.application}\n\n`;
        }
    });

    briefMd += `**অতএব বিজ্ঞ ট্রায়াল কোর্টের এই সিদ্ধান্ত আইন ও সাক্ষ্যের পরিপন্থী এবং বাতিলযোগ্য।**\n\n---\n\n`;

    // Summary
    summaryMd += `**${index + 1}. ${chapter.chapter_title}**\n`;
    summaryMd += `- ট্রায়াল কোর্টের ভুল: ${chapter.trial_court_finding}\n`;
    summaryMd += `- আমাদের আইনি যুক্তি: ${chapter.argument}\n`;
    chapter.auth_ids.forEach(authId => {
        const auth = authMatrix.find(a => a.id === authId);
        if (auth) {
            summaryMd += `- নজির: **${auth.citation}** (${auth.principle})\n`;
        }
    });
    summaryMd += `\n`;
});

briefMd += `## প্রার্থনা\nঅতএব, মহামান্য আদালতের নিকট বিনীত প্রার্থনা এই যে, বিজ্ঞ ট্রায়াল কোর্টের রায় বাতিল করিয়া আপীলটি মঞ্জুর করা হোক।\n`;
summaryMd += `\n**সিদ্ধান্ত:** ট্রায়াল কোর্ট সম্পূর্ণ বেআইনিভাবে একটি State Record বাতিল করিয়াছেন। অতএব উক্ত রায় আইনত বাতিলযোগ্য।\n`;

fs.writeFileSync(path.join(outDir, 'appellate_argument_v59_Brief.md'), briefMd, 'utf8');
fs.writeFileSync(path.join(outDir, 'appellate_argument_v59_Summary.md'), summaryMd, 'utf8');

console.log("v59 Briefs generated successfully.");
