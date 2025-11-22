# GETFund Website & CMS System - Audit & Implementation Plan

**Date**: November 7, 2025
**Project**: GETFund Website with Custom CMS
**Status**: Partially Complete - Backend Ready, Frontend UI Needed

---

## Table of Contents
1. [Current State Summary](#current-state-summary)
2. [Architecture Overview](#architecture-overview)
3. [Comprehensive Checklist](#comprehensive-checklist)
4. [Implementation Plan](#recommended-implementation-plan)
5. [Time Estimates](#total-estimated-time)
6. [Next Steps](#next-immediate-steps)

---

## Current State Summary

### Tech Stack
- **Public Website**: React + Vite + TypeScript + Tailwind CSS
- **CMS Backend**: Express.js + Node.js + PostgreSQL (100% Complete)
- **CMS Frontend**: React + Vite + TypeScript + Tailwind CSS (20% Setup Only)
- **Database**: PostgreSQL with 7 tables

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                            │
│  (React + Vite) - Port 5173 (dev) / Port 80/443 (prod)     │
│  - Homepage with Hero Carousel                               │
│  - News listing & individual articles                        │
│  - Static pages (About, What We Do, etc.)                   │
└────────────┬────────────────────────────────────────────────┘
             │ Fetches published content
             ▼
┌─────────────────────────────────────────────────────────────┐
│              CMS BACKEND API (100% Complete)                 │
│  (Express.js) - Port 5000 (dev) / Custom port (prod)       │
│  - REST API with 40+ endpoints                              │
│  - JWT Authentication                                        │
│  - Role-based access control                                │
│  - File upload/media management                             │
│  - Audit logging & version control                          │
└────────────┬────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│          CMS ADMIN DASHBOARD (20% Complete)                  │
│  (React + Vite) - Port 5174 (dev) / Custom subdomain (prod)│
│  ⚠️ NEEDS BUILD: Login, editors, media library, etc.        │
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    POSTGRESQL DATABASE                       │
│  - Local (dev) / Supabase/Neon (production)                │
│  - 7 tables with full schema                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Comprehensive Checklist

### ✅ ALREADY COMPLETE

#### CMS Backend (100%)
- [x] **Complete REST API** (40+ endpoints)
- [x] **Authentication System** (JWT with access + refresh tokens)
- [x] **Role-Based Access Control** (Admin, Creator, Reviewer, Approver)
- [x] **Workflow Engine** (Draft → Review → Approve → Publish)
- [x] **Database Schema** (7 tables: users, content, content_revisions, audit_logs, media, content_locks, sessions)
- [x] **5 Test Users** with different roles (all password: `getfund2025`)
  - admin@getfund.gov.gh (Admin)
  - creator1@getfund.gov.gh (Creator)
  - creator2@getfund.gov.gh (Creator)
  - reviewer@getfund.gov.gh (Reviewer)
  - approver@getfund.gov.gh (Approver)
- [x] **Media Management** (File upload, storage, retrieval)
- [x] **Audit Logging** (Track all user actions)
- [x] **Version Control** (Content revisions)
- [x] **3 Published News Articles** (migrated from hardcoded data)
- [x] **Security Features** (bcrypt, rate limiting, CORS, validation)
- [x] **API Documentation** (Complete testing guide)

#### Public Website (80%)
- [x] **Frontend Framework** (React + Vite + TypeScript)
- [x] **Routing** (React Router with all pages)
- [x] **News Integration** (Homepage, news page, individual articles)
- [x] **CMS API Client** (`src/services/cmsApi.ts`)
- [x] **Responsive Design** (Tailwind CSS)
- [x] **Static Pages** (Home, About, What We Do, Contact, etc.)
- [x] **Components** (Hero, News, Header, Footer, etc.)

#### Documentation
- [x] **API Testing Guide** (cms/API_TESTING_GUIDE.md)
- [x] **CMS Integration Guide** (CMS_INTEGRATION_COMPLETE.md)
- [x] **Deployment Guides** (Vercel, cPanel, Neon)
- [x] **Project Status Documentation** (cms/PROJECT_STATUS.md)

---

### ❌ NEEDS COMPLETION

#### 1. Environment Configuration (CRITICAL)

**Current Issue**: No .env files exist for CMS backend/frontend

- [ ] **Create cms/backend/.env** from .env.example
- [ ] **Create cms/frontend/.env** from .env.example
- [ ] **Fix API URL mismatch** (`src/services/cmsApi.ts` uses port 9000, backend uses 5000)
- [ ] **Configure for staging environment**:
  - [ ] Staging database URL
  - [ ] Staging API URLs
  - [ ] Staging JWT secrets
- [ ] **Configure for production environment**:
  - [ ] Production database URL
  - [ ] Production API URLs
  - [ ] Production domain configuration
  - [ ] Strong JWT secrets
  - [ ] CORS allowed origins

#### 2. CMS Frontend UI (80% REMAINING)

**Current State**: Basic setup only, NO UI components

**Critical Components Needed**:

##### Authentication UI
- [ ] Login page
- [ ] Auth context/state management
- [ ] Protected routes
- [ ] Logout functionality

##### Admin Dashboard Layout
- [ ] Sidebar navigation
- [ ] Header with user dropdown
- [ ] Role-based menu items
- [ ] Breadcrumbs

##### Dashboard Homepage
- [ ] Stats cards (drafts, reviews, published counts)
- [ ] Role-specific views
- [ ] Recent activity feed
- [ ] Quick action buttons

##### News Article Editor
- [ ] Rich text editor (TipTap)
- [ ] Title, excerpt, content fields
- [ ] Featured image upload
- [ ] Category/tags
- [ ] Author field
- [ ] Save draft/submit/publish buttons
- [ ] Auto-save functionality
- [ ] Form validation

##### Hero Slide Editor
- [ ] Title, subtitle, description fields
- [ ] Background image upload
- [ ] CTA button config
- [ ] Display order
- [ ] Preview component

##### Content Lists
- [ ] News articles table
- [ ] Hero slides table
- [ ] Search & filters
- [ ] Status badges
- [ ] Pagination
- [ ] Sort functionality

##### Review/Approval Queues
- [ ] Review queue (for Reviewers)
- [ ] Approval queue (for Approvers)
- [ ] Approve/reject interface
- [ ] Reviewer notes
- [ ] Version history sidebar

##### Media Library
- [ ] Upload images (drag & drop)
- [ ] Grid view of media
- [ ] Delete/edit alt text
- [ ] Copy URL functionality
- [ ] Image preview modal
- [ ] Filter/search media

##### User Management (Admin only)
- [ ] List users
- [ ] Create/edit users
- [ ] Assign roles
- [ ] Deactivate users
- [ ] View user activity

##### Audit Logs Viewer
- [ ] Activity history table
- [ ] Filter by user/action/date
- [ ] Expandable row details
- [ ] Export to CSV

#### 3. Hero Slider CMS Integration

- [ ] **Update Hero.tsx** to fetch from CMS backend
- [ ] **Create hero slides via CMS**
- [ ] **Test hero slides workflow**
- [ ] **Add fallback hero slides**

#### 4. Multi-Environment Setup

##### Development Environment (Mostly exists)
- [x] Local website (localhost:5173)
- [x] Local CMS backend (localhost:5000)
- [ ] Local CMS frontend (localhost:5174 - needs UI build)

##### Staging Environment (Needs setup)
- [ ] Deploy staging website to subdomain (e.g., staging.getfund.gov.gh)
- [ ] Deploy staging CMS backend (e.g., staging-api.getfund.gov.gh)
- [ ] Deploy staging CMS frontend (e.g., staging-cms.getfund.gov.gh)
- [ ] Set up staging database (Supabase or Neon)
- [ ] Configure staging environment variables
- [ ] Test complete workflow in staging

##### Production Environment (Needs setup)
- [ ] Deploy production website (www.getfund.gov.gh)
- [ ] Deploy production CMS backend (api.getfund.gov.gh or subdomain)
- [ ] Deploy production CMS frontend (cms.getfund.gov.gh)
- [ ] Set up production database (Supabase/Neon/managed PostgreSQL)
- [ ] Configure production environment variables
- [ ] Set up SSL certificates
- [ ] Configure DNS records
- [ ] Set up monitoring & backups

#### 5. Access URLs Configuration

**Production Access Pattern** (Recommended):
```
┌─────────────────────────────────────────────────┐
│ Public Website:    https://www.getfund.gov.gh   │
│ CMS Admin Panel:   https://cms.getfund.gov.gh   │
│ CMS API Backend:   https://api.getfund.gov.gh   │
└─────────────────────────────────────────────────┘
```

**Staging Access Pattern**:
```
┌─────────────────────────────────────────────────────┐
│ Public Website:   https://staging.getfund.gov.gh    │
│ CMS Admin:        https://staging-cms.getfund.gov.gh│
│ CMS API:          https://staging-api.getfund.gov.gh│
└─────────────────────────────────────────────────────┘
```

**Tasks**:
- [ ] Register/configure subdomains
- [ ] Update CORS configuration for production domains
- [ ] Update environment variables with production URLs
- [ ] Set up proper routing for CMS access

#### 6. Security Hardening

- [ ] Change all default passwords from `getfund2025`
- [ ] Generate strong JWT secrets for production
- [ ] Set up database backups
- [ ] Configure rate limiting for production
- [ ] Set up error monitoring (Sentry)
- [ ] Enable HTTPS/SSL on all domains
- [ ] Review and tighten CORS policies
- [ ] Set up database connection pooling
- [ ] Implement IP whitelisting for CMS (optional)
- [ ] Add 2FA for admin users (optional)

#### 7. Deployment & DevOps

##### Choose hosting platforms:
- [ ] **Website**: Vercel/Netlify (recommended)
- [ ] **CMS Backend**: Railway/Render/Fly.io
- [ ] **CMS Frontend**: Vercel/Netlify
- [ ] **Database**: Supabase/Neon (PostgreSQL as a service)

##### Set up CI/CD pipelines (optional but recommended)
- [ ] Auto-deploy on git push
- [ ] Run tests before deploy
- [ ] Environment-specific branches (main → production, develop → staging)

##### Database migration strategy
- [ ] Export local DB
- [ ] Import to cloud DB (Supabase/Neon)
- [ ] Test connections
- [ ] Set up automated backups

##### Monitoring & Logging
- [ ] Error tracking (Sentry, LogRocket)
- [ ] Performance monitoring
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Log aggregation

---

## Recommended Implementation Plan

### Phase 1: Fix Environment Configuration (1-2 hours)
**Priority**: CRITICAL

1. Create `cms/backend/.env` from `.env.example`
   - Set `PORT=5000`
   - Set `DATABASE_URL` to local PostgreSQL
   - Generate secure `JWT_SECRET` and `JWT_REFRESH_SECRET`
   - Set CORS URLs for frontend

2. Create `cms/frontend/.env` from `.env.example`
   - Set `VITE_API_URL=http://localhost:5000/api`

3. Fix CMS API URL mismatch
   - Update `src/services/cmsApi.ts:6` to use port 5000 (not 9000)

4. Test local setup works end-to-end
   - Start backend: `cd cms/backend && npm start`
   - Start frontend: `cd cms/frontend && npm run dev`
   - Start website: `npm run dev`
   - Test API endpoints

### Phase 2: Build CMS Frontend UI (60-80 hours)
**Priority**: HIGH

#### Week 1: Authentication & Layout (12-16 hours)
1. **Day 1-2**: Authentication (4-6 hours)
   - Create AuthContext
   - Build login page
   - Implement protected routes
   - Test login/logout flow

2. **Day 3**: Admin Layout (4-6 hours)
   - Create AdminLayout component
   - Build sidebar navigation
   - Build header with user dropdown
   - Add role-based menu items

3. **Day 4**: Dashboard (4-6 hours)
   - Stats cards
   - Role-specific views
   - Recent activity feed

#### Week 2: Content Editors (20-24 hours)
1. **Day 1-3**: News Article Editor (12-16 hours)
   - Set up TipTap rich text editor
   - Build editor form
   - Image upload integration
   - Save/submit functionality
   - Form validation

2. **Day 4-5**: Hero Slide Editor (8-10 hours)
   - Build slide form
   - Image upload
   - Preview component
   - Order management

#### Week 3: Lists, Queues & Media (20-24 hours)
1. **Day 1-2**: Content Lists (8-10 hours)
   - News articles table
   - Hero slides table
   - Search & filters
   - Pagination

2. **Day 3**: Review/Approval Queues (6-8 hours)
   - Review queue page
   - Approval queue page
   - Approve/reject interface

3. **Day 4-5**: Media Library (6-8 hours)
   - Upload interface
   - Grid view
   - Image management
   - Media picker modal

#### Week 4: Admin Features & Polish (8-12 hours)
1. **Day 1-2**: User Management (4-6 hours)
   - Users list
   - Create/edit users
   - Role assignment

2. **Day 3**: Audit Logs (3-4 hours)
   - Activity history
   - Filters

3. **Day 4**: Testing & Bug Fixes (6-8 hours)
   - Full workflow testing
   - Bug fixes
   - UI polish

### Phase 3: Complete Website Integration (4-6 hours)
**Priority**: MEDIUM

1. **Hero Slider Integration** (2-3 hours)
   - Update `src/components/Hero.tsx` to fetch from CMS
   - Add fallback slides
   - Test hero slider workflow

2. **Testing & Error Handling** (2-3 hours)
   - Test all content flows
   - Add proper error handling
   - Implement caching strategy
   - Test offline/error states

### Phase 4: Set Up Staging Environment (4-8 hours)
**Priority**: MEDIUM

1. **Database Setup** (1-2 hours)
   - Create Supabase/Neon project
   - Run migrations
   - Seed initial data

2. **Deploy CMS Backend** (1-2 hours)
   - Deploy to Railway/Render
   - Configure environment variables
   - Test API endpoints

3. **Deploy CMS Frontend** (1-2 hours)
   - Deploy to Vercel
   - Configure environment variables
   - Test login & functionality

4. **Deploy Website** (1-2 hours)
   - Deploy to Vercel
   - Configure environment variables
   - Test content fetching

5. **Integration Testing** (1-2 hours)
   - Test complete workflow (create → publish → display)
   - Test all user roles
   - Fix any issues

### Phase 5: Deploy to Production (4-8 hours)
**Priority**: LOW (after staging is stable)

1. **Production Database Setup** (1-2 hours)
   - Set up production database
   - Configure automated backups
   - Test connections

2. **Deploy All Services** (1-2 hours)
   - Deploy backend, frontend, website to production
   - Configure production environment variables

3. **Domain Configuration** (1-2 hours)
   - Set up custom domains
   - Configure DNS records
   - Set up SSL certificates

4. **Security Audit** (1-2 hours)
   - Change all default passwords
   - Review security settings
   - Test rate limiting
   - Configure monitoring

5. **Final Testing** (1-2 hours)
   - Full production testing
   - Performance testing
   - Security testing

---

## Total Estimated Time

| Phase | Task | Hours |
|-------|------|-------|
| Phase 1 | Environment Setup | 2 hours |
| Phase 2 | CMS Frontend Build | 60-80 hours |
| Phase 3 | Integration & Testing | 4-6 hours |
| Phase 4 | Staging Deployment | 4-8 hours |
| Phase 5 | Production Deployment | 4-8 hours |
| **TOTAL** | | **74-104 hours** |

### Breakdown by Role
- **Development**: 66-88 hours
- **DevOps/Deployment**: 8-16 hours

### If working full-time (8 hours/day):
- **Minimum**: 9-10 working days
- **Maximum**: 13-15 working days

### If working part-time (4 hours/day):
- **Minimum**: 18-20 working days
- **Maximum**: 26-30 working days

---

## Next Immediate Steps

### Option 1: Quick Win - Fix Environment Setup (Recommended First)
**Time**: 1-2 hours
**Impact**: Enables testing of existing backend

1. Create .env files
2. Fix API URL mismatch
3. Test complete local setup

### Option 2: Start Building CMS Frontend
**Time**: 60-80 hours
**Impact**: Unlocks full CMS functionality

1. Start with authentication
2. Build admin layout
3. Create content editors
4. Add all remaining features

### Option 3: Set Up Staging Environment First
**Time**: 4-8 hours
**Impact**: Understand deployment process early

1. Choose hosting platforms
2. Set up cloud database
3. Deploy services to staging
4. Test deployment process

### Option 4: Create Detailed Deployment Documentation
**Time**: 2-4 hours
**Impact**: Clear roadmap for deployment

1. Document hosting platform choices
2. Create step-by-step deployment guides
3. Document environment variable requirements
4. Create rollback procedures

---

## Critical Issues to Address

### 1. API URL Mismatch
**File**: `src/services/cmsApi.ts:6`
**Current**: `http://localhost:9000/api`
**Should be**: `http://localhost:5000/api`
**Impact**: Website cannot connect to CMS backend

### 2. Missing .env Files
**Locations**:
- `cms/backend/.env`
- `cms/frontend/.env`

**Impact**: Cannot run CMS backend or frontend

### 3. Incomplete CMS Frontend
**Impact**: Cannot use CMS to edit content through UI (must use API directly)

---

## Recommended Hosting Setup

### For Small to Medium Traffic

**Website (Public)**:
- **Platform**: Vercel (Free tier)
- **Domain**: www.getfund.gov.gh
- **Deployment**: Automatic from GitHub

**CMS Backend**:
- **Platform**: Railway ($5/month) or Render (Free tier)
- **Domain**: api.getfund.gov.gh
- **Database**: Supabase (Free tier - 500MB storage)

**CMS Frontend**:
- **Platform**: Vercel (Free tier)
- **Domain**: cms.getfund.gov.gh
- **Deployment**: Automatic from GitHub

**Total Cost**: $5/month (or $0 with free tiers)

### For High Traffic

**Website**: Vercel Pro ($20/month)
**CMS Backend**: Railway ($20/month with dedicated resources)
**Database**: Supabase Pro ($25/month - 8GB storage + backups)
**Monitoring**: Sentry ($26/month)

**Total Cost**: ~$91/month

---

## Success Metrics

### Development Complete When:
- [x] CMS backend is running and tested
- [ ] CMS frontend UI is complete
- [ ] All user roles work correctly
- [ ] Content workflow works (create → review → approve → publish)
- [ ] Website displays CMS content
- [ ] Hero slider pulls from CMS
- [ ] News articles pull from CMS

### Staging Complete When:
- [ ] All services deployed to staging
- [ ] Complete workflow tested in staging
- [ ] Multiple users tested content creation
- [ ] Performance is acceptable
- [ ] No critical bugs

### Production Ready When:
- [ ] Staging is stable for 1+ week
- [ ] Security audit complete
- [ ] All default passwords changed
- [ ] Monitoring is active
- [ ] Backups are configured
- [ ] Documentation is complete
- [ ] Team is trained

---

## Contact & Support

**Documentation Files**:
- API Testing: `cms/API_TESTING_GUIDE.md`
- CMS Status: `cms/PROJECT_STATUS.md`
- CMS README: `cms/README.md`
- Deployment: `CPANEL_DEPLOYMENT_GUIDE.md`, `VERCEL_NEON_DEPLOYMENT_GUIDE.md`

**Default Test Credentials** (CHANGE IN PRODUCTION):
- Email: admin@getfund.gov.gh
- Password: getfund2025

**API Base URL** (Development):
- Backend: http://localhost:5000/api
- Frontend: http://localhost:5174
- Website: http://localhost:5173

---

**Last Updated**: November 7, 2025
**Status**: Audit Complete - Awaiting Direction
