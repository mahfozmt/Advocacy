import json
import sys
import re

filename = sys.argv[1]
filepath = f"Resource/Judgements/{filename}"

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Ref: {data.get('book_ref')}")
print(f"Keywords: {data.get('_scraped_keyword')}")
print("\nJudgment Text (Snippets):")

sentences = data.get("full_judgment", "").split(".")
for i, s in enumerate(sentences):
    if re.search(r"clerical error|ownership is affected", s, re.IGNORECASE):
        print(f"--- {s.strip()}")
