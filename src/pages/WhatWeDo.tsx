import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Programs from '../components/Programs';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

interface FocusAreaImage {
  image: string;
  title: string;
  description?: string;
}

interface PageContent {
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
  focusAreaImages?: FocusAreaImage[];
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
        {/* Page Title Section — asymmetric with focus circles */}
        <section className="bg-white pt-16 md:pt-24 pb-12 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <span className="text-eyebrow">What We Do</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-getfund-secondary mt-4 leading-[1.05]" style={{ letterSpacing: '-0.035em' }}>
                  {pageContent?.servicesTitle || 'What We Do'}
                </h1>
                <p className="text-base md:text-lg text-gray-600 mt-6 leading-relaxed max-w-xl">
                  {pageContent?.servicesSubtitle || 'GETFund is committed to transforming education in Ghana through strategic investments in infrastructure, scholarships, and capacity building programs that benefit students at all levels.'}
                </p>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <div className="flex flex-wrap justify-start md:justify-end gap-4 md:gap-5 lg:gap-6">
                  {[
                    'Educational Infrastructure Support',
                    'Ministry of Education & Agencies Financial Support',
                    'Government Policy & Programme Support',
                    'Scholar & capacity Building Programmes',
                    'Others'
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="w-24 sm:w-28 md:w-28 lg:w-32 xl:w-36 aspect-square bg-getfund-dark flex items-center justify-center shadow-lg p-3"
                      style={{ borderRadius: '50%' }}
                    >
                      <span className="text-white text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-bold text-center leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section with Key Initiatives */}
        <Programs showTitle={false} hideFocusCircles focusAreaImages={pageContent?.focusAreaImages} />
      </main>
      <Footer />
    </div>
  );
}
