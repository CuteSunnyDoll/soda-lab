import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  FlaskConical,
  Droplets,
  Layers,
  ThermometerSnowflake
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'curdling' | 'fizz' | 'layering' | 'syrup' | 'water';
  question: string;
  enQuestion: string;
  cause: string;
  enCause: string;
  solution: string;
  enSolution: string;
  proTip: string;
  enProTip: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'curdling-problem',
    category: 'curdling',
    question: '為什麼做覆盆子/橙味/檸檬蘇打時，鮮奶油會結成「豆腐腦」狀凝塊？',
    enQuestion: 'Why does heavy cream curdle into clumps when making raspberry, citrus, or lemon sodas?',
    cause: '果酸引發的酪蛋白酸凝變性（Casein Acid Precipitation）。當液體 pH 值降至酪蛋白等電點 (pH 4.6) 以下時，乳蛋白分子相互吸引聚集沉澱，屬於正常的食物化學現象。',
    enCause: 'Casein Acid Precipitation. When liquid pH drops below the casein isoelectric point (pH 4.6), milk protein molecules attract each other and precipitate. This is normal food chemistry.',
    solution: '三大必勝法則：① 務必使用乳脂含量 30%~36% 的【重脂厚奶油 (Heavy Cream)】或 Half-and-Half，高乳脂的脂肪球能包裹蛋白質阻隔酸液；② 糖漿加好後，【先倒入氣泡水充分攪勻稀釋酸度】，最後一步再加奶；③ 用長柄吧勺背部引流緩緩浮於最頂部。',
    enSolution: 'Three Golden Rules: ① Always use heavy cream with 30%-36% milk fat or half-and-half; the abundant fat globules coat proteins and shield them from acid; ② After pumping syrup, pour in chilled sparkling water and stir thoroughly first to dilute acidity BEFORE adding cream; ③ Float cream gently on top using the back of a bar spoon.',
    proTip: '如果是全脂牛奶或脫脂牛奶，蛋白質含量高而脂肪少，極易結塊！做意式奶油蘇打請徹底放棄普通牛奶。',
    enProTip: 'Whole milk or skim milk has high protein and low fat, which will curdle instantly! Never use regular drinking milk for Italian cream sodas.'
  },
  {
    id: 'fizz-retention',
    category: 'fizz',
    question: '為什麼自製的意式蘇打氣泡消散極快，喝幾口就變成「糖水」？',
    enQuestion: 'Why does my homemade Italian soda lose carbonation so fast and turn flat in a few sips?',
    cause: '二氧化碳 (CO2) 的物理逸出受「溫度」與「核化點 (Nucleation Sites)」主導。常溫液體、粗糙帶霜的冰塊表面，以及猛烈的垂直倒水與攪拌，都會急劇催化氣泡瞬間逃逸。',
    enCause: 'CO2 degassing is governed by temperature and nucleation sites. Room-temperature liquids, rough frost-covered ice cubes, and aggressive vertical pouring or stirring drastically accelerate gas escape.',
    solution: '① 氣泡水必須提前在冰箱 0°C~3°C 充分冷藏，亨利定律表明低溫下氣體溶解度提升數倍；② 將杯身傾斜 45 度，沿杯壁平穩緩慢注入；③ 剛從冷凍室取出的冰塊可用冷水沖一下洗去表面粗糙微霜再入杯。',
    enSolution: '① Sparkling water must be pre-chilled in the fridge to 0°C-3°C (Henry\'s Law proves gas solubility is multiplied at low temperatures); ② Tilt the glass at a 45-degree angle and pour gently down the inner glass wall; ③ Quick-rinse freezer ice cubes with cold tap water to melt away micro-frost nucleation points before adding.',
    proTip: '調好後切勿拿吸管像旋渦一樣瘋狂攪拌！只需用吧勺由底向上輕輕提拉 1~2 次即可。',
    enProTip: 'Never vigorously stir with a straw! Lift once or twice gently from the bottom with a bar spoon.'
  },
  {
    id: 'layering-magic',
    category: 'layering',
    question: '如何調製出如夕陽晚霞般完美的「雙色/三色漸層」分層效果？',
    enQuestion: 'How do I achieve clean, vivid sunset gradient dual-layer or triple-layer separations?',
    cause: '液體比重密度（Specific Gravity / Brix 糖度階梯）原理。高糖度液體比重最高（> 1.25 g/cm³），氣泡水比重約 1.00，果汁與厚奶油比重較輕（< 1.02）。',
    enCause: 'Specific Gravity & Brix density gradients. High-sugar syrup has high density (> 1.25 g/cm³), sparkling water is ~1.00, while fresh citrus juice or heavy cream is lighter (< 1.02).',
    solution: '遵循嚴格的注液順序：① 底部直接壓入高密度濃縮糖漿；② 填滿碎冰（碎冰是關鍵的物理阻尼屏障，能防止上下層對流衝擊）；③ 貼著杯壁微注入氣泡水至 7 分滿；④ 頂部用吧勺背面抵住浮冰，將鮮奶油或橙汁極慢滴注在頂層。',
    enSolution: 'Follow the strict pour order: ① Pump high-density syrup directly onto the glass bottom; ② Pack glass 3/4 full with pebble ice (ice serves as a physical baffle preventing convective mixing); ③ Slowly pour chilled club soda down the glass wall to 75% full; ④ Place the back of a bar spoon against the top ice and gently trickle cream or juice onto the surface.',
    proTip: '碎冰 (Pebble Ice) 越多，冰塊縫隙產生的表面張力越強，分層邊界線就越清晰銳利！',
    enProTip: 'The denser the pebble ice packing, the higher the surface tension barrier, yielding razor-sharp layer boundaries!'
  },
  {
    id: 'syrup-selection',
    category: 'syrup',
    question: '商業糖漿 (Torani / Monin) 與自製新鮮果醬糖漿有什麼區別？',
    enQuestion: 'What is the difference between commercial syrups (Torani / Monin) and homemade fruit puree syrup?',
    cause: '商業糖漿經過嚴格的波美度 (Brix 65%~68%) 與酸度標定，防腐保質期長達 2 年，且壓頭出液標準精準；自製果醬含有天然果膠與果泥纖維，果香更鮮活但糖度不均且不易久放。',
    enCause: 'Commercial syrups are precisely calibrated to 65%-68% Brix and standardized acidity, providing a 2-year shelf life and exact pump volume. Homemade purees contain pectin and fruit pulp fiber, offering fresher taste but variable sweetness and short shelf life.',
    solution: '如果追求效率與經典咖啡館 1:1 風味，推薦備齊 Torani 或 Monin 經典風味；若自製糖漿，請按照 1:1 (糖:水) 配合新鮮水果熬煮並過細篩去渣，熬好後趁熱裝進消毒玻璃瓶，冷藏並在 2 週內用完。',
    enSolution: 'For effortless 1:1 café replicas, stock standard Torani or Monin 750ml bottles. For homemade syrups, simmer fruit with a 1:1 sugar-to-water simple syrup, strain through fine mesh to remove pulp, bottle while hot in sterile glass jars, and refrigerate up to 2 weeks.',
    proTip: '自製果泥糖漿若要調製 Cremosa 奶油蘇打，務必用濾布徹底濾去果肉纖維，纖維是引起奶油沉澱的分離劑。',
    enProTip: 'When making fruit syrups for Cremosas, strain through cheesecloth to remove all pulp fibers, as suspended fiber particles promote cream separation.'
  },
  {
    id: 'sparkling-water-type',
    category: 'water',
    question: 'Club Soda、天然氣泡礦泉水 (San Pellegrino / Perrier) 與家用氣泡機該怎麼選？',
    enQuestion: 'Club Soda vs. Natural Sparkling Water (San Pellegrino / Perrier) vs. Home Soda Maker: Which is best?',
    cause: '水質中的礦物質（碳酸氫鈉、鈣、鎂）會直接影響氣泡的爆裂感與舌尖後味。',
    enCause: 'Dissolved minerals (sodium bicarbonate, calcium, magnesium) directly govern bubble prickle intensity and aftertaste profile.',
    solution: '① 【俱樂部蘇打 (Club Soda)】：添加了微量礦物鹽與小蘇打，口感清冽利落，最能凸顯水果糖漿的鮮甜；② 【聖培露 (San Pellegrino)】：意式血統，氣泡如針尖般細密，適合優雅的草本花香與西西里 Spritz；③ 【家用氣泡機 (SodaStream)】：成本最低（每杯僅需 $0.10），且可打出最強烈沙口感！',
    enSolution: '① Club Soda: Contains trace mineral salts and sodium bicarbonate, providing a crisp, clean bite that best accentuates sweet fruit syrups; ② San Pellegrino: Authentic Italian heritage with fine needle-point bubbles, ideal for delicate botanical floras and Sicilian spritzes; ③ Home Soda Maker (SodaStream): Lowest cost (< $0.10/glass) and customizable maximum fizz level.',
    proTip: '用氣泡機打水時，務必將過濾水先冷藏至接近 0°C 再打氣，氣泡充盈度是常溫打水的 3 倍以上。',
    enProTip: 'When using a home soda maker, always chill filtered water near 0°C before carbonating. CO2 absorption is over 3x higher than at room temperature.'
  }
];

export const TroubleshootingGuide: React.FC = () => {
  const { t, lang } = useI18n();
  const [openId, setOpenId] = useState<string | null>('curdling-problem');
  const [filterCat, setFilterCat] = useState<string>('all');

  const filteredFaqs = filterCat === 'all' 
    ? FAQS 
    : FAQS.filter(f => f.category === filterCat);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>{t('guide.badge')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t('guide.title')}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {t('guide.subtitle')}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'all', label: t('guide.tabAll'), icon: Sparkles },
          { id: 'curdling', label: t('guide.tabCurdling'), icon: Droplets },
          { id: 'fizz', label: t('guide.tabFizz'), icon: ThermometerSnowflake },
          { id: 'layering', label: t('guide.tabLayering'), icon: Layers },
          { id: 'syrup', label: t('guide.tabSyrup'), icon: FlaskConical },
          { id: 'water', label: t('guide.tabWater'), icon: BookOpen }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setFilterCat(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterCat === item.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-sky-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {lang === 'en' ? faq.enQuestion : faq.question}
                  </h3>
                </div>

                <div className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-4 text-xs sm:text-sm animate-in fade-in duration-200">
                  
                  {/* Cause */}
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 border border-rose-100 dark:border-rose-900/40">
                    <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">{t('guide.cause')}</span>
                      <p className="leading-relaxed opacity-90">{lang === 'en' ? faq.enCause : faq.cause}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">{t('guide.solution')}</span>
                      <p className="leading-relaxed opacity-90">{lang === 'en' ? faq.enSolution : faq.solution}</p>
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">{t('guide.proTip')}</span>
                      <p className="leading-relaxed opacity-90">{lang === 'en' ? faq.enProTip : faq.proTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
