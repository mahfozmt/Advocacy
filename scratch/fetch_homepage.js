const https = require('https');
https.get('https://bdlawreference.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    console.log("Status:", res.statusCode);
    console.log("Headers:", res.headers);
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log("Length:", data.length);
        console.log("HTML Start:\n", data.substring(0, 1500));
    });
});
