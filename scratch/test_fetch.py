import requests
import json
import os

url = "https://api.lcmsbd.com/Api/LoadJudgements"
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://bdlawreference.com",
    "referer": "https://bdlawreference.com/",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36"
}
data = {
    "page_no": 1,
    "getFullData": "false",
    "para_id": 1,
    "anykey": "patta"
}

print("Fetching sample data...")
response = requests.post(url, headers=headers, data=data)

output_path = r"F:\Mahfoz\Advocacy\scratch\sample_judgement.json"
with open(output_path, "w", encoding="utf-8") as f:
    try:
        json.dump(response.json(), f, ensure_ascii=False, indent=2)
        print(f"Success! Data written to {output_path}")
    except Exception as e:
        f.write(response.text)
        print(f"Failed to parse JSON. Raw text written to {output_path}. Error: {e}")
