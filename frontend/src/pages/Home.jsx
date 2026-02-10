import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { gettext } from '../utils/translations';
import logoImage from '../assets/logo.png';
import ProductCarousel from '../components/ProductCarousel';
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
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-ramyaas-700 mb-4">
          {gettext('ramyaas', language)}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {gettext('tagline', language)}
        </p>
        
        {/* Quality Highlights */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base font-medium text-gray-700">
            <div className="py-2 px-3 bg-green-50 rounded-lg border border-green-200">
              ✓ No Palm Oil
            </div>
            <div className="py-2 px-3 bg-green-50 rounded-lg border border-green-200">
              ✓ No Preservatives
            </div>
            <div className="py-2 px-3 bg-green-50 rounded-lg border border-green-200">
              ✓ No Maida
            </div>
            <div className="py-2 px-3 bg-green-50 rounded-lg border border-green-200">
              ✓ No Artificial Additives
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/snacks"
            className="bg-ramyaas-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth"
          >
            {gettext('snacks', language)}
          </Link>
          <Link
            to="/catering"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-smooth"
          >
            {gettext('catering', language)}
          </Link>
        </div>
      </section>

      {/* Product Carousel Section */}
      {featuredSnacks.length > 0 && <ProductCarousel products={featuredSnacks} />}

      {/* Stats Section */}
      <section className="bg-ramyaas-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
              <div className="text-4xl font-bold text-ramyaas-600 mb-2">🎉</div>
              <p className="text-gray-600 font-semibold">100% Homemade Quality</p>
              <p className="text-sm text-gray-500 mt-1">Fresh & Pure</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
              <div className="text-4xl font-bold text-ramyaas-600 mb-2">⭐</div>
              <p className="text-gray-600 font-semibold">500+ Happy Customers</p>
              <p className="text-sm text-gray-500 mt-1">Trusted Since 2023</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
              <div className="text-4xl font-bold text-ramyaas-600 mb-2">🚚</div>
              <p className="text-gray-600 font-semibold">Fast Delivery</p>
              <p className="text-sm text-gray-500 mt-1">Within 24 Hours</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
              <div className="text-4xl font-bold text-ramyaas-600 mb-2">💚</div>
              <p className="text-gray-600 font-semibold">Made With Love</p>
              <p className="text-sm text-gray-500 mt-1">For Your Family</p>
            </div>
          </div>
        </div>
      </section>

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
                ? 'ராம்யாஸ் பாரம்பரியமான செய்முறைகளைப் பயன்படுத்தி சுவையான வீட்டு உணவுகள் தயாரிக்கிறது. எங்கள் பொடி, ஊறுகாய் மற்றும் காரணங்கள் சுத்தமான மூலப்பொருட்களுடன் தயாரிக்கப்படுகிறது.'
                : 'RAMYAAS prepares delicious homemade foods using traditional recipes. Our podi, pickle, and snacks are made with pure ingredients.'}
            </p>
          </div>
          <div className="bg-ramyaas-100 h-96 rounded-lg flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="RAMYAAS Logo" 
              className="h-48 w-auto"
            />
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Home;
