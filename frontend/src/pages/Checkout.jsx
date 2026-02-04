import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { gettext } from '../utils/translations';
import { couponApi, orderApi } from '../utils/api';
import { SuccessMessage, ErrorMessage, LoadingSpinner } from '../components/Common';

const Checkout = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const shippingCost = 50;
  const subtotal = getTotalPrice();
  const totalAmount = subtotal + shippingCost - discountAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const applyCoupon = async () => {
    try {
      const response = await couponApi.getByCode(couponCode);
      const coupon = response.data;

      if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
        setError('Minimum order value not met for this coupon');
        return;
      }

      if (coupon.discountType === 'percentage') {
        setDiscountAmount((subtotal * coupon.discountValue) / 100);
      } else {
        setDiscountAmount(coupon.discountValue);
      }
      setError(null);
    } catch (err) {
      setError('Invalid coupon code');
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      // Create order
      const orderResponse = await orderApi.create({
        customer: formData,
        items: cartItems,
        subtotal,
        shippingCost,
        discountCode: couponCode,
        discountAmount,
        totalAmount
      });

      const { razorpayOrderId, razorpayKeyId, orderId } = orderResponse.data;

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const options = {
          key: razorpayKeyId,
          amount: Math.round(totalAmount * 100),
          currency: 'INR',
          name: 'RAMYAAS',
          description: 'Order Payment',
          order_id: razorpayOrderId,
          handler: async (response) => {
            try {
              // Verify payment
              await orderApi.verifyPayment({
                orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              });

              // Clear cart and redirect
              clearCart();
              navigate(`/order-confirmation/${orderId}`);
            } catch (err) {
              setError('Payment verification failed');
              setLoading(false);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#b8956a'
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || err.message || 'Checkout failed');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">
            {language === 'ta' ? 'உங்கள் கார்ட் வெற்று உள்ளது' : 'Your cart is empty'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {language === 'ta' ? 'சரக்குத் தொகை' : 'Checkout'}
        </h1>

        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {language === 'ta' ? 'பணியாளர் விவரம்' : 'Customer Details'}
            </h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder={language === 'ta' ? 'பெயர்' : 'Full Name'}
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
              <input
                type="email"
                name="email"
                placeholder={language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder={language === 'ta' ? 'ஃபோன்' : 'Phone Number'}
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
              <textarea
                name="address"
                placeholder={language === 'ta' ? 'முகவரி' : 'Address'}
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
              <input
                type="text"
                name="city"
                placeholder={language === 'ta' ? 'நகரம்' : 'City'}
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
              <input
                type="text"
                name="zipCode"
                placeholder={language === 'ta' ? 'குறிப்பு குறிப்பு' : 'ZIP Code'}
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ramyaas-600 text-white py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth disabled:opacity-50"
              >
                {loading ? 'Processing...' : language === 'ta' ? 'பணம் செலுத்த' : 'Pay Now'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {language === 'ta' ? 'ஆர்டர் சারாংश' : 'Order Summary'}
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>{item[language === 'ta' ? 'nameTA' : 'nameEN']} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={language === 'ta' ? 'கூப்பன் குறিப்பு' : 'Coupon Code'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                >
                  {language === 'ta' ? 'சேர்க்க' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-700">
                <span>{language === 'ta' ? 'மொத்தம்' : 'Subtotal'}</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>{language === 'ta' ? 'டெலிவரி' : 'Delivery'}</span>
                <span>₹{shippingCost}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{language === 'ta' ? 'ছাড়' : 'Discount'}</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>{language === 'ta' ? 'মোট' : 'Total'}</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
