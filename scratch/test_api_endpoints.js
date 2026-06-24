const https = require('https');

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://bdlawreference.com",
    "referer": "https://bdlawreference.com/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
};

function postRequest(url, data, isJson = false) {
    return new Promise((resolve, reject) => {
        const postData = isJson ? JSON.stringify(data) : data;
        const currentHeaders = { ...headers };
        if (isJson) {
            currentHeaders['content-type'] = 'application/json';
        }
        currentHeaders['Content-Length'] = Buffer.byteLength(postData);

        const options = {
            method: 'POST',
            timeout: 10000,
            headers: currentHeaders
        };

        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Timeout'));
        });

        req.write(postData);
        req.end();
    });
}

async function run() {
    try {
        console.log("1. Testing LoadJudgements with record correction and munsif...");
        const loadRes = await postRequest(
            "https://api.lcmsbd.com/Api/LoadJudgements",
            "page_no=1&getFullData=false&para_id=1&anykey=record%20correction&MoreOne=munsif"
        );
        console.log("Type of LoadJudgements:", typeof loadRes);
        console.log("Keys of LoadJudgements:", Object.keys(loadRes));
        if (loadRes.data) {
            console.log("loadRes.data length:", loadRes.data.length);
            console.log("First element:", JSON.stringify(loadRes.data[0]).substring(0, 500));
        } else {
            console.log("Raw response snippet:", JSON.stringify(loadRes).substring(0, 500));
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

run();
