const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Output');
const defMap = JSON.parse(fs.readFileSync(path.join(outDir, 'Defendant_Theory_Map_v58.json')));
const pltMap = JSON.parse(fs.readFileSync(path.join(outDir, 'Plaintiff_Attack_Map_v58.json')));
const authMap = JSON.parse(fs.readFileSync(path.join(outDir, 'Authority_Matrix_v58.json')));

let briefMd = `# জেলা জজ আদালত, টাঙ্গাইল
## আপীল মামলা নং ৩৮/২০২৬
### হাতেম আলী ও অন্যান্য বনাম আলহাজ উদ্দিন ও অন্যান্য
**আপীল্যান্টপক্ষের পূর্ণাঙ্গ লিখিত যুক্তিতর্ক (Version 58)**

---

## প্রারম্ভিক বক্তব্য

মহামান্য আদালত,
এই আপীলের মূল বিষয়বস্তু কেবলমাত্র এস.এ ২৩৮ খতিয়ানের শুদ্ধতা প্রমাণ করা নহে। বরং, বিজ্ঞ ট্রায়াল কোর্ট কীভাবে একটি অপ্রমাণিত মূল স্বত্ব (Root Title)-এর উপর ভিত্তি করিয়া এবং সম্পূর্ণ বেআইনিভাবে প্রমাণের দায়ভার (Burden of Proof) উল্টাইয়া দিয়া একটি State Record-কে বাতিল করিয়াছেন, তাহা আদালতের নজরে আনাই এই আপীলের উদ্দেশ্য।

---

`;

// Root Title Attack
briefMd += `# অধ্যায় ১: আব্দুল করিমের 'মূল স্বত্ব' প্রমাণে ব্যর্থতা (Failure to Prove Root Tenancy)\n\n`;
briefMd += `**ট্রায়াল কোর্টের ভুল অনুমান:**\nবিবাদীরা দাবি করে, ${defMap.components[0].claim} বিজ্ঞ আদালত কোনো দালিলিক প্রমাণ ছাড়াই এই দাবি মানিয়াছেন।\n\n`;
briefMd += `**আমাদের আইনি খণ্ডন:**\n${pltMap.attacks[0].argument}\n\n`;
briefMd += `**ভুয়া দাখিলা (Rent Receipt Anomaly):**\nবিবাদীরা ১৯২৭ সালের (১৩৩৪ বঙ্গাব্দ) একটি দাখিলা দেখাইয়াছেন যাহার নম্বর ৩৪৯। অথচ বাদীপক্ষের ১৯৫০ সালের (১৩৫৭ বঙ্গাব্দ) দাখিলার নম্বর ৩৪০। ২৩ বছর আগের রসিদের ক্রমিক নম্বর কীভাবে পরের রসিদের চেয়ে বেশি হয়? ইহা প্রমাণ করে বিবাদীদের রসিদটি জালিয়াতি। অধিকন্তু, বিচ্ছিন্ন খাজনার রসিদ স্বত্ব সৃষ্টি করে না।\n\n`;
if (authMap.A1_Root_Title.length > 0) {
    briefMd += `**সমর্থনকারী নজির:**\n`;
    authMap.A1_Root_Title.forEach(c => briefMd += `> **${c.ref}** (${c.parties})\n`);
    briefMd += `\n`;
}

// Misc Case Attack
briefMd += `--- \n# অধ্যায় ২: Misc Case-এর অনুপস্থিতি এবং প্রতিকূল অনুমান (Adverse Inference)\n\n`;
briefMd += `**ট্রায়াল কোর্টের ভুল অনুমান:**\n${defMap.components[1].claim}\n\n`;
briefMd += `**আমাদের আইনি খণ্ডন:**\n${pltMap.attacks[1].argument}\n\n`;
if (authMap.A2_Misc_Case_Adverse_Inference.length > 0) {
    briefMd += `**সমর্থনকারী নজির:**\n`;
    authMap.A2_Misc_Case_Adverse_Inference.forEach(c => briefMd += `> **${c.ref}** (${c.parties})\n`);
    briefMd += `\n`;
}

// Volume Note Attack
briefMd += `--- \n# অধ্যায় ৩: AC Land ভলিউম নোট বনাম DC Record Room\n\n`;
briefMd += `**ট্রায়াল কোর্টের ভুল অনুমান:**\n${defMap.components[2].claim}\n\n`;
briefMd += `**আমাদের আইনি খণ্ডন:**\n${pltMap.attacks[2].argument}\n\n`;
briefMd += `**বিবাদীদের নিজেদের দলিলে স্ববিরোধিতা:**\nযদি ১৯৬৯ সালেই খতিয়ানটি ১ দাগে সংশোধিত হইয়া থাকে, তবে ১৯৭৫ সালে বিবাদীদের নিজেদের দলিলে (৩৫৯৬ নং) কীভাবে ৬টি দাগ উল্লেখ করা হইল? এই স্ববিরোধিতা প্রমাণ করে ভলিউম নোটটি পরবর্তীকালের জালিয়াতি।\n\n`;
if (authMap.A3_Volume_Note_Mutation.length > 0) {
    briefMd += `**সমর্থনকারী নজির:**\n`;
    authMap.A3_Volume_Note_Mutation.forEach(c => briefMd += `> **${c.ref}** (${c.parties})\n`);
    briefMd += `\n`;
}

briefMd += `---\n## প্রার্থনা\nঅতএব, মহামান্য আদালতের নিকট বিনীত প্রার্থনা এই যে, বিজ্ঞ ট্রায়াল কোর্টের রায় বাতিল করিয়া আপীলটি মঞ্জুর করা হোক।\n`;

fs.writeFileSync(path.join(outDir, 'appellate_argument_v58_Brief.md'), briefMd);

// Summary
let summaryMd = `# আপীল শুনানির সারাংশ (v58)\n**টাঙ্গাইল সিভিল আপীল নং ৩৮/২০২৬**\n\n`;
summaryMd += `**১. Root Title Failure:** ${pltMap.attacks[0].argument}\n\n`;
summaryMd += `**২. Adverse Inference:** ${pltMap.attacks[1].argument}\n\n`;
summaryMd += `**৩. Volume Note Override:** ${pltMap.attacks[2].argument}\n\n`;
summaryMd += `**৪. 1975 Deed Contradiction:** ১৯৭৫ সালের দলিলে ৬ দাগের উপস্থিতি ১৯৬৯ সালের ১ দাগের সংশোধনের দাবিকে সম্পূর্ণ মিথ্যা প্রমাণ করে।\n\n`;
summaryMd += `**৫. Rent Receipt Anomaly:** ১৩৩৪ বঙ্গাব্দের রসিদ নং ৩৪৯, আর ১৩৫৭ বঙ্গাব্দের রসিদ নং ৩৪০। ক্রমিক নম্বরের এই অসঙ্গতি জালিয়াতির অকাট্য প্রমাণ।\n`;

fs.writeFileSync(path.join(outDir, 'appellate_argument_v58_Summary.md'), summaryMd);

console.log("v58 Markdown Documents successfully generated from JSON artifacts.");
