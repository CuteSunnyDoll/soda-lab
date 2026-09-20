import React, { useState } from 'react';
import { CupSize, SweetnessLevel, CreamLevel } from '../types/soda';
import { getAmazonSearchUrl } from '../utils/calculator';
import { useI18n } from '../i18n';
import { 
  Calculator, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Flame, 
  DollarSign, 
  Layers,
  Droplets,
  ThermometerSnowflake
} from 'lucide-react';

interface SmartCalculatorProps {
  trackingId: string;
}

interface FlavorOption {
  id: string;
  name: string;
  enName: string;
  category: string;
  color: string;
  amazonQuery: string;
}

const FLAVORS: FlavorOption[] = [
  { id: 'french-vanilla', name: '法式香草 (French Vanilla)', enName: 'French Vanilla', category: 'creamy', color: '#FBBF24', amazonQuery: 'Torani French Vanilla Syrup 750ml' },
  { id: 'raspberry', name: '紅覆盆子 (Raspberry)', enName: 'Raspberry', category: 'berry', color: '#E11D48', amazonQuery: 'Torani Raspberry Syrup 750ml' },
  { id: 'peach', name: '白桃蜜桃 (Peach)', enName: 'Peach', category: 'fruit', color: '#FB7185', amazonQuery: 'Torani Peach Syrup 750ml' },
  { id: 'blood-orange', name: '西西里血橙 (Blood Orange)', enName: 'Blood Orange', category: 'citrus', color: '#EA580C', amazonQuery: 'Torani Blood Orange Syrup 750ml' },
  { id: 'blue-curacao', name: '莫林藍柑 (Blue Curaçao)', enName: 'Blue Curacao', category: 'citrus', color: '#0284C7', amazonQuery: 'Monin Blue Curacao Syrup 750ml' },
  { id: 'strawberry', name: '鮮甜草莓 (Strawberry)', enName: 'Strawberry', category: 'berry', color: '#F43F5E', amazonQuery: 'Torani Strawberry Syrup 750ml' },
  { id: 'blackberry', name: '黑莓野果 (Blackberry)', enName: 'Blackberry', category: 'berry', color: '#7E22CE', amazonQuery: 'Torani Blackberry Syrup 750ml' },
  { id: 'elderflower', name: '接骨木花 (Elderflower)', enName: 'Elderflower', category: 'botanical', color: '#84CC16', amazonQuery: 'Monin Elderflower Syrup 750ml' },
  { id: 'lavender', name: '普羅旺斯薰衣草 (Lavender)', enName: 'Lavender', category: 'botanical', color: '#A855F7', amazonQuery: 'Monin Lavender Syrup 750ml' },
  { id: 'rose', name: '大馬士革玫瑰 (Rose)', enName: 'Rose', category: 'botanical', color: '#F472B6', amazonQuery: 'Monin Rose Syrup 750ml' },
  { id: 'passion-fruit', name: '熱帶百香果 (Passion Fruit)', enName: 'Passion Fruit', category: 'fruit', color: '#D97706', amazonQuery: 'Torani Passion Fruit Syrup 750ml' },
  { id: 'sf-peach', name: '無糖零卡白桃 (SF Peach)', enName: 'Sugar-Free Peach', category: 'zero', color: '#38BDF8', amazonQuery: 'Torani Sugar Free Peach Syrup 750ml' }
];

export const SmartCalculator: React.FC<SmartCalculatorProps> = ({ trackingId }) => {
  const { t, lang } = useI18n();

  const [targetCupSize, setTargetCupSize] = useState<CupSize>(475);
  const [flavor1Id, setFlavor1Id] = useState<string>('raspberry');
  const [flavor2Id, setFlavor2Id] = useState<string>('french-vanilla');
  const [enableBlend, setEnableBlend] = useState<boolean>(true);
  const [blendRatio, setBlendRatio] = useState<number>(75); // % of flavor1
  const [sweetness, setSweetness] = useState<SweetnessLevel>(100);
  const [creamLevel, setCreamLevel] = useState<CreamLevel>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const flavor1 = FLAVORS.find((f) => f.id === flavor1Id) || FLAVORS[0];
  const flavor2 = FLAVORS.find((f) => f.id === flavor2Id) || FLAVORS[1];

  // Base 475ml (16oz) uses standard 4 pumps (30ml / 1 oz) of syrup
  const sizeMultiplier = targetCupSize / 475;
  const sweetMultiplier = sweetness / 100;

  const totalSyrupMl = Math.round(30 * sizeMultiplier * sweetMultiplier);
  const totalPumps = Math.round((totalSyrupMl / 7.5) * 10) / 10;

  // Split between flavors
  let f1Pumps = totalPumps;
  let f2Pumps = 0;
  if (enableBlend && flavor1Id !== flavor2Id) {
    f1Pumps = Math.round((totalPumps * (blendRatio / 100)) * 10) / 10;
    f2Pumps = Math.round((totalPumps - f1Pumps) * 10) / 10;
  }

  // Cream volume
  const creamMultipliers: Record<CreamLevel, number> = {
    none: 0,
    splash: 15,
    standard: 30,
    extra: 45
  };
  const creamMl = Math.round(creamMultipliers[creamLevel] * sizeMultiplier);

  // Sparkling water calculation: Target cup minus ice (approx 45% volume) minus syrup minus cream
  const iceVolumeEst = Math.round(targetCupSize * 0.42);
  const sodaWaterMl = Math.max(100, Math.round(targetCupSize - iceVolumeEst - totalSyrupMl - creamMl));

  // Cost and calories
  const syrupCost = (totalSyrupMl / 750) * 10.5; // ~$10.50 per 750ml bottle
  const sodaCost = (sodaWaterMl / 1000) * 1.50; // ~$1.50 per liter
  const creamCost = (creamMl / 500) * 2.50; // ~$2.50 per pint
  const totalHomeCost = syrupCost + sodaCost + creamCost + 0.10; // + ice/straw
  const cafePrice = 5.50 * (targetCupSize / 475);
  const savings = Math.max(0, cafePrice - totalHomeCost);

  // Calories
  const syrupCals = Math.round(totalSyrupMl * 2.7); // standard cane syrup ~80kcal per 30ml
  const creamCals = Math.round(creamMl * 3.2); // heavy cream ~100kcal per 30ml
  const totalCals = flavor1.category === 'zero' && (!enableBlend || flavor2.category === 'zero')
    ? (creamMl > 0 ? creamCals : 4)
    : (syrupCals + creamCals);

  const handleCopyRecipe = () => {
    const f1Label = lang === 'en' ? flavor1.enName : flavor1.name;
    const f2Label = lang === 'en' ? flavor2.enName : flavor2.name;
    const sizeLabel = targetCupSize === 355 ? '12oz (355ml)' : targetCupSize === 475 ? '16oz (475ml)' : targetCupSize === 710 ? '24oz (710ml)' : '64oz Pitcher (1900ml)';
    const creamDescEn = creamLevel === 'splash' ? 'Light Splash (15ml)' : creamLevel === 'standard' ? 'Classic Cremosa (30ml)' : 'Cloud Float (45ml)';
    const creamDescZh = creamLevel === 'splash' ? '微量 (15ml)' : creamLevel === 'standard' ? '標準 Cremosa (30ml)' : '厚雪頂 (45ml)';

    const text = lang === 'en'
      ? `🥤 Soda Lab Custom Italian Soda Blueprint
-------------------------------------
Target Glass Size: ${sizeLabel}
Primary Syrup: ${f1Label} - ${enableBlend ? f1Pumps : totalPumps} pumps (${Math.round((enableBlend ? f1Pumps : totalPumps) * 7.5)}ml)
${enableBlend ? `Secondary Syrup: ${f2Label} - ${f2Pumps} pumps (${Math.round(f2Pumps * 7.5)}ml)\n` : ''}Chilled Sparkling Water: ${sodaWaterMl}ml
Cream Layer: ${creamMl > 0 ? `${creamMl}ml (${creamDescEn})` : 'None (Pure Soda)'}
Pebble Ice: ~${iceVolumeEst}g (Fill 3/4 full)
Estimated Cost: $${totalHomeCost.toFixed(2)} (Save $${savings.toFixed(2)} vs café)
Calories: ~${totalCals} kcal`
      : `🥤 Soda Lab 自定義意式蘇打特調配方
-------------------------------------
杯型容量: ${targetCupSize}ml (${targetCupSize === 355 ? '12oz' : targetCupSize === 475 ? '16oz' : targetCupSize === 710 ? '24oz' : '64oz Pitcher'})
主要糖漿: ${flavor1.name} - ${enableBlend ? f1Pumps : totalPumps} 泵 (${Math.round((enableBlend ? f1Pumps : totalPumps) * 7.5)}ml)
${enableBlend ? `拼配糖漿: ${flavor2.name} - ${f2Pumps} 泵 (${Math.round(f2Pumps * 7.5)}ml)\n` : ''}冷藏氣泡水: ${sodaWaterMl}ml
鮮奶油層: ${creamMl > 0 ? `${creamMl}ml (${creamDescZh})` : '無 (清爽純飲)'}
碎冰塊: 約 ${iceVolumeEst}g (八分滿)
預估成本: $${totalHomeCost.toFixed(2)} (比咖啡館省 $${savings.toFixed(2)})
熱量預估: ~${totalCals} kcal`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-bold border border-sky-200 dark:border-sky-800">
          <Calculator className="w-3.5 h-3.5" />
          <span>{t('calc.badge')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t('calc.title')}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {t('calc.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Input Configuration (7 cols) */}
        <div className="md:col-span-7 bg-white dark:bg-slate-800/90 rounded-3xl p-5 sm:p-6 border border-sky-100 dark:border-slate-700 shadow-sm space-y-6">
          
          {/* Cup Size */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {t('calc.step1')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { size: 355 as CupSize, label: '12 oz', sub: lang === 'en' ? '355ml Small' : '355ml 小型' },
                { size: 475 as CupSize, label: '16 oz', sub: lang === 'en' ? '475ml Standard' : '475ml 標準' },
                { size: 710 as CupSize, label: '24 oz', sub: lang === 'en' ? '710ml Large' : '710ml 大杯' },
                { size: 1900 as CupSize, label: '64 oz', sub: lang === 'en' ? '64oz Pitcher' : '公杯派對' }
              ].map((item) => (
                <button
                  key={item.size}
                  onClick={() => setTargetCupSize(item.size)}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    targetCupSize === item.size
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md font-bold'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                  }`}
                >
                  <div className="text-sm font-extrabold">{item.label}</div>
                  <div className="text-[10px] opacity-80">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                {t('calc.step2')}
              </label>
              <select
                value={flavor1Id}
                onChange={(e) => setFlavor1Id(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {FLAVORS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {lang === 'en' ? f.enName : f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Enable Dual Blend Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={enableBlend}
                  onChange={(e) => setEnableBlend(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('calc.enableBlend')}
                </span>
              </label>
            </div>

            {enableBlend && (
              <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-slate-900/50 border border-sky-100 dark:border-slate-700 space-y-3 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    {t('calc.flavor2')}
                  </label>
                  <select
                    value={flavor2Id}
                    onChange={(e) => setFlavor2Id(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {FLAVORS.map((f) => (
                      <option key={f.id} value={f.id}>
                        {lang === 'en' ? f.enName : f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>{lang === 'en' ? flavor1.enName : flavor1.name}: {blendRatio}%</span>
                    <span>{lang === 'en' ? flavor2.enName : flavor2.name}: {100 - blendRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={blendRatio}
                    onChange={(e) => setBlendRatio(parseInt(e.target.value, 10))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sweetness / Pumps Level */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t('calc.step3')}
              </label>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                {sweetness}% ({totalPumps} {t('calc.pumps')})
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {[
                { val: 0 as SweetnessLevel, label: lang === 'en' ? '0% None' : '0% 無糖' },
                { val: 50 as SweetnessLevel, label: lang === 'en' ? '50% Half' : '50% 半糖' },
                { val: 75 as SweetnessLevel, label: lang === 'en' ? '75% Less' : '75% 微甜' },
                { val: 100 as SweetnessLevel, label: lang === 'en' ? '100% Reg' : '100% 標準' },
                { val: 125 as SweetnessLevel, label: lang === 'en' ? '125% Extra' : '125% 濃甜' }
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => setSweetness(item.val)}
                  className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    sweetness === item.val
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm font-bold'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cream Option */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {t('calc.step4')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { level: 'none' as CreamLevel, title: t('calc.creamNone'), desc: t('calc.creamNoneSub') },
                { level: 'splash' as CreamLevel, title: t('calc.creamSplash'), desc: t('calc.creamSplashSub') },
                { level: 'standard' as CreamLevel, title: t('calc.creamStandard'), desc: t('calc.creamStandardSub') },
                { level: 'extra' as CreamLevel, title: t('calc.creamExtra'), desc: t('calc.creamExtraSub') }
              ].map((item) => (
                <button
                  key={item.level}
                  onClick={() => setCreamLevel(item.level)}
                  className={`p-2.5 rounded-2xl border text-left transition-all ${
                    creamLevel === item.level
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-400 dark:border-amber-700 shadow-sm font-bold'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                  }`}
                >
                  <div className="text-xs font-extrabold">{item.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Display Card (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-sky-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between border border-sky-800/50">
          <div>
            {/* Top Blueprint Title */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-lg">
                  🥤
                </div>
                <div>
                  <h3 className="font-extrabold text-base">{t('calc.outputTitle')}</h3>
                  <span className="text-[11px] text-sky-300 font-mono">
                    {t('calc.outputSub')} {targetCupSize}ml
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyRecipe}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
                title={t('common.copy')}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('common.copied') : t('common.copy')}</span>
              </button>
            </div>

            {/* Ingredient Quantities Breakdown */}
            <div className="py-4 space-y-3.5">
              
              {/* Primary Flavor */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: flavor1.color }} />
                  <div>
                    <div className="text-xs font-bold">{lang === 'en' ? flavor1.enName : flavor1.name}</div>
                    <div className="text-[10px] text-slate-400">{t('calc.primarySyrup')}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold font-mono text-sky-300">
                    {enableBlend ? f1Pumps : totalPumps} {t('calc.pumps')}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ~{Math.round((enableBlend ? f1Pumps : totalPumps) * 7.5)} ml
                  </div>
                </div>
              </div>

              {/* Secondary Flavor if blend */}
              {enableBlend && flavor1Id !== flavor2Id && (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: flavor2.color }} />
                    <div>
                      <div className="text-xs font-bold">{lang === 'en' ? flavor2.enName : flavor2.name}</div>
                      <div className="text-[10px] text-slate-400">{t('calc.secondarySyrup')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold font-mono text-amber-300">
                      {f2Pumps} {t('calc.pumps')}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      ~{Math.round(f2Pumps * 7.5)} ml
                    </div>
                  </div>
                </div>
              )}

              {/* Cold Soda Water */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="text-xs font-bold">{t('calc.sodaWater')}</div>
                    <div className="text-[10px] text-slate-400">{t('calc.sodaWaterTip')}</div>
                  </div>
                </div>
                <div className="text-right font-mono font-extrabold text-sm text-sky-300">
                  {sodaWaterMl} ml
                </div>
              </div>

              {/* Cream if applicable */}
              {creamMl > 0 && (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-amber-300" />
                    <div>
                      <div className="text-xs font-bold">{t('calc.cream')}</div>
                      <div className="text-[10px] text-slate-400">{t('calc.creamTip')}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono font-extrabold text-sm text-amber-300">
                    {creamMl} ml
                  </div>
                </div>
              )}

              {/* Pebble Ice */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <ThermometerSnowflake className="w-4 h-4 text-cyan-300" />
                  <div>
                    <div className="text-xs font-bold">{t('calc.pebbleIce')}</div>
                    <div className="text-[10px] text-slate-400">{t('calc.pebbleIceTip')}</div>
                  </div>
                </div>
                <div className="text-right font-mono font-extrabold text-sm text-cyan-300">
                  ~{iceVolumeEst} g
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Financial & Calorie Stats */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30">
                <div className="text-[11px] text-emerald-300 font-semibold">{t('calc.diyCost')}</div>
                <div className="text-lg font-extrabold text-emerald-400">
                  ${totalHomeCost.toFixed(2)}
                </div>
                <div className="text-[10px] text-emerald-200">
                  {t('card.save')} ${savings.toFixed(2)}
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-rose-500/20 border border-rose-400/30">
                <div className="text-[11px] text-rose-300 font-semibold">{t('calc.estCalories')}</div>
                <div className="text-lg font-extrabold text-rose-300">
                  ~{totalCals}
                </div>
                <div className="text-[10px] text-rose-200">
                  kcal
                </div>
              </div>
            </div>

            {/* Amazon Quick Buy */}
            <div className="text-center pt-2">
              <a
                href={getAmazonSearchUrl(flavor1.amazonQuery, trackingId)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
              >
                <span>{t('calc.amazonLink')} {lang === 'en' ? flavor1.enName : flavor1.name} {t('calc.onAmazon')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
