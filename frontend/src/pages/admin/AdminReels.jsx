import React, { useState, useEffect } from 'react';
import { LoadingSpinner, SuccessMessage, ErrorMessage } from '../../components/Common';
import { reelsApi } from '../../utils/api';

const AdminReels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    titleTA: '',
    titleEN: '',
    descriptionTA: '',
    descriptionEN: '',
    type: 'upload',
    instagramLink: '',
    video: null,
    displayOrder: 0,
    isVisible: true
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
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.titleTA || !formData.titleEN) {
      setError('Title in both languages is required');
      return;
    }
    
    if (formData.type === 'upload' && !formData.video) {
      setError('Please select a video file for upload type');
      return;
    }
    
    if (formData.type === 'instagram' && !formData.instagramLink) {
      setError('Please enter Instagram link for Instagram type');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      setError(null);

      const data = new FormData();
      data.append('titleTA', formData.titleTA);
      data.append('titleEN', formData.titleEN);
      data.append('descriptionTA', formData.descriptionTA || '');
      data.append('descriptionEN', formData.descriptionEN || '');
      data.append('type', formData.type);
      // Don't send displayOrder - let backend auto-increment
      data.append('isVisible', formData.isVisible);
      
      if (formData.type === 'instagram') {
        data.append('instagramLink', formData.instagramLink);
      } else if (formData.type === 'upload' && formData.video instanceof File) {
        data.append('video', formData.video);
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 30;
        });
      }, 500);

      await reelsApi.create(data);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setSuccess(true);
      
      setFormData({
        titleTA: '',
        titleEN: '',
        descriptionTA: '',
        descriptionEN: '',
        type: 'upload',
        instagramLink: '',
        video: null,
        displayOrder: 0,
        isVisible: true
      });
      fetchReels();
      setTimeout(() => {
        setSuccess(false);
        setUploading(false);
        setUploadProgress(0);
      }, 3000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create reel';
      setError(errorMessage);
      console.error('Reel creation error:', err);
      setUploading(false);
      setUploadProgress(0);
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

        <textarea
          name="descriptionEN"
          placeholder="Description (English)"
          value={formData.descriptionEN}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hidden">
            <input
              type="number"
              name="displayOrder"
              value={formData.displayOrder}
              onChange={handleChange}
            />
          </div>
          <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
            />
            <span className="text-sm font-medium">Make Visible</span>
          </label>
        </div>

        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">Uploading...</span>
              <span className="text-gray-600">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-ramyaas-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              {formData.video ? `File size: ${(formData.video.size / 1024 / 1024).toFixed(2)} MB` : ''}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-ramyaas-600 text-white py-2 rounded-lg font-semibold hover:bg-ramyaas-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : 'Create Reel'}
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reels.map(reel => (
            <div key={reel._id} className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">{reel.titleTA}</h3>
              <p className="text-sm text-gray-600 mb-2">Type: {reel.type}</p>
              <p className="text-xs text-gray-500 mb-2">
                Status: {reel.isVisible ? '✅ Visible' : '❌ Hidden'}
              </p>
              {reel.type === 'instagram' && reel.instagramLink && (
                <p className="text-xs text-blue-600 mb-2 truncate">
                  <a href={reel.instagramLink} target="_blank" rel="noreferrer">
                    View on Instagram
                  </a>
                </p>
              )}
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
