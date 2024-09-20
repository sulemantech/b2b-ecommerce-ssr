import React, { useEffect, useState } from 'react'
import productData from '@/data/Product.json'
import Product from '../Product/Product'
import { fetchProducts } from '@/api/api';
import { ProductType } from '@/type/ProductType';

const Recommend = () => {
    const [topProducts, setTopProducts] = useState<ProductType[]>([]);

    // Fetch products and select the top 5 with highest prices
    const loadProducts = async () => {
        try {
            const products: ProductType[] = await fetchProducts(); // Fetch products from API
            // Sort products by price in descending order and select the top 5
            const sortedProducts = products
                .sort((a, b) => b.price - a.price) // Sort by price in descending order
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
        <div className="recommend md:mt-[60px] mt-10">
            <div className="container">
                <div className="heading flex items-center justify-between gap-5 flex-wrap">
                    <div className="heading3">Recommended For You</div>
                    <a href='/shop-breadcrumb-img.html' className='text-button pb-0.5 border-b-2 border-black'>View All
                    </a>
                </div>
                <div
                    className="list grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                    {topProducts.slice(6, 12).map(item => (
                        <Product data={item} type='marketplace' key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recommend
