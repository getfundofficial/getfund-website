# Home Template Guide

## Overview

The **Home** template is a dedicated template for the homepage that provides a comprehensive layout specifically designed for the main landing page of the website.

## What's Included

The Home template includes the following sections:

### 1. Hero Carousel Section
- **Full-screen carousel** with multiple slides using react-slick
- Auto-rotating slides (5 second intervals)
- Navigation arrows (left/right)
- Dot indicators at the bottom
- Pause on hover
- Each slide includes:
  - Background image (full-screen)
  - Headline (large, bold text)
  - Description text
  - Optional CTA button with link
- Gradient overlay for text readability
- Fully responsive design

### 2. Mission/Vision/Values Cards
- Three prominent cards displaying:
  - **Mission** (Target icon)
  - **Vision** (Eye icon)
  - **Core Values** (Heart icon)
- Fully customizable titles and descriptions

### 3. About GETFund Section
- Detailed information about the organization
- Support for multiple paragraphs
- Bulleted list of relevant factors
- Styled with gradient background

### 4. Services/Programs Highlight (Optional)
- Grid layout for showcasing key programs
- Each service includes:
  - Title
  - Description
  - "Learn More" link
- Responsive grid (1-3 columns)

### 5. Impact Statistics (Optional)
- Eye-catching statistics display
- Prominent numbers with labels and descriptions
- Full-width section with brand colors

### 6. News & Updates Section (Optional)
- Featured news articles (up to 3)
- Article cards with:
  - Category badges
  - Publication dates
  - Excerpts
  - "Read More" links
- "View All News" CTA button

## How to Use in CMS

### Step 1: Edit the Home Page
1. Go to the CMS at `http://localhost:5174/admin/pages`
2. Click on the **Home** page (slug: `home`)

### Step 2: Select the Home Template
1. In the **Template** dropdown, select **"Home"**
2. This will apply the homepage-specific layout

### Step 3: Add Content Section
1. Add a section with:
   - **Section Key**: `page_content`
   - **Section Type**: `page_content`
2. In the **Content** field (JSON), add your homepage content

### Step 4: Content Structure

Here's the JSON structure for the home template:

```json
{
  "heroSlides": [
    {
      "image": "/images/hero/main-slider-3.jpg",
      "headline": "Every Ghanaian Child Deserves the Opportunity to be Educated",
      "description": "Supporting the delivery of quality education to Ghanaians from basic to tertiary level",
      "ctaText": "Apply for Scholarship",
      "ctaLink": "/scholarship-apply"
    },
    {
      "image": "/images/hero/main-slider-1.jpg",
      "headline": "Transforming Schools Across Ghana",
      "description": "GETFund builds and renovates classrooms, science labs, and libraries for a brighter future",
      "ctaText": "",
      "ctaLink": ""
    },
    {
      "image": "/images/scholarship/OME1079.jpg",
      "headline": "Empowering Students Through Scholarships",
      "description": "Financial support for talented Ghanaians to pursue higher education",
      "ctaText": "",
      "ctaLink": ""
    }
  ],
  "aboutHeading": "Who We Are",
  "aboutSubheading": "The Ghana Education Trust Fund is a statutory body established to provide financial resources for educational development.",
  "mission": {
    "title": "Our Mission",
    "description": "To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana"
  },
  "vision": {
    "title": "Our Vision",
    "description": "To be a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians"
  },
  "coreValues": {
    "title": "Core Values",
    "description": "Integrity, transparency, excellence, and commitment to transforming lives through education"
  },
  "aboutGETFundHeading": "About GETFund",
  "aboutGETFundContent": [
    "Since its establishment in the year 2000, the fund has remained committed to its mandate espoused in its governing legislation, Act 581.",
    "GETFund has since its inception remained a significant player in Ghana's education sector."
  ],
  "relevantFactors": [
    "Promotion of the study of Mathematics, Science and Technology",
    "Advancement of female education",
    "Reduction in the high level of illiteracy in historically disadvantaged areas",
    "Promotion of Vocational, Technical Education and Training"
  ],
  "servicesTitle": "What We Do",
  "services": [
    {
      "title": "Scholarship Programme",
      "description": "Financial support for talented Ghanaians to pursue higher education",
      "link": "/service/scholarship-programme"
    },
    {
      "title": "Infrastructure Projects",
      "description": "Building and renovating educational facilities across Ghana",
      "link": "/service/infrastructure-projects"
    },
    {
      "title": "Education Sector Support",
      "description": "Comprehensive support for educational development",
      "link": "/service/education-sector-support"
    }
  ],
  "impactStats": [
    {
      "number": "500+",
      "label": "Schools Built",
      "description": "New educational facilities nationwide"
    },
    {
      "number": "10,000+",
      "label": "Scholarships Awarded",
      "description": "Supporting talented students"
    },
    {
      "number": "₵2.5B",
      "label": "Total Investment",
      "description": "Invested in education"
    },
    {
      "number": "16",
      "label": "Regions Covered",
      "description": "Nationwide impact"
    }
  ],
  "newsTitle": "News & Updates",
  "newsSubtitle": "Stay updated with the latest developments and achievements from GETFund",
  "featuredNews": [
    {
      "id": "1",
      "slug": "getfund-scholarship-applications-open",
      "title": "GETFund Scholarship Applications Now Open",
      "excerpt": "Applications for the 2024 scholarship programme are now being accepted...",
      "category": "Scholarships",
      "date": "2024-01-15",
      "image": "/images/news/scholarships-2024.jpg"
    }
  ]
}
```

## Content Fields Reference

### Required Fields
- `heroSlides` - Array of hero slides (at least 1 slide recommended)
  - `heroSlides[].headline` - Slide headline
  - `heroSlides[].description` - Slide description
  - `heroSlides[].image` - Slide background image
- `mission.title` & `mission.description`
- `vision.title` & `vision.description`
- `coreValues.title` & `coreValues.description`

### Optional Fields
- `heroSlides[].ctaText` - Call-to-action button text (if empty, no button shown)
- `heroSlides[].ctaLink` - CTA button link
- `aboutGETFundContent` - Array of paragraphs
- `relevantFactors` - Array of bullet points
- `services` - Array of service/program cards
- `impactStats` - Array of statistics
- `featuredNews` - Array of news articles

## Design Features

1. **Hero Carousel**: Full-screen auto-rotating slides with smooth transitions
2. **Responsive Layout**: Optimized for all screen sizes (mobile, tablet, desktop)
3. **Brand Colors**: Uses getfund-primary, getfund-secondary, and getfund-gold
4. **Accessibility**: Proper icons with ARIA labels, keyboard navigation for carousel
5. **Modern Design**: Cards, shadows, hover effects, and gradient overlays
6. **SEO-Friendly**: Proper heading hierarchy and semantic HTML
7. **Performance**: Optimized images with proper loading attributes

## Default Values

If fields are missing, the template provides sensible defaults:
- Default mission/vision/values text
- Default headings and descriptions
- Gracefully handles missing sections (they simply won't render)

## Tips for Content Editors

1. **Multiple Carousel Slides** - Add 3-5 hero slides for engaging carousel experience
2. **Keep headlines concise** - Aim for 5-10 words for maximum impact
3. **Use high-quality images** - Hero images should be at least 1920x1080px, ideally landscape
4. **Strategic CTAs** - Use CTA buttons on 1-2 slides max (usually the first slide)
5. **Limit featured news** - Show only 3 most recent articles
6. **Update regularly** - Keep the homepage content fresh, especially carousel images
7. **Test on mobile** - Ensure content displays well on all devices
8. **Image Optimization** - Compress hero images to improve load times

## Technical Details

- **Template File**: `src/templates/pages/HomePage.tsx`
- **Template Name**: `home`
- **Slug**: `home` (maps to root path `/`)
- **Registered**: Yes, in template registry

## Differences from Generic Template

Unlike other page templates, the Home template:
- Has a dedicated structure for homepage-specific content
- Includes mission/vision/values section
- Features impact statistics display
- Integrates news feed seamlessly
- Optimized for conversion and engagement

## Next Steps

After setting up the home page:
1. Add hero slides with compelling imagery
2. Configure mission/vision/values statements
3. Add services/programs you want to highlight
4. Set up impact statistics
5. Connect news feed (fetched from CMS automatically)
6. Test the page on different devices
7. Publish and monitor engagement

## Support

For questions or issues with the Home template, refer to:
- `TEMPLATE_SYSTEM_GUIDE.md` - Comprehensive template documentation
- `QUICK_REFERENCE.md` - Quick reference for common tasks
