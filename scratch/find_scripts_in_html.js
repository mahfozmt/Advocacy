const https = require('https');
https.get('https://bdlawreference.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        // Find all script tags
        const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        const matches = data.match(regex);
        if (matches) {
            console.log(`Found ${matches.length} script tags:`);
            matches.forEach((m, i) => {
                console.log(`\nScript ${i + 1}:`);
                console.log(m.substring(0, 1000));
                if (m.length > 1000) console.log("... [TRUNCATED]");
            });
        } else {
            console.log("No script tags found.");
        }
    });
});
