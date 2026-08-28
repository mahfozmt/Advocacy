// Builds a curated per-theory reference library from the harvested corpus in
// Resource/Judgements_Appeal38_2026/ (batch_<n>.json arrays + loose case_<Id>.json).
// For each of the 13 theories (same keyword lists as fetch_case38_upgrade.js), every civil
// judgment's full_judgment text is checked against ALL of that theory's keywords (English AND
// Bangla - unicode-safe, no regex-escaping corruption of the Bangla terms), scored by match count,
// and the top N per theory are written out with citation + a representative quoted snippet.
const fs = require('fs');
const path = require('path');

const CORPUS_DIR = path.join(__dirname, '..', 'Resource', 'Judgements_Appeal38_2026');
const OUT_FILE = path.join(__dirname, '..', 'Output', 'Judgements_Reference_Library.md');
const TOP_N_PER_THEORY = 8;

// Extract the 13 theory groups + their keyword lists straight from the harvester script's source,
// so this stays in sync with whatever keyword list was actually used to build the corpus.
function loadKeywordGroups() {
    const src = fs.readFileSync(path.join(__dirname, 'fetch_case38_upgrade.js'), 'utf8');
    const groupRe = /theory: "(L\d+_[A-Z_]+)",\s*anykeys: \[([\s\S]*?)\]\s*\}/g;
    const groups = [];
    let m;
    while ((m = groupRe.exec(src))) {
        const theory = m[1];
        const body = m[2];
        const keyRe = /"((?:[^"\\]|\\.)*)"/g;
        const keywords = [];
        let km;
        while ((km = keyRe.exec(body))) keywords.push(km[1]);
        groups.push({ theory, keywords });
    }
    return groups;
}

function escapeForRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const STOPWORDS = new Set(['the', 'a', 'an', 'of', 'to', 'by', 'in', 'for', 'is', 'and', 'or', 'not', 'no', 'be', 'on', 'that', 'this', 'without', 'does']);

// A phrase-level keyword rarely appears verbatim (the API's own search is fuzzy/tokenized, not
// exact-phrase), so build BOTH an exact-phrase regex (highest signal when it hits) AND a per-word
// regex list of the keyword's significant content words (partial credit when most of them co-occur).
function buildKeywordMatcher(kw) {
    const exact = new RegExp(escapeForRegex(kw), 'giu');
    const words = kw.split(/\s+/).filter(w => w.length > 1 && !STOPWORDS.has(w.toLowerCase()));
    const wordRegexes = words.map(w => new RegExp(`(?:^|[^\\p{L}\\p{N}])${escapeForRegex(w)}(?:[^\\p{L}\\p{N}]|$)`, 'giu'));
    return { kw, exact, wordRegexes, wordCount: words.length };
}

function loadCorpus() {
    const files = fs.readdirSync(CORPUS_DIR);
    const cases = [];
    for (const f of files) {
        if (f.startsWith('batch_') && f.endsWith('.json')) {
            const arr = JSON.parse(fs.readFileSync(path.join(CORPUS_DIR, f), 'utf8'));
            cases.push(...arr);
        } else if (f.startsWith('case_') && f.endsWith('.json')) {
            cases.push(JSON.parse(fs.readFileSync(path.join(CORPUS_DIR, f), 'utf8')));
        }
    }
    return cases;
}

// Exact phrase hit = strong signal (3 pts/occurrence). Otherwise, partial credit if most of the
// keyword's significant words co-occur anywhere in the document (>=60% of them present).
function scoreCase(fullJudgment, matchers) {
    let score = 0;
    const hits = [];
    for (const m of matchers) {
        const exactMatches = fullJudgment.match(m.exact);
        if (exactMatches) {
            score += exactMatches.length * 3;
            hits.push({ kw: m.kw, exact: true });
            continue;
        }
        if (m.wordCount === 0) continue;
        let present = 0;
        for (const wr of m.wordRegexes) { if (fullJudgment.match(wr)) present++; }
        const ratio = present / m.wordCount;
        if (ratio === 1 && present >= 2) {
            score += ratio;
            hits.push({ kw: m.kw, exact: false, ratio });
        }
    }
    return { score, hits };
}

function bestSnippetAround(text, matchers, radius = 350) {
    // Prefer an exact-phrase hit for the snippet anchor; fall back to the first matched word.
    for (const m of matchers) {
        m.exact.lastIndex = 0;
        const em = m.exact.exec(text);
        if (em) return anchorSnippet(text, em.index, em[0].length, radius);
    }
    for (const m of matchers) {
        for (const wr of m.wordRegexes) {
            wr.lastIndex = 0;
            const wm = wr.exec(text);
            if (wm) return anchorSnippet(text, wm.index, wm[0].length, radius);
        }
    }
    return text.substring(0, 400).replace(/\s+/g, ' ').trim() + '...';
}

function anchorSnippet(text, index, len, radius) {
    const start = Math.max(0, index - radius);
    const end = Math.min(text.length, index + len + radius);
    let snippet = text.substring(start, end).replace(/\s+/g, ' ').trim();
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    return snippet;
}

function run() {
    const groups = loadKeywordGroups();
    console.log(`Loaded ${groups.length} theory groups from harvester script.`);
    const cases = loadCorpus();
    console.log(`Loaded ${cases.length} civil judgments from corpus.`);

    let md = `# Judgment Reference Library - Appeal 38/2026 (Tangail Partition Suit 66/2016)\n\n`;
    md += `Auto-generated from ${cases.length} harvested civil judgments across ${groups.length} legal theories. `;
    md += `Top ${TOP_N_PER_THEORY} per theory by keyword-match density (English + Bangla). Review before citing - `;
    md += `these are candidates for counsel to verify, not pre-approved authorities.\n\n---\n\n`;

    for (const group of groups) {
        const matchers = group.keywords.map(buildKeywordMatcher);

        const scored = [];
        for (const c of cases) {
            const text = c.full_judgment || '';
            if (!text) continue;
            const { score, hits } = scoreCase(text, matchers);
            if (score > 0) scored.push({ c, score, hits });
        }
        scored.sort((a, b) => b.score - a.score);
        const top = scored.slice(0, TOP_N_PER_THEORY);

        console.log(`${group.theory}: ${scored.length} matching cases, taking top ${top.length}`);

        md += `## ${group.theory}\n\n`;
        md += `*${scored.length} case(s) matched at least one keyword in this theory.*\n\n`;

        if (top.length === 0) {
            md += `_No matches found in the corpus for this theory's keywords._\n\n---\n\n`;
            continue;
        }

        top.forEach((t, idx) => {
            const c = t.c;
            const parties = (c.parties || '').replace(/[\r\n]+/g, ' / ').trim();
            const hitMatchers = matchers.filter(m => t.hits.some(h => h.kw === m.kw));
            const snippet = bestSnippetAround(c.full_judgment, hitMatchers);
            const hitLabels = t.hits.map(h => h.exact ? h.kw : `${h.kw} (partial ${Math.round(h.ratio * 100)}%)`);
            md += `### [${idx + 1}] ${c.book_ref || c.caseno || 'Id ' + c.Id} (score ${t.score.toFixed(1)})\n`;
            md += `- **Case No:** ${(c.caseno || '').replace(/[\r\n]+/g, ' ')}\n`;
            md += `- **Parties:** ${parties}\n`;
            md += `- **Division / Date:** ${c.division_name || ''} / ${(c.judgment_date || '').replace('Judgment', '').trim()}\n`;
            md += `- **Matched keywords:** ${hitLabels.join(', ')}\n`;
            md += `- **Id:** ${c.Id}\n`;
            md += `  > ${snippet}\n\n`;
        });
        md += `---\n\n`;
    }

    fs.writeFileSync(OUT_FILE, md, 'utf8');
    console.log(`\nWritten: ${OUT_FILE}`);
}

run();
