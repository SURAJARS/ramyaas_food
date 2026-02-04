import React, { useState, useEffect } from 'react';
import { LoadingSpinner, SuccessMessage, ErrorMessage } from '../../components/Common';
import { reelsApi } from '../../utils/api';

const AdminReels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    titleTA: '',
    titleEN: '',
    descriptionTA: '',
    descriptionEN: '',
    type: 'upload',
    instagramLink: '',
    video: null,
    displayOrder: 0
  });

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const response = await reelsApi.getAll();
      setReels(response.data);
    } catch (err) {
      setError('Failed to load reels');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('titleTA', formData.titleTA);
      data.append('titleEN', formData.titleEN);
      data.append('descriptionTA', formData.descriptionTA);
      data.append('descriptionEN', formData.descriptionEN);
      data.append('type', formData.type);
      data.append('displayOrder', formData.displayOrder);
      if (formData.type === 'instagram') {
        data.append('instagramLink', formData.instagramLink);
      } else if (formData.video instanceof File) {
        data.append('video', formData.video);
      }

      await reelsApi.create(data);
      setSuccess(true);
      setFormData({
        titleTA: '',
        titleEN: '',
        descriptionTA: '',
        descriptionEN: '',
        type: 'upload',
        instagramLink: '',
        video: null,
        displayOrder: 0
      });
      fetchReels();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create reel';
      setError(errorMessage);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this reel?')) {
      try {
        await reelsApi.delete(id);
        fetchReels();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError('Failed to delete reel');
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-ramyaas-700">Manage Reels/Videos</h2>

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message="Operation successful" />}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="titleTA"
            placeholder="Title (Tamil)"
            value={formData.titleTA}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          />
          <input
            type="text"
            name="titleEN"
            placeholder="Title (English)"
            value={formData.titleEN}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          />
        </div>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
        >
          <option value="upload">Upload Video</option>
          <option value="instagram">Instagram Reel Link</option>
        </select>

        {formData.type === 'upload' ? (
          <input
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <input
            type="text"
            name="instagramLink"
            placeholder="Instagram Reel URL"
            value={formData.instagramLink}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
          />
        )}

        <textarea
          name="descriptionTA"
          placeholder="Description (Tamil)"
          value={formData.descriptionTA}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-ramyaas-600 text-white py-2 rounded-lg font-semibold hover:bg-ramyaas-700"
        >
          Create Reel
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reels.map(reel => (
            <div key={reel._id} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">{reel.titleTA}</h3>
              <p className="text-sm text-gray-600 mb-4">Type: {reel.type}</p>
              <button
                onClick={() => handleDelete(reel._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReels;
