const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'Output', 'Red_Team_Analysis_v58.md');

const redTeamContent = `# Red Team Analysis (v58)
**Adversarial Review: Tangail Civil Appeal No. 38/2026**

---

## 1. The Abdul Karim Theory (Root Tenancy)
### Defendant's Strongest Position:
Abdul Karim received a patta from the Dhaka Nawab Estate in 1934 for 349 decimals. Long possession by his heirs (including Sona Bhanu) establishes the tenancy, even if the original patta was unregistered. The CS record might not show him because he got the patta *after* the CS was finalized.

### Why a Trial Judge Might Accept It:
Judges in rural civil courts often accept historical family narratives of possession, especially if witnesses testify that the ancestors lived on the land. Strict proof of registration is sometimes overlooked in favor of equity and long-standing possession claims.

### How to Destroy This Defense (Plaintiff's Counter-Attack):
- **Law:** Registration Act 1908 (Sec 17/49) makes unregistered leases exceeding one year inadmissible as evidence of title. Furthermore, SAT Act precedents dictate that Zamindar settlements require formal estate recognition (rent roll/kabuliyat) which are absent here.
- **Evidence:** The defendants produced *nothing* to prove the 1934 patta. No document, no rent receipt from the Nawab Estate. A tenancy cannot be created by mere oral assertion in a written statement. If Abdul Karim had no proven legal title, his heirs (including Sona Bhanu) inherited nothing.

---

## 2. The Misc Case (1181/1969)
### Defendant's Strongest Position:
Sona Bhanu filed Misc Case 1181/1969 to correct the SA Khatian. The AC Land volume reflects this case number. Public records carry a presumption of regularity under Section 114(e) of the Evidence Act. The court should presume the Misc Case was validly disposed of since it is noted in a government register.

### Why a Trial Judge Might Accept It:
The presence of a case number in an official government volume gives an aura of authenticity. Trial judges often presume that government officials (like the AC Land) wouldn't write a case number unless an order actually existed.

### How to Destroy This Defense (Plaintiff's Counter-Attack):
- **Law:** The best evidence rule (Sections 64/65 Evidence Act). A judicial or quasi-judicial order must be proved by the primary document or a certified copy. A margin note in a secondary administrative register cannot prove the contents, scope, or even the existence of a decree.
- **Law:** Adverse Inference (Section 114(g)). By withholding the actual order, the law forces the court to presume the order was unfavorable to the defendants.
- **Jurisdiction:** Even if the Misc Case existed, a Miscellaneous proceeding is summary in nature and cannot declare title or adjudicate co-sharership against a finally published SA Khatian (27 BLD (HD) 544).

---

## 3. The AC Land Volume Note (Exhibit G-1)
### Defendant's Strongest Position:
The AC Land volume is the working copy used for revenue collection. Since Sona Bhanu's name is there, it reflects the ground reality of ownership and revenue payment. The Trial Court correctly preferred it over the DC Record Room copy because it is the "updated" operational record.

### Why a Trial Judge Might Accept It:
Trial judges are familiar with the chaotic state of land records. They often rely on the local AC Land office records because that is where mutations occur, assuming the central DC Record Room is simply outdated and hasn't been synchronized.

### How to Destroy This Defense (Plaintiff's Counter-Attack):
- **Evidence of Fraud:** DW-4 (the AC Land staff) admitted Sona Bhanu's name was written in "different ink" and he could not read the Misc Case date or say if it was written fraudulently.
- **The 1975 Deed Contradiction:** If the AC Land volume validly changed SA 238 to a single plot (1259) in 1969, why did the defendants' own registered deed in 1975 (Exhibit Kha-1) list all six plots of SA 238 exactly as they appear in the plaintiff's DC Record Room copy? This proves the volume note was a later interpolation, completely destroying the defendant's timeline.
- **Law:** The DC Record Room holds the *finally published* record enjoying statutory presumption under Section 144A. An unverified, different-ink margin note in a local office cannot override the primary State document.

---

## Conclusion of Red Team Review
The Trial Court's judgment relies entirely on secondary inferences (margin notes) while ignoring primary evidence (DC Record Room Khatian, Defendant's own 1975 deed) and excusing the defendants from their legal burden of proof. The strongest defense arguments collapse immediately upon strict application of the Evidence Act.
`;

function run() {
    fs.writeFileSync(outputPath, redTeamContent, 'utf8');
    console.log("Red Team Analysis generated successfully.");
}

run();
