import React from 'react';
import { Recipe } from '../types/soda';
import { useI18n } from '../i18n';
import { getRecipeImage } from '../data/recipeImages';
import { Clock, Star, Flame, Sparkles, ArrowRight } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  const { t, lang, recipeTitle } = useI18n();
  const savings = Math.max(0, recipe.storePriceUsd - recipe.homeCostUsd);
  const imageUrl = getRecipeImage(recipe.id, recipe.image);

  return (
    <div 
      onClick={() => onSelect(recipe)}
      className="group bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-sky-100/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Visual Header / Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Floating Category Badge & Emoji */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-lg shadow-md">
            {recipe.emoji}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
            {lang === 'en' ? (recipe.enStyle || recipe.style) : recipe.style}
          </span>
        </div>

        {/* Savings Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white font-bold text-xs shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('card.save')} ${savings.toFixed(2)}</span>
        </div>

        {/* Bottom meta stats on image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-300" />
            <span>{recipe.prepTimeMin} {t('card.prepTime')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{recipe.rating.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>~{recipe.caloriesEst} kcal</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
            {recipeTitle(recipe.id, recipe.name, recipe.enName)}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {lang === 'en' ? (recipe.enDescription || recipe.description) : recipe.description}
          </p>
        </div>

        {/* Bottom Price & Action Footer */}
        <div className="mt-4 pt-3.5 border-t border-dashed border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
              {t('card.storePrice')} ${recipe.storePriceUsd.toFixed(2)}
            </span>
            <span className="text-sm font-extrabold text-sky-600 dark:text-sky-400">
              {t('card.homeCost')} ${recipe.homeCostUsd.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
            <span>{t('card.viewRecipe')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
