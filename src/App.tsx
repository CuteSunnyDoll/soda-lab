import React, { useState, useEffect } from 'react';
import { SodaCategory, Recipe } from './types/soda';
import recipesData from './data/recipes.json';
import { DEFAULT_AMAZON_TRACKING_ID } from './utils/calculator';
import { useI18n } from './i18n';
import { Navbar } from './components/Navbar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { SmartCalculator } from './components/SmartCalculator';
import { SupplyShop } from './components/SupplyShop';
import { TroubleshootingGuide } from './components/TroubleshootingGuide';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Search, 
  Calculator, 
  ArrowRight,
  Flame,
  Droplets,
  DollarSign
} from 'lucide-react';

const RECIPES: Recipe[] = recipesData as Recipe[];

export function App() {
  const { t, lang, recipeTitle } = useI18n();

  // Dark Theme
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('sodalab_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('sodalab_theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggleTheme = () => setDark(prev => !prev);

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<'recipes' | 'calculator' | 'shop' | 'guide'>('recipes');
  const [selectedCategory, setSelectedCategory] = useState<SodaCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Recipe & URL routing
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(() => {
    const m = window.location.pathname.match(/^\/recipe\/([^/]+)$/);
    return m ? RECIPES.find(r => r.id === m[1]) ?? null : null;
  });

  const openRecipe = (r: Recipe) => {
    setSelectedRecipe(r);
    history.pushState(null, '', `/recipe/${r.id}`);
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
    history.pushState(null, '', '/');
  };

  useEffect(() => {
    const onPop = () => {
      const m = window.location.pathname.match(/^\/recipe\/([^/]+)$/);
      setSelectedRecipe(m ? RECIPES.find(r => r.id === m[1]) ?? null : null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Dynamic Document Title
  useEffect(() => {
    if (selectedRecipe) {
      const title = recipeTitle(selectedRecipe.id, selectedRecipe.name, selectedRecipe.enName);
      document.title = `${title} | Soda Lab`;
    } else {
      document.title = lang === 'en'
        ? 'Soda Lab | Italian Soda & Cremosa Studio'
        : lang === 'zh-Hans'
        ? 'Soda Lab 意式苏打特调工坊 | 在家调制名店气泡饮'
        : 'Soda Lab 意式蘇打特調工坊 | 在家調製名店氣泡飲';
    }
  }, [selectedRecipe, lang, recipeTitle]);

  // Developer Official Amazon Tracking ID (Locked for commission monetization)
  const trackingId = DEFAULT_AMAZON_TRACKING_ID;

  const [totalSavedUsd, setTotalSavedUsd] = useState<number>(() => {
    const saved = localStorage.getItem('sodalab_total_saved_usd');
    return saved ? parseFloat(saved) : 21.50; // Welcoming initial counter
  });

  const [totalCupsMade, setTotalCupsMade] = useState<number>(() => {
    const saved = localStorage.getItem('sodalab_total_cups_made');
    return saved ? parseInt(saved, 10) : 4;
  });

  useEffect(() => {
    localStorage.removeItem('sodalab_amazon_tracking_id');
  }, []);

  useEffect(() => {
    localStorage.setItem('sodalab_total_saved_usd', totalSavedUsd.toString());
    localStorage.setItem('sodalab_total_cups_made', totalCupsMade.toString());
  }, [totalSavedUsd, totalCupsMade]);

  const handleRecordCupMade = (savedAmount: number) => {
    setTotalSavedUsd(prev => prev + savedAmount);
    setTotalCupsMade(prev => prev + 1);
  };

  // Filter Recipes
  const filteredRecipes = RECIPES.filter((r) => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.enName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalSavedUsd={totalSavedUsd}
        dark={dark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Render Tab 1: RECIPES */}
        {activeTab === 'recipes' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in duration-300">
            
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 text-white p-6 sm:p-10 shadow-xl">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('hero.badge')}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  {t('hero.title1')}<br />
                  <span className="text-amber-200">{t('hero.title2')}</span>
                </h1>

                <p className="text-sm sm:text-base text-sky-50 leading-relaxed max-w-xl">
                  {t('hero.desc')}
                </p>

                {/* Stats Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10">
                    <span className="text-amber-300 font-extrabold text-base">{totalCupsMade}</span>
                    <span className="opacity-90">{t('hero.stat.cups')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10">
                    <span className="text-emerald-300 font-extrabold text-base">${totalSavedUsd.toFixed(2)}</span>
                    <span className="opacity-90">{t('hero.stat.saved')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/10">
                    <span className="text-white font-extrabold text-base">{RECIPES.length}</span>
                    <span className="opacity-90">{t('hero.stat.recipes')}</span>
                  </div>
                </div>

                {/* Quick Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-sky-700 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    <Calculator className="w-4 h-4 text-sky-600" />
                    <span>{t('hero.btnCalc')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute -right-10 -bottom-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl sm:text-9xl opacity-20 pointer-events-none select-none hidden md:block">
                🥤
              </div>
            </div>

            {/* Recipes Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {t('nav.recipes')}
                  </h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {filteredRecipes.length} {t('grid.countSuffix')}
                  </span>
                </div>
              </div>

              {filteredRecipes.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-800/60 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="text-4xl">🔍</div>
                  <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                    {t('grid.noResults')} {searchQuery ? `"${searchQuery}"` : ''}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
                  >
                    {t('grid.resetFilter')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSelect={openRecipe}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Render Tab 2: CALCULATOR */}
        {activeTab === 'calculator' && (
          <SmartCalculator trackingId={trackingId} />
        )}

        {/* Render Tab 3: SHOP */}
        {activeTab === 'shop' && (
          <SupplyShop trackingId={trackingId} />
        )}

        {/* Render Tab 4: GUIDE */}
        {activeTab === 'guide' && (
          <TroubleshootingGuide />
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={closeRecipe}
          trackingId={trackingId}
          onRecordCupMade={handleRecordCupMade}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
