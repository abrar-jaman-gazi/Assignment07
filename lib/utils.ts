export const bnDigits = (value: number | string) =>
  String(value).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export const money = (value: number) =>
  `${bnDigits(new Intl.NumberFormat('en-IN').format(value))} টাকা`;

export const pct = (value: number | string | null | undefined) => {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric) || numeric === 0) return '— ০.০%';
  const sign = numeric > 0 ? '▲' : '▼';
  return `${sign} ${bnDigits(Math.abs(numeric).toFixed(1))}%`;
};

export const normalizeUnit = (unit: string | null | undefined) => {
  const value = String(unit ?? 'কেজি').trim();
  const normalized = value.toLowerCase().replace(/[.\s_-]/g, '');
  if (['kg', 'kgs', 'kilo', 'kilos', 'kilogram', 'kilograms', 'কিলোগ্রাম'].includes(normalized)) return 'কেজি';
  if (['g', 'gm', 'gram', 'grams', 'গ্রাম'].includes(normalized)) return 'গ্রাম';
  if (['l', 'lt', 'liter', 'litre', 'liters', 'litres', 'লিটার'].includes(normalized)) return 'লিটার';
  if (['piece', 'pieces', 'pc', 'pcs', 'পিস'].includes(normalized)) return 'পিস';
  if (['dozen', 'doz', 'ডজন'].includes(normalized)) return 'ডজন';
  return value;
};

export const unitText = (unit: string) => `প্রতি ${normalizeUnit(unit)}`;

export const parseBengaliNumber = (value: string | number) =>
  Number(
    String(value)
      .replace(/[০-৯]/g, (d) => '0123456789'['০১২৩৪৫৬৭৮৯'.indexOf(d)])
      .replace(/,/g, '')
  );
