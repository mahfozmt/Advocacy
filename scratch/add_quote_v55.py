def process_file(in_path, out_path):
    with open(in_path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_text = "**The Logical Flow of Invalidity (The Root and Fruit):**\n**কথিত Misc Case যদি প্রমাণিত না হয়, তবে সেই Misc Case-এর ফলশ্রুতি হিসেবে দাবি করা Volume Note-ও স্বাধীনভাবে টিকিয়া থাকিতে পারে না। মূল আদেশ (Root) ব্যর্থ হলে তার উপর নির্ভরশীল নোটও (Fruit) ব্যর্থ হয়।** Parent order বা মূল রায় প্রমাণ না করিয়া শুধুমাত্র subsidiary register-এর একটি margin note দিয়া Section 144A-এর statutory presumption খণ্ডন করা অসম্ভব।"

    new_text = """**The Logical Flow of Invalidity (The Root and Fruit Theory):**
> "My Lord, when the alleged root order itself is absent, the fruit derived from it cannot survive independently."

**কথিত Misc Case যদি প্রমাণিত না হয়, তবে সেই Misc Case-এর ফলশ্রুতি হিসেবে দাবি করা Volume Note-ও স্বাধীনভাবে টিকিয়া থাকিতে পারে শাহিন থাকিতে পারে না। মূল আদেশ (Root) ব্যর্থ হলে তার উপর নির্ভরশীল নোটও (Fruit) ব্যর্থ হয়।** Parent order বা মূল রায় প্রমাণ না করিয়া শুধুমাত্র subsidiary register-এর একটি margin note দিয়া Section 144A-এর statutory presumption খণ্ডন করা অসম্ভব।"""

    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully processed {out_path}")
    else:
        print(f"Could not find exact old text in {in_path}")

process_file('Output/appellate_argument_v55_Brief.md', 'Output/appellate_argument_v55_Brief.md')

def process_summary(in_path, out_path):
    with open(in_path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_text = "- **Root and Fruit Theory:** কথিত Misc Case যদি প্রমাণিত না হয়, তবে সেই Misc Case-এর ফলশ্রুতি হিসেবে দাবি করা Volume Note-ও স্বাধীনভাবে টিকিয়া থাকিতে পারে না। মূল আদেশ (Root) ব্যর্থ হলে নির্ভরশীল নোটও (Fruit) ব্যর্থ হয়।"

    new_text = """- **Root and Fruit Theory:**
  > "My Lord, when the alleged root order itself is absent, the fruit derived from it cannot survive independently."
  কথিত Misc Case যদি প্রমাণিত না হয়, তবে সেই Misc Case-এর ফলশ্রুতি হিসেবে দাবি করা Volume Note-ও স্বাধীনভাবে টিকিয়া থাকিতে পারে না। মূল আদেশ (Root) ব্যর্থ হলে নির্ভরশীল নোটও (Fruit) ব্যর্থ হয়।"""

    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully processed {out_path}")
    else:
        print(f"Could not find exact old text in {in_path}")

process_summary('Output/appellate_argument_v55_Summary.md', 'Output/appellate_argument_v55_Summary.md')
