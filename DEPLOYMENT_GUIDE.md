# RAMYAAS Food - GitHub & Deployment Guide

## Phase 1: GitHub Setup & Push

### Step 1: Initialize Git Repository

```bash
cd c:\Users\SURAJ ARS\Desktop\ramyaas_food
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
```

### Step 2: Create .gitignore

Create a file named `.gitignore` in the root directory with:

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Environment
.env
.env.local
.env.production.local

# Build outputs
/frontend/dist/
/backend/build/

# Logs
npm-debug.log*
yarn-debug.log*
.log

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Uploads (backend)
/backend/src/uploads/
```

### Step 3: Add All Files & Commit

```bash
git add .
git commit -m "Initial commit: RAMYAAS Food website with Snacks, Catering, Bulk Orders, and Razorpay integration"
```

### Step 4: Add GitHub Remote

```bash
git remote add origin https://github.com/SURAJARS/ramyaas_food.git
git branch -M main
git push -u origin main
```

---

## Phase 2: Frontend Deployment (Vercel)

### Pre-Deployment Checklist

- ✅ Frontend is in `/frontend` folder
- ✅ Has `package.json` with build script
- ✅ Uses Vite (configured in `vite.config.js`)
- ✅ Environment variables in `.env.local`

### Step 1: Prepare Frontend Environment Variables

Create `.env.production` in frontend folder:

```env
VITE_API_URL=https://ramyaas-backend.onrender.com/api
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign up with GitHub
2. Click "New Project"
3. Import the `ramyaas_food` repository
4. Configure Project Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_API_URL`: `https://ramyaas-backend.onrender.com/api`
6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

After deployment:

1. Go to Project Settings → Domains
2. Add your custom domain or use Vercel's provided URL
3. Update backend `FRONTEND_URL` environment variable

---

## Phase 3: Backend Deployment (Render)

### Pre-Deployment Checklist

- ✅ Backend is in `/backend` folder
- ✅ Has `package.json` with start script
- ✅ Uses Node.js with Express
- ✅ Environment variables configured

### Step 1: Update Backend Environment Variables

**Important**: Before pushing, update `.env` for production:

```env
PORT=5000
MONGODB_URI=mongodb+srv://ramyaas:ramyaas@ramyaasfood.pglu751.mongodb.net/?appName=ramyaasfood
EMAIL_USER=ramyakumar031998@gmail.com
EMAIL_PASSWORD=dzwghoxuscwxaebw
RAZORPAY_KEY_ID=rzp_live_SC9gIr4xzqvlPK
RAZORPAY_KEY_SECRET=Acg5jobwcgREddPPBhTGsPuV
FRONTEND_URL=https://yourdomain.com
NODE_ENV=production
```

### Step 2: Add Start Script

Verify `backend/package.json` has:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### Step 3: Deploy to Render

1. Go to https://render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure Service:
   - **Name**: `ramyaas-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)
5. Add Environment Variables (in Render dashboard):
   - `PORT`: `5000`
   - `MONGODB_URI`: `mongodb+srv://ramyaas:ramyaas@ramyaasfood.pglu751.mongodb.net/?appName=ramyaasfood`
   - `EMAIL_USER`: `ramyakumar031998@gmail.com`
   - `EMAIL_PASSWORD`: `dzwghoxuscwxaebw`
   - `RAZORPAY_KEY_ID`: `rzp_live_SC9gIr4xzqvlPK`
   - `RAZORPAY_KEY_SECRET`: `Acg5jobwcgREddPPBhTGsPuV`
   - `FRONTEND_URL`: `https://yourdomain.com` (or Vercel URL)
   - `NODE_ENV`: `production`
6. Click "Create Web Service"

### Step 4: Get Backend URL

After deployment, Render will provide a URL like:

```
https://ramyaas-backend.onrender.com
```

Update this in:

- Frontend `.env.production`: `VITE_API_URL=https://ramyaas-backend.onrender.com/api`

---

## Phase 4: CORS Configuration

After getting Vercel & Render URLs:

1. Update backend `.env`:

```env
FRONTEND_URL=https://your-vercel-frontend.vercel.app
```

2. Verify `backend/src/server.js` CORS config:

```javascript
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);
```

---

## Phase 5: Verify Production Deployment

### Test Backend

```bash
curl https://ramyaas-backend.onrender.com/api/health
```

Expected response:

```json
{ "status": "Server is running ✅" }
```

### Test Frontend

1. Visit https://your-vercel-frontend.vercel.app
2. Test navigation, forms, payments
3. Check browser console for errors (F12)

### Troubleshooting

**502 Bad Gateway on Render**:

- Check Render logs: go to Service → Logs
- Verify MongoDB connection string
- Ensure all environment variables are set

**Frontend not connecting to backend**:

- Check `VITE_API_URL` in Vercel environment variables
- Verify CORS settings on backend
- Check browser Network tab (F12) for failed requests

**Email not sending**:

- Verify `EMAIL_PASSWORD` is correct (Gmail app password)
- Check Render logs for email service errors
- Test with MongoDB Compass that order was saved

---

## Quick Reference: Commands

### Push to GitHub

```bash
cd c:\Users\SURAJ ARS\Desktop\ramyaas_food
git add .
git commit -m "Your message"
git push origin main
```

### Update after changes

```bash
git add .
git commit -m "Description of changes"
git push
```

### Deployment Status

- **Frontend**: https://vercel.com (check Project Dashboard)
- **Backend**: https://render.com (check Service Logs)
- **Database**: https://cloud.mongodb.com

---

## Production Checklist

Before considering deployment complete:

- [ ] Push all code to GitHub
- [ ] Frontend deployed on Vercel and working
- [ ] Backend deployed on Render and running
- [ ] MongoDB connection active
- [ ] CORS configured correctly
- [ ] Email notifications working
- [ ] Razorpay payments working (live mode)
- [ ] All forms submitting successfully
- [ ] Custom domain configured (if desired)
- [ ] SSL certificate active (auto-enabled on Vercel & Render)

---

## Important Notes

1. **Never commit .env file** - Use .gitignore
2. **Use live Razorpay credentials only in production**
3. **Render free tier restarts apps frequently** - consider paid tier for production
4. **MongoDB Atlas has connection limits** - monitor usage
5. **Email password should be Gmail App Password**, not main password
6. **FRONTEND_URL must match your deployment domain** for CORS to work
