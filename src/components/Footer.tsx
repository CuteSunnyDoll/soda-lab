import React from 'react';
import { useI18n } from '../i18n';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-sky-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-amber-400 flex items-center justify-center text-xl shadow-md">
              🥤
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Soda Lab
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-md leading-relaxed">
            {t('common.disclaimer')}
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Soda Lab DIY. All rights reserved.</span>
            <span>•</span>
            <a
              href="/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              Privacy Policy
            </a>
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>for Italian Soda enthusiasts worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
