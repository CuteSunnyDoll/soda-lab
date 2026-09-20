import urllib.request
import urllib.parse
import json

queries = [
    ("blood_orange", "Blood orange cocktail"),
    ("blood_orange", "Garibaldi cocktail"),
    ("blood_orange", "Spritz Veneziano"),
    ("paloma", "Paloma cocktail"),
    ("grapefruit", "Grapefruit cocktail"),
    ("lavender", "Aviation cocktail"),
    ("lavender", "Lavender cocktail"),
    ("lavender", "Violet cocktail"),
    ("white_peach", "Bellini cocktail"),
    ("white_peach", "Peach iced drink")
]

def search(q):
    endpoint = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {q}",
        "gsrnamespace": "6",
        "gsrlimit": "3",
        "prop": "imageinfo",
        "iiprop": "url",
        "iiurlwidth": "800",
        "format": "json"
    }
    url = endpoint + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "ItalianSodaApp/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get("query", {}).get("pages", {})
            for p_id, p_info in pages.items():
                title = p_info.get("title", "")
                info = p_info.get("imageinfo", [{}])[0]
                thumb = info.get("thumburl") or info.get("url")
                if thumb:
                    print(f"[{q}] {title} -> {thumb}")
    except Exception as e:
        print(f"Error {q}: {e}")

for _, q in queries:
    search(q)
