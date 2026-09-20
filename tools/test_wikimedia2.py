import urllib.request
import urllib.parse
import json

def test_wiki():
    endpoint = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": "cocktail",
        "gsrnamespace": "6",
        "gsrlimit": "5",
        "prop": "imageinfo",
        "iiprop": "url|thumburl",
        "iiurlwidth": "800",
        "format": "json"
    }
    url = endpoint + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "ItalianSodaApp/1.0 (test@example.com)"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print(json.dumps(data, indent=2)[:800])

test_wiki()
