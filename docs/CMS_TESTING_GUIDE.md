# GETFund CMS - Testing & Verification Guide

## 🎯 Quick Status

**All Servers Running:**
- ✅ Backend API: http://localhost:5000
- ✅ CMS Admin Panel: http://localhost:5174
- ✅ Public Website: http://localhost:5173

**Integration Status:**
- ✅ Website Hero component now fetches from CMS
- ✅ Website News component now fetches from CMS
- ✅ 3 news articles already published in CMS
- ⚠️ No hero slides published yet (using default slides)

---

## 📋 Complete Workflow Testing Guide

### Test 1: Verify Published Content on Website

1. **Open the public website**: http://localhost:5173
2. **Check News Section**:
   - Should display 3 articles from CMS
   - Titles: "Ambariya Schools", "Northern Region Multi-Project", "Ghana SHS Expansion"
   - These are fetched from CMS API, not hardcoded
3. **Check Hero Carousel**:
   - Currently shows default slides (no CMS slides published yet)
   - This is expected fallback behavior

### Test 2: Creator Workflow

**Login as Creator:**
- URL: http://localhost:5174
- Email: `creator@getfund.gov.gh`
- Password: `getfund2025`

**Create a News Article:**
1. Click "News Articles" in sidebar
2. Click "Create New Article"
3. Fill in the form:
   - Title: "Test News Article - [Your Name]"
   - Slug: auto-generated
   - Excerpt: "This is a test article to verify the CMS workflow"
   - Content: Use rich text editor to add formatted content
   - Featured Image URL: (optional) paste any image URL
   - Tags: "Testing, Infrastructure"
4. Click "Save as Draft"
5. Click "Submit for Review"

**Create a Hero Slide:**
1. Click "Hero Slides" in sidebar
2. Click "Create New Slide"
3. Fill in the form:
   - Title: "Test Hero Slide"
   - Subtitle: "Testing CMS Integration"
   - Featured Image: `/images/hero/main-slider-1.jpg`
   - Button Text: "Learn More"
   - Button Link: "/about"
4. Click "Save as Draft"
5. Click "Submit for Review"

### Test 3: Reviewer Workflow

**Logout and Login as Reviewer:**
- Email: `reviewer@getfund.gov.gh`
- Password: `getfund2025`

**Review Submitted Content:**
1. Click "Review Queue" in sidebar
2. You should see 2 items (news + hero slide)
3. Click "Review" on the test news article
4. Read the content
5. Options:
   - **To Approve**: Add review notes (optional), click "Approve"
   - **To Request Changes**: Add notes explaining what needs changing, click "Request Changes"
6. Repeat for the hero slide

### Test 4: Approver Workflow

**Logout and Login as Approver:**
- Email: `approver@getfund.gov.gh`
- Password: `getfund2025`

**Publish Approved Content:**
1. Click "Approval Queue" in sidebar
2. You should see approved items from previous step
3. Click "Preview" to see final review
4. Click "🚀 Publish Now"
5. Confirm the publish action

### Test 5: Verify Published Content on Website

**Refresh the public website**: http://localhost:5173

**Expected Results:**
- ✅ Hero carousel should now include your test slide
- ✅ News section should now include your test article (total 4 articles)
- ✅ Content should be formatted correctly
- ✅ Images should load properly

---

## 🔑 Test User Accounts

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| Admin | admin@getfund.gov.gh | getfund2025 | Full access to everything |
| Creator | creator@getfund.gov.gh | getfund2025 | Create news & hero slides |
| Reviewer | reviewer@getfund.gov.gh | getfund2025 | Review submitted content |
| Approver | approver@getfund.gov.gh | getfund2025 | Publish approved content |
| Editor | editor@getfund.gov.gh | getfund2025 | Edit own content |

---

## 🔄 Workflow States

Content goes through these states:

1. **Draft** → Created by creator
2. **In Review** → Submitted by creator, awaiting reviewer
3. **Approved** → Approved by reviewer, awaiting approver
4. **Published** → Published by approver, visible on website
5. **Changes Requested** → Reviewer requests modifications

---

## 🐛 Troubleshooting

### Website not showing CMS content?

**Check 1 - Backend API running:**
```bash
curl http://localhost:5000/api/content/published?type=news
```
Should return JSON array of published news.

**Check 2 - Browser console:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Look for failed fetch requests

**Check 3 - Verify published content exists:**
```bash
curl http://localhost:5000/api/content/published?type=hero_slide
```
Should return array of published slides (empty if none published).

### Login not working?

**Check credentials:**
- Passwords are case-sensitive: `getfund2025`
- Emails must match exactly

**Check backend:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@getfund.gov.gh\",\"password\":\"getfund2025\"}"
```
Should return access_token.

### Content stuck in workflow?

**Admin override:**
- Login as admin@getfund.gov.gh
- Admins can perform all actions (review, approve, publish)
- Use admin account to force content through workflow

---

## 📊 Features Completed

### Backend (100%)
- [x] PostgreSQL database with 8 tables
- [x] JWT authentication with refresh tokens
- [x] 40+ RESTful API endpoints
- [x] Multi-role permission system
- [x] Content workflow (draft → review → approve → publish)
- [x] Audit logging
- [x] File upload support
- [x] CORS and security middleware

### CMS Frontend (100%)
- [x] Login page with authentication
- [x] Role-based dashboard
- [x] News article management (CRUD)
- [x] Hero slide management (CRUD)
- [x] TipTap rich text editor
- [x] Review queue for reviewers
- [x] Approval queue for approvers
- [x] Permission-based UI
- [x] Responsive design

### Website Integration (100%)
- [x] CMS API client (src/services/cmsApi.ts)
- [x] Hero component fetches from CMS
- [x] News component fetches from CMS
- [x] Graceful fallback to defaults
- [x] Loading states
- [x] Error handling

---

## 🎉 Next Steps

1. **Test the complete workflow** (follow guide above)
2. **Report any bugs or issues found**
3. **Optional enhancements**:
   - Media library with file uploads
   - User management page for admin
   - Audit logs viewer
   - Email notifications
   - Advanced search/filtering
   - Draft auto-save
   - Content scheduling

---

## 📝 Notes

- All passwords are currently set to: `getfund2025`
- Database: `getfund_cms` on local PostgreSQL
- Backend runs on port 5000
- CMS frontend runs on port 5174
- Public website runs on port 5173
- All code is in the `cms/` subdirectory
- Compatible with Supabase for future migration

---

**Generated**: 2025-11-01
**Status**: Ready for testing
