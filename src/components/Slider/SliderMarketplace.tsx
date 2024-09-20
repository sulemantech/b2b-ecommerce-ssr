'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
    {
        id: 1,
        imageSrc: '/images/product/apple.jpg',
        heading: 'Step Into New Worlds',
        subHeading: 'BEST SELLING',
        link: '/shop/breadcrumb-img',
    },
    {
        id: 2,
        imageSrc: '/images/product/watch.jpg',
        heading: 'Step Into New Worlds',
        subHeading: 'BEST SELLING',
        link: '/shop/breadcrumb-img',
    },
    {
        id: 3,
        imageSrc: '/images/product/Headphones.jpeg',
        heading: 'Step Into New Worlds',
        subHeading: 'BEST SELLING',
        link: '/shop/breadcrumb-img',
    },
    // Add more slides here
];

const SliderMarketplace = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 2000); // Change slide every 2 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
        );
    };

    const currentSlide = slides[currentIndex];

    return (
        <div className="slider-block style-marketplace lg:h-[500px] md:h-[400px] sm:h-[320px] h-[280px] w-full relative overflow-hidden">
            <div className="container pt-10 flex justify-end h-full w-full">
                <div className="slider-main lg:pl-5 h-full text-black w-full relative">
                    <div
                        className={`slider-item h-full w-full shadow-sm shadow-secondary flex items-center relative rounded-2xl overflow-hidden transition-opacity duration-500`}
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                        <div className="text-content md:pl-16 pl-5 basis-1/2 relative z-[1]">
                            <div className="text-sub-display">{currentSlide.subHeading}</div>
                            <div className="heading2 w-[80%] md:mt-5 mt-2">{currentSlide.heading}</div>
                            <a
                                href={currentSlide.link}
                                className="button-main bg-black text-white hover:bg-green md:mt-8 mt-3"
                            >
                                Shop Now
                            </a>
                        </div>
                        <div className={`absolute bottom-0 -right-40 scale-75 w-full h-full`}>
                            <Image
                                src={currentSlide.imageSrc}
                                width={1000}
                                height={2000}
                                alt="marketplace"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderMarketplace;
