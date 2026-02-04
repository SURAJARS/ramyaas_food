import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gettext } from '../utils/translations';
import { LoadingSpinner, ErrorMessage } from '../components/Common';
import { menuApi } from '../utils/api';
import { LightboxImage } from '../components/Lightbox';

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const backendUrl = apiUrl.replace('/api', '');
  return `${backendUrl}/uploads/images/${imagePath}`;
};

const Menu = () => {
  const { language } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const response = await menuApi.getAll();
        setImages(response.data);
      } catch (err) {
        setError('Failed to load menu images');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuImages();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-ramyaas-700 mb-12">
          {gettext('menuTitle', language)}
        </h1>

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(image => (
              <div
                key={image._id}
                className="cursor-pointer hover:opacity-90 transition-smooth"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={getImageUrl(image.image)}
                  alt={image[language === 'ta' ? 'titleTA' : 'titleEN']}
                  className="w-full h-80 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
                  }}
                />
                {image[language === 'ta' ? 'titleTA' : 'titleEN'] && (
                  <p className="mt-3 text-center font-semibold text-gray-700">
                    {image[language === 'ta' ? 'titleTA' : 'titleEN']}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <LightboxImage
          src={getImageUrl(selectedImage.image)}
          title={selectedImage[language === 'ta' ? 'titleTA' : 'titleEN']}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Menu;
