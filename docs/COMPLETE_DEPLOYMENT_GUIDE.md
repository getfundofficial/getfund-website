# 🚀 Complete Deployment Guide - All Projects

## 📊 Project Structure

```
thehansguy/
├── getfund-cms/
│   ├── backend/          → Deploy as: getfund-cms-api
│   └── frontend/         → Deploy as: getfund-cms-dashboard
└── getfund-website/      → Deploy as: getfund-website
```

---

## ✅ Deployment Checklist

### Phase 1: Backend API (CMS)

- [ ] Navigate to backend: `cd getfund-cms/backend`
- [ ] Deploy: `vercel --prod`
  - [ ] Select scope: `thehansguy`
  - [ ] Project name: `getfund-cms-api`
- [ ] Note deployment URL: `______________________________`
- [ ] Go to Vercel Dashboard → Settings → Environment Variables
- [ ] Add these variables:
  - [ ] DATABASE_URL
  - [ ] POSTGRES_URL
  - [ ] POSTGRES_URL_NON_POOLING
  - [ ] POSTGRES_PRISMA_URL
  - [ ] JWT_SECRET
  - [ ] JWT_REFRESH_SECRET
  - [ ] JWT_EXPIRE=1d
  - [ ] JWT_REFRESH_EXPIRE=7d
  - [ ] NODE_ENV=production
- [ ] Redeploy: `vercel --prod`
- [ ] Test: `curl https://your-api-url.vercel.app/api/auth/login`

---

### Phase 2: CMS Admin Dashboard

- [ ] Navigate: `cd getfund-cms/frontend`
- [ ] Create `.env.production`:
  ```bash
  echo "VITE_API_URL=https://[your-backend-url].vercel.app/api" > .env.production
  ```
- [ ] Deploy: `vercel --prod`
  - [ ] Project name: `getfund-cms-dashboard`
- [ ] Note deployment URL: `______________________________`
- [ ] Update backend env vars in Vercel:
  - [ ] ADMIN_DASHBOARD_URL=https://[dashboard-url].vercel.app
- [ ] Redeploy backend: `cd ../backend && vercel --prod`
- [ ] Test dashboard login at your dashboard URL

---

### Phase 3: Public Website

- [ ] Navigate: `cd getfund-website`
- [ ] Create `.env.production`:
  ```bash
  echo "VITE_API_URL=https://[your-backend-url].vercel.app/api" > .env.production
  ```
- [ ] Deploy: `vercel --prod`
  - [ ] Project name: `getfund-website`
- [ ] Note deployment URL: `______________________________`
- [ ] Update backend env vars in Vercel:
  - [ ] PUBLIC_WEBSITE_URL=https://[website-url].vercel.app
- [ ] Redeploy backend: `cd ../getfund-cms/backend && vercel --prod`
- [ ] Test website at your website URL

---

## 🔗 Final URLs

Record your deployed URLs here:

```
Backend API:        https://________________________________.vercel.app
CMS Dashboard:      https://________________________________.vercel.app
Public Website:     https://________________________________.vercel.app
```

---

## 🧪 Testing Each Deployment

### Test Backend API:
```bash
# Health check (if available)
curl https://your-api-url.vercel.app/api/health

# Login test
curl -X POST https://your-api-url.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@getfund.gov.gh","password":"getfund2025"}'
```

### Test CMS Dashboard:
1. Open: `https://your-dashboard-url.vercel.app`
2. Login with: `admin@getfund.gov.gh` / `getfund2025`
3. Verify you can access dashboard

### Test Public Website:
1. Open: `https://your-website-url.vercel.app`
2. Navigate through pages
3. Verify content loads from CMS API

---

## 🔧 Environment Variables Summary

### Backend (`getfund-cms-api`)
```bash
# Database
DATABASE_URL=postgresql://neondb_owner:npg_cMqoV3tZh1TK@ep-autumn-fog-ahhqdw0v-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL=postgresql://neondb_owner:npg_cMqoV3tZh1TK@ep-autumn-fog-ahhqdw0v-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_cMqoV3tZh1TK@ep-autumn-fog-ahhqdw0v.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_cMqoV3tZh1TK@ep-autumn-fog-ahhqdw0v-pooler.c-3.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require

# JWT (from DEPLOY_NOW.md)
JWT_SECRET=756450a09da30e686123f82844ac8d67c8b81ef035125de00f68661217ed6f44
JWT_REFRESH_SECRET=3ca71c30b3130cdd4109ca824a0844c4ffa45dba9666f7b72cf9ec7c538dc85c
JWT_EXPIRE=1d
JWT_REFRESH_EXPIRE=7d

# Environment
NODE_ENV=production

# CORS (add after deploying frontends)
ADMIN_DASHBOARD_URL=https://your-dashboard.vercel.app
PUBLIC_WEBSITE_URL=https://your-website.vercel.app
```

### CMS Dashboard (`getfund-cms-dashboard`)
```bash
VITE_API_URL=https://your-api.vercel.app/api
```

### Public Website (`getfund-website`)
```bash
VITE_API_URL=https://your-api.vercel.app/api
```

---

## 🔄 Deployment Order (Important!)

**Must follow this order:**

1. ✅ **Backend first** - Other apps depend on it
2. ✅ **Add backend env vars** - Before first redeploy
3. ✅ **CMS Dashboard second** - Needs backend URL
4. ✅ **Update backend CORS** - Add dashboard URL
5. ✅ **Public Website third** - Needs backend URL
6. ✅ **Final backend update** - Add website URL

---

## 🆘 Troubleshooting

### CORS Errors
**Problem:** "Access-Control-Allow-Origin" error

**Solution:**
1. Verify frontend URL is in backend env vars
2. Redeploy backend after adding URLs
3. Check browser console for actual error

### Database Connection Failed
**Problem:** API can't connect to database

**Solution:**
1. Verify all DATABASE_URL variables in Vercel
2. Check Neon database is active
3. Verify SSL mode is `require`

### Build Failures
**Problem:** Deployment fails during build

**Solution:**
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to test
3. Verify all dependencies in package.json

### 404 on API Routes
**Problem:** API endpoints return 404

**Solution:**
1. Check Next.js is properly configured
2. Verify routes are in `app/api/` folder
3. Check Vercel build output includes API routes

---

## 📱 Custom Domains (Optional - Later)

After testing, you can add custom domains:

```
api.getfund.gov.gh      → getfund-cms-api
admin.getfund.gov.gh    → getfund-cms-dashboard
www.getfund.gov.gh      → getfund-website
```

In Vercel Dashboard → Project → Settings → Domains

---

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ All 3 projects deployed without errors
- ✅ Backend API responds to requests
- ✅ CMS Dashboard loads and login works
- ✅ Public website loads and displays content
- ✅ No CORS errors in browser console
- ✅ Database queries work from API

---

## 📞 Quick Commands Reference

```bash
# Deploy backend
cd getfund-cms/backend && vercel --prod

# Deploy CMS dashboard
cd getfund-cms/frontend && vercel --prod

# Deploy public website
cd getfund-website && vercel --prod

# View deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls

# Check current project
vercel whoami
```

---

**Ready to start? Begin with Phase 1: Backend API! 🚀**
