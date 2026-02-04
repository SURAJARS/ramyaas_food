import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { gettext } from '../../utils/translations';
import { LoadingSpinner, SuccessMessage, ErrorMessage } from '../../components/Common';
import { snackApi } from '../../utils/api';

const AdminSnacks = () => {
  const { language } = useLanguage();
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nameTA: '',
    nameEN: '',
    descriptionTA: '',
    descriptionEN: '',
    price: '',
    category: 'snacks',
    quantityUnit: 'pieces',
    stock: 100,
    image: null,
    isEnabled: true
  });

  useEffect(() => {
    fetchSnacks();
  }, []);

  const fetchSnacks = async () => {
    try {
      const response = await snackApi.getAll(true);
      setSnacks(response.data);
    } catch (err) {
      setError('Failed to load snacks');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('nameTA', formData.nameTA);
      data.append('nameEN', formData.nameEN);
      data.append('descriptionTA', formData.descriptionTA);
      data.append('descriptionEN', formData.descriptionEN);
      data.append('price', parseFloat(formData.price));
      data.append('category', formData.category);
      data.append('quantityUnit', formData.quantityUnit);
      data.append('stock', parseInt(formData.stock));
      data.append('isEnabled', formData.isEnabled);
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      }

      if (editingId) {
        await snackApi.update(editingId, data);
      } else {
        await snackApi.create(data);
      }

      setSuccess(true);
      setFormData({
        nameTA: '',
        nameEN: '',
        descriptionTA: '',
        descriptionEN: '',
        price: '',
        category: 'snacks',
        quantityUnit: 'pieces',
        stock: 100,
        image: null,
        isEnabled: true
      });
      setEditingId(null);
      fetchSnacks();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save snack';
      setError(errorMessage);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await snackApi.delete(id);
        fetchSnacks();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError('Failed to delete snack');
      }
    }
  };

  const handleEdit = (snack) => {
    setEditingId(snack._id);
    setFormData({
      nameTA: snack.nameTA,
      nameEN: snack.nameEN,
      descriptionTA: snack.descriptionTA,
      descriptionEN: snack.descriptionEN,
      price: snack.price,
      category: snack.category,
      quantityUnit: snack.quantityUnit,
      stock: snack.stock,
      isEnabled: snack.isEnabled,
      image: null
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-ramyaas-700">{gettext('snacksManagement', language)}</h2>

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message="Operation successful" />}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nameTA"
            placeholder="Name (Tamil)"
            value={formData.nameTA}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          />
          <input
            type="text"
            name="nameEN"
            placeholder="Name (English)"
            value={formData.nameEN}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          >
            <option value="snacks">Snacks</option>
            <option value="podi">Podi</option>
            <option value="pickle">Pickle</option>
            <option value="sweets">Sweets</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="quantityUnit"
            value={formData.quantityUnit}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          >
            <option value="pieces">Pieces</option>
            <option value="grams">Grams</option>
            <option value="kgs">Kilograms</option>
            <option value="litre">Litre</option>
          </select>
          <input
            type="number"
            name="stock"
            placeholder="Stock quantity"
            value={formData.stock}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          />
        </div>

        <textarea
          name="descriptionTA"
          placeholder="Description (Tamil)"
          value={formData.descriptionTA}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
        ></textarea>

        <textarea
          name="descriptionEN"
          placeholder="Description (English)"
          value={formData.descriptionEN}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
        ></textarea>

        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isEnabled"
            checked={formData.isEnabled}
            onChange={handleChange}
          />
          <span className="text-sm">Enabled</span>
        </label>

        <button
          type="submit"
          className="w-full bg-ramyaas-600 text-white py-2 rounded-lg font-semibold hover:bg-ramyaas-700"
        >
          {editingId ? 'Update' : 'Add'} Snack
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {snacks.map(snack => (
                <tr key={snack._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm">{snack.nameTA}</td>
                  <td className="px-6 py-3 text-sm">₹{snack.price}</td>
                  <td className="px-6 py-3 text-sm">{snack.category}</td>
                  <td className="px-6 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${snack.isEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {snack.isEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(snack)}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(snack._id)}
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
      )}
    </div>
  );
};

export default AdminSnacks;
