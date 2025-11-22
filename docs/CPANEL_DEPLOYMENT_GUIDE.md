# cPanel Deployment Guide - GETFund Website + CMS

## 📋 Prerequisites

Before starting, ensure your cPanel hosting provider supports:
- ✅ Node.js applications
- ✅ PostgreSQL databases
- ✅ SSL certificates
- ✅ Custom domains/subdomains

## 🗂️ What You Need to Copy

### 1. Website Files (Frontend)
```
📁 Files to copy to public_html/:
- index.html
- package.json
- vite.config.ts
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json
- tailwind.config.js
- postcss.config.js
- eslint.config.js
- 📁 src/ (entire folder)
- 📁 public/ (entire folder)
```

### 2. CMS Backend Files
```
📁 Files to copy to a separate directory (e.g., cms-backend/):
- 📁 cms/backend/ (entire folder)
```

### 3. Database Schema & Seeds
```
📁 Database files you'll need:
- cms/backend/src/database/migrations/*.sql
- cms/backend/src/database/seeds/*.sql
- cms/backend/setup-db.js
```

---

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Files

#### A. Build the Website for Production
```bash
# In your local project directory
npm run build

# This creates a 'dist' folder with optimized files
```

#### B. Create Deployment Folders
Create these folders locally to organize your files:
```
deployment/
├── website/          # Production website files
├── cms-backend/      # CMS API server
└── database/         # SQL scripts
```

### Step 2: Set Up PostgreSQL Database

#### A. Create Database in cPanel
1. Log into your cPanel
2. Go to **"PostgreSQL Databases"**
3. Create a new database: `getfund_cms`
4. Create a database user: `getfund_user`
5. Set a strong password
6. Add user to database with **ALL PRIVILEGES**

#### B. Note Your Database Connection Details
```
Database Host: localhost (or provided host)
Database Name: cpanel_username_getfund_cms
Database User: cpanel_username_getfund_user
Database Password: [your_password]
Port: 5432 (default PostgreSQL port)
```

### Step 3: Upload and Configure CMS Backend

#### A. Upload CMS Files
1. In cPanel File Manager, create folder: `cms-backend/`
2. Upload entire `cms/backend/` folder contents to `cms-backend/`

#### B. Configure Environment Variables
Create `cms-backend/.env` file:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cpanel_username_getfund_cms
DB_USER=cpanel_username_getfund_user
DB_PASSWORD=your_database_password

# Server Configuration
PORT=3001
NODE_ENV=production

# JWT Configuration (generate a secure random string)
JWT_SECRET=your_super_secure_jwt_secret_here_min_32_characters

# CORS Configuration
FRONTEND_URL=https://yourdomain.com
CMS_FRONTEND_URL=https://cms.yourdomain.com

# File Upload Configuration
UPLOAD_MAX_SIZE=10485760
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,image/webp,application/pdf

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=another_secure_random_string_for_sessions
```

#### C. Install Dependencies
In cPanel Terminal or SSH:
```bash
cd cms-backend
npm install --production
```

#### D. Set Up Database Schema
```bash
# Run database setup
node setup-db.js
```

### Step 4: Upload Website Files

#### A. Upload Production Build
1. Upload contents of your `dist/` folder to `public_html/`
2. Or upload to a subdomain folder if using subdomain

#### B. Configure Website Environment
Create `public_html/.env` or update your build configuration:
```env
# API Configuration
VITE_API_URL=https://yourdomain.com:3001/api
VITE_CMS_API_URL=https://yourdomain.com:3001/api

# Sanity Configuration (if using Sanity CMS)
VITE_SANITY_PROJECT_ID=d8e3hg04
VITE_SANITY_DATASET=production
```

### Step 5: Configure Node.js Application (CMS Backend)

#### A. Set Up Node.js App in cPanel
1. Go to **"Node.js Apps"** in cPanel
2. Click **"Create Application"**
3. Configure:
   - **Node.js Version**: Latest LTS (18.x or 20.x)
   - **Application Mode**: Production
   - **Application Root**: `cms-backend`
   - **Application URL**: `cms.yourdomain.com` or `/cms-api`
   - **Application Startup File**: `src/index.js`

#### B. Set Environment Variables in cPanel
In the Node.js app settings, add all variables from your `.env` file

#### C. Install Dependencies
Click **"Run NPM Install"** in the Node.js app interface

### Step 6: Configure Domains and Subdomains

#### A. Main Website
- Point your main domain to `public_html/`
- Ensure SSL certificate is active

#### B. CMS Backend API
- Create subdomain: `api.yourdomain.com` → points to Node.js app
- Or use path-based: `yourdomain.com/api` → proxied to Node.js app

#### C. CMS Frontend (Optional)
If you want a separate CMS admin interface:
- Create subdomain: `cms.yourdomain.com`
- Upload `cms/frontend/dist/` contents

### Step 7: Database Migration and Seeding

#### A. Run Migrations
```bash
# In cms-backend directory via SSH/Terminal
node src/database/migrate.js
```

#### B. Seed Initial Data
```bash
node src/database/seed.js
```

### Step 8: Configure Web Server (Important)

#### A. Create .htaccess for React Router
Create `public_html/.htaccess`:
```apache
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

#### B. Configure API Proxy (if needed)
If using path-based API, add to .htaccess:
```apache
# API Proxy Rules
RewriteRule ^api/(.*)$ http://localhost:3001/api/$1 [P,L]
```

---

## 🔧 Configuration Changes Required

### 1. Update API Endpoints

#### In Website Files:
Update `src/lib/sanity.ts` and `src/services/cmsApi.ts`:
```typescript
// Change from localhost to your domain
const API_BASE_URL = 'https://yourdomain.com:3001/api';
// or
const API_BASE_URL = 'https://api.yourdomain.com/api';
```

### 2. Update CORS Settings

#### In CMS Backend (`cms-backend/src/index.js`):
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    'https://cms.yourdomain.com'
  ],
  credentials: true
}));
```

### 3. Update Database Connection

#### In `cms-backend/src/config/database.js`:
```javascript
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};
```

---

## 🗂️ File Structure on cPanel

```
📁 cPanel Account Root/
├── 📁 public_html/              # Main website
│   ├── index.html
│   ├── assets/
│   ├── images/
│   └── .htaccess
├── 📁 cms-backend/              # CMS API Server
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── uploads/
└── 📁 subdomains/
    └── 📁 cms/                  # CMS Admin Interface (optional)
        └── 📁 public_html/
```

---

## 🔐 Security Checklist

- [ ] Strong database passwords
- [ ] Secure JWT secrets (min 32 characters)
- [ ] SSL certificates on all domains
- [ ] Proper CORS configuration
- [ ] File upload restrictions
- [ ] Regular database backups
- [ ] Keep Node.js and dependencies updated

---

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Fails**
   - Check database name format: `cpanel_username_dbname`
   - Verify user has correct privileges
   - Ensure PostgreSQL is running

2. **Node.js App Won't Start**
   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Check error logs in cPanel

3. **API Calls Fail**
   - Verify CORS settings
   - Check SSL certificates
   - Confirm API URL configuration

4. **File Uploads Don't Work**
   - Check folder permissions (755)
   - Verify upload size limits
   - Ensure uploads/ directory exists

---

## 📞 Next Steps After Deployment

1. **Test all functionality**
2. **Set up monitoring**
3. **Configure backups**
4. **Set up SSL auto-renewal**
5. **Create admin users**
6. **Import initial content**

---

## 📧 Support

If you encounter issues:
1. Check cPanel error logs
2. Check Node.js application logs
3. Verify database connections
4. Test API endpoints individually

Remember to replace all placeholder domains and credentials with your actual values!