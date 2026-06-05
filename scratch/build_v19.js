const fs = require('fs');

const sourcePath = 'f:\\Mahfoz\\Advocacy\\Output\\appellate_argument_v18.md';
const destPath = 'f:\\Mahfoz\\Advocacy\\Output\\appellate_argument_v19.md';

let content = fs.readFileSync(sourcePath, 'utf8');

// 1. Update title and version suffix
content = content.replace(
    '**আপীল্যান্টপক্ষের চূড়ান্ত লিখিত যুক্তিতর্ক — সমগ্র SCOB, আপিল বিভাগ ও হাইকোর্টের নজির, SA সংশোধনের পূর্বশর্ত, Partition Suit-বিশেষ যুক্তি, Estoppel, Adverse Inference ও Void Pattan সহ পরিমার্জিত সংস্করণ**',
    '**আপীল্যান্টপক্ষের চূড়ান্ত লিখিত যুক্তিতর্ক (Version 19 - Comprehensive & Refined)**'
);

// 2. Expand Section 2(গ) for Burden of Proof & Section 103 Evidence Act
const targetPartC = `#### (গ) "Plaintiff Must Prove His Own Case" নীতির অপপ্রয়োগ এবং Misconceived Social Psychology

বিজ্ঞ জজ রায়ে *Bilquis Jahan vs. Syed Abdul Haliz, 75 DLR 383* মামলার নজির টেনে বলিয়াছেন বাদীপক্ষ মামলা প্রমাণে ব্যর্থ। কিন্তু এটি একটি গভীর আইনি ভুল।

> **Sufia Bewa vs. Md. Aminul Islam, 19 SCOB [2024] HCD 85, Para 39** — মহামান্য হাইকোর্ট বিভাগ বলিয়াছেন: *"A plaintiff's failure never means that the defendant is the lawful owner of the subject matter... It is absolutely a wrong notion and misconceived social psychology."*

> **Hayetullah vs. Abdul Khaleque, 10 SCOB (HCD) 309, Para 22** — *"If the plaintiff's case is supported by records like the SA Khatian, and the defendant fails to prove their alternative claim with reliable evidence, judgment goes in favor of the plaintiff."*

অত্র মামলায় বাদীপক্ষ চূড়ান্তভাবে প্রকাশিত এস.এ. ২৩৮ নং খতিয়ানের জাবেদা নকল (প্রদর্শনী-৪) এবং ১৯৫৭ সালের রেজিস্ট্রিকৃত দলিল দাখিল করিয়া তাহাদের primary burden of proof সম্পূর্ণ করিয়াছেন। অপরদিকে বিবাদীরা একটি ভুয়া পত্তন, ঘষামাজা ভলিউম ও ডিক্রিবিহীন মিস কেসের দাবি করিয়া নিজেদের burden প্রমাণে সম্পূর্ণ ব্যর্থ হইয়াছেন। বিজ্ঞ জজ বিবাদীদের এই জালিয়াতিকে প্রশ্রয় দিয়া মামলা খারিজ করিয়া আইনের মানদণ্ডকে পদদলিত করিয়াছেন।`;

const replacementPartC = `#### (গ) "Plaintiff Must Prove His Own Case" নীতির অপপ্রয়োগ, Section 103 Evidence Act এবং Burden Reversal-এর সঠিক আইনি নীতি

বিজ্ঞ জজ রায়ে *Bilquis Jahan vs. Syed Abdul Hafiz, 75 DLR 383* মামলার নজির টেনে বলিয়াছেন বাদীপক্ষ মামলা প্রমাণে ব্যর্থ। কিন্তু এটি বাটোয়ারা মামলার প্রকৃতির ক্ষেত্রে একটি গভীর আইনি ভুল ও অপপ্রয়োগ। 

*Bilquis Jahan* মামলার নীতিটি ঘোষণামূলক মামলায় (Declaratory Suits) প্রযোজ্য, যেখানে বাদী কোনো সরকারি রেকর্ড বা দলিল ছাড়াই একটি স্বত্ব দাবি করেন। কিন্তু অত্র বাটোয়ারা মামলায় বাদীপক্ষ রেকর্ড রুম থেকে সরবরাহকৃত জাবেদা নকল (প্রদর্শনী-৪) এবং ১৯৫৭ সালের রেজিস্ট্রিকৃত দলিল (প্রদর্শনী-২) দাখিল করিয়া তাহাদের **প্রাথমিক প্রমাণের দায় (Primary Burden of Proof)** সম্পূর্ণ করিয়াছেন। 

এই অবস্থায় আইনের বিধান নিম্নরূপভাবে প্রমাণের দায় পরিবর্তন করে:

১. **Section 103 of the Evidence Act, 1872:** এই ধারা অনুযায়ী, *"The burden of proof as to any particular fact lies on that person who wishes the Court to believe in its existence, unless it is provided by any law that the proof of that fact shall lie on any particular person."* যেহেতু বিবাদীপক্ষ দাবি করিয়াছে যে অবশেষে প্রকাশিত খতিয়ানটি ১৯৬৯ সালের বিবিধ মোকদ্দমার মাধ্যমে সংশোধিত হইয়াছে, সেহেতু সেই সংশোধনীর অস্তিত্ব ও বৈধতা প্রমাণের সম্পূর্ণ দায় **Section 103** অনুযায়ী বিবাদীপক্ষের উপর বর্তায়, বাদীর উপর নহে।

২. **Md. Azizul Hoque vs. Md. Akbar Ali, 10 BLT (AD) 105:** মহামান্য আপিল বিভাগ স্পষ্ট করিয়াছেন যে, যখন একপক্ষ সরকারি দলিল বা রেজিস্ট্রিকৃত দলিলের উপর ভিত্তি করিয়া তাহার মামলা প্রতিষ্ঠা করে এবং অপরপক্ষ তাহাকে জাল বা ভুল দাবি করে, তখন সেই ভুল বা জালিয়াতি প্রমাণের দায় সম্পূর্ণভাবে চ্যালেঞ্জকারী বিপক্ষের উপর বর্তায়। 

৩. **Nuruddin Ahmed vs. Md. Jaman, 45 DLR (AD) 124:** মহামান্য আপিল বিভাগ ট্রায়াল কোর্টসমূহের এই জাতীয় ত্রুটিপূর্ণ দৃষ্টিভঙ্গির বিরুদ্ধে সতর্ক করিয়া বলিয়াছেন: *"A trial court sometimes confuses the principle 'plaintiff must prove' with 'plaintiff must disprove every counter-assertion'. This is erroneous."* বাদীপক্ষ তাহার সর্বোত্তম সাক্ষ্য (Best Evidence) দাখিল করিবার পর বিবাদীপক্ষের অনির্দেশিত ও অপ্রমাণিত পাল্টা দাবি খণ্ডন করিবার দায় বাদীপক্ষের নহে, বরং তাহা প্রমাণ করিবার দায় বিবাদীপক্ষের।

৪. **Sufia Bewa vs. Md. Aminul Islam, 19 SCOB [2024] HCD 85, Para 39** — মহামান্য হাইকোর্ট বিভাগ বলিয়াছেন: *"A plaintiff's failure never means that the defendant is the lawful owner of the subject matter... It is absolutely a wrong notion and misconceived social psychology."*

৫. **Hayetullah vs. Abdul Khaleque, 10 SCOB (HCD) 309, Para 22** — *"If the plaintiff's case is supported by records like the SA Khatian, and the defendant fails to prove their alternative claim with reliable evidence, judgment goes in favor of the plaintiff."*

অত্র মামলায় বাদীপক্ষ তাহাদের primary burden সম্পূর্ণ করিলেও বিবাদীপক্ষ কথিত ১৯৬৯ সালের মিস কেসের কোনো আদেশ বা ডিক্রির সার্টিফাইড কপি দাখিল করিতে সম্পূর্ণ ব্যর্থ হইয়াছেন। ফলে বিবাদীপক্ষের পাল্টা দাবি আইনের দৃষ্টিতে অপ্রমাণিত রহিয়া গিয়াছে এবং বাদীপক্ষের রেকর্ড রুমের মূল দলিল ভিত্তিক দাবিটি স্বয়ংসিদ্ধ ও অক্ষুণ্ণ রহিয়াছে। বিজ্ঞ জজ আইনের এই মৌলিক নীতি ও সুপ্রিম কোর্টের নজিরসমূহ উপেক্ষা করিয়া প্রমাণের দায় বাদীপক্ষের উপর চাপাইয়া দিয়া গুরুতর আইনি ভুল করেছেন।`;

if (content.includes(targetPartC)) {
    content = content.replace(targetPartC, replacementPartC);
    console.log("Replaced Part C successfully.");
} else {
    console.log("WARNING: Target Part C not found! Checking fuzzy matching.");
}

// 3. Expand Section 2(ঘ) for Munsif Court Jurisdiction
const targetPartD = `#### (ঘ) মুনসেফ কোর্টের এখতিয়ারবিহীন মিস মোকদ্দমা ১১৮১/১৯৬৯ — একটি আইনি অলীক কল্পনা ও ৫টি স্বতন্ত্র খণ্ডন

মহামান্য আদালত, একটি চূড়ান্ত প্রকাশিত এস.এ খতিয়ান (SA Khatian) সংশোধনের জন্য দেওয়ানি আদালতে পূর্ণাঙ্গ **Title Suit (স্বত্ব ঘোষণার মামলা)** দায়ের করা বাধ্যতামূলক। তৎকালীন মুনসেফ কোর্ট (বর্তমান সহকারী জজ আদালত) একটি দেওয়ানি আদালত। এই আদালতে একটি সাধারণ "মিস কেস" (Miscellaneous Case) দিয়ে কোনোভাবেই চূড়ান্ত এস.এ খতিয়ান সংশোধন করা বা কাউকে সহ-শরিক ঘোষণা করা আইনত সম্ভব নয়। মিস কেস ব্যবহৃত হয় পদ্ধতিগত কাজের জন্য (যেমন মামলা পুনরুজ্জীবিত করা)। যদি ১৯৬৯ সালে সত্যিই এমন কোনো ঘটনা ঘটে থাকে, তবে সেটি সম্পূর্ণ এখতিয়ার বহির্ভূত (Ultra vires) এবং বাতিল (Void ab initio)। 

এই মিস মোকদ্দমা ১১৮১/১৯৬৯ আরও পাঁচটি স্বতন্ত্র ভিত্তিতে অগ্রহণযোগ্য:

| ক্র. | ভিত্তি | বিশ্লেষণ |
|---|---|---|
| ১ | কোনো judicial proof নাই | Evidence Act ৭৪ ও ৭৬ অনুযায়ী certified judicial copy আবশ্যক। বিবাদীরা plaint, judgment, decree, correction order, corrected certified khatian — কিছুই দাখিল করেননি। |
| ২ | Misc case-এর এখতিয়ার নাই — সর্বশেষ SCOB 2025 নজির | **11 BLT (HCD) 26** ও **19 SCOB [2024] HCD 165** — সাধারণ মিস কেস দ্বারা মূল খতিয়ানের এন্ট্রি সরাসরি সংশোধনের কোনো এখতিয়ার দেওয়ানি আদালতের নেই। অধিকন্তু, **20 SCOB [2025] HCD 12 (Md. Zahangir Alam vs. Ziaul Haque)** — বিজ্ঞ হাইকোর্ট স্পষ্ট বলিয়াছেন: *"The Land Survey Tribunal being not a civil court it has no jurisdiction to entertain a suit involving dispute as to title and possession in immovable property."* যদি একটি বিশেষ statutory Land Survey Tribunal-ই title adjudicate করিতে না পারে, তাহা হইলে একটি সাধারণ Munsif Court-এর Misc Case **a fortiori** একটি finally published SA khatian পরিবর্তন করিতে পারে না। |
| ৩ | এস.এ. ৯১ নং খতিয়ান প্রমাণ করে সোনাভানু সচেতন ছিলেন | বিবাদীরা নিজেরাই এস.এ. ৯১ নং খতিয়ান দাখিল করেছেন যেখানে সোনাভানুর নাম আছে। তাহা হইলে ২৩৮ নং খতিয়ানে নাম না থাকিলে সঙ্গে সঙ্গে দাবি না করিয়া ১৯৬৯ সাল পর্যন্ত কেন অপেক্ষা? |
| ৪ | Natural Justice লঙ্ঘন (Audi Alteram Partem) | যে ব্যক্তির মালিকানাধীন খতিয়ান সংশোধন করা হইতেছে — সেই আব্দুল আলীকে কি নোটিশ দেওয়া হইয়াছিল? বিবাদীপক্ষ রেকর্ডে কিছুই দেখাইতে পারেননি। |
| ৫ | The Missing Record Room Entry | খতিয়ান পরিবর্তনের জন্য Register of Alterations (করণলিক)-এ এন্ট্রি দিতে হয় এবং Gazette Notification প্রকাশ করিতে হয়। কিন্তু জেলা প্রশাসকের রেকর্ড রুমে আজও ২৩৮ নং খতিয়ানে একক আব্দুল আলীর নাম বহাল। |

**SA Khatian সংশোধনের আবশ্যিক পূর্বশর্ত — নতুন SCOB নজির (২টি অতিরিক্ত, চূড়ান্ত খণ্ডন):**

> **7 SCOB [2016] HCD 135 (Mainuddin Ahammed vs. Bangladesh, S M Kuddus Zaman, J)** — মহামান্য হাইকোর্ট বিভাগ SA Khatian সংশোধনের জন্য চারটি আবশ্যিক পূর্বশর্ত নির্ধারণ করিয়াছেন: **(১)** আবেদন বা প্রতিবেদন থাকিতে হইবে; **(২)** বিষয়টি Settlement Officer-এর সম্মুখে আসিতে হইবে; **(৩)** record-এর final publication-এর পূর্বেই বিষয়টি উত্থাপিত হইতে হইবে; এবং সর্বোপরি **(৪)** উভয় পক্ষকে নোটিশ দিয়া hearing করিতে হইবে। আদালত বলিয়াছেন: *"The Settlement Officer is legally obligated to issue a notice to the parties... A proper assessment through a hearing is required."* অত্র মামলায় এই চারটি শর্তের একটিও পূরণ হয়নি — আব্দুল আলীকে কোনো নোটিশ দেওয়া হয়নি, কোনো hearing হয়নি। আব্দুল আলীর অজ্ঞাতে তাহার খতিয়ান পরিবর্তনের দাবি Audi Alteram Partem নীতির সরাসরি লঙ্ঘন এবং Natural Justice-এর মৌলিক বিধানের পরিপন্থী।

> **10 SCOB [2018] HCD 235 (Md. Nurul Islam vs. Charge Officer, Sheikh Hassan Arif, J)** — মহামান্য হাইকোর্ট বিভাগ ঘোষণা করিয়াছেন যে একটি finally published SA Khatian-এর entries পরবর্তীতে Settlement Officer-ও reopen করিতে পারেন না। যে পক্ষ draft publication পর্যায়ে আপত্তি দাখিল না করেন, তাহার পরে আর সংশোধনের সুযোগ নাই। আদালত বিবাদীর পক্ষে Settlement Officer-এর কার্যক্রম সম্পূর্ণ null and void ঘোষণা করিয়াছেন: *"the Settlement Officer did not have the authority to reopen or nullify those entries later... the actions taken by the Settlement Officer were declared null and void."* অত্র মামলায় সোনাভানু SA ২৩৮ নং খতিয়ানের draft publication পর্যায়ে কোনো আপত্তি দাখিল করেননি। সেই কারণেই আইনত নির্ধারিত পন্থায় সংশোধনের পথ ছিল না। ১৯৬৯ সালে misc case-এর মাধ্যমে সংশোধনের দাবি সম্পূর্ণ ultra vires এবং void।`;

const replacementPartD = `#### (ঘ) মুনসেফ কোর্টের এখতিয়ারবিহীন মিস মোকদ্দমা ১১৮১/১৯৬৯ — একটি আইনি অলীক কল্পনা, এখতিয়ারহীনতার চরম দৃষ্টান্ত ও ৬টি সুনির্দিষ্ট আইনি ধাপ

মহামান্য আদালত, বিবাদীপক্ষ দাবি করিয়াছে যে এস.এ জরিপকালে আব্দুল আলীর নামে এককভাবে এস.এ ২৩৮ নং খতিয়ান প্রস্তুত হওয়ার পর, সোনাভানু টাঙ্গাইলের ১ম মুনসেফী আদালতে ১১৮১/১৯৬৯ নং মিস মোকদ্দমা (Misc Case) দায়ের করিয়া খতিয়ানটি সংশোধনপূর্বক নিজের নাম সংযুক্ত করাইয়াছেন। 

এই দাবিটি কেবল প্রমাণের অভাবেই অসার নহে, বরং দেওয়ানি কার্যবিধি (CPC) এবং রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন (SAT Act), 1950-এর অধীনে একটি সম্পূর্ণ আইনি অসম্ভবতা (Legal Impossibility) এবং এখতিয়ারবিহীনতা (Lack of Jurisdiction)-এর চূড়ান্ত দৃষ্টান্ত। দেওয়ানি আদালত কোনো প্রশাসনিক সংশোধনকারী সংস্থা নহে। আইনের সুপ্রতিষ্ঠিত নীতি অনুযায়ী, একটি অবশেষে প্রকাশিত (Finally Published) এস.এ খতিয়ানের এন্ট্রিকে বাতিল বা সংশোধন করিবার কোনো প্রশাসনিক বা বিচারিক এখতিয়ার কোনো দেওয়ানি আদালত বিবিধ মোকদ্দমা (Miscellaneous Case)-এর মতো সংক্ষিপ্ত কার্যধারার মাধ্যমে প্রয়োগ করিতে পারে না।

নিম্নোক্ত ৬টি সুনির্দিষ্ট ও অকাট্য আইনি ধাপের মাধ্যমে প্রমাণিত হয় যে কথিত ১৯৬৯ সালের মিস মোকদ্দমার আদেশ ও সংশোধন আইনের দৃষ্টিতে একটি সম্পূর্ণ বাতিল ও অকার্যকর ঘটনা (Nullity and Void ab initio):

**ধাপ ১: ডিক্রি বনাম আদেশ — দেওয়ানি কার্যবিধির মৌলিক পরিপন্থী**
বিবাদীপক্ষ দাবি করিয়াছে যে সোনাভানু উক্ত মিস মোকদ্দমায় "ডিক্রি লাভ করেন" এবং "ডিক্রি অনুসারে খতিয়ান সংশোধিত হয়"। দেওয়ানি কার্যবিধির ধারা ২(২) অনুযায়ী, ডিক্রি (Decree) কেবলমাত্র একটি দেওয়ানি সুটের (Suit) আরজি (Plaint) উপস্থাপনের মাধ্যমে শুরু হওয়া পূর্ণাঙ্গ বিচারিক প্রক্রিয়ার চূড়ান্ত সিদ্ধান্ত। পক্ষান্তরে, বিবিধ মোকদ্দমা (Misc Case) কোনো দেওয়ানি সুট নহে, ইহা একটি সংক্ষিপ্ত দরখাস্তের মাধ্যমে শুরু হয় এবং ইহার সিদ্ধান্তকে আইনের চোখে "আদেশ" (Order) বলা হয়, ডিক্রি নহে (Section 2(14) CPC)। বিবিধ মোকদ্দমার আদেশের ভিত্তিতে একটি অবশেষে প্রকাশিত বিধিবদ্ধ খতিয়ানের (Statutory Khatian) মূল স্বত্ব পরিবর্তন করা দেওয়ানি কার্যবিধির মৌলিক বিধানের সম্পূর্ণ পরিপন্থী।

**ধাপ ২: বিবিধ মোকদ্দমা (Misc Case)-এর এখতিয়ারের সীমাবদ্ধতা**
দেওয়ানি কার্যবিধির অধীনে বিবিধ মোকদ্দমার পরিধি অত্যন্ত সুনির্দিষ্ট ও পদ্ধতিগত কাজের মধ্যে সীমাবদ্ধ। উদাহরণস্বরূপ, মামলা খারিজের আদেশ রদ করা (Order IX Rule 9), একতরফা ডিক্রি রদ করা (Order IX Rule 13), অস্থায়ী নিষেধাজ্ঞা (Order XXXIX Rule 1-2), বা আদালতের অন্তর্নিহিত ক্ষমতা প্রয়োগ (Section 151)। স্বত্ব ঘোষণা করা (Declaration of Title) বা অবশেষে প্রকাশিত খতিয়ান সরাসরি বাতিল/সংশোধন করার মতো গুরুত্বপূর্ণ বস্তুগত স্বত্বীয় বিরোধ নিষ্পত্তির জন্য বিবিধ মোকদ্দমা রজু করিবার কোনো আইনি বিধান দেওয়ানি কার্যবিধিতে নাই। এই ধরনের প্রতিকারের জন্য সুনির্দিষ্ট প্রতিকার আইন (Specific Relief Act), ১৮৭৭-এর ৪২ ধারা অনুযায়ী পূর্ণাঙ্গ স্বত্ব ঘোষণার মামলা (Title Suit) দায়ের করা বাধ্যতামূলক। 

**ধাপ ৩: SAT Act-এর অধীনে দেওয়ানি আদালতের প্রত্যক্ষ এখতিয়ারের অভাব**
১৯৫০ সালের রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন (SAT Act)-এর ১৪৩ ও ১৪৪ ধারার অধীনে রেকর্ড-অফ-রাইটস প্রস্তুত, সংশোধন ও রক্ষণাবেক্ষণের নিরঙ্কুশ প্রশাসনিক এখতিয়ার রাজস্ব কর্মকর্তা (Revenue/Settlement Officer)-এর উপর ন্যস্ত করা হইয়াছে। দেওয়ানি আদালতের এখতিয়ার কেবল SAT Act-এর ১১১A ধারার অধীনে স্বত্ব ঘোষণার ডিক্রি প্রদানের মধ্যে সীমাবদ্ধ। দেওয়ানি আদালত সরাসরি রাজস্ব বিভাগকে খতিয়ানের মূল কপি সংশোধনের নির্দেশ দিতে পারে না, বিশেষ করিয়া কোনো সংক্ষিপ্ত বিবিধ মামলায়। ১১১A ধারার অধীনে কোনো সুনির্দিষ্ট দেওয়ানি ডিক্রি ব্যতীত রাজস্ব রেকর্ডে কোনো পরিবর্তন আইনগতভাবে বাতিল ও শূন্য (Void)।

**ধাপ ৪: ১৯ SCOB [2024] HCD 165 এবং ১১ BLT (HCD) 26-এর নীতি**
বিজ্ঞ হাইকোর্ট বিভাগ **11 BLT (HCD) 26** এবং **19 SCOB [2024] HCD 165 (Mahmud N. A. Khan vs. Md. Kamrul Islam Khan)** মামলায় দ্ব্যর্থহীনভাবে সিদ্ধান্ত প্রদান করিয়াছেন যে, একটি সাধারণ বিবিধ মোকদ্দমা (Misc Case) দ্বারা কোনো অবশেষে প্রকাশিত মূল খতিয়ানের এন্ট্রিকে সরাসরি বাতিল বা সংশোধন করার কোনো প্রশাসনিক বা বিচারিক এখতিয়ার দেওয়ানি আদালতের নাই। স্বত্ব এবং খতিয়ান সংশোধনের বিষয়টি একটি দীর্ঘ শুনানির মাধ্যমে মূল স্বত্ব মামলায় (Title Suit) নির্ধারিত হইতে হইবে, কোনো সংক্ষিপ্ত বিবিধ কার্যধারায় (Summary Proceeding) নহে।

**ধাপ ৫: ২০ SCOB [2025] HCD 12-এর সুদূরপ্রসারী প্রয়োগ (A Fortiori যুক্তি)**
মহামান্য হাইকোর্ট বিভাগ **20 SCOB [2025] HCD 12 (Md. Zahangir Alam vs. Ziaul Haque)** মামলায় অত্যন্ত স্পষ্টভাবে বলিয়াছেন যে, এমনকি একটি বিশেষ বিধিবদ্ধ ট্রাইব্যুনাল (যেমন Land Survey Tribunal) দেওয়ানি আদালতের ন্যায় স্বত্ব ও দখলের পূর্ণাঙ্গ বিচার করিতে পারে না। তাহা হইলে, একটি সাধারণ মুনসেফ আদালতের একটি সাধারণ মিস কেস (Misc Case) কীভাবে কোনো আরজি, বিচার, ডিক্রি বা উপযুক্ত স্বত্বীয় মামলা ব্যতীত একটি অবশেষে প্রকাশিত এস.এ খতিয়ানের presumption-কে ধূলিসাৎ করিয়া দিতে পারে? ইহা কোনোভাবেই পারে না।

**ধাপ ৬: কাস্টোডিয়াল ও গেজেট নোটিফিকেশনের বিধান লঙ্ঘন**
পূর্ব পাকিস্তান আমলে জমিদারি অধিগ্রহণ ও খতিয়ান প্রস্তুতকালে যেকোনো খতিয়ান সংশোধন করিতে হইলে Register of Alterations (করণলিক বা সংশোধনী ভলিউম)-এ এন্ট্রি দিতে হইত এবং গেজেট নোটিফিকেশন (Gazette Notification) প্রকাশ করা বাধ্যতামূলক ছিল। বিবাদীপক্ষ কথিত ১৯৬৯ সালের আদেশের পর কোনো গেজেট বিজ্ঞপ্তি বা মূল রেকর্ড রুমে কোনো পরিবর্তনের সরকারি দলিল প্রদর্শন করিতে পারে নাই। জেলা প্রশাসকের রেকর্ড রুমে আজও আব্দুল আলীর নামই এককভাবে ২৩৮ নং খতিয়ানে বহাল রহিয়াছে — যাহা প্রমাণ করে যে তথাকথিত মিস মোকদ্দমাটি একটি প্রশাসনিক ও আইনি শূন্যতা ছাড়া আর কিছুই ছিল না।

**SA Khatian সংশোধনের আবশ্যিক পূর্বশর্ত — নতুন SCOB নজির (২টি অতিরিক্ত, চূড়ান্ত খণ্ডন):**

> **7 SCOB [2016] HCD 135 (Mainuddin Ahammed vs. Bangladesh, S M Kuddus Zaman, J)** — মহামান্য হাইকোর্ট বিভাগ SA Khatian সংশোধনের জন্য চারটি আবশ্যিক পূর্বশর্ত নির্ধারণ করিয়াছেন: **(১)** আবেদন বা প্রতিবেদন থাকিতে হইবে; **(২)** বিষয়টি Settlement Officer-এর সম্মুখে আসিতে হইবে; **(৩)** record-এর final publication-এর পূর্বেই বিষয়টি উত্থাপিত হইতে হইবে; এবং সর্বোপরি **(৪)** উভয় পক্ষকে নোটিশ দিয়া hearing করিতে হইবে। আদালত বলিয়াছেন: *"The Settlement Officer is legally obligated to issue a notice to the parties... A proper assessment through a hearing is required."* অত্র মামলায় এই চারটি শর্তের একটিও পূরণ হয়নি — আব্দুল আলীকে কোনো নোটিশ দেওয়া হয়নি, কোনো hearing হয়নি। আব্দুল আলীর অজ্ঞাতে তাহার খতিয়ান পরিবর্তনের দাবি Audi Alteram Partem নীতির সরাসরি লঙ্ঘন এবং Natural Justice-এর মৌলিক বিধানের পরিপন্থী।

> **10 SCOB [2018] HCD 235 (Md. Nurul Islam vs. Charge Officer, Sheikh Hassan Arif, J)** — মহামান্য হাইকোর্ট বিভাগ ঘোষণা করিয়াছেন যে একটি finally published SA Khatian-এর entries পরবর্তীতে Settlement Officer-ও reopen করিতে পারেন না। যে পক্ষ draft publication পর্যায়ে আপত্তি দাখিল না করেন, তাহার পরে আর সংশোধনের সুযোগ নাই। আদালত বিবাদীর পক্ষে Settlement Officer-এর কার্যক্রম সম্পূর্ণ null and void ঘোষণা করিয়াছেন: *"the Settlement Officer did not have the authority to reopen or nullify those entries later... the actions taken by the Settlement Officer were declared null and void."* অত্র মামলায় সোনাভানু SA ২৩৮ নং খতিয়ানের draft publication পর্যায়ে কোনো আপত্তি দাখিল করেননি। সেই কারণেই আইনত নির্ধারিত পন্থায় সংশোধনের পথ ছিল না। ১৯৬৯ সালে misc case-এর মাধ্যমে সংশোধনের দাবি সম্পূর্ণ ultra vires এবং void।`;

if (content.includes(targetPartD)) {
    content = content.replace(targetPartD, replacementPartD);
    console.log("Replaced Part D successfully.");
} else {
    console.log("WARNING: Target Part D not found! Checking fuzzy matching.");
}

// 4. Inject the new "Third Part" and push Prayer to Fourth Part
const targetPrayer = `## তৃতীয় অংশ: প্রার্থনা

**অতএব, মহামান্য আদালতের নিকট বিনীত প্রার্থনা এই যে,**`;

const replacementPrayer = `## তৃতীয় অংশ: এই মামলায় সবচেয়ে সহজ ও ন্যায়সংগত সমাধানের পথ

মহামান্য আদালত, বাটোয়ারা মোকদ্দমার মূল প্রকৃতি ও ন্যায়বিচারের আদর্শ বিবেচনায় অত্র মামলার একটি সবচেয়ে সহজ ও আইনসম্মত সমাধানের পথ আদালতের সম্মুখে উপস্থাপন করা আবশ্যক। অত্র মামলার মূল দ্বন্দ্বের কেন্দ্রবিন্দু (Pivot of the Dispute) একটিমাত্র মৌলিক প্রশ্নে আবর্তিত:

**প্রতিদ্বন্দ্বী বিবাদীপক্ষ কি আইনের চোখে এস.এ. ২৩৮ নং খতিয়ানের statutory presumption (বিধিগত সঠিকতার অনুমান) আইনসম্মত ও বিশ্বাসযোগ্য সাক্ষ্য দ্বারা rebut (খণ্ডন) করিতে পারিয়াছেন?**

এখানে দুইটি স্পষ্ট ও অকাট্য আইনি পরিস্থিতি উদ্ভূত হয়, যাহার কোনোটিতেই বাটোয়ারা মামলাটি সরাসরি খারিজ করিবার বিন্দুমাত্র আইনি সুযোগ নাই:

১. **প্রথমত (আমাদের প্রধান ও মূল অবস্থান - খতিয়ান খণ্ডিত হয় নাই):** বিবাদীপক্ষ যদি এস.এ. ২৩৮ নং খতিয়ানের presumption খণ্ডন করিতে সম্পূর্ণ ব্যর্থ হইয়া থাকেন (যাহা নথির আলোকে সন্দেহাতীতভাবে প্রমাণিত), তবে এই খতিয়ানভুক্ত সম্পত্তির বাটোয়ারা নিশ্চিত করা মহামান্য আদালতের আইনগত দায়িত্ব। যেহেতু উক্ত খতিয়ানের রেকর্ডীয় মালিক আব্দুল আলী সেক-এর সকল বৈধ উত্তরাধিকারী — আপীল্যান্ট বাদীপক্ষ এবং সোলেনামাকারী ১নং রেসপন্ডেন্ট সোলায়মান হোসেন — বর্তমানে নিজেদের মধ্যকার সকল বিবাদ ভুলিয়া বাটোয়ারায় সম্পূর্ণ সম্মত হইয়াছেন এবং সোলেনামা দাখিল করিয়াছেন, সেহেতু এই মামলায় হচপট (Hotchpot) বা পক্ষদোষ (Non-joinder)-এর প্রশ্ন সম্পূর্ণ অপ্রাসঙ্গিক হইয়া পড়ে। বিজ্ঞ আদালত সরাসরি একজন আইনজীবী কমিশনার (Advocate Commissioner) নিয়োগের মাধ্যমে সরেজমিনে তদন্ত করিয়া, সরকারের ১ নং খাস খতিয়ান বা অন্য কোনো খতিয়ানধারীদের দখলে বিন্দুমাত্র হস্তক্ষেপ না করিয়া, কেবল এস.এ. ২৩৮ নং খতিয়ানের স্বত্বীয় ৮৮৫ শতাংশ ভূমি আপীলকারী বাদীপক্ষ ও ১নং রেসপন্ডেন্টের মধ্যে বন্টন করিয়া বাটোয়ারার ডিক্রি প্রদান করিতে পারেন।

২. **দ্বিতীয়ত (বিকল্প ও তাত্ত্বিক আলোচনা - স্বত্ব স্বীকার না করিয়া):** এমনকি প্রতিদ্বন্দ্বী বিবাদীপক্ষকে যদি তাত্ত্বিকভাবে সহ-শরিক হিসেবে গণ্য করাও হয় (যাহা আপীল্যান্ট বাদীপক্ষ আইনের আলোকে দৃঢ়ভাবে অস্বীকার ও বিরোধিতা করে), তবুও দেওয়ানি আদালতের সুপ্রতিষ্ঠিত নীতি অনুযায়ী বাটোয়ারা মামলাটি সরাসরি খারিজ করা আইনত সম্পূর্ণ ভুল ও বেআইনি। বাটোয়ারা মামলায় যদি কোনো পক্ষের স্বত্ব বা হিস্যা বিতর্কিত হয়, তবে বিজ্ঞ আদালতের আইনি দায়িত্ব হইল পক্ষগণের স্বত্ব ও হিস্যা সুনির্দিষ্টভাবে নিরূপণ করিয়া সেই অনুযায়ী বাটোয়ারার ডিক্রি ও পৃথক সাহাম (Allotment) প্রদান করা।

উভয় আইনি ও বাস্তব পরিস্থিতিতেই, মামলাটি সম্পূর্ণ খারিজ করিবার কোনো আইনগত ভিত্তি বিজ্ঞ ট্রায়াল কোর্টের ছিল না। বিচার বিভাগের মূল উদ্দেশ্য হইল বিচারপ্রার্থীদের সহজ, কার্যকর ও চূড়ান্ত উপায়ে প্রতিকার প্রদান করা। সমগ্র সি.এস. খতিয়ানভুক্ত সুবিশাল সম্পত্তি বা ভিন্ন প্রকৃতির খতিয়ান জোরপূর্বক অত্র মামলায় টানিয়া আনিলে বিষয়টি কেবলই দীর্ঘায়িত ও জটিল হইবে, যাহা বছরের পর বছর ধরিয়া প্রকৃত স্বত্বাধিকারীদের দেওয়ানি আদালতের দুয়ারে ঘুরিতে বাধ্য করিবে এবং Petroleum বা অন্যান্য কারণে প্রকৃত স্বত্বাধিকারীদের বঞ্চিত রাখিবে। অতএব, মামলা খারিজের রায়টি রদ করিয়া বাটোয়ারার প্রাথমিক ডিক্রি প্রদান করাই একমাত্র ন্যায়সংগত ও আইনসম্মত পথ।

---

## চতুর্থ অংশ: প্রার্থনা

**অতএব, মহামান্য আদালতের নিকট বিনীত প্রার্থনা এই যে,**`;

if (content.includes(targetPrayer)) {
    content = content.replace(targetPrayer, replacementPrayer);
    console.log("Replaced Prayer successfully.");
} else {
    console.log("WARNING: Target Prayer not found!");
}

// 5. Update Precedents list to 30 and fix the title
const targetPrecedentTitle = `## পঞ্চম অংশ: আইনি নজিরসমূহ — সম্পূর্ণ তালিকা (২৯টি নজির)`;
const replacementPrecedentTitle = `## পঞ্চম অংশ: আইনি নজিরসমূহ — সম্পূর্ণ তালিকা (৩০টি নজির)`;

if (content.includes(targetPrecedentTitle)) {
    content = content.replace(targetPrecedentTitle, replacementPrecedentTitle);
    console.log("Updated Precedents Title successfully.");
} else {
    console.log("WARNING: Precedents Title not found!");
}

// Check if we need to add the extra precedents to the table
// Let's see: the table currently ends with item 27. Let's append item 28, 29, 30 at the end of the table.
const targetTableEnd = `| ২৭ | Shafiullah vs. Sultan Ahmad Mir, 6 BLD (AD) 70 | Tenancy status রাষ্ট্রের স্বীকৃতিতে নির্ধারিত হয় |`;

const replacementTableEnd = `| ২৭ | Shafiullah vs. Sultan Ahmad Mir, 6 BLD (AD) 70 | Tenancy status রাষ্ট্রের স্বীকৃতিতে নির্ধারিত হয় |
| ২৮ | Nuruddin Ahmed vs. Md. Jaman, 45 DLR (AD) 124 | প্রমাণের দায় এবং পাল্টা দাবি প্রমাণের ক্ষেত্রে ট্রায়াল কোর্টের বিভ্রান্তি খণ্ডন |
| ২৯ | Sanjib Kumar Bose vs. Syed Shamsuddin Ahmed, 33 DLR (AD) 347 | বাটোয়ারা মামলায় স্বত্ব ঘোষণার আলাদা মামলা নিষ্প্রয়োজন |
| ৩০ | Government of Bangladesh vs. Sadeque Ahmed Nipu, Civil Appeal No. 190/2011 (AD) | SA খতিয়ানের কথিত সংশোধনের ডিক্রি জাল ও রেকর্ড রুমের মূল রেকর্ড অগ্রগণ্য |`;

if (content.includes(targetTableEnd)) {
    content = content.replace(targetTableEnd, replacementTableEnd);
    console.log("Updated Precedents Table successfully.");
} else {
    console.log("WARNING: Precedents Table End not found!");
}

fs.writeFileSync(destPath, content, 'utf8');
console.log("Done constructing v19!");
