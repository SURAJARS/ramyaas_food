import Coupon from '../models/Coupon.js';

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCouponByCode = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ 
      code: req.params.code.toUpperCase(),
      isActive: true 
    });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  const coupon = new Coupon({
    code: req.body.code.toUpperCase(),
    codeTA: req.body.codeTA,
    codeEN: req.body.codeEN,
    description: req.body.description,
    descriptionTA: req.body.descriptionTA,
    descriptionEN: req.body.descriptionEN,
    discountType: req.body.discountType,
    discountValue: req.body.discountValue,
    maxDiscount: req.body.maxDiscount,
    minOrderValue: req.body.minOrderValue,
    maxUsage: req.body.maxUsage,
    expiryDate: req.body.expiryDate
  });

  try {
    const newCoupon = await coupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    if (req.body.code) coupon.code = req.body.code.toUpperCase();
    if (req.body.discountValue) coupon.discountValue = req.body.discountValue;
    if (req.body.isActive !== undefined) coupon.isActive = req.body.isActive;
    if (req.body.maxUsage !== undefined) coupon.maxUsage = req.body.maxUsage;
    if (req.body.expiryDate) coupon.expiryDate = req.body.expiryDate;

    const updatedCoupon = await coupon.save();
    res.json(updatedCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
