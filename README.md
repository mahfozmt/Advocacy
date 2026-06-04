# Project Title & Overview

**AI Legal Architecture for Appellate Research & Argument Drafting**

This repository serves as an automated AI-driven legal research and appellate argument drafting system specifically tailored for Bangladeshi land law cases. It is designed to act as a complete knowledge base and execution environment for processing raw case materials (such as trial court judgments, historical deeds, and records), performing advanced legal research against precedents (e.g., Supreme Court Online Bulletin - SCOB), and synthesizing highly structured, persuasive appellate arguments in formal Bengali.

## Repository Directory Tree

```text
/
├── .gitignore                  # Git configuration file ignoring irrelevant node_modules
├── extract.ps1                 # PowerShell script for text extraction from .docx
├── doc_content.txt             # Extracted raw text from trial court judgments
├── Resource/                   # Primary knowledge base and raw materials
│   ├── SCOB/                   # Supreme Court Online Bulletin database
│   │   ├── 1_SCOB_2015.pdf     # 20 SCOB PDF files used for legal research
│   │   ├── ...
│   │   └── 19_SCOB_2024.pdf
│   ├── THE JUDGMENT IN ORIGINAL SUIT_CASE.docx  # Trial court judgment
│   ├── New_Ground_Burden_of_Proof_Reversal_Bengali.md
│   ├── আপিল_গবেষণা_প্রতিবেদন_বাংলা.md
│   ├── appeal_memorandum_final (1).docx
│   └── [Various PDFs, DOCX, and MD files regarding case analysis]
└── Output/                     # Generated assets and finalized artifacts
    ├── appellate_argument.md   # Finalized appellate argument draft
    ├── Oral_Argument_Appeal.docx # Finalized DOCX version
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

### 3. Drafting & Versioning in `/Output`
The synthesized legal arguments are drafted in Markdown and saved in the `/Output` directory.
- **Versioning Protocol:** Arguments are generated iteratively. For example, an initial draft might be saved as `appellate_argument.md` (V1). As further reviews occur (e.g., encountering new legal defenses or countering the trial court's findings on "পক্ষদোষ" and "হচপট দোষ"), a subsequent version like `appellate_argument_v2.md` will be created. This ensures historical drafts are preserved and changes are traceable.
- **Asset Generation:** Finalized Markdown files are converted into ready-to-print formats using the `create_docx.js` or `create_docx.py` scripts.

## Instructions for Future AI Agents (Agent Guidance)

Welcome to the AI Legal Architecture repository. When operating within this ecosystem, you must adhere strictly to the following guidelines:

1. **Single Source of Truth:** Always refer to this `README.md` first. Understand the directory structure before making any changes.
2. **Read-Only `/Resource` Folder:** The `/Resource` folder contains immutable raw data, historical documents, and the SCOB database. **Do not modify or delete** any files in this directory. You may only read from it and extract information.
3. **Artifact Generation in `/Output`:** All generated drafts, reports, and compiled files must be saved in the `/Output` directory.
4. **Strict Versioning:** Do **not** overwrite historical versions of appellate arguments. If you are refining `appellate_argument.md`, save your new draft as `appellate_argument_v2.md` (or increment the version appropriately).
5. **Script Utilization:** Leverage existing scripts (`extract.ps1`, `create_docx.js`, `create_docx.py`) for data extraction and document conversion instead of writing new ones from scratch. Ensure you check `package.json` for Node.js dependencies if running JS scripts.

## Implementation Checklist / Current Progress Status

- [x] **Repository Initialization:** Directory structure set up with Git tracking (optimized `.gitignore` configured for `/Resource` and `/Output`).
- [x] **Data Ingestion:** Trial court judgment and background legal data successfully added to `/Resource`.
- [x] **SCOB Database Integration:** 20 Supreme Court Online Bulletin PDFs loaded into `/Resource/SCOB`.
- [x] **Initial Argument Drafting:** V1 of the appellate argument generated (`appellate_argument.md`).
- [x] **Document Conversion Scripts:** Node.js and Python scripts created for DOCX generation.
- [ ] **Advanced Versioning:** Implementation of V2 drafts (`appellate_argument_v2.md`) incorporating targeted counters for remaining legal loopholes.
- [ ] **Automated PDF Parsing:** Creating a unified script to directly query the 20 SCOB PDFs using semantic search or OCR pipelines.
- [ ] **Final Review:** Human-in-the-loop review of the final output documents before court submission.
