import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { orderApi } from '../utils/api';
import { gettext } from '../utils/translations';
import { LoadingSpinner, ErrorMessage } from '../components/Common';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { language } = useLanguage();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderApi.getById(orderId);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorMessage message={error || 'Order not found'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-2">
            {language === 'ta' ? '✓ உங்கள் ஆர்டர் உறுதியாக உள்ளது!' : '✓ Your Order is Confirmed!'}
          </h1>
          <p className="text-green-600">
            {language === 'ta' ? 'நன்றி, உங்கள் ஆர்டர் வெற்றிகரமாக பெறப்பட்டுவிட்டது' : 'Thank you for your order. We will deliver it soon!'}
          </p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ta' ? 'ஆர்டர் விவரம்' : 'Order Details'}
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'ஆர்டர் எண்' : 'Order Number'}</p>
                <p className="text-lg font-semibold text-gray-800">{order.orderNumber}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'பணி நிலை' : 'Payment Status'}</p>
                <p className={`text-lg font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentStatus === 'paid' ? 'Paid ✓' : 'Pending'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'ஆர்டர் நிலை' : 'Order Status'}</p>
                <p className="text-lg font-semibold text-gray-800">
                  {order.orderStatus === 'new' ? 'Processing...' :
                   order.orderStatus === 'confirmed' ? 'Confirmed' :
                   order.orderStatus === 'shipped' ? 'Shipped' :
                   order.orderStatus === 'delivered' ? 'Delivered' : order.orderStatus}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'மொத்த தொகை' : 'Total Amount'}</p>
                <p className="text-2xl font-bold text-ramyaas-600">₹{order.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ta' ? 'வரவேற்பு விவரம்' : 'Delivery Details'}
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'பெயர்' : 'Name'}</p>
                <p className="text-gray-800">{order.customer.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'மின்னஞ்சல்' : 'Email'}</p>
                <p className="text-gray-800">{order.customer.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'ஃபோன்' : 'Phone'}</p>
                <p className="text-gray-800">{order.customer.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'முகவரி' : 'Address'}</p>
                <p className="text-gray-800">{order.customer.address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">{language === 'ta' ? 'நகரம்' : 'City'}</p>
                <p className="text-gray-800">{order.customer.city} - {order.customer.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'ta' ? 'பொருட்கள்' : 'Items'}
          </h2>

          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">{item.nameTA || item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} {item.quantityUnit}</p>
                </div>
                <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-gray-700">
              <span>{language === 'ta' ? 'மொத்தம்' : 'Subtotal'}</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{language === 'ta' ? 'டெலிவரி' : 'Delivery'}</span>
              <span>₹{order.shippingCost.toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{language === 'ta' ? 'ছাড়' : 'Discount'}</span>
                <span>-₹{order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-200">
              <span>{language === 'ta' ? 'মোট' : 'Total'}</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/snacks"
            className="flex-1 bg-ramyaas-600 text-white py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth text-center"
          >
            {language === 'ta' ? 'অরডার করতে থাকুন' : 'Continue Shopping'}
          </Link>
          <Link
            to="/"
            className="flex-1 border border-ramyaas-600 text-ramyaas-600 py-3 rounded-lg font-semibold hover:bg-ramyaas-50 transition-smooth text-center"
          >
            {language === 'ta' ? 'গৃহে ফিরুন' : 'Go Home'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
