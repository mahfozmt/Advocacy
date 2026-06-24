# Jules Agent Configuration for Tangail Civil Appeal

This `AGENTS.md` provides crucial context and rules for Google Jules or any other AI agent interacting with this repository.

## 🎯 Project Context
This repository is a structured knowledge base, legal research archive, and draft execution environment for an appellate argument before the District Judge Court, Tangail (Appeal Case No: 38/2026). It deals with civil land law disputes under the State Acquisition and Tenancy (SAT) Act 1950.

## 🤖 Agent Guidance & Rules
When operating within this workspace, you MUST strictly follow these instructions:

1. **Single Source of Truth:** 
   Always refer to the `README.md` at the root of the project to align on case facts, current arguments, and repository structure.

2. **Dual-File Editing:** 
   Any change or update to the legal arguments must be applied simultaneously to **both**:
   - The full appellate brief (`Output/appellate_argument_vXX.md`)
   - The concise court hearing aid (`Output/appellate_argument_vXX_Summary.md`)

3. **No Overwriting:** 
   Never overwrite previous document versions in the `/Output` directory. Always increment the version number when creating a new iteration (e.g., from `v33` to `v34`).

4. **Citation Hygiene:** 
   Only cite verified precedents from the `Resource/Judgements` or `Resource/SCOB` folders. Do NOT cite Indian or unverified rulings. Rely strictly on the Supreme Court of Bangladesh precedents provided in the knowledge base.

5. **Document Compilation:** 
   Use the Node.js script `Output/create_docx.js` to compile markdown drafts into court-ready document formats when requested.

## 📂 Key Directories
- `Resource/`: Contains the primary knowledge base, raw materials, and structured databases of Supreme Court cases.
- `Output/`: Contains the generated assets, finalized artifacts, and the markdown briefs.

Follow these rules to ensure the integrity of the legal arguments and the versioning system.
