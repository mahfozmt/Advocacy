const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const mdPath = path.resolve('..', 'Output', 'appellate_argument_v23.md');
const htmlPath = path.resolve('..', 'Output', 'appellate_argument_v23_compact.html');

(async () => {
    try {
        const mdContent = fs.readFileSync(mdPath, 'utf8');
        const bodyContent = marked.parse(mdContent);

        const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="bn">
        <head>
            <meta charset="UTF-8">
            <title>Appellate Argument - Compact</title>
            <style>
                @page {
                    size: A4;
                    margin: 10mm;
                }
                body {
                    font-family: 'Kalpurush', 'Siyam Rupali', 'Nirmala UI', sans-serif;
                    font-size: 11px; /* Mini size */
                    line-height: 1.15;
                    color: #000;
                                  
                h1, h2, h3, h4, h5, h6 {
                    margin-top: 4px;
                    margin-bottom: 2px;
                    line-height: 1.2;
                    color: #000;
                    page-break-after: avoid;
                }
                h1 { font-size: 14px; text-align: center; }
                h2 { font-size: 13px; border-bottom: 1px solid #000; padding-bottom: 2px; }
                h3 { font-size: 12px; }
                h4 { font-size: 11px; }
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
                    page-break-inside: avoid;
                }
                th, td {
                    border: 1px solid #333;
                    padding: 2px 4px;
                    font-size: 10px;
                }
                th { background-color: #f0f0f0; }
                hr {
                    margin: 4px 0;
                    border: 0;
                    border-top: 1px solid #ccc;
                }
                blockquote {
                    border-left: 2px solid #666;
                    padding-left: 6px;
                    margin-left: 0;
                    color: #222;
                    background-color: #fafafa;
                    font-style: italic;
                }
                strong, b { font-weight: bold; }
                
                /* Minimize spacing between sections */
                * + h2, * + h3, * + h4 {
                    margin-top: 6px;
                }
            </style>
        </head>
        <body>
            ${bodyContent}
        </body>
        </html>
        `;

        fs.writeFileSync(htmlPath, htmlTemplate, 'utf8');
        console.log("HTML generated successfully at:", htmlPath);
    } catch (err) {
        console.error("Error generating HTML:", err);
    }
})();
