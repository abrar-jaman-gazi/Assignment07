import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/api';
import AuthButtons from './AuthButtons';
import { bnDigits, money, pct, unitText } from '@/lib/utils';
export default async function Navbar(){
 const [cats, products] = await Promise.all([getCategories(),getProducts()]);
 const date = new Intl.DateTimeFormat('bn-BD',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Dhaka'}).format(new Date());
 return <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#fffdf8]/95 backdrop-blur">
  <div className="container-shell py-3"><div className="flex flex-wrap items-center justify-between gap-3">
   <Link href="/" className="group"><div className="text-xl font-black tracking-tight text-stone-950">🛒 বাজার দর</div><div className="text-xs text-stone-500">{date}</div></Link>
   <AuthButtons/>
  </div>
  <nav className="mt-3 flex gap-1 overflow-x-auto pb-1">{cats.map(c=><Link key={c.slug} href={`/category/${c.slug}`} className="nav-link"><span>{c.icon}</span>{c.name}</Link>)}</nav></div>
  <div className="ticker"><div className="ticker-track">{[...products,...products].map((p,i)=><span key={`${p.id}-${i}`} className="ticker-item"><span className="ticker-emoji">{p.emoji}</span><strong className="ticker-name">{p.name}</strong><b>{money(p.price)}/{unitText(p.unit).replace('প্রতি ','')}</b><em className={p.change>0?'up':p.change<0?'down':'flat'}>{pct(p.change)}</em></span>)}</div></div>
 </header>
}
