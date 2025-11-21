
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import News from '../components/News';
import About from '../components/About';
import Footer from '../components/Footer';
import { cmsApi } from '../services/cmsApi';

interface PageContent {
  vision?: { title: string; description: string };
  mission?: { title: string; description: string };
  newsTitle?: string;
  newsSubtitle?: string;
  coreValues?: { title: string; description: string };
  heroSlides?: Array<{ image: string; headline: string; description: string; ctaText?: string; ctaLink?: string }>;
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutDescription?: string;
  aboutStats?: Array<{ number: string; label: string; description: string }>;
  aboutImage?: string;
  aboutImageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  aboutHeading?: string;
  aboutSubheading?: string;
  aboutGETFundHeading?: string;
  aboutGETFundContent?: string[];
  relevantFactors?: string[];
}

export default function Home() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('home');
        
        if (response && response.sections) {
          const content: PageContent = {};
          
          response.sections.forEach((section: any) => {
            if (section.section_key === 'hero_slides' && section.content) {
              content.heroSlides = section.content.slides;
            } else if (section.section_key === 'about_getfund' && section.content) {
              content.aboutTitle = section.content.aboutTitle;
              content.aboutSubtitle = section.content.aboutSubtitle;
              content.aboutDescription = section.content.aboutDescription;
              content.aboutStats = section.content.aboutStats;
              content.aboutImage = section.content.aboutImage;
              content.aboutImageAlt = section.content.aboutImageAlt;
              content.aboutGETFundHeading = section.content.aboutGETFundHeading;
              content.relevantFactors = section.content.relevantFactors;
              content.ctaText = section.content.ctaText;
              content.ctaLink = section.content.ctaLink;
              // Map to old structure for About component
              content.aboutHeading = section.content.aboutTitle;
              content.aboutSubheading = section.content.aboutSubtitle;
              content.aboutGETFundContent = [section.content.aboutDescription];
            } else if (section.section_key === 'vision_mission' && section.content) {
              content.vision = section.content.vision;
              content.mission = section.content.mission;
              content.coreValues = section.content.coreValues;
            } else if (section.section_key === 'news_updates' && section.content) {
              content.newsTitle = section.content.newsTitle;
              content.newsSubtitle = section.content.newsSubtitle;
            }
          });
          
          setPageContent(content);
        }
      } catch (error) {
        console.error('Failed to fetch home content from CMS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-getfund-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero slides={pageContent?.heroSlides} />
        <About content={pageContent ? {
          aboutHeading: pageContent.aboutTitle || pageContent.aboutHeading || 'Empowering Ghana Through Education',
          aboutSubheading: pageContent.aboutSubtitle || pageContent.aboutSubheading || 'Building Brighter Futures',
          aboutDescription: pageContent.aboutDescription,
          aboutStats: pageContent.aboutStats,
          aboutImage: pageContent.aboutImage,
          aboutImageAlt: pageContent.aboutImageAlt,
          ctaText: pageContent.ctaText,
          ctaLink: pageContent.ctaLink,
          mission: pageContent.mission || { title: 'Our Mission', description: '' },
          vision: pageContent.vision || { title: 'Our Vision', description: '' },
          coreValues: pageContent.coreValues || { title: 'Core Values', description: '' },
          aboutGETFundHeading: pageContent.aboutGETFundHeading || 'About GETFund',
          aboutGETFundContent: pageContent.aboutGETFundContent || [],
          relevantFactors: pageContent.relevantFactors || []
        } : undefined} />
        <News 
          title={pageContent?.newsTitle}
          subtitle={pageContent?.newsSubtitle}
        />
      </main>
      <Footer />
    </div>
  );
}