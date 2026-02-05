import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { gettext } from '../utils/translations';
import { snackApi } from '../utils/api';

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL (from Cloudinary), return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // For legacy images, construct the full URL
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const backendUrl = apiUrl.replace('/api', '');
  
  return `${backendUrl}/uploads/images/${imagePath}`;
};

// Placeholder image - nice gradient with food emoji
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23FFE5B4;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23FFD699;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%22120%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🍪%3C/text%3E%3C/svg%3E';

export const SnackCard = ({ snack }) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(snack, quantity);
    setQuantity(1);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${snack[language === 'ta' ? 'nameTA' : 'nameEN']}. Price: ₹${snack.price}`;
    const whatsappUrl = `https://wa.me/919994952958?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-smooth">
      <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center overflow-hidden">
        <img
          src={imageError ? PLACEHOLDER_IMAGE : getImageUrl(snack.image)}
          alt={snack[language === 'ta' ? 'nameTA' : 'nameEN']}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">
          {snack[language === 'ta' ? 'nameTA' : 'nameEN']}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {snack.quantityUnit}
        </p>
        {snack[language === 'ta' ? 'descriptionTA' : 'descriptionEN'] && (
          <p className="text-sm text-gray-600 mb-3">
            {snack[language === 'ta' ? 'descriptionTA' : 'descriptionEN']}
          </p>
        )}
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-ramyaas-600">₹{snack.price}</span>
          <span className="text-xs text-gray-500">Stock: {snack.stock}</span>
        </div>
        
        {/* Quantity and Buttons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max={snack.stock}
              className="w-12 text-center border border-gray-300 rounded py-1 text-sm"
            />
            <button
              onClick={() => setQuantity(Math.min(snack.stock, quantity + 1))}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-ramyaas-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-ramyaas-700 transition-smooth"
            >
              {language === 'ta' ? 'கார்ட்' : 'Add'}
            </button>
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-smooth"
            >
              {language === 'ta' ? 'WA' : 'Chat'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="spinner"></div>
    </div>
  );
};

export const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
      {message}
    </div>
  );
};

export const SuccessMessage = ({ message }) => {
  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
      {message}
    </div>
  );
};
