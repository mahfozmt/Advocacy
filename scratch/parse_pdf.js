const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'f:/Mahfoz/Advocacy/Resource/File_06F_Zamindari_Abolition__00-003.pdf';
const outputPath = 'f:/Mahfoz/Advocacy/scratch/pdf_content.txt';

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync(outputPath, data.text, 'utf8');
    console.log("PDF parsed successfully! Total characters:", data.text.length);
}).catch(function(err) {
    console.error("Error parsing PDF:", err);
});
