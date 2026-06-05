const fs = require('fs');

const content = fs.readFileSync('f:\\Mahfoz\\Advocacy\\scratch\\user_messages.txt', 'utf8');
const steps = content.split('--- STEP ');

console.log("Total steps found:", steps.length);

steps.forEach(step => {
    if (!step.trim()) return;
    const lines = step.split('\n');
    const header = lines[0];
    const rest = lines.slice(1).join('\n');
    console.log(`Step ${header.trim()} - Length: ${rest.length} chars. Preview: ${rest.substring(0, 150).replace(/\s+/g, ' ')}...`);
});
