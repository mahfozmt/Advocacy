const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

const mdPath = path.resolve('..', 'Output', 'appellate_argument_v23.md');
const pdfPath = path.resolve('..', 'Output', 'appellate_argument_v23_compact.pdf');

(async () => {
    try {
        const { marked } = await import('marked');
        const mdContent = fs.readFileSync(mdPath, 'utf8');
        const htmlContent = marked.parse(mdContent);

        const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: 'Nirmala UI', 'Kalpurush', 'Siyam Rupali', 'Vrinda', sans-serif;
                    font-size: 11px; /* Mini size to compact 6-7 pages */
                    line-height: 1.15;
                    color: #000;
                    margin: 0;
                    padding: 0;
                    text-align: justify;
                }
                h1, h2, h3, h4, h5, h6 {
                    margin-top: 5px;
                    margin-bottom: 3px;
                    line-height: 1.2;
                    color: #111;
                }
                h1 { font-size: 15px; text-align: center; }
                h2 { font-size: 14px; }
                h3 { font-size: 13px; }
                h4 { font-size: 12px; }
                p, ul, ol, blockquote {
                    margin-top: 2px;
                    margin-bottom: 2px;
                }
                ul, ol {
                    padding-left: 18px;
                }
                li {
                    margin-bottom: 1px;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin-top: 3px;
                    margin-bottom: 3px;
                }
                th, td {
                    border: 1px solid #777;
                    padding: 2px 4px;
                    font-size: 10px;
                }
                th { background-color: #eee; }
                hr {
                    margin: 4px 0;
                    border: 0;
                    border-top: 1px solid #ccc;
                }
                blockquote {
                    border-left: 3px solid #ccc;
                    padding-left: 8px;
                    margin-left: 0;
                    color: #333;
                    background-color: #f9f9f9;
                }
                strong, b { font-weight: bold; }
            </style>
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
        `;

        console.log("Launching puppeteer...");
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        console.log("Setting content...");
        await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
        
        console.log("Generating PDF...");
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '12mm',
                right: '12mm',
                bottom: '12mm',
                left: '12mm'
            }
        });
        
        await browser.close();
        console.log("PDF generated successfully at:", pdfPath);
    } catch (err) {
        console.error("Error generating PDF:", err);
    }
})();
