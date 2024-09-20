'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import MenuOne from '@/components/Header/Menu/MenuOne'
import ShopBreadCrumbImg from '@/components/Shop/ShopBreadCrumbImg';
import productData from '@/data/Product.json'
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType';
import { fetchProducts } from '@/api/api';

export default function BreadcrumbImg() {
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const [topProducts, setTopProducts] = useState<ProductType[]>([]);

    const loadProducts = async () => {
        try {
            const products: ProductType[] = await fetchProducts();
            const sortedProducts = products
            setTopProducts(sortedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                {/* <MenuOne props="bg-transparent" /> */}
            </div>
            <ShopBreadCrumbImg data={topProducts} productPerPage={12} dataType={type} />
            <Footer />
        </>
    )
}
