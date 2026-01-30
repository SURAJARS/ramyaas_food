# Frontend - React + Vite + Tailwind

## 🚀 Quick Start

```bash
npm install
npm run dev      # Development server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 📁 Project Structure

```
src/
├── pages/              # Page components
│   ├── Home.jsx       # Homepage with stats
│   ├── Snacks.jsx     # Product catalog
│   ├── Menu.jsx       # Menu gallery
│   ├── Catering.jsx   # Catering enquiry
│   ├── BulkOrders.jsx # Bulk order form
│   ├── Reels.jsx      # Video gallery
│   ├── Contact.jsx    # Contact form
│   └── admin/
│       ├── Admin.jsx
│       ├── AdminSnacks.jsx
│       ├── AdminMenu.jsx
│       ├── AdminReels.jsx
│       ├── AdminSettings.jsx
│       └── AdminOrders.jsx
├── components/
│   ├── Layout.jsx      # Header, Nav, Footer
│   ├── Common.jsx      # Reusable components
│   └── Lightbox.jsx    # Image lightbox
├── context/
│   └── LanguageContext.jsx  # Tamil/English toggle
├── utils/
│   ├── api.js          # API calls (Axios)
│   └── translations.js # All text strings
├── App.jsx             # Main app with routing
├── main.jsx            # React DOM entry
└── index.css           # Tailwind + Custom styles
```

---

## 🌍 Language Support

### Tamil (Default) + English

All content supports bilingual display. Language persists in localStorage.

#### Add New Translations

Edit `src/utils/translations.js`:

```javascript
const tamilvEnglish = {
  myKey: { ta: "தமிழ் உரை", en: "English Text" },
};

// Use in components:
import { gettext } from "../utils/translations";
import { useLanguage } from "../context/LanguageContext";

const MyComponent = () => {
  const { language } = useLanguage();
  return <h1>{gettext("myKey", language)}</h1>;
};
```

---

## 🎨 Component Architecture

### Layout Components (src/components/Layout.jsx)

#### Header

- Logo and tagline
- Language toggle button (TA | EN)

#### Navigation

- Links to all main pages
- Responsive mobile menu

#### Footer

- Contact info
- Links
- Social media placeholders

### Common Components (src/components/Common.jsx)

#### SnackCard

Display individual product with:

- Image
- Tamil/English name
- Price
- WhatsApp enquiry button

#### LoadingSpinner

Animated spinner while loading

#### ErrorMessage

Red alert box for errors

#### SuccessMessage

Green alert box for success

### Pages

#### Home (src/pages/Home.jsx)

- Hero section
- Stats dashboard
- About section
- Services overview

#### Snacks (src/pages/Snacks.jsx)

- Grid of snack cards
- WhatsApp integration
- Bilingual support

#### Menu (src/pages/Menu.jsx)

- Image gallery
- Lightbox preview
- Responsive grid

#### Catering (src/pages/Catering.jsx)

- Multi-field form
- Email notification to admin
- Success/error messages

#### BulkOrders (src/pages/BulkOrders.jsx)

- Wholesale enquiry form
- Quantity/unit selection
- Admin notification

#### Reels (src/pages/Reels.jsx)

- Video upload support
- Instagram reel embedding
- Responsive player

#### Contact (src/pages/Contact.jsx)

- Contact form
- Contact info cards
- Email integration

#### Admin Dashboard (src/pages/admin/Admin.jsx)

- Tab-based interface
- Snacks management
- Menu image upload
- Reels management
- Order tracking
- Coupon configuration
- Shipping settings

---

## 🔌 API Integration

File: `src/utils/api.js`

Uses Axios for all HTTP calls. All endpoints configured with base URL from environment or localhost:5000.

### Example API Call

```javascript
import { snackApi } from "../utils/api";

// Fetch snacks
const response = await snackApi.getAll();
const snacks = response.data;

// Create snack (admin)
const formData = new FormData();
formData.append("nameTA", "முருக்கு");
formData.append("image", fileInput);
await snackApi.create(formData);
```

### Available API Objects

- `snackApi` - CRUD for snacks
- `menuApi` - Menu images
- `reelsApi` - Videos
- `cateringApi` - Catering orders
- `bulkOrderApi` - Bulk orders
- `couponApi` - Coupons
- `shippingApi` - Shipping config
- `enquiryApi` - Contact enquiries

---

## 🎨 Styling System

### Tailwind CSS Configuration

Colors defined in `tailwind.config.js`:

```javascript
'ramyaas': {
  50: '#fdf9f4',     // Lightest
  100: '#f5ede3',
  500: '#d4a574',
  600: '#b8956a',    // Primary
  700: '#8b6f47',    // Dark
}
```

### Usage

```jsx
// Background
<div className="bg-ramyaas-50">Light background</div>

// Text
<h1 className="text-ramyaas-700">Dark heading</h1>

// Border
<div className="border-ramyaas-200">Bordered</div>
```

### Custom CSS

Global styles in `src/index.css`:

```css
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: #b8956a;
}

/* Loading spinner */
.spinner {
  animation: spin 1s linear infinite;
}
```

---

## 📱 Responsive Design

Mobile-first breakpoints:

```
sm: 640px   (tablets)
md: 768px   (desktops)
lg: 1024px  (large screens)
```

Example:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

---

## 🔐 Environment Variables

Create `.env.local` (optional):

```
VITE_API_URL=http://localhost:5000/api
```

Auto-defaults to localhost:5000/api if not set.

---

## 📦 Dependencies

### Core

- `react@18` - UI library
- `react-dom@18` - DOM rendering
- `react-router-dom@6` - Routing

### Utilities

- `axios@latest` - HTTP client
- `tailwindcss@3` - CSS framework

### Dev Dependencies

- `vite@5` - Build tool
- `@vitejs/plugin-react@4` - React plugin
- `postcss` - CSS processing
- `autoprefixer` - CSS prefixes

---

## 🚀 Building & Deployment

### Development Build

```bash
npm run dev
```

- Fast refresh enabled
- Source maps included
- Unoptimized

### Production Build

```bash
npm run build
```

- Output: `dist/` folder
- Optimized & minified
- Ready for deployment

### Preview Production Build

```bash
npm run preview
```

- Serves `dist/` locally
- Test before deployment

---

## 🌐 Deployment Options

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
# Select project
# Set VITE_API_URL to backend URL
```

### Netlify

```bash
npm run build
# Drag & drop 'dist' folder to Netlify
# Set environment variables in settings
```

### GitHub Pages

```bash
npm run build
# Deploy 'dist' folder
```

---

## 🎯 Common Tasks

### Change Logo

1. Place logo in `public/images/`
2. Update `src/components/Layout.jsx` Header component

### Add New Page

1. Create file in `src/pages/PageName.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Layout.jsx`

### Add Translation

1. Edit `src/utils/translations.js`
2. Add key with `{ ta: '...', en: '...' }`
3. Use `gettext('key', language)` in component

### Update Colors

1. Edit `tailwind.config.js`
2. Rebuild: `npm run dev`

### Change WhatsApp Number

1. Edit `src/components/Common.jsx` - `SnackCard` component
2. Update phone number in `whatsappUrl`

---

## 🐛 Troubleshooting

| Issue                 | Fix                                                    |
| --------------------- | ------------------------------------------------------ |
| API calls fail        | Ensure backend running on 5000                         |
| Tailwind not styling  | Run `npm run dev` to rebuild                           |
| Images not loading    | Check path in `public/` folder                         |
| Language not changing | Check localStorage: `localStorage.getItem('language')` |
| Routes not working    | Verify paths in `App.jsx` match URLs                   |

---

## 📊 Performance Tips

1. **Lazy load pages**

   ```jsx
   const Snacks = lazy(() => import("./pages/Snacks"));
   ```

2. **Optimize images**
   - Use WebP format
   - Compress before upload
   - Limit to 5MB per image

3. **Cache API responses**
   ```jsx
   useEffect(() => {
     // Cached fetch
   }, []);
   ```

---

## 🔗 File Upload

### Images

- Max: 5 MB
- Formats: JPEG, PNG, WebP
- Uploaded to: `backend/uploads/images/`
- Accessible via: `http://localhost:5000/uploads/images/filename`

### Videos

- Max: 100 MB
- Formats: MP4, AVI, MOV, WebM
- Uploaded to: `backend/uploads/videos/`

---

## 🧪 Testing Pages

1. **Homepage** - http://localhost:5173
2. **Snacks** - http://localhost:5173/snacks
3. **Menu** - http://localhost:5173/menu
4. **Catering** - http://localhost:5173/catering
5. **Bulk Orders** - http://localhost:5173/bulk-orders
6. **Reels** - http://localhost:5173/reels
7. **Contact** - http://localhost:5173/contact
8. **Admin** - http://localhost:5173/admin

---

## 📝 Code Style

### Components

- Functional components with hooks
- Use context for global state
- Props validation with PropTypes (optional)

### File Naming

- Components: PascalCase (MyComponent.jsx)
- Utilities: camelCase (myUtil.js)
- Folders: lowercase (pages, components)

### Imports

- Absolute imports (from root)
- Group by: React, external, local

---

## 🚀 Ready to Deploy!

Frontend is fully optimized for production. Just set backend URL and deploy! 🎉

---

**Happy Coding! 💻**
