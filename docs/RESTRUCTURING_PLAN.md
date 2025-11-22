# Project Restructuring Plan - Separate CMS and Website

**Date**: November 7, 2025
**Issue**: CMS is currently nested inside the website project
**Solution**: Separate into independent projects

---

## Current Structure (NOT IDEAL)

```
D:/Development/getfund-website/thehansguy/
└── getfund-website-bolt-main/          ← Single project
    ├── src/                            ← Website code
    ├── public/
    ├── cms/                            ← CMS nested inside (BAD)
    │   ├── backend/
    │   └── frontend/
    ├── package.json                    ← Website dependencies
    └── node_modules/
```

**Problems**:
- ❌ CMS coupled with website
- ❌ Cannot deploy independently
- ❌ Shared dependencies can conflict
- ❌ Larger build sizes
- ❌ Harder to manage permissions
- ❌ Confusing structure

---

## Recommended Structure (IDEAL)

```
D:/Development/getfund-website/thehansguy/
│
├── getfund-website/                    ← Public website (separate)
│   ├── .git/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── cmsApi.ts              ← Connects to CMS API
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── .env                           ← CMS_API_URL=http://localhost:5000/api
│   └── README.md
│
└── getfund-cms/                        ← CMS system (separate)
    ├── .git/
    ├── backend/                        ← CMS Backend API
    │   ├── src/
    │   │   ├── routes/
    │   │   ├── controllers/
    │   │   ├── models/
    │   │   ├── middleware/
    │   │   └── index.js
    │   ├── package.json
    │   ├── .env                        ← DATABASE_URL, JWT_SECRET, etc.
    │   └── README.md
    │
    └── frontend/                       ← CMS Admin Dashboard
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   ├── services/
        │   │   └── api.ts             ← Connects to CMS backend
        │   └── main.tsx
        ├── package.json
        ├── vite.config.ts
        ├── .env                       ← VITE_API_URL=http://localhost:5000/api
        └── README.md
```

**Benefits**:
- ✅ Clean separation of concerns
- ✅ Independent deployment
- ✅ Separate Git repos
- ✅ No dependency conflicts
- ✅ Faster builds
- ✅ Better security
- ✅ Easier team collaboration

---

## Restructuring Steps

### Option A: Fresh Start (Recommended if possible)

#### Step 1: Create New Directory Structure
```bash
cd D:/Development/getfund-website/thehansguy/

# Create new structure
mkdir getfund-website
mkdir getfund-cms
mkdir getfund-cms/backend
mkdir getfund-cms/frontend
```

#### Step 2: Move Website Files
```bash
# Copy website files to new location
cd getfund-website-bolt-main

# Copy website-specific files
cp -r src ../getfund-website/
cp -r public ../getfund-website/
cp package.json ../getfund-website/
cp package-lock.json ../getfund-website/
cp vite.config.ts ../getfund-website/
cp tsconfig.json ../getfund-website/
cp tsconfig.app.json ../getfund-website/
cp tsconfig.node.json ../getfund-website/
cp tailwind.config.js ../getfund-website/
cp postcss.config.js ../getfund-website/
cp eslint.config.js ../getfund-website/
cp index.html ../getfund-website/
cp .gitignore ../getfund-website/

# Copy documentation
cp README.md ../getfund-website/
cp *.md ../getfund-website/
```

#### Step 3: Move CMS Backend Files
```bash
# From getfund-website-bolt-main/cms/backend to getfund-cms/backend
cd getfund-website-bolt-main/cms/backend

cp -r src ../../getfund-cms/backend/
cp -r uploads ../../getfund-cms/backend/
cp package.json ../../getfund-cms/backend/
cp package-lock.json ../../getfund-cms/backend/
cp .env.example ../../getfund-cms/backend/
cp .gitignore ../../getfund-cms/backend/
cp *.js ../../getfund-cms/backend/
cp README.md ../../getfund-cms/backend/
```

#### Step 4: Move CMS Frontend Files
```bash
# From getfund-website-bolt-main/cms/frontend to getfund-cms/frontend
cd getfund-website-bolt-main/cms/frontend

cp -r src ../../getfund-cms/frontend/
cp package.json ../../getfund-cms/frontend/
cp package-lock.json ../../getfund-cms/frontend/
cp vite.config.ts ../../getfund-cms/frontend/
cp tsconfig.json ../../getfund-cms/frontend/
cp tsconfig.node.json ../../getfund-cms/frontend/
cp tailwind.config.js ../../getfund-cms/frontend/
cp postcss.config.js ../../getfund-cms/frontend/
cp index.html ../../getfund-cms/frontend/
cp .env.example ../../getfund-cms/frontend/
cp .gitignore ../../getfund-cms/frontend/
```

#### Step 5: Copy Shared Documentation
```bash
cd getfund-website-bolt-main

# Copy to CMS
cp CMS_*.md ../getfund-cms/
cp cms/API_TESTING_GUIDE.md ../getfund-cms/
cp cms/PROJECT_STATUS.md ../getfund-cms/

# Keep in website
cp SYSTEM_AUDIT_AND_IMPLEMENTATION_PLAN.md ../getfund-website/
cp EXPECTED_OUTCOMES.md ../getfund-website/
cp COMPREHENSIVE_TODO_LIST.md ../getfund-website/
cp RESTRUCTURING_PLAN.md ../getfund-website/
```

#### Step 6: Create README Files

**getfund-website/README.md**:
```markdown
# GETFund Public Website

Official website for Ghana Education Trust Fund.

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS
- React Router

## Development
\`\`\`bash
npm install
npm run dev
# Runs on http://localhost:5173
\`\`\`

## Environment Variables
\`\`\`
VITE_CMS_API_URL=http://localhost:5000/api
\`\`\`

## Related Projects
- CMS Backend: ../getfund-cms/backend
- CMS Frontend: ../getfund-cms/frontend
```

**getfund-cms/README.md**:
```markdown
# GETFund CMS

Content Management System for GETFund website.

## Projects

### Backend API
- Location: ./backend
- Port: 5000
- Tech: Express.js + PostgreSQL

### Frontend Admin Dashboard
- Location: ./frontend
- Port: 5174
- Tech: React + Vite + TypeScript

## Quick Start
See individual README files in backend/ and frontend/
```

#### Step 7: Initialize Git Repositories
```bash
# Website repo
cd getfund-website
git init
git add .
git commit -m "Initial commit - GETFund website"

# CMS repo
cd ../getfund-cms
git init
git add .
git commit -m "Initial commit - GETFund CMS"
```

#### Step 8: Update Package.json Scripts (Optional - Convenience)

**getfund-website/package.json**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "dev:all": "concurrently \"npm run dev\" \"cd ../getfund-cms/backend && npm start\" \"cd ../getfund-cms/frontend && npm run dev\""
  }
}
```

#### Step 9: Create Root-Level Scripts (Optional)

**Create `start-all.sh` in parent directory**:
```bash
#!/bin/bash
# Start all services

echo "Starting GETFund services..."

# Start CMS Backend
cd getfund-cms/backend
npm start &
BACKEND_PID=$!

# Start CMS Frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Start Website
cd ../../getfund-website
npm run dev &
WEBSITE_PID=$!

echo "All services started!"
echo "Website: http://localhost:5173"
echo "CMS Admin: http://localhost:5174"
echo "CMS API: http://localhost:5000"

# Wait for all processes
wait $BACKEND_PID $FRONTEND_PID $WEBSITE_PID
```

#### Step 10: Update Environment Files

**getfund-website/.env**:
```env
VITE_CMS_API_URL=http://localhost:5000/api
```

**getfund-cms/backend/.env**:
```env
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/getfund_cms

JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

PUBLIC_WEBSITE_URL=http://localhost:5173
ADMIN_DASHBOARD_URL=http://localhost:5174

MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

**getfund-cms/frontend/.env**:
```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

#### Step 11: Update API URL in Website

**getfund-website/src/services/cmsApi.ts**:
```typescript
// Change from hardcoded URL to environment variable
const CMS_API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:5000/api';
```

#### Step 12: Test Everything Works
```bash
# Terminal 1 - Backend
cd getfund-cms/backend
npm install
npm start

# Terminal 2 - CMS Frontend
cd getfund-cms/frontend
npm install
npm run dev

# Terminal 3 - Website
cd getfund-website
npm install
npm run dev

# Test in browser:
# - http://localhost:5173 (website)
# - http://localhost:5174 (CMS admin)
# - http://localhost:5000/api/health (API)
```

#### Step 13: Clean Up Old Directory (BACKUP FIRST!)
```bash
# ONLY AFTER CONFIRMING EVERYTHING WORKS

# Rename old directory as backup
mv getfund-website-bolt-main getfund-website-bolt-main.backup

# Or delete if you're confident
# rm -rf getfund-website-bolt-main
```

---

### Option B: Minimal Restructuring (If can't do fresh start)

If you can't restructure now, at least:

1. **Keep CMS separate in mind for deployment**
   - Deploy CMS backend and frontend separately
   - Don't include cms/ folder when deploying website

2. **Update documentation**
   - Note that CMS should be separate
   - Plan for future separation

3. **Use separate Git branches**
   - `main` - Website
   - `cms-backend` - CMS backend
   - `cms-frontend` - CMS frontend

---

## Deployment with Separate Projects

### Development (Local)
```
Website:     http://localhost:5173
CMS Admin:   http://localhost:5174
CMS API:     http://localhost:5000
Database:    localhost:5432
```

### Staging
```
Website:     https://staging.getfund.gov.gh
             (Vercel project from getfund-website repo)

CMS Admin:   https://staging-cms.getfund.gov.gh
             (Vercel project from getfund-cms/frontend)

CMS API:     https://staging-api.getfund.gov.gh
             (Railway project from getfund-cms/backend)

Database:    Supabase staging database
```

### Production
```
Website:     https://www.getfund.gov.gh
             (Vercel project from getfund-website repo)

CMS Admin:   https://cms.getfund.gov.gh
             (Vercel project from getfund-cms/frontend)

CMS API:     https://api.getfund.gov.gh
             (Railway project from getfund-cms/backend)

Database:    Supabase production database
```

---

## Benefits of Separate Projects

### For Development
- ✅ Faster builds (smaller codebases)
- ✅ Independent npm installs
- ✅ No dependency conflicts
- ✅ Clearer separation

### For Teams
- ✅ Frontend team owns getfund-website
- ✅ Backend team owns getfund-cms/backend
- ✅ Admin team owns getfund-cms/frontend
- ✅ No merge conflicts

### For Deployment
- ✅ Deploy website without touching CMS
- ✅ Deploy CMS without affecting website
- ✅ Different deployment schedules
- ✅ Rollback independently

### For Security
- ✅ CMS code not in website build
- ✅ Different access controls per repo
- ✅ Smaller attack surface
- ✅ API is the only connection point

### For Scaling
- ✅ Scale website separately (high traffic)
- ✅ Scale CMS separately (admin users)
- ✅ Different CDN strategies
- ✅ Different caching strategies

---

## Updated File Structure Reference

### Website Project (getfund-website/)
```
getfund-website/
├── .git/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── News.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── ...
│   ├── services/
│   │   └── cmsApi.ts          ← Calls CMS API
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env
├── package.json
├── vite.config.ts
└── README.md
```

### CMS Backend (getfund-cms/backend/)
```
getfund-cms/backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeds/
│   └── index.js
├── uploads/
├── .env
├── package.json
└── README.md
```

### CMS Frontend (getfund-cms/frontend/)
```
getfund-cms/frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── editor/
│   │   ├── sections/
│   │   └── ...
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ...
│   ├── services/
│   │   └── api.ts            ← Calls CMS backend
│   ├── context/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
├── vite.config.ts
└── README.md
```

---

## Recommended Next Steps

1. **Backup Current Project**
   ```bash
   cp -r getfund-website-bolt-main getfund-website-bolt-main.backup
   ```

2. **Follow Option A** (fresh restructure)
   - Takes 30-60 minutes
   - Clean separation
   - Best for long-term

3. **Update All Documentation**
   - README files
   - Deployment guides
   - Team documentation

4. **Update TODO List**
   - Reflect separate project structure
   - Update all file paths

5. **Test Thoroughly**
   - All three services run
   - API connections work
   - No broken links

---

## Questions to Consider

1. **Do you want separate Git repositories?**
   - Recommended: Yes
   - Alternative: Monorepo with separate folders

2. **Do you have multiple teams?**
   - If yes: Definitely separate
   - If no: Still separate for clarity

3. **When can you restructure?**
   - Now: Best time (early in project)
   - Later: More difficult with more code

4. **Deployment strategy?**
   - Separate deployments: Definitely separate projects
   - Single deployment: Can stay nested (not recommended)

---

**Recommendation**: Restructure NOW while the project is still in development. It's much easier now than after you have more code and team members working on it.

---

**Last Updated**: November 7, 2025
**Status**: Awaiting decision on restructuring
**Next Action**: Decide on Option A (restructure) or Option B (minimal changes)
