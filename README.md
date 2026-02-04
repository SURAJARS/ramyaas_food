# RAMYAAS - Homemade Podi, Pickle & Snacks

A production-ready, Tamil-first family business website built with React.js (Vite), Express.js, and MongoDB Atlas.

## 🌟 Features

### Frontend

- **Tamil-First Design**: Default language is Tamil (தமிழ்) with English fallback
- **Responsive Mobile-First UI**: Clean, minimal design inspired by Sweet Karam Coffee
- **Image-First Layout**: Premium Indian food brand aesthetic
- **Language Toggle**: Easy TA | EN language switching with localStorage persistence

### Business Sections

1. **RAMYAAS** - Homemade snacks, podi, and pickles
   - Product catalog with WhatsApp enquiry integration
   - Category management (Podi, Pickle, Snacks, Sweets)
2. **Amman Catering** - Separate catering service
   - Event-based enquiry form
   - Guest count estimation
   - Budget planning

3. **Bulk Orders** - Wholesale procurement
   - Quantity and unit management
   - Company-based ordering
   - Bulk pricing

4. **Menu Gallery** - Image-focused presentation
   - Lightbox preview
   - Display ordering

5. **Video Reels** - Hybrid content
   - Direct video uploads
   - Instagram reel links

### Admin Dashboard

- **Snacks Management**: Add/edit/delete products with bilingual support
- **Menu Management**: Upload and organize menu images
- **Reels Management**: Manage video content
- **Order Management**: Track catering, bulk, and contact enquiries
- **Coupons & Discounts**: Create promotional codes
- **Shipping Settings**: Configurable shipping charges and free shipping threshold
- **Enquiry Tracking**: Monitor all customer enquiries

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM
- **Multer** - File uploads
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin support

### Frontend

- **React.js 18** - UI framework
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Context API** - State management

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB Atlas account (free tier available)
- Gmail account (for email notifications)

## 🚀 Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create `.env` file in `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/ramyaas_food?retryWrites=true&w=majority
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:5173
```

#### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Get connection string and update `.env`

#### Gmail Setup (for Email Notifications)

1. Enable 2-factor authentication on Gmail
2. Generate [App Password](https://myaccount.google.com/apppasswords)
3. Use app password in `.env`

#### Start Backend

```bash
npm run dev    # Development with auto-reload
npm start      # Production mode
```

Backend will run on `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

#### Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
```

#### Start Frontend

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📁 Project Structure

### Backend

```
backend/
├── src/
│   ├── models/
│   │   ├── SnackItem.js
│   │   ├── MenuImage.js
│   │   ├── ReelContent.js
│   │   ├── CateringOrder.js
│   │   ├── BulkOrder.js
│   │   ├── Coupon.js
│   │   ├── DiscountRule.js
│   │   ├── ShippingConfig.js
│   │   └── Enquiry.js
│   ├── controllers/
│   │   ├── snackController.js
│   │   ├── menuController.js
│   │   ├── reelController.js
│   │   ├── cateringController.js
│   │   ├── bulkOrderController.js
│   │   ├── couponController.js
│   │   ├── shippingController.js
│   │   └── enquiryController.js
│   ├── routes/
│   │   ├── snackRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── reelRoutes.js
│   │   ├── cateringRoutes.js
│   │   ├── bulkOrderRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── shippingRoutes.js
│   │   └── enquiryRoutes.js
│   ├── utils/
│   │   ├── emailService.js
│   │   └── multerConfig.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Snacks.jsx
│   │   ├── Menu.jsx
│   │   ├── Catering.jsx
│   │   ├── BulkOrders.jsx
│   │   ├── Reels.jsx
│   │   ├── Contact.jsx
│   │   └── admin/
│   │       ├── Admin.jsx
│   │       ├── AdminSnacks.jsx
│   │       ├── AdminMenu.jsx
│   │       ├── AdminReels.jsx
│   │       ├── AdminSettings.jsx
│   │       └── AdminOrders.jsx
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Common.jsx
│   │   └── Lightbox.jsx
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── utils/
│   │   ├── api.js
│   │   └── translations.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .gitignore
```

## 🔌 API Endpoints

### Snacks

- `GET /api/snacks` - Get all enabled snacks
- `POST /api/snacks` - Create snack (admin)
- `PUT /api/snacks/:id` - Update snack (admin)
- `DELETE /api/snacks/:id` - Delete snack (admin)

### Menu

- `GET /api/menu` - Get menu images
- `POST /api/menu` - Upload menu image (admin)
- `DELETE /api/menu/:id` - Delete menu image (admin)

### Reels

- `GET /api/reels` - Get video reels
- `POST /api/reels` - Create reel (admin)
- `DELETE /api/reels/:id` - Delete reel (admin)

### Catering

- `GET /api/catering` - Get catering orders (admin)
- `POST /api/catering` - Submit catering enquiry
- `PUT /api/catering/:id` - Update order status (admin)

### Bulk Orders

- `GET /api/bulk-orders` - Get bulk orders (admin)
- `POST /api/bulk-orders` - Submit bulk order
- `PUT /api/bulk-orders/:id` - Update order status (admin)

### Coupons

- `GET /api/coupons` - Get active coupons
- `GET /api/coupons/code/:code` - Validate coupon
- `POST /api/coupons` - Create coupon (admin)
- `DELETE /api/coupons/:id` - Delete coupon (admin)

### Shipping

- `GET /api/shipping` - Get shipping config
- `PUT /api/shipping` - Update shipping config (admin)

### Enquiries

- `GET /api/enquiries` - Get all enquiries (admin)
- `POST /api/enquiries` - Submit contact enquiry
- `PUT /api/enquiries/:id` - Update enquiry status (admin)

## 🎨 Design System

### Colors

- Primary: `#b8956a` (Ramyaas Brown)
- Light: `#fdf9f4` (Off-white)
- Accent: Green (WhatsApp integration)

### Typography

- Tamil: Noto Sans Tamil
- English: Inter
- Mobile-first responsive design

## 🗄️ Database Models

### SnackItem

```javascript
{
  (nameTA,
    nameEN,
    descriptionTA,
    descriptionEN,
    price,
    image,
    category(podi | pickle | snacks | sweets),
    isEnabled,
    createdAt,
    updatedAt);
}
```

### CateringOrder

```javascript
{
  name, email, phone,
  eventType, eventDate, guestCount,
  location, budget, specialRequests,
  status (new|contacted|quoted|rejected|completed),
  createdAt, updatedAt
}
```

### BulkOrder

```javascript
{
  name, email, phone, company,
  item, quantity, unit,
  deliveryLocation, budget, remarks,
  status (new|contacted|quoted|rejected|completed),
  createdAt, updatedAt
}
```

### Coupon

```javascript
{
  (code,
    description,
    discountType(percentage | fixed),
    discountValue,
    maxDiscount,
    minOrderValue,
    maxUsage,
    usageCount,
    isActive,
    expiryDate);
}
```

## 📧 Email Notifications

The system sends automated emails for:

- New catering enquiries
- New bulk order enquiries
- New contact enquiries

Configure email credentials in `.env`

## 🔒 Security Notes

- Admin routes prepared for JWT authentication (commented out)
- File uploads validated by type and size
- CORS configured for frontend URL
- Environment variables used for all secrets
- MongoDB connection uses credentials

## 🚀 Production Deployment

### Backend (Heroku/Railway/Render)

```bash
# Create Procfile
echo "web: npm start" > Procfile

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy 'dist' folder
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Email Not Sending

- Enable "Less secure app access" or use App Password
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`
- Verify SMTP settings

### File Upload Issues

- Check `uploads/` folder permissions
- Verify file size limits in multerConfig.js
- Ensure image/video MIME types are correct

### Tailwind Not Styling

- Run `npm install -D tailwindcss postcss autoprefixer`
- Rebuild frontend: `npm run dev`
- Clear browser cache

## 📝 License

Private - For Ramyaas Business Use Only

## 🤝 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for RAMYAAS Family Business**
