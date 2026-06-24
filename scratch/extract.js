const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\70cece2c-1cc3-4386-aefb-cdcbc5032ab7\\.system_generated\\logs\\transcript_full.jsonl')
});

let lastUserMessage = '';

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    if (data.type === 'USER_INPUT') {
      lastUserMessage = data.content;
    }
  } catch (e) {}
});

rl.on('close', () => {
  fs.writeFileSync('F:\\Mahfoz\\Advocacy\\scratch\\last_user_msg.txt', lastUserMessage);
  console.log('Done');
});
