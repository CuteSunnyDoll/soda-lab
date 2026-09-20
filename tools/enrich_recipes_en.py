import json

with open('src/data/recipes.json', 'r', encoding='utf-8') as f:
    recipes = json.load(f)

en_enrichments = {
    "classic-vanilla-cremosa": {
        "enStyle": "Torani S.F. Original Style",
        "enDescription": "The original 1925 San Francisco North Beach recipe. Rich Madagascar vanilla, crisp effervescent soda, and smooth heavy cream tumbling through crushed ice, topped with whipped cream and a ruby Maraschino cherry.",
        "enSecretTips": [
            "Temperature is the soul of Italian soda: sparkling water should be chilled near 0°C to maximize carbonation fizz.",
            "Choose Half-and-Half or 36% heavy cream for a velvety marbled ribbon that floats effortlessly."
        ],
        "enSteps": [
            {"enTitle": "Pump Vanilla Syrup", "enInstruction": "Pump 4 pumps (approx. 30ml / 1 oz) of Torani French Vanilla Syrup into the bottom of a 16oz highball glass.", "enTip": "Syrup first, then ice, ensuring even dissolution without sticking to ice surfaces."},
            {"enTitle": "Fill with Pebble Ice", "enInstruction": "Fill glass 3/4 full with pebble or crushed ice, creating a thermal buffer barrier.", "enTip": "Pebble ice creates a stunning marbled suspension with the cream."},
            {"enTitle": "Slowly Pour Sparkling Water", "enInstruction": "Tilt glass 45° and gently pour chilled club soda down the inner wall until 1 inch from the rim.", "enTip": "Pour gently to retain over 90% of the carbonation bubbles!"},
            {"enTitle": "Cascade Heavy Cream", "enInstruction": "Place the back of a bar spoon against the top ice and slowly drizzle 30ml heavy cream over the spoon.", "enTip": "Vanilla syrup is non-acidic and blends smoothly with dairy without curdling."},
            {"enTitle": "Crown with Whipped Cream", "enInstruction": "Top with a swirl of whipped cream and a Maraschino cherry in the center. Enjoy with a straw!", "enTip": "Stir gently with a straw before drinking to blend bubbly fizz and rich cream."}
        ]
    },
    "peaches-and-cream": {
        "enStyle": "Classic Summer Fruit Cremosa",
        "enDescription": "A dream encounter of juicy summer white peach and thick cream. Pastel blush pink meets cascading cream clouds, opening with crisp bubbly peach sweetness and finishing with a velvety vanilla milk finish.",
        "enSecretTips": [
            "Curdle Prevention: Peach syrup contains mild fruit acidity. Always use heavy cream (30%+ fat) and stir syrup with soda before adding cream to prevent curdling!"
        ],
        "enSteps": [
            {"enTitle": "Garnish Glass & Add Syrup", "enInstruction": "Press 2 fresh peach slices against the inside of the glass and add 4 pumps peach syrup to the bottom.", "enTip": "Pressed fruit creates an authentic café aesthetic."},
            {"enTitle": "Pack with Crushed Ice", "enInstruction": "Gently pack the glass 3/4 full with crushed ice to secure the fruit slices.", "enTip": ""},
            {"enTitle": "Add Soda & Stir Base", "enInstruction": "Pour chilled sparkling water to 80% full. Use a bar spoon to stir the bottom syrup into the soda.", "enTip": "Diluting syrup with soda reduces acidity and prevents cream from curdling!"},
            {"enTitle": "Float Heavy Cream", "enInstruction": "Slowly drizzle 30ml heavy cream over the top ice, creating a gorgeous sunset gradient.", "enTip": ""}
        ]
    },
    "raspberry-velvet-cremosa": {
        "enStyle": "Classic Ruby Berry Cremosa",
        "enDescription": "Tart, aromatic wild red raspberries meet rich vanilla cream. Vibrant ruby red turns into velvet ribbons as pure cream cascades down, delivering bright fruitiness that never feels heavy.",
        "enSecretTips": [
            "Pro Barista Secret: Adding 1 pump of vanilla syrup softens the sharp berry acidity and wraps the palate in smooth sweetness."
        ],
        "enSteps": [
            {"enTitle": "Dual-Syrup Golden Ratio", "enInstruction": "Pump 3 pumps Raspberry syrup + 1 pump Vanilla syrup into the glass.", "enTip": ""},
            {"enTitle": "Ice & Sparkling Soda", "enInstruction": "Fill with crushed ice, then gently pour cold club soda along the glass wall to 80% full.", "enTip": ""},
            {"enTitle": "Mix Base Soda", "enInstruction": "Gently pull the bar spoon up and down twice to blend the syrup into a translucent ruby base.", "enTip": ""},
            {"enTitle": "Cream Waterfall", "enInstruction": "Pour 35ml half-and-half directly onto the top ice, watching the marble ribbons form.", "enTip": ""},
            {"enTitle": "Garnish with Fresh Berries", "enInstruction": "Top with 3 fresh raspberries and a fresh mint sprig.", "enTip": ""}
        ]
    },
    "blood-orange-creamsicle": {
        "enStyle": "Sicilian Citrus Creamsicle",
        "enDescription": "The Italian Soda rendition of the iconic orange creamsicle! Energetic Sicilian blood orange citrus aromas paired with a thick vanilla cream float—tastes like a bite of frozen summer citrus gelato.",
        "enSecretTips": [
            "Expressing orange peel over the rim releases natural limonene citrus oils, giving an instant burst of Mediterranean orchard aroma on your first sip."
        ],
        "enSteps": [
            {"enTitle": "Citrus & Vanilla Base", "enInstruction": "Add 3.5 pumps Blood Orange syrup and 0.5 pump Vanilla syrup. Express fresh orange peel over the glass rim.", "enTip": ""},
            {"enTitle": "Ice & Carbonated Water", "enInstruction": "Fill glass with ice, tilt and pour cold sparkling water, stir lightly until golden orange.", "enTip": ""},
            {"enTitle": "Float Cream Layer", "enInstruction": "Drizzle 30ml cream over the back of a bar spoon for a two-tone cloud float.", "enTip": ""},
            {"enTitle": "Slot Fresh Orange Wheel", "enInstruction": "Cut a notch in a fresh blood orange wheel and slot it onto the glass rim.", "enTip": ""}
        ]
    },
    "strawberry-shortcake-cremosa": {
        "enStyle": "Dessert-Style Italian Soda",
        "enDescription": "Deconstructed strawberry shortcake in a bubbly glass! Sweet ripe strawberry syrup with a touch of vanilla warmth, topped with a tall snowy peak of whipped cream and fresh strawberries.",
        "enSecretTips": [
            "For a buttery bakery aroma, add a half pump of Torani English Toffee or Shortbread syrup!"
        ],
        "enSteps": [
            {"enTitle": "Strawberry & Vanilla Syrup", "enInstruction": "Pump 3 pumps Strawberry syrup and 1 pump Vanilla syrup into the glass.", "enTip": ""},
            {"enTitle": "Ice, Soda & Stir", "enInstruction": "Fill with crushed ice, pour cold soda, and stir until pastel pink.", "enTip": ""},
            {"enTitle": "Cream & Whipped Peak", "enInstruction": "Pour 30ml cream, then top with a generous swirl of whipped cream and half a fresh strawberry.", "enTip": ""}
        ]
    },
    "blueberry-cloud-float": {
        "enStyle": "Nordic Berry Dream Float",
        "enDescription": "Deep violet blueberries and earthy blackcurrant notes swirling with velvety white cream like a cosmic nebula. Crisp carbonation releases bursts of forest berry sweetness.",
        "enSecretTips": [
            "Frozen blueberries work as natural ice balls that chill the drink without diluting flavor as they thaw."
        ],
        "enSteps": [
            {"enTitle": "Blueberry Syrup Base", "enInstruction": "Pump 4 pumps concentrated blueberry syrup into the highball glass.", "enTip": ""},
            {"enTitle": "Layer Ice & Blueberries", "enInstruction": "Add half a cup of ice, drop in 4 fresh blueberries, then fill to the top with ice.", "enTip": ""},
            {"enTitle": "Pour Sparkling Water", "enInstruction": "Pour chilled sparkling water to 80% full and gently stir to create an amethyst purple base.", "enTip": ""},
            {"enTitle": "Pour Cream Cloud", "enInstruction": "Pour 30ml heavy cream on top of the floating ice and watch the purple-white cloud melt downwards.", "enTip": ""}
        ]
    },
    "sicilian-blood-orange-spritz": {
        "enStyle": "Sicilian Sun-Drenched Botanical",
        "enDescription": "The spirit of Sicily under Mediterranean sun! A zero-alcohol Italian Spritz combining bold blood orange citrus with aromatic pine notes of fresh rosemary and sea salt microcrystals.",
        "enSecretTips": [
            "A pinch of sea salt (0.5g) suppresses citrus bitterness and magnifies sweet fruit notes on the palate—a southern Italian mixology secret."
        ],
        "enSteps": [
            {"enTitle": "Slap Rosemary", "enInstruction": "Slap a fresh rosemary sprig firmly between your palms to rupture essential oil glands.", "enTip": "Slapping releases intense aroma without bruising the stem."},
            {"enTitle": "Syrup & Fresh Lemon", "enInstruction": "Add 4 pumps blood orange syrup and 15ml fresh lemon juice into the glass.", "enTip": ""},
            {"enTitle": "Ice & Insert Rosemary", "enInstruction": "Fill with ice cubes and stand the rosemary sprig upright against the glass wall.", "enTip": ""},
            {"enTitle": "Pour Soda & Add Sea Salt", "enInstruction": "Top with chilled San Pellegrino sparkling water, sprinkle sea salt on top, and give one gentle stir.", "enTip": ""}
        ]
    },
    "amalfi-lemon-fizz": {
        "enStyle": "Amalfi Coastal Limoncello Style",
        "enDescription": "Breezy sea winds along the Amalfi lemon cliffs! A non-alcoholic Italian soda capturing the soul of Limoncello. High-voltage lemon zest, real lemon juice, and effervescent bubbles.",
        "enSecretTips": [
            "Yellow Amalfi or Eureka lemons have sweeter aromatic oils than green limes. Press only the outer peel to avoid bitter white pith."
        ],
        "enSteps": [
            {"enTitle": "Muddle Lemon & Syrup", "enInstruction": "Add 3 pumps lemon syrup, 20ml fresh lemon juice, and muddle a lemon wheel lightly.", "enTip": ""},
            {"enTitle": "Ice & Sparkling Soda", "enInstruction": "Fill with pure ice cubes and slowly pour chilled sparkling water to the top.", "enTip": ""},
            {"enTitle": "Garnish with Mint & Lemon", "enInstruction": "Crown with another fresh lemon wheel and a vibrant sprig of fresh mint.", "enTip": ""}
        ]
    },
    "pink-grapefruit-sea-salt": {
        "enStyle": "Modern Mediterranean Paloma Style",
        "enDescription": "Ruby grapefruit's signature blush hue and aromatic bittersweetness, accented with a fine sea-salt half-rim that locks in fruit sweetness. Crisp, sophisticated, and revitalizing.",
        "enSecretTips": [
            "Sodium in sea salt temporarily desensitizes bitter receptors on the tongue, allowing pure grapefruit sweetness to shine."
        ],
        "enSteps": [
            {"enTitle": "Half-Rim Sea Salt", "enInstruction": "Moisten half of the glass rim with a grapefruit slice, then dip into coarse sea salt.", "enTip": "A half-rim lets the drinker choose salty or unsalted sips."},
            {"enTitle": "Grapefruit Base", "enInstruction": "Add 4 pumps red grapefruit syrup and 30ml fresh grapefruit juice.", "enTip": ""},
            {"enTitle": "Ice, Soda & Stir", "enInstruction": "Fill with ice, gently pour cold sparkling water to the top, and stir twice.", "enTip": ""}
        ]
    },
    "bergamot-bitter-spritz": {
        "enStyle": "Italian Aperitivo Classic (Sanbittèr)",
        "enDescription": "Replicating Italy's legendary ruby aperitivo soda! Bergamot citrus, gentian root, and bittersweet herbs over clear rocks with an orange twist and green olive—an adult Italian ritual.",
        "enSecretTips": [
            "Bittersweet balance is the crown jewel of Italian bar culture. Pair with roasted nuts or prosciutto for a true Milanese aperitivo."
        ],
        "enSteps": [
            {"enTitle": "Bittersweet Base", "enInstruction": "Pump 4 pumps Italian bitter or bergamot syrup into the glass.", "enTip": ""},
            {"enTitle": "Rocks Ice & Soda", "enInstruction": "Add large clear ice cubes, pour cold sparkling mineral water, and stir gently.", "enTip": ""},
            {"enTitle": "Orange Twist & Olive", "enInstruction": "Twist orange peel over the glass to express oils, drop inside, and garnish with a green Cerignola olive on a cocktail pick.", "enTip": ""}
        ]
    },
    "electric-blue-curacao": {
        "enStyle": "Caribbean Ocean Electric Fizz",
        "enDescription": "A non-alcoholic Ocean Star! Striking Caribbean cyan blue, sweet citrus orange peel aroma, crisp lime acidity, and dancing bubbles reflecting neon hues through crushed ice.",
        "enSecretTips": [
            "If sipping with a straw, the top is crisp lime and bottom is sweet orange. Stirring creates a uniform tropical ocean blue."
        ],
        "enSteps": [
            {"enTitle": "Blue Curacao Base", "enInstruction": "Pump 3.5 pumps Blue Curaçao syrup and 15ml fresh lime juice into the glass.", "enTip": ""},
            {"enTitle": "Lime Wheels & Crushed Ice", "enInstruction": "Press lime wheels against the inside wall and pack with crushed ice to secure them.", "enTip": ""},
            {"enTitle": "Slow Pour for Gradient", "enInstruction": "Slowly pour cold soda down the glass wall for a deep blue to icy cyan gradient.", "enTip": ""},
            {"enTitle": "Garnish with Cherry", "enInstruction": "Place a glossy red Maraschino cherry on top for an eye-catching blue-red contrast.", "enTip": ""}
        ]
    },
    "passion-fruit-mango-sparkler": {
        "enStyle": "Tropical Island Passion Sparkler",
        "enDescription": "A power duo of ripe mango sweetness and tangy passion fruit! Every sip brings explosive tropical perfume and crunchy edible seeds floating in vibrant bubbles.",
        "enSecretTips": [
            "Adding a spoonful of real seeded passion fruit pulp dramatically boosts authentic handcrafted mouthfeel!"
        ],
        "enSteps": [
            {"enTitle": "Tropical Fruit Puree Base", "enInstruction": "Add 2.5 pumps Passion Fruit syrup, 1.5 pumps Mango syrup, and 1 tbsp seeded passion fruit pulp.", "enTip": ""},
            {"enTitle": "Ice, Soda & Stir", "enInstruction": "Fill with crushed ice, slowly pour sparkling water, and stir to distribute the black seeds evenly.", "enTip": ""}
        ]
    },
    "lime-mint-italian-mojito": {
        "enStyle": "Classic Mint & Lime Virgin Refresher",
        "enDescription": "The refreshing Italian version of a virgin mojito! Spearmint coolness and fresh lime oils crushed in sparkling soda, washing away heat with crisp effervescence.",
        "enSecretTips": [
            "Never violently shred mint leaves! Press gently to extract aromatics; tearing releases bitter chlorophyll."
        ],
        "enSteps": [
            {"enTitle": "Gently Press Mint & Lime", "enInstruction": "Place lime wedges and mint leaves in glass. Press gently 4-5 times with a wooden muddler.", "enTip": ""},
            {"enTitle": "Syrup & Crushed Ice", "enInstruction": "Add 3.5 pumps lime or cane syrup and pack glass with crushed ice.", "enTip": ""},
            {"enTitle": "Pour Soda & Lift Stir", "enInstruction": "Pour cold soda and lift the bar spoon from bottom to top 3 times to distribute mint evenly.", "enTip": ""}
        ]
    },
    "blackberry-lavender-sunrise": {
        "enStyle": "Twilight Sunset Two-Tone Gradient",
        "enDescription": "A sunrise in a glass! Deep, wild purple blackberry syrup anchored at the bottom with bright golden fresh orange juice floating on top, divided by glistening crushed ice.",
        "enSecretTips": [
            "Density physics: High-sugar syrup has higher specific gravity than soda, while fresh orange juice floats naturally over dense crushed ice."
        ],
        "enSteps": [
            {"enTitle": "Dense Blackberry Base", "enInstruction": "Pump 3 pumps blackberry syrup directly into the bottom.", "enTip": ""},
            {"enTitle": "Pack Crushed Ice", "enInstruction": "Fill with crushed ice right to the rim, creating a physical density barrier.", "enTip": ""},
            {"enTitle": "Pour Soda to 70% Full", "enInstruction": "Gently pour sparkling water down the wall and lightly stir only the bottom half.", "enTip": ""},
            {"enTitle": "Float Fresh Orange Juice", "enInstruction": "Drizzle 60ml fresh orange juice over the back of a bar spoon onto the top ice for a dual-tone sunrise!", "enTip": ""}
        ]
    },
    "ruby-pomegranate-grenadine": {
        "enStyle": "Classic Grenadine Ruby Spritz",
        "enDescription": "Pure vintage elegance. Glowing like cut rubies in crystal, rich pomegranate grenadine meets lively soda bubbles and fresh lime for a crisp, timeless thirst-quencher.",
        "enSecretTips": [
            "Real pomegranate syrup offers deeper, complex fruit tannins than artificial red sugar dye."
        ],
        "enSteps": [
            {"enTitle": "Pomegranate & Lime", "enInstruction": "Add 4 pumps pomegranate syrup and 10ml fresh lime juice.", "enTip": ""},
            {"enTitle": "Ice, Soda & Stir", "enInstruction": "Fill with ice cubes, pour cold sparkling water, and stir until brilliant crystal ruby red.", "enTip": ""}
        ]
    },
    "elderflower-green-grape": {
        "enStyle": "European Bistro Botanical",
        "enDescription": "The star botanical spritz of European bistros. French elderflower brings delicate notes of lychee and muscat grape, paired with crisp halved green seedless grapes.",
        "enSecretTips": [
            "Elderflower aroma compounds are delicate and volatile. The colder your sparkling water, the longer the floral bouquet lingers."
        ],
        "enSteps": [
            {"enTitle": "Elderflower Floral Base", "enInstruction": "Add 3.5 pumps elderflower syrup and 20ml white grape or lime juice.", "enTip": ""},
            {"enTitle": "Halved Grapes & Ice", "enInstruction": "Add halved seedless green grapes, then fill glass with crystal clear ice.", "enTip": ""},
            {"enTitle": "Pour Soda & Garnish", "enInstruction": "Pour cold San Pellegrino sparkling water, lift bar spoon gently, and crown with fresh mint.", "enTip": ""}
        ]
    },
    "provence-lavender-lemonade": {
        "enStyle": "South of France Lavender Estate",
        "enDescription": "A calming pastel violet wonder. Genuine Provence lavender syrup releases soothing floral aromas, balanced by the bright tartness of freshly squeezed lemon juice.",
        "enSecretTips": [
            "Lavender is potent: 3 pumps (approx. 22ml) is the golden sweet spot. Fresh lemon juice harmonizes floral notes cleanly."
        ],
        "enSteps": [
            {"enTitle": "Lavender & Fresh Lemon", "enInstruction": "Add 3 pumps lavender syrup and 20ml fresh lemon juice.", "enTip": ""},
            {"enTitle": "Ice & Chilled Soda", "enInstruction": "Fill with ice, slowly pour cold sparkling water, and stir until glowing pastel purple.", "enTip": ""},
            {"enTitle": "Floral Garnish", "enInstruction": "Garnish with a lemon wheel and a sprig of dried French lavender.", "enTip": ""}
        ]
    },
    "damask-rose-lychee-fizz": {
        "enStyle": "Romantic Royal Garden Floral",
        "enDescription": "The timeless Ispahan floral harmony! Noble Damask rose petal aromas blended with succulent white lychee juice, floating with tender lychee fruit and dried rose petals.",
        "enSecretTips": [
            "Rose and lychee share identical aroma aromatic hydrocarbons, making them a match made in heaven."
        ],
        "enSteps": [
            {"enTitle": "Rose, Lychee & Fruit", "enInstruction": "Add 2 pumps rose syrup, 2 pumps lychee syrup, and drop in 2 peeled whole white lychees.", "enTip": ""},
            {"enTitle": "Ice & Sparkling Soda", "enInstruction": "Fill with ice, pour cold sparkling water, and stir until translucent cherry blossom pink.", "enTip": ""},
            {"enTitle": "Scatter Rose Petals", "enInstruction": "Gently scatter edible dried organic rose petals across the top ice.", "enTip": ""}
        ]
    },
    "basil-watermelon-cooler": {
        "enStyle": "Tuscan Farmhouse Summer Cooler",
        "enDescription": "A summer picnic revelation from Tuscany! Crisp juicy watermelon meets sweet Italian basil with subtle clove and pepper notes—sweet, savory, and cooling.",
        "enSecretTips": [
            "Always use Italian Sweet Basil (not Thai holy basil); sweet basil is tender and complements sweet watermelon seamlessly."
        ],
        "enSteps": [
            {"enTitle": "Slap Fresh Sweet Basil", "enInstruction": "Slap 4 sweet basil leaves between palms to awaken aromatic oils, then place in glass.", "enTip": ""},
            {"enTitle": "Syrup & Lime Juice", "enInstruction": "Add 3.5 pumps watermelon syrup and 15ml lime juice. Press basil lightly with spoon.", "enTip": ""},
            {"enTitle": "Ice, Soda & Stir", "enInstruction": "Fill with ice, pour cold sparkling water, stir, and garnish with a basil leaf tip.", "enTip": ""}
        ]
    },
    "zero-sugar-white-peach": {
        "enStyle": "Keto Low-Carb Zero-Sugar",
        "enDescription": "Pure indulgence with zero guilt! Crafted with Torani Sugar-Free White Peach syrup (0 calories, 0 carbs), delivering juicy peach aroma and sparkling fizz with under 5 calories per glass.",
        "enSecretTips": [
            "Sucralose sweetener causes zero blood sugar spikes, tastes crisp and sweet, and has no bitter aftertaste."
        ],
        "enSteps": [
            {"enTitle": "Zero-Calorie Peach Syrup", "enInstruction": "Pump 4 pumps Torani Sugar-Free White Peach syrup and 10ml fresh lime juice.", "enTip": ""},
            {"enTitle": "Ice, Soda & Enjoy", "enInstruction": "Fill with crushed ice, pour chilled sparkling water, stir well, and enjoy under 5 calories!", "enTip": ""}
        ]
    }
}

for r in recipes:
    rid = r['id']
    if rid in en_enrichments:
        data = en_enrichments[rid]
        r['enStyle'] = data['enStyle']
        r['enDescription'] = data['enDescription']
        r['enSecretTips'] = data['enSecretTips']
        for i, step in enumerate(r['steps']):
            if i < len(data['enSteps']):
                s = data['enSteps'][i]
                step['enTitle'] = s['enTitle']
                step['enInstruction'] = s['enInstruction']
                step['enTip'] = s['enTip']

with open('src/data/recipes.json', 'w', encoding='utf-8') as f:
    json.dump(recipes, f, ensure_ascii=False, indent=2)

print("Enrichment complete for all 20 recipes!")
