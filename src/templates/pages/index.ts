/**
 * Page Template Registry
 *
 * This file maps template names to their corresponding React components.
 * Each template is a complete page layout that receives content from the CMS.
 */

import React from 'react';
import { HomePage } from './HomePage';
import { AboutPage as WhoWeArePage } from './WhoWeArePage';
import { ContactPage } from './ContactPage';
import { WhatWeDoPage } from './WhatWeDoPage';
import { ScholarshipProgrammePage } from './ScholarshipProgrammePage';
import { ScholarshipsPage } from './ScholarshipsPage';
import { InfrastructureProjectsPage } from './InfrastructureProjectsPage';
import { ImpactPage } from './ImpactPage';
import { FAQPage } from './FAQPage';
import { SupportUsPage } from './SupportUsPage';
import { FundraisingCampaignsPage } from './FundraisingCampaignsPage';

// Template metadata for documentation and CMS integration
export interface PageTemplateMetadata {
  name: string;
  displayName: string;
  description: string;
  contentSchema: Record<string, any>; // JSON schema for CMS content validation
  previewImage?: string;
}

// Registry of all available page templates
export const pageTemplateRegistry: Record<string, React.ComponentType<any>> = {
  'home': HomePage,
  'who-we-are': WhoWeArePage,
  'what-we-do': WhatWeDoPage,
  'scholarship-programme': ScholarshipProgrammePage,
  'scholarships': ScholarshipsPage,
  'infrastructure-projects': InfrastructureProjectsPage,
  'impact': ImpactPage,
  'faq': FAQPage,
  'contact': ContactPage,
  'support-us': SupportUsPage,
  'fundraising-campaigns': FundraisingCampaignsPage,
};

// Metadata for each template (used by CMS)
export const pageTemplateMetadata: Record<string, PageTemplateMetadata> = {
  'home': {
    name: 'home',
    displayName: 'Home',
    description: 'Homepage template with hero carousel, mission/vision/values, about section, services, impact stats, and news',
    contentSchema: { type: 'object', properties: {} },
  },
  'who-we-are': {
    name: 'who-we-are',
    displayName: 'Who We Are',
    description: 'Comprehensive template for Who We Are pages with hero, mission/vision/values, history, funding, governance, and leadership sections',
    contentSchema: {
      type: 'object',
      properties: {
        heroTitle: { type: 'string', description: 'Hero section title' },
        heroSubtitle: { type: 'string', description: 'Hero section subtitle' },
        mainImage: { type: 'string', format: 'url', description: 'Main section image URL' },
        mainImageAlt: { type: 'string', description: 'Main image alt text' },
        mainHeading: { type: 'string', description: 'Main content heading' },
        redHeading: { type: 'string', description: 'Red highlighted subheading' },
        paragraph1: { type: 'string', description: 'First paragraph content' },
        paragraph2: { type: 'string', description: 'Second paragraph content' },
        vision: { type: 'string', description: 'Vision statement' },
        mission: { type: 'string', description: 'Mission statement' },
        values: { type: 'string', description: 'Values statement' },
        financingTitle: { type: 'string', description: 'Educational financing section title' },
        financingContent: { type: 'string', format: 'html', description: 'Educational financing content (HTML)' },
        fundingFormulaTitle: { type: 'string', description: 'Funding formula section title' },
        fundingFormulaIntro: { type: 'string', description: 'Funding formula introduction' },
        fundingFormulaItems: {
          type: 'array',
          description: 'Funding formula bullet points',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string' },
            },
            required: ['text'],
          },
        },
        leadershipGovernanceTitle: { type: 'string', description: 'Leadership & Governance title' },
        leadershipGovernanceSubtitle: { type: 'string', description: 'Leadership & Governance subtitle' },
        boardImage: { type: 'string', format: 'url', description: 'Board of Directors image URL' },
        boardImageAlt: { type: 'string', description: 'Board image alt text' },
        boardTitle: { type: 'string', description: 'Board of Directors title' },
        boardDescription: { type: 'string', description: 'Board description' },
        boardCommitments: {
          type: 'array',
          description: 'Board commitment items',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              color: { type: 'string', enum: ['red', 'yellow', 'orange'] },
            },
            required: ['title', 'description', 'color'],
          },
        },
        footerMessage: { type: 'string', description: 'Footer message text' },
        leadership: {
          type: 'array',
          description: 'Leadership team members',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              title: { type: 'string' },
              imageUrl: { type: 'string', format: 'url' },
              bio: { type: 'string' },
            },
            required: ['name', 'title'],
          },
        },
      },
    },
  },
  'what-we-do': {
    name: 'what-we-do',
    displayName: 'What We Do',
    description: 'Template showcasing programs, initiatives, and key areas of focus',
    contentSchema: { type: 'object', properties: {} }, // Simplified for brevity
  },
  'scholarship-programme': {
    name: 'scholarship-programme',
    displayName: 'Scholarship Programme',
    description: 'Template for scholarship programs with eligibility, process, and success stories',
    contentSchema: { type: 'object', properties: {} },
  },
  'scholarships': {
    name: 'scholarships',
    displayName: 'Scholarships',
    description: 'Comprehensive scholarships page with programme overview, application info, FAQs, and scholars database',
    contentSchema: { type: 'object', properties: {} },
  },
  'infrastructure-projects': {
    name: 'infrastructure-projects',
    displayName: 'Infrastructure Projects',
    description: 'Template for showcasing infrastructure development projects',
    contentSchema: { type: 'object', properties: {} },
  },
  'impact': {
    name: 'impact',
    displayName: 'Impact',
    description: 'Template for displaying impact statistics, stories, and regional data',
    contentSchema: { type: 'object', properties: {} },
  },
  'faq': {
    name: 'faq',
    displayName: 'FAQ',
    description: 'Template for frequently asked questions with collapsible sections',
    contentSchema: { type: 'object', properties: {} },
  },
  'contact': {
    name: 'contact',
    displayName: 'Contact Page',
    description: 'Template for Contact pages with contact form, office locations, and social media links',
    contentSchema: {
      type: 'object',
      properties: {
        contactEmail: { type: 'string', format: 'email' },
        contactPhone: { type: 'string' },
        officeLocations: {
          type: 'array',
          description: 'Office/branch locations',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              address: { type: 'string' },
              phone: { type: 'string' },
              email: { type: 'string', format: 'email' },
              mapUrl: { type: 'string', format: 'url' },
            },
            required: ['name', 'address'],
          },
        },
        socialMedia: {
          type: 'object',
          properties: {
            facebook: { type: 'string', format: 'url' },
            twitter: { type: 'string', format: 'url' },
            linkedin: { type: 'string', format: 'url' },
            instagram: { type: 'string', format: 'url' },
          },
        },
      },
    },
  },
  'support-us': {
    name: 'support-us',
    displayName: 'Support Us',
    description: 'Template for Support Us page with hero, impact stats, ways to support, scholarship info, and donation CTAs',
    contentSchema: {
      type: 'object',
      properties: {
        heroTitle: { type: 'string', description: 'Hero section title' },
        heroSubtitle: { type: 'string', description: 'Hero section subtitle' },
        heroCtaText: { type: 'string', description: 'Hero CTA button text' },
        heroCtaLink: { type: 'string', format: 'url', description: 'Hero CTA button link' },
        impactTitle: { type: 'string', description: 'Impact stats section title' },
        impactSubtitle: { type: 'string', description: 'Impact stats subtitle' },
        stats: {
          type: 'array',
          description: 'Impact statistics',
          items: {
            type: 'object',
            properties: {
              number: { type: 'string' },
              label: { type: 'string' },
              icon: { type: 'string', enum: ['users', 'building', 'heart'] },
            },
            required: ['number', 'label'],
          },
        },
        actTitle: { type: 'string', description: 'GETFund Act section title' },
        actIntro: { type: 'string', description: 'GETFund Act introduction' },
        legalFoundationTitle: { type: 'string', description: 'Legal foundation subsection title' },
        legalFoundationText: { type: 'string', description: 'Legal foundation description' },
        fundingMechanismTitle: { type: 'string', description: 'Funding mechanism subsection title' },
        fundingMechanismText: { type: 'string', description: 'Funding mechanism description' },
        constitutionalMandate: { type: 'string', description: 'Constitutional mandate quote' },
        waysToSupportTitle: { type: 'string', description: 'Ways to support section title' },
        waysToSupportSubtitle: { type: 'string', description: 'Ways to support subtitle' },
        supportOptions: {
          type: 'array',
          description: 'Support options/methods',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              ctaText: { type: 'string' },
              ctaLink: { type: 'string', format: 'url' },
              icon: { type: 'string', enum: ['heart', 'building', 'users'] },
            },
            required: ['title', 'description'],
          },
        },
        scholarshipTitle: { type: 'string', description: 'Scholarship section title' },
        scholarshipSubtitle: { type: 'string', description: 'Scholarship section subtitle' },
        scholarshipTypes: {
          type: 'array',
          description: 'Types of scholarships',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
            },
            required: ['title', 'description'],
          },
        },
        scholarshipAmount: { type: 'string', description: 'Featured scholarship amount (e.g., GH₵ 5,000)' },
        scholarshipAmountText: { type: 'string', description: 'Text describing what the amount covers' },
        scholarshipCtaText: { type: 'string', description: 'Scholarship CTA button text' },
        scholarshipCtaLink: { type: 'string', format: 'url', description: 'Scholarship CTA link' },
        ctaTitle: { type: 'string', description: 'Final CTA section title' },
        ctaDescription: { type: 'string', description: 'Final CTA description' },
        ctaButtonText: { type: 'string', description: 'Primary CTA button text' },
        ctaButtonLink: { type: 'string', format: 'url', description: 'Primary CTA button link' },
        ctaSecondaryText: { type: 'string', description: 'Secondary CTA button text' },
        ctaSecondaryLink: { type: 'string', format: 'url', description: 'Secondary CTA button link' },
        contactEmail: { type: 'string', format: 'email', description: 'Contact email for donations' },
        contactPhone: { type: 'string', description: 'Contact phone for donations' },
      },
    },
  },
  'fundraising-campaigns': {
    name: 'fundraising-campaigns',
    displayName: 'Fundraising Campaigns',
    description: 'Template for fundraising campaigns page with featured campaigns and scholarship lottery',
    contentSchema: {
      type: 'object',
      properties: {
        heroTitle: { type: 'string', description: 'Hero section title' },
        heroSubtitle: { type: 'string', description: 'Hero section subtitle' },
        featuredCampaignsTitle: { type: 'string', description: 'Featured campaigns section title' },
        lotteryTitle: { type: 'string', description: 'Lottery section title' },
        lotterySubtitle: { type: 'string', description: 'Lottery section subtitle' },
      },
    },
  },
};

/**
 * Get a page template component by name
 */
export function getPageTemplate(templateName: string): React.ComponentType<any> | null {
  return pageTemplateRegistry[templateName] || null;
}

/**
 * Get all available page templates
 */
export function getAllPageTemplates(): PageTemplateMetadata[] {
  return Object.values(pageTemplateMetadata);
}

/**
 * Get metadata for a specific template
 */
export function getPageTemplateMetadata(templateName: string): PageTemplateMetadata | null {
  return pageTemplateMetadata[templateName] || null;
}
