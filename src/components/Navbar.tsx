import React, { useState } from 'react';
import { SodaCategory } from '../types/soda';
import { useI18n } from '../i18n';
import { SupportedLang } from '../i18n/ui';
import { 
  Sparkles, 
  Search, 
  DollarSign, 
  BookOpen, 
  Calculator, 
  ShoppingBag, 
  HelpCircle,
  Globe,
  Sun,
  Moon,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'recipes' | 'calculator' | 'shop' | 'guide';
  setActiveTab: (tab: 'recipes' | 'calculator' | 'shop' | 'guide') => void;
  selectedCategory: SodaCategory;
  setSelectedCategory: (cat: SodaCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalSavedUsd: number;
  dark: boolean;
  onToggleTheme: () => void;
}

const CATEGORIES: { id: SodaCategory; i18nKey: string; icon: string }[] = [
  { id: 'all', i18nKey: 'nav.catAll', icon: '✨' },
  { id: 'cremosa', i18nKey: 'nav.catCremosa', icon: '🍦' },
  { id: 'citrus-spritz', i18nKey: 'nav.catCitrus', icon: '🍊' },
  { id: 'fruit-berry', i18nKey: 'nav.catFruit', icon: '🍓' },
  { id: 'botanical', i18nKey: 'nav.catBotanical', icon: '🌿' },
  { id: 'zero-sugar', i18nKey: 'nav.catZeroSugar', icon: '💎' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  totalSavedUsd,
  dark,
  onToggleTheme
}) => {
  const { t, lang, setLang, languages } = useI18n();
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-sky-100 dark:border-slate-800 transition-all">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('recipes')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-amber-300 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform duration-300">
              🥤
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-sky-700 via-sky-600 to-amber-600 dark:from-sky-400 dark:via-sky-300 dark:to-amber-400 bg-clip-text text-transparent">
                  Soda Lab
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hidden sm:inline-block">
                  Italian Soda
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          {/* Search Box (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="w-full pl-10 pr-9 py-2 rounded-full border border-sky-200/80 dark:border-slate-700 bg-sky-50/50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Savings Counter Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>${totalSavedUsd.toFixed(2)}</span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-sky-100 dark:border-slate-700 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {(Object.keys(languages) as SupportedLang[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs sm:text-sm flex items-center justify-between ${
                        lang === code 
                          ? 'bg-sky-50 text-sky-700 font-semibold dark:bg-sky-900/40 dark:text-sky-300' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                      }`}
                    >
                      <span>{languages[code].flag} {languages[code].name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Light / Dark"
            >
              {dark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('nav.searchPlaceholder')}
              className="w-full pl-10 pr-9 py-2 rounded-full border border-sky-200/80 dark:border-slate-700 bg-sky-50/50 dark:bg-slate-800/80 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 border-t border-sky-100/60 dark:border-slate-800/60">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'recipes'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('nav.recipes')}</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'calculator'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('nav.calculator')}</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'shop'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t('nav.shop')}</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'guide'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('nav.guide')}</span>
          </button>
        </div>

        {/* Category Pills (Visible when on 'recipes' tab) */}
        {activeTab === 'recipes' && (
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2.5 border-t border-dashed border-sky-100 dark:border-slate-800/80">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200 border border-sky-300 dark:border-sky-700 shadow-sm font-bold'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 hover:border-sky-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{t(cat.i18nKey)}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
