# 🚀 Deploy GETFund Website to Vercel + Neon Database

## ✅ No Conversion Needed!
Your **Vite + React** setup is perfect for Vercel. No language or framework conversion required.

---

## 📋 Prerequisites

1. **GitHub Account** (you already have this)
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Neon Account** - Sign up at [neon.tech](https://neon.tech)

---

## 🗄️ Step 1: Set Up Neon Database

### A. Create Neon Project
1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Click **"Create Project"**
3. Configure:
   - **Project Name**: `getfund-website`
   - **Database Name**: `getfund_db`
   - **Region**: Choose closest to your users (e.g., US East, Europe West)
4. Click **"Create Project"**

### B. Get Database Connection String
1. In your Neon dashboard, go to **"Connection Details"**
2. Copy the **Connection String** (looks like):
   ```
   postgresql://username:password@hostname/database?sslmode=require
   ```
3. **Save this** - you'll need it for environment variables

### C. Create Database Tables
1. In Neon Console, go to **"SQL Editor"**
2. Run this SQL to create your CMS tables:

```sql
-- Users table for CMS authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content table for news, hero slides, etc.
CREATE TABLE IF NOT EXISTS content (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'news', 'hero-slide', etc.
    data JSONB NOT NULL, -- Flexible content storage
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'published', 'archived'
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media table for images
CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
CREATE INDEX IF NOT EXISTS idx_content_status ON content(status);
CREATE INDEX IF NOT EXISTS idx_content_created_at ON content(created_at DESC);
```

3. Click **"Run"** to execute

---

## 🌐 Step 2: Deploy to Vercel

### A. Connect GitHub Repository
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your `getfund-website-bolt` repository
4. If not visible, click **"Adjust GitHub App Permissions"**

### B. Configure Project Settings
1. **Framework Preset**: Vite (should auto-detect)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `npm run build` (should auto-fill)
4. **Output Directory**: `dist` (should auto-fill)
5. **Install Command**: `npm install` (should auto-fill)

### C. Add Environment Variables
Click **"Environment Variables"** and add these:

| **Name** | **Value** | **Description** |
|----------|-----------|-----------------|
| `DATABASE_URL` | `your_neon_connection_string` | Neon database connection |
| `NODE_ENV` | `production` | Environment mode |
| `FRONTEND_URL` | `https://your-project.vercel.app` | Your Vercel domain (update after deployment) |
| `JWT_SECRET` | `your_super_secure_random_32_char_string` | For authentication |

### D. Deploy
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. You'll get a URL like `https://getfund-website-abc123.vercel.app`

---

## 🔧 Step 3: Update Environment Variables

### A. Update Frontend URL
1. Go back to Vercel dashboard
2. Go to **Settings** → **Environment Variables**
3. Edit `FRONTEND_URL` to your actual Vercel URL
4. **Redeploy** (go to Deployments tab, click "..." on latest deployment → "Redeploy")

### B. Test API Connection
Visit: `https://your-project.vercel.app/api/health`
Should return: `{"status":"OK","timestamp":"..."}`

---

## 📝 Step 4: Set Up Content Management

### A. Create Admin User
1. Use a tool like **Postman** or **curl** to create your first admin user:

```bash
curl -X POST https://your-project.vercel.app/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@getfund.gov.gh",
    "password": "your_secure_password",
    "role": "admin"
  }'
```

### B. Add Sample Content
Create a news article:

```bash
curl -X POST https://your-project.vercel.app/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome to GETFund Website",
    "type": "news",
    "status": "published",
    "data": {
      "excerpt": "Our new website is live!",
      "content": "We are excited to announce...",
      "author": "GETFund Team",
      "category": "Announcements",
      "image": "/images/news/sample.jpg"
    }
  }'
```

---

## 🔄 Step 5: Automatic Deployments

### A. Enable Auto-Deploy
- **Already enabled!** Every push to your `main` branch will automatically deploy
- Your workflow: Code → Commit → Push → Auto-Deploy ✨

### B. Preview Deployments
- Every pull request gets a **preview deployment**
- Test changes before merging to main

---

## 📊 Step 6: Monitor and Optimize

### A. Vercel Analytics
1. In Vercel dashboard → **Analytics**
2. Monitor page loads, Core Web Vitals, traffic

### B. Neon Monitoring
1. In Neon dashboard → **Monitoring**
2. Watch database performance, connection usage

### C. Performance Tips
- Images auto-optimized by Vercel
- CDN edge caching enabled
- Serverless functions scale automatically

---

## 🛠️ Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
Create `.env.local` for local development:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/getfund_local
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_local_secret
```

### Deployment
```bash
# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub (auto-deploys)
git push origin main
```

---

## 🚨 Troubleshooting

### Build Fails
1. Check Vercel build logs
2. Common issues:
   - Missing environment variables
   - TypeScript errors
   - Dependency issues

### Database Connection Issues
1. Verify `DATABASE_URL` in Vercel environment variables
2. Check Neon database status
3. Ensure connection string includes `?sslmode=require`

### API Routes Not Working
1. Verify `/api/[...endpoint].js` file exists
2. Check function logs in Vercel dashboard
3. Ensure proper CORS headers

---

## 📈 Scaling Considerations

### Vercel Limits (Hobby Plan)
- **Bandwidth**: 100GB/month
- **Function Executions**: 100GB-hrs/month
- **Build Time**: 6000 minutes/month

### Neon Limits (Free Plan)
- **Storage**: 3GB
- **Compute**: 191.9 hours/month
- **Branches**: 10

### Upgrade When Needed
- **Vercel Pro**: $20/month per member
- **Neon Pro**: $19/month + usage

---

## ✅ Final Checklist

- [ ] Neon database created and tables set up
- [ ] Vercel project deployed successfully
- [ ] Environment variables configured
- [ ] API health check returns OK
- [ ] Admin user created
- [ ] Sample content added
- [ ] Auto-deployment working
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled

---

## 🎉 You're Live!

Your GETFund website is now:
- ✅ **Hosted on Vercel** (fast, global CDN)
- ✅ **Database on Neon** (PostgreSQL, auto-scaling)
- ✅ **Auto-deploying** from GitHub
- ✅ **Production-ready** with security headers
- ✅ **Scalable** serverless architecture

**Website URL**: `https://your-project.vercel.app`
**Admin Panel**: Build separately or use Neon console for direct DB access

Happy coding! 🚀