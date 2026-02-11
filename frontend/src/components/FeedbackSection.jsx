import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import feedback1 from '../assets/feedback/feed1_1.jpeg';
import feedback2 from '../assets/feedback/feed2_1.jpeg';
import feedback3 from '../assets/feedback/feed3_1.jpeg';
import feedback4 from '../assets/feedback/feed4_1.jpeg';

const FeedbackSection = () => {
  const { language } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef(null);

  // Feedback data with single image per card
  const feedbackCards = [
    {
      id: 1,
      name: 'Priya Kumar',
      location: 'Chennai, Tamil Nadu',
      feedback: 'Absolutely love the quality! Fresh and delicious every time.',
      image: feedback1,
      rotation: -2
    },
    {
      id: 2,
      name: 'Rajesh Singh',
      location: 'Bangalore, Karnataka',
      feedback: 'Best homemade snacks I have ever tasted. Highly recommended!',
      image: feedback2,
      rotation: 2
    },
    {
      id: 3,
      name: 'Ananya Patel',
      location: 'Hyderabad, Telangana',
      feedback: 'The podi and pickles are exactly what I needed. Pure quality.',
      image: feedback3,
      rotation: -2
    },
    {
      id: 4,
      name: 'Vikram Reddy',
      location: 'Mumbai, Maharashtra',
      feedback: 'Premium quality and amazing taste. Worth every rupee!',
      image: feedback4,
      rotation: 2
    }
  ];

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
  };

  const handleCardLeave = (cardId) => {
    setHoveredCard(null);
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
                    <img
                      src={card.image}
                      alt={`Feedback from ${card.name}`}
                      className="w-full h-full object-cover"
                    />

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
            {language === 'ta' ? '500+ பேர் எங்களை நம்பி வாழ்க்கை' : '500+ Happy Customers Trust Us'}
          </p>
          <div className="inline-block px-8 py-3 rounded-full bg-amber-100/50 border border-amber-300/50 backdrop-blur-sm">
            <p className="text-amber-900 font-semibold">
              {language === 'ta' ? '⭐ 4.9/5 மதிப்பீடு' : '⭐ 4.9/5 Rating'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
