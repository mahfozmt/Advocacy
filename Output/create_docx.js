const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                text: "আপিল শুনানির সওয়াল-জওয়াব (Oral Argument)",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "বিজ্ঞ আদালত / মাননীয় আদালত,",
                        bold: true,
                        size: 28,
                    }),
                ],
                spacing: { before: 200, after: 100 },
            }),
            new Paragraph({
                text: "এটি সখিপুর সিভিল জজ আদালতের বাটোয়ারা মামলা নং ৬৬/২০১৬-এর ০৫/০৪/২০২৬ তারিখের রায়ের বিরুদ্ধে একটি আপিল শুনানি। নিম্ন আদালত মামলাটি খারিজ করে সুবিচার নিশ্চিত করতে ব্যর্থ হয়েছেন এবং আইনের গুরুতর অপপ্রয়োগ করেছেন। আমি আপিলকারী/বাদীর পক্ষে উপস্থিত হয়েছি এবং আপনার সদয় অনুমতিতে আমার বক্তব্য পেশ করছি।",
            }),
            new Paragraph({
                text: "১. বাদীর অধিকার ও স্বত্বের অকাট্য ভিত্তি (Appellant's Right Justification)",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
                text: "মাননীয় আদালত, আমার মক্কেলদের (বাদীদের) স্বত্বের ভিত্তি অত্যন্ত সুস্পষ্ট এবং অকাট্য। আমরা রেকর্ড রুম থেকে সার্টিফাইড এস.এ (SA) খতিয়ান নং ২৩৮ দাখিল করেছি, যা এককভাবে আব্দুল আলীর নামে রেকর্ডকৃত। পাশাপাশি ১৯৫৭ সালের একটি রেজিস্ট্রিকৃত দলিল উপস্থাপন করেছি। Evidence Act-এর Section 114(a) এবং State Acquisition and Tenancy Act 1950-এর Section 144A অনুযায়ী, চূড়ান্তভাবে প্রকাশিত রেকর্ড রুমের এস.এ খতিয়ানের সত্যতার একটি আইনি অনুমান (presumption of correctness) রয়েছে। আমরা এই সেরা প্রমাণ (Best Evidence) আদালতে উপস্থাপন করে আমাদের প্রাথমিক প্রমাণের দায় (Primary burden of proof) সম্পূর্ণভাবে পূরণ করেছি।",
            }),
            new Paragraph({
                text: "২. বিবাদীদের দাবির অসারতা ও জালিয়াতি (Expose Respondent/Defendant Inconsistencies)",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
                text: 'বিপরীত দিকে, বিবাদীরা দাবি করছেন যে ১৯৬৯ সালের একটি মিস কেসের (নং ১১৮১/১৯৬৯) মাধ্যমে সোনাবানুর নাম এস.এ খতিয়ানে অন্তর্ভুক্ত হয়েছে। কিন্তু মাননীয় আদালত, এটি একটি নিরেট জালিয়াতি। "Fraus omnia corrumpit" - প্রতারণা সবকিছু ধ্বংস করে।',
            }),
            new Paragraph({
                bullet: { level: 0 },
                children: [
                    new TextRun({ text: "প্রথমত, ", bold: true }),
                    new TextRun({ text: "তারা ওই কথিত মিস কেসের কোনো সার্টিফাইড কপি, আদেশ বা ডিক্রি দাখিল করতে পারেননি। Evidence Act-এর Section 114(g) অনুযায়ী, প্রয়োজনীয় দলিল আটকে রাখলে বা দাখিল না করলে আদালতের ধরে নেওয়া উচিত যে সেই দলিলটি তাদের বিপক্ষে যেত।" }),
                ],
            }),
            new Paragraph({
                bullet: { level: 0 },
                children: [
                    new TextRun({ text: "দ্বিতীয়ত, ", bold: true }),
                    new TextRun({ text: "রেকর্ড রুমে এই মিস কেসের কোনো অস্তিত্ব নেই। শুধু এসি ল্যান্ড অফিসের ভলিউমের মার্জিনে ভিন্ন কালিতে একটি ভুয়া এন্ট্রি করা হয়েছে। এসি ল্যান্ডের মিউটেশন ভলিউমের কোনো \"Presumption of correctness\" নেই, যা মাননীয় হাইকোর্ট \"Shahera Khatun v. State (53 DLR 19)\"-এ স্পষ্টভাবে বলেছেন।" }),
                ],
            }),
            new Paragraph({
                bullet: { level: 0 },
                children: [
                    new TextRun({ text: "তৃতীয়ত, ", bold: true }),
                    new TextRun({ text: "বিবাদীদের নিজেদের দলিলেই তাদের জালিয়াতি ধরা পড়েছে। তারা দাবি করেন ১৯৬৯ সালের কথিত সংশোধনের পর মাত্র ১টি দাগ অবশিষ্ট ছিল, অথচ তাদের নিজেদের করা ১৯৭৫ সালের দলিলেই খতিয়ান ২৩৮-এর অধীনে ৬টি দাগের উল্লেখ রয়েছে! যে পক্ষ নিজের দলিলেই স্ব-বিরোধী কথা বলে, তারা \"S.P. Chengalvaraya Naidu\" মামলার নীতি অনুযায়ী আদালতের সাথে প্রতারণা করেছেন। Evidence Act-এর Section 103 অনুযায়ী, তারা যেহেতু খতিয়ান সংশোধনের দাবি করেছে, সেটি প্রমাণের দায় সম্পূর্ণ তাদের, যা তারা প্রমাণ করতে চরমভাবে ব্যর্থ হয়েছে।" }),
                ],
            }),
            new Paragraph({
                text: "৩. নিম্ন আদালতের রায়ের আইনগত ত্রুটি (Error in Lower Judgment)",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
                text: "মাননীয় আদালত, নিম্ন আদালতের বিজ্ঞ বিচারক সম্পূর্ণ আইনি ভুল প্রয়োগ করে মামলাটি খারিজ করেছেন:",
            }),
            new Paragraph({
                bullet: { level: 0 },
                children: [
                    new TextRun({ text: "আবশ্যকীয় পক্ষের অ-সম্মিলন (DC-কে পক্ষ না করা): ", bold: true }),
                    new TextRun({ text: "দাগ ১২৫৯-এর কিছু অংশ খাস জমি হওয়ায় ডিসি-কে পক্ষ করা হয়নি বলে নিম্ন আদালত মামলা খারিজ করেছেন। অথচ দেওয়ানী কার্যবিধির Order I Rule 9 অত্যন্ত স্পষ্টভাবে বলছে, \"No suit shall be defeated by reason of the misjoinder or non-joinder of parties.\" \"Abdul Quayuam Khan v. Abu Yusuf Mridha (51 DLR 386)\" মামলায় উচ্চ আদালত বলেছেন, কেবল সরকারকে পক্ষ না করার কারণে মামলা খারিজ হতে পারে না।" }),
                ],
            }),
            new Paragraph({
                bullet: { level: 0 },
                children: [
                    new TextRun({ text: "আংশিক বাটোয়ারা: ", bold: true }),
                    new TextRun({ text: "নিম্ন আদালত বলেছেন যে খাস জমি অন্তর্ভুক্ত না করায় এটি আংশিক বাটোয়ারা হয়েছে। কিন্তু মাননীয় আদালত, \"Md. Shahidul Alam Khan v. Md. Gulzar Alam (36 DLR 290)\"-এর নজির অনুযায়ী, বাটোয়ারায় সমস্ত সম্পত্তি অন্তর্ভুক্ত করার নিয়মটি একটি সুবিধার নিয়ম, এখতিয়ারের নয়। যেহেতু খাস জমির মালিক সরকার, যা এই পারিবারিক বাটোয়ারার বাইরের পক্ষ, তাই ঐ অংশ বাদ দিয়ে বাটোয়ারা করা সম্পূর্ণ বৈধ।" }),
                ],
            }),
            new Paragraph({
                bullet: { level: 0 },
                children: [
                    new TextRun({ text: "প্রমাণের দায়ে ভুল: ", bold: true }),
                    new TextRun({ text: "নিম্ন আদালত \"Bilquis Jahan\" মামলার নীতিকে সম্পূর্ণ ভুল প্রেক্ষাপটে প্রয়োগ করেছেন। আমরা সরকারি সার্টিফাইড খতিয়ান দিয়ে আমাদের স্বত্ব প্রমাণ করেছি। এরপর বিবাদীরা যে ১৯৬৯ সালের সংশোধনের দাবি তুলেছে, তা প্রমাণ করার দায় বিবাদীদের, কিন্তু নিম্ন আদালত অন্যায়ভাবে সেই মিথ্যা প্রমাণের দায় আমাদের উপর চাপিয়েছেন।" }),
                ],
            }),
            new Paragraph({
                text: "৪. প্রতিকার প্রার্থনা (Prayer for Relief)",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 },
            }),
            new Paragraph({
                text: "মাননীয় আদালত, সার্বিক বিবেচনায় নিম্ন আদালতের রায়টি তথ্য ও আইনের দৃষ্টিতে একটি ভ্রান্তিকর রায়, যা ন্যায়বিচারের চরম পরিপন্থী। বাদীরা তাদের ন্যায্য হিস্যা থেকে বঞ্চিত হচ্ছেন।",
            }),
            new Paragraph({
                text: "অতএব, বিনীত প্রার্থনা এই যে, মাননীয় আদালত নিম্ন আদালতের ০৫/০৪/২০২৬ তারিখের ডিক্রি ও রায় বাতিল করে আপিলটি মঞ্জুর করবেন এবং বাদীদের অনুকূলে বাটোয়ারার ডিক্রি প্রদান করবেন। বিকল্পে, Order 41 Rule 23/23A অনুযায়ী প্রয়োজনে আরজি সংশোধনের সুযোগ দিয়ে মামলাটি নিম্ন আদালতে রিমান্ড (ফেরত) পাঠানোর আদেশ দানে মর্জি হয়।",
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "ন্যায়বিচারের স্বার্থে এইটুকু প্রার্থনা করছি। ধন্যবাদ মাননীয় আদালত।",
                        bold: true,
                    }),
                ],
                spacing: { before: 200 },
            }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("f:/Mahfoz/Advocacy/Output/Oral_Argument_Appeal.docx", buffer);
    console.log("Document saved successfully!");
});
