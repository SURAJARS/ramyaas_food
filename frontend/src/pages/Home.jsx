import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { gettext } from '../utils/translations';
import ProductCarousel from '../components/ProductCarousel';
import CategoriesSection from '../components/CategoriesSection';
import FeedbackSection from '../components/FeedbackSection';
import ProductShowcase from '../components/ProductShowcase';
import FAQSection from '../components/FAQSection';
import logoImage from '../assets/logo.png';
import { snackApi } from '../utils/api';

const Home = () => {
  const { language } = useLanguage();
  const [featuredSnacks, setFeaturedSnacks] = useState([]);

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const response = await snackApi.getAll();
        // Get first 5 snacks for carousel
        setFeaturedSnacks(response.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching snacks:', error);
      }
    };
    fetchSnacks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Special Offer Banner */}
      <section className="bg-gradient-to-r from-ramyaas-600 to-ramyaas-700 text-white py-3 px-4 text-center">
        <p className="text-sm md:text-base font-semibold">
          🎉 <span className="inline-block ml-2">Special Offer: Free Shipping on Orders Above ₹500!</span>
        </p>
      </section>

      {/* Hero Section with Gradient */}
      <section className="bg-gradient-to-b from-ramyaas-50 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-ramyaas-700 mb-4 leading-tight">
                {gettext('ramyaas', language)}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                {gettext('tagline', language)}
              </p>
              
              {/* Trust Badges - Inline */}
              <div className="mb-8 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">✓</span>
                  <span className="font-semibold">{gettext('homemadeFresh', language)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">🌿</span>
                  <span className="font-semibold">{gettext('noPreservatives', language)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold">{gettext('yearsOfExcellence', language)}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/snacks"
                  className="bg-ramyaas-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {gettext('shopSnacks', language)}
                </Link>
                <Link
                  to="/catering"
                  className="border-2 border-ramyaas-600 text-ramyaas-600 px-8 py-3 rounded-lg font-semibold hover:bg-ramyaas-50 transition-smooth"
                >
                  {gettext('cateringServices', language)}
                </Link>
              </div>
            </div>

            {/* Right Side - Quality Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-2">🚫</div>
                <p className="font-bold text-gray-800">{gettext('noPalmOil', language)}</p>
                <p className="text-sm text-gray-600 mt-1">{gettext('pure', language)}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-2">🌱</div>
                <p className="font-bold text-gray-800">{language === 'ta' ? 'பாதுகாப்பு இல்லை' : 'No Preservatives'}</p>
                <p className="text-sm text-gray-600 mt-1">{gettext('freshAlways', language)}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-2">🌾</div>
                <p className="font-bold text-gray-800">{gettext('noMaida', language)}</p>
                <p className="text-sm text-gray-600 mt-1">{gettext('healthyChoice', language)}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 text-center hover:shadow-lg transition-all">
                <div className="text-4xl mb-2">⚗️</div>
                <p className="font-bold text-gray-800">{gettext('noAdditives', language)}</p>
                <p className="text-sm text-gray-600 mt-1">{gettext('naturalTaste', language)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredSnacks.length > 0 && (
        <section className="bg-white py-12 md:py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-ramyaas-700 mb-2 text-center">⭐ {language === 'ta' ? 'மிகவும் பிரபலமான பொருட்கள்' : 'Most Popular Products'}</h2>
            <p className="text-gray-600 text-center mb-8">{language === 'ta' ? '500+ வாடிக்கையாளர்களால் விரும்பப்பட்ட எங்கள் சிறந்த விற்பனைகள்' : 'Our bestselling favorites loved by 500+ customers'}</p>
            <ProductCarousel products={featuredSnacks} />
          </div>
        </section>
      )}

      {/* Stats Section - Trust & Social Proof */}
      <section className="bg-gradient-to-r from-ramyaas-600 to-ramyaas-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <p className="text-lg font-semibold">Happy Customers</p>
              <p className="text-ramyaas-100 text-sm mt-1">Trusted & Loved</p>
            </div>
            <div className="text-center border-l border-r border-ramyaas-500">
              <div className="text-4xl md:text-5xl font-bold mb-2">⭐ 4.9</div>
              <p className="text-lg font-semibold">Ratings</p>
              <p className="text-ramyaas-100 text-sm mt-1">From Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
              <p className="text-lg font-semibold">Years</p>
              <p className="text-ramyaas-100 text-sm mt-1">Excellence</p>
            </div>
            <div className="text-center border-l border-ramyaas-500">
              <div className="text-4xl md:text-5xl font-bold mb-2">🚚</div>
              <p className="text-lg font-semibold">Quick Delivery</p>
              <p className="text-ramyaas-100 text-sm mt-1">Free on ₹500+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoriesSection />

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-ramyaas-700 mb-6">
              {gettext('aboutUs', language)}
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              {gettext('ourStory', language)}
            </p>
            <p className="text-gray-600">
              {language === 'ta'
                ? 'ரம்யாஸ் பாரம்பரியமான செய்முறைகளைப் பயன்படுத்தி சுவையான வீட்டு உணவுகள் தயாரிக்கிறது. எங்கள் பொடி, ஊறுகாய் மற்றும் காரங்கள் சுத்தமான மூலப்பொருட்களுடன் தயாரிக்கப்படுகிறது.'
                : 'RAMYAAS prepares delicious homemade foods using traditional recipes. Our podi, pickle, and snacks are made with pure ingredients.'}
            </p>
          </div>
          <div className="bg-ramyaas-100 h-96 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={logoImage} 
              alt="RAMYAAS Logo" 
              className="w-full h-full object-contain p-8"
            />
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <FeedbackSection />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-ramyaas-700 mb-16">
            {language === 'ta' ? 'எங்கள் சேவைகள்' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">🍛</div>
              <h3 className="text-xl font-semibold text-ramyaas-700 mb-3">
                {gettext('snacksTitle', language)}
              </h3>
              <p className="text-gray-600">
                {language === 'ta'
                  ? 'புதிய மற்றும் சுவையான கேரணங்களின் பரந்த வகைப்பாடு'
                  : 'Wide variety of fresh and delicious snacks'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-ramyaas-700 mb-3">
                {gettext('cateringTitle', language)}
              </h3>
              <p className="text-gray-600">
                {language === 'ta'
                  ? 'உங்கள் சிறப்பு நிகழ்வுக்கான கேட்டரிங் சேவைகள்'
                  : 'Catering services for your special events'}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-ramyaas-700 mb-3">
                {gettext('bulkOrdersTitle', language)}
              </h3>
              <p className="text-gray-600">
                {language === 'ta'
                  ? 'மொத்த ஆர்டர்களுக்கான விশেष விலை'
                  : 'Special pricing for bulk orders'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default Home;
