export type Market = { bazar: string; location?: string; price: number; note?: string };
export type Product = {
  id: number; slug: string; name: string; emoji: string; category: string; categoryName?: string;
  unit: string; price: number; change: number; description?: string; markets?: Market[];
};
export type Category = { slug: string; name: string; icon: string; count?: number };
