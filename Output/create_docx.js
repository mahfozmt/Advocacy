const fs = require('fs');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } = docx;

function parseMarkdownToDocx(inputFile, outputFile) {
    const markdown = fs.readFileSync(inputFile, 'utf-8');
    const lines = markdown.split(/\r?\n/);
    
    const children = [];
    let inTable = false;
    let tableRows = [];
    const defaultFont = "Kalpurush";

    function processText(text, opts = {}) {
        // Handle bold: **text**
        const parts = text.split(/(\*\*.*?\*\*)/g);
        const runs = [];
        parts.forEach(part => {
            if (part.startsWith('**') && part.endsWith('**')) {
                runs.push(new TextRun({ text: part.slice(2, -2), bold: true, italics: opts.italics, font: defaultFont, size: 20 }));
            } else if (part) {
                runs.push(new TextRun({ text: part, italics: opts.italics, font: defaultFont, size: 20 }));
            }
        });
        return runs;
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        if (line.startsWith('|')) {
            if (!inTable) inTable = true;
            if (!line.includes('---')) {
                const cells = line.split('|').filter((_, index, arr) => index > 0 && index < arr.length - 1).map(c => c.trim());
                tableRows.push(cells);
            }
            continue;
        } else {
            if (inTable) {
                const rows = tableRows.map(rowCells => {
                    return new TableRow({
                        children: rowCells.map(cellText => {
                            return new TableCell({
                                children: [new Paragraph({ children: processText(cellText) })],
                            });
                        })
                    });
                });
                children.push(new Table({
                    rows: rows,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                }));
                inTable = false;
                tableRows = [];
            }
        }

        if (line.startsWith('---')) {
            children.push(new Paragraph({ text: "--------------------------------------------------", alignment: AlignmentType.CENTER }));
        } else if (line.startsWith('# ')) {
            children.push(new Paragraph({ children: processText(line.substring(2)), heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }));
        } else if (line.startsWith('## ')) {
            children.push(new Paragraph({ children: processText(line.substring(3)), heading: HeadingLevel.HEADING_2 }));
        } else if (line.startsWith('### ')) {
            children.push(new Paragraph({ children: processText(line.substring(4)), heading: HeadingLevel.HEADING_3 }));
        } else if (line.startsWith('> ')) {
            children.push(new Paragraph({ children: processText(line.substring(2), {italics: true}), indent: { left: 720 } }));
        } else if (line.startsWith('* ') || line.startsWith('- ')) {
            children.push(new Paragraph({ children: processText(line.substring(2)), bullet: { level: 0 } }));
        } else if (line.trim().length > 0) {
            children.push(new Paragraph({ children: processText(line) }));
        } else {
            children.push(new Paragraph({ children: [new TextRun({text: "", font: defaultFont})] }));
        }
    }

    if (inTable) {
        const rows = tableRows.map(rowCells => {
            return new TableRow({
                children: rowCells.map(cellText => {
                    return new TableCell({
                        children: [new Paragraph({ children: processText(cellText) })],
                    });
                })
            });
        });
        children.push(new Table({
            rows: rows,
            width: { size: 100, type: WidthType.PERCENTAGE },
        }));
    }

    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: {
                        font: defaultFont,
                        size: 20,
                    },
                    paragraph: {
                        spacing: {
                            line: 240, // 240 = 1.0 (single) line spacing
                            before: 0,
                            after: 0
                        }
                    }
                }
            }
        },
        sections: [{
            properties: {
                page: {
                    size: {
                        width: 12240, // 8.5 inches in twips (Legal size)
                        height: 20160 // 14 inches in twips (Legal size)
                    },
                    margin: {
                        top: 720, // 0.5 inch narrow margin
                        right: 720,
                        bottom: 720,
                        left: 720
                    }
                }
            },
            children: children
        }],
    });

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(outputFile, buffer);
        console.log("Document saved successfully: " + outputFile);
    });
}

parseMarkdownToDocx('f:/Mahfoz/Advocacy/Output/appellate_argument_v48.1_Brief.md', 'f:/Mahfoz/Advocacy/Output/appellate_argument_v48.1_Brief.docx');
parseMarkdownToDocx('f:/Mahfoz/Advocacy/Output/appellate_argument_v48.1_Summary.md', 'f:/Mahfoz/Advocacy/Output/appellate_argument_v48.1_Summary.docx');
