export type SodaCategory = 
  | 'all'
  | 'cremosa'
  | 'citrus-spritz'
  | 'fruit-berry'
  | 'botanical'
  | 'zero-sugar';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type CupSize = 355 | 475 | 710 | 1900; // ml: 12oz, 16oz (Standard), 24oz, 64oz (Pitcher)

export type SweetnessLevel = 0 | 50 | 75 | 100 | 125; // % of standard sweetness

export type CreamLevel = 'none' | 'splash' | 'standard' | 'extra';

export type IceLevel = 'regular' | 'pebble' | 'light' | 'extra';

export interface Ingredient {
  name: string;
  enName: string;
  baseAmount: number;
  unit: 'ml' | 'oz' | 'pumps' | 'g' | 'slices' | 'sprig' | 'cherries' | 'tbsp' | 'cup';
  scalable: boolean; // Scales linearly with cup size
  isSweetener?: boolean; // Scales with sweetness level
  isCream?: boolean; // Scales with cream level
  amazonSearchQuery?: string;
  note?: string;
  enNote?: string;
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  enTitle?: string;
  instruction: string;
  enInstruction?: string;
  durationSec?: number; // In seconds for timer
  isTimer?: boolean;
  tip?: string;
  enTip?: string;
}

export interface Recipe {
  id: string;
  name: string;
  enName: string;
  style: string;
  enStyle?: string;
  category: SodaCategory;
  difficulty: Difficulty;
  prepTimeMin: number;
  rating: number;
  storePriceUsd: number;
  homeCostUsd: number;
  caloriesEst: number;
  description: string;
  enDescription?: string;
  bannerColor: string;
  emoji: string;
  image?: string;
  tags: string[];
  enTags?: string[];
  baseCupSize: number; // 475ml (16oz) base
  ingredients: Ingredient[];
  steps: CookingStep[];
  secretTips: string[];
  enSecretTips?: string[];
  equipmentNeeded: string[];
}

export interface SupplyItem {
  id: string;
  name: string;
  enName: string;
  category: 'syrups' | 'soda-makers' | 'glassware-tools' | 'cream-garnishes';
  description: string;
  enDescription?: string;
  badge?: string;
  enBadge?: string;
  amazonQuery: string;
  emoji: string;
  estimatedPriceRange: string;
}

export interface SavedStats {
  totalCupsMade: number;
  totalSavedUsd: number;
  favoriteRecipeIds: string[];
}
