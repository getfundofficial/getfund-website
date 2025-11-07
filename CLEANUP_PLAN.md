# 🧹 GETFund Website Cleanup Plan

## Files and Dependencies to Remove

### 1. Unused Page Components
- ❌ `src/pages/NewsArticle.tsx` (Not used in routing)
- ❌ `src/pages/BasicEducationProject.tsx` (Not routed)
- ❌ `src/pages/CommunityDaySchoolProject.tsx` (Not routed)

### 2. Unused Component Files
- ❌ `src/components/Services.tsx` (Not imported anywhere)
- ❌ `src/components/RecentProjects.tsx` (Not imported anywhere)
- ❌ `src/components/Impact.tsx` (Not imported anywhere, separate from pages/Impact.tsx)

### 3. Unused Dependencies (package.json)
- ❌ `@supabase/supabase-js` (Not used in main app)
- ❌ `cheerio` (Only used in scraper script)
- ❌ `fs-extra` (Only used in scraper script)

### 4. Unused Dev Dependencies
- ❌ `@types/react-router-dom` (React Router DOM has built-in types)
- ❌ `terser` (Vite handles minification)

### 5. Unnecessary Files
- ❌ `image-generator.html` (Development tool, not needed in production)
- ❌ `scrape-getfund-news.js` (Move to separate tools folder or remove)
- ❌ `SITE_CONTENT.md` (Duplicate of SITE_CONTENT_updated.md)

### 6. Duplicate Documentation
- ❌ Multiple CMS documentation files can be consolidated

### 7. Unused CSS/Styles
- Clean up unused Tailwind classes
- Remove unused CSS variables

## Files to Keep But Clean Up

### 1. Components with Unused Imports
- Fix unused lucide-react icon imports
- Remove unused state variables
- Clean up console.logs

### 2. Optimize Package.json
- Update name from generic "vite-react-typescript-starter"
- Clean up scripts

## Estimated Space Savings
- Package size reduction: ~40MB (removing unused node_modules)
- Source code reduction: ~15-20 files
- Build size reduction: ~10-15%

## Implementation Priority
1. **High Priority**: Remove unused dependencies and large files
2. **Medium Priority**: Remove unused components and pages  
3. **Low Priority**: Clean up imports and console statements