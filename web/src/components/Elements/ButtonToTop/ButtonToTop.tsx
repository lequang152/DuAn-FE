'use client';
import React, { useEffect, useState } from 'react';

const ButtonToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            type="button"
            className={`fixed z-30 bottom-10 right-12 bg-[#2196F3] p-3 rounded-full transition shadow-sm ${
                isVisible ? `block` : `hidden`
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <i className="fas fa-arrow-up w-7 h-7 flex flex-col justify-center items-center text-[#FFC107]"></i>
        </button>
    );
};

export default ButtonToTop;
