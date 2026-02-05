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

    const snack = new SnackItem({
      nameTA: req.body.nameTA,
      nameEN: req.body.nameEN,
      descriptionTA: req.body.descriptionTA,
      descriptionEN: req.body.descriptionEN,
      price: req.body.price,
      category: req.body.category,
      quantityUnit: req.body.quantityUnit || 'pieces',
      stock: req.body.stock || 100,
      image: imageUrl
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
    if (req.body.price) snack.price = req.body.price;
    if (req.body.category) snack.category = req.body.category;
    if (req.body.quantityUnit) snack.quantityUnit = req.body.quantityUnit;
    if (req.body.stock) snack.stock = req.body.stock;
    if (req.body.isEnabled !== undefined) snack.isEnabled = req.body.isEnabled;
    
    // Upload new image to Cloudinary if provided
    if (req.file) {
      const cloudinaryData = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'ramyaas_food/images'
      );
      snack.image = cloudinaryData.cloudinaryPath;
    }

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
