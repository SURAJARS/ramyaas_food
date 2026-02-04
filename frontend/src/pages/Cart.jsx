import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { gettext } from '../utils/translations';

const Cart = () => {
  const { language } = useLanguage();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

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
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={`http://localhost:5000/uploads/images/${item.image}`}
                      alt={item[language === 'ta' ? 'nameTA' : 'nameEN']}
                      className="w-full h-full object-cover rounded-lg"
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
                {language === 'ta' ? 'ஆர்டர் சारাংश' : 'Order Summary'}
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
                  <span>{language === 'ta' ? 'டெலிவারி' : 'Delivery'}</span>
                  <span>₹50</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
                <span>{language === 'ta' ? 'மொத்தம்' : 'Total'}</span>
                <span>₹{(getTotalPrice() + 50).toFixed(2)}</span>
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
