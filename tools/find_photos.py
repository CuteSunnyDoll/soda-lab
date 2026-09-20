import urllib.request
import urllib.parse
import re

queries = [
    ("electric-blue-curacao", "blue curacao cocktail glass"),
    ("blood-orange-creamsicle", "orange creamsicle float cocktail"),
    ("strawberry-shortcake-cremosa", "strawberry cream soda whipped cream"),
    ("blueberry-cloud-float", "blueberry cocktail purple drink glass"),
    ("sicilian-blood-orange-spritz", "blood orange spritz rosemary cocktail"),
    ("amalfi-lemon-fizz", "lemonade mint ice glass sparkling yellow"),
    ("pink-grapefruit-sea-salt", "grapefruit cocktail salt rim pink"),
    ("bergamot-bitter-spritz", "aperol spritz orange slice glass"),
    ("passion-fruit-mango-sparkler", "passion fruit cocktail seeds glass"),
    ("lime-mint-italian-mojito", "mojito cocktail lime mint highball glass"),
    ("blackberry-lavender-sunrise", "blackberry cocktail dark purple red glass"),
    ("ruby-pomegranate-grenadine", "pomegranate cocktail red seeds glass"),
    ("elderflower-green-grape", "green grape cocktail elderflower drink"),
    ("provence-lavender-lemonade", "lavender lemonade purple drink glass"),
    ("damask-rose-lychee-fizz", "rose cocktail pink petals drink glass"),
    ("basil-watermelon-cooler", "watermelon cocktail basil red drink glass"),
    ("zero-sugar-white-peach", "peach iced sparkling water glass slice")
]

for rec_id, q in queries:
    url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(q + " site:unsplash.com/photos")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            links = re.findall(r'https?://(?:www\.)?unsplash\.com/photos/([a-zA-Z0-9_-]+)', html)
            # Filter out non-photo slugs like 'login', 'search' etc.
            filtered = [l for l in links if not any(x in l for x in ['search', 'tag', 'plus', 'login', 'join', 'license'])]
            print(f"{rec_id}: {filtered[:2]}")
    except Exception as e:
        print(f"{rec_id}: error {e}")
