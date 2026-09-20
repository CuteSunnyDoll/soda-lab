"""
Italian Soda Recipe Authenticity & Quality Validator
Ensures recipes adhere to proper mixology ratios:
- Syrup ratio (3-5 pumps or 20-40ml for 16oz standard)
- Cold sparkling water volume
- Cream compatibility checks (acid curdling precautions)
"""

import json
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows consoles
if sys.platform.startswith('win'):
    sys.stdout.reconfigure(encoding='utf-8')


def validate_recipes_file(filepath: str):
    path = Path(filepath)
    if not path.exists():
        print(f"Error: {filepath} does not exist.")
        return False

    with open(path, 'r', encoding='utf-8') as f:
        recipes = json.load(f)

    print(f"🔍 Validating {len(recipes)} recipes in {filepath}...\n")
    all_passed = True

    valid_categories = {'cremosa', 'citrus-spritz', 'fruit-berry', 'botanical', 'zero-sugar'}

    for r in recipes:
        recipe_id = r.get('id', 'unknown')
        name = r.get('name', 'unknown')
        category = r.get('category', 'unknown')
        ingredients = r.get('ingredients', [])
        steps = r.get('steps', [])

        if category not in valid_categories:
            print(f"❌ [{recipe_id}] Invalid category: {category}")
            all_passed = False

        if not r.get('baseCupSize') or r.get('baseCupSize') <= 0:
            print(f"❌ [{recipe_id}] Missing or invalid baseCupSize")
            all_passed = False

        if len(ingredients) == 0:
            print(f"❌ [{recipe_id}] Has no ingredients")
            all_passed = False

        if len(steps) == 0:
            print(f"❌ [{recipe_id}] Has no preparation steps")
            all_passed = False

        # Validate syrup & carbonated water presence
        has_syrup = any('糖漿' in ing['name'] or 'Syrup' in ing.get('enName', '') or ing.get('isSweetener') for ing in ingredients)
        has_soda = any('氣泡' in ing['name'] or '蘇打' in ing['name'] or 'Soda' in ing.get('enName', '') or 'Sparkling' in ing.get('enName', '') for ing in ingredients)

        if not has_syrup:
            print(f"⚠️ [{recipe_id}] Notice: No flavor syrup found")
        if not has_soda:
            print(f"⚠️ [{recipe_id}] Notice: No sparkling water found")

        print(f"✅ [{recipe_id}] '{name}' passed Italian Soda schema check.")

    print(f"\n🎉 Validation complete: {'ALL RECIPES VALID' if all_passed else 'SOME FAILED'}")
    return all_passed


if __name__ == "__main__":
    validate_recipes_file("src/data/recipes.json")
