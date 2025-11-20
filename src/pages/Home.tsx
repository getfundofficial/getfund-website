
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import News from '../components/News';
import About from '../components/About';
import Footer from '../components/Footer';
import { cmsApi } from '../services/cmsApi';

interface PageContent {
  vision: { title: string; description: string };
  mission: { title: string; description: string };
  services: Array<{ title: string; description: string; link: string }>;
  newsTitle: string;
  newsSubtitle: string;
  coreValues: { title: string; description: string };
  heroSlides: Array<{ image: string; headline: string; description: string; ctaText?: string; ctaLink?: string }>;
  impactStats: Array<{ number: string; label: string; description: string }>;
  aboutHeading: string;
  aboutSubheading: string;
  servicesTitle: string;
  aboutGETFundHeading: string;
  aboutGETFundContent: string[];
  relevantFactors: string[];
}

export default function Home() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('home');
        
        // Find the page_content section
        if (response) {
          const contentSection = response.sections?.find(
            (section: any) => section.section_type === 'page_content'
          );
          
          if (contentSection?.content) {
            setPageContent(contentSection.content);
          }
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
          aboutHeading: pageContent.aboutHeading,
          aboutSubheading: pageContent.aboutSubheading,
          mission: pageContent.mission,
          vision: pageContent.vision,
          coreValues: pageContent.coreValues,
          aboutGETFundHeading: pageContent.aboutGETFundHeading,
          aboutGETFundContent: pageContent.aboutGETFundContent,
          relevantFactors: pageContent.relevantFactors
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