import os
import json
import re

judgements_dir = "Resource/Judgements"

files = [f for f in os.listdir(judgements_dir) if f.endswith(".json")]

for filename in files:
    filepath = os.path.join(judgements_dir, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        full_jud = data.get("full_judgment", "").lower()
        book_ref = data.get("book_ref", "")
        keywords = data.get("_scraped_keyword", "").lower()

        # Searching specifically for SA khatian, correction without jurisdiction, volume note, etc.
        if "sa khatian" in full_jud or "sa khatian" in keywords:
            if "jurisdiction" in full_jud and ("mutation" in full_jud or "correction" in full_jud or "revenue officer" in full_jud):
                # find snippets
                snippets = []
                for s in data.get("full_judgment", "").split("."):
                    s_lower = s.lower()
                    if ("khatian" in s_lower or "mutation" in s_lower) and ("jurisdiction" in s_lower or "void" in s_lower or "illegal" in s_lower):
                        if "revenue" in s_lower or "officer" in s_lower or "ac land" in s_lower or "correction" in s_lower:
                            snippets.append(s.strip())
                if snippets:
                    print(f"File: {filename} | Ref: {book_ref}")
                    for snip in snippets[:3]:
                        print(f"  - {snip}")

    except Exception as e:
        pass
