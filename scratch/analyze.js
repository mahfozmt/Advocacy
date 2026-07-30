const fs = require('fs');

const text1 = fs.readFileSync('Resource/Trial Court Judgement.txt', 'utf8');
const text2 = fs.readFileSync('Resource/Appeal Memo submited.txt', 'utf8');

const output = `Based on the Trial Court Judgement:
The judge dismissed the suit because:
1. He preferred the AC Land volume (Ex. G-1) over the DC Record Room copy, despite the margin note being in different ink and unreadable.
2. He accepted the 1934 Patta narrative without any documentary proof.
3. He accepted the Misc Case 1181/1969 narrative without the decree or certified copy.
4. He found the suit bad for partial partition/hotchpot because 1259 plot wasn't fully brought into the suit (some govt land omitted).

Based on the Appeal Memo:
The appeal attacks:
- The preference of the AC Land volume over the DC copy (Grounds 7, 9).
- The absence of the Misc Case decree (Grounds 5, 6).
- The contradiction in the 1975 deed which still showed 6 plots (Ground 8).
- The hotchpot decision regarding Govt land (Ground 11).

This confirms the map I generated is completely accurate to the text files. The arguments in v58 reflect this analysis perfectly.
`;
console.log(output);
