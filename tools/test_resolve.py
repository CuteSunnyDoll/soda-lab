import urllib.request
import re

url = 'https://unsplash.com/photos/a-blue-cocktail-with-a-slice-of-lemon-on-the-rim-N5L8w9x0y1z'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        print('Status:', resp.status)
        html = resp.read().decode('utf-8', errors='ignore')
        imgs = re.findall(r'https://images\.unsplash\.com/photo-[^\"\'\?\s]+', html)
        print('Found images:', imgs[:5])
except Exception as e:
    print('Err:', e)
