import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import Link from 'next/link';
export const metadata={title:'বাজার দর — আজকের বাজারের দাম',description:'প্রয়োজনীয় পণ্যের দাম এক নজরে।'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body><Providers><Navbar/><main>{children}</main><footer className="mt-20 border-t border-stone-200 bg-[#f8f3e9]"><div className="container-shell flex flex-col gap-3 py-7 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between"><Link href="/" className="font-bold text-stone-900">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</Link><span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span></div></footer></Providers></body></html>}
