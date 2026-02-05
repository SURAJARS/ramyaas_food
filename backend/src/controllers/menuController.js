import MenuImage from '../models/MenuImage.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';

export const getAllMenuImages = async (req, res) => {
  try {
    const images = await MenuImage.find().sort({ displayOrder: 1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenuImage = async (req, res) => {
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

    const image = new MenuImage({
      titleTA: req.body.titleTA,
      titleEN: req.body.titleEN,
      displayOrder: req.body.displayOrder || 0,
      image: imageUrl
    });

    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenuImage = async (req, res) => {
  try {
    const image = await MenuImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Menu image not found' });

    if (req.body.titleTA) image.titleTA = req.body.titleTA;
    if (req.body.titleEN) image.titleEN = req.body.titleEN;
    if (req.body.displayOrder !== undefined) image.displayOrder = req.body.displayOrder;
    
    // Upload new image to Cloudinary if provided
    if (req.file) {
      const cloudinaryData = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        'ramyaas_food/images'
      );
      image.image = cloudinaryData.cloudinaryPath;
    }

    const updatedImage = await image.save();
    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenuImage = async (req, res) => {
  try {
    await MenuImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
