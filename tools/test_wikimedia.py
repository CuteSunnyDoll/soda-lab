import urllib.request
import urllib.parse
import json

def search_wikimedia(query):
    endpoint = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": query,
        "gsrlimit": 3,
        "prop": "imageinfo",
        "iiprop": "url|size",
        "format": "json"
    }
    url = endpoint + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "ItalianSodaApp/1.0 (matrixkuo@gmail.com)"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get("query", {}).get("pages", {})
            urls = []
            for p_id, p_info in pages.items():
                img_info = p_info.get("imageinfo", [{}])[0]
                if "url" in img_info:
                    urls.append((p_info.get("title"), img_info["url"]))
            return urls
    except Exception as e:
        print(f"Error {query}: {e}")
        return []

print("Blue Curacao:", search_wikimedia("Blue Curacao cocktail glass"))
print("Blood Orange:", search_wikimedia("Blood orange cocktail spritz glass"))
print("Aperol Spritz:", search_wikimedia("Aperol spritz glass"))
print("Watermelon cooler:", search_wikimedia("Watermelon cocktail drink glass"))
print("Mojito:", search_wikimedia("Mojito cocktail highball glass mint"))
