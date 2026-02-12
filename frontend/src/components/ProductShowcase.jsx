import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { snackApi } from '../utils/api';

const ProductShowcase = () => {
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await snackApi.getAll();
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        setScrollPosition(Math.max(0, scrolled / 20));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create duplicated products array for seamless infinite scroll
  const displayProducts = products.length > 0 ? [...products, ...products] : [];

  const getImageHeight = (index) => {
    // Alternate between 220px and 260px for organic feel
    return index % 2 === 0 ? '220px' : '260px';
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden py-20 bg-gradient-to-b from-amber-50 to-orange-50"
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .showcase-heading {
          animation: fadeInUp 0.8s ease-out;
        }

        .products-track {
          animation: scroll-left 25s linear infinite;
        }

        .products-track:hover {
          animation-play-state: paused;
        }

        .product-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
        }

        .product-card:hover {
          transform: translateY(-8px);
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
        }

        .product-image {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .edge-fade {
          pointer-events: none;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15%;
          z-index: 10;
        }

        .edge-fade-left {
          left: 0;
          background: linear-gradient(to right, rgba(248, 243, 234, 1), rgba(248, 243, 234, 0));
        }

        .edge-fade-right {
          right: 0;
          background: linear-gradient(to left, rgba(248, 243, 234, 1), rgba(248, 243, 234, 0));
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-12">
        {/* Heading Section */}
        <div className="text-center">
          <h2 className="showcase-heading font-serif text-5xl md:text-6xl font-bold text-amber-900 mb-6">
            {language === 'ta' ? 'எங்கள் உருவாக்கங்களின் ஒரு பார்வை' : 'A Glimpse of Our Creations'}
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-600"></div>
            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
        </div>
      </div>

      {/* Products Carousel Container */}
      <div className="relative h-80 overflow-hidden">
        {/* Edge fade overlays */}
        <div className="edge-fade edge-fade-left"></div>
        <div className="edge-fade edge-fade-right"></div>

        {/* Scrolling track */}
        <div
          className="products-track flex gap-6 h-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            transform: `translateY(${scrollPosition * -0.05}px)`
          }}
        >
          {displayProducts.map((product, index) => (
            <div
              key={`${product.id}-${Math.floor(index / products.length)}`}
              className="product-card group relative rounded-xl overflow-hidden shadow-xl bg-white"
              style={{
                height: getImageHeight(index),
                minWidth: getImageHeight(index),
                aspectRatio: '1/1'
              }}
            >
              {/* Product Image */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              )}

              {/* Fallback for missing image */}
              {!product.image && (
                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl mb-2">🍛</p>
                    <p className="text-xs text-amber-900 font-semibold">
                      {product.name}
                    </p>
                  </div>
                </div>
              )}

              {/* Hover overlay with Instagram icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom text */}
      <div className="text-center mt-12">
        <p className="text-amber-900/60 font-light text-sm tracking-wide">
          {language === 'ta' ? 'எங்கள் பிரீமிய கிரியேशन்களைக் கண்டறியுங்கள்' : 'Discover Our Premium Creations'}
        </p>
      </div>
    </section>
  );
};

export default ProductShowcase;
