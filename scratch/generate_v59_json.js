const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'Output');

const authorityMatrix = [
    {
        "id": "AUTH_1",
        "citation": "50 DLR 186",
        "parties": "Dayal Chandra Mondal vs. Asst. Custodian",
        "court": "High Court Division",
        "principle": "\"A record of rights finally published and revised under section 144A of the S.A.T. Act has a presumption of correctness and that presumption continues till it is rebutted by reliable evidence.\"",
        "application": "এস.এ ২৩৮ খতিয়ানটি আব্দুল আলীর নামে চূড়ান্তভাবে প্রকাশিত হইয়াছে। ফলে আইনের ১৪৪এ ধারা অনুযায়ী এই খতিয়ানটি সঠিক বলিয়া আইনি অনুমান (presumption) লাভ করে।",
        "destroyed_finding": "ট্রায়াল কোর্ট কোনো নির্ভরযোগ্য সাক্ষ্য ছাড়াই একটি State Record বাতিল করিয়াছেন।",
        "priority": 10
    },
    {
        "id": "AUTH_2",
        "citation": "35 DLR (AD) 230",
        "parties": "S.M. Basiruddin Vs. Zahurul Islam Chowdhury",
        "court": "Appellate Division",
        "principle": "\"The onus to prove that the entry in the finally published record of rights is wrong lies heavily upon the party who challenges it.\"",
        "application": "এস.এ ২৩৮ খতিয়ান দাখিল করার পর Evidence Act 103 অনুযায়ী ইহা ভুল প্রমাণ করার সম্পূর্ণ দায়ভার (Burden of Proof) ছিল বিবাদীদের।",
        "destroyed_finding": "ট্রায়াল কোর্ট বিবাদীদের ব্যর্থতাকে প্রশ্রয় দিয়া উল্টো বাদীকে দায়ভার দিয়াছেন (Burden shifting error)।",
        "priority": 10
    },
    {
        "id": "AUTH_3",
        "citation": "Evidence Act, Section 114(g)",
        "parties": "Statutory Law",
        "court": "Statute",
        "principle": "\"The court may presume that evidence which could be and is not produced would, if produced, be unfavourable to the person who withholds it.\"",
        "application": "বর্তমান মামলায় কথিত Misc Case 1181/1969 এর মূল আদেশ বা প্রত্যয়িত কপি গোপন রাখা হইয়াছে। ফলে উক্ত ধারার নীতি সরাসরি প্রযোজ্য—অর্থাৎ ডিক্রিটি বিবাদীদের বিপক্ষে ছিল।",
        "destroyed_finding": "আদেশের কপি ছাড়াই ট্রায়াল কোর্ট প্রশাসনিক মার্জিন নোট দেখিয়া আদেশের অস্তিত্ব অনুমান করিয়াছেন।",
        "priority": 9
    },
    {
        "id": "AUTH_4",
        "citation": "21 ALR (HD) 348",
        "parties": "Applicable Precedent on Dakhila",
        "court": "High Court Division",
        "principle": "খাজনার রসিদ (দাখিলা) কেবল খাজনা প্রদানের প্রমাণ, ইহা স্বত্ব (Title) বা রায়তি অধিকার সৃষ্টির কোনো দলিল নহে।",
        "application": "বিবাদীদের ১৩৩৪ বঙ্গাব্দের দাখিলাটি বিচ্ছিন্ন এবং ইহা দ্বারা পত্তন বা স্বত্ব প্রমাণিত হয় না।",
        "destroyed_finding": "ট্রায়াল কোর্ট একটি ১৩৩৪ বঙ্গাব্দের খাজনার রসিদকে মূল স্বত্ব বা পত্তন হিসেবে মানিয়াছেন।",
        "priority": 8
    },
    {
        "id": "AUTH_5",
        "citation": "18 SCOB [2023] AD 20",
        "parties": "Mrigangka Mohan Dhali vs. Chitta Ranjan Mondol",
        "court": "Appellate Division",
        "principle": "Procured or mutated SA record entries cannot override established title, and a revenue officer's entry does not determine ownership.",
        "application": "AC Land-এর একটি প্রশাসনিক ভলিউমের ভিন্ন কালিতে লেখা মার্জিন নোট কখনোই DC Record Room-এর চূড়ান্ত রেকর্ডকে বাতিল করিতে পারে না।",
        "destroyed_finding": "ট্রায়াল কোর্ট AC Land ভলিউমকে DC Record Room-এর সার্টিফাইড কপির উপর প্রাধান্য দিয়াছেন।",
        "priority": 9
    }
];
fs.writeFileSync(path.join(outDir, 'Authority_Matrix_v59.json'), JSON.stringify(authorityMatrix, null, 4));

const attackMap = [
    {
        "chapter_title": "আব্দুল করিমের রায়তি স্বত্বের মূল উৎস (Root of Tenancy) প্রমাণে সম্পূর্ণ ব্যর্থতা",
        "trial_court_finding": "ট্রায়াল কোর্ট বিবাদীদের দাবি মানিয়াছেন যে আব্দুল করিম ১৯৩৪ সালে নবাব এস্টেট হইতে পত্তন পান।",
        "argument": "আইনের সুপ্রতিষ্ঠিত নীতি হলো—বিচ্ছিন্ন খাজনার রসিদ কেবল খাজনা প্রদানের প্রমাণ, ইহা স্বত্ব (Title) বা রায়তি অধিকার সৃষ্টির কোনো দলিল নহে। বিবাদীরা পত্তন বা কবুলিয়ত দাখিল করিতে ব্যর্থ হইয়াছেন। একটি ১৩৩৪ বঙ্গাব্দের দাখিলা (যাহার ক্রমিক নং ৩৪৯, অথচ ২৩ বছর পরের ১৯৫০ সালের দাখিলার ক্রমিক নং ৩৪০) দ্বারা নবাব এস্টেটের পত্তন প্রমাণিত হয় না।",
        "auth_ids": ["AUTH_4"]
    },
    {
        "chapter_title": "এস.এ রেকর্ডের প্রামাণিকতা এবং প্রমাণের দায়ভার (Burden of Proof) উল্টানো",
        "trial_court_finding": "ট্রায়াল কোর্ট 'Bilquis Jahan' মামলার উদ্ধৃতি দিয়া বাদীকে তাহার মোকদ্দমা প্রমাণের দায়ভার দিয়াছেন এবং एस.এ রেকর্ড বাতিল করিয়াছেন।",
        "argument": "এস.এ ২৩৮ খতিয়ানটি আব্দুল আলীর নামে চূড়ান্তভাবে প্রকাশিত। এই রেকর্ডটি সঠিক বলিয়া আইনি অনুমান (presumption) লাভ করে। বাদীপক্ষ এই রেকর্ড দাখিল করার পর ইহা ভুল প্রমাণ করার সম্পূর্ণ দায়ভার ছিল বিবাদীদের। ট্রায়াল কোর্ট এই প্রতিষ্ঠিত নীতি লঙ্ঘন করিয়াছেন।",
        "auth_ids": ["AUTH_1", "AUTH_2"]
    },
    {
        "chapter_title": "সর্বোত্তম সাক্ষ্য গোপনের ফলে প্রতিকূল অনুমান (Adverse Inference) প্রযোজ্য",
        "trial_court_finding": "ট্রায়াল কোর্ট আদেশের কপি ছাড়াই Misc Case 1181/1969 এর আদেশের অস্তিত্ব মানিয়া লইয়াছেন।",
        "argument": "Evidence Act এর বিধান অনুযায়ী কোনো বিচারিক আদেশ তাহার প্রাথমিক বা মাধ্যমিক (সার্টিফাইড) কপি দ্বারা প্রমাণ করিতে হয়। বিবাদীরা উক্ত আদেশের কপি দাখিল করেন নাই।",
        "auth_ids": ["AUTH_3"]
    },
    {
        "chapter_title": "AC Land ভলিউম নোট বনাম DC Record Room-এর চূড়ান্ত রেকর্ড",
        "trial_court_finding": "ট্রায়াল কোর্ট AC Land ভলিউমকে DC Record Room-এর সার্টিফাইড কপির উপর প্রাধান্য দিয়াছেন।",
        "argument": "AC Land অফিসের সাক্ষী (DW-4) নিজেই স্বীকার করিয়াছেন যে সোনা ভানুর নাম ভিন্ন কালিতে লেখা। একটি ভিন্ন কালিতে লেখা প্রশাসনিক ভলিউম নোট কখনোই DC Record Room-এর চূড়ান্ত State Record-কে বাতিল করিতে পারে না। অধিকন্তু, ১৯৭৫ সালে বিবাদীদের নিজেদের দলিলে (৩৫৯৬ নং) এস.এ ২৩৮ খতিয়ানের ৬টি দাগের উল্লেখ প্রমাণ করে যে ১৯৬৯ সালে ১ দাগের সংশোধনের দাবিটি মিথ্যা।",
        "auth_ids": ["AUTH_5"]
    }
];
fs.writeFileSync(path.join(outDir, 'Plaintiff_Attack_Map_v59.json'), JSON.stringify(attackMap, null, 4));

console.log("v59 JSON Artifacts generated.");
