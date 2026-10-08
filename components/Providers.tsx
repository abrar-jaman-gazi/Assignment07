'use client';
import { Toaster } from 'react-hot-toast';
export default function Providers({children}:{children:React.ReactNode}){ return <><Toaster position="top-right" toastOptions={{duration:2800}}/><div>{children}</div></>; }
