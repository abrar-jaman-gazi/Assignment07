import Link from 'next/link';
import type { Product } from '@/types';
import { money, pct, unitText } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const up = product.change > 0;
  const down = product.change < 0;
  const badgeClass = up ? 'badge-up' : down ? 'badge-down' : 'badge-flat';

  return (
    <Link href={`/product/${product.slug}`} className="card block">
      <div className="flex items-start justify-between gap-3">
        <div className="product-emoji">{product.emoji}</div>
        <span className={badgeClass}>{pct(product.change)}</span>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-extrabold">{product.name}</h3>
        <p className="mt-1 text-sm text-stone-500">{unitText(product.unit)}</p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-xs text-stone-500">আজকের দাম</div>
          <div className="price mt-1">{money(product.price)}</div>
        </div>
        <span className={badgeClass}>{pct(product.change)}</span>
      </div>
    </Link>
  );
}
