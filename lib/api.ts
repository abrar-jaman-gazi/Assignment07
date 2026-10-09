import { categories as fallbackCategories, fallbackProducts } from '@/lib/data';
import type { Category, Product } from '@/types';
import { normalizeUnit } from '@/lib/utils';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.api-store.workers.dev/api/bazardor';
async function request<T>(path:string): Promise<T> {
 const res = await fetch(`${API_BASE}${path}`, { next:{ revalidate: 300 } });
 if (!res.ok) throw new Error(`API ${res.status}`);
 return res.json();
}
const toNumber = (value: unknown, fallback = 0) => {
 const n = Number(String(value ?? '').replace(/[,%▲▼+\s]/g, ''));
 return Number.isFinite(n) ? n : fallback;
};

const readChange = (p: any, fallback = 0) => {
 const candidates = [
  p?.change,
  p?.changePercent,
  p?.changePercentage,
  p?.percentageChange,
  p?.percentChange,
  p?.priceChangePercent,
  p?.price_change_percent,
  p?.price_change_percentage,
  p?.priceChangePercentage,
  p?.dailyChange,
  p?.dailyChangePercent,
  p?.todayChange,
  p?.todayChangePercent,
  p?.percentage,
  p?.percent,
  p?.change_percent,
  p?.change_percentage,
  p?.daily_change_percent,
 ];
 for (const value of candidates) {
  if (value !== undefined && value !== null && value !== '') {
   const n = toNumber(value, NaN);
   if (Number.isFinite(n)) return n;
  }
 }
 return fallback;
};

const normalizeProduct = (raw:any, index:number):Product => {
 const p = raw?.product ?? raw;
 const fallback = fallbackProducts.find((item) => String(item.id) === String(p.id) || item.slug === p.slug) ?? fallbackProducts[index];
 return {
  id:Number(p.id ?? index+1),
  slug:String(p.slug ?? p.id ?? fallback?.slug ?? index+1),
  name:p.name ?? p.title ?? p.productName ?? fallback?.name ?? 'পণ্য',
  emoji:p.emoji ?? p.icon ?? fallback?.emoji ?? '🛒',
  category:p.category ?? p.categorySlug ?? p.category_id ?? fallback?.category ?? 'sobji',
  categoryName:p.categoryName ?? p.category_name ?? fallback?.categoryName,
  unit:normalizeUnit(p.unit ?? p.unitName ?? p.unit_name ?? fallback?.unit ?? 'কেজি'),
  price:toNumber(p.price ?? p.currentPrice ?? p.todayPrice ?? p.today_price ?? fallback?.price ?? 0),
  change:readChange(p, (() => {
   const current = toNumber(p.price ?? p.currentPrice ?? p.todayPrice ?? p.today_price, NaN);
   const previous = toNumber(p.previousPrice ?? p.previous_price ?? p.yesterdayPrice ?? p.yesterday_price ?? p.lastPrice ?? p.last_price, NaN);
   return Number.isFinite(current) && Number.isFinite(previous) && previous !== 0 ? ((current - previous) / previous) * 100 : (fallback?.change ?? 0);
  })()),
  description:p.description ?? p.summary ?? fallback?.description,
  markets:p.markets ?? p.marketPrices ?? p.market_prices ?? [],
 };
};

export async function getProducts(category?:string){ try { const data:any = await request<any>(category?`/products?category=${encodeURIComponent(category)}`:'/products'); const list = Array.isArray(data)?data:(data.products ?? data.data ?? []); return list.map(normalizeProduct); } catch { return category ? fallbackProducts.filter(p=>p.category===category) : fallbackProducts; } }
export async function getProduct(slug:string){ try { const data:any = await request<any>(`/products/${encodeURIComponent(slug)}`); return normalizeProduct(data, fallbackProducts.findIndex(p=>p.slug===slug)); } catch { try { const data:any = await request<any>('/products'); const list=Array.isArray(data)?data:(data.products ?? data.data ?? []); const normalized=list.map(normalizeProduct); return normalized.find(p=>p.slug===slug || String(p.id)===slug) ?? fallbackProducts.find(p=>p.slug===slug || String(p.id)===slug) ?? null; } catch { return fallbackProducts.find(p=>p.slug===slug || String(p.id)===slug) ?? null; } } }
export async function getCategories(){ try { const data:any = await request<any>('/categories'); const list=Array.isArray(data)?data:(data.categories ?? data.data ?? []); return list.map((c:any)=>({slug:c.slug ?? c.id ?? c.category, name:c.name ?? c.title ?? c.category, icon:c.icon ?? '🛒', count:c.count})); } catch { return fallbackCategories; } }
