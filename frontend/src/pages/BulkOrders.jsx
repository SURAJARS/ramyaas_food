import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { gettext } from '../utils/translations';
import { SuccessMessage, ErrorMessage } from '../components/Common';
import { bulkOrderApi } from '../utils/api';

const BulkOrders = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    item: '',
    quantity: '',
    unit: '',
    deliveryLocation: '',
    budget: '',
    remarks: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await bulkOrderApi.create(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        item: '',
        quantity: '',
        unit: '',
        deliveryLocation: '',
        budget: '',
        remarks: ''
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit bulk order';
      setError(errorMessage);
      console.error('Bulk order form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-ramyaas-700 mb-4">
          {gettext('bulkOrdersTitle', language)}
        </h1>
        <p className="text-center text-gray-600 mb-12">
          {gettext('bulkOrdersSubtitle', language)}
        </p>

        {success && <SuccessMessage message={gettext('enquirySubmitted', language)} />}
        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {gettext('fullName', language)}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {gettext('email', language)}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {gettext('phone', language)}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {gettext('company', language)}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {gettext('snacks', language)}
            </label>
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              placeholder="e.g., Murukku, Pickle, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {gettext('quantity', language)}
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {gettext('unit', language)}
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
              >
                <option value="">Select</option>
                <option value="kg">Kg</option>
                <option value="litre">Litre</option>
                <option value="pieces">Pieces</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {gettext('deliveryLocation', language)}
            </label>
            <input
              type="text"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {gettext('budget', language)}
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., 1,00,000 - 5,00,000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {gettext('remarks', language)}
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ramyaas-600 text-white py-3 rounded-lg font-semibold hover:bg-ramyaas-700 transition-smooth disabled:opacity-50"
          >
            {loading ? '...Submitting' : gettext('submitEnquiry', language)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkOrders;
