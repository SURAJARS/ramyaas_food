import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SuccessMessage, ErrorMessage } from '../../components/Common';
import { shippingApi, couponApi } from '../../utils/api';

const AdminSettings = () => {
  const { language } = useLanguage();
  const [shipping, setShipping] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    maxDiscount: '',
    minOrderValue: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [shippingRes, couponsRes] = await Promise.all([
        shippingApi.getConfig(),
        couponApi.getAll()
      ]);
      setShipping(shippingRes.data);
      setCoupons(couponsRes.data);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping({
      ...shipping,
      [name]: value
    });
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    try {
      await shippingApi.updateConfig({
        shippingCharge: shipping.shippingCharge,
        freeShippingThreshold: shipping.freeShippingThreshold,
        bannerTextEN: shipping.bannerTextEN,
        bannerTextTA: shipping.bannerTextTA,
        bannerVisible: shipping.bannerVisible
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update shipping');
    }
  };

  const handleCouponChange = (e) => {
    const { name, value } = e.target;
    setNewCoupon({
      ...newCoupon,
      [name]: value
    });
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      await couponApi.create(newCoupon);
      setNewCoupon({
        code: '',
        description: '',
        discountType: 'percentage',
        discountValue: '',
        maxDiscount: '',
        minOrderValue: ''
      });
      fetchData();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to create coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        await couponApi.delete(id);
        fetchData();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError('Failed to delete coupon');
      }
    }
  };

  if (loading || !shipping) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-ramyaas-700">Settings & Configuration</h2>

      {success && <SuccessMessage message="Updated successfully" />}
      {error && <ErrorMessage message={error} />}

      {/* Shipping Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-ramyaas-700 mb-4">Shipping Configuration</h3>
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Charge (₹)
            </label>
            <input
              type="number"
              name="shippingCharge"
              value={shipping.shippingCharge}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Free Shipping Threshold (₹)
            </label>
            <input
              type="number"
              name="freeShippingThreshold"
              value={shipping.freeShippingThreshold}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
          </div>
          <button
            type="submit"
            className="bg-ramyaas-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-ramyaas-700"
          >
            Update Shipping Settings
          </button>
        </form>
      </div>

      {/* Homepage Banner Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-ramyaas-700 mb-4">Homepage Banner</h3>
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shipping.bannerVisible}
                onChange={(e) => setShipping({ ...shipping, bannerVisible: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              />
              <span className="font-medium text-gray-700">
                {language === 'ta' ? 'பேனர் பார்க்கத்தக்க' : 'Banner Visible'}
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ta' ? 'பேனர் உரை (ஆங்கிலம்)' : 'Banner Text (English)'}
            </label>
            <textarea
              name="bannerTextEN"
              value={shipping.bannerTextEN}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500 resize-none"
              rows="2"
              placeholder="🎉 Special Offer: Free Shipping on Orders Above ₹500!"
            />
            <p className="text-xs text-gray-500 mt-1">
              {language === 'ta' ? 'பেனர் முன்னிரு சொற்பதத்திற்கு ஆங்கிலத்தில்' : 'Banner text in English'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ta' ? 'பேனர் உரை (தமிழ்)' : 'Banner Text (Tamil)'}
            </label>
            <textarea
              name="bannerTextTA"
              value={shipping.bannerTextTA}
              onChange={handleShippingChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500 resize-none"
              rows="2"
              placeholder="🎉 சிறப்பு விசித்திரம்: ₹500க்கு மேல் உள்ள ஆர்டர்களுக்கு இலவச விநியோகம்!"
            />
            <p className="text-xs text-gray-500 mt-1">
              {language === 'ta' ? 'பேனர் உரை தமிழில்' : 'Banner text in Tamil'}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="font-semibold text-sm text-orange-900 mb-2">
              {language === 'ta' ? 'முன்னோட்டம்:' : 'Preview:'}
            </p>
            {shipping.bannerVisible ? (
              <div className="bg-gradient-to-r from-ramyaas-600 to-ramyaas-700 text-white py-3 px-4 text-center rounded">
                <p className="text-sm md:text-base font-semibold">
                  {language === 'ta' ? shipping.bannerTextTA : shipping.bannerTextEN}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600 italic">
                {language === 'ta' ? 'பேனர் மறைக்கப்பட்ட' : 'Banner is hidden'}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-ramyaas-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-ramyaas-700 transition-colors"
          >
            {language === 'ta' ? 'பாணர் புதுப்பிக்கவும்' : 'Update Banner'}
          </button>
        </form>
      </div>

      {/* Coupons */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-ramyaas-700 mb-4">Manage Coupons</h3>
        
        <form onSubmit={handleCouponSubmit} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="code"
              placeholder="Coupon Code"
              value={newCoupon.code}
              onChange={handleCouponChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newCoupon.description}
              onChange={handleCouponChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              name="discountType"
              value={newCoupon.discountType}
              onChange={handleCouponChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
            <input
              type="number"
              name="discountValue"
              placeholder="Discount Value"
              value={newCoupon.discountValue}
              onChange={handleCouponChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
            <input
              type="number"
              name="minOrderValue"
              placeholder="Min Order Value"
              value={newCoupon.minOrderValue}
              onChange={handleCouponChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Add Coupon
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Discount</th>
                <th className="px-4 py-2 text-left">Min Order</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{coupon.code}</td>
                  <td className="px-4 py-2">
                    {coupon.discountValue}
                    {coupon.discountType === 'percentage' ? '%' : '₹'}
                  </td>
                  <td className="px-4 py-2">₹{coupon.minOrderValue}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {coupon.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
