import SnackItem from '../models/SnackItem.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';

export const getAllSnacks = async (req, res) => {
  try {
    // Admin can see all snacks with ?all=true query param
    const query = req.query.all === 'true' ? {} : { isEnabled: true };
    const snacks = await SnackItem.find(query).sort({ createdAt: -1 });
    res.json(snacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSnackById = async (req, res) => {
  try {
    const snack = await SnackItem.findById(req.params.id);
    if (!snack) return res.status(404).json({ message: 'Snack not found' });
    res.json(snack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSnack = async (req, res) => {
  try {
    let imageUrl = null;
    
    // Upload image to Cloudinary if provided
    if (req.file) {
      const cloudinaryData = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'ramyaas_food/images'
      );
      imageUrl = cloudinaryData.cloudinaryPath;
    }

    // Parse variants if sent as JSON string
    let variants = req.body.variants;
    if (typeof variants === 'string') {
      try {
        variants = JSON.parse(variants);
      } catch (e) {
        variants = [];
      }
    }

    // Validate variants
    if (!variants || !Array.isArray(variants) || variants.length === 0) {
      return res.status(400).json({ message: 'At least one variant is required' });
    }

    const snack = new SnackItem({
      nameTA: req.body.nameTA,
      nameEN: req.body.nameEN,
      descriptionTA: req.body.descriptionTA,
      descriptionEN: req.body.descriptionEN,
      variants: variants,
      category: req.body.category,
      image: imageUrl,
      isEnabled: req.body.isEnabled !== undefined ? req.body.isEnabled : true
    });

    const newSnack = await snack.save();
    res.status(201).json(newSnack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSnack = async (req, res) => {
  try {
    const snack = await SnackItem.findById(req.params.id);
    if (!snack) return res.status(404).json({ message: 'Snack not found' });

    if (req.body.nameTA) snack.nameTA = req.body.nameTA;
    if (req.body.nameEN) snack.nameEN = req.body.nameEN;
    if (req.body.descriptionTA) snack.descriptionTA = req.body.descriptionTA;
    if (req.body.descriptionEN) snack.descriptionEN = req.body.descriptionEN;
    if (req.body.category) snack.category = req.body.category;
    if (req.body.isEnabled !== undefined) snack.isEnabled = req.body.isEnabled;
    
    // Update variants - parse if sent as JSON string
    if (req.body.variants) {
      let variants = req.body.variants;
      if (typeof variants === 'string') {
        try {
          variants = JSON.parse(variants);
        } catch (e) {
          variants = [];
        }
      }
      
      if (Array.isArray(variants)) {
        if (variants.length === 0) {
          return res.status(400).json({ message: 'At least one variant is required' });
        }
        snack.variants = variants;
      }
    }
    
    // Upload new image to Cloudinary if provided
    if (req.file) {
      const cloudinaryData = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'ramyaas_food/images'
      );
      snack.image = cloudinaryData.cloudinaryPath;
    }

    snack.updatedAt = new Date();
    const updatedSnack = await snack.save();
    res.json(updatedSnack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSnack = async (req, res) => {
  try {
    await SnackItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snack deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
