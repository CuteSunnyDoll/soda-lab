import urllib.request
import urllib.parse
import json

def search_wikimedia_bitmap(query):
    endpoint = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrnamespace": "6",
        "gsrlimit": "5",
        "prop": "imageinfo",
        "iiprop": "url|mime",
        "iiurlwidth": "800",
        "format": "json"
    }
    url = endpoint + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "ItalianSodaApp/1.0 (contact@example.com)"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get("query", {}).get("pages", {})
            results = []
            for p_id, p_info in pages.items():
                title = p_info.get("title", "")
                img_info = p_info.get("imageinfo", [{}])[0]
                mime = img_info.get("mime", "")
                thumb = img_info.get("thumburl") or img_info.get("url")
                if "image" in mime:
                    results.append((title, thumb))
            return results
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

tests = [
    "Blue Curacao cocktail",
    "Blue Lagoon cocktail",
    "Paloma cocktail grapefruit",
    "Aperol Spritz",
    "Limoncello spritz",
    "Watermelon cocktail glass",
    "Blackberry cocktail",
    "Mojito glass mint",
    "Strawberry cocktail glass",
    "Blueberry drink glass",
    "Lavender cocktail",
    "Rose cocktail pink",
    "Hugo cocktail elderflower",
    "Pomegranate cocktail",
    "Peach cocktail Bellini"
]

for t in tests:
    res = search_wikimedia_bitmap(t)
    if res:
        print(f"{t}: {res[0][0]}")
        print(f"   -> {res[0][1]}")
    else:
        print(f"{t}: NONE")
