# Comprehensive TODO List - Full CMS Implementation

**Project**: GETFund Website & CMS with Full Page Editing
**Date**: November 7, 2025
**Status**: Ready to Begin

---

## Quick Reference

### Overall Progress
```
Phase 1: Environment Setup          [ ] 0% (0/5 tasks)
Phase 2: Backend Expansion          [ ] 0% (0/8 tasks)
Phase 3: CMS Frontend - Auth        [ ] 0% (0/6 tasks)
Phase 4: CMS Frontend - News        [ ] 0% (0/8 tasks)
Phase 5: CMS Frontend - Hero        [ ] 0% (0/6 tasks)
Phase 6: CMS Frontend - Pages       [ ] 0% (0/12 tasks)
Phase 7: CMS Frontend - Sections    [ ] 0% (0/10 tasks)
Phase 8: CMS Frontend - Media       [ ] 0% (0/8 tasks)
Phase 9: CMS Frontend - Users       [ ] 0% (0/6 tasks)
Phase 10: Website Integration       [ ] 0% (0/15 tasks)
Phase 11: Testing & Polish          [ ] 0% (0/8 tasks)
Phase 12: Staging Deployment        [ ] 0% (0/7 tasks)
Phase 13: Production Deployment     [ ] 0% (0/8 tasks)

TOTAL PROGRESS: 0% (0/107 tasks)
```

---

## Phase 1: Environment Configuration (CRITICAL)
**Estimated Time**: 2 hours
**Priority**: HIGHEST

### Tasks

- [ ] **1.1** Create `cms/backend/.env` file
  - [ ] Copy from `.env.example`
  - [ ] Set `PORT=5000`
  - [ ] Set `DATABASE_URL` to local PostgreSQL
  - [ ] Generate secure `JWT_SECRET` (use: `openssl rand -base64 32`)
  - [ ] Generate secure `JWT_REFRESH_SECRET`
  - [ ] Set `PUBLIC_WEBSITE_URL=http://localhost:5173`
  - [ ] Set `ADMIN_DASHBOARD_URL=http://localhost:5174`
  - [ ] Set `NODE_ENV=development`

- [ ] **1.2** Create `cms/frontend/.env` file
  - [ ] Copy from `.env.example`
  - [ ] Set `VITE_API_URL=http://localhost:5000/api`
  - [ ] Set `VITE_BACKEND_URL=http://localhost:5000`

- [ ] **1.3** Fix API URL mismatch in website
  - [ ] Open `src/services/cmsApi.ts`
  - [ ] Change line 6 from `http://localhost:9000/api` to `http://localhost:5000/api`
  - [ ] Save file

- [ ] **1.4** Test all services start correctly
  - [ ] Start backend: `cd cms/backend && npm install && npm start`
  - [ ] Verify: Backend runs on http://localhost:5000
  - [ ] Start CMS frontend: `cd cms/frontend && npm install && npm run dev`
  - [ ] Verify: CMS runs on http://localhost:5174
  - [ ] Start website: `npm run dev`
  - [ ] Verify: Website runs on http://localhost:5173

- [ ] **1.5** Test API connectivity
  - [ ] Open browser: http://localhost:5000/api/health
  - [ ] Should see: `{"status":"ok"}`
  - [ ] Test login endpoint with Postman/curl
  - [ ] Test published content endpoint

**✅ Phase 1 Complete When:**
- All three services start without errors
- API endpoints respond correctly
- No connection errors in browser console

---

## Phase 2: Backend Expansion - Pages & Sections Support
**Estimated Time**: 8-12 hours
**Priority**: HIGH

### Background
Currently, the CMS backend supports `news` and `hero_slide` content types. We need to add support for:
- Pages (About, What We Do, Contact, etc.)
- Page Sections (editable sections within pages)

### Tasks

- [ ] **2.1** Design page content structure
  - [ ] Create `cms/backend/docs/PAGE_STRUCTURE.md`
  - [ ] Document page fields:
    - id, slug, title, meta_description, status, published_at
  - [ ] Document section fields:
    - id, page_id, section_key, section_type, content, order, is_visible

- [ ] **2.2** Create database migration for pages
  - [ ] Create `cms/backend/src/database/migrations/003_add_pages_table.sql`
  ```sql
  CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    published_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
  );
  ```

- [ ] **2.3** Create database migration for page sections
  - [ ] Create `cms/backend/src/database/migrations/004_add_page_sections_table.sql`
  ```sql
  CREATE TABLE IF NOT EXISTS page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    section_key VARCHAR(100) NOT NULL,
    section_type VARCHAR(50) NOT NULL,
    content JSONB NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(page_id, section_key)
  );
  ```

- [ ] **2.4** Run migrations
  - [ ] Connect to database
  - [ ] Run migration 003
  - [ ] Run migration 004
  - [ ] Verify tables created

- [ ] **2.5** Seed initial pages data
  - [ ] Create `cms/backend/src/database/seeds/002_seed_pages.sql`
  - [ ] Add pages:
    - home (slug: home)
    - about (slug: about)
    - what-we-do (slug: what-we-do)
    - scholarship-programme (slug: scholarship-programme)
    - contact (slug: contact)
  - [ ] Set all to 'published' status
  - [ ] Run seed script

- [ ] **2.6** Create API endpoints for pages
  - [ ] Add to `cms/backend/src/routes/pages.js`:
    - `GET /api/pages` - List all pages
    - `GET /api/pages/:slug` - Get single page with sections
    - `POST /api/pages` - Create new page (admin only)
    - `PUT /api/pages/:id` - Update page
    - `DELETE /api/pages/:id` - Delete page (admin only)

- [ ] **2.7** Create API endpoints for page sections
  - [ ] Add to `cms/backend/src/routes/sections.js`:
    - `GET /api/pages/:pageId/sections` - Get all sections for page
    - `GET /api/sections/:id` - Get single section
    - `POST /api/pages/:pageId/sections` - Create section
    - `PUT /api/sections/:id` - Update section
    - `DELETE /api/sections/:id` - Delete section
    - `PUT /api/pages/:pageId/sections/reorder` - Reorder sections

- [ ] **2.8** Test new endpoints with Postman
  - [ ] Test creating a page
  - [ ] Test getting pages
  - [ ] Test creating sections for a page
  - [ ] Test updating section content
  - [ ] Test reordering sections

**✅ Phase 2 Complete When:**
- Pages and sections tables exist in database
- API endpoints respond correctly
- Can create/read/update/delete pages and sections via API
- Documentation is complete

---

## Phase 3: CMS Frontend - Authentication & Layout
**Estimated Time**: 12-16 hours
**Priority**: HIGH

### Tasks

- [ ] **3.1** Create authentication context
  - [ ] Create `cms/frontend/src/context/AuthContext.tsx`
  - [ ] Implement login function
  - [ ] Implement logout function
  - [ ] Implement token refresh
  - [ ] Store user info in state
  - [ ] Store tokens in localStorage
  - [ ] Auto-refresh token before expiry

- [ ] **3.2** Create authentication service
  - [ ] Create `cms/frontend/src/services/authService.ts`
  - [ ] `login(email, password)` function
  - [ ] `logout()` function
  - [ ] `refreshToken()` function
  - [ ] `getCurrentUser()` function
  - [ ] Error handling

- [ ] **3.3** Build login page
  - [ ] Create `cms/frontend/src/pages/LoginPage.tsx`
  - [ ] Email input field
  - [ ] Password input field
  - [ ] "Remember me" checkbox
  - [ ] Login button with loading state
  - [ ] Error message display
  - [ ] Form validation
  - [ ] Redirect to dashboard on success

- [ ] **3.4** Create protected route wrapper
  - [ ] Create `cms/frontend/src/components/ProtectedRoute.tsx`
  - [ ] Check if user is authenticated
  - [ ] Redirect to login if not authenticated
  - [ ] Show loading spinner while checking

- [ ] **3.5** Build admin layout
  - [ ] Create `cms/frontend/src/components/layout/AdminLayout.tsx`
  - [ ] Sidebar navigation:
    - Dashboard
    - News Articles
    - Hero Slides
    - **Pages** (NEW)
    - **Page Sections** (NEW)
    - Media Library
    - Users (admin only)
    - Audit Logs
  - [ ] Top header with:
    - User name and role badge
    - Logout button
    - User dropdown menu
  - [ ] Main content area
  - [ ] Responsive (mobile hamburger menu)
  - [ ] Active route highlighting

- [ ] **3.6** Build dashboard homepage
  - [ ] Create `cms/frontend/src/pages/DashboardPage.tsx`
  - [ ] Stats cards:
    - Total news articles
    - Total hero slides
    - **Total pages** (NEW)
    - **Total sections** (NEW)
    - Drafts count
    - In review count
    - Published count
  - [ ] Recent activity feed (last 10 actions)
  - [ ] Quick action buttons
  - [ ] Role-specific welcome message

**✅ Phase 3 Complete When:**
- Can login at http://localhost:5174
- Dashboard displays with stats
- Sidebar navigation works
- Can logout
- Protected routes redirect to login when not authenticated

---

## Phase 4: CMS Frontend - News Article Management
**Estimated Time**: 20-24 hours
**Priority**: HIGH

### Tasks

- [ ] **4.1** Install rich text editor
  - [ ] `cd cms/frontend`
  - [ ] `npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link`
  - [ ] Verify installation

- [ ] **4.2** Create news service
  - [ ] Create `cms/frontend/src/services/newsService.ts`
  - [ ] `getArticles()` function
  - [ ] `getArticle(id)` function
  - [ ] `createArticle(data)` function
  - [ ] `updateArticle(id, data)` function
  - [ ] `deleteArticle(id)` function
  - [ ] `submitForReview(id)` function
  - [ ] `approve(id)` function
  - [ ] `publish(id)` function

- [ ] **4.3** Create rich text editor component
  - [ ] Create `cms/frontend/src/components/editor/RichTextEditor.tsx`
  - [ ] Toolbar with:
    - Bold, Italic, Underline, Strike
    - Headings (H1-H6)
    - Bullet list, Ordered list
    - Link, Image
    - Blockquote, Code block
    - Undo, Redo
  - [ ] Content area
  - [ ] Character count
  - [ ] Auto-save indicator

- [ ] **4.4** Build news list page
  - [ ] Create `cms/frontend/src/pages/news/NewsListPage.tsx`
  - [ ] Table showing:
    - Title
    - Status badge (colored)
    - Author
    - Created date
    - Actions (edit, delete)
  - [ ] "Create New Article" button
  - [ ] Search bar (filter by title)
  - [ ] Status filter dropdown
  - [ ] Category filter
  - [ ] Pagination (10 per page)
  - [ ] Sort by date/title

- [ ] **4.5** Build news editor page
  - [ ] Create `cms/frontend/src/pages/news/NewsEditorPage.tsx`
  - [ ] Title input field
  - [ ] Slug input (auto-generated from title, editable)
  - [ ] Excerpt textarea
  - [ ] Rich text editor for content
  - [ ] Featured image upload button
  - [ ] Image preview
  - [ ] Author input
  - [ ] Category/tags input
  - [ ] "Save Draft" button
  - [ ] "Submit for Review" button
  - [ ] "Publish" button (admin/approver only)
  - [ ] Auto-save every 30 seconds
  - [ ] Unsaved changes warning

- [ ] **4.6** Build review queue page
  - [ ] Create `cms/frontend/src/pages/review/ReviewQueuePage.tsx`
  - [ ] List of articles with status "in_review"
  - [ ] Click to open preview modal
  - [ ] Preview shows full article (read-only)
  - [ ] "Approve" button
  - [ ] "Request Changes" button
  - [ ] Notes/comments textarea
  - [ ] Filter by content type

- [ ] **4.7** Build approval queue page
  - [ ] Create `cms/frontend/src/pages/approval/ApprovalQueuePage.tsx`
  - [ ] List of articles with status "approved"
  - [ ] Click to preview
  - [ ] "Publish" button
  - [ ] "Schedule Publish" date picker
  - [ ] Confirmation modal

- [ ] **4.8** Test complete news workflow
  - [ ] Login as creator
  - [ ] Create article
  - [ ] Submit for review
  - [ ] Login as reviewer
  - [ ] Approve article
  - [ ] Login as approver
  - [ ] Publish article
  - [ ] Check website shows article

**✅ Phase 4 Complete When:**
- Can create/edit news articles with rich formatting
- Can upload images
- Can submit for review
- Review/approval workflow works
- Published articles appear on website

---

## Phase 5: CMS Frontend - Hero Slide Management
**Estimated Time**: 8-12 hours
**Priority**: HIGH

### Tasks

- [ ] **5.1** Create hero slides service
  - [ ] Create `cms/frontend/src/services/heroService.ts`
  - [ ] `getSlides()` function
  - [ ] `getSlide(id)` function
  - [ ] `createSlide(data)` function
  - [ ] `updateSlide(id, data)` function
  - [ ] `deleteSlide(id)` function
  - [ ] `reorderSlides(slidesArray)` function
  - [ ] `publishSlide(id)` function

- [ ] **5.2** Build hero slides list page
  - [ ] Create `cms/frontend/src/pages/hero/HeroSlidesListPage.tsx`
  - [ ] Grid/table view of slides
  - [ ] Show thumbnail, title, order
  - [ ] Drag-and-drop to reorder
  - [ ] "Create New Slide" button
  - [ ] Edit/delete actions
  - [ ] Status badges
  - [ ] Toggle visibility button

- [ ] **5.3** Build hero slide editor page
  - [ ] Create `cms/frontend/src/pages/hero/HeroSlideEditorPage.tsx`
  - [ ] Main title input
  - [ ] Subtitle input
  - [ ] Description textarea
  - [ ] Background image upload
  - [ ] Image preview (shows how it will look)
  - [ ] CTA button text input
  - [ ] CTA button link input
  - [ ] Display order number input
  - [ ] "Hide/Show" toggle
  - [ ] Save button
  - [ ] Publish button

- [ ] **5.4** Create hero slide preview component
  - [ ] Create `cms/frontend/src/components/preview/HeroSlidePreview.tsx`
  - [ ] Shows exactly how slide will look on website
  - [ ] Full-width preview
  - [ ] Responsive preview toggle (desktop/tablet/mobile)

- [ ] **5.5** Implement drag-and-drop reordering
  - [ ] Install: `npm install react-beautiful-dnd` or `@dnd-kit/core`
  - [ ] Make slides draggable
  - [ ] Update order on drop
  - [ ] Save new order to backend

- [ ] **5.6** Test hero slides workflow
  - [ ] Create 3 hero slides
  - [ ] Upload images for each
  - [ ] Set different orders
  - [ ] Publish slides
  - [ ] Check website homepage shows slides in correct order
  - [ ] Test drag-and-drop reordering
  - [ ] Verify changes reflect on website

**✅ Phase 5 Complete When:**
- Can create/edit hero slides
- Can upload background images
- Can reorder slides with drag-and-drop
- Published slides appear on website homepage
- Slides display in correct order

---

## Phase 6: CMS Frontend - Page Management (NEW)
**Estimated Time**: 16-20 hours
**Priority**: HIGH

### Tasks

- [ ] **6.1** Create pages service
  - [ ] Create `cms/frontend/src/services/pagesService.ts`
  - [ ] `getPages()` - Get all pages
  - [ ] `getPage(slug)` - Get single page with sections
  - [ ] `getPageById(id)` - Get page by ID
  - [ ] `createPage(data)` - Create new page
  - [ ] `updatePage(id, data)` - Update page
  - [ ] `deletePage(id)` - Delete page
  - [ ] `publishPage(id)` - Publish page

- [ ] **6.2** Build pages list page
  - [ ] Create `cms/frontend/src/pages/pages/PagesListPage.tsx`
  - [ ] Table showing:
    - Page title
    - Slug
    - Number of sections
    - Status
    - Last updated
    - Actions (edit, edit sections, delete)
  - [ ] "Create New Page" button
  - [ ] Search by title/slug
  - [ ] Filter by status

- [ ] **6.3** Build page editor
  - [ ] Create `cms/frontend/src/pages/pages/PageEditorPage.tsx`
  - [ ] Page title input
  - [ ] Slug input (auto-generated, editable)
  - [ ] Meta title input (SEO)
  - [ ] Meta description textarea (SEO)
  - [ ] Status dropdown (draft/published)
  - [ ] Save button
  - [ ] "Edit Sections" button (goes to section editor)
  - [ ] Delete page button

- [ ] **6.4** Build page selector component
  - [ ] Create `cms/frontend/src/components/pages/PageSelector.tsx`
  - [ ] Dropdown to select page
  - [ ] Used in section editor
  - [ ] Shows page title and slug

- [ ] **6.5** Add pages to navigation
  - [ ] Update `cms/frontend/src/components/layout/AdminLayout.tsx`
  - [ ] Add "Pages" menu item
  - [ ] Add icon
  - [ ] Link to pages list

- [ ] **6.6** Create page preview modal
  - [ ] Create `cms/frontend/src/components/preview/PagePreview.tsx`
  - [ ] Shows how page will look on website
  - [ ] Renders all sections in order
  - [ ] "Preview" button on pages list

- [ ] **6.7** Build page creation wizard (optional but nice)
  - [ ] Create `cms/frontend/src/pages/pages/PageWizard.tsx`
  - [ ] Step 1: Basic info (title, slug)
  - [ ] Step 2: SEO settings
  - [ ] Step 3: Choose template (optional)
  - [ ] Step 4: Add initial sections
  - [ ] Finish and go to section editor

- [ ] **6.8** Test page management
  - [ ] Create a new page
  - [ ] Edit page details
  - [ ] Preview page
  - [ ] Publish page
  - [ ] Delete draft page

- [ ] **6.9** Add page templates system (optional)
  - [ ] Create predefined section layouts
  - [ ] Templates for common page types:
    - Landing page (hero + features + CTA)
    - About page (hero + mission + team + values)
    - Contact page (hero + form + map + info)
  - [ ] "Use Template" button on page creation

- [ ] **6.10** Create page duplication feature
  - [ ] "Duplicate" button on pages list
  - [ ] Copies page with all sections
  - [ ] New slug generated (adds -copy)
  - [ ] Set status to draft

- [ ] **6.11** Add page search and filters
  - [ ] Search by title or slug
  - [ ] Filter by status (draft/published)
  - [ ] Sort by date created/updated

- [ ] **6.12** Test complete page workflow
  - [ ] Create page
  - [ ] Add sections (will do in next phase)
  - [ ] Publish page
  - [ ] View on website
  - [ ] Edit and update
  - [ ] Duplicate page

**✅ Phase 6 Complete When:**
- Can create/edit pages
- Pages list shows all pages
- Can publish/unpublish pages
- Page metadata (SEO) editable
- Can preview pages
- Can delete pages

---

## Phase 7: CMS Frontend - Page Section Management (NEW)
**Estimated Time**: 24-32 hours
**Priority**: HIGH

### Background
Page sections are editable blocks within a page. Different section types:
- Hero section (image, title, subtitle, CTA)
- Text section (rich text content)
- Image section (image with caption)
- CTA section (call-to-action button)
- Stats section (numbers with labels)
- Team section (team member cards)
- Features section (icon + title + description)
- FAQ section (accordion items)
- Contact form section
- Embed section (YouTube, maps, etc.)

### Tasks

- [ ] **7.1** Create sections service
  - [ ] Create `cms/frontend/src/services/sectionsService.ts`
  - [ ] `getSections(pageId)` - Get all sections for page
  - [ ] `getSection(id)` - Get single section
  - [ ] `createSection(pageId, data)` - Create section
  - [ ] `updateSection(id, data)` - Update section
  - [ ] `deleteSection(id)` - Delete section
  - [ ] `reorderSections(pageId, sectionsArray)` - Reorder sections
  - [ ] `toggleVisibility(id)` - Show/hide section

- [ ] **7.2** Build section list page
  - [ ] Create `cms/frontend/src/pages/sections/SectionsListPage.tsx`
  - [ ] Page selector dropdown at top
  - [ ] List of sections for selected page:
    - Section type icon
    - Section title/preview
    - Visibility toggle
    - Order number
    - Edit/delete actions
  - [ ] Drag-and-drop to reorder
  - [ ] "Add Section" button
  - [ ] Section type selector modal

- [ ] **7.3** Create section type selector
  - [ ] Create `cms/frontend/src/components/sections/SectionTypeSelector.tsx`
  - [ ] Grid of section types with icons and descriptions
  - [ ] Click to select type
  - [ ] Opens appropriate editor

- [ ] **7.4** Build base section editor
  - [ ] Create `cms/frontend/src/components/sections/SectionEditor.tsx`
  - [ ] Common fields all sections have:
    - Section key (identifier)
    - Display order
    - Visibility toggle
  - [ ] Content area (varies by type)
  - [ ] Save button
  - [ ] Cancel button

- [ ] **7.5** Build Hero Section editor
  - [ ] Create `cms/frontend/src/components/sections/editors/HeroSectionEditor.tsx`
  - [ ] Background image upload
  - [ ] Title input
  - [ ] Subtitle input
  - [ ] Description textarea
  - [ ] CTA button text
  - [ ] CTA button link
  - [ ] Overlay opacity slider
  - [ ] Text color picker (light/dark)
  - [ ] Preview pane

- [ ] **7.6** Build Text Section editor
  - [ ] Create `cms/frontend/src/components/sections/editors/TextSectionEditor.tsx`
  - [ ] Section heading input
  - [ ] Rich text editor for content
  - [ ] Width selector (full/narrow/wide)
  - [ ] Background color picker
  - [ ] Text alignment (left/center/right)

- [ ] **7.7** Build Image Section editor
  - [ ] Create `cms/frontend/src/components/sections/editors/ImageSectionEditor.tsx`
  - [ ] Image upload
  - [ ] Caption input
  - [ ] Alt text input (accessibility)
  - [ ] Image size selector (full/large/medium/small)
  - [ ] Image alignment (left/center/right)
  - [ ] Click action (none/lightbox/link)

- [ ] **7.8** Build Features Section editor
  - [ ] Create `cms/frontend/src/components/sections/editors/FeaturesSectionEditor.tsx`
  - [ ] Section heading
  - [ ] Add/remove feature items
  - [ ] For each feature:
    - Icon selector (library of icons)
    - Title
    - Description
  - [ ] Layout selector (grid 2/3/4 columns)
  - [ ] Preview grid

- [ ] **7.9** Build Stats Section editor
  - [ ] Create `cms/frontend/src/components/sections/editors/StatsSectionEditor.tsx`
  - [ ] Section heading
  - [ ] Add/remove stat items
  - [ ] For each stat:
    - Number (big text)
    - Label (below number)
    - Icon (optional)
  - [ ] Layout selector
  - [ ] Background color/image

- [ ] **7.10** Build CTA Section editor
  - [ ] Create `cms/frontend/src/components/sections/editors/CTASectionEditor.tsx`
  - [ ] Heading input
  - [ ] Description textarea
  - [ ] Button text
  - [ ] Button link
  - [ ] Button style (primary/secondary/outline)
  - [ ] Background color/image
  - [ ] Layout (centered/left/right)

**Additional Section Editors (Optional - Can be added later):**

- [ ] **7.11** Build Team Section editor
  - [ ] Section heading
  - [ ] Add/remove team members
  - [ ] For each member:
    - Photo upload
    - Name
    - Position
    - Bio
    - Social links
  - [ ] Layout selector

- [ ] **7.12** Build FAQ Section editor
  - [ ] Section heading
  - [ ] Add/remove FAQ items
  - [ ] For each FAQ:
    - Question
    - Answer (rich text)
  - [ ] Expandable/collapsible preview

- [ ] **7.13** Build Contact Form Section editor
  - [ ] Section heading
  - [ ] Form fields configuration:
    - Name (required)
    - Email (required)
    - Phone (optional)
    - Message (required)
    - Custom fields
  - [ ] Submit button text
  - [ ] Success message
  - [ ] Email recipient

- [ ] **7.14** Build Embed Section editor
  - [ ] Section heading
  - [ ] Embed type selector (YouTube/Vimeo/Google Maps/Custom)
  - [ ] URL or embed code input
  - [ ] Width/height settings
  - [ ] Preview

**Core Features:**

- [ ] **7.15** Implement section reordering
  - [ ] Install drag-and-drop library
  - [ ] Make sections draggable in list
  - [ ] Update order in backend on drop
  - [ ] Show visual feedback while dragging

- [ ] **7.16** Create section preview component
  - [ ] Create `cms/frontend/src/components/sections/SectionPreview.tsx`
  - [ ] Renders section as it will appear on website
  - [ ] Different renderer for each section type
  - [ ] Responsive preview

- [ ] **7.17** Build page preview with all sections
  - [ ] Create `cms/frontend/src/components/preview/FullPagePreview.tsx`
  - [ ] Shows entire page with all sections in order
  - [ ] Desktop/tablet/mobile toggle
  - [ ] "Preview Page" button in sections list

- [ ] **7.18** Add section visibility toggle
  - [ ] Eye icon button on each section in list
  - [ ] Toggle between visible/hidden
  - [ ] Hidden sections shown with opacity in editor
  - [ ] Hidden sections don't appear on website

- [ ] **7.19** Add section duplication
  - [ ] "Duplicate" button on each section
  - [ ] Copies all section data
  - [ ] Places copy below original
  - [ ] Increment section key

- [ ] **7.20** Create section templates/presets
  - [ ] Library of pre-made sections
  - [ ] "Add from Template" button
  - [ ] Common layouts saved for reuse

**✅ Phase 7 Complete When:**
- Can create multiple section types
- Can edit section content
- Can reorder sections with drag-and-drop
- Can hide/show sections
- Can duplicate sections
- Section changes reflect on website
- Preview shows accurate representation

---

## Phase 8: CMS Frontend - Media Library
**Estimated Time**: 10-14 hours
**Priority**: HIGH

### Tasks

- [ ] **8.1** Create media service
  - [ ] Create `cms/frontend/src/services/mediaService.ts`
  - [ ] `uploadFile(file, altText)` function
  - [ ] `uploadFiles(files)` function (multi-upload)
  - [ ] `getMedia(params)` function (with pagination)
  - [ ] `getMediaById(id)` function
  - [ ] `updateMedia(id, data)` function
  - [ ] `deleteMedia(id)` function
  - [ ] `searchMedia(query)` function

- [ ] **8.2** Build media library page
  - [ ] Create `cms/frontend/src/pages/media/MediaLibraryPage.tsx`
  - [ ] Grid view of images (thumbnails)
  - [ ] List view option (toggle)
  - [ ] Upload button
  - [ ] Drag-and-drop upload area
  - [ ] Multi-file upload support
  - [ ] Upload progress bars
  - [ ] Search bar
  - [ ] Filter by:
    - File type (image/video/document)
    - Upload date
    - Uploaded by
  - [ ] Sort by (date/name/size)
  - [ ] Pagination
  - [ ] Select mode (for bulk actions)

- [ ] **8.3** Create image upload component
  - [ ] Create `cms/frontend/src/components/media/ImageUploader.tsx`
  - [ ] Drag-and-drop zone
  - [ ] Click to browse files
  - [ ] File type validation (jpg, png, gif, webp)
  - [ ] File size validation (max 5MB)
  - [ ] Preview before upload
  - [ ] Multiple file selection
  - [ ] Upload progress indicator

- [ ] **8.4** Build media details modal
  - [ ] Create `cms/frontend/src/components/media/MediaDetailsModal.tsx`
  - [ ] Shows when clicking on image
  - [ ] Large preview
  - [ ] File information:
    - Filename
    - File size
    - Dimensions (for images)
    - Upload date
    - Uploaded by
    - URL
  - [ ] Alt text editor
  - [ ] "Copy URL" button
  - [ ] "Use in Content" button
  - [ ] Delete button
  - [ ] Download button

- [ ] **8.5** Create media picker modal
  - [ ] Create `cms/frontend/src/components/media/MediaPicker.tsx`
  - [ ] Opens from editors (news, sections, etc.)
  - [ ] Grid of images
  - [ ] Search functionality
  - [ ] Upload new button
  - [ ] Select image and return URL
  - [ ] Recently used images at top

- [ ] **8.6** Implement image optimization
  - [ ] Automatic thumbnail generation
  - [ ] Compress images on upload
  - [ ] Generate multiple sizes (thumbnail, medium, large)
  - [ ] WebP conversion (optional)

- [ ] **8.7** Add bulk actions
  - [ ] Select multiple images (checkboxes)
  - [ ] Bulk delete
  - [ ] Bulk tag editing (optional)
  - [ ] Select all/none

- [ ] **8.8** Test media library
  - [ ] Upload single image
  - [ ] Upload multiple images at once
  - [ ] Search for images
  - [ ] Edit alt text
  - [ ] Copy image URL
  - [ ] Delete image
  - [ ] Use image in news article
  - [ ] Use image in page section

**✅ Phase 8 Complete When:**
- Can upload images (single and multiple)
- Can browse media library
- Can search for images
- Can edit image details (alt text)
- Can copy image URLs
- Can delete images
- Can select images from editors
- Upload progress shows correctly

---

## Phase 9: CMS Frontend - User Management
**Estimated Time**: 8-12 hours
**Priority**: MEDIUM

### Tasks

- [ ] **9.1** Create users service
  - [ ] Create `cms/frontend/src/services/usersService.ts`
  - [ ] `getUsers()` function
  - [ ] `getUser(id)` function
  - [ ] `createUser(data)` function
  - [ ] `updateUser(id, data)` function
  - [ ] `deactivateUser(id)` function
  - [ ] `reactivateUser(id)` function
  - [ ] `changeUserRole(id, role)` function

- [ ] **9.2** Build users list page
  - [ ] Create `cms/frontend/src/pages/users/UsersListPage.tsx`
  - [ ] Table showing:
    - Full name
    - Email
    - Role badge
    - Status (active/inactive)
    - Last login date
    - Actions (edit/deactivate)
  - [ ] "Add New User" button
  - [ ] Search by name/email
  - [ ] Filter by role
  - [ ] Filter by status
  - [ ] Sort by name/email/date

- [ ] **9.3** Build user creation modal
  - [ ] Create `cms/frontend/src/components/users/CreateUserModal.tsx`
  - [ ] Full name input
  - [ ] Email input (with validation)
  - [ ] Role selector (dropdown):
    - Admin
    - Content Creator
    - Reviewer
    - Approver
  - [ ] Auto-generate password button
  - [ ] Show generated password (copy to clipboard)
  - [ ] "Send invitation email" checkbox
  - [ ] Create button

- [ ] **9.4** Build user edit modal
  - [ ] Create `cms/frontend/src/components/users/EditUserModal.tsx`
  - [ ] Full name input
  - [ ] Email input (disabled - can't change)
  - [ ] Role selector
  - [ ] Active/inactive toggle
  - [ ] "Reset Password" button
  - [ ] Save button

- [ ] **9.5** Add role badge component
  - [ ] Create `cms/frontend/src/components/common/RoleBadge.tsx`
  - [ ] Different colors for each role:
    - Admin: red
    - Creator: blue
    - Reviewer: yellow
    - Approver: green
  - [ ] Used in users list and throughout UI

- [ ] **9.6** Test user management
  - [ ] Login as admin
  - [ ] Create new user
  - [ ] Copy generated password
  - [ ] Logout
  - [ ] Login as new user with generated password
  - [ ] Login back as admin
  - [ ] Edit user role
  - [ ] Deactivate user
  - [ ] Try to login as deactivated user (should fail)
  - [ ] Reactivate user

**✅ Phase 9 Complete When:**
- Admins can create users
- Can assign roles
- Can edit user details
- Can deactivate/reactivate users
- Cannot deactivate self
- Generated passwords work
- Role badges display correctly

---

## Phase 10: Website Integration - Dynamic Pages
**Estimated Time**: 20-28 hours
**Priority**: HIGH

### Background
Currently, the website has hardcoded pages. We need to make them fetch content from the CMS.

### Tasks

- [ ] **10.1** Update CMS API client in website
  - [ ] Open `src/services/cmsApi.ts`
  - [ ] Add page-related functions:
    - `getPage(slug)` - Fetch page by slug
    - `getPageSections(slug)` - Fetch sections for page
  - [ ] Update hero slides fetching
  - [ ] Test API functions

- [ ] **10.2** Create section renderer components
  - [ ] Create `src/components/sections/` folder
  - [ ] Create base `SectionRenderer.tsx` component
  - [ ] Switch statement or mapping for section types
  - [ ] Create renderer for each section type:
    - HeroSection.tsx
    - TextSection.tsx
    - ImageSection.tsx
    - FeaturesSection.tsx
    - StatsSection.tsx
    - CTASection.tsx
    - TeamSection.tsx (if implemented)
    - FAQSection.tsx (if implemented)
    - ContactFormSection.tsx (if implemented)
    - EmbedSection.tsx (if implemented)

- [ ] **10.3** Update About page to use CMS
  - [ ] Open `src/pages/About.tsx`
  - [ ] Fetch page data using `cmsApi.getPage('about')`
  - [ ] Fetch sections using `cmsApi.getPageSections('about')`
  - [ ] Map sections to renderer components
  - [ ] Add loading state
  - [ ] Add error handling with fallback content
  - [ ] Test page loads correctly

- [ ] **10.4** Update What We Do page to use CMS
  - [ ] Open `src/pages/WhatWeDo.tsx`
  - [ ] Fetch page data: `cmsApi.getPage('what-we-do')`
  - [ ] Fetch sections
  - [ ] Render sections dynamically
  - [ ] Add loading state
  - [ ] Add fallback content

- [ ] **10.5** Update Scholarship Programme page to use CMS
  - [ ] Open `src/pages/ScholarshipProgramme.tsx`
  - [ ] Fetch page data: `cmsApi.getPage('scholarship-programme')`
  - [ ] Fetch sections
  - [ ] Render sections dynamically
  - [ ] Add loading state
  - [ ] Add fallback content

- [ ] **10.6** Update Contact page to use CMS
  - [ ] Open `src/pages/Contact.tsx`
  - [ ] Fetch page data: `cmsApi.getPage('contact')`
  - [ ] Fetch sections
  - [ ] Render sections dynamically
  - [ ] Keep contact form functional
  - [ ] Add loading state

- [ ] **10.7** Update Hero component to use CMS
  - [ ] Open `src/components/Hero.tsx`
  - [ ] Already using CMS, but verify
  - [ ] Test hero slides from CMS display correctly
  - [ ] Ensure fallback slides work if CMS down

- [ ] **10.8** Create dynamic page component
  - [ ] Create `src/pages/DynamicPage.tsx`
  - [ ] Accepts slug as parameter
  - [ ] Fetches page and sections
  - [ ] Renders all sections in order
  - [ ] Used for any new pages created in CMS

- [ ] **10.9** Update routing for dynamic pages
  - [ ] Open `src/App.tsx`
  - [ ] Add route for dynamic pages: `/:slug`
  - [ ] Must be last route (catch-all)
  - [ ] Shows 404 if page not found

- [ ] **10.10** Create loading states
  - [ ] Create `src/components/common/PageLoader.tsx`
  - [ ] Skeleton loaders for sections
  - [ ] Spinner or progress indicator
  - [ ] Used while fetching page data

- [ ] **10.11** Create error states
  - [ ] Create `src/components/common/PageError.tsx`
  - [ ] Friendly error message
  - [ ] "Try again" button
  - [ ] Shows if CMS request fails

- [ ] **10.12** Add caching strategy
  - [ ] Implement cache in cmsApi.ts
  - [ ] Cache page data for 5 minutes
  - [ ] Cache sections for 5 minutes
  - [ ] Clear cache button in CMS (optional)
  - [ ] Reduces API calls

- [ ] **10.13** Add page metadata (SEO)
  - [ ] Use page.meta_title for `<title>` tag
  - [ ] Use page.meta_description for meta description
  - [ ] Update on each page load
  - [ ] Create `usePageMeta()` hook

- [ ] **10.14** Test all pages
  - [ ] Homepage: Check hero slides and news
  - [ ] About page: Verify content from CMS
  - [ ] What We Do: Verify content
  - [ ] Scholarship Programme: Verify content
  - [ ] Contact: Verify content and form works
  - [ ] News page: Verify articles from CMS
  - [ ] Individual news article: Verify content

- [ ] **10.15** Test offline/error scenarios
  - [ ] Stop CMS backend
  - [ ] Check website shows fallback content
  - [ ] Restart backend
  - [ ] Verify content loads again

**✅ Phase 10 Complete When:**
- All website pages fetch content from CMS
- Can edit any page content through CMS admin
- Changes in CMS reflect immediately on website (or after cache expires)
- Loading states show while fetching
- Error states show if CMS unavailable
- Fallback content works
- SEO metadata updates correctly

---

## Phase 11: Testing, Polish & Documentation
**Estimated Time**: 12-16 hours
**Priority**: HIGH

### Tasks

- [ ] **11.1** Complete workflow testing
  - [ ] Test creator workflow end-to-end
  - [ ] Test reviewer workflow
  - [ ] Test approver workflow
  - [ ] Test admin workflow
  - [ ] Test with multiple users simultaneously
  - [ ] Document any issues found

- [ ] **11.2** Cross-browser testing
  - [ ] Test in Chrome
  - [ ] Test in Firefox
  - [ ] Test in Safari
  - [ ] Test in Edge
  - [ ] Fix any browser-specific issues

- [ ] **11.3** Responsive testing
  - [ ] Test CMS on desktop (1920px, 1366px)
  - [ ] Test CMS on tablet (768px)
  - [ ] Test CMS on mobile (375px)
  - [ ] Test website on all screen sizes
  - [ ] Fix any responsive issues

- [ ] **11.4** Performance optimization
  - [ ] Check page load times
  - [ ] Optimize images
  - [ ] Enable gzip compression
  - [ ] Minimize API calls
  - [ ] Add loading states everywhere
  - [ ] Test with slow network (throttle)

- [ ] **11.5** Add loading indicators
  - [ ] All buttons show loading state when clicked
  - [ ] All forms disable during submit
  - [ ] All page transitions show loader
  - [ ] No "blank screen" moments

- [ ] **11.6** Add success/error notifications
  - [ ] Install toast library (e.g., react-hot-toast)
  - [ ] Success message after save
  - [ ] Error message on failure
  - [ ] Proper error messages (not "Error 500")
  - [ ] Auto-dismiss after 3-5 seconds

- [ ] **11.7** Form validation
  - [ ] All forms validate before submit
  - [ ] Show field-level errors
  - [ ] Required fields marked
  - [ ] Email validation
  - [ ] URL validation
  - [ ] Prevent duplicate submissions

- [ ] **11.8** Create user documentation
  - [ ] Create `docs/USER_GUIDE.md`
  - [ ] How to login
  - [ ] How to create news article
  - [ ] How to create hero slide
  - [ ] How to create/edit page
  - [ ] How to add sections
  - [ ] How to upload images
  - [ ] How to manage users (admin)
  - [ ] Include screenshots

**✅ Phase 11 Complete When:**
- All workflows tested and working
- No major bugs
- Works in all browsers
- Responsive on all devices
- Fast and performant
- User-friendly error messages
- Documentation complete

---

## Phase 12: Staging Deployment
**Estimated Time**: 6-10 hours
**Priority**: MEDIUM

### Tasks

- [ ] **12.1** Choose hosting platforms
  - [ ] Database: Supabase or Neon
  - [ ] CMS Backend: Railway or Render
  - [ ] CMS Frontend: Vercel
  - [ ] Website: Vercel
  - [ ] Document choices and reasons

- [ ] **12.2** Set up staging database
  - [ ] Create Supabase/Neon project
  - [ ] Name: getfund-staging
  - [ ] Run all migrations
  - [ ] Run seed scripts
  - [ ] Test connection
  - [ ] Save connection string

- [ ] **12.3** Deploy CMS backend to staging
  - [ ] Create Railway/Render project
  - [ ] Connect GitHub repository
  - [ ] Set environment variables:
    - DATABASE_URL (from step 12.2)
    - JWT_SECRET (generate new)
    - JWT_REFRESH_SECRET (generate new)
    - NODE_ENV=staging
    - CORS settings (staging URLs)
  - [ ] Deploy
  - [ ] Test API endpoints work
  - [ ] Save API URL

- [ ] **12.4** Deploy CMS frontend to staging
  - [ ] Create Vercel project
  - [ ] Connect GitHub repository
  - [ ] Set root directory: cms/frontend
  - [ ] Set environment variables:
    - VITE_API_URL (from step 12.3)
  - [ ] Deploy
  - [ ] Get URL (e.g., getfund-cms-staging.vercel.app)
  - [ ] Test login works

- [ ] **12.5** Deploy website to staging
  - [ ] Create Vercel project
  - [ ] Connect GitHub repository
  - [ ] Set root directory: ./
  - [ ] Set environment variables (if any)
  - [ ] Deploy
  - [ ] Get URL (e.g., getfund-staging.vercel.app)
  - [ ] Test website loads

- [ ] **12.6** Configure custom domains (optional for staging)
  - [ ] staging.getfund.gov.gh → Website
  - [ ] staging-cms.getfund.gov.gh → CMS Frontend
  - [ ] staging-api.getfund.gov.gh → CMS Backend
  - [ ] Configure DNS records
  - [ ] Verify SSL certificates

- [ ] **12.7** Complete staging testing
  - [ ] Test full workflow in staging
  - [ ] Create content in staging CMS
  - [ ] Verify appears on staging website
  - [ ] Test all user roles
  - [ ] Test image uploads
  - [ ] Test page editing
  - [ ] Document any issues

**✅ Phase 12 Complete When:**
- All services deployed to staging
- Can access staging URLs
- Full workflow works in staging
- Team can test from staging
- No critical issues

---

## Phase 13: Production Deployment
**Estimated Time**: 8-12 hours
**Priority**: LOW (only after staging is stable)

### Tasks

- [ ] **13.1** Set up production database
  - [ ] Create new Supabase/Neon project
  - [ ] Name: getfund-production
  - [ ] Run all migrations
  - [ ] DO NOT run seed scripts (clean start)
  - [ ] Configure automated backups (daily)
  - [ ] Set up point-in-time recovery
  - [ ] Test connection
  - [ ] Save connection string (secure)

- [ ] **13.2** Generate production secrets
  - [ ] Generate new JWT_SECRET: `openssl rand -base64 32`
  - [ ] Generate new JWT_REFRESH_SECRET: `openssl rand -base64 32`
  - [ ] Store in password manager (1Password, LastPass, etc.)
  - [ ] NEVER commit to Git

- [ ] **13.3** Deploy CMS backend to production
  - [ ] Create production Railway/Render project
  - [ ] Connect GitHub repository (main branch)
  - [ ] Set environment variables:
    - DATABASE_URL (production)
    - JWT_SECRET (from 13.2)
    - JWT_REFRESH_SECRET (from 13.2)
    - NODE_ENV=production
    - CORS settings (production URLs)
  - [ ] Deploy
  - [ ] Test API health endpoint
  - [ ] Save API URL

- [ ] **13.4** Deploy CMS frontend to production
  - [ ] Create production Vercel project
  - [ ] Connect GitHub repository (main branch)
  - [ ] Set root directory: cms/frontend
  - [ ] Set environment variables:
    - VITE_API_URL (production backend URL)
  - [ ] Deploy
  - [ ] Test login page loads

- [ ] **13.5** Deploy website to production
  - [ ] Create production Vercel project
  - [ ] Connect GitHub repository (main branch)
  - [ ] Set root directory: ./
  - [ ] Configure build settings
  - [ ] Deploy
  - [ ] Test homepage loads

- [ ] **13.6** Configure production domains
  - [ ] www.getfund.gov.gh → Website
  - [ ] cms.getfund.gov.gh → CMS Frontend
  - [ ] api.getfund.gov.gh → CMS Backend
  - [ ] Add DNS records (A or CNAME)
  - [ ] Verify SSL certificates (should be automatic)
  - [ ] Test all URLs with HTTPS

- [ ] **13.7** Create production users
  - [ ] Login as default admin
  - [ ] Create real admin user with strong password
  - [ ] Create content creator accounts
  - [ ] Create reviewer account
  - [ ] Create approver account
  - [ ] Deactivate or delete default test users
  - [ ] Change all default passwords

- [ ] **13.8** Initial content migration
  - [ ] Login to production CMS
  - [ ] Create initial pages (About, What We Do, etc.)
  - [ ] Add page sections
  - [ ] Create hero slides
  - [ ] Migrate existing news articles (if any)
  - [ ] Upload images
  - [ ] Publish all initial content
  - [ ] Verify appears on production website

- [ ] **13.9** Set up monitoring
  - [ ] Create Sentry account (error tracking)
  - [ ] Add Sentry to backend
  - [ ] Add Sentry to CMS frontend
  - [ ] Add Sentry to website
  - [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
  - [ ] Configure alert emails/SMS
  - [ ] Test alerts work

- [ ] **13.10** Set up backups
  - [ ] Verify database automated backups enabled
  - [ ] Test database restore process
  - [ ] Document backup retention policy
  - [ ] Document restore procedures
  - [ ] Set backup alerts

- [ ] **13.11** Security audit
  - [ ] All default passwords changed
  - [ ] Test accounts removed
  - [ ] HTTPS working on all domains
  - [ ] CORS properly configured
  - [ ] Rate limiting enabled
  - [ ] No sensitive data in logs
  - [ ] Error messages don't leak info
  - [ ] Run security scan (optional)

- [ ] **13.12** Create runbooks
  - [ ] Document deployment process
  - [ ] Document rollback procedure
  - [ ] Document backup/restore procedure
  - [ ] Document common issues and fixes
  - [ ] Document who to contact for issues
  - [ ] Store in accessible location

- [ ] **13.13** Performance testing
  - [ ] Test page load times
  - [ ] Test with 10+ concurrent users
  - [ ] Test image loading
  - [ ] Test API response times
  - [ ] Run Lighthouse audit
  - [ ] Fix any performance issues

- [ ] **13.14** Final production testing
  - [ ] Test full workflow in production
  - [ ] Test all user roles
  - [ ] Test all page types
  - [ ] Test all section types
  - [ ] Test media uploads
  - [ ] Test on multiple devices
  - [ ] Test on multiple browsers
  - [ ] Have team members test

- [ ] **13.15** Launch checklist
  - [ ] All critical bugs fixed
  - [ ] Performance is acceptable
  - [ ] Security audit passed
  - [ ] Backups configured
  - [ ] Monitoring enabled
  - [ ] Team trained on CMS
  - [ ] Documentation complete
  - [ ] Go/no-go decision made

- [ ] **13.16** Go live
  - [ ] Announce to team
  - [ ] Update DNS to point to production
  - [ ] Monitor for first 24 hours
  - [ ] Be available for support
  - [ ] Fix any critical issues immediately

**✅ Phase 13 Complete When:**
- Production is live at www.getfund.gov.gh
- CMS is accessible at cms.getfund.gov.gh
- All team members can access and use CMS
- Content on website is being managed through CMS
- Monitoring and backups are working
- No critical issues

---

## Quick Start Checklist

### If Starting Fresh Today:

**Week 1: Foundation**
- [ ] Phase 1: Environment setup (Day 1)
- [ ] Phase 2: Backend expansion (Day 2-3)
- [ ] Phase 3: Authentication & layout (Day 4-5)

**Week 2-3: Core Content Management**
- [ ] Phase 4: News management (Week 2)
- [ ] Phase 5: Hero slides (Week 2)
- [ ] Phase 6: Page management (Week 3)

**Week 4-5: Advanced Features**
- [ ] Phase 7: Section management (Week 4-5)
- [ ] Phase 8: Media library (Week 5)
- [ ] Phase 9: User management (Week 5)

**Week 6: Integration & Testing**
- [ ] Phase 10: Website integration (Week 6)
- [ ] Phase 11: Testing & polish (Week 6)

**Week 7: Deployment**
- [ ] Phase 12: Staging deployment (Week 7)
- [ ] Phase 13: Production deployment (Week 7)

---

## Priority Ordering

### Must Have (Critical Path):
1. Phase 1 - Environment Setup
2. Phase 2 - Backend Expansion
3. Phase 3 - Auth & Layout
4. Phase 6 - Page Management
5. Phase 7 - Section Management
6. Phase 10 - Website Integration

### Should Have (Important):
7. Phase 4 - News Management (already partially done)
8. Phase 5 - Hero Slides (already partially done)
9. Phase 8 - Media Library
10. Phase 11 - Testing

### Nice to Have (Can be added later):
11. Phase 9 - User Management (admin can manage via API initially)
12. Advanced section types (Team, FAQ, Contact Form, Embed)
13. Page templates
14. Section templates

### Deployment (When ready):
15. Phase 12 - Staging
16. Phase 13 - Production

---

## Estimated Total Time

| Phase | Hours |
|-------|-------|
| 1. Environment Setup | 2 |
| 2. Backend Expansion | 8-12 |
| 3. Auth & Layout | 12-16 |
| 4. News Management | 20-24 |
| 5. Hero Slides | 8-12 |
| 6. Page Management | 16-20 |
| 7. Section Management | 24-32 |
| 8. Media Library | 10-14 |
| 9. User Management | 8-12 |
| 10. Website Integration | 20-28 |
| 11. Testing & Polish | 12-16 |
| 12. Staging Deployment | 6-10 |
| 13. Production Deployment | 8-12 |
| **TOTAL** | **154-210 hours** |

### At 8 hours/day:
- **Minimum**: 19 working days (~4 weeks)
- **Maximum**: 26 working days (~5-6 weeks)

### At 4 hours/day:
- **Minimum**: 39 working days (~8 weeks)
- **Maximum**: 53 working days (~11 weeks)

---

## Notes

- Check off tasks as completed
- Update this document regularly
- Add notes for any blockers or issues
- Celebrate milestones!

---

**Last Updated**: November 7, 2025
**Status**: Ready to begin implementation
**Next Action**: Start Phase 1 - Environment Setup
