import shutil
from pathlib import Path

base = Path("src/assets/recipes")
base.mkdir(parents=True, exist_ok=True)
boba_assets = Path(r"C:\Users\Matrixkuo\Desktop\Antigravity\APP Design\Boba Tea\src\assets\recipes")

# 1. classic-vanilla-cremosa (already at base / classic-vanilla-cremosa.jpg)
# 2. peaches-and-cream (already at base / peaches-and-cream.jpg)
# 3. raspberry-velvet-cremosa (already at base / raspberry-velvet-cremosa.jpg)
# 4. blood-orange-creamsicle (already at base / blood-orange-creamsicle.jpg)
# 5. strawberry-shortcake-cremosa (already at base / strawberry-shortcake-cremosa.jpg)

# 6. blueberry-cloud-float
shutil.copyfile(boba_assets / "blueberry-yogurt-slush.png", base / "blueberry-cloud-float.png")

# 7. sicilian-blood-orange-spritz
shutil.move(base / "test-blood-orange-spritz.jpg", base / "sicilian-blood-orange-spritz.jpg")

# 8. amalfi-lemon-fizz
shutil.copyfile(boba_assets / "hk-icy-lemon-soda.png", base / "amalfi-lemon-fizz.png")

# 9. pink-grapefruit-sea-salt
shutil.move(base / "test-paloma.jpg", base / "pink-grapefruit-sea-salt.jpg")

# 10. bergamot-bitter-spritz
shutil.move(base / "test-spritz.jpg", base / "bergamot-bitter-spritz.jpg")

# 11. electric-blue-curacao
shutil.move(base / "test-blue.jpg", base / "electric-blue-curacao.jpg")

# 12. passion-fruit-mango-sparkler
shutil.copyfile(boba_assets / "passion-fruit-double-boba.png", base / "passion-fruit-mango-sparkler.png")

# 13. lime-mint-italian-mojito
shutil.move(base / "test-mojito.jpg", base / "lime-mint-italian-mojito.jpg")

# 14. blackberry-lavender-sunrise
shutil.copyfile(boba_assets / "smoked-plum-lemon-tea.png", base / "blackberry-lavender-sunrise.png")

# 15. ruby-pomegranate-grenadine
shutil.copyfile(boba_assets / "hibiscus-iced-tea.png", base / "ruby-pomegranate-grenadine.png")

# 16. elderflower-green-grape
shutil.copyfile(boba_assets / "green-grape-jasmine.png", base / "elderflower-green-grape.png")

# 17. provence-lavender-lemonade
shutil.copyfile(boba_assets / "cheese-foam-grape-oolong.png", base / "provence-lavender-lemonade.png")

# 18. damask-rose-lychee-fizz
shutil.copyfile(boba_assets / "rose-lychee-boba.png", base / "damask-rose-lychee-fizz.png")

# 19. basil-watermelon-cooler
shutil.copyfile(boba_assets / "watermelon-crystal-boba.png", base / "basil-watermelon-cooler.png")

# 20. zero-sugar-white-peach
shutil.copyfile(boba_assets / "peach-oolong-tea.png", base / "zero-sugar-white-peach.png")

# Clean up any leftover test files
for leftover in ["test-blue.png"]:
    p = base / leftover
    if p.exists():
        p.unlink()

print("All 20 images successfully installed!")
for f in sorted(base.iterdir()):
    print(" -", f.name, f.stat().st_size, "bytes")
