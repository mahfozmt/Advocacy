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

        # Searching for High Court or Appellate Division cases explicitly saying mutation/correction of Khatian is void or illegal
        if ("void" in full_jud or "illegal" in full_jud or "without jurisdiction" in full_jud) and \
           ("correction of khatian" in full_jud or "mutation" in full_jud or "volume" in full_jud):

           if "sole" in full_jud or "exclusive" in full_jud:
               print(f"Match found in: {filename} | Ref: {data.get('book_ref')}")

    except Exception as e:
        pass
