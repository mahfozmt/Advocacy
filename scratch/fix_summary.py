def process_summary(in_path, out_path):
    with open(in_path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_issue5 = "### ISSUE 5: AC Land-এর এখতিয়ার এবং ট্রায়াল কোর্টের ভুল\n- **এখতিয়ার বহির্ভূত কাজ:** AC Land বা রাজস্ব কর্মকর্তার mutation jurisdiction স্বত্ব নির্ধারণের (adjudication of title) jurisdiction নহে। নতুন অংশীদার সংযোজন বা বিদ্যমান রায়তের স্বত্ব কর্তন করিয়া প্রতিদ্বন্দ্বী স্বত্ব সৃষ্টি করা তাহার এখতিয়ারভুক্ত নহে (29 BLC (HD) 160)। \n- **Standard Error:** একটি State Record-এর বিপরীতে স্বত্বের মৌলিক পরিবর্তনের জন্য strict evidentiary standard প্রয়োজন। ট্রায়াল কোর্ট একটি এখতিয়ার বহির্ভূত ও অপ্রমাণিত Misc Case-এর উপর ভিত্তি করিয়া তা গ্রহণ করিয়াছেন।"

    new_issue5 = """### ISSUE 5: AC Land-এর এখতিয়ার এবং ট্রায়াল কোর্টের ভুল
- **The Claim of Sonavanu Was Not a Clerical Correction Claim:** Sonavanu's case was not that she was omitted from the heirs of Abdul Ali. Her case was that Abdul Ali himself was wrongly recorded. এটি adverse title claim, যা title suit ছাড়া প্রমাণ সম্ভব নয়।
- **এখতিয়ার বহির্ভূত কাজ:** AC Land বা রাজস্ব কর্মকর্তার mutation jurisdiction স্বত্ব নির্ধারণের (adjudication of title) jurisdiction নহে। নতুন অংশীদার সংযোজন বা বিদ্যমান রায়তের স্বত্ব কর্তন করিয়া প্রতিদ্বন্দ্বী স্বত্ব সৃষ্টি করা তাহার এখতিয়ারভুক্ত নহে (29 BLC (HD) 160)।
- **Standard Error:** একটি State Record-এর বিপরীতে স্বত্বের মৌলিক পরিবর্তনের জন্য strict evidentiary standard প্রয়োজন। ট্রায়াল কোর্ট একটি এখতিয়ার বহির্ভূত ও অপ্রমাণিত Misc Case-এর উপর ভিত্তি করিয়া তা গ্রহণ করিয়াছেন।"""

    if old_issue5 in content:
        content = content.replace(old_issue5, new_issue5)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully fixed summary")
    else:
        print("Could not find old_issue5 in summary")

process_summary('Output/appellate_argument_v56_Summary.md', 'Output/appellate_argument_v56_Summary.md')
