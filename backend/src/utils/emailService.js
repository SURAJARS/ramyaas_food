import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

export const sendCateringEnquiryEmail = (orderData) => {
  const html = `
    <h2>New Catering Enquiry - Amman Catering</h2>
    <p><strong>Name:</strong> ${orderData.name}</p>
    <p><strong>Email:</strong> ${orderData.email}</p>
    <p><strong>Phone:</strong> ${orderData.phone}</p>
    <p><strong>Event Type:</strong> ${orderData.eventType}</p>
    <p><strong>Event Date:</strong> ${orderData.eventDate}</p>
    <p><strong>Guest Count:</strong> ${orderData.guestCount}</p>
    <p><strong>Location:</strong> ${orderData.location}</p>
    <p><strong>Budget:</strong> ${orderData.budget}</p>
    <p><strong>Special Requests:</strong> ${orderData.specialRequests}</p>
  `;
  return sendEmail(process.env.EMAIL_USER, 'New Catering Enquiry', html);
};

export const sendBulkOrderEmail = (orderData) => {
  const html = `
    <h2>New Bulk Order Enquiry - RAMYAAS</h2>
    <p><strong>Name:</strong> ${orderData.name}</p>
    <p><strong>Email:</strong> ${orderData.email}</p>
    <p><strong>Phone:</strong> ${orderData.phone}</p>
    <p><strong>Company:</strong> ${orderData.company}</p>
    <p><strong>Item:</strong> ${orderData.item}</p>
    <p><strong>Quantity:</strong> ${orderData.quantity} ${orderData.unit}</p>
    <p><strong>Delivery Location:</strong> ${orderData.deliveryLocation}</p>
    <p><strong>Budget:</strong> ${orderData.budget}</p>
    <p><strong>Remarks:</strong> ${orderData.remarks}</p>
  `;
  return sendEmail(process.env.EMAIL_USER, 'New Bulk Order Enquiry', html);
};

export const sendContactEnquiryEmail = (enquiryData) => {
  const html = `
    <h2>New Contact Enquiry</h2>
    <p><strong>Name:</strong> ${enquiryData.name}</p>
    <p><strong>Email:</strong> ${enquiryData.email}</p>
    <p><strong>Phone:</strong> ${enquiryData.phone}</p>
    <p><strong>Type:</strong> ${enquiryData.type}</p>
    <p><strong>Message:</strong> ${enquiryData.message}</p>
  `;
  return sendEmail(process.env.EMAIL_USER, 'New Contact Enquiry', html);
};
