import React, { useState } from 'react';
import { SupplyItem } from '../types/soda';
import suppliesData from '../data/supplies.json';
import { getAmazonSearchUrl } from '../utils/calculator';
import { useI18n } from '../i18n';
import { 
  ShoppingBag, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Filter,
  Package
} from 'lucide-react';

interface SupplyShopProps {
  trackingId: string;
}

const SUPPLIES: SupplyItem[] = suppliesData as SupplyItem[];

export const SupplyShop: React.FC<SupplyShopProps> = ({ trackingId }) => {
  const { t, lang } = useI18n();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredSupplies = selectedCat === 'all'
    ? SUPPLIES
    : SUPPLIES.filter(s => s.category === selectedCat);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-sky-800">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{t('shop.title')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t('shop.title')}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {t('shop.subtitle')}
        </p>
      </div>

      {/* Statutory Legal Disclaimer Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 flex items-center gap-2 text-xs text-amber-900/80 dark:text-amber-300/80">
        <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>{t('shop.disclaimer')}</span>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'all', label: t('shop.tabAll') },
          { id: 'syrups', label: t('shop.tabSyrups') },
          { id: 'soda-makers', label: t('shop.tabMakers') },
          { id: 'glassware-tools', label: t('shop.tabTools') },
          { id: 'cream-garnishes', label: t('shop.tabGarnishes') }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCat === cat.id
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Supply Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSupplies.map((item) => {
          const amazonUrl = getAmazonSearchUrl(item.amazonQuery, trackingId);

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-sky-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header with Emoji & Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-slate-700/80 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </div>
                  {(item.badge || item.enBadge) && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[11px] font-extrabold border border-amber-200 dark:border-amber-800">
                      {lang === 'en' ? (item.enBadge || item.badge) : item.badge}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {lang === 'en' ? item.enName : item.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {lang === 'en' ? (item.enDescription || item.description) : item.description}
                </p>
              </div>

              {/* Bottom Price & Button */}
              <div className="mt-5 pt-3.5 border-t border-dashed border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {t('shop.refPrice')}
                  </span>
                  <span className="text-sm font-extrabold font-mono text-slate-800 dark:text-slate-200">
                    {item.estimatedPriceRange}
                  </span>
                </div>

                <a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 dark:bg-slate-700/80 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 text-sky-700 dark:text-sky-300 text-xs font-bold transition-all shadow-sm"
                >
                  <span>{t('shop.viewOnAmazon')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
