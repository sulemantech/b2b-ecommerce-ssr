'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { APIHost, fetchProducts } from '@/api/api'; // Assuming fetchProducts fetches products data
import { ProductType } from '@/type/ProductType';
import Rate from '../Other/Rate';

const Collection = () => {
    const [topProducts, setTopProducts] = useState<ProductType[]>([]);

    // Fetch products and select the top 5 with highest prices
    const loadProducts = async () => {
        try {
            const products: ProductType[] = await fetchProducts(); // Fetch products from API
            // Sort products by price in descending order and select the top 5
            const sortedProducts = products
                .sort((a, b) => b.price - a.price) // Sort by price in descending order
                .slice(0, 4); // Get top 5 products
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
        <div className="collection-block md:pt-[60px] pt-10">
            <div className="container">
                <div className="heading flex items-center justify-between gap-5 flex-wrap">
                    <div className="heading3">Our Collections</div>
                    <Link href="/shop/breadcrumb-img" className="text-button pb-0.5 border-b-2 border-black">
                        View All
                    </Link>
                </div>
                <div className="list grid xl:grid-cols-4 sm:grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                    {topProducts.map((product) => (
                        <div key={product.id} className="item flex gap-3 px-5 py-6 border border-line rounded-2xl">
                            <Link href={`/shop/breadcrumb-img?id=${product.id}`} className="img-product w-[100px] h-[100px] flex-shrink-0">
                                <Image
                                    width={5000}
                                    height={5000}
                                    src={APIHost+product.images[0] || '/images/product/default.jpg'} // Fallback image
                                    className="w-full h-full object-contain"
                                    alt={product.name}
                                />
                            </Link>
                            <div className="text-content w-full">
                                <div className="heading6 pb-4">{product.name}</div>
                                <ul>
                                    <li className="caption1 text-secondary">Price: ${product.price}</li>
                                    <li > <Rate currentRate={product.rate} size={16} /></li>
                                </ul>
                                <Link href={`/shop/breadcrumb-img?id=${product.id}`} className="flex items-center gap-1.5 mt-4">
                                    <span className="text-button">View Product</span>
                                    <i className="ph-bold ph-caret-double-right text-sm"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
