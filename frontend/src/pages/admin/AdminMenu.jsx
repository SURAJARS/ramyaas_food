import React, { useState, useEffect } from 'react';
import { LoadingSpinner, SuccessMessage, ErrorMessage } from '../../components/Common';
import { menuApi } from '../../utils/api';

// Helper function to get correct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const backendUrl = apiUrl.replace('/api', '');
  return `${backendUrl}/uploads/images/${imagePath}`;
};

// Placeholder image
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23FFE5B4;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23FFD699;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%22300%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2280%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🍛%3C/text%3E%3C/svg%3E';

const AdminMenu = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [formData, setFormData] = useState({
    titleTA: '',
    titleEN: '',
    displayOrder: 0,
    image: null
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await menuApi.getAll();
      setImages(response.data);
    } catch (err) {
      setError('Failed to load menu images');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('titleTA', formData.titleTA);
      data.append('titleEN', formData.titleEN);
      data.append('displayOrder', formData.displayOrder);
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      }

      await menuApi.create(data);
      setSuccess(true);
      setFormData({ titleTA: '', titleEN: '', displayOrder: 0, image: null });
      fetchImages();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to upload image');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this image?')) {
      try {
        await menuApi.delete(id);
        fetchImages();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError('Failed to delete image');
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-ramyaas-700">Menu Images</h2>

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
        <input
          type="number"
          name="displayOrder"
          placeholder="Display Order"
          value={formData.displayOrder}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-ramyaas-500"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-ramyaas-600 text-white py-2 rounded-lg font-semibold hover:bg-ramyaas-700"
        >
          Upload Menu Image
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(image => (
            <div key={image._id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="w-full h-72 bg-gradient-to-br from-orange-100 to-orange-50 rounded mb-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={imageErrors[image._id] ? PLACEHOLDER_IMAGE : getImageUrl(image.image)} 
                  alt={image.titleTA} 
                  className="w-full h-full object-cover"
                  onError={() => setImageErrors(prev => ({ ...prev, [image._id]: true }))}
                />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{image.titleTA}</h3>
              <button
                onClick={() => handleDelete(image._id)}
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

export default AdminMenu;
