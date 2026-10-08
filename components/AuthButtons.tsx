'use client';
import Link from 'next/link';
import { LogOut, UserRound } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
export default function AuthButtons(){
 const {data:session,isPending} = authClient.useSession();
 if(isPending) return <div className="h-9 w-28 animate-pulse rounded-xl bg-stone-100"/>;
 if(session?.user) return <div className="flex items-center gap-2"><Link href="/profile" className="btn btn-ghost"><UserRound size={16}/>{session.user.name || 'প্রোফাইল'}</Link><button className="btn btn-outline" onClick={async()=>{await authClient.signOut();toast.success('সফলভাবে সাইন আউট হয়েছে');}}><LogOut size={16}/>সাইন আউট</button></div>;
 return <div className="flex gap-2"><Link href="/signin" className="btn btn-ghost">সাইন ইন</Link><Link href="/signup" className="btn btn-primary">সাইন আপ</Link></div>;
}
