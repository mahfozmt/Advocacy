const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\99cc288f-14b1-44e0-8c71-ee3c52b2d155\\.system_generated\\logs\\transcript.jsonl';
const outputPath = 'f:\\Mahfoz\\Advocacy\\scratch\\step_630.txt';

const readInterface = readline.createInterface({
    input: fs.createReadStream(transcriptPath, { encoding: 'utf8' }),
    output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {
    try {
        const data = JSON.parse(line);
        if (data.step_index === 630) {
            fs.writeFileSync(outputPath, data.content || '', 'utf8');
            console.log(`Successfully wrote Step 630 to scratch/step_630.txt. Length: ${(data.content || '').length} characters.`);
        }
    } catch (e) {
        console.error(e);
    }
});
