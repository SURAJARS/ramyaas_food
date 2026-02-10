import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import podiImage from '../assets/podi.jpeg';
import pickleImage from '../assets/pickle.jpeg';
import snacksImage from '../assets/snacks.jpeg';
import sweetsImage from '../assets/sweets.jpeg';

const CategoriesSection = () => {
  const { language } = useLanguage();
  const [cardRotations, setCardRotations] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef(null);
  const cardRefs = useRef({});

  const categories = [
    {
      id: 'sweets',
      nameEN: 'Sweets',
      nameTA: 'இனிப்பு',
      descEN: 'Handcrafted sweet treats',
      descTA: 'கையால் செய்யப்பட்ட இனிப்புகள்',
      image: sweetsImage
    },
    {
      id: 'pickle',
      nameEN: 'Pickle',
      nameTA: 'ஊறுகாய்',
      descEN: 'Homemade tangy preserves',
      descTA: 'கையால் தயாரிக்கப்பட்ட ஊறுகாய்',
      image: pickleImage
    },
    {
      id: 'snacks',
      nameEN: 'Snacks',
      nameTA: 'சுட்ட உணவுகள்',
      descEN: 'Crispy delicious bites',
      descTA: 'மொறுமொறுப்பான சுவையான உணவுகள்',
      image: snacksImage
    },
    {
      id: 'podi',
      nameEN: 'Podi',
      nameTA: 'பொடி',
      descEN: 'Traditional spice powder blends',
      descTA: 'பாரம்பரிய மசாலா பொடி',
      image: podiImage
    }
  ];

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e, cardId) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setCardRotations(prev => ({
      ...prev,
      [cardId]: { rotateX, rotateY }
    }));
  };

  const handleMouseLeave = (cardId) => {
    setCardRotations(prev => ({
      ...prev,
      [cardId]: { rotateX: 0, rotateY: 0 }
    }));
  };

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        setScrollPosition(Math.max(0, scrolled / 5));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rotation = cardRotations;

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-20 pb-24 bg-gradient-to-b from-amber-50 to-orange-50"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-yellow-200/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.3), inset 0 0 20px rgba(217, 119, 6, 0.1); }
          50% { box-shadow: 0 0 40px rgba(217, 119, 6, 0.6), inset 0 0 30px rgba(217, 119, 6, 0.2); }
        }
        @keyframes fadeUpIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .category-card {
          perspective: 1000px;
          transition: transform 0.3s ease-out;
        }
        .category-card-inner {
          transition: box-shadow 0.4s ease;
        }
        .category-card:hover .category-card-inner {
          animation: borderGlow 2s ease-in-out infinite;
        }
        .shimmer-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 0.6s ease-in-out;
          pointer-events: none;
        }
        .category-card:hover .shimmer-overlay {
          left: 100%;
        }
        .heading-entrance {
          animation: fadeUpIn 0.7s ease-out;
        }
        .card-entrance {
          animation: fadeUpIn 0.7s ease-out;
        }
        .card-entrance:nth-child(1) { animation-delay: 0.1s; }
        .card-entrance:nth-child(2) { animation-delay: 0.2s; }
        .card-entrance:nth-child(3) { animation-delay: 0.3s; }
        .card-entrance:nth-child(4) { animation-delay: 0.4s; }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-20">
          <h2 className="heading-entrance font-serif text-5xl md:text-6xl font-bold text-amber-900 mb-6">
            {language === 'ta' ? 'எங்கள் கையொழுக்க வகைகளை கண்டறியுங்கள்' : 'Explore Our Signature Categories'}
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-600"></div>
            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
          
          <p className="text-amber-700/70 text-lg font-medium tracking-wide">
            {language === 'ta' ? 'பாரம்பரிய சுவை, நவீன தரம்' : 'Traditional Taste, Modern Quality'}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="card-entrance category-card group"
              ref={(el) => {
                if (el) cardRefs.current[category.id] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, category.id)}
              onMouseLeave={() => handleMouseLeave(category.id)}
              style={{
                transform: rotation[category.id]
                  ? `perspective(1000px) rotateX(${rotation[category.id].rotateX}deg) rotateY(${rotation[category.id].rotateY}deg) scale(1.02)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
              }}
            >
              <div className="category-card-inner relative h-80 rounded-2xl overflow-hidden shadow-xl bg-gray-900">
                {/* Image with parallax */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url('${category.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: `center ${scrollPosition * -0.15}px`,
                    backgroundAttachment: 'cover',
                    transition: 'background-position 0.1s ease-out'
                  }}
                >
                  {/* Shimmer overlay */}
                  <div className="shimmer-overlay"></div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>

                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                  <h3 className="text-3xl font-serif font-bold mb-1">
                    {language === 'ta' ? category.nameTA : category.nameEN}
                  </h3>
                  <p className="text-sm text-amber-100/80">
                    {language === 'ta' ? category.descTA : category.descEN}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
