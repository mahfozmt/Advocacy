const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, WidthType, ShadingType, PageNumber, Footer, Header,
  Table, TableRow, TableCell
} = require('docx');
const fs = require('fs');

const F = "SutonnyMJ";

function t(text, o={}) {
  return new TextRun({ text, font:F, size:o.sz||24, bold:o.b||false, italics:o.i||false, color:o.c||"000000" });
}
function p(runs, o={}) {
  return new Paragraph({
    alignment: o.center ? AlignmentType.CENTER : o.right ? AlignmentType.RIGHT : AlignmentType.BOTH,
    spacing:{ before:o.before||80, after:o.after||80, line:o.line||400 },
    indent: o.indent ? { left:o.indent } : {},
    border: o.bl ? { left:{ style:BorderStyle.SINGLE, size:o.blw||12, color:o.blc||"1F3864", space:8 } } : {},
    shading: o.shade ? { fill:o.shade, type:ShadingType.CLEAR } : {},
    children: runs
  });
}
function section(text) {
  return new Paragraph({
    spacing:{ before:280, after:0 },
    shading:{ fill:"1F3864", type:ShadingType.CLEAR },
    children:[new TextRun({ text:`  ${text}  `, font:F, bold:true, size:25, color:"FFFFFF" })]
  });
}
function sub(text, c="C00000") {
  return new Paragraph({
    spacing:{ before:200, after:80 },
    border:{ left:{ style:BorderStyle.SINGLE, size:14, color:c, space:8 } },
    indent:{ left:180 },
    children:[new TextRun({ text, font:F, bold:true, size:24, color:c })]
  });
}
function speech(text) {
  return new Paragraph({
    alignment:AlignmentType.BOTH,
    spacing:{ before:80, after:80, line:430 },
    children:[new TextRun({ text, font:F, size:24 })]
  });
}
function bullet(n, text) {
  return new Paragraph({
    alignment:AlignmentType.BOTH,
    spacing:{ before:60, after:60, line:380 },
    indent:{ left:560, hanging:400 },
    children:[
      new TextRun({ text:`${n}  `, font:F, bold:true, size:24, color:"C00000" }),
      new TextRun({ text, font:F, size:24 })
    ]
  });
}
function div() {
  return new Paragraph({
    spacing:{ before:160, after:160 },
    border:{ bottom:{ style:BorderStyle.SINGLE, size:3, color:"DDDDDD" } },
    children:[]
  });
}
function space() { return new Paragraph({ spacing:{ before:60, after:0 }, children:[] }); }

function caseBox(ref, title, quote, application) {
  return new Table({
    width:{ size:9200, type:WidthType.DXA },
    columnWidths:[9200],
    rows:[new TableRow({ children:[new TableCell({
      borders:{
        top:{ style:BorderStyle.SINGLE, size:6, color:"1F3864" },
        bottom:{ style:BorderStyle.SINGLE, size:1, color:"AAAAAA" },
        left:{ style:BorderStyle.SINGLE, size:20, color:"1F3864" },
        right:{ style:BorderStyle.SINGLE, size:1, color:"AAAAAA" }
      },
      shading:{ fill:"EBF3FB", type:ShadingType.CLEAR },
      margins:{ top:120, bottom:120, left:200, right:160 },
      children:[
        new Paragraph({ spacing:{ before:0, after:60 }, children:[
          new TextRun({ text:ref, font:F, bold:true, size:23, color:"1F3864" }),
          new TextRun({ text:`  ·  ${title}`, font:F, size:22, color:"595959" })
        ]}),
        new Paragraph({
          alignment:AlignmentType.BOTH,
          spacing:{ before:40, after:60 },
          indent:{ left:0 },
          border:{ left:{ style:BorderStyle.SINGLE, size:8, color:"2E75B6", space:8 } },
          shading:{ fill:"D9EDF7", type:ShadingType.CLEAR },
          children:[new TextRun({ text:`"${quote}"`, font:F, size:22, italics:true, color:"0C3C60" })]
        }),
        new Paragraph({ alignment:AlignmentType.BOTH, spacing:{ before:40, after:0 }, children:[
          new TextRun({ text:"প্রয়োগ: ", font:F, bold:true, size:22, color:"375623" }),
          new TextRun({ text:application, font:F, size:22 })
        ]})
      ]
    })})]
  });
}

const doc = new Document({
  styles:{ default:{ document:{ run:{ font:F, size:24 } } } },
  sections:[{
    properties:{ page:{ size:{ width:11906, height:16838 }, margin:{ top:1200, right:1300, bottom:1200, left:1700 } } },
    headers:{ default: new Header({ children:[
      p([t("আপীল মামলা নং ৩৮/২০২৬  |  বাটোয়ারা মামলা নং ৬৬/২০১৬  |  জেলা জজ আদালত, টাঙ্গাইল", { sz:18, c:"666666" })],
        { center:true, before:0, after:80 })
    ]}) },
    footers:{ default: new Footer({ children:[
      new Paragraph({
        alignment:AlignmentType.CENTER,
        border:{ top:{ style:BorderStyle.SINGLE, size:2, color:"CCCCCC", space:2 } },
        spacing:{ before:60 },
        children:[
          t("পৃষ্ঠা ", { sz:18, c:"888888" }),
          new TextRun({ children:[PageNumber.CURRENT], font:F, size:18, color:"888888" }),
          t(" / ", { sz:18, c:"888888" }),
          new TextRun({ children:[PageNumber.TOTAL_PAGES], font:F, size:18, color:"888888" })
        ]
      })
    ]}) },

    children:[

      // ══ COVER ══
      p([t("জেলা জজ আদালত, টাঙ্গাইল", { b:true, sz:30, c:"1F3864" })], { center:true, before:280, after:60 }),
      p([t("আপীল মামলা নং ৩৮/২০২৬", { b:true, sz:26, c:"2E75B6" })], { center:true, before:40, after:40 }),
      p([t("বাটোয়ারা মামলা নং ৬৬/২০১৬, সখিপুর সিভিল জজ আদালত হইতে উদ্ভূত", { sz:22, c:"595959" })], { center:true, before:20, after:40 }),
      p([t("হাতেম আলী ও অন্যান্য (আপীল্যান্ট/বাদী)  বনাম  আলহাজ উদ্দিন ও অন্যান্য (রেসপন্ডেন্ট/বিবাদী)", { b:true, sz:22, c:"C00000" })], { center:true, before:40, after:200 }),
      new Paragraph({
        alignment:AlignmentType.CENTER, spacing:{ before:0, after:300 },
        shading:{ fill:"C00000", type:ShadingType.CLEAR },
        children:[new TextRun({ text:"মৌখিক শুনানির চূড়ান্ত স্পিচ — আপীল্যান্টপক্ষ", font:F, bold:true, size:28, color:"FFFFFF" })]
      }),

      // ══ PART 1 ══
      section("প্রথম অংশ: ভূমিকা ও মামলার মূল প্রশ্ন"),
      space(),
      speech("মহামান্য আদালত,"),
      speech("আমি আপীল্যান্ট-বাদীপক্ষের পক্ষে বিনীতভাবে নিবেদন করিতেছি। এই মামলাটি মূলত তিনটি প্রশ্নের উপর নির্ভরশীল — প্রথমত, বাদীপক্ষ কি রেকর্ড-সমর্থিত সহশরিক? দ্বিতীয়ত, বিবাদীদের কথিত ১৯৬৯ সালের সংশোধনের কোনো বিচারিক ভিত্তি আছে কিনা? এবং তৃতীয়ত, ট্রায়াল কোর্টের রায়ে আইনের যে গুরুতর ভুলগুলো হয়েছে সেগুলো কি সংশোধনযোগ্য?"),
      speech("মহামান্য আদালত, তিনটি প্রশ্নেরই উত্তর সুস্পষ্ট। বাদীপক্ষ রেকর্ড-সমর্থিত এবং prima facie সহশরিক। বিবাদীদের সংশোধনের কোনো বিচারিক ভিত্তি নেই। এবং ট্রায়াল কোর্টের ভুলগুলো সংশোধনযোগ্য — বরং সংশোধন করাই এই মহামান্য আদালতের আইনি দায়িত্ব।"),

      sub("মামলার প্রকৃতি: ঘোষণামূলক নহে — বাটোয়ারা"),
      speech("মহামান্য আদালত, এটি কোনো title declaration-এর মামলা নহে। এটি একটি পারিবারিক বাটোয়ারা মামলা। এই দুইয়ের মধ্যে আইনগত পার্থক্য নির্ণায়ক।"),
      speech("বাটোয়ারা মামলায় আদালতের একমাত্র প্রধান বিবেচ্য — বাদীপক্ষ prima facie সহশরিক কিনা। সেই burden আমরা তিনটি স্তম্ভে সম্পূর্ণভাবে discharge করিয়াছি: প্রথমত, রেকর্ড রুম হইতে প্রাপ্ত এস.এ. ২৩৮ নং খতিয়ানের সার্টিফাইড জাবেদা নকল; দ্বিতীয়ত, ১৯৫৭ সালের ২৩৯৮ নং রেজিস্ট্রিকৃত দলিল; এবং তৃতীয়ত, দীর্ঘ বংশানুক্রমিক নিরবচ্ছিন্ন ভোগদখল।"),
      speech("মহামান্য সুপ্রিম কোর্টের আপিল বিভাগ Chinmoy Chowdhury vs. Sree Mridul Chowdhury, 23 BLD (AD) 83 মামলায় স্পষ্ট করিয়াছেন — বাটোয়ারা মামলায় স্বত্বের আনুষঙ্গিক প্রশ্ন যতই জটিল হোক, maintainability-র অজুহাতে মামলা খারিজ করা যাইবে না; সকল প্রশ্ন এই মামলার মধ্যেই নিষ্পত্তি করিতে হইবে। ট্রায়াল কোর্ট এই বাধ্যতামূলক নজির লঙ্ঘন করিয়াছেন — এটিই এই আপীলের প্রথম এবং সবচেয়ে গুরুত্বপূর্ণ ভিত্তি।"),

      div(), space(),

      // ══ PART 2 ══
      section("দ্বিতীয় অংশ: বিবাদীদের 'কারেকশন স্টোরি' — সম্পূর্ণ ভিত্তিহীন"),
      space(),

      sub("কারেকশনের judicial foundation কোথায়?"),
      speech("মহামান্য আদালত, বিবাদীপক্ষের পুরো defence দাঁড়াইয়া আছে একটিমাত্র দাবির উপর — ১৯৬৯ সালের কথিত মিস মোকদ্দমা নং ১১৮১/১৯৬৯-এর মাধ্যমে এস.এ. ২৩৮ নং খতিয়ান সংশোধিত হইয়াছে এবং সোনাভানুর নাম সংযোজিত হইয়াছে। কিন্তু সেই correction-এর judicial foundation কোথায়?"),
      speech("তাহারা আদালতে দাখিল করিতে পারেননি:"),
      bullet("ক", "মামলার plaint বা আরজির কপি"),
      bullet("খ", "রায় (Judgment)-এর সার্টিফাইড কপি"),
      bullet("গ", "ডিক্রির সার্টিফাইড কপি"),
      bullet("ঘ", "Correction Order বা সংশোধনী আদেশ"),
      bullet("ঙ", "সংশোধিত খতিয়ানের কপি"),
      bullet("চ", "জেলা মহাফেজখানায় এই মামলার অস্তিত্বের প্রমাণ"),
      space(),
      speech("বিবাদীরা কেবলমাত্র সখিপুর এসিল্যান্ড অফিসের ভলিউমের একটি অস্পষ্ট মার্জিন নোট দাখিল করিয়াছেন। মহামান্য আদালত যেন বিষয়টি পরিষ্কার রাখেন — এটি জেলা প্রশাসকের রেকর্ড রুমের মেইন ভলিউম নহে, এটি সখিপুর এসিল্যান্ড অফিসে সংরক্ষিত একটি revenue administration volume মাত্র।"),

      sub("তাদের নিজস্ব সাক্ষী তাদের বিরুদ্ধে সাক্ষ্য দিয়াছেন"),
      speech("মহামান্য আদালত, বিবাদীপক্ষের ভলিউম সাক্ষী DW-4 জেরায় স্বীকার করিয়াছেন — মিস কেস নম্বর স্পষ্ট নহে, কে লিখিয়াছেন জানেন না, কবে লিখিয়াছেন জানেন না, কোন authority-তে লিখিয়াছেন জানেন না, এবং ভিন্ন কালি কেন তাহাও বলিতে পারেন নাই। বিবাদীদের একমাত্র documentary witness নিজেই তাহাদের দাবিকে সম্পূর্ণ ভেঙ্গে দিয়াছেন।"),
      speech("একটি রেকর্ড রুমের certified khatian-এর বিপরীতে এই ধরনের একটি অপ্রমাণিত, অস্পষ্ট, unidentified মার্জিন নোট কি কখনো প্রাধান্য পেতে পারে? আইন ও নজির সুস্পষ্টভাবে না বলে।"),

      sub("এসিল্যান্ড অফিস বিচারিক কর্তৃপক্ষ নহে — তিনটি নজির"),
      speech("মহামান্য আদালত, মাননীয় হাইকোর্ট বিভাগের তিনটি সুপ্রতিষ্ঠিত নজির এই বিষয়ে চূড়ান্ত পথনির্দেশনা দেয়।"),
      speech("38 DLR (HCD) 272 বলে — রাজস্ব কর্মকর্তা এমন কোনো এন্ট্রি সংশোধন করিতে পারেন না যা কোনো ব্যক্তির স্বত্ব বা অধিকারকে প্রভাবিত করে। উপযুক্ত বিচারিক আদেশ ছাড়া এ ধরনের সংশোধন void ab initio।"),
      speech("20 DLR 627 বলে — রাজস্ব কর্মকর্তা স্বত্ব সংক্রান্ত কোনো প্রশ্নের বিচারিক সিদ্ধান্ত দিতে পারেন না। তাহার এখতিয়ার শুধুমাত্র প্রশাসনিক রাজস্ব ব্যবস্থাপনার মধ্যে।"),
      speech("26 DLR (HCD) 157 স্পষ্ট — রাজস্ব কর্মকর্তা কোনো আদালত নহেন।"),
      speech("এই তিনটি নজির একযোগে প্রমাণ করে — এসিল্যান্ড ভলিউম নোট কোনো বিচারিক আদেশের সমতুল্য নহে এবং রেকর্ড রুমের মূল ROR-কে displace করিতে পারে না। ট্রায়াল কোর্ট এই মৌলিক আইনি পার্থক্য উপেক্ষা করিয়াছেন।"),

      sub("Selective entry — জালিয়াতির অকাট্য প্রমাণ"),
      speech("মহামান্য আদালত, বিবাদীরা নিজেরাই স্বীকার করে আব্দুল করিম মারা যাওয়ার পর তার স্ত্রী, পুত্র এবং কন্যাসহ অনেক ওয়ারিশ জীবিত ছিলেন। কিন্তু কথিত সংশোধনীতে শুধুমাত্র একজনের — সোনাভানুর — নাম সংযোজিত হইয়াছে।"),
      speech("যদি এটি প্রকৃত বিচারিক সংশোধন হইত, তাহা হইলে ফারায়েজ আইন অনুযায়ী আব্দুল করিমের সকল ওয়ারিশের নাম তাদের হিস্যা অনুযায়ী অন্তর্ভুক্ত হইত। শুধুমাত্র একজনের নাম selective ভাবে অন্তর্ভুক্ত হওয়া এই ভলিউম নোটের জালিয়াতিপূর্ণ প্রকৃতির অকাট্য প্রমাণ।"),

      div(), space(),

      // ══ PART 3 ══
      section("তৃতীয় অংশ: SAT Act ১৪৪A — বাদীপক্ষের রেকর্ড অপ্রতিদ্বন্দ্বী"),
      space(),

      speech("মহামান্য আদালত, State Acquisition and Tenancy Act, 1950 এর ধারা ১৪৪A সুস্পষ্টভাবে বলে — চূড়ান্তভাবে প্রকাশিত Record of Rights-এর প্রতিটি এন্ট্রি সঠিক বলে আইনগতভাবে অনুমান করা হইবে যতক্ষণ না নির্ভরযোগ্য প্রমাণ দ্বারা ভুল প্রমাণিত হয়।"),
      speech("Dayal Chandra Mondal v. Asst. Custodian, 50 DLR 186 এই presumption-এর শক্তি নিশ্চিত করিয়াছেন। এবং Shahera Khatun v. State, 53 DLR 19 স্পষ্টভাবে বলিয়াছেন — মিউটেশন আদেশ বা ভলিউম নোটের এই ধারার অধীনে কোনো presumptive value নাই। শুধুমাত্র রেকর্ড রুমের finally published khatian-ই এই অনুমান উপভোগ করে।"),
      speech("বিবাদীরা এই শক্তিশালী presumption খণ্ডন করিতে পারেননি। তাহারা কোনো reliable evidence দাখিল করিতে পারেননি। কেবল তাহাদের নিজের সাক্ষীর মুখে অস্বীকৃত একটি অস্পষ্ট নোট তাহাদের একমাত্র সম্বল।"),

      div(), space(),

      // ══ PART 4 ══
      section("চতুর্থ অংশ: প্রমাণের দায় — ট্রায়াল কোর্টের মূল আইনি ভুল"),
      space(),

      speech("মহামান্য আদালত, সাক্ষ্য আইনের ১০৩ ধারা এবং Md. Azizul Hoque v. Md. Akbar Ali, 10 BLT (AD) 105 মামলায় আপিল বিভাগের নজির অনুযায়ী — যখন কোনো পক্ষ certified khatian ও registered deed-এর বিপরীতে সংশোধনের দাবি করে, সেই সংশোধন প্রমাণের দায় সম্পূর্ণভাবে দাবিকারীর উপর।"),
      speech("বাদীপক্ষ certified khatian ও registered deed দাখিল করিয়া primary burden সম্পূর্ণভাবে discharge করিয়াছে। তাহার পর প্রমাণের দায় আইনত বিবাদীদের উপর স্থানান্তরিত হইয়াছে। কিন্তু ট্রায়াল কোর্ট উল্টো বাদীপক্ষকেই ক্রমাগত prove করিতে বাধ্য করিয়াছেন — যাহা Evidence Act-এর সম্পূর্ণ বিরোধী।"),
      speech("তদুপরি, সাক্ষ্য আইনের ১১৪(গ) ধারা অনুযায়ী — বিবাদীরা রেকর্ড রুম থেকে ২৩৮ নং খতিয়ানের নিজেদের কপি দাখিল করেননি। কারণ একটাই — সেই কপি দাখিল করিলে প্রমাণিত হইয়া যাইত যে রেকর্ড রুমে সোনাভানুর কোনো নামই নাই। এই willful suppression-এর বিরুদ্ধে adverse inference গ্রহণ আইনত বাধ্যতামূলক।"),

      div(), space(),

      // ══ PART 5 ══
      section("পঞ্চম অংশ: বিবাদীদের নিজস্ব ১৯৭৫ দলিল — তাহাদের defence ধ্বংস করে"),
      space(),

      speech("মহামান্য আদালত, এই মামলার সবচেয়ে নির্ণায়ক তথ্যটি ট্রায়াল কোর্ট সম্পূর্ণ উপেক্ষা করিয়াছেন।"),
      speech("বিবাদীরা দাবি করে — ১৯৬৯ সালের correction-এর পর এস.এ. ২৩৮ নং খতিয়ানে কেবল ১২৫৯ নং দাগটিই অবশিষ্ট ছিল।"),
      speech("কিন্তু তাহাদেরই দাখিলকৃত ৩৫৯৬/১৯৭৫ নং রেজিস্ট্রিকৃত দলিলে — তাহারা নিজেরা — ২৩৮ নং খতিয়ানের অধীনে ১২৫৯, ৭৫, ৩, ৫৪, ১২৫২ এবং ১২২০ সহ ৬টি দাগের জমি হস্তান্তরের উল্লেখ করিয়াছেন।"),
      speech("প্রশ্ন একটাই — যদি ১৯৬৯ সালে correction হইয়াছে এবং শুধু ১২৫৯ দাগ রহিয়াছে, তাহা হইলে ১৯৭৫ সালে তাহাদের নিজেদের দলিলে বাকি ৫টি দাগ কোথা থেকে আসিল? এই একটি দলিলই তাহাদের ১৯৬৯ সালের পুরো correction story ধ্বংস করিয়া দেয়।"),
      speech("S.P. Chengalvaraya Naidu v. Jagannath, AIR 1994 SC 853 অনুযায়ী — এই ধরনের গুরুত্বপূর্ণ দলিলের material contradiction reconcile না করিয়া আদালতের সুবিধা নেওয়ার চেষ্টা করা Fraud on Court। ট্রায়াল কোর্ট এই material evidence পাঠ করেননি — যাহা Non-reading of Material Evidence-এর সুস্পষ্ট দৃষ্টান্ত এবং আপীলের শক্তিশালী ভিত্তি।"),

      sub("গাণিতিক অসম্ভাবতা — দাবির মিথ্যা প্রকৃতির চূড়ান্ত প্রমাণ"),
      speech("মহামান্য আদালত, ১২৫৯ নং দাগের মোট আয়তন ৪৭৭ শতাংশ। সরকারের ১ নং খাস খতিয়ানে ১৩৭ শতাংশ। বাদীপক্ষ সঠিকভাবে ৩৪০ শতাংশ তফসিলে এনেছেন — কারণ ৩৪০ + ১৩৭ = ৪৭৭। সম্পূর্ণ সঠিক।"),
      speech("কিন্তু বিবাদীরা দাবি করছে ৩৪৯ শতাংশ। তাহলে ৩৪৯ + ১৩৭ = ৪৮৬ শতাংশ — অথচ দাগের মোট জমিই মাত্র ৪৭৭ শতাংশ। এই ৯ শতাংশ অতিরিক্ত কোথা থেকে আসিল? এই গাণিতিক অসম্ভাবতা একাই এসিল্যান্ড ভলিউমের এন্ট্রির মিথ্যা প্রকৃতি সন্দেহাতীতভাবে প্রমাণ করে।"),

      div(), space(),

      // ══ PART 6 ══
      section("ষষ্ঠ অংশ: হচপট ও পক্ষদোষ — সম্পূর্ণ অপ্রযোজ্য"),
      space(),

      sub("পৃথক খতিয়ান = পৃথক জমা — হচপট প্রযোজ্য নহে"),
      speech("মহামান্য আদালত, ট্রায়াল কোর্ট বলিয়াছেন ১২৫৯ দাগের সাকুল্য ৪৭৭ শতাংশ তফসিলে না আনায় মামলা হচপট দোষে দুষ্ট।"),
      speech("কিন্তু Md. Shahjalan Akon vs. Murshida Khanam, 27 BLD 229 নজির স্পষ্টভাবে বলে — একই দাগের জমি যখন পৃথক খতিয়ানে রেকর্ডভুক্ত হয়, তখন তাহাদের জমা এবং tenancy identity আইনগতভাবে স্বতন্ত্র হইয়া যায়। পৃথক খতিয়ান মানেই De facto jamaa bhaag — অর্থাৎ আইনের দৃষ্টিতে জমিটি ইতোমধ্যে বিভক্ত।"),
      speech("আমাদের এস.এ. ২৩৮ নং খতিয়ানে ৩৪০ শতাংশ স্বতন্ত্রভাবে রেকর্ডভুক্ত। সরকারের খাস জমি সম্পূর্ণ ভিন্ন খতিয়ানে। উভয়ের tenant পরিচয় ও জমা আলাদা। সুতরাং আমাদের খতিয়ানের বাইরের সরকারি অংশ এই বাটোয়ারার বিষয়বস্তু হইতে পারে না এবং মামলা হচপট দোষে দুষ্ট নহে।"),

      sub("মুসলিম আইনে আংশিক বাটোয়ারা সম্পূর্ণ বৈধ"),
      speech("মহামান্য আদালত, এই মামলার সকল পক্ষ মুসলিম। মুসলিম উত্তরাধিকার আইনে হিন্দু আইনের মতো অবিভাজ্য যৌথ পরিবারের কোনো ধারণা নাই। মুসলিম আইনে প্রতিটি ওয়ারিশ উত্তরাধিকার খোলার সাথে সাথেই তার নির্দিষ্ট হিস্যার স্বাধীন মালিক হইয়া যান।"),
      speech("সুতরাং আমাদের নির্দিষ্ট এস.এ. ২৩৮ খতিয়ানের ৮৮৫ শতাংশ জমির বাটোয়ারা চাওয়া আইনত সম্পূর্ণ বৈধ এবং এর জন্য সমগ্র সি.এস. খতিয়ানের জমি তফসিলে আনার কোনো বাধ্যবাধকতা নাই।"),

      sub("সরকারকে পক্ষ না করায় মামলা খারিজ — আইনের সরাসরি বিরোধী"),
      speech("মহামান্য আদালত, CPC-এর Order I Rule 9 সুস্পষ্ট — পক্ষের non-joinder বা misjoinder-এর কারণে কোনো মামলা ব্যর্থ হইবে না।"),
      speech("Safaruddin vs. Fazlul Huq, 49 DLR (AD) 15 এবং Abdul Quayuam Khan vs. Abu Yusuf Mridha, 51 DLR 386 — এই দুইটি নজির একযোগে বলে সরকারকে পক্ষ না করার কারণে partition suit dismiss করা যায় না। এই মামলায় সরকারের স্বত্ব চ্যালেঞ্জ করা হইতেছে না। বাটোয়ারা মামলা সহশরিকদের inter se বিরোধ নিষ্পত্তি করে। সরকারের স্বার্থ সম্পূর্ণ সুরক্ষিত।"),

      div(), space(),

      // ══ PART 7 ══
      section("সপ্তম অংশ: ঢাকা নবাব স্টেট — ঐতিহাসিক প্রেক্ষাপট"),
      space(),

      speech("মহামান্য আদালত, এই জমির উৎস ঢাকা নবাব স্টেট। এই স্টেটের ভূমি ব্যবস্থাপনা ছিল ব্যতিক্রমী।"),
      speech("Harun-al-Rashid Mollah vs. Bangladesh, 12 BLC (AD) 2007, 79 মামলায় আপিল বিভাগ বলিয়াছেন — ঢাকা নবাব Court of Wards Estate-এর কোনো জমির বৈধ পত্তনের জন্য Chief Manager-এর পূর্বানুমোদন বাধ্যতামূলক ছিল। এই অনুমোদন ছাড়া কোনো settlement বৈধ হইত না। বিবাদীরা তাহাদের দাবিকৃত পত্তনের পক্ষে Chief Manager-এর কোনো অনুমোদনপত্র দাখিল করিতে পারেননি — সুতরাং তাহাদের দাবিকৃত পত্তন শুরু থেকেই আইনত ভিত্তিহীন।"),
      speech("তদুপরি, SAT Act 1950 এর অধীনে এই এস্টেট অধিগ্রহণের পর যিনি প্রকৃতপক্ষে জমিতে দখলে ছিলেন এবং খাজনা পরিশোধ করিতেছিলেন, তাহার নামেই এস.এ. রেকর্ড প্রস্তুত হইয়াছে। আব্দুল আলী সেক ছিলেন সেই প্রকৃত রায়ত। ঢাকা নবাব এস্টেট নিজেই তাহার নামে তথ্য দিয়াছে — এস.এ. ২৩৮ নং খতিয়ানে তাহার একক নাম থাকা সম্পূর্ণ স্বাভাবিক ও আইনসম্মত।"),
      speech("Shafiullah vs. Sultan Ahmad Mir, 6 BLD (AD) 70 অনুযায়ী — tenancy status মুসলিম ফারায়েজ আইনে নহে, জমিদারের পত্তন ও প্রকৃত চাষাবাদের ভিত্তিতে নির্ধারিত হইত। আব্দুল আলী প্রকৃত চাষাবাদকারী ছিলেন — তাই তাহার নামে রেকর্ড হওয়া আইনত নির্ভুল।"),

      div(), space(),

      // ══ PART 8: PRAYER ══
      section("অষ্টম অংশ: চূড়ান্ত প্রার্থনা"),
      space(),

      speech("মহামান্য আদালত,"),
      speech("আমরা remand চাই না। Amendment-ও চাই না। কারণ প্রায় এক দশক ধরে মামলাটি চলিয়াছে এবং প্রয়োজনীয় সকল evidence ইতোমধ্যে record-এ বিদ্যমান। মহামান্য আপীল আদালত নিজেই evidence re-appreciate করিয়া চূড়ান্ত সিদ্ধান্ত দিতে সক্ষম।"),
      speech("সংক্ষেপে মামলার সারসত্য:"),
      bullet("১", "বাদীপক্ষের evidence: রেকর্ড রুম থেকে certified khatian + রেজিস্ট্রিকৃত দলিল + দখল — শক্তিশালী ও অবিতর্কিত।"),
      bullet("২", "বিবাদীপক্ষের evidence: একটি অস্পষ্ট volume note — যার কর্তৃত্ব নেই, নিজের সাক্ষী যার সত্যতা নিশ্চিত করিতে পারেননি।"),
      bullet("৩", "বিবাদীদের ১৯৭৫ সালের নিজস্ব দলিল তাহাদের ১৯৬৯ correction story সম্পূর্ণ মিথ্যা প্রমাণ করে।"),
      bullet("৪", "গাণিতিক হিসাবে বিবাদীদের দাবি অসম্ভব।"),
      bullet("৫", "আইন ও নজির সকল দিক থেকে বাদীপক্ষের অনুকূলে।"),
      space(),
      speech("অতএব মহামান্য আদালত, বিজ্ঞ ট্রায়াল কোর্টের রায় ও ডিক্রি বাতিল করিয়া, আপীল মঞ্জুরপূর্বক, এস.এ. ২৩৮ নং খতিয়ানের ৮৮৫ শতাংশ ভূমির বাটোয়ারার প্রাথমিক ডিক্রি প্রদান করিতে মর্জি হউক।"),
      space(),
      p([t("বিনীত নিবেদন সমাপ্ত।", { b:true })], { right:true, before:120, after:60 }),

      div(), space(), space(),

      // ══ CASE REFERENCES ══
      section("নজির সংকলন — বিচারকের জিজ্ঞাসার জন্য প্রস্তুত উদ্ধৃতি"),
      space(),
      p([t("বিচারক সরাসরি জিজ্ঞাসা করিলে নিচের উদ্ধৃতিগুলো পড়িয়া শোনাইতে হইবে।", { sz:22, c:"595959", i:true })], { before:0, after:120 }),

      caseBox("23 BLD (AD) 83  ·  1 ADC (2004) 124",
        "Chinmoy Chowdhury vs. Sree Mridul Chowdhury",
        "In a suit for partition all the incidental questions of title, however complicated, can be decided and finally disposed of. The parties should not be thrown away or driven out on the ground of maintainability of the suit. Civil courts' jurisdiction cannot be made dependent on the mercy of a dishonest or reckless defendant.",
        "বাটোয়ারা মামলায় স্বত্ব তর্কিত হইলেও মামলা খারিজ করা যাইবে না। ট্রায়াল কোর্ট এই বাধ্যতামূলক নজির লঙ্ঘন করিয়াছেন — এটিই আপিলের প্রধান ভিত্তি।"),
      space(),

      caseBox("53 DLR 19 (HCD)",
        "Shahera Khatun vs. State",
        "The provisions of the Act and the Rules clearly show that the revision of the record of rights under section 144 of the Act has presumptive value, but any order of mutation of the record made under section 143 of the Act has no such presumptive value.",
        "এসিল্যান্ড ভলিউম নোটের কোনো presumptive value নাই। SAT Act ১৪৪A-এর presumption শুধুমাত্র রেকর্ড রুমের finally published khatian-এ প্রযোজ্য।"),
      space(),

      caseBox("50 DLR 186",
        "Dayal Chandra Mondal vs. Asst. Custodian",
        "A record of rights finally published and revised under section 144A of the S.A.T. Act has a presumption of correctness and that presumption continues till it is rebutted by reliable evidence.",
        "বাদীপক্ষের রেকর্ড রুমের খতিয়ান এই presumption উপভোগ করিতেছে। বিবাদীরা reliable evidence দাখিল করিতে সম্পূর্ণ ব্যর্থ।"),
      space(),

      caseBox("10 BLT (AD) 105",
        "Md. Azizul Hoque vs. Md. Akbar Ali",
        "When a party asserts a fact in reliance on a public document or registered deed, and the opposite party challenges it saying it is forged or wrong, the burden of proving the forgery or error lies on the challenging party.",
        "বাদীপক্ষ certified khatian + registered deed দাখিল করিয়াছেন। বিবাদীরা সংশোধনের দাবি করিয়াছেন — তাই সেই সংশোধন প্রমাণের সম্পূর্ণ দায় তাহাদের।"),
      space(),

      caseBox("27 BLD 229",
        "Md. Shahjalan Akon vs. Murshida Khanam",
        "When the same dag is recorded in separate khatians, the jamaa (rent-roll) becomes separate and the tenancy identity becomes independent. In such a case, it is not compulsory to bring the entire dag into hotchpot.",
        "এস.এ. ২৩৮ খতিয়ান পৃথক — তাই হচপটের বাধ্যবাধকতা নাই। সরকারের খাস জমি ভিন্ন খতিয়ানে — এই বাটোয়ারার বিষয়বস্তু নহে।"),
      space(),

      caseBox("49 DLR (AD) 15",
        "Safaruddin vs. Fazlul Huq",
        "No suit for partition shall fail merely because of the non-joinder of the Government as a party. The suit for partition essentially determines the inter se rights of co-sharers.",
        "সরকারকে পক্ষ না করায় বাটোয়ারা মামলা খারিজ হইবে না — আপিল বিভাগের বাধ্যতামূলক নজির।"),
      space(),

      caseBox("51 DLR 386 (HCD)",
        "Abdul Quayuam Khan vs. Abu Yusuf Mridha",
        "In spite of the Government being not joined as a party in the suit, the Courts below dealt with the matter of controversy so far as regards the right and interest of both the parties and as such, by mere non-joinder of the Government the suit cannot be defeated.",
        "সরকার পক্ষ না হইলেও partition suit চলিতে পারে। ট্রায়াল কোর্টের dismissal আইনবিরোধী।"),
      space(),

      caseBox("AIR 1994 SC 853",
        "S.P. Chengalvaraya Naidu vs. Jagannath",
        "A litigant who approaches the court is bound to produce all the documents executed by him which are relevant to the litigation. If he withholds a vital document in order to gain advantage on the other side then he would be guilty of playing fraud on the court as well as on the opposite party. Fraud avoids all judicial acts, ecclesiastical or temporal.",
        "বিবাদীদের ১৯৭৫ দলিলে ৬ দাগের উল্লেখ থাকা সত্ত্বেও ১৯৬৯ correction story দেওয়া — Fraud on Court।"),
      space(),

      caseBox("38 DLR (HCD) 272",
        "রেভিনিউ অফিসারের ক্ষমতার সীমা",
        "A Revenue Officer has no power to correct entries in a khatian which affect the title or right of a person. Any such correction made without judicial authority is void and ineffective.",
        "এসিল্যান্ড অফিসারের ভলিউম নোট দিয়া স্বত্ব সংক্রান্ত খতিয়ান সংশোধন করা যায় না।"),
      space(),

      caseBox("20 DLR 627  |  26 DLR (HCD) 157",
        "রেভিনিউ কর্তৃপক্ষের বিচারিক ক্ষমতার অভাব",
        "A Revenue Officer cannot decide questions of title. His jurisdiction is confined to revenue administration only. A Revenue Officer is not a court.",
        "এসিল্যান্ড ভলিউম নোট কোনো বিচারিক আদেশের সমতুল্য নহে এবং ROR-কে displace করিতে পারে না।"),
      space(),

      caseBox("6 BLD (AD) 70",
        "Shafiullah vs. Sultan Ahmad Mir",
        "Tenancy status is determined by the zamindari pattan or court decision, and not directly by personal inheritance law (Muslim Faraez). The raiyat entitled to the land is the person who actually cultivates and pays rent.",
        "আব্দুল আলী প্রকৃত চাষাবাদকারী ও খাজনা প্রদানকারী — তাহার নামে একক এস.এ. রেকর্ড আইনত নির্ভুল।"),
      space(),

      caseBox("12 BLC (AD) 2007, 79",
        "Harun-al-Rashid Mollah vs. Bangladesh",
        "In the case of Dhaka Nawab Court of Wards Estate, any settlement of land requires the approval of the Chief Manager. Without such approval, no settlement shall be valid or binding.",
        "বিবাদীদের দাবিকৃত পত্তনের Chief Manager অনুমোদন নেই — তাহাদের পত্তন দাবি শুরু থেকেই অবৈধ।"),
      space(),

      caseBox("AIR 1968 SC 1413",
        "Gopal Krishnaji Ketkar vs. Mahomed Haji Latif",
        "Even if the burden of proof does not lie on a party, the court may draw an adverse inference if he withholds important documents in his possession which can throw light on the facts at issue.",
        "বিবাদীরা রেকর্ড রুম থেকে ২৩৮ নং খতিয়ানের নিজেদের কপি দাখিল করেননি — adverse inference প্রযোজ্য।"),
      space(),

      caseBox("22 DLR 36",
        "Azhar Bepari vs. Abdul Aziz Gazi",
        "Onus of proving that possession has been wrongly recorded in the khatian is on the person who alleges it.",
        "বিবাদীরা ২৩৮ খতিয়ান ভুল বলে দাবি করছেন — তাই প্রমাণের সম্পূর্ণ দায় তাহাদের।"),

      space(), space(), div(),

      p([t("— স্পিচ ও নজির সংকলন সমাপ্ত —", { b:true, c:"1F3864" })], { center:true, before:120, after:80 }),
      p([t("আপীল মামলা নং ৩৮/২০২৬  |  হাতেম আলী ও অন্যান্য বনাম আলহাজ উদ্দিন ও অন্যান্য", { sz:20, c:"888888" })], { center:true, before:40, after:60 }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/home/claude/hearing_speech.docx', buf);
  console.log('Done');
});
