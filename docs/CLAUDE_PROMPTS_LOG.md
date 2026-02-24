# GETFund Website - Claude AI Development Prompts Log

> **Project:** Ghana Education Trust Fund (GETFund) Full-Stack Web Application
> **Developer:** thehansguy
> **AI Assistant:** Claude (Anthropic)
> **Documentation Created:** February 21, 2026
> **Purpose:** Track all Claude AI prompts and interactions used to build this application

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Phase 1: Project Setup & Architecture](#phase-1-project-setup--architecture)
4. [Phase 2: Backend API Development](#phase-2-backend-api-development)
5. [Phase 3: Public Website Development](#phase-3-public-website-development)
6. [Phase 4: CMS Admin Dashboard](#phase-4-cms-admin-dashboard)
7. [Phase 5: Authentication & Security](#phase-5-authentication--security)
8. [Phase 6: Content Management System](#phase-6-content-management-system)
9. [Phase 7: Payment Integration](#phase-7-payment-integration)
10. [Phase 8: Media & File Management](#phase-8-media--file-management)
11. [Phase 9: Database & Migrations](#phase-9-database--migrations)
12. [Phase 10: Deployment & DevOps](#phase-10-deployment--devops)
13. [Phase 11: Bug Fixes & Refinements](#phase-11-bug-fixes--refinements)
14. [Prompt Index](#prompt-index)

---

## Project Overview

The GETFund web application is a comprehensive full-stack solution consisting of three interconnected applications:

| Application | Directory | Framework | Port |
|---|---|---|---|
| Public Website | `getfund-website/` | React 18 + Vite 7 | 5173 |
| CMS Backend API | `getfund-cms-backend/` | Next.js 14.2 | 5001 |
| CMS Admin Dashboard | `getfund-cms-frontend/` | React 18 + Vite | 5174 |

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, React Router
- **Backend:** Next.js 14.2, Node.js
- **Database:** PostgreSQL 14+ (Neon Serverless)
- **Authentication:** JWT + Refresh Tokens, bcrypt
- **Rich Text Editor:** TipTap
- **State Management:** Zustand, React Context
- **Maps/Visualization:** D3.js, react-simple-maps
- **File Storage:** Local uploads + Vercel Blob
- **Payment:** Xcel Payment Gateway
- **Email:** Resend
- **Deployment:** Vercel + Neon PostgreSQL

---

## Phase 1: Project Setup & Architecture

### Prompt 1.1 — Initial Project Scaffolding
> **Category:** Setup
> **Files Affected:** All three project directories

```
Set up a full-stack web application for GETFund (Ghana Education Trust Fund) with:
- A public-facing React website (Vite + TypeScript + Tailwind CSS)
- A Next.js backend API
- A React admin CMS dashboard (Vite + TypeScript + Tailwind CSS)
```

**Outcome:** Created three separate project directories with initial configurations, package.json files, Vite/Next.js configs, Tailwind setup, and TypeScript configurations.

---

### Prompt 1.2 — Project Configuration
> **Category:** Setup
> **Files Affected:** `vite.config.ts`, `tailwind.config.js`, `tsconfig.json` (all projects)

```
Configure the projects with:
- Custom GETFund brand colors (green #059669, navy, red, gold)
- API proxy settings from frontends to backend
- TypeScript strict mode
- Vite manual code splitting
```

**Outcome:** Configured Tailwind with custom theme colors, set up Vite proxy for `/api` routes to `http://localhost:5000`, configured TypeScript paths and strict settings.

---

## Phase 2: Backend API Development

### Prompt 2.1 — Database Schema & Connection
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/lib/db.ts`, migration files

```
Set up PostgreSQL database connection with support for:
- Local PostgreSQL development
- Neon serverless PostgreSQL for production
- Connection pooling
- Database migration system
```

**Outcome:** Created `lib/db.ts` with Neon serverless driver, connection pooling support, and migration scripts infrastructure.

---

### Prompt 2.2 — API Route Structure
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/app/api/` directory

```
Create REST API endpoints for:
- Authentication (login, logout, refresh tokens, password reset)
- Content management (CRUD operations)
- News articles
- Events
- Campaigns/Fundraising
- Donations
- Media uploads
- Footer configuration
- Health checks
- Audit logs
```

**Outcome:** Built comprehensive REST API with structured endpoints under `/app/api/` following Next.js App Router conventions.

---

### Prompt 2.3 — Database Models
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/models/`

```
Create database models for:
- Users (with roles: Admin, Creator, Reviewer, Approver)
- Content/Pages
- News articles
- Events
- Campaigns
- Donations
- Media files
- Lottery entries
- Team members
- Audit logs
```

**Outcome:** Created PostgreSQL-backed models with full CRUD operations and relationship handling.

---

### Prompt 2.4 — Services Layer
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/services/`

```
Create a services layer to handle business logic separate from API routes,
including content workflow management (draft → review → approve → publish).
```

**Outcome:** Built service classes encapsulating business logic with content state machine management.

---

### Prompt 2.5 — CORS & Middleware
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/lib/cors.ts`, middleware files

```
Set up CORS configuration and middleware for:
- Cross-origin requests from frontend apps
- Rate limiting (100 req/15min general, 5/15min for auth)
- Request validation
- Error handling
```

**Outcome:** Configured CORS middleware allowing requests from frontend origins, implemented rate limiting and request validation.

---

## Phase 3: Public Website Development

### Prompt 3.1 — Website Page Structure
> **Category:** Frontend - Website
> **Files Affected:** `getfund-website/src/pages/`

```
Create the public website with the following pages:
- Homepage with hero section and dynamic content
- About / Who We Are
- What We Do / Programs
- Impact page with statistics
- Infrastructure Projects
- Scholarships
- News & Updates listing and detail pages
- Fundraising / Campaigns
- Ways to Donate
- Lottery
- Partnerships
- Events (Beneficiary & Company)
- FAQ
- Contact
```

**Outcome:** Created 25+ page components with React Router v7 routing, organized under `src/pages/`.

---

### Prompt 3.2 — Component Library
> **Category:** Frontend - Website
> **Files Affected:** `getfund-website/src/components/`

```
Build reusable React components for the website including:
- Navigation header with responsive mobile menu
- Footer with dynamic configuration
- Hero section with image slider (react-slick)
- CMS-powered content sections
- Card components for news, events, campaigns
- Map visualization of Ghana regions (D3.js)
- Donation forms
- Search and filter components
```

**Outcome:** Built component library organized by feature (cms/, lottery/, visualizations/) with Tailwind CSS styling.

---

### Prompt 3.3 — Ghana Map Visualization
> **Category:** Frontend - Website
> **Files Affected:** `getfund-website/src/components/visualizations/`

```
Create an interactive map of Ghana showing regional data using D3.js
and react-simple-maps. Display impact statistics by region with
tooltips and color-coded regions.
```

**Outcome:** Built interactive SVG map component using D3.js (d3-geo, d3-scale, d3-selection) and react-simple-maps with regional data overlays.

---

### Prompt 3.4 — CMS Integration for Website
> **Category:** Frontend - Website
> **Files Affected:** `getfund-website/src/services/cmsApi.ts`, CMS components

```
Integrate the public website with the CMS backend API to dynamically
load content for:
- Hero slides
- News articles
- Page sections
- Events
- Campaign data
- Impact statistics
```

**Outcome:** Created `cmsApi.ts` service with axios for API communication, built CMS-powered section components that fetch and render dynamic content.

---

### Prompt 3.5 — Templates & Layouts
> **Category:** Frontend - Website
> **Files Affected:** `getfund-website/src/templates/`

```
Create a template system with:
- Base layouts for different page types
- Reusable page templates
- Section templates for consistent content display
```

**Outcome:** Built template system under `src/templates/` with layouts, page templates, and section templates.

---

### Prompt 3.6 — SEO & Metadata
> **Category:** Frontend - Website
> **Files Affected:** Multiple page components

```
Add SEO metadata to all pages using react-helmet-async with
appropriate titles, descriptions, and Open Graph tags for the
GETFund website.
```

**Outcome:** Integrated react-helmet-async across all pages with dynamic metadata based on page content.

---

## Phase 4: CMS Admin Dashboard

### Prompt 4.1 — Admin Dashboard Layout
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/components/Layout/`

```
Create an admin dashboard layout with:
- Sidebar navigation with collapsible menu
- Top header with user info and logout
- Main content area
- Responsive design for different screen sizes
```

**Outcome:** Built admin layout components with sidebar navigation, breadcrumbs, and responsive behavior.

---

### Prompt 4.2 — Dashboard Overview Page
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/DashboardPage/`

```
Create an admin dashboard page showing:
- Content statistics (total articles, drafts, published)
- Recent activity
- Quick action buttons
- System health indicators
```

**Outcome:** Built dashboard with statistics cards, activity feed, and quick actions using the Dashboard component set.

---

### Prompt 4.3 — News Management
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/NewsListPage/`, `NewsEditorPage/`, `NewsViewPage/`

```
Build a complete news management module with:
- News article listing with search, filter, and pagination
- Rich text editor for creating/editing articles (TipTap)
- Article preview/view page
- Draft/Publish workflow
- Image upload for article thumbnails
```

**Outcome:** Created full CRUD interface for news articles with TipTap rich text editor, image uploads, and content workflow states.

---

### Prompt 4.4 — TipTap Rich Text Editor
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/components/Editor/`

```
Integrate TipTap as the rich text editor with extensions for:
- Text formatting (bold, italic, headings, lists)
- Tables
- Image embedding
- Link management
- Text colors and highlighting
- Code blocks
```

**Outcome:** Configured TipTap with full extension suite including StarterKit, Table, Image, Link, TextStyle, Color, and custom toolbar components.

---

### Prompt 4.5 — Hero Slides Management
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/HeroSlidesListPage/`, `HeroSlideEditorPage/`

```
Create hero slide management for the homepage carousel:
- List all slides with drag-and-drop reordering
- Create/edit slides with image upload
- Set slide title, subtitle, CTA text, and link
- Activate/deactivate slides
```

**Outcome:** Built slide management with @dnd-kit for drag-and-drop ordering, image upload with react-dropzone, and full CRUD operations.

---

### Prompt 4.6 — Dynamic Page & Section Editor
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/PageEditorPage/`, `SectionEditorPage/`

```
Build a dynamic page editor system where admins can:
- Create and manage website pages
- Add/remove/reorder sections within pages
- Edit section content with rich text
- Preview changes before publishing
```

**Outcome:** Created page and section editor with component-based section types, drag-and-drop ordering, and live preview capabilities.

---

### Prompt 4.7 — Campaign Management
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/CampaignsListPage/`, `CampaignEditorPage/`

```
Build a fundraising campaign management module:
- Campaign listing with status filters
- Campaign editor with goal amounts, dates, descriptions
- Progress tracking with donation totals
- Campaign activation/deactivation
```

**Outcome:** Created campaign management interface with full CRUD, progress visualization, and donation tracking integration.

---

### Prompt 4.8 — Media Library
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/MediaLibraryPage/`, `src/components/Media/`

```
Build a media library for managing uploaded files:
- Grid/list view of all media assets
- Upload files with drag-and-drop (react-dropzone)
- Image preview and metadata display
- Search and filter by type/date
- Select media for use in content editors
```

**Outcome:** Built media library with grid/list views, dropzone upload, image preview, metadata management, and media selection modal for editors.

---

### Prompt 4.9 — Menu Management
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/MenuManagementPage/`

```
Create a menu management interface for configuring the website navigation:
- Add/edit/remove menu items
- Drag-and-drop reordering
- Nested menu support (submenus)
- Link to pages, external URLs, or sections
```

**Outcome:** Built menu management with hierarchical menu structure, @dnd-kit drag-and-drop, and link configuration.

---

### Prompt 4.10 — Lottery Configuration
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/LotteryConfigPage/`

```
Create a lottery management page for:
- Configuring lottery settings (draw dates, ticket prices)
- Viewing lottery entries
- Managing lottery results
```

**Outcome:** Built lottery configuration interface with settings management and entries tracking.

---

### Prompt 4.11 — Team Members Management
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/components/TeamMembers/`

```
Build team member management for displaying leadership/staff on the website:
- Add/edit team members with photo, name, title, bio
- Reorder team members
- Group by department/category
```

**Outcome:** Created team member CRUD interface with image uploads and category grouping.

---

## Phase 5: Authentication & Security

### Prompt 5.1 — JWT Authentication System
> **Category:** Security
> **Files Affected:** `getfund-cms-backend/lib/jwt.ts`, auth API routes

```
Implement JWT-based authentication with:
- Login endpoint returning access + refresh tokens
- Access token expiry: 1 day
- Refresh token expiry: 7 days
- Token refresh endpoint
- Logout with token invalidation
- Password hashing with bcrypt (10 rounds)
```

**Outcome:** Built complete JWT auth system with access/refresh token flow, bcrypt password hashing, and secure token management.

---

### Prompt 5.2 — Role-Based Access Control (RBAC)
> **Category:** Security
> **Files Affected:** Multiple backend and frontend files

```
Implement role-based access control with four roles:
- Admin: Full system access
- Creator: Can create and edit content
- Reviewer: Can review submitted content
- Approver: Can approve reviewed content for publishing
Each role should have specific permissions for content workflow.
```

**Outcome:** Built RBAC system with role-based route protection, permission checks in API middleware, and UI conditional rendering based on user roles.

---

### Prompt 5.3 — Content Approval Workflow
> **Category:** Security / CMS
> **Files Affected:** Backend services, CMS frontend pages

```
Implement a multi-stage content approval workflow:
Draft → Submitted → Under Review → Approved → Published
With review queue for Reviewers and approval queue for Approvers.
```

**Outcome:** Created state machine for content lifecycle with role-specific queues, email notifications, and audit trail logging.

---

### Prompt 5.4 — Audit Logging
> **Category:** Security
> **Files Affected:** `getfund-cms-backend/app/api/audit-logs/`

```
Add audit logging to track all sensitive actions:
- User login/logout events
- Content create/update/delete/publish actions
- User management changes
- Settings modifications
Store with timestamp, user ID, action type, and details.
```

**Outcome:** Built audit logging system capturing all admin actions with searchable log viewer in the dashboard.

---

### Prompt 5.5 — Password Reset Flow
> **Category:** Security
> **Files Affected:** Auth API routes, email service

```
Implement password reset functionality:
- Request reset via email
- Send reset link using Resend email service
- Validate reset token
- Set new password
```

**Outcome:** Built password reset flow with time-limited tokens and email delivery via Resend API.

---

### Prompt 5.6 — User Management
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/pages/UsersListPage/`

```
Build user management interface for admins:
- List all users with role badges
- Create new users with role assignment
- Edit user details and roles
- Deactivate/reactivate users
- Password reset from admin panel
```

**Outcome:** Created user management pages with role-based filtering, user creation form, and administrative actions.

---

## Phase 6: Content Management System

### Prompt 6.1 — CMS Content API
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/app/api/content/`

```
Build a flexible content management API supporting:
- Multiple content types (pages, sections, articles)
- Version history / revision tracking
- Content status management (draft, published, archived)
- Rich text content storage
- SEO metadata per content item
```

**Outcome:** Created content API with versioning, status management, and flexible content type support.

---

### Prompt 6.2 — Page Content Editors
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/components/PageContentEditors/`

```
Create specialized content editors for different page types:
- About page editor
- Programs page editor
- Impact page editor with statistics
- Generic page editor
Each with appropriate fields and content structure.
```

**Outcome:** Built page-specific editor components with custom field configurations and validation.

---

### Prompt 6.3 — Section Editors
> **Category:** Frontend - CMS
> **Files Affected:** `getfund-cms-frontend/src/components/SectionEditors/`

```
Build section editor components for various section types:
- Text sections
- Image galleries
- Statistics/counter sections
- Call-to-action sections
- Card grid sections
Each with specific field configurations and preview.
```

**Outcome:** Created modular section editor components with type-specific fields and inline preview.

---

### Prompt 6.4 — Footer Configuration
> **Category:** Backend + Frontend
> **Files Affected:** Footer API route, footer components

```
Build a configurable footer system:
- API endpoint for footer settings
- Admin interface to manage footer content
- Dynamic footer on public website
- Support for links, contact info, social media, copyright
```

**Outcome:** Created footer configuration API, admin editor, and dynamic footer component on the public website.

---

### Prompt 6.5 — Impact Statistics
> **Category:** Frontend - CMS
> **Files Affected:** Dashboard components, Impact page

```
Create an impact statistics system showing:
- Number of scholarships awarded
- Infrastructure projects completed
- Total funding disbursed
- Regional impact breakdown
Editable from the admin dashboard.
```

**Outcome:** Built statistics management in admin dashboard with dynamic display on the public website's impact page.

---

## Phase 7: Payment Integration

### Prompt 7.1 — Xcel Payment Gateway
> **Category:** Backend + Frontend
> **Files Affected:** `getfund-website/src/services/paymentService.ts`, donation API routes

```
Integrate Xcel payment gateway for online donations:
- Payment initiation API
- Payment callback handling
- Transaction verification
- Donation recording in database
- Payment status page on website
```

**Outcome:** Built payment flow with Xcel API integration, callback URL handling, transaction verification, and donation tracking.

---

### Prompt 7.2 — Donation Tracking
> **Category:** Backend
> **Files Affected:** Donations API routes, models

```
Build donation tracking system:
- Record all donations with amount, donor info, payment method
- Link donations to campaigns
- Generate donation receipts
- Admin dashboard for viewing donation history
```

**Outcome:** Created donation model with campaign linking, admin listing interface, and reporting capabilities.

---

## Phase 8: Media & File Management

### Prompt 8.1 — File Upload System
> **Category:** Backend
> **Files Affected:** Media API routes, upload middleware

```
Build a file upload system supporting:
- Image uploads with validation (type, size)
- Image processing/resizing with sharp
- Local file storage to /uploads directory
- Vercel Blob storage for production
- File metadata tracking in database
```

**Outcome:** Created upload system with sharp image processing, dual storage support (local + Vercel Blob), and metadata management.

---

### Prompt 8.2 — Media Library Backend
> **Category:** Backend
> **Files Affected:** Media API routes, media model

```
Create media library API with:
- List all media with pagination
- Upload new media files
- Update media metadata (alt text, caption)
- Delete media files
- Filter by type (image, document, video)
```

**Outcome:** Built full media CRUD API with type filtering, pagination, and metadata management.

---

## Phase 9: Database & Migrations

### Prompt 9.1 — Database Migration System
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/migrations/`, migration scripts

```
Set up a database migration system for PostgreSQL:
- Sequential migration files with timestamps
- Up/down migration support
- Migration status tracking
- Seed data scripts for initial setup
```

**Outcome:** Created migration infrastructure with SQL migration files and seed scripts.

---

### Prompt 9.2 — Team Members Table
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/migrations/create-team-members-table.sql`

```
Create a team members database table with columns for:
- Name, title, department, bio
- Photo URL
- Display order
- Active status
- Social media links
```

**Outcome:** Created SQL migration for team_members table with all required fields.

---

### Prompt 9.3 — Data Migration Scripts
> **Category:** Backend
> **Files Affected:** `getfund-cms-backend/scripts/`

```
Create data migration and setup scripts for:
- Initial admin user creation
- Sample content seeding
- Team member data import
- Fix scripts for admin images
```

**Outcome:** Built utility scripts for data migration, seeding, and fixes.

---

### Prompt 9.4 — Neon PostgreSQL Setup
> **Category:** Backend / DevOps
> **Files Affected:** `getfund-cms-backend/NEON_VERCEL_SETUP.md`, db config

```
Configure the backend to work with Neon serverless PostgreSQL:
- Neon connection string with pooling
- SSL configuration
- Serverless driver setup
- Connection pooling optimization
```

**Outcome:** Configured Neon PostgreSQL driver with connection pooling and created setup documentation.

---

## Phase 10: Deployment & DevOps

### Prompt 10.1 — Vercel Deployment Configuration
> **Category:** DevOps
> **Files Affected:** `vercel.json` (all projects)

```
Configure all three applications for Vercel deployment:
- Public website as static React app
- Backend as Next.js serverless functions
- CMS frontend as static React app
- Environment variable configuration
- Build settings
```

**Outcome:** Created `vercel.json` configurations for all three projects with appropriate build and routing settings.

---

### Prompt 10.2 — Environment Configuration
> **Category:** DevOps
> **Files Affected:** `.env.example`, `.env.production`, `.env.development`

```
Set up environment configuration for:
- Development (local PostgreSQL, localhost URLs)
- Production (Neon DB, Vercel URLs, API keys)
- Environment variables for JWT secrets, DB connection, payment keys, email API
```

**Outcome:** Created environment files for all environments with proper variable naming and documentation.

---

### Prompt 10.3 — Deployment Documentation
> **Category:** Documentation
> **Files Affected:** Multiple .md files

```
Create comprehensive deployment documentation:
- Step-by-step deployment guide
- Deployment checklist
- Neon + Vercel setup guide
- Environment variable reference
- Troubleshooting guide
```

**Outcome:** Created multiple documentation files including `DEPLOYMENT_STEPS.md`, `DEPLOYMENT_CHECKLIST.md`, `NEON_VERCEL_SETUP.md`, and complete deployment guides.

---

### Prompt 10.4 — Next.js Standalone Build
> **Category:** DevOps
> **Files Affected:** `getfund-cms-backend/next.config.js`

```
Configure Next.js for standalone output mode for optimized
production deployment on Vercel with smaller bundle size.
```

**Outcome:** Set `output: 'standalone'` in Next.js config with optimized production settings.

---

## Phase 11: Bug Fixes & Refinements

### Prompt 11.1 — Admin Image Fixes
> **Category:** Bug Fix
> **Files Affected:** `getfund-cms-backend/migrations/fix-admin-images.sql`

```
Fix issues with admin panel image display:
- Correct image URL paths in database
- Handle missing image fallbacks
- Fix image upload path resolution
```

**Outcome:** Created SQL fix script and updated image handling logic.

---

### Prompt 11.2 — RBAC Improvements
> **Category:** Enhancement
> **Files Affected:** Multiple files, `getfund-cms-frontend/RBAC_IMPROVEMENTS.md`

```
Improve the role-based access control system:
- More granular permissions
- Page-level permission settings
- Better role badge display
- Permission-based UI rendering
```

**Outcome:** Enhanced RBAC with granular permissions and documented improvements.

---

### Prompt 11.3 — Footer User Guide
> **Category:** Documentation
> **Files Affected:** `getfund-cms-frontend/FOOTER_USER_GUIDE.md`

```
Create a user guide for the footer configuration feature explaining
how admins can customize the website footer content, links, and layout.
```

**Outcome:** Created comprehensive footer configuration guide for admin users.

---

### Prompt 11.4 — CMS Integration Completion
> **Category:** Enhancement
> **Files Affected:** Multiple website components, `docs/CMS_INTEGRATION_COMPLETE.md`

```
Complete the CMS integration for all website pages:
- Ensure all dynamic content sections fetch from CMS API
- Handle loading states and error fallbacks
- Add static fallback content when API is unavailable
```

**Outcome:** Completed CMS integration across all website pages with proper error handling and fallback content.

---

## Prompt Index

| # | Prompt | Category | Phase |
|---|---|---|---|
| 1.1 | Initial Project Scaffolding | Setup | 1 |
| 1.2 | Project Configuration | Setup | 1 |
| 2.1 | Database Schema & Connection | Backend | 2 |
| 2.2 | API Route Structure | Backend | 2 |
| 2.3 | Database Models | Backend | 2 |
| 2.4 | Services Layer | Backend | 2 |
| 2.5 | CORS & Middleware | Backend | 2 |
| 3.1 | Website Page Structure | Frontend - Website | 3 |
| 3.2 | Component Library | Frontend - Website | 3 |
| 3.3 | Ghana Map Visualization | Frontend - Website | 3 |
| 3.4 | CMS Integration for Website | Frontend - Website | 3 |
| 3.5 | Templates & Layouts | Frontend - Website | 3 |
| 3.6 | SEO & Metadata | Frontend - Website | 3 |
| 4.1 | Admin Dashboard Layout | Frontend - CMS | 4 |
| 4.2 | Dashboard Overview Page | Frontend - CMS | 4 |
| 4.3 | News Management | Frontend - CMS | 4 |
| 4.4 | TipTap Rich Text Editor | Frontend - CMS | 4 |
| 4.5 | Hero Slides Management | Frontend - CMS | 4 |
| 4.6 | Dynamic Page & Section Editor | Frontend - CMS | 4 |
| 4.7 | Campaign Management | Frontend - CMS | 4 |
| 4.8 | Media Library | Frontend - CMS | 4 |
| 4.9 | Menu Management | Frontend - CMS | 4 |
| 4.10 | Lottery Configuration | Frontend - CMS | 4 |
| 4.11 | Team Members Management | Frontend - CMS | 4 |
| 5.1 | JWT Authentication System | Security | 5 |
| 5.2 | Role-Based Access Control | Security | 5 |
| 5.3 | Content Approval Workflow | Security / CMS | 5 |
| 5.4 | Audit Logging | Security | 5 |
| 5.5 | Password Reset Flow | Security | 5 |
| 5.6 | User Management | Frontend - CMS | 5 |
| 6.1 | CMS Content API | Backend | 6 |
| 6.2 | Page Content Editors | Frontend - CMS | 6 |
| 6.3 | Section Editors | Frontend - CMS | 6 |
| 6.4 | Footer Configuration | Backend + Frontend | 6 |
| 6.5 | Impact Statistics | Frontend - CMS | 6 |
| 7.1 | Xcel Payment Gateway | Backend + Frontend | 7 |
| 7.2 | Donation Tracking | Backend | 7 |
| 8.1 | File Upload System | Backend | 8 |
| 8.2 | Media Library Backend | Backend | 8 |
| 9.1 | Database Migration System | Backend | 9 |
| 9.2 | Team Members Table | Backend | 9 |
| 9.3 | Data Migration Scripts | Backend | 9 |
| 9.4 | Neon PostgreSQL Setup | Backend / DevOps | 9 |
| 10.1 | Vercel Deployment Configuration | DevOps | 10 |
| 10.2 | Environment Configuration | DevOps | 10 |
| 10.3 | Deployment Documentation | Documentation | 10 |
| 10.4 | Next.js Standalone Build | DevOps | 10 |
| 11.1 | Admin Image Fixes | Bug Fix | 11 |
| 11.2 | RBAC Improvements | Enhancement | 11 |
| 11.3 | Footer User Guide | Documentation | 11 |
| 11.4 | CMS Integration Completion | Enhancement | 11 |

---

## Statistics

| Metric | Count |
|---|---|
| Total Prompts Documented | 42 |
| Setup & Config | 2 |
| Backend Development | 9 |
| Public Website | 6 |
| CMS Admin Dashboard | 11 |
| Authentication & Security | 6 |
| Content Management | 5 |
| Payment Integration | 2 |
| Media Management | 2 |
| Database & Migrations | 4 |
| Deployment & DevOps | 4 |
| Bug Fixes & Refinements | 4 |

---

## Notes

- This document reconstructs the development prompts based on the final codebase structure and features. The actual prompts used during development may have varied in wording and scope.
- Some features may have been built iteratively across multiple prompts not captured here.
- Future prompts should be appended to this document with the next sequential Phase and Prompt numbers.
- Each prompt entry follows the format: Category, Files Affected, Prompt Text, and Outcome.

---

*Last updated: February 21, 2026*
