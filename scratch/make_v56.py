import re
import os

def process_file(in_path, out_path, is_summary):
    with open(in_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Version Numbers
    content = content.replace("Version 55", "Version 56")
    content = content.replace("v55", "v56")

    # 2. Opening Framing
    if not is_summary:
        old_opening = "মহামান্য আদালত,\n\nএই আপীলের নিষ্পত্তির জন্য অসংখ্য প্রশ্নের উত্তর দেওয়ার প্রয়োজন নাই। মামলাটি মূলত একটি প্রশ্নে সীমাবদ্ধ:\n\n**চূড়ান্তভাবে প্রকাশিত এবং আজও জেলা প্রশাসকের সেটেলমেন্ট রেকর্ড রুমে অপরিবর্তিত SA ২৩৮ নং খতিয়ান কি একটি অপ্রমাণিত Misc Case এবং AC Land অফিসের ভিন্ন কালিতে লেখা একটি ব্যাখ্যাহীন মার্জিন নোট দ্বারা পরাজিত হইতে পারে?**"
        new_opening = "মহামান্য আদালত,\n\nThis appeal is not about whether SA record can be rebutted. It is about whether the respondents have produced any legally admissible evidence capable of rebutting it at all.\n\nএই আপীলের নিষ্পত্তির জন্য অসংখ্য প্রশ্নের উত্তর দেওয়ার প্রয়োজন নাই। মামলাটি মূলত একটি প্রশ্নে সীমাবদ্ধ:\n\n**চূড়ান্তভাবে প্রকাশিত এবং আজও জেলা প্রশাসকের সেটেলমেন্ট রেকর্ড রুমে অপরিবর্তিত SA ২৩৮ নং খতিয়ান কি একটি অপ্রমাণিত Misc Case এবং AC Land অফিসের ভিন্ন কালিতে লেখা একটি ব্যাখ্যাহীন মার্জিন নোট দ্বারা পরাজিত হইতে পারে?**"
        content = content.replace(old_opening, new_opening)
    else:
        old_opening = "## প্রারম্ভিক বক্তব্য (The Core Question)"
        new_opening = "## প্রারম্ভিক বক্তব্য (The Core Question)\n> \"This appeal is not about whether SA record can be rebutted. It is about whether the respondents have produced any legally admissible evidence capable of rebutting it at all.\""
        content = content.replace(old_opening, new_opening)

    # 3. Issue 3 (Parent Record)
    if not is_summary:
        old_issue3_text = "বিবাদীরা Misc Case-এর অস্তিত্ব দাবি করিলেও সেই কার্যবিবরণী, আদেশ, রায় বা প্রত্যয়িত কপি আদালতে উপস্থাপন করেননি। যে Misc Case-এর উপর নির্ভর করিয়া একটি finally published State Record পরিবর্তনের দাবি করা হইতেছে, তাহার আদেশ বা certified copy না থাকায় আদালত আদৌ জানিতে পারিতেছেন সম্পাদক না যে উহা title matter ছিল, correction matter ছিল, না অন্য কোনো প্রশাসনিক কার্যক্রম ছিল।"
        new_issue3_text = "বিবাদীরা Misc Case-এর অস্তিত্ব দাবি করিলেও সেই কার্যবিবরণী, আদেশ, রায় বা প্রত্যয়িত কপি আদালতে উপস্থাপন করেননি। **If Misc Case No.1181/1969 is the foundation of the respondents' claim, where is the certified order? A court cannot presume the contents of a judicial proceeding merely because a later office note refers to it (Evidence Act Sections 61-65).** যে Misc Case-এর উপর নির্ভর করিয়া একটি finally published State Record পরিবর্তনের দাবি করা হইতেছে, তাহার আদেশ বা certified copy না থাকায় আদালত আদৌ জানিতে পারিতেছেন না যে উহা title matter ছিল, correction matter ছিল, না অন্য কোনো প্রশাসনিক কার্যক্রম ছিল।"
        content = content.replace(old_issue3_text, new_issue3_text)
    else:
        old_issue3_summary = "**Misc Case অপ্রমাণিত:** ১৯৬৯ সালের Misc Case-এর কোনো আদেশ, রায় বা প্রত্যয়িত কপি আদালতে নাই। Misc Case-এ title নির্ধারণ করা যায় না (27 BLD (HD) 544)।"
        new_issue3_summary = "**Misc Case অপ্রমাণিত:** If Misc Case No.1181/1969 is the foundation of the respondents' claim, where is the certified order? A court cannot presume the contents of a judicial proceeding merely because a later office note refers to it. ১৯৬৯ সালের Misc Case-এর কোনো আদেশ, রায় বা প্রত্যয়িত কপি আদালতে নাই। Misc Case-এ title নির্ধারণ করা যায় না (27 BLD (HD) 544)।"
        content = content.replace(old_issue3_summary, new_issue3_summary)

    # 4. Issue 4 (Silence of Record Room & DW-4 Credibility)
    if not is_summary:
        old_silence_heading = "**এই আপীলের উত্তরহীন তিনটি প্রশ্ন (The Silence of the Record Room):**"
        new_silence_heading = "### THE SILENCE OF THE AUTHORITATIVE RECORD\n\n> \"The most reliable witness in this case is not DW-4, but the District Record Room itself.\"\n\n**এই আপীলের উত্তরহীন তিনটি প্রশ্ন:**"
        content = content.replace(old_silence_heading, new_silence_heading)

        old_dw4_text = "Authoritative Record-এর নীরবতা একটি AC Land Working Copy-র কালির নোট অপেক্ষা বহুগুণ অধিক বিশ্বাসযোগ্য।"
        new_dw4_text = "Authoritative Record-এর নীরবতা একটি AC Land Working Copy-র কালির নোট অপেক্ষা বহুগুণ অধিক বিশ্বাসযোগ্য। অধিকন্তু, The only witness relied upon to prove the alleged correction (DW-4) could not even correctly identify the recorded tenant. তিনি আদালতে সাক্ষ্য দিতে আসিয়া মূল রায়তের নাম বলিয়াছেন \"আব্দুল আলীম\", অথচ রেকর্ডে নাম রহিয়াছে \"আব্দুল আলী সেক\"। এটি সাক্ষীর credibility-কে সম্পূর্ণভাবে ধ্বংস করে।"
        content = content.replace(old_dw4_text, new_dw4_text)
    else:
        old_silence_summary = "**The Silence of the Record Room:** যদি সংশোধন বৈধ হইত, তবে তা District Record Room-এর মূল SA খতিয়ানে থাকিত। আজও মূল খতিয়ান অপরিবর্তিত।"
        new_silence_summary = "### THE SILENCE OF THE AUTHORITATIVE RECORD\n> \"The most reliable witness in this case is not DW-4, but the District Record Room itself.\"\nযদি সংশোধন বৈধ হইত, তবে তা District Record Room-এর মূল SA খতিয়ানে থাকিত। আজও মূল খতিয়ান অপরিবর্তিত। উপরন্তু, The only witness relied upon to prove the alleged correction (DW-4) could not even correctly identify the recorded tenant (\"আব্দুল আলীম\" বনাম \"আব্দুল আলী সেক\")।"
        content = content.replace(old_silence_summary, new_silence_summary)

    # 5. Issue 7 (1975 Deed Trap)
    if not is_summary:
        old_deed_text = "যদি ১৯৬৯ সালের সংশোধন প্রকৃতপক্ষে কার্যকর হইয়া থাকে, তবে ১৯৭৫ সালের দলিলে সেই সংশোধিত অবস্থাই (১ দাগ) প্রতিফলিত হওয়ার কথা। কিন্তু দলিলটি উল্টো মূল SA কাঠামোকেই (৬ দাগ) অনুসরণ করিয়াছে। এটি প্রমাণ করে যে বিবাদীরা নিজেরাও ১৯৬৯ সালের কথিত সংশোধনকে বাস্তবে কার্যকর বলিয়া বিশ্বাস করেননি।"
        new_deed_text = "যদি ১৯৬৯ সালের সংশোধন প্রকৃতপক্ষে কার্যকর হইয়া থাকে, তবে ১৯৭৫ সালের দলিলে সেই সংশোধিত অবস্থাই (১ দাগ) প্রতিফলিত হওয়ার কথা। কিন্তু দলিলটি উল্টো মূল SA কাঠামোকেই (৬ দাগ) অনুসরণ করিয়াছে। \n\n> Respondents cannot simultaneously assert:\n> (i) that SA 238 stood corrected in 1969 and reduced to one dag;\n> and\n> (ii) execute a registered deed in 1975 describing six dags under the same SA khatian.\n\n**Both propositions cannot stand together.** এটি প্রমাণ করে যে বিবাদীরা নিজেরাও ১৯৬৯ সালের কথিত সংশোধনকে বাস্তবে কার্যকর বলিয়া বিশ্বাস করেননি।"
        content = content.replace(old_deed_text, new_deed_text)
    else:
        old_deed_summary = "বিবাদীরা দাবি করেন SA ২৩৮-এ মাত্র ১টি দাগ। অথচ তাদের নিজেদের ১৯৭৫ সালের ৩৫৯৬ নং দলিলেই SA ২৩৮-এ ৬টি দাগ উল্লেখ করা হইয়াছে! এটি প্রমাণ করে তারা নিজেরাই Volume Note-এর কথিত সংশোধন বিশ্বাস করেননি (Section 114(গ) Evidence Act)।"
        new_deed_summary = "বিবাদীরা দাবি করেন SA ২৩৮-এ মাত্র ১টি দাগ। অথচ তাদের নিজেদের ১৯৭৫ সালের ৩৫৯৬ নং দলিলেই SA ২৩৮-এ ৬টি দাগ উল্লেখ করা হইয়াছে! Respondents cannot simultaneously assert (i) that SA 238 stood corrected in 1969 and reduced to one dag; and (ii) execute a registered deed in 1975 describing six dags under the same SA khatian. Both propositions cannot stand together. এটি প্রমাণ করে তারা নিজেরাই Volume Note-এর কথিত সংশোধন বিশ্বাস করেননি (Section 114(গ) Evidence Act)।"
        content = content.replace(old_deed_summary, new_deed_summary)

    # 6. New Heading: Title vs Clerical (Issue 5 expansion)
    if not is_summary:
        old_clerical_heading = "বিবাদীপক্ষের দাবিটি খতিয়ানে কোনো সাধারণ 'করণিক ভুল' (Clerical Mistake) বা নামের বানান সংশোধনের বিষয় নহে। তাহারা দাবি করিতেছেন যে একটি চূড়ান্তভাবে প্রকাশিত রাষ্ট্র-স্বীকৃত SA খতিয়ানে নতুন অংশীদার (co-sharer) যুক্ত করা হইয়াছে এবং মূল রায়তের স্বত্ব কর্তন করা হইয়াছে।"
        new_clerical_heading = """## The Claim of Sonavanu Was Not a Clerical Correction Claim

বিবাদীপক্ষের দাবিটি খতিয়ানে কোনো সাধারণ 'করণিক ভুল' (Clerical Mistake) বা নামের বানান সংশোধনের বিষয় নহে। Sonavanu's case was not that she was omitted from the heirs of Abdul Ali. Her case was that Abdul Ali himself was wrongly recorded. অর্থাৎ সে কোনো co-sharer হিসেবে দাবি করেনি, বরং adverse title দাবি করিয়াছে।

এই ধরণের adverse title-এর দাবি কোনোভাবেই correction proceeding-এর মাধ্যমে মীমাংসা করা সম্ভব নহে, ইহার জন্য পূর্ণাঙ্গ Title Suit প্রয়োজন। তাহারা দাবি করিতেছেন যে একটি চূড়ান্তভাবে প্রকাশিত রাষ্ট্র-স্বীকৃত SA খতিয়ানে নতুন অংশীদার (co-sharer) যুক্ত করা হইয়াছে এবং মূল রায়তের স্বত্ব কর্তন করা হইয়াছে।"""
        content = content.replace(old_clerical_heading, new_clerical_heading)
    else:
        old_clerical_summary = "বিবাদীদের দাবিটি কোনো 'করণিক ভুল' (Clerical mistake) নহে।"
        new_clerical_summary = "## The Claim of Sonavanu Was Not a Clerical Correction Claim\nSonavanu's case was not that she was omitted from the heirs of Abdul Ali. Her case was that Abdul Ali himself was wrongly recorded. এটি adverse title claim, যা title suit ছাড়া প্রমাণ সম্ভব নয়। বিবাদীদের দাবিটি কোনো 'করণিক ভুল' (Clerical mistake) নহে।"
        content = content.replace(old_clerical_summary, new_clerical_summary)

    # 7. Issue 6 (Partition maintainability - Chinmoy Chowdhury)
    if not is_summary:
        old_chinmoy = "সরকারি জমি আনিলে বরঞ্চ মামলাই চলিত না। এই ব্যক্তিগত বাটোয়ারা মামলায় সরকার কোনো necessary party নহে।"
        new_chinmoy = "সরকারি জমি আনিলে বরঞ্চ মামলাই চলিত না। এই ব্যক্তিগত বাটোয়ারা মামলায় সরকার কোনো necessary party নহে। অধিকন্তু, বাটোয়ারা মামলায় title-এর প্রশ্ন উঠিলে সেটিও নির্ধারণ করা সম্ভব।\n\n> **Chinmoy Chowdhury vs. State:** \"All incidental questions of title can be decided in partition suit.\""
        content = content.replace(old_chinmoy, new_chinmoy)
        # Add to auxiliary cases
        content = content.replace("| ১৪ | 23 BLD (AD) 83 |", "| ১৪ | 23 BLD (AD) 83 |\n| ১৫ | Chinmoy Chowdhury | All incidental questions of title can be decided in partition suit |")
    else:
        old_chinmoy_summary = "Hotchpot বা সরকারি পক্ষ যুক্ত না করার কারণে ব্যক্তিগত বাটোয়ারা মামলা বাতিল হয় না (49 DLR (AD) 15)।"
        new_chinmoy_summary = "Hotchpot বা সরকারি পক্ষ যুক্ত না করার কারণে ব্যক্তিগত বাটোয়ারা মামলা বাতিল হয় না (49 DLR (AD) 15)। \"All incidental questions of title can be decided in partition suit\" (Chinmoy Chowdhury)।"
        content = content.replace(old_chinmoy_summary, new_chinmoy_summary)

    # 8. Winning Theme
    if not is_summary:
        old_theme = "এই আপীলে আদালতের সামনে প্রকৃত প্রশ্ন আব্দুল আলী না আব্দুল করিম নহে। প্রকৃত প্রশ্ন হইল—একটি চূড়ান্তভাবে প্রকাশিত ও আজও অপরিবর্তিত State Record কি একটি অপ্রমাণিত Misc Case এবং parent-order বিহীন volume note দ্বারা পরাজিত হইতে পারে? আইন ও প্রমাণ উভয়ের উত্তর—না।"
        new_theme = "এই আপীলে আদালতের সামনে প্রকৃত প্রশ্ন আব্দুল আলী না আব্দুল করিম নহে। প্রকৃত প্রশ্ন হইল—একটি চূড়ান্তভাবে প্রকাশিত ও আজও অপরিবর্তিত State Record কি একটি অপ্রমাণিত Misc Case এবং parent-order বিহীন volume note দ্বারা পরাজিত হইতে পারে? আইন ও প্রমাণ উভয়ের উত্তর—না।\n\n> **Respondents are not proving a correction. They are attempting to prove a new title. A new title cannot be created through an unproved Misc Case, an unexplained volume note, and a record room that never changed.**"
        content = content.replace(old_theme, new_theme)
    else:
        old_theme_summary = "রাষ্ট্রীয় রেকর্ড (SA ২৩৮) বনাম অপ্রমাণিত কাহিনী ও মার্জিন নোট। আইন সর্বদা প্রমাণিত রেকর্ডের পক্ষে দাঁড়ায়।"
        new_theme_summary = "রাষ্ট্রীয় রেকর্ড (SA ২৩৮) বনাম অপ্রমাণিত কাহিনী ও মার্জিন নোট। আইন সর্বদা প্রমাণিত রেকর্ডের পক্ষে দাঁড়ায়।\n\n> **Winning Theme: Respondents are not proving a correction. They are attempting to prove a new title. A new title cannot be created through an unproved Misc Case, an unexplained volume note, and a record room that never changed.**"
        content = content.replace(old_theme_summary, new_theme_summary)

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully processed and wrote to {out_path}")

process_file('Output/appellate_argument_v55_Brief.md', 'Output/appellate_argument_v56_Brief.md', is_summary=False)
process_file('Output/appellate_argument_v55_Summary.md', 'Output/appellate_argument_v56_Summary.md', is_summary=True)
