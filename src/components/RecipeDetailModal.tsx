import React, { useState, useEffect, useRef } from 'react';
import { Recipe, Ingredient, CupSize, SweetnessLevel, CreamLevel } from '../types/soda';
import { 
  calculateScaledAmount, 
  calculateRecipeMetrics, 
  getAmazonSearchUrl,
  formatTimerSeconds 
} from '../utils/calculator';
import { getRecipeImage } from '../data/recipeImages';
import { useI18n } from '../i18n';
import { 
  X, 
  Clock, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  ExternalLink, 
  Check, 
  CheckCircle2, 
  Lightbulb, 
  Flame, 
  Share2,
  DollarSign,
  Volume2
} from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  trackingId: string;
  onRecordCupMade: (savedAmount: number) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  trackingId,
  onRecordCupMade
}) => {
  const { t, lang, recipeTitle, equipmentName } = useI18n();

  // Customization States
  const [cupSize, setCupSize] = useState<CupSize>(475); // 16oz default
  const [sweetness, setSweetness] = useState<SweetnessLevel>(100);
  const [creamLevel, setCreamLevel] = useState<CreamLevel>('standard');

  // Ingredient checklist
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  // Timers
  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [madeToast, setMadeToast] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // WakeLock Ref
  const wakeLockRef = useRef<any>(null);

  // Reset states whenever recipe opens
  useEffect(() => {
    if (recipe) {
      setCupSize(475);
      setSweetness(100);
      setCreamLevel(recipe.category === 'cremosa' ? 'standard' : 'none');
      setCheckedIngredients({});
      setActiveTimerStep(null);
      setTimeLeft(0);
      setTimerRunning(false);
      setMadeToast(false);
    }
  }, [recipe?.id]);

  // Audio Beep
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  };

  // Timer Effect & Screen WakeLock
  useEffect(() => {
    let interval: any = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator && !wakeLockRef.current) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err) {
        console.warn('Wake Lock request failed:', err);
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        } catch (err) {
          console.warn('Wake Lock release failed:', err);
        }
      }
    };

    if (timerRunning && timeLeft > 0) {
      requestWakeLock();
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setTimerRunning(false);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      releaseWakeLock();
    }

    return () => {
      if (interval) clearInterval(interval);
      releaseWakeLock();
    };
  }, [timerRunning, timeLeft]);

  if (!recipe) return null;

  const metrics = calculateRecipeMetrics(recipe, cupSize, sweetness, creamLevel);
  const imageUrl = getRecipeImage(recipe.id, recipe.image);

  const toggleCheck = (idx: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleStartTimer = (stepIndex: number, durationSec: number) => {
    setActiveTimerStep(stepIndex);
    setTimeLeft(durationSec);
    setTimerRunning(true);
  };

  const handleRecordMade = () => {
    onRecordCupMade(metrics.savings);
    setMadeToast(true);
    setTimeout(() => setMadeToast(false), 3000);
  };

  const handleShare = () => {
    const text = `${recipeTitle(recipe.id, recipe.name, recipe.enName)} - Soda Lab DIY\n${window.location.href}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-sky-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Sticky Top Header with Hero Image */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0 bg-slate-100 dark:bg-slate-800">
          <img
            src={imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close & Share Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all shadow-md"
              title={t('modal.share')}
            >
              {copiedShare ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title and Style */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-2xl">{recipe.emoji}</span>
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/80 backdrop-blur-md">
                {lang === 'en' ? (recipe.enStyle || recipe.style) : recipe.style}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md">
                {t('card.save')} ${metrics.savings.toFixed(2)}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {recipeTitle(recipe.id, recipe.name, recipe.enName)}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 mt-1 leading-relaxed">
              {lang === 'en' ? (recipe.enDescription || recipe.description) : recipe.description}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Dynamic Interactive Adjusters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-sky-50/60 dark:bg-slate-800/60 p-4 rounded-2xl border border-sky-100 dark:border-slate-700/60">
            
            {/* Cup Size */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('modal.cupSize')}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { size: 355 as CupSize, label: '12oz (355ml)' },
                  { size: 475 as CupSize, label: '16oz (475ml)' },
                  { size: 710 as CupSize, label: '24oz (710ml)' },
                  { size: 1900 as CupSize, label: '64oz (Pitcher)' }
                ].map((item) => (
                  <button
                    key={item.size}
                    onClick={() => setCupSize(item.size)}
                    className={`px-2 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      cupSize === item.size
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness / Syrup Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('modal.sweetness')}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { val: 0 as SweetnessLevel, label: lang === 'en' ? '0% (Unsweetened)' : '0% (無糖)' },
                  { val: 50 as SweetnessLevel, label: lang === 'en' ? '50% (Half Sweet)' : '50% (半糖)' },
                  { val: 75 as SweetnessLevel, label: lang === 'en' ? '75% (Less Sweet)' : '75% (微甜)' },
                  { val: 100 as SweetnessLevel, label: lang === 'en' ? '100% (Standard)' : '100% (標準)' },
                  { val: 125 as SweetnessLevel, label: lang === 'en' ? '125% (Extra Sweet)' : '125% (濃郁)' }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => setSweetness(item.val)}
                    className={`px-1.5 py-1.5 text-[11px] font-semibold rounded-xl border transition-all ${
                      sweetness === item.val
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cream Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t('modal.cream')}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { level: 'none' as CreamLevel, label: lang === 'en' ? 'Pure Soda' : '無奶純飲' },
                  { level: 'splash' as CreamLevel, label: lang === 'en' ? 'Light Splash' : '微量奶香' },
                  { level: 'standard' as CreamLevel, label: lang === 'en' ? 'Classic Cremosa' : '標準 Cremosa' },
                  { level: 'extra' as CreamLevel, label: lang === 'en' ? 'Cloud Float' : '奢華厚雪頂' }
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setCreamLevel(item.level)}
                    className={`px-2 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      creamLevel === item.level
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Metrics Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-sky-100 dark:border-slate-700 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 line-through">
                {t('card.storePrice')}: ${metrics.scaledStorePrice.toFixed(2)}
              </span>
              <span className="font-extrabold text-sky-600 dark:text-sky-400 text-sm">
                {t('card.homeCost')}: ${metrics.scaledHomeCost.toFixed(2)}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                {t('card.save')} ${metrics.savings.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-500 font-semibold">
              <Flame className="w-4 h-4" />
              <span>~{metrics.estimatedCalories} kcal</span>
            </div>
          </div>

          {/* Scaled Ingredients Checklist */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>{t('modal.ingredients')}</span>
              <span className="text-xs font-normal text-slate-400">
                ({t('modal.scaledFor')} {cupSize}ml)
              </span>
            </h3>

            <div className="space-y-2">
              {recipe.ingredients.map((ing, idx) => {
                const scaledAmount = calculateScaledAmount(ing, cupSize, sweetness, creamLevel);
                const isChecked = !!checkedIngredients[idx];

                if (scaledAmount === 0 && ing.isCream) {
                  return null; // hide cream if user selected 'none'
                }

                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50 opacity-60'
                        : 'bg-white dark:bg-slate-800 border-sky-100 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <span className={`text-sm font-semibold ${
                          isChecked 
                            ? 'line-through text-slate-400 dark:text-slate-500' 
                            : 'text-slate-800 dark:text-slate-200'
                        }`}>
                          {lang === 'en' ? ing.enName : ing.name}
                        </span>
                        {(ing.enNote || ing.note) && (
                          <span className="text-xs text-slate-400 block">
                            {lang === 'en' ? (ing.enNote || ing.note) : ing.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold font-mono text-sky-700 dark:text-sky-300">
                        {scaledAmount} {ing.unit}
                      </span>
                      {ing.amazonSearchQuery && (
                        <a
                          href={getAmazonSearchUrl(ing.amazonSearchQuery, trackingId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors"
                          title={t('modal.amazonBuy')}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step Directions with Interactive Timers */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              {t('modal.steps')}
            </h3>

            <div className="space-y-3">
              {recipe.steps.map((step, idx) => {
                const isTimerActive = activeTimerStep === idx;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 flex items-center justify-center text-xs font-bold">
                          {step.stepNumber}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {lang === 'en' ? (step.enTitle || step.title) : step.title}
                        </h4>
                      </div>

                      {/* Timer Button if applicable */}
                      {step.durationSec && (
                        <div className="flex items-center gap-2">
                          {isTimerActive ? (
                            <div className="flex items-center gap-2 bg-sky-50 dark:bg-slate-900 px-3 py-1 rounded-xl border border-sky-200 dark:border-slate-700">
                              <span className="font-mono text-sm font-extrabold text-sky-600 dark:text-sky-400">
                                {formatTimerSeconds(timeLeft)}
                              </span>
                              <button
                                onClick={() => setTimerRunning(!timerRunning)}
                                className="p-1 text-sky-600 dark:text-sky-400"
                              >
                                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => {
                                  setTimeLeft(step.durationSec || 0);
                                  setTimerRunning(false);
                                }}
                                className="p-1 text-slate-400 hover:text-slate-600"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartTimer(idx, step.durationSec || 0)}
                              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 dark:bg-slate-700 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-slate-600 text-xs font-bold transition-colors"
                            >
                              <Play className="w-3 h-3" />
                              <span>{formatTimerSeconds(step.durationSec)}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                      {lang === 'en' ? (step.enInstruction || step.instruction) : step.instruction}
                    </p>

                    {(step.enTip || step.tip) && (
                      <div className="ml-8 mt-2 p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{lang === 'en' ? (step.enTip || step.tip) : step.tip}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Barista Secret Tips */}
          {((lang === 'en' && recipe.enSecretTips && recipe.enSecretTips.length > 0) || (recipe.secretTips && recipe.secretTips.length > 0)) && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{t('modal.secretTips')}</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                {(lang === 'en' && recipe.enSecretTips ? recipe.enSecretTips : recipe.secretTips).map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Equipment Needed */}
          {recipe.equipmentNeeded && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t('modal.equipment')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {recipe.equipmentNeeded.map((eq, idx) => (
                  <a
                    key={idx}
                    href={getAmazonSearchUrl(equipmentName(eq), trackingId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <span>{equipmentName(eq)}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Fixed Action Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-sky-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            {madeToast ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                {t('modal.savedSuccess')} ${metrics.savings.toFixed(2)}!
              </span>
            ) : (
              <span>
                {t('modal.homeSavingsNotice')} ${metrics.savings.toFixed(2)} {t('modal.homeSavingsNoticeSuffix')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t('common.close')}
            </button>
            <button
              onClick={handleRecordMade}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-600 to-amber-500 hover:from-sky-700 hover:to-amber-600 text-white shadow-md shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('modal.iMadeThis')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
