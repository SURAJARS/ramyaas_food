import Enquiry from '../models/Enquiry.js';
// Email service removed - form submissions logged to admin dashboard instead

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEnquiry = async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    if (!req.body.message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const enquiry = new Enquiry({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      messageTA: req.body.messageTA || req.body.message,
      messageEN: req.body.messageEN || req.body.message,
      type: req.body.type || 'general'
    });

    const newEnquiry = await enquiry.save();
    
    // Log form submission to admin dashboard
    console.log('💬 Contact Enquiry Submitted:', {
      id: newEnquiry._id,
      name: newEnquiry.name,
      email: newEnquiry.email,
      phone: newEnquiry.phone,
      type: newEnquiry.type,
      timestamp: new Date().toISOString()
    });
    
    // Email sending disabled - form data is logged to admin dashboard
    // Admin can view all submissions in Admin > Orders section
    
    res.status(201).json(newEnquiry);
  } catch (error) {
    console.error('Enquiry creation error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

    if (req.body.status) enquiry.status = req.body.status;

    const updatedEnquiry = await enquiry.save();
    res.json(updatedEnquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
