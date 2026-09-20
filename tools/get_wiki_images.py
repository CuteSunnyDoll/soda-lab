import urllib.request
import urllib.parse
import json

targets = [
    ("mojito", "File:Mojito 001.jpg"),
    ("mojito", "File:Mojito.jpg"),
    ("paloma", "File:Paloma (cocktail).jpg"),
    ("paloma", "File:Paisan Paloma - Maestro Dobel Tequila, Mint, Grapefruit Juice, Hopped Grapefruit Bitters, Soda -happyhour (16994023195).jpg"),
    ("spritz", "File:Aperol Spritz 2014.jpg"),
    ("spritz", "File:Aperol Spritz (17767850239).jpg"),
    ("lavender", "File:Lavender lemonade.jpg"),
    ("blood_orange", "File:Blood orange cocktail.jpg"),
    ("blue_lagoon", "File:BlueLagoon copier.jpg")
]

def get_wiki_image_url(file_title):
    endpoint = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": file_title,
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
            for p_id, p_info in pages.items():
                if int(p_id) > 0:
                    info = p_info.get("imageinfo", [{}])[0]
                    return info.get("thumburl") or info.get("url")
    except Exception as e:
        print(f"Error {file_title}: {e}")
    return None

for label, title in targets:
    url = get_wiki_image_url(title)
    if url:
        print(f"[{label}] {title} -> {url}")
    else:
        print(f"[{label}] {title} -> NOT FOUND")
