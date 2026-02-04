# 🚀 Quick Start Guide - RAMYAAS Family Business Website

## ⏱️ 5-Minute Setup

### Step 1: Backend Installation (2 min)

```bash
cd backend
npm install
```

### Step 2: Configure MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Sign up (free)
2. Create a cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/ramyaas_food?retryWrites=true&w=majority`

### Step 3: Create .env File

Create `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ramyaas_food?retryWrites=true&w=majority
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
RAZORPAY_KEY_ID=key_test_123
RAZORPAY_KEY_SECRET=secret_test_123
FRONTEND_URL=http://localhost:5173
```

### Step 4: Start Backend (1 min)

```bash
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 5: Frontend Installation (1 min)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on `http://localhost:5173`

---

## 🎯 Next Steps

### 1️⃣ Add Sample Products

Visit: `http://localhost:5173/admin`

- Go to **Snacks** tab
- Click "Add Snack"
- Fill form in Tamil/English
- Upload image

### 2️⃣ Configure Shipping

- Go to **Settings** tab
- Set shipping charge (e.g., ₹50)
- Set free shipping threshold (e.g., ₹500)

### 3️⃣ Create Coupons

- Go to **Settings** tab
- Add coupon "NEW10" (10% discount)
- Add coupon "FLAT25" (₹25 flat)

### 4️⃣ Upload Menu Images

- Go to **Menu Images** tab
- Upload your menu/product photos

---

## 🔧 Configuration Details

### Shipping Rules (Auto-calculated)

```
< ₹500        → Add shipping charge
≥ ₹500        → Free shipping
≥ ₹1000       → Free shipping + 5% discount
```

### Database Collections Created

- SnackItem
- MenuImage
- ReelContent
- CateringOrder
- BulkOrder
- Coupon
- DiscountRule
- ShippingConfig
- Enquiry

---

## 📞 WhatsApp Integration

Products show WhatsApp button. Update phone number in [Layout.jsx](frontend/src/components/Layout.jsx):

```javascript
const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=...`;
```

---

## 🎨 Customize Branding

### Colors (tailwind.config.js)

```javascript
'ramyaas': {
  50: '#fdf9f4',
  100: '#f5ede3',
  500: '#d4a574',
  600: '#b8956a',
  700: '#8b6f47',
}
```

### Logo

Add logo to `frontend/public/images/` and update [Layout.jsx](frontend/src/components/Layout.jsx)

---

## 🌍 Languages (Auto-Supported)

- **Tamil** (தமிழ்) - Default
- **English** - Secondary

Add new languages in `frontend/src/utils/translations.js`:

```javascript
const tamilvEnglish = {
  hello: { ta: "வணக்கம்", en: "Hello" },
};
```

---

## 📧 Email Setup (Gmail)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate password → Copy to EMAIL_PASSWORD in .env

---

## 📱 Test Features

### Homepage

- View stats dashboard
- See all sections

### Snacks Page

- Browse products
- Click "WhatsApp" button to enquire

### Catering Page

- Fill form for event catering
- Auto email sent to admin

### Bulk Orders

- Submit wholesale order
- Track status in admin

### Contact

- Send message
- Admin gets email notification

### Admin Dashboard

- Manage products
- View all enquiries
- Configure coupons
- Update shipping rates

---

## ⚠️ Common Issues & Fixes

| Issue                 | Solution                                          |
| --------------------- | ------------------------------------------------- |
| MongoDB won't connect | Check .env URI, verify IP whitelist               |
| Email not sending     | Use Gmail app password, not regular password      |
| Tailwind not working  | `npm install -D tailwindcss postcss autoprefixer` |
| Port 5000/5173 in use | Change PORT in .env or kill process               |
| CORS errors           | Verify FRONTEND_URL in backend .env               |

---

## 📦 File Upload Limits

- Images: 5 MB
- Videos: 100 MB
- Allowed: JPEG, PNG, WebP, MP4, AVI, MOV

---

## 🔐 Security Checklist

- [ ] MongoDB password is strong
- [ ] Gmail app password generated (not regular password)
- [ ] `.env` file added to `.gitignore`
- [ ] FRONTEND_URL updated for production
- [ ] Razorpay credentials ready (for future payments)

---

## 🚀 Production Deployment

### Backend (Heroku example)

```bash
heroku login
heroku create ramyaas-backend
git push heroku main
heroku config:set MONGODB_URI=...
```

### Frontend (Vercel example)

```bash
npm install -g vercel
vercel
# Select backend URL for VITE_API_URL
```

---

## 📞 Support

**Need help?**

- Check error logs: `console` in browser (Frontend) or terminal (Backend)
- MongoDB: [Atlas Documentation](https://docs.atlas.mongodb.com/)
- Express: [Express.js Guide](https://expressjs.com/)
- React: [React Documentation](https://react.dev/)

---

## ✅ You're All Set!

Your RAMYAAS website is ready to go! 🎉

**Access Points:**

- 🏠 Frontend: http://localhost:5173
- 🔧 Admin: http://localhost:5173/admin
- 🚀 Backend: http://localhost:5000
- 📊 API Health: http://localhost:5000/api/health

**Happy Coding! 💻**
