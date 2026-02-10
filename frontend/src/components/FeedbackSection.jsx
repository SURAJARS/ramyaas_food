import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FeedbackSection = () => {
  const { language } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cardImages, setCardImages] = useState({});
  const sectionRef = useRef(null);
  const imageIntervals = useRef({});

  // Feedback data with multiple images per card
  const feedbackCards = [
    {
      id: 1,
      name: 'Priya Kumar',
      location: 'Chennai, Tamil Nadu',
      feedback: 'Absolutely love the quality! Fresh and delicious every time.',
      imageCount: 3,
      rotation: -2
    },
    {
      id: 2,
      name: 'Rajesh Singh',
      location: 'Bangalore, Karnataka',
      feedback: 'Best homemade snacks I have ever tasted. Highly recommended!',
      imageCount: 2,
      rotation: 2
    },
    {
      id: 3,
      name: 'Ananya Patel',
      location: 'Hyderabad, Telangana',
      feedback: 'The podi and pickles are exactly what I needed. Pure quality.',
      imageCount: 4,
      rotation: -2
    },
    {
      id: 4,
      name: 'Vikram Reddy',
      location: 'Mumbai, Maharashtra',
      feedback: 'Premium quality and amazing taste. Worth every rupee!',
      imageCount: 3,
      rotation: 2
    }
  ];

  // Load feedback images dynamically
  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const card of feedbackCards) {
        images[card.id] = [];
        for (let i = 1; i <= card.imageCount; i++) {
          const imagePath = `../assets/feedback/feedback${card.id}_${i}.jpeg`;
          try {
            const image = require(imagePath);
            images[card.id].push(image);
          } catch (err) {
            // If image doesn't exist, use placeholder
            images[card.id].push(null);
          }
        }
      }
      setCardImages(images);
    };
    loadImages();
  }, []);

  // Initialize active images
  useEffect(() => {
    const initial = {};
    feedbackCards.forEach(card => {
      initial[card.id] = 0;
    });
    setActiveImageIndex(initial);
  }, []);

  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        setScrollPosition(Math.max(0, scrolled / 8));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle card hover - cycle through images
  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
    
    // Clear any existing interval for this card
    if (imageIntervals.current[cardId]) {
      clearInterval(imageIntervals.current[cardId]);
    }

    const images = cardImages[cardId] || [];
    if (images.length > 1) {
      imageIntervals.current[cardId] = setInterval(() => {
        setActiveImageIndex(prev => ({
          ...prev,
          [cardId]: (prev[cardId] + 1) % images.length
        }));
      }, 1500);
    }
  };

  const handleCardLeave = (cardId) => {
    setHoveredCard(null);
    
    // Clear interval when hover ends
    if (imageIntervals.current[cardId]) {
      clearInterval(imageIntervals.current[cardId]);
      delete imageIntervals.current[cardId];
    }
    
    // Reset to first image
    setActiveImageIndex(prev => ({
      ...prev,
      [cardId]: 0
    }));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-20 pb-24 bg-gradient-to-b from-amber-50 to-orange-50"
    >
      {/* Decorative background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-yellow-200/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes goldGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(217, 119, 6, 0.4), 0 10px 30px rgba(0, 0, 0, 0.2); }
          50% { box-shadow: 0 0 30px rgba(217, 119, 6, 0.6), 0 10px 40px rgba(0, 0, 0, 0.3); }
        }
        .feedback-heading {
          animation: fadeInUp 0.8s ease-out;
        }
        .feedback-card {
          animation: fadeInUp 0.8s ease-out;
        }
        .feedback-card:nth-child(1) { animation-delay: 0.15s; }
        .feedback-card:nth-child(2) { animation-delay: 0.25s; }
        .feedback-card:nth-child(3) { animation-delay: 0.35s; }
        .feedback-card:nth-child(4) { animation-delay: 0.45s; }
        .card-container {
          animation: float 4s ease-in-out infinite;
        }
        .card-container.hovered {
          animation: none;
        }
        .card-image {
          transition: opacity 0.4s ease;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="feedback-heading font-serif text-5xl md:text-6xl font-bold text-amber-900 mb-6">
            {language === 'ta' ? 'எங்கள் மகிழ்ச்சியான வாடிக்கையாளர்களால் நேசிக்கப்படுகிறது' : 'Loved by Our Happy Customers'}
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-amber-600"></div>
            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {feedbackCards.map((card) => (
            <div
              key={card.id}
              className="feedback-card"
              onMouseEnter={() => handleCardHover(card.id)}
              onMouseLeave={() => handleCardLeave(card.id)}
            >
              <div
                className="card-container relative transition-all duration-300 ease-out"
                style={{
                  transform: hoveredCard === card.id 
                    ? 'rotate(0deg) scale(1.05)' 
                    : `rotate(${card.rotation}deg) scale(1)`,
                }}
              >
                {/* Card container */}
                <div
                  className="relative rounded-xl overflow-hidden shadow-xl bg-white"
                  style={{
                    aspectRatio: '9/16',
                    animation: hoveredCard === card.id ? 'goldGlow 2s ease-in-out infinite' : 'none',
                    boxShadow: hoveredCard === card.id 
                      ? '0 0 30px rgba(217, 119, 6, 0.6), 0 20px 40px rgba(0, 0, 0, 0.3)'
                      : '0 10px 30px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {/* Image carousel */}
                  <div className="relative w-full h-full">
                    {cardImages[card.id] && cardImages[card.id].length > 0 ? (
                      <>
                        {cardImages[card.id].map((image, idx) => (
                          image ? (
                            <img
                              key={idx}
                              src={image}
                              alt={`Feedback ${card.id}`}
                              className="card-image absolute inset-0 w-full h-full object-cover"
                              style={{
                                opacity: activeImageIndex[card.id] === idx ? 1 : 0
                              }}
                            />
                          ) : (
                            <div
                              key={idx}
                              className="card-image absolute inset-0 w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center"
                              style={{
                                opacity: activeImageIndex[card.id] === idx ? 1 : 0
                              }}
                            >
                              <div className="text-center">
                                <p className="text-3xl mb-2">📸</p>
                                <p className="text-sm text-amber-900">Image {idx + 1}</p>
                              </div>
                            </div>
                          )
                        ))}

                        {/* Image indicators */}
                        {cardImages[card.id].length > 1 && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {cardImages[card.id].map((_, idx) => (
                              <div
                                key={idx}
                                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor: activeImageIndex[card.id] === idx ? 'white' : 'rgba(255,255,255,0.5)'
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-4xl mb-2">⭐</p>
                          <p className="text-sm text-amber-900 font-semibold">{card.name}</p>
                        </div>
                      </div>
                    )}

                    {/* Gradient overlay at bottom for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Customer info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-serif font-bold text-lg mb-1">
                        {card.name}
                      </h3>
                      <p className="text-xs text-amber-100/80 mb-3">
                        📍 {card.location}
                      </p>
                      <p className="text-sm leading-snug text-white/90">
                        "{card.feedback}"
                      </p>
                    </div>

                    {/* Star rating */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2">
                      <span className="text-amber-300 text-sm font-semibold">★★★★★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-amber-900 font-medium mb-4">
            {language === 'ta' ? '500+ খুশি গ্রাহক আমাদের উপর বিশ্বাস করেন' : '500+ Happy Customers Trust Us'}
          </p>
          <div className="inline-block px-8 py-3 rounded-full bg-amber-100/50 border border-amber-300/50 backdrop-blur-sm">
            <p className="text-amber-900 font-semibold">
              {language === 'ta' ? '⭐ 4.9/5 রেটিং' : '⭐ 4.9/5 Rating'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
