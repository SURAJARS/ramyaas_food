import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { gettext } from '../utils/translations';
import { snackApi } from '../utils/api';

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // Get API base URL and extract backend base URL
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const backendUrl = apiUrl.replace('/api', '');
  
  // Build full image URL
  return `${backendUrl}/uploads/images/${imagePath}`;
};

export const SnackCard = ({ snack }) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(snack, quantity);
    setQuantity(1);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${snack[language === 'ta' ? 'nameTA' : 'nameEN']}. Price: ₹${snack.price}`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-smooth">
      {snack.image && (
        <img
          src={getImageUrl(snack.image)}
          alt={snack[language === 'ta' ? 'nameTA' : 'nameEN']}
          className="w-full h-63object-cover"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="14"%3EImage not found%3C/text%3E%3C/svg%3E';
          }}
        />
      )}
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
