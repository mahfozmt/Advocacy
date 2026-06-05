import os
import sys
import re

# Try to use pypdf or pdfplumber
try:
    import pypdf
    USE_PYPDF = True
except ImportError:
    USE_PYPDF = False

try:
    import pdfplumber
    USE_PDFPLUMBER = True
except ImportError:
    USE_PDFPLUMBER = False

SCOB_DIR = r"f:\Mahfoz\Advocacy\Resource\SCOB"
OUTPUT_FILE = r"f:\Mahfoz\Advocacy\scratch\scob_keyword_results.txt"

KEYWORDS = [
    r"S\.A\.",
    r"\bS\.A\b",
    r"\bSA\s+khatian\b",
    r"\bSA\s+record\b",
    r"\bSA\s+plot\b",
    r"\bSA\s+survey\b",
    r"\bpatta\b",
    r"\bpattan\b",
    r"\bkabuliyot\b",
    r"\bkabuliyat\b",
    r"Dhaka\s+Nawab",
    r"Dhaka\s+Nowab",
    r"Nawab\s+Estate",
    r"Nowab\s+Estate",
    r"Court\s+of\s+Wards",
    r"\bpartition\b",
    r"\braiyat\b",
    r"\braiyati\b",
    r"State\s+Acquisition",
    r"SAT\s+Act",
    r"\bkhas\s+land\b",
    r"\bkhasland\b",
    r"\bdiluvion\b",
    r"\bvesting\b",
    r"\bhotchpot\b",
    r"record\s+of\s+rights",
    r"\btenancy\b",
    r"\bestoppel\b",
    r"adverse\s+inference",
    r"section\s+144",
    r"section\s+86",
    r"\bpreemption\b",
    r"pre.emption",
]

CIVIL_EXCLUDE = [
    r"\b302\b", r"\b304\b", r"\b420\b", r"Nari.O.Shishu", r"narcotics",
    r"Administrative\s+Tribunal", r"VAT", r"Customs\s+Duty", r"Company\s+Law",
]

def extract_text_pypdf(path):
    text = ""
    try:
        reader = pypdf.PdfReader(path)
        for page in reader.pages:
            text += page.extract_text() or ""
    except Exception as e:
        text = f"[ERROR: {e}]"
    return text

def extract_text_pdfplumber(path):
    text = ""
    try:
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
    except Exception as e:
        text = f"[ERROR: {e}]"
    return text

def search_keywords(text, filename):
    results = []
    for kw in KEYWORDS:
        matches = re.findall(kw, text, re.IGNORECASE)
        if matches:
            # Get context for first match
            m = re.search(kw, text, re.IGNORECASE)
            if m:
                start = max(0, m.start() - 150)
                end = min(len(text), m.end() + 150)
                context = text[start:end].replace('\n', ' ').strip()
                results.append(f"  KEYWORD: {kw} ({len(matches)} hits)\n  CONTEXT: ...{context}...")
    return results

def main():
    if USE_PYPDF:
        extractor = extract_text_pypdf
        print("Using pypdf")
    elif USE_PDFPLUMBER:
        extractor = extract_text_pdfplumber
        print("Using pdfplumber")
    else:
        print("ERROR: No PDF library found. Install pypdf: pip install pypdf")
        return

    files = sorted([f for f in os.listdir(SCOB_DIR) if f.endswith('.pdf')])
    print(f"Found {len(files)} PDF files")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        for fname in files:
            path = os.path.join(SCOB_DIR, fname)
            print(f"Processing: {fname} ({os.path.getsize(path)//1024}KB)...")
            text = extractor(path)
            if text.startswith("[ERROR"):
                out.write(f"\n=== {fname} ===\n{text}\n")
                continue
            
            hits = search_keywords(text, fname)
            out.write(f"\n{'='*60}\n")
            out.write(f"FILE: {fname}\n")
            out.write(f"TEXT LENGTH: {len(text)} chars\n")
            if hits:
                out.write(f"KEYWORD HITS: {len(hits)}\n")
                for h in hits:
                    out.write(h + "\n\n")
            else:
                out.write("NO KEYWORD HITS\n")
    
    print(f"\nDone! Results saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
