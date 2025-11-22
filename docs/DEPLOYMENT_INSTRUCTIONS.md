# Vercel Deployment Instructions

Since the Vercel CLI installation encountered issues, here are alternative deployment methods:

## Method 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add Neon database integration and Vercel configuration"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect it as a Vite project

3. **Configure Environment Variables:**
   Add these in Vercel dashboard under Settings → Environment Variables:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_PS1tijL0ZpfA@ep-royal-hall-ad0djgcp-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   NODE_ENV=production
   ```

## Method 2: Manual Upload

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Choose "Deploy from template" or "Import Git repository"

## Post-Deployment Steps

1. **Test API endpoints:**
   - https://your-project.vercel.app/api/news
   - https://your-project.vercel.app/api/hero-slides

2. **Verify database connection:**
   - Check Vercel logs in dashboard
   - Test CRUD operations

## Environment Variables to Add in Vercel

```env
DATABASE_URL=postgresql://neondb_owner:npg_PS1tijL0ZpfA@ep-royal-hall-ad0djgcp-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_PS1tijL0ZpfA@ep-royal-hall-ad0djgcp.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
NODE_ENV=production
```

Your project is ready to deploy! 🚀