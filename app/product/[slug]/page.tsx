import { getProduct } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductProtected from '@/components/ProductProtected';
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=await getProduct(slug);if(!product) notFound();return <ProductProtected product={product}/>}
