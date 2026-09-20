import urllib.request
import urllib.parse
import json

queries = {
    "classic-vanilla-cremosa": ["Ice cream soda glass", "cream soda glass float"],
    "peaches-and-cream": ["Peach cocktail glass", "Bellini cocktail glass", "peach drink"],
    "raspberry-velvet-cremosa": ["Raspberry cocktail glass", "Raspberry drink"],
    "blood-orange-creamsicle": ["Blood orange cocktail", "Orange creamsicle drink"],
    "strawberry-shortcake-cremosa": ["Strawberry cocktail glass", "Strawberry drink cream"],
    "blueberry-cloud-float": ["Blueberry cocktail glass", "Blueberry drink"],
    "sicilian-blood-orange-spritz": ["Blood orange cocktail glass", "Blood orange spritz"],
    "amalfi-lemon-fizz": ["Limoncello cocktail", "Lemonade mint glass"],
    "pink-grapefruit-sea-salt": ["Paloma cocktail glass", "Grapefruit cocktail"],
    "bergamot-bitter-spritz": ["Aperol Spritz glass", "Campari spritz"],
    "electric-blue-curacao": ["Blue Curacao cocktail glass", "Blue lagoon cocktail"],
    "passion-fruit-mango-sparkler": ["Passion fruit cocktail glass", "Passion fruit drink"],
    "lime-mint-italian-mojito": ["Mojito cocktail glass", "Virgin mojito"],
    "blackberry-lavender-sunrise": ["Blackberry cocktail glass", "Tequila sunrise cocktail glass"],
    "ruby-pomegranate-grenadine": ["Pomegranate cocktail glass", "Shirley Temple drink"],
    "elderflower-green-grape": ["Hugo cocktail glass", "Elderflower cocktail"],
    "provence-lavender-lemonade": ["Lavender cocktail glass", "Lavender drink"],
    "damask-rose-lychee-fizz": ["Rose cocktail glass", "Pink cocktail rose"],
    "basil-watermelon-cooler": ["Watermelon cocktail glass", "Watermelon drink"],
    "zero-sugar-white-peach": ["Peach iced tea glass", "Peach sparkling water"]
}

def search_wikimedia(query):
    endpoint = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": query,
        "gsrnamespace": "6",
        "gsrlimit": "3",
        "prop": "imageinfo",
        "iiprop": "url",
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
                thumb = img_info.get("thumburl") or img_info.get("url")
                if thumb and any(thumb.lower().endswith(ext) or ext in thumb.lower() for ext in ['.jpg', '.jpeg', '.png']):
                    results.append((title, thumb))
            return results
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

for key, q_list in queries.items():
    found = False
    for q in q_list:
        res = search_wikimedia(q)
        if res:
            print(f"[{key}] -> Found with '{q}': {res[0][0]}")
            print(f"    URL: {res[0][1]}")
            found = True
            break
    if not found:
        print(f"[{key}] -> NOT FOUND")
