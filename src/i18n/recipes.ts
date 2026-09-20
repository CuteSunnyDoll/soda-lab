import { SupportedLang } from './ui';

export function getTranslatedTitle(id: string, name: string, enName: string, lang: SupportedLang): string {
  if (lang === 'en') {
    return enName;
  }
  return name;
}

export const EQUIPMENT_EN: Record<string, string> = {
  '16oz 高球柯林杯': '16oz Highball Collins Glass',
  '高球柯林杯': 'Highball Collins Glass',
  '高球玻璃杯': 'Highball Glass',
  '高球杯': 'Highball Glass',
  '高球杯或大肚葡萄酒杯': 'Highball or Large Wine Glass',
  '古典威士忌岩石杯或柯林杯': 'Rocks Glass or Collins Glass',
  'Torani 定量壓頭': 'Torani Dispensing Pump (1/4 oz)',
  '長柄吧勺': 'Long Stainless Bar Spoon',
  '吧勺': 'Bar Spoon',
  '吸管': 'Straw',
  '壓頭': 'Syrup Pump',
  '奶油噴槍': 'Whipped Cream Dispenser',
  '壓汁器': 'Citrus Squeezer',
  '壓汁棒 (Muddler)': 'Bar Muddler',
  '鹽邊盤': 'Glass Rimmer Tray',
  '果皮刀': 'Channel Knife / Peeler'
};

export function getTranslatedEquipment(tool: string, lang: SupportedLang): string {
  if (lang === 'en') {
    return EQUIPMENT_EN[tool] || tool;
  }
  return tool;
}
