'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Product from '../Product/Product';
import { countdownTime } from '@/store/countdownTime';
import { fetchProducts } from '@/api/api';
import { ProductType } from '@/type/ProductType'; // Ensure this path is correct


const Deal = () => {
  const [timeLeft, setTimeLeft] = useState(countdownTime());
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();

  // Timer for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(countdownTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadProducts = async (): Promise<void> => {
    try {
      const responseData: ProductType[] = await fetchProducts(); // Fetch products from API
  
      // Filter products to keep only those with a non-null FlashDeal
      const filteredProducts = responseData.filter(product => product.sale == 1);
  
      // Update state with the filtered product data
      setProducts(filteredProducts);
      console.log(filteredProducts)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

  // Fetch products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const handleDetailProduct = (productId: string) => {
    router.push(`/product/default?id=${productId}`);
  };

  return (
    <div className="md:pt-[60px] pt-10">
      <div className="container">
        <div className="heading flex items-center justify-between gap-5 flex-wrap">
          <div className="left flex items-center gap-6 gap-y-3 flex-wrap">
            <div className="heading3">Deals of the week</div>
            <div className="deal-time bg-red py-1 px-5 rounded-lg">
              <div className="heading6 text-white">
                <span className="countdown-day">
                  {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                </span>
                <span>D : </span>
                <span className="countdown-hour">
                  {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                </span>
                <span>H : </span>
                <span className="countdown-minute">
                  {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
                </span>
                <span>M : </span>
                <span className="countdown-second">
                  {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
                </span>
                <span>S</span>
              </div>
            </div>
          </div>
          <a href="/shop/breadcrumb-img" className="text-button pb-1 border-b-2 border-black">
            View All Deals
          </a>
        </div>

        {products.length > 0 ? (
          <div className="list grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
            {products.map((item) => (
              <Product data={item} type="marketplace" key={item.id} />
            ))}
          </div>
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Deal;
