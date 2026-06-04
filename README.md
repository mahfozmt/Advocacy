# Project Title & Overview

**AI Legal Architecture for Appellate Research & Argument Drafting**

This repository serves as an automated AI-driven legal research and appellate argument drafting system specifically tailored for Bangladeshi land law cases. It is designed to act as a complete knowledge base and execution environment for processing raw case materials (such as trial court judgments, historical deeds, and records), performing advanced legal research against precedents (e.g., Supreme Court Online Bulletin - SCOB), and synthesizing highly structured, persuasive appellate arguments in formal Bengali.

**Active Case:** আপীল মামলা নং ৩৮/২০২৬, জেলা জজ আদালত, টাঙ্গাইল (হাতেম আলী ও অন্যান্য বনাম আলহাজ উদ্দিন ও অন্যান্য)

## Repository Directory Tree

```text
/
├── .gitignore                  # Git configuration file
├── extract.ps1                 # PowerShell script for text extraction from .docx
├── doc_content.txt             # Extracted raw text from trial court judgments
├── Resource/                   # Primary knowledge base and raw materials
│   ├── SCOB/                   # Supreme Court Online Bulletin database (20 PDFs: 1–20 SCOB)
│   ├── THE JUDGMENT IN ORIGINAL SUIT_CASE.docx  # Trial court judgment
│   └── [Various PDFs, DOCX, and MD files regarding case analysis]
└── Output/                     # Generated assets and finalized artifacts
    ├── appellate_argument_v30.md          # ✅ CURRENT — Full appellate brief (বিস্তারিত)
    ├── appellate_argument_v30_Summary.md  # ✅ CURRENT — Concise hearing aid (শুনানি সহায়িকা)
    ├── Oral_Argument_Appeal.docx          # Earlier DOCX version (pre-v29)
    ├── create_docx.js          # Node.js script for document conversion
    ├── create_docx.py          # Python script for document conversion
    ├── package.json            # Node.js dependencies configuration
    └── package-lock.json       # Node.js dependencies lockfile
```

## Core Workflows & Pipelines

### 1. Data Ingestion & Processing
The workflow begins in the `/Resource` directory. Raw materials, such as the trial court's judgment (`THE JUDGMENT IN ORIGINAL SUIT_CASE.docx`), are ingested. Automated scripts like `extract.ps1` extract textual data into normalized formats (e.g., `doc_content.txt`) for AI agents to read and analyze without parsing overhead.

### 2. Legal Research & Precedent Matching (SCOB Pipeline)
The agent scans the 20 PDF files located in `/Resource/SCOB`. The research pipeline filters for civil matters and targets specific legal keywords critical to Bangladeshi land law, such as:
- **SA Act (State Acquisition and Tenancy Act, 1950)**
- **CS Khas (Cadastral Survey)**
- **Patta & Rent Roll**
- **Non-joinder/Misjoinder (পক্ষদোষ)**
- **Common Hotchpot (হচপট দোষ)**
- **Presumption of SA Khatian (50 DLR 186)**
- **Burden of Proof reversal in record-based cases**

### 3. Drafting & Versioning in `/Output`

The synthesized legal arguments are drafted in Markdown and saved in the `/Output` directory.

#### Dual-File Output Convention (Current Policy)
From v29 onwards, **every version produces two files**:

| File | Purpose | When to Use |
|---|---|---|
| `appellate_argument_vXX.md` | Full detailed brief — all arguments, sub-points, case law with full reasoning | Pre-hearing study, opponent anticipation |
| `appellate_argument_vXX_Summary.md` | Concise hearing aid — core arguments in tables, quick reference | During oral arguments in court |

**Rule:** Every edit or new point added must be applied to **both files** simultaneously. The two files must always remain in sync.

#### Versioning Protocol
- Never overwrite a previous version. Increment the version number (e.g., v29 → v30).
- Both the full brief and summary must be created together as a new version pair.
- Historical versions are preserved for traceability.

## Instructions for Future AI Agents (Agent Guidance)

When operating within this ecosystem, adhere strictly to the following guidelines:

1. **Single Source of Truth:** Always refer to this `README.md` first before making any changes.
2. **Read-Only `/Resource` Folder:** Do not modify or delete any files in this directory. Read-only access only.
3. **Artifact Generation in `/Output`:** All generated drafts must be saved in the `/Output` directory.
4. **Strict Versioning:** Do not overwrite historical versions. Increment version number for new drafts.
5. **Dual-File Rule:** Every change must be applied to **both** the full brief (`_vXX.md`) and the summary (`_vXX_Summary.md`). Never update one without the other.
6. **Citation Hygiene:** Only include verified citations from SCOB, DLR, BLD, BLT, MLR. Remove any unverified, Indian, or non-existent citations immediately.
7. **Script Utilization:** Use existing scripts (`create_docx.js`, `create_docx.py`) for document conversion.

## Key Legal Arguments — Current Version Summary

| Argument | Counter | Key Citation |
|---|---|---|
| SA 238 খতিয়ান presumption | Unbroken — defendants failed to rebut | 50 DLR 186 |
| কথিত ১৯৩৪ পত্তন | Unregistered, Court of Wards unapproved, SAT Act-এ বিলুপ্ত | 4 SCOB [2015] HCD 52 |
| মিস মোকদ্দমা ১১৮১/১৯৬৯ | No decree possible in Misc Case; no proof produced | CPC ২(২)/২(১৪); 20 SCOB [2025] HCD 12 |
| AC Land volume note | Different ink (DW-4 admitted); no mutation case; no legal value | 53 DLR 19; 7 SCOB [2016] HCD 135 |
| হচপট দোষ | Separate khatian = separate tenancy; math proves defendants wrong | 27 BLD 229; 6 SCOB (2016) AD 11 |
| পক্ষদোষ | Government not a necessary party in private partition suit | 49 DLR (AD) 15; 8 SCOB (2016) HCD 1 |
| Burden of proof | Defendants must prove their correction claim, not plaintiffs | 45 DLR (AD) 124; 10 BLT (AD) 105 |
| Title-affecting vs. clerical correction | 1969 required full Title Suit; Misc Case order = null and void | SRA ৪২; 23 BLD (AD) 83 |

## Implementation Checklist / Current Progress Status

- [x] **Repository Initialization:** Directory structure set up with Git tracking.
- [x] **Data Ingestion:** Trial court judgment and background legal data added to `/Resource`.
- [x] **SCOB Database Integration:** 20 Supreme Court Online Bulletin PDFs loaded into `/Resource/SCOB`.
- [x] **Initial Argument Drafting:** V1 through V28 generated and refined.
- [x] **Document Conversion Scripts:** Node.js and Python scripts created for DOCX generation.
- [x] **Citation Hygiene:** All unverified, Indian, and invalid citations removed.
- [x] **Dual-File Output Convention:** v30 full brief + v30 Summary both finalized and in sync.
- [x] **New Points Integrated:** Title-affecting correction standard, 1969 correction process, Misc Case "Decree" impossibility, Standard of Scrutiny failure, solenama-blocked partition injustice.
- [ ] **DOCX Conversion:** Convert v30 + v30_Summary to court-ready DOCX format.
- [ ] **Final Human Review:** Human-in-the-loop review before court submission.


