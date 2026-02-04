import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gettext } from '../utils/translations';
import { LoadingSpinner } from '../components/Common';
import { snackApi, cateringApi, bulkOrderApi, enquiryApi } from '../utils/api';

const Home = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState({
    snacks: 0,
    catering: 0,
    bulkOrders: 0,
    enquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [snacksRes, cateringRes, bulkRes, enquiriesRes] = await Promise.all([
          snackApi.getAll(),
          cateringApi.getAll(),
          bulkOrderApi.getAll(),
          enquiryApi.getAll()
        ]);

        setStats({
          snacks: snacksRes.data.length,
          catering: cateringRes.data.length,
          bulkOrders: bulkRes.data.length,
          enquiries: enquiriesRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/snacks"
            className="bg-ramyaas-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth"
          >
            {gettext('snacks', language)}
          </a>
          <a
            href="/catering"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-smooth"
          >
            {gettext('catering', language)}
          </a>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && (
        <section className="bg-ramyaas-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
                <div className="text-4xl font-bold text-ramyaas-600 mb-2">{stats.snacks}</div>
                <p className="text-gray-600">{gettext('snacks', language)}</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
                <div className="text-4xl font-bold text-ramyaas-600 mb-2">{stats.catering}</div>
                <p className="text-gray-600">{gettext('cateringOrders', language)}</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
                <div className="text-4xl font-bold text-ramyaas-600 mb-2">{stats.bulkOrders}</div>
                <p className="text-gray-600">{gettext('bulkOrders', language)}</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center border border-ramyaas-100">
                <div className="text-4xl font-bold text-ramyaas-600 mb-2">{stats.enquiries}</div>
                <p className="text-gray-600">{gettext('inquiries', language)}</p>
              </div>
            </div>
          </div>
        </section>
      )}

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
          <div className="bg-ramyaas-100 h-96 rounded-lg flex items-center justify-center text-gray-400">
            <span className="text-4xl">📸</span>
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
