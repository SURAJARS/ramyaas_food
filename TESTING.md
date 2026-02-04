# 🧪 Testing Guide - RAMYAAS

Complete testing guide for all features before production.

---

## ✅ Local Testing Checklist

### Prerequisites

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] MongoDB connected
- [ ] Email service configured

---

## 🏠 Homepage Tests

```
URL: http://localhost:5173/
```

- [ ] Logo visible with tagline
- [ ] Statistics dashboard shows correct counts
- [ ] About section displays with image placeholder
- [ ] Services section shows 3 cards
- [ ] All links are clickable
- [ ] Language toggle works (TA | EN)
- [ ] Mobile responsive on phone/tablet
- [ ] Footer visible at bottom

---

## 🛍️ Snacks Page Tests

```
URL: http://localhost:5173/snacks
```

- [ ] Page loads with heading
- [ ] Snack cards display in grid
- [ ] Each card shows image, name, price
- [ ] Product image loads correctly
- [ ] Description displays (if available)
- [ ] WhatsApp button visible
- [ ] Click WhatsApp opens correct link
- [ ] Grid responsive on mobile (1 column)
- [ ] Grid responsive on tablet (2 columns)
- [ ] Grid responsive on desktop (3 columns)
- [ ] Language toggle shows Tamil/English text

---

## 📸 Menu Page Tests

```
URL: http://localhost:5173/menu
```

- [ ] Menu images display in grid
- [ ] Images load without errors
- [ ] Click image opens lightbox
- [ ] Lightbox shows enlarged image
- [ ] Close button (✕) works
- [ ] Click outside lightbox closes it
- [ ] Mobile responsive layout
- [ ] Language toggle works

---

## 🎉 Catering Page Tests

```
URL: http://localhost:5173/catering
```

**Form Validation:**

- [ ] Name field required
- [ ] Email field required and validates
- [ ] Phone field required
- [ ] Can submit with valid data
- [ ] Submit button shows loading state
- [ ] Success message appears after submit
- [ ] Form clears after submit

**Data Storage:**

- [ ] Order saved in MongoDB
- [ ] Admin receives email notification
- [ ] Email contains all details
- [ ] Status set to "new"
- [ ] Timestamp recorded correctly

**UI/UX:**

- [ ] Form displays properly on mobile
- [ ] All fields visible without scrolling (desktop)
- [ ] Placeholder text helpful
- [ ] Error messages clear and helpful
- [ ] Language toggle works

---

## 📦 Bulk Orders Page Tests

```
URL: http://localhost:5173/bulk-orders
```

- [ ] Form displays all fields
- [ ] Name/email/phone validation works
- [ ] Quantity accepts numbers
- [ ] Unit dropdown shows options (Kg, Litre, Pieces)
- [ ] Form submission successful
- [ ] Success message appears
- [ ] Data saved in MongoDB
- [ ] Admin receives email
- [ ] Mobile responsive
- [ ] Language toggle works

---

## 🎬 Reels Page Tests

```
URL: http://localhost:5173/reels
```

**Video Upload:**

- [ ] Reel cards display
- [ ] If uploaded video: plays with controls
- [ ] If Instagram link: embeds properly
- [ ] Title and description show
- [ ] Mobile responsive layout
- [ ] Language toggle works

---

## 📞 Contact Page Tests

```
URL: http://localhost:5173/contact
```

- [ ] Contact info cards display
- [ ] Phone number visible
- [ ] Email address visible
- [ ] Address displayed
- [ ] Contact form loads
- [ ] Name/email/phone validation
- [ ] Message textarea accepts text
- [ ] Form submission works
- [ ] Success message shows
- [ ] Admin email received
- [ ] Mobile responsive
- [ ] Language toggle works

---

## 🔧 Admin Dashboard Tests

```
URL: http://localhost:5173/admin
```

### Dashboard Tab

- [ ] Shows welcome message
- [ ] 3 info cards display
- [ ] Tab navigation works

### Snacks Tab

- [ ] Form fields visible and functional
- [ ] Can upload image
- [ ] Tamil and English name inputs work
- [ ] Price input validates (numbers only)
- [ ] Category dropdown shows options
- [ ] Enable checkbox works
- [ ] Submit button creates snack
- [ ] Success message appears
- [ ] New snack appears in table
- [ ] Edit button allows modification
- [ ] Delete button removes snack
- [ ] Image displays in snack list

### Menu Images Tab

- [ ] Upload form visible
- [ ] Can select and upload image
- [ ] Title fields work (TA/EN)
- [ ] Display order input works
- [ ] Submit creates menu image
- [ ] Images display in grid
- [ ] Delete button works

### Reels Tab

- [ ] Type toggle (Upload/Instagram) works
- [ ] File upload for videos works
- [ ] Instagram link input appears when selected
- [ ] Form submission successful
- [ ] Reels display in grid
- [ ] Delete button works

### Orders Tab

- [ ] Can switch between Catering/Bulk/Enquiries tabs
- [ ] Orders display in table format
- [ ] Status dropdown shows options
- [ ] Changing status updates in MongoDB
- [ ] Delete button removes order
- [ ] Date displays correctly

### Settings Tab

- [ ] Shipping charge field shows current value
- [ ] Free shipping threshold displays
- [ ] Update shipping settings works
- [ ] Coupon code field accepts text
- [ ] Discount value input works
- [ ] Discount type selector works
- [ ] Min order value input works
- [ ] Add coupon creates new coupon
- [ ] Coupons display in table
- [ ] Delete coupon works

---

## 🌐 API Tests

Using curl or Postman:

### Health Check

```bash
curl http://localhost:5000/api/health
# Expected: {"status": "Server is running ✅"}
```

### Snacks CRUD

```bash
# Create
curl -X POST http://localhost:5000/api/snacks \
  -F "nameTA=முருக்கு" \
  -F "nameEN=Murukku" \
  -F "price=150" \
  -F "image=@test.jpg"

# Read
curl http://localhost:5000/api/snacks

# Update
curl -X PUT http://localhost:5000/api/snacks/[ID] \
  -H "Content-Type: application/json" \
  -d '{"price": 200}'

# Delete
curl -X DELETE http://localhost:5000/api/snacks/[ID]
```

### Catering Order

```bash
curl -X POST http://localhost:5000/api/catering \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "9876543210",
    "eventType": "Wedding",
    "guestCount": 100,
    "location": "Chennai",
    "budget": "100000"
  }'
```

### Verify Database

```bash
# MongoDB Atlas
1. Go to dashboard
2. Collections tab
3. Check data in collections
4. Verify timestamps
```

---

## 🔐 Security Tests

- [ ] .env file not visible in browser
- [ ] Environment variables not logged
- [ ] Password fields have type="password"
- [ ] No sensitive data in URLs
- [ ] CORS only allows frontend domain
- [ ] File upload size limited
- [ ] File upload types validated
- [ ] SQL injection prevention (MongoDB default)
- [ ] XSS prevention in inputs
- [ ] CSRF tokens considered (if added)

---

## 📱 Mobile Tests

### iPhone (375px)

- [ ] All pages responsive
- [ ] Text readable (no horizontal scroll)
- [ ] Buttons clickable (touch targets)
- [ ] Forms usable on mobile
- [ ] Images scale properly
- [ ] Navigation accessible

### Android (360px)

- [ ] Same as iPhone
- [ ] Touch interactions smooth

### Tablet (768px)

- [ ] Layout adjusts to tablet
- [ ] Grid shows 2 columns
- [ ] Forms properly formatted

---

## 🎨 UI/UX Tests

- [ ] Consistent color scheme
- [ ] Font sizes readable
- [ ] Spacing (padding/margin) consistent
- [ ] Buttons have hover effects
- [ ] Links have underlines/indicators
- [ ] Loading states visible
- [ ] Error messages in red
- [ ] Success messages in green
- [ ] Forms have proper labels
- [ ] Placeholders helpful
- [ ] No broken images
- [ ] No console errors

---

## 🌍 Internationalization Tests

### Tamil (Default)

- [ ] Header in Tamil
- [ ] Navigation in Tamil
- [ ] Form labels in Tamil
- [ ] Button text in Tamil
- [ ] Success messages in Tamil

### English

- [ ] Click EN toggle
- [ ] All text switches to English
- [ ] Layout same, content different
- [ ] Fonts readable

### Persistence

- [ ] Refresh page - language persists
- [ ] Close tab - language persists
- [ ] Different pages - same language

---

## 📊 Database Tests

### Collections Exist

```bash
# MongoDB Atlas → Collections
- SnackItem
- MenuImage
- ReelContent
- CateringOrder
- BulkOrder
- Coupon
- DiscountRule
- ShippingConfig
- Enquiry
```

- [ ] All 9 collections visible
- [ ] Documents have correct fields
- [ ] Timestamps record correctly
- [ ] IDs auto-generate

### Data Relationships

- [ ] Catering orders link to user
- [ ] Orders have timestamps
- [ ] Status fields default to "new"

---

## 📧 Email Tests

### Catering Email

1. Submit catering enquiry
2. Check inbox for email from admin

- [ ] Subject line correct
- [ ] Email received within 5 seconds
- [ ] All form data in email
- [ ] HTML formatting correct

### Bulk Order Email

1. Submit bulk order
2. Check email

- [ ] Email sent
- [ ] All data included
- [ ] Formatted properly

### Contact Email

1. Submit contact form
2. Check email

- [ ] Received
- [ ] Contains message

---

## ⚡ Performance Tests

### Page Load Time

- [ ] Homepage < 2 seconds
- [ ] Snacks page < 3 seconds (with images)
- [ ] Admin dashboard < 2 seconds

### Image Optimization

- [ ] Images < 500KB each
- [ ] Images display at correct size
- [ ] No stretched/squashed images

### API Response Time

- [ ] GET requests < 500ms
- [ ] POST requests < 1000ms
- [ ] No timeouts

### Browser Compatibility

- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest

---

## 🧠 User Journey Tests

### New Customer Path

1. Visit homepage ✓
2. Browse products (Snacks) ✓
3. Click WhatsApp enquiry ✓
4. WhatsApp opens ✓
5. Back to site ✓
6. Browse catering ✓
7. Submit catering enquiry ✓
8. See success message ✓

### Admin Path

1. Visit admin dashboard ✓
2. Upload new snack ✓
3. Add coupon code ✓
4. View catering orders ✓
5. Update order status ✓
6. Delete old order ✓

---

## 🐛 Bug Checklist

- [ ] No console errors
- [ ] No network errors (404, 500)
- [ ] Forms don't submit twice
- [ ] Delete confirmations work
- [ ] Modals close properly
- [ ] Scroll behavior normal
- [ ] No memory leaks
- [ ] No slow animations
- [ ] No broken links
- [ ] No missing images

---

## 📋 Final Checklist Before Launch

### Functionality

- [ ] All pages working
- [ ] All forms submitting
- [ ] All APIs responding
- [ ] Database saving data
- [ ] Emails sending
- [ ] File uploads working

### Performance

- [ ] Pages load fast
- [ ] No lag/stuttering
- [ ] Responsive on all devices
- [ ] No broken images

### Security

- [ ] No sensitive data exposed
- [ ] CORS configured
- [ ] HTTPS ready
- [ ] Input validation works

### UX

- [ ] Clear error messages
- [ ] Loading states visible
- [ ] Mobile friendly
- [ ] Accessible (keyboard nav)
- [ ] Bilingual working

### Documentation

- [ ] README complete
- [ ] QUICKSTART guide ready
- [ ] API docs available
- [ ] Deployment guide ready

---

## 🚀 Ready for Production?

When all checkboxes are ✓, you're ready to deploy!

### Pre-Launch Announcement

```
"🎉 RAMYAAS Website Launching Soon!
🌐 Visit: [your-domain.com]
📱 Order from your phone
🎯 Bilingual support
🚚 Fast delivery
```

```

---

## 📞 Post-Launch Monitoring

1. **Monitor Errors**: Check logs daily
2. **Track Analytics**: Monitor user behavior
3. **Gather Feedback**: Collect customer input
4. **Performance**: Monitor page speed
5. **Database**: Backup regularly
6. **Email**: Check delivery rates

---

**Testing Complete! Ready to Launch! 🎊**
```
