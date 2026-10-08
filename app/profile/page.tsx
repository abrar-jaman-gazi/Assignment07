'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
export default function Profile(){const router=useRouter();const {data:session,isPending}=authClient.useSession();useEffect(()=>{if(!isPending&&!session?.user){toast.error('প্রোফাইল দেখতে আগে সাইন ইন করুন');router.replace('/signin?callbackURL=/profile')}},[isPending,session,router]);if(isPending||!session?.user)return <div className="container-shell py-14"><div className="auth-card mx-auto"><div className="skeleton h-10 w-40 rounded"/></div></div>;return <div className="container-shell py-14"><div className="mx-auto max-w-2xl"><div className="section-kicker">আমার প্রোফাইল</div><h1 className="section-title mt-2">আপনার অ্যাকাউন্ট</h1><div className="card mt-7 p-7"><div className="flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-full bg-[#f0e7d7] text-2xl font-black">{session.user.name?.slice(0,1)||'👤'}</div><div><h2 className="text-xl font-black">{session.user.name}</h2><p className="text-sm text-stone-500">{session.user.email}</p></div></div><Link href="/profile/update" className="btn btn-primary mt-7">তথ্য আপডেট করুন</Link></div></div></div>}
