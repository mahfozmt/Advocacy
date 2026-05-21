const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const scobDir = path.join(__dirname, '../Resource/SCOB');
const keywords = ["SA Act", "CS Khas", "পক্ষদোষ", "হচপট", "partition", "non-joinder"];

async function scanPdfs() {
    console.log("Starting quick scan of SCOB PDFs...");
    const files = fs.readdirSync(scobDir).filter(f => f.endsWith('.pdf'));
    let found = [];

    // Only scan a few to be quick, or scan the first few pages
    for (let file of files.slice(0, 3)) { // Scan just 3 for demonstration
        try {
            console.log(`Scanning ${file}...`);
            let dataBuffer = fs.readFileSync(path.join(scobDir, file));
            // pdf-parse can be slow, passing max 10 pages to speed up
            let data = await pdf(dataBuffer, { max: 50 }); 
            let text = data.text;
            let fileFound = false;
            for (let kw of keywords) {
                if (text.toLowerCase().includes(kw.toLowerCase())) {
                    found.push(`- **${file}**: Matched keyword '${kw}'`);
                    fileFound = true;
                }
            }
        } catch (e) {
            console.log(`Error parsing ${file}: ${e.message}`);
        }
    }
    
    console.log("Scan complete. Matches:");
    console.log(found.join('\n'));
}

scanPdfs();
