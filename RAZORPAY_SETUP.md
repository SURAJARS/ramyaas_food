# Razorpay Integration - Complete Setup Guide

## ✅ What's Been Fixed

1. **Frontend Environment**
   - Changed from `NEXT_PUBLIC_API_URL` to `VITE_API_URL` (Vite compatible)
   - Updated `.env.local` with correct variable name
2. **Backend Routes**
   - Fixed route order to ensure `/verify` endpoint is matched before `/:id`
   - POST `/api/orders` - Create order with Razorpay
   - POST `/api/orders/verify` - Verify payment signature
3. **Razorpay Configuration**
   - Key ID: `rzp_test_S8swQbb4xjXEev`
   - Key Secret: `fJBOq5n3fStA3885krRIq62B`
   - Currency: INR
   - Amount: Converted to paise (multiply by 100)

## 🔧 How Payment Flow Works

```
1. User fills checkout form
   ↓
2. Clicks "Pay Now" button
   ↓
3. Frontend calls POST /api/orders
   ↓
4. Backend creates Razorpay order, returns:
   - razorpayOrderId
   - razorpayKeyId
   - orderId (MongoDB)
   ↓
5. Frontend loads Razorpay script
   ↓
6. Opens Razorpay payment modal
   ↓
7. User enters payment details (test card: 4111 1111 1111 1111)
   ↓
8. Razorpay returns payment ID + signature
   ↓
9. Frontend calls POST /api/orders/verify
   ↓
10. Backend verifies signature using HMAC SHA256
    ↓
11. If valid: Order marked as "paid" + "confirmed"
    Redirects to order confirmation
```

## 🧪 Testing Razorpay in Test Mode

### Test Cards

- **Success**: `4111 1111 1111 1111`
- **3D Secure**: `4012 8888 8888 1881`
- **Decline**: `4111 1111 1111 1112`

### Test Credentials

- CVV: Any 3-4 digits
- Expiry: Any future date
- Name: Any name

## 📋 Checklist for Razorpay Payment

✅ Backend `.env` contains RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
✅ Razorpay package installed (`npm install razorpay`)
✅ Frontend uses `VITE_API_URL` (not `NEXT_PUBLIC_API_URL`)
✅ Route order correct: `/verify` before `/:id`
✅ Razorpay script loads from CDN
✅ Payment signature verification implemented
✅ Order confirmation page setup

## 🐛 Debugging Razorpay Issues

### Issue 1: "Order not found" error

- Check MongoDB is running
- Verify Order model is correctly connected
- Check orderController.js has proper error handling

### Issue 2: "Payment verification failed"

- Ensure RAZORPAY_KEY_SECRET is correct
- Check signature calculation uses correct format
- Verify razorpayOrderId is stored in database

### Issue 3: Razorpay modal doesn't open

- Check Razorpay script loads: Look for `window.Razorpay`
- Verify razorpayKeyId is passed correctly
- Check browser console for JavaScript errors
- Ensure CORS is enabled for Razorpay

### Issue 4: "Network Error" in checkout

- Verify API_BASE_URL is correct in frontend
- Check backend server is running on port 5000
- Verify CORS includes frontend origin (http://localhost:5173)

## 🚀 Production Setup (When Ready)

1. Get Live Razorpay Keys
2. Update `.env` with live keys
3. Change `NODE_ENV` to "production"
4. Update CORS origins
5. Enable HTTPS (Razorpay requires HTTPS in production)
6. Set up proper error handling and logging
7. Configure email notifications for orders

## 📚 Resources

- Razorpay Dashboard: https://dashboard.razorpay.com
- API Documentation: https://razorpay.com/docs/api/orders/
- Test Mode Guide: https://razorpay.com/docs/testing/

---

**Current Setup Status**: ✅ Ready for Testing
