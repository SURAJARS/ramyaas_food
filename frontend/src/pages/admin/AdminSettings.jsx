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
        freeShippingThreshold: shipping.freeShippingThreshold
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
