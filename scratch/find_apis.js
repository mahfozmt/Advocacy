const https = require('https');
https.get('https://bdlawreference.com/main-GFXEJPA7.js', res => {
    let d = '';
    res.on('data', c => d+=c);
    res.on('end', () => {
        const matches = d.match(/https?:\/\/[^\s\"\'\`\\]+/g);
        if(matches) {
            const apis = [...new Set(matches.filter(m => m.includes('api.lcmsbd.com') || m.includes('Api/')))];
            console.log(apis.join('\n'));
        } else {
            console.log('No matches');
        }
        
        // Also look for relative endpoints
        const relMatches = d.match(/[\"\']\/Api\/[^\s\"\'\`\\]+[\"\']/g);
        if(relMatches) {
            console.log('Relative APIs:');
            console.log([...new Set(relMatches)].join('\n'));
        }
    });
});
