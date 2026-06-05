import os
import json
import re

judgements_dir = r"f:\Mahfoz\Advocacy\Resource\Judgements"
search_terms = {
    "presumption_sa": [r"50\s*DLR\s*186", r"presumption", r"correctness", r"rebut"],
    "nawab_court_of_wards": [r"nawab", r"court of wards", r"chief manager", r"unregistered pattan"],
    "misc_case_title": [r"misc\b", r"miscellaneous case", r"decree", r"title suit", r"section 42"],
    "volume_note": [r"volume note", r"koronlipi", r"different ink", r"order sheet", r"parent file"],
    "burden_of_proof": [r"burden of proof", r"onus", r"plaintiff", r"defendant", r"section 103"],
    "non_joinder_govt": [r"non-joinder", r"non joinder", r"necessary party", r"government"],
    "hotchpot": [r"hotchpot", r"partition", r"separate khatian", r"separate tenancy"]
}

results = {category: [] for category in search_terms}

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
        
        # Search for terms
        content_to_search = f"{book_ref} {caseno} {parties} {full_jud} {scraped_kw}".lower()
        
        for category, patterns in search_terms.items():
            matches = []
            for pattern in patterns:
                if re.search(pattern, content_to_search, re.IGNORECASE):
                    matches.append(pattern)
            if matches:
                # Store match score (how many patterns matched) and data
                results[category].append({
                    "file": filename,
                    "book_ref": book_ref,
                    "caseno": caseno,
                    "parties": parties,
                    "scraped_kw": scraped_kw,
                    "match_count": len(matches),
                    "matched_patterns": matches,
                    "full_text_len": len(full_jud)
                })
    except Exception as e:
        print(f"Error reading {filename}: {e}")

# Display top matches for each category
for category, matches in results.items():
    print(f"\n================================ CATEGORY: {category} ================================")
    # Sort matches by match_count descending, then length of judgment
    matches.sort(key=lambda x: (x["match_count"], x["full_text_len"]), reverse=True)
    for m in matches[:5]:
        print(f"File: {m['file']}")
        print(f"Ref: {m['book_ref']} | Case No: {m['caseno']}")
        print(f"Parties: {m['parties'].replace(chr(13), ' ').replace(chr(10), ' ')}")
        print(f"Matched Patterns ({m['match_count']}): {m['matched_patterns']}")
        print("-" * 40)
