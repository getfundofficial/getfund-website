import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Programs from '../components/Programs';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';


interface PageContent {
  bannerBackground?: BannerBackground;
  servicesTitle?: string;
  servicesSubtitle?: string;
  services?: Array<{ title: string; description: string; link: string }>;
  impactStats?: Array<{ number: string; label: string; description: string }>;
  keyInitiatives?: Array<{
    title: string;
    description: string;
    icon: string;
    features?: string[];
  }>;
}

export default function WhatWeDo() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWhatWeDoContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('what-we-do');
        
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
        console.error('Failed to fetch what-we-do content from CMS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhatWeDoContent();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1">
        <PageBanner
          title={pageContent?.servicesTitle || 'What We Do'}
          subtitle={pageContent?.servicesSubtitle || 'GETFund is committed to transforming education in Ghana through strategic investments and key initiatives.'}
          bannerBackground={pageContent?.bannerBackground}
        />

        {/* Programs Section */}
        <Programs 
          programs={pageContent?.services}
          stats={pageContent?.impactStats}
          showTitle={false}
        />
      </main>
      <Footer />
    </div>
  );
}
