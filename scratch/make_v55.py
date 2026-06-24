import re

def process_file(in_path, out_path, is_summary):
    with open(in_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Version Numbers
    content = content.replace("Version 54", "Version 55")
    content = content.replace("v54", "v55")

    # 2. Modify Issue 5 to add 29 BLC (HD) 160
    if not is_summary:
        # For Brief
        old_text = "> **Mrigangka Mohan Dhali vs. Chitta Ranjan Mondol, 18 SCOB [2023] AD 20 (পাঁচ বিচারপতির বেঞ্চ):** বিবাদীদের দ্বারা procure করা SA record entry প্রতিষ্ঠিত title override করিতে পারে না।"
        new_text = """> **Mrigangka Mohan Dhali vs. Chitta Ranjan Mondol, 18 SCOB [2023] AD 20 (পাঁচ বিচারপতির বেঞ্চ):** বিবাদীদের দ্বারা procure করা SA record entry প্রতিষ্ঠিত title override করিতে পারে না।
>
> **29 BLC (HD) 160:** "If in correcting the clerical error in the khatian the ownership is affected... the revenue officer will have no jurisdiction to correct the khatian and it will be treated as a civil dispute." অর্থাৎ, খতিয়ানের সংশোধনের মাধ্যমে মালিকানা বা স্বত্ব প্রভাবিত হলে রাজস্ব কর্মকর্তার (Revenue Officer/AC Land) উক্ত খতিয়ান সংশোধনের কোনো এখতিয়ার নাই; এটি একটি দেওয়ানি বিরোধ হিসেবে বিবেচিত হইবে।"""
        assert old_text in content, "old_text not found in Brief Issue 5"
        content = content.replace(old_text, new_text)

        # Update authorities table
        old_table = "| ৭ | 18 SCOB [2023] AD 20 | Procured SA entry প্রতিষ্ঠিত স্বত্ব override করে না |"
        new_table = """| ৭ | 18 SCOB [2023] AD 20 | Procured SA entry প্রতিষ্ঠিত স্বত্ব override করে না |
| ৭.১ | 29 BLC (HD) 160 | স্বত্ব প্রভাবিত হলে খতিয়ান সংশোধনে AC Land-এর এখতিয়ার নাই |"""
        assert old_table in content, "old_table not found in Brief"
        content = content.replace(old_table, new_table)

    else:
        # For Summary
        old_text = "**Top Authorities:** 50 DLR 186 (SA Presumption), 18 SCOB [2023] AD 20 (Procured SA entry cannot override title), 27 BLD (HD) 544 (No title in Misc Case), 53 DLR 19 (No value of Volume Note)."
        new_text = "**Top Authorities:** 50 DLR 186 (SA Presumption), 18 SCOB [2023] AD 20 (Procured SA entry cannot override title), 29 BLC (HD) 160 (No jurisdiction of AC Land if ownership is affected), 27 BLD (HD) 544 (No title in Misc Case), 53 DLR 19 (No value of Volume Note)."
        assert old_text in content, "old_text not found in Summary Authorities"
        content = content.replace(old_text, new_text)

        # Add brief mention in issue 5 of summary
        old_summary_issue5 = "নতুন অংশীদার সংযোজন বা বিদ্যমান রায়তের স্বত্ব কর্তন করিয়া প্রতিদ্বন্দ্বী স্বত্ব সৃষ্টি করা তাহার এখতিয়ারভুক্ত নহে।"
        new_summary_issue5 = "নতুন অংশীদার সংযোজন বা বিদ্যমান রায়তের স্বত্ব কর্তন করিয়া প্রতিদ্বন্দ্বী স্বত্ব সৃষ্টি করা তাহার এখতিয়ারভুক্ত নহে (29 BLC (HD) 160)।"
        assert old_summary_issue5 in content, "old_summary_issue5 not found in Summary Issue 5"
        content = content.replace(old_summary_issue5, new_summary_issue5)


    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully processed and wrote to {out_path}")

process_file('Output/appellate_argument_v54_Brief.md', 'Output/appellate_argument_v55_Brief.md', is_summary=False)
process_file('Output/appellate_argument_v54_Summary.md', 'Output/appellate_argument_v55_Summary.md', is_summary=True)
