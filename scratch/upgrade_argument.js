const fs = require('fs');
const path = require('path');

const briefPath = path.join(__dirname, '..', 'Output', 'appellate_argument_v57_Brief.md');
const summaryPath = path.join(__dirname, '..', 'Output', 'appellate_argument_v57_Summary.md');

function run() {
    let brief = fs.readFileSync(briefPath, 'utf8');
    let summary = fs.readFileSync(summaryPath, 'utf8');

    // 1. Upgrade SA Presumption with AD case
    const saPresumptionReplacement = `> **Dayal Chandra Mondal vs. Asst. Custodian, 50 DLR 186:** *"A record of rights finally published and revised under section 144A of the S.A.T. Act has a presumption of correctness and that presumption continues till it is rebutted by reliable evidence."*

> **Divisional Estate Officer vs. Jashimuddin, 13 ALR (AD) 11 / 24 BLC (AD) 36:** *"A finally published record-of-rights under the SAT Act carries a presumption of correctness which must be rebutted by the party challenging it."* (Appellate Division Authority)`;

    brief = brief.replace(/> \*\*Dayal Chandra Mondal.*reliable evidence\."\*/g, saPresumptionReplacement);

    // 2. Add Burden of Proof AD case
    const burdenReplacement = `সেই সংশোধন প্রমাণের **সম্পূর্ণ দায়ভার (Burden of Proof) তাহার উপরই বর্তায় (Evidence Act, Section 103)।**

> **S.M. Basiruddin Vs. Zahurul Islam Chowdhury, 35 DLR (AD) 230:** *"The onus to prove that the entry in the finally published record of rights is wrong lies heavily upon the party who challenges it."*

কিন্তু বিজ্ঞ ট্রায়াল কোর্ট উল্টো বাদীকেই বাধ্য করিয়াছেন এমন একটি সংশোধন disprove করিতে`;

    brief = brief.replace(/সেই সংশোধন প্রমাণের \*\*সম্পূর্ণ দায়ভার \(Burden of Proof\) তাহার উপরই বর্তায় \(Evidence Act, Section 103\)।\*\*\n\nকিন্তু বিজ্ঞ ট্রায়াল কোর্ট উল্টো বাদীকেই বাধ্য করিয়াছেন এমন একটি সংশোধন disprove করিতে/g, burdenReplacement);


    // 3. Add Absence of Best Evidence / Adverse Inference
    const adverseInferenceReplacement = `**কথিত Misc Case-এর মারাত্মক দুর্বলতা (দলিলাদির সম্পূর্ণ অনুপস্থিতি):**

বিবাদীরা Misc Case-এর অস্তিত্ব দাবি করিলেও সেই কার্যবিবরণী, আদেশ, রায় বা প্রত্যয়িত কপি আদালতে উপস্থাপন করেননি। যে Misc Case-এর উপর নির্ভর করিয়া একটি finally published State Record পরিবর্তনের দাবি করা হইতেছে, তাহার আদেশ বা certified copy না থাকায় আদালত আদৌ জানিতে পারিতেছেন সম্পাদক না যে উহা title matter ছিল, correction matter ছিল, না অন্য কোনো প্রশাসনিক কার্যক্রম ছিল।

> **Evidence Act, Section 114(g):** *The court may presume that evidence which could be and is not produced would, if produced, be unfavourable to the person who withholds it.* (Non-production of the Misc Case parent order triggers this adverse inference against the defendants).`;

    brief = brief.replace(/\*\*কথিত Misc Case-এর মারাত্মক দুর্বলতা \(দলিলাদির সম্পূর্ণ অনুপস্থিতি\):\*\*\n\nবিবাদীরা Misc Case-এর অস্তিত্ব দাবি করিলেও সেই কার্যবিবরণী, আদেশ, রায় বা প্রত্যয়িত কপি আদালতে উপস্থাপন করেননি। যে Misc Case-এর উপর নির্ভর করিয়া একটি finally published State Record পরিবর্তনের দাবি করা হইতেছে, তাহার আদেশ বা certified copy না থাকায় আদালত আদৌ জানিতে পারিতেছেন সম্পাদক না যে উহা title matter ছিল, correction matter ছিল, না অন্য কোনো প্রশাসনিক কার্যক্রম ছিল।/g, adverseInferenceReplacement);

    // 4. Strengthen References List in Brief
    const refsReplacement = `| ক্র. | নজির | বিষয় |
|---|---|---|
| ১ | 50 DLR 186 | SA খতিয়ানের statutory presumption under Sec 144A |
| ২ | 13 ALR (AD) 11 | SA খতিয়ানের statutory presumption (AD) |
| ৩ | 35 DLR (AD) 230 | Burden of Proof on challenger (AD) |
| ৪ | 27 BLD (HD) 544 | Misc Case-এ title adjudication সম্ভব নহে |
| ৫ | 53 DLR 19 | Mutation/Volume note-এর কোনো presumptive value নাই |
| ৬ | 7 SCOB [2016] HCD 135 | Notice ছাড়া SA সংশোধন void |
| ৭ | 10 SCOB [2018] HCD 235 | Finally published SA Khatian reopening ultra vires |
| ৮ | 18 SCOB [2023] AD 20 | Procured SA entry প্রতিষ্ঠিত স্বত্ব override করে না |
| ৯ | 10 BLT (AD) 105; 45 DLR (AD) 124 | Burden of proof চ্যালেঞ্জকারীর উপর (Section 103) |
| ১০ | 19 SCOB [2024] HCD 85 | বাদীর দুর্বলতায় বিবাদী মালিক হয় না |`;

    brief = brief.replace(/\| ক্র\. \| নজির \| বিষয় \|\n\|---\|---\|---\|\n\| ১ \| 50 DLR 186.*\| ৯ \| 19 SCOB \[2024\] HCD 85 \| বাদীর দুর্বলতায় বিবাদী মালিক হয় না \|/s, refsReplacement);


    // Update Summary File to reflect changes
    summary = summary.replace(/> \*\*Dayal Chandra Mondal.*reliable evidence\."\*/g, saPresumptionReplacement);
    summary = summary.replace(/সেই সংশোধন প্রমাণের \*\*সম্পূর্ণ দায়ভার \(Burden of Proof\) তাহার উপরই বর্তায় \(Evidence Act, Section 103\)।\*\*\n\nকিন্তু বিজ্ঞ ট্রায়াল কোর্ট উল্টো বাদীকেই বাধ্য করিয়াছেন এমন একটি সংশোধন disprove করিতে/g, burdenReplacement);

    fs.writeFileSync(briefPath, brief, 'utf8');
    fs.writeFileSync(summaryPath, summary, 'utf8');
    console.log("Arguments upgraded successfully.");
}

run();
