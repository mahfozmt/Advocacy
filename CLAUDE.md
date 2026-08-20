# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Not a software project. Structured knowledge base and draft execution environment for an appellate civil land law case: **Appeal Case No. 38/2026, District Judge Court, Tangail, Bangladesh**, under the State Acquisition and Tenancy (SAT) Act 1950. Original suit: বাটোয়ারা (partition) মামলা নং ৬৬/২০১৬. See [README.md](README.md) for full case facts, party names, the trial court's errors, admitted grounds of appeal, and the precedent table — treat it as the single source of truth for case substance.

Repo work = editing/versioning Bangla+English legal argument drafts and compiling them to `.docx`, not writing application code. There is no build/lint/test suite.

## Core workflow rules (from AGENTS.md / README.md)

1. **Dual-file editing:** any change to the legal arguments must be applied to BOTH `Output/appellate_argument_vXX_Brief.md` (full brief) and `Output/appellate_argument_vXX_Summary.md` (concise court hearing aid) together.
2. **No overwriting:** never edit/overwrite an existing version file in `Output/`. Always create a new incremented version (e.g. v94 -> v95) when changing an argument.
3. **Citation hygiene:** only cite precedents verified in `Resource/Judgements/` or `Resource/SCOB/`. Never cite Indian or otherwise unverified rulings — Supreme Court of Bangladesh only.
4. **Compile to docx after every new version (mandatory):**
   ```bash
   cd Output && node create_docx.js vXX
   ```
   This reads `appellate_argument_vXX_Brief.md` and `appellate_argument_vXX_Summary.md` and writes the matching `.docx` files. Requires `docx` npm package (`Output/package.json`) — run `npm install` in `Output/` if `node_modules` is missing.
5. **Batched data handling:** when fetching/processing large volumes of judgments, never save one file per judgment (browser/tool hangs). Batch into JSON files of 50-100 items (see `scratch/batch_4_state.json` style outputs).
6. **Chunked long-running operations:** for large scraping/search jobs, work in chunks and commit/push progress incrementally rather than one long uninterrupted run.

## Repository layout

- `Resource/` — primary knowledge base: trial court judgment (`Trial Court Judgement.txt`), admitted appeal memo, SCOB bulletin PDFs (`Resource/SCOB/`), a structured 1000+ case database (`Resource/Judgements/`, JSON), and Bangla/English case-analysis documents.
- `Output/` — generated artifacts. Versioned brief/summary pairs (`appellate_argument_vXX_Brief.md` / `_Summary.md` + compiled `.docx`), supporting analysis docs (Authority Matrix, Red Team / Independent Review, Reasoning Maps — mostly JSON+MD pairs), and the docx compiler (`create_docx.js`, Node/`docx` package).
- `scratch/` — one-off Node/Python scripts used to search, extract, fetch, and score judgments/precedents against the Resource database, plus their intermediate state/output files. Treat as disposable working scripts, not maintained tooling — check timestamps/content before reusing one rather than assuming it still matches current data shapes.

## Version history context

`README.md` maintains a running changelog of what each brief version added (v1-19 exploratory ingestion, v29 established the dual-file protocol, v34 search-backed precedent integration, v54 void record-correction logic, etc.). Check the latest entry there before drafting a new version so new arguments build on — rather than duplicate — prior legal reasoning. The current latest version is v95 (see `Output/` for the newest `_Brief.md`/`_Summary.md`/`.docx` set).

## Precedent table

README.md carries a table of the top verified precedents (Nawab Estate transition, SA presumption, mutation/volume-book fraud, partition technicals, burden of proof, jurisdiction of misc. cases) with citation, parties, and holding. Cross-check any new citation against this table and the underlying `Resource/Judgements` / `Resource/SCOB` files before adding it to a brief.
