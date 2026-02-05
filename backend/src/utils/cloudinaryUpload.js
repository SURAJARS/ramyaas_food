import FormData from 'form-data';
import axios from 'axios';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;
const UPLOAD_PRESET = 'ramyaas_unsigned';

/**
 * Upload file to Cloudinary using unsigned preset
 * @param {Buffer} fileBuffer - File content from multer memory storage
 * @param {string} fileName - Original filename
 * @param {string} folder - Cloudinary folder (ramyaas_food/images or ramyaas_food/videos)
 * @returns {Promise<Object>} - Cloudinary response with secure_url
 */
export const uploadToCloudinary = async (fileBuffer, fileName, folder) => {
  try {
    const formData = new FormData();
    
    // Add file
    formData.append('file', fileBuffer, fileName);
    
    // Add upload preset (unsigned)
    formData.append('upload_preset', UPLOAD_PRESET);
    
    // Add folder
    formData.append('folder', folder);
    
    // Upload to Cloudinary
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: formData.getHeaders()
    });

    return {
      url: response.data.secure_url,
      publicId: response.data.public_id,
      cloudinaryPath: response.data.public_id // For storing in DB
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error.response?.data || error.message);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};
