# 🚀 RAMYAAS Deployment Guide

Complete guide to deploy RAMYAAS on production servers.

---

## 📋 Pre-Deployment Checklist

- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] All environment variables prepared
- [ ] MongoDB Atlas cluster created
- [ ] Gmail account ready for emails
- [ ] Domain name purchased/configured
- [ ] SSL certificate (auto with Vercel/Netlify)

---

## 🔑 Environment Variables Needed

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ramyaas_food
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
RAZORPAY_KEY_ID=test_key_123
RAZORPAY_KEY_SECRET=test_secret_456
FRONTEND_URL=https://ramyaas.vercel.app
NODE_ENV=production
```

### Frontend (.env or config)

```
VITE_API_URL=https://ramyaas-backend.onrender.com/api
```

---

## 🌐 Backend Deployment

### Option 1: Railway (Recommended - Easiest)

```bash
# 1. Install Railway CLI
npm install -g railway

# 2. Login to Railway
railway login

# 3. Initialize project
cd backend
railway init

# 4. Add environment variables
# Visit: https://railway.app/dashboard
# Project → Variables → Add all from .env

# 5. Deploy
railway up

# 6. Get backend URL
railway domain
# Use this URL as FRONTEND_URL
```

**Advantages:**

- Simple deployment
- Free tier available
- Auto-scaling
- GitHub integration

---

### Option 2: Render.com

```bash
# 1. Create account at render.com

# 2. Create new Web Service
# Repository: GitHub/GitLab
# Branch: main
# Build Command: npm install
# Start Command: npm start

# 3. Add environment variables in Render dashboard

# 4. Deploy
# Auto-deployed on git push

# Backend URL will be: https://ramyaas-backend.onrender.com
```

---

### Option 3: Heroku (Legacy but Works)

```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Create app
cd backend
heroku create ramyaas-backend

# 4. Add environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set EMAIL_USER=...
heroku config:set EMAIL_PASSWORD=...
# ... etc

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail

# Backend URL: https://ramyaas-backend.herokuapp.com
```

---

### Option 4: Self-Hosted (VPS/Linode/DigitalOcean)

```bash
# 1. SSH into server
ssh root@your_server_ip

# 2. Update system
sudo apt update
sudo apt upgrade

# 3. Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# 4. Clone repository
git clone https://github.com/your-repo/ramyaas.git
cd ramyaas/backend

# 5. Install dependencies
npm install --production

# 6. Create .env file
nano .env
# Paste all environment variables

# 7. Install PM2 (process manager)
sudo npm install -g pm2

# 8. Start application
pm2 start src/server.js --name "ramyaas-backend"
pm2 startup
pm2 save

# 9. Install Nginx (reverse proxy)
sudo apt install nginx

# 10. Configure Nginx
sudo nano /etc/nginx/sites-available/default
# Add configuration (see below)

# 11. Enable SSL with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com

# 12. Restart Nginx
sudo systemctl restart nginx

# Visit: https://yourdomain.com/api/health
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to frontend
cd frontend

# 3. Deploy
vercel

# 4. During deployment, configure:
# - Project name: ramyaas-frontend
# - Framework: React
# - Build command: npm run build
# - Output directory: dist

# 5. Add environment variables
# Vercel dashboard → Settings → Environment Variables
# Add: VITE_API_URL=https://your-backend-url.com/api

# 6. Redeploy
vercel --prod

# Frontend URL: https://ramyaas-frontend.vercel.app
```

---

### Option 2: Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Navigate to frontend
cd frontend

# 3. Build project
npm run build

# 4. Deploy
netlify deploy --prod --dir=dist

# 5. Set environment variables
# Netlify dashboard → Site Settings → Build & Deploy → Environment
# Add: VITE_API_URL=https://your-backend-url.com/api

# 6. Redeploy after adding env vars
netlify deploy --prod --dir=dist

# Frontend URL: https://ramyaas-frontend.netlify.app
```

---

### Option 3: GitHub Pages

```bash
# 1. Update vite.config.js
export default defineConfig({
  base: '/ramyaas_food/',
  // ... rest of config
})

# 2. Create GitHub Actions workflow
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd frontend && npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist

# 3. Push to GitHub
git push origin main

# Frontend URL: https://yourusername.github.io/ramyaas_food
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create Account

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up (free tier available)

### 2. Create Cluster

- Click "Create a Project"
- Name: "ramyaas"
- Click "Create Cluster"
- Choose free tier (M0)
- Select region closest to you
- Click "Create Cluster"

### 3. Create Database User

- Go to "Database Access"
- Click "Add New Database User"
- Username: ramyaas_user
- Password: Generate secure password
- Save password somewhere safe

### 4. Allow Access

- Go to "Network Access"
- Click "Add IP Address"
- Select "Allow access from anywhere" (0.0.0.0/0)
- Or add specific IPs

### 5. Get Connection String

- Go to "Clusters" → "Connect"
- Choose "Connect your application"
- Copy connection string
- Replace `<username>` and `<password>`
- Add `/ramyaas_food` at end for database name

### Connection String Format:

```
mongodb+srv://ramyaas_user:PASSWORD@cluster0.mongodb.net/ramyaas_food?retryWrites=true&w=majority
```

---

## 📧 Email Configuration (Gmail)

### 1. Enable 2-Factor Authentication

- Go to [Google Account](https://myaccount.google.com/)
- Security → 2-Step Verification
- Follow steps to enable

### 2. Generate App Password

- Go to [App Passwords](https://myaccount.google.com/apppasswords)
- Select "Mail" and "Windows Computer"
- Google generates 16-character password
- Copy this password

### 3. Update Backend .env

```
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (the 16-char password)
```

---

## 🔗 Domain Configuration (DNS)

### Using Vercel/Netlify Domains

Automatic - no DNS needed

### Using Custom Domain (Namecheap/GoDaddy)

```
Frontend (Vercel):
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Backend (Railway/Render):
Type: A
Name: api
Value: [Your backend IP or CNAME]
```

---

## 🔒 SSL Certificate

### Automatic (Vercel/Netlify)

- Automatically included
- Auto-renews

### Self-Hosted (Let's Encrypt)

```bash
sudo apt install certbot
sudo certbot certonly --nginx -d yourdomain.com
# Certificates at: /etc/letsencrypt/live/yourdomain.com/
```

---

## ✅ Post-Deployment Testing

### 1. Test Backend API

```bash
curl https://your-backend-url.com/api/health
# Should return: {"status": "Server is running ✅"}
```

### 2. Test Frontend

- Visit https://your-frontend-url.com
- Check all pages load
- Test language toggle
- Submit test form

### 3. Test API Integration

- Try creating a snack
- Check if file upload works
- Submit catering enquiry
- Verify email received

### 4. Test WhatsApp

- Click WhatsApp button on snack
- Verify message opens

### 5. Performance Check

- Use [Google PageSpeed](https://pagespeed.web.dev/)
- Target: 90+ score

---

## 📊 Monitoring & Logging

### Backend Logs

```bash
# Railway
railway logs

# Render
# Dashboard → Logs

# Heroku
heroku logs --tail

# Self-hosted
pm2 logs
```

### Error Tracking

Add Sentry (optional):

```bash
npm install @sentry/node
# Add to server.js
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: "your-sentry-dsn" });
```

### Performance Monitoring

- Use New Relic
- Use DataDog
- Use Vercel Analytics

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Deploy Backend
        run: |
          cd backend
          git push https://x-access-token:${{ secrets.RAILWAY_TOKEN }}@github.com/railway/railway.git main

      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## 💾 Backup Strategy

### MongoDB

```bash
# Backup to local
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/ramyaas_food"

# Restore from backup
mongorestore --uri="mongodb+srv://user:pass@..." --archive=backup.archive
```

### Application Files

```bash
# Use git to version control
# Use GitHub as backup repository
# Enable automatic backups on hosting platform
```

---

## 🚨 Troubleshooting Deployment

| Issue                    | Solution                                     |
| ------------------------ | -------------------------------------------- |
| 404 Not Found            | Check CORS, verify backend URL               |
| MongoDB connection fails | Check connection string, whitelist IPs       |
| Emails not sending       | Use Gmail app password, not regular password |
| File uploads fail        | Check upload directory permissions           |
| Slow performance         | Enable caching, optimize images              |
| Blank frontend           | Check browser console for errors             |
| API timeouts             | Increase timeout in nginx/server             |

---

## 🔐 Security Best Practices

- [ ] Use strong database passwords
- [ ] Never commit .env files
- [ ] Use HTTPS only
- [ ] Enable CORS for frontend domain only
- [ ] Validate all inputs
- [ ] Rate limit API endpoints
- [ ] Keep dependencies updated
- [ ] Regular backups
- [ ] Monitor error logs
- [ ] Use environment variables for secrets

---

## 📈 Scaling Preparation

If traffic grows:

1. **Database**: MongoDB auto-scales on Atlas
2. **Backend**: Use load balancer (Nginx/HAProxy)
3. **Frontend**: Already using CDN (Vercel/Netlify)
4. **Cache**: Add Redis for session caching
5. **Images**: Use CDN like Cloudflare
6. **Analytics**: Add monitoring tools

---

## 🎯 Production URLs

**After deployment, share these:**

```
Frontend: https://ramyaas-frontend.vercel.app
Admin: https://ramyaas-frontend.vercel.app/admin
API: https://ramyaas-backend.onrender.com
API Health: https://ramyaas-backend.onrender.com/api/health
```

---

## 🎉 Deployment Complete!

Your RAMYAAS website is now live! 🚀

### Next Steps:

1. Share links with team
2. Add test data
3. Promote on social media
4. Monitor analytics
5. Gather customer feedback
6. Iterate and improve

---

## 📞 Support

For deployment issues:

- Check hosting platform docs
- Review error logs
- Verify environment variables
- Test locally first
- Check networking/firewall

---

**Deployment Guide Complete! 🎊**
