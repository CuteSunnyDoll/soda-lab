import { Ingredient, Recipe, CupSize, SweetnessLevel, CreamLevel } from '../types/soda';

export const DEFAULT_AMAZON_TRACKING_ID = 'sodalab0f-20';

export function getAmazonSearchUrl(query: string, trackingId: string = DEFAULT_AMAZON_TRACKING_ID): string {
  const cleanTrackingId = trackingId.trim() || DEFAULT_AMAZON_TRACKING_ID;
  const encodedQuery = encodeURIComponent(query);
  return `https://www.amazon.com/s?k=${encodedQuery}&tag=${cleanTrackingId}&ref=as_li_ss_tl`;
}

export function formatTimerSeconds(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function calculateScaledAmount(
  ingredient: Ingredient,
  targetCupSize: CupSize,
  sweetness: SweetnessLevel = 100,
  creamLevel: CreamLevel = 'standard'
): number {
  if (!ingredient.scalable) {
    return ingredient.baseAmount;
  }

  const baseRatio = targetCupSize / 475; // 475ml = 16oz base
  let amount = ingredient.baseAmount * baseRatio;

  if (ingredient.isSweetener) {
    amount = amount * (sweetness / 100);
  }

  if (ingredient.isCream) {
    const creamMultipliers: Record<CreamLevel, number> = {
      none: 0,
      splash: 0.5,
      standard: 1.0,
      extra: 1.5
    };
    amount = amount * creamMultipliers[creamLevel];
  }

  // Format nicely depending on unit
  if (['slices', 'piece', 'sprig', 'cherries', 'pumps'].includes(ingredient.unit)) {
    return Math.max(0, Math.round(amount));
  }

  if (['tbsp', 'oz'].includes(ingredient.unit)) {
    return Math.round(amount * 2) / 2; // round to nearest 0.5
  }

  return Math.round(amount);
}

export function calculateRecipeMetrics(
  recipe: Recipe,
  targetCupSize: CupSize,
  sweetness: SweetnessLevel,
  creamLevel: CreamLevel = 'standard'
) {
  const baseRatio = targetCupSize / recipe.baseCupSize;
  
  // Cost calculation
  const scaledHomeCost = recipe.homeCostUsd * baseRatio;
  const scaledStorePrice = recipe.storePriceUsd * (targetCupSize / 475);
  const savings = Math.max(0, scaledStorePrice - scaledHomeCost);

  // Calorie calculation
  const sweetnessRatio = sweetness / 100;
  const creamRatio = creamLevel === 'none' ? 0 : creamLevel === 'splash' ? 0.5 : creamLevel === 'standard' ? 1.0 : 1.5;
  
  // Rough breakdown: syrups ~75% of calories in classic soda, cream ~50% in cremosa
  let estimatedCalories = Math.round(recipe.caloriesEst * baseRatio * (0.3 + 0.5 * sweetnessRatio + 0.2 * creamRatio));
  if (sweetness === 0 && creamLevel === 'none') {
    estimatedCalories = 5; // trace calories in club soda & lemon/lime
  }

  return {
    scaledStorePrice: Math.round(scaledStorePrice * 100) / 100,
    scaledHomeCost: Math.round(scaledHomeCost * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    estimatedCalories: Math.max(0, estimatedCalories)
  };
}
