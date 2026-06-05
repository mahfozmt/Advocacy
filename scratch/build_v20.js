const fs = require('fs');

const sourcePath = 'f:/Mahfoz/Advocacy/Output/appellate_argument_v19.md';
const destPath = 'f:/Mahfoz/Advocacy/Output/appellate_argument_v20.md';

let content = fs.readFileSync(sourcePath, 'utf8');

// Normalize line endings to LF for unified processing
content = content.replace(/\r\n/g, '\n');

// Update header
content = content.replace(
    '**আপীল্যান্টপক্ষের চূড়ান্ত লিখিত যুক্তিতর্ক (Version 19 - Comprehensive & Refined)**',
    '**আপীল্যান্টপক্ষের চূড়ান্ত লিখিত যুক্তিতর্ক (Version 20 - Fully Polished & Master Edition)**'
);

// We should check if the user's specific text matches parts of v19 and polish accordingly.
// Let's do a series of key cleanups to ensure the file exactly reflects the user's elegant Bengali tone.

// Let's adjust "প্রথম অংশ" paragraph endings to perfectly match the user's draft:
content = content.replace(
    'বিবাদীদের দাবি যে তাহারা আব্দুল করিমের সূত্র ধরিয়া উত্তরাধিকারী হইয়াছেন, তাহা একটি ঐতিহাসিক ও আইনি অসম্ভাবতা।',
    'বিবাদীদের দাবি যে তাহারা আব্দুল করিমের সূত্র ধরিয়া উত্তরাধিকারী হইয়াছেন, তাহা একটি ঐতিহাসিক ও আইনি অসম্ভাবতা।' // Already perfectly matches!
);

// Let's check "ভিন্ন কালি" title in (খ) and "Plaintiff Must Prove His Own Case" in (গ).
// The user's exact draft has:
// "#### (গ) "Plaintiff Must Prove His Own Case" নীতির অপপ্রয়োগ, Evidence Act Section 103 এবং Burden Reversal-এর সঠিক নীতি"
// Let's replace the heading in v19 with the user's version:
content = content.replace(
    '#### (গ) "Plaintiff Must Prove His Own Case" নীতির অপপ্রয়োগ, Section 103 Evidence Act এবং Burden Reversal-এর সঠিক আইনি নীতি',
    '#### (গ) "Plaintiff Must Prove His Own Case" নীতির অপপ্রয়োগ, Evidence Act Section 103 এবং Burden Reversal-এর সঠিক নীতি'
);

// The user's draft has:
// "#### (ঘ) মুনসেফ কোর্টের এখতিয়ারবিহীন মিস মোকদ্দমা ১১৮১/১৯৬৯ — ৬টি সুনির্দিষ্ট আইনি ধাপে সম্পূর্ণ অকার্যকর"
// Let's replace the heading in v19 with the user's version:
content = content.replace(
    '#### (ঘ) মুনসেফ কোর্টের এখতিয়ারবিহীন মিস মোকদ্দমা ১১৮১/১৯৬৯ — একটি আইনি অলীক কল্পনা, এখতিয়ারহীনতার চরম দৃষ্টান্ত ও ৬টি সুনির্দিষ্ট আইনি ধাপ',
    '#### (ঘ) মুনসেফ কোর্টের এখতিয়ারবিহীন মিস মোকদ্দমা ১১৮১/১৯৬৯ — ৬টি সুনির্দিষ্ট আইনি ধাপে সম্পূর্ণ অকার্যকর'
);

// The user's draft has:
// "#### (চ) ৩৫৯৬/১৯৭৫ নং দলিল — উভয়পক্ষ দাখিলকৃত এই একটি দলিলই বিবাদীদের দাবির বিরুদ্ধে চারটি স্বতন্ত্র প্রমাণ বহন করে"
// Let's replace in v19:
content = content.replace(
    '#### (চ) ৩৫৯৬/১৯৭৫ নং দলিল — বিবাদীপক্ষের নিজেদের দাবির বিরুদ্ধে চারটি স্বতন্ত্র প্রমাণ',
    '#### (চ) ৩৫৯৬/১৯৭৫ নং দলিল — উভয়পক্ষ দাখিলকৃত এই একটি দলিলই বিবাদীদের দাবির বিরুদ্ধে চারটি স্বতন্ত্র প্রমাণ বহন করে'
);

content = content.replace(
    'মহামান্য আদালত, এই একটি দলিলই চারটি ভিন্ন দিক থেকে বিবাদীপক্ষের সমগ্র দাবি খণ্ডন করে।',
    'মহামান্য আদালত, ৩৫৯৬/১৯৭৫ নং দলিলটি আদালতে উপস্থিত আছে। বাদীপক্ষ ইহা দাখিল করিয়াছেন এবং ২-৮/১৯-২২ নং বিবাদীপক্ষও নিজেরাই ইহা দাখিল করিয়াছেন। এই একটি দলিলই চারটি ভিন্ন দিক থেকে বিবাদীপক্ষের সমগ্র দাবি খণ্ডন করে।'
);

// In Estoppel section, the user uses:
// "#### (ছ) Estoppel নীতি — বিবাদীদের title chain-এর সাতটি অসঙ্গতি তাহাদের দাবিকেই অকার্যকর করে"
// Let's replace in v19:
content = content.replace(
    '#### (ছ) Estoppel — বিবাদীদের title chain-এর বহুস্তরীয় অসঙ্গতি তাহাদের দাবিকেই অকার্যকর করে',
    '#### (ছ) Estoppel নীতি — বিবাদীদের title chain-এর সাতটি অসঙ্গতি তাহাদের দাবিকেই অকার্যকর করে'
);

content = content.replace(
    'মহামান্য আদালত, **Evidence Act-এর ধারা ১১৫** Estoppel-এর নীতি সুস্পষ্ট বলে — কোনো ব্যক্তি যদি তাহার কথা বা কর্ম দ্বারা অপর ব্যক্তিকে বিশ্বাস করাইয়া থাকেন এবং সেই বিশ্বাসের উপর ভিত্তি করিয়া কার্য সম্পন্ন হইয়া থাকে, তাহা হইলে পরবর্তীতে সেই কথা বা কর্মের সত্যতা অস্বীকার করিবার অধিকার তাহার থাকে না।\n\nবিবাদীপক্ষের title chain পরীক্ষা করিলে দেখা যায় যে তাহাদের নিজেদের বিভিন্ন কথা ও কর্ম পরস্পরবিরোধী:',
    `মহামান্য আদালত, **Evidence Act-এর ধারা ১১৫** Estoppel-এর নীতি সুস্পষ্ট বলে — কোনো ব্যক্তি যদি তাহার কথা বা কর্ম দ্বারা অপর ব্যক্তিকে বিশ্বাস করাইয়া থাকেন এবং সেই বিশ্বাসের উপর ভিত্তি করিয়া কার্য সম্পন্ন হইয়া থাকে, তাহা হইলে পরবর্তীতে সেই কথা বা কর্মের সত্যতা অস্বীকার করিবার অধিকার তাহার থাকে না। 

বিবাদীপক্ষের title chain পরীক্ষা করিলে দেখা যায় যে তাহাদের নিজেদের বিভিন্ন কথা ও কর্ম পরস্পরবিরোধী:`
);

// Restore CRLF for Windows compatibility
content = content.replace(/\n/g, '\r\n');

fs.writeFileSync(destPath, content, 'utf8');
console.log("Constructed v20 perfectly!");
