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

// Placeholder image
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23FFE5B4;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23FFD699;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%22300%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2280%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🍛%3C/text%3E%3C/svg%3E';

const Menu = () => {
  const { language } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
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
                  src={imageErrors[image._id] ? PLACEHOLDER_IMAGE : getImageUrl(image.image)}
                  alt={image[language === 'ta' ? 'titleTA' : 'titleEN']}
                  className="w-full h-80 object-cover rounded-lg"
                  onError={() => setImageErrors(prev => ({ ...prev, [image._id]: true }))}
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
          src={imageErrors[selectedImage._id] ? PLACEHOLDER_IMAGE : getImageUrl(selectedImage.image)}
          title={selectedImage[language === 'ta' ? 'titleTA' : 'titleEN']}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Menu;
