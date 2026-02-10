import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ProductCarousel = ({ products }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, products.length]);

  if (products.length === 0) return null;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const backendUrl = apiUrl.replace('/api', '');
    return `${backendUrl}/uploads/images/${imagePath}`;
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const currentProduct = products[currentIndex];
  const displayName = currentProduct[language === 'ta' ? 'nameTA' : 'nameEN'];
  const displayDesc = currentProduct[language === 'ta' ? 'descriptionTA' : 'descriptionEN'];
  const minPrice = currentProduct.variants 
    ? Math.min(...currentProduct.variants.map(v => v.price))
    : 'N/A';

  return (
    <section className="py-12 bg-gradient-to-r from-ramyaas-600 to-ramyaas-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Carousel Container */}
          <div
            className="relative h-96 bg-white rounded-xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Slides */}
            <div className="relative h-full flex items-stretch">
              {/* Left Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-ramyaas-700 mb-3">
                  {displayName}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-3">
                  {displayDesc}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-2xl md:text-3xl font-bold text-ramyaas-600">
                    From ₹{minPrice}
                  </span>
                </div>
              </div>

              {/* Right Image */}
              <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
                {currentProduct.image && (
                  <img
                    src={getImageUrl(currentProduct.image)}
                    alt={displayName}
                    className="h-64 w-64 object-contain drop-shadow-lg"
                  />
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10 transition-all"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-10 transition-all"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 w-3 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
