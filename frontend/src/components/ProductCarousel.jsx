import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ProductCarousel = ({ products }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAutoPlay || products.length === 0) return;

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 40); // Fill over 4 seconds
      });
    }, 100);

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      setProgress(0);
    }, 4000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(progressInterval);
    };
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
    setProgress(0);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setProgress(0);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
    setProgress(0);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const currentProduct = products[currentIndex];
  const displayName = currentProduct[language === 'ta' ? 'nameTA' : 'nameEN'];
  const displayDesc = currentProduct[language === 'ta' ? 'descriptionTA' : 'descriptionEN'];
  const minPrice = currentProduct.variants 
    ? Math.min(...currentProduct.variants.map(v => v.price))
    : 'N/A';

  // Create an emotional headline based on product
  const emotionalHeadlines = {
    ta: ['தங்கப் பொறிப்பு. தூய மகிழ்ச்சி.', 'சுவையின் சொர்க்கம்', 'ஐம்பொறிகளுக்கான விருந்து'],
    en: ['Golden Crunch. Pure Happiness.', 'A Taste of Heaven', 'Traditional Magic in Every Bite']
  };
  const emotionalHeadline = emotionalHeadlines[language][currentIndex % emotionalHeadlines[language].length];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"></div>
      
      {/* Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(217, 119, 6, 0.1) 0%, transparent 50%)',
          animation: 'drift 8s ease-in-out infinite'
        }}
      ></div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="relative z-20 text-center lg:text-left">
            {/* Premium Brand Tag */}
            <div className="inline-block mb-6">
              <span className="text-xs md:text-sm font-semibold text-amber-700 bg-amber-100 px-4 py-2 rounded-full">
                {language === 'ta' ? '✨ பிரিமியம் தேர்வு' : '✨ Premium Selection'}
              </span>
            </div>

            {/* Emotional Headline */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-amber-900">{emotionalHeadline}</span>
            </h1>

            {/* Product Name */}
            <h2 className="text-xl md:text-2xl text-gray-700 mb-6 font-medium tracking-wide">
              {displayName}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              {displayDesc}
            </p>

            {/* Price Section */}
            <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
              <div>
                <p className="text-sm text-gray-500 mb-1 tracking-wide">
                  {language === 'ta' ? 'வெறும்' : 'Starting from'}
                </p>
                <p className="text-4xl md:text-5xl font-bold text-amber-700 font-serif">
                  ₹{minPrice}
                </p>
              </div>
              <div className="h-16 w-1 bg-gradient-to-b from-amber-400 to-transparent"></div>
              <p className="text-sm text-gray-600 max-w-[120px]">
                {language === 'ta' 
                  ? '100% கையால் தயாரிக்கப்பட்ட, பரிசாரம் இல்லை' 
                  : '100% Handmade, Pure Quality'}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-600 group-hover:from-amber-800 group-hover:to-orange-700 transition-all duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {language === 'ta' ? 'இப்போது வாங்கவும்' : 'Shop Now'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Slide Indicators with Progress */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-3">
              {products.map((_, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => goToSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-12 bg-gradient-to-r from-amber-700 to-orange-600'
                        : 'w-3 bg-amber-300 hover:bg-amber-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                  {index === currentIndex && (
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-amber-700 opacity-50"
                      style={{
                        transform: 'scale(1.3)',
                        width: 'calc(100% + 8px)',
                        height: 'calc(100% + 8px)',
                        left: '-4px',
                        top: '-4px'
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Image - Premium Card */}
          <div className="relative h-96 md:h-[500px] lg:h-[550px]">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl"></div>
            
            {/* Gradient Accent Blur */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-30"></div>
            
            {/* Image Container */}
            <div className="relative h-full flex items-center justify-center p-8 md:p-12">
              <div className="animate-float animate-fadeInScale">
                {currentProduct.image && (
                  <img
                    src={getImageUrl(currentProduct.image)}
                    alt={displayName}
                    className="h-80 w-80 md:h-96 md:w-96 object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 25px 50px rgba(217, 119, 6, 0.2))' }}
                  />
                )}
              </div>
            </div>

            {/* Decorative Corner Accent */}
            <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-amber-300 rounded-tr-3xl opacity-50"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-orange-300 rounded-bl-3xl opacity-50"></div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 pointer-events-none z-30 hidden lg:flex justify-between">
          <button
            onClick={prevSlide}
            className="pointer-events-auto group relative w-16 h-16 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-all duration-300 hover:shadow-xl"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-amber-900 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto group relative w-16 h-16 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/40 border border-white/30 flex items-center justify-center transition-all duration-300 hover:shadow-xl"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-amber-900 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white/50 transition-all"
          >
            <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white/50 transition-all"
          >
            <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
