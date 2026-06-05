const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\99cc288f-14b1-44e0-8c71-ee3c52b2d155\\.system_generated\\logs\\transcript.jsonl';
const outputPath = 'f:\\Mahfoz\\Advocacy\\scratch\\user_messages.txt';

const readInterface = readline.createInterface({
    input: fs.createReadStream(transcriptPath, { encoding: 'utf8' }),
    output: process.stdout,
    console: false
});

const outStream = fs.createWriteStream(outputPath, { encoding: 'utf8' });

readInterface.on('line', function(line) {
    try {
        const data = JSON.parse(line);
        if (data.source === 'USER_EXPLICIT' || data.type === 'USER_INPUT') {
            outStream.write(`--- STEP ${data.step_index} ---\n`);
            outStream.write(data.content || '');
            outStream.write('\n\n');
        }
    } catch (e) {
        // ignore errors
    }
});

readInterface.on('close', () => {
    outStream.end();
    console.log("Done! Extracted user messages to scratch/user_messages.txt");
});
