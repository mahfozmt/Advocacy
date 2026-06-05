const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Intercept network requests
    page.on('request', request => {
        const url = request.url();
        if (url.includes('api.lcmsbd.com')) {
            console.log('API Request:', request.method(), url);
            console.log('Post Data:', request.postData());
        }
    });

    page.on('response', async response => {
        const url = response.url();
        if (url.includes('api.lcmsbd.com')) {
            console.log('API Response:', url, response.status());
            try {
                const text = await response.text();
                console.log('Response Length:', text.length);
                if(text.includes('full_judgment')) {
                    console.log('Contains full_judgment property');
                }
            } catch (e) {
                console.log('Could not read response');
            }
        }
    });

    console.log('Navigating to case 18103...');
    await page.goto('https://bdlawreference.com/judgement/18103', { waitUntil: 'networkidle2' });
    
    // Evaluate page content
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    if(bodyHTML.includes('full_judgment') || bodyHTML.length > 10000) {
        console.log('Page has a lot of content');
    }
    console.log('Done.');
    await browser.close();
})();
