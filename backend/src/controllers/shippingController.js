import ShippingConfig from '../models/ShippingConfig.js';

export const getShippingConfig = async (req, res) => {
  try {
    let config = await ShippingConfig.findOne();
    if (!config) {
      config = new ShippingConfig();
      await config.save();
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShippingConfig = async (req, res) => {
  try {
    let config = await ShippingConfig.findOne();
    if (!config) {
      config = new ShippingConfig();
    }

    if (req.body.shippingCharge !== undefined) config.shippingCharge = req.body.shippingCharge;
    if (req.body.freeShippingThreshold !== undefined) config.freeShippingThreshold = req.body.freeShippingThreshold;
    config.updatedAt = new Date();

    const updatedConfig = await config.save();
    res.json(updatedConfig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
