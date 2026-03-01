import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { gettext } from '../utils/translations';
import { shippingApi } from '../utils/api';

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

// Placeholder image
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23FFE5B4;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23FFD699;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2260%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🍪%3C/text%3E%3C/svg%3E';

const Cart = () => {
  const { language } = useLanguage();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const [imageErrors, setImageErrors] = useState({});
  const [shippingConfig, setShippingConfig] = useState({ shippingCharge: 50, freeShippingThreshold: 500 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShippingConfig = async () => {
      try {
        const response = await shippingApi.getConfig();
        setShippingConfig(response.data);
      } catch (error) {
        console.error('Error fetching shipping config:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShippingConfig();
  }, []);

  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= shippingConfig.freeShippingThreshold ? 0 : shippingConfig.shippingCharge;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {language === 'ta' ? 'உங்கள் கார்ட்' : 'Your Cart'}
          </h1>
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 text-lg mb-6">
              {language === 'ta' ? 'உங்கள் கார்ட் வெற்று உள்ளது' : 'Your cart is empty'}
            </p>
            <Link
              to="/snacks"
              className="bg-ramyaas-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth inline-block"
            >
              {language === 'ta' ? 'பொருட்கள் வாங்க' : 'Continue Shopping'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {language === 'ta' ? 'உங்கள் கார்ட்' : 'Your Cart'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {cartItems.map(item => (
                <div key={item._id} className="p-6 border-b border-gray-200 last:border-b-0 flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
                    <img
                      src={imageErrors[item._id] ? PLACEHOLDER_IMAGE : getImageUrl(item.image)}
                      alt={item[language === 'ta' ? 'nameTA' : 'nameEN']}
                      className="w-full h-full object-cover rounded-lg"
                      onError={() => setImageErrors(prev => ({ ...prev, [item._id]: true }))}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {item[language === 'ta' ? 'nameTA' : 'nameEN']}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      ₹{item.price} per {item.quantityUnit}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-smooth"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                        min="1"
                        className="w-12 text-center border border-gray-300 rounded py-1"
                      />
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-smooth"
                      >
                        +
                      </button>
                      <span className="text-gray-600 text-sm ml-4">
                        = ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-700 font-semibold transition-smooth"
                  >
                    {language === 'ta' ? 'நீக்கு' : 'Remove'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'ta' ? 'ஆர்டர் சுருக்கம்' : 'Order Summary'}
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>{language === 'ta' ? 'மொத்தம்' : 'Subtotal'}</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{language === 'ta' ? 'பொருட்கள்' : 'Items'}</span>
                  <span>{getTotalItems()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{language === 'ta' ? 'டெலிவரி' : 'Delivery'}</span>
                  <span>{shippingCost === 0 ? <span className="text-green-600 font-semibold">Free</span> : `₹${shippingCost}`}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
                <span>{language === 'ta' ? 'மொத்தம்' : 'Total'}</span>
                <span>₹{(subtotal + shippingCost).toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-ramyaas-600 text-white py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth text-center block"
              >
                {language === 'ta' ? 'சரக்கு செலுத்த' : 'Proceed to Checkout'}
              </Link>

              <Link
                to="/snacks"
                className="w-full mt-3 border border-ramyaas-600 text-ramyaas-600 py-3 rounded-lg font-semibold hover:bg-ramyaas-50 transition-smooth text-center block"
              >
                {language === 'ta' ? 'வாங்கத் தொடரவும்' : 'Continue Shopping'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
