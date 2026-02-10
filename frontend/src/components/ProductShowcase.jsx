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

        .instagram-icon {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .instagram-icon {
          opacity: 0.9;
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
              
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-icon absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white/90 transition-all"
              >
                <svg
                  className="w-5 h-5 text-pink-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom text */}
      <div className="text-center mt-12">
        <p className="text-amber-900/60 font-light text-sm tracking-wide">
          {language === 'ta' ? 'আমাদের প্রিমিয়াম সৃষ্টি অন্বেষণ করুন' : 'Discover Our Premium Creations'}
        </p>
      </div>
    </section>
  );
};

export default ProductShowcase;
