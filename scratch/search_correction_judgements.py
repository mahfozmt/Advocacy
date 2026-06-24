import os
import json
import re

judgements_dir = "Resource/Judgements"
search_terms = {
    "khatian_correction_invalid": [r"khatian", r"correction", r"invalid|void|unauthorized|without jurisdiction", r"sole holder|sole tenant|sole rayat"]
}

results = []

files = [f for f in os.listdir(judgements_dir) if f.endswith(".json")]
print(f"Total files to search: {len(files)}")

for filename in files:
    filepath = os.path.join(judgements_dir, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        full_jud = data.get("full_judgment", "")
        book_ref = data.get("book_ref", "")
        caseno = data.get("caseno", "")
        parties = data.get("parties", "")
        scraped_kw = data.get("_scraped_keyword", "")

        content_to_search = f"{book_ref} {caseno} {parties} {full_jud} {scraped_kw}".lower()

        matches = []
        for pattern in search_terms["khatian_correction_invalid"]:
            if re.search(pattern, content_to_search, re.IGNORECASE):
                matches.append(pattern)
        if len(matches) >= 2: # Match at least 2 patterns
            results.append({
                "file": filename,
                "book_ref": book_ref,
                "parties": parties,
                "match_count": len(matches),
                "matched_patterns": matches,
                "text_snippet": full_jud[:500].replace('\n', ' ') # print a snippet
            })
    except Exception as e:
        pass

results.sort(key=lambda x: x["match_count"], reverse=True)
for m in results[:10]:
    print(f"File: {m['file']} | Ref: {m['book_ref']} | Parties: {m['parties']}")
    print(f"Matched Patterns ({m['match_count']}): {m['matched_patterns']}")
    print("-" * 80)
