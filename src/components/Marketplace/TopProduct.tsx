'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { ProductType } from '@/type/ProductType';
import { APIHost, fetchProducts } from '@/api/api';
import Rate from '../Other/Rate';

const TopProduct = () => {
    const router = useRouter()

    const handleDetailProduct = (productId: string) => {
        // redirect to shop with category selected
        router.push(`/product/default?id=${productId}`);
    };
    const [topProducts, setTopProducts] = useState<ProductType[]>([]);

    // Fetch products and select the top 5 with highest prices
    const loadProducts = async () => {
        try {
            const products: ProductType[] = await fetchProducts(); // Fetch products from API
            // Sort products by price in descending order and select the top 5
            const sortedProducts = products
                .sort((a, b) => b.price - a.price) // Sort by price in descending order
                .slice(0, 6); // Get top 5 products
            setTopProducts(sortedProducts); // Save top 5 products to state
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch the products when the component mounts
    useEffect(() => {
        loadProducts();
    }, []);
    return (
        <div className="top-product bg-surface md:mt-[60px] mt-10 md:py-[60px] py-10">
            <div className="container">
                <div className="heading flex items-center justify-between gap-5 flex-wrap">
                    <div className="heading3">Top Rated Products</div>
                    <Link href='/shop/breadcrumb-img' className='text-button pb-0.5 border-b-2 border-black'>View All
                    </Link>
                </div>
                <div className="list grid xl:grid-cols-3 sm:grid-cols-2 gap-4 md:mt-10 mt-6">
                    {topProducts.map((product) => (
                        <div key={product.id} className="product-item style-marketplace-list flex items-center gap-2 bg-white py-5 px-[39px] rounded cursor-pointer"
                            onClick={() => handleDetailProduct('149')}>
                            <div className="bg-img lg:w-[150px] w-[120px] flex-shrink-0 aspect-1/1">
                                <Image width={5000} height={5000} className="w-full h-full object-cover" src={APIHost+product.images[0] || "/images/product/1000x1000.png"} alt="" />
                            </div>
                            <div className="product-infor">
                                <span className="caption2 uppercase block">UMINO</span>
                                <span className="caption2 mt-2">{product.name}</span>
                                <div className="flex gap-0.5 mt-2">
                                <Rate currentRate={product.rate} size={16} />
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="text-title inline-block">${product.price}</span>
                                    <del className="caption2 text-secondary">${product.price + 350}</del>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopProduct
