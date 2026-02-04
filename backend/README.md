# Backend API Documentation

## 📦 Setup

```bash
npm install
npm run dev    # Development mode (auto-reload)
npm start      # Production mode
```

Server runs on `http://localhost:5000`

---

## 🔌 API Routes & Endpoints

### 🥘 SNACKS MANAGEMENT

#### GET /api/snacks

Get all enabled snacks for customer view

```bash
curl http://localhost:5000/api/snacks
```

Response:

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nameTA": "முருக்கு",
    "nameEN": "Murukku",
    "price": 150,
    "category": "snacks",
    "image": "/uploads/images/1234567-murukku.jpg",
    "isEnabled": true
  }
]
```

#### POST /api/snacks (Admin)

Create new snack

```bash
curl -X POST http://localhost:5000/api/snacks \
  -F "nameTA=முருக்கு" \
  -F "nameEN=Murukku" \
  -F "price=150" \
  -F "category=snacks" \
  -F "image=@/path/to/image.jpg"
```

#### PUT /api/snacks/:id (Admin)

Update snack

```bash
curl -X PUT http://localhost:5000/api/snacks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"price": 200, "isEnabled": true}'
```

#### DELETE /api/snacks/:id (Admin)

Delete snack

```bash
curl -X DELETE http://localhost:5000/api/snacks/507f1f77bcf86cd799439011
```

---

### 📸 MENU IMAGES

#### GET /api/menu

Get all menu images

```bash
curl http://localhost:5000/api/menu
```

#### POST /api/menu (Admin)

Upload menu image

```bash
curl -X POST http://localhost:5000/api/menu \
  -F "titleTA=செட் மெனு" \
  -F "titleEN=Set Menu" \
  -F "displayOrder=1" \
  -F "image=@/path/to/menu.jpg"
```

#### PUT /api/menu/:id (Admin)

Update menu image

```bash
curl -X PUT http://localhost:5000/api/menu/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"displayOrder": 2}'
```

#### DELETE /api/menu/:id (Admin)

Delete menu image

```bash
curl -X DELETE http://localhost:5000/api/menu/507f1f77bcf86cd799439011
```

---

### 🎬 REELS / VIDEOS

#### GET /api/reels

Get all visible reels

```bash
curl http://localhost:5000/api/reels
```

#### POST /api/reels (Admin)

Create reel (upload or Instagram link)

```bash
# Upload video
curl -X POST http://localhost:5000/api/reels \
  -F "titleTA=பொடி தயாரிப்பு" \
  -F "type=upload" \
  -F "video=@/path/to/video.mp4"

# Instagram link
curl -X POST http://localhost:5000/api/reels \
  -H "Content-Type: application/json" \
  -d '{
    "titleTA": "Instagram Reel",
    "type": "instagram",
    "instagramLink": "https://instagram.com/reel/..."
  }'
```

#### PUT /api/reels/:id (Admin)

Update reel

```bash
curl -X PUT http://localhost:5000/api/reels/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"isVisible": true}'
```

#### DELETE /api/reels/:id (Admin)

Delete reel

```bash
curl -X DELETE http://localhost:5000/api/reels/507f1f77bcf86cd799439011
```

---

### 🎉 CATERING ORDERS

#### POST /api/catering

Submit catering enquiry

```bash
curl -X POST http://localhost:5000/api/catering \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "eventType": "Wedding",
    "eventDate": "2024-06-15",
    "guestCount": 200,
    "location": "Chennai",
    "budget": "100000-150000",
    "specialRequests": "Vegetarian only"
  }'
```

#### GET /api/catering (Admin)

Get all catering orders

```bash
curl http://localhost:5000/api/catering
```

#### PUT /api/catering/:id (Admin)

Update order status

```bash
curl -X PUT http://localhost:5000/api/catering/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"status": "quoted"}'
```

Status values: `new`, `contacted`, `quoted`, `rejected`, `completed`

#### DELETE /api/catering/:id (Admin)

Delete order

```bash
curl -X DELETE http://localhost:5000/api/catering/507f1f77bcf86cd799439011
```

---

### 📦 BULK ORDERS

#### POST /api/bulk-orders

Submit bulk order

```bash
curl -X POST http://localhost:5000/api/bulk-orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Supplier Inc",
    "email": "supplier@example.com",
    "phone": "9876543210",
    "company": "XYZ Foods",
    "item": "Murukku",
    "quantity": 500,
    "unit": "kg",
    "deliveryLocation": "Mumbai",
    "budget": "250000-500000",
    "remarks": "Monthly supply needed"
  }'
```

#### GET /api/bulk-orders (Admin)

Get all bulk orders

```bash
curl http://localhost:5000/api/bulk-orders
```

#### PUT /api/bulk-orders/:id (Admin)

Update order status

```bash
curl -X PUT http://localhost:5000/api/bulk-orders/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"status": "quoted"}'
```

#### DELETE /api/bulk-orders/:id (Admin)

Delete order

```bash
curl -X DELETE http://localhost:5000/api/bulk-orders/507f1f77bcf86cd799439011
```

---

### 🎟️ COUPONS & DISCOUNTS

#### GET /api/coupons

Get all active coupons

```bash
curl http://localhost:5000/api/coupons
```

#### GET /api/coupons/code/:code

Validate coupon code

```bash
curl http://localhost:5000/api/coupons/code/NEW10
```

Response:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "code": "NEW10",
  "discountType": "percentage",
  "discountValue": 10,
  "maxDiscount": 500,
  "minOrderValue": 100
}
```

#### POST /api/coupons (Admin)

Create coupon

```bash
curl -X POST http://localhost:5000/api/coupons \
  -H "Content-Type: application/json" \
  -d '{
    "code": "NEW10",
    "description": "10% discount for new users",
    "discountType": "percentage",
    "discountValue": 10,
    "maxDiscount": 500,
    "minOrderValue": 100,
    "maxUsage": 100,
    "expiryDate": "2024-12-31"
  }'
```

#### PUT /api/coupons/:id (Admin)

Update coupon

```bash
curl -X PUT http://localhost:5000/api/coupons/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"isActive": false}'
```

#### DELETE /api/coupons/:id (Admin)

Delete coupon

```bash
curl -X DELETE http://localhost:5000/api/coupons/507f1f77bcf86cd799439011
```

---

### 🚚 SHIPPING CONFIGURATION

#### GET /api/shipping

Get shipping config

```bash
curl http://localhost:5000/api/shipping
```

Response:

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "shippingCharge": 50,
  "freeShippingThreshold": 500
}
```

#### PUT /api/shipping (Admin)

Update shipping config

```bash
curl -X PUT http://localhost:5000/api/shipping \
  -H "Content-Type: application/json" \
  -d '{
    "shippingCharge": 75,
    "freeShippingThreshold": 750
  }'
```

**Auto-calculated Rules:**

- Order < ₹500 → Charge shipping
- Order ≥ ₹500 → Free shipping
- Order ≥ ₹1000 → Free shipping + 5% discount

---

### 💬 CONTACT ENQUIRIES

#### POST /api/enquiries

Submit contact enquiry

```bash
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "message": "Great products!",
    "type": "feedback"
  }'
```

Type values: `general`, `complaint`, `feedback`

#### GET /api/enquiries (Admin)

Get all enquiries

```bash
curl http://localhost:5000/api/enquiries
```

#### PUT /api/enquiries/:id (Admin)

Update enquiry status

```bash
curl -X PUT http://localhost:5000/api/enquiries/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"status": "replied"}'
```

Status values: `new`, `replied`, `closed`

#### DELETE /api/enquiries/:id (Admin)

Delete enquiry

```bash
curl -X DELETE http://localhost:5000/api/enquiries/507f1f77bcf86cd799439011
```

---

### 🏥 HEALTH CHECK

#### GET /api/health

Check server status

```bash
curl http://localhost:5000/api/health
```

Response:

```json
{
  "status": "Server is running ✅"
}
```

---

## 📊 Database Models

### SnackItem

```javascript
{
  _id: ObjectId,
  nameTA: String,
  nameEN: String,
  descriptionTA: String,
  descriptionEN: String,
  price: Number,
  image: String,
  isEnabled: Boolean,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### CateringOrder

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  eventType: String,
  eventDate: Date,
  guestCount: Number,
  location: String,
  budget: String,
  specialRequests: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 CORS Configuration

Frontend URL configured in `.env`:

```
FRONTEND_URL=http://localhost:5173
```

Allowed origins:

- Frontend URL from .env
- http://localhost:3000 (for testing)

---

## 📧 Email Templates

Automated emails sent for:

- Catering enquiries
- Bulk orders
- Contact enquiries

Edit templates in `utils/emailService.js`

---

## 🐛 Error Handling

All endpoints return proper HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad request
- `404` - Not found
- `500` - Server error

Error response format:

```json
{
  "message": "Error description"
}
```

---

## 🚀 Deployment Notes

### Environment Variables Required

```
PORT=5000
MONGODB_URI=...
EMAIL_USER=...
EMAIL_PASSWORD=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
FRONTEND_URL=...
```

### File Uploads

- Images stored in: `src/uploads/images/`
- Videos stored in: `src/uploads/videos/`
- Accessible via: `/uploads/images/filename`

### Production Checklist

- [ ] MONGODB_URI points to production database
- [ ] EMAIL credentials configured
- [ ] FRONTEND_URL updated to production domain
- [ ] File upload permissions verified
- [ ] CORS origins updated
- [ ] Environment variables set on hosting platform

---

## 📞 Support

For issues:

1. Check MongoDB Atlas status
2. Verify Gmail app password
3. Review `.env` configuration
4. Check server logs in terminal

---

**API is ready! Start building! 🚀**
