
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import News from '../components/News';
import About from '../components/About';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import VideoSection from '../components/VideoSection';
import { StatsBackgroundSection } from '../components/BackgroundSection';
import AnimatedCounter from '../components/AnimatedCounter';
import { TestimonialsSection } from '../components/TestimonialCard';
import ImageTextSection from '../components/ImageTextSection';
import { cmsApi } from '../services/cmsApi';
import { GraduationCap, Building2, Briefcase } from 'lucide-react';

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

// Default content when CMS is not available
const defaultContent: PageContent = {
  heroSlides: [
    {
      image: '/images/hero/main-slider-3.jpg',
      headline: 'Every Ghanaian Child Deserves the Opportunity to be Educated',
      description: 'Supporting the delivery of quality education to Ghanaians from basic to tertiary level',
      ctaText: 'Apply for Scholarship',
      ctaLink: '/scholarship-apply'
    },
    {
      image: '/images/hero/main-slider-1.jpg',
      headline: 'Transforming Schools Across Ghana',
      description: 'GETFund builds and renovates classrooms, science labs, and libraries for a brighter future.',
    },
    {
      image: '/images/scholarship/GETFund-Projects-02-768x436.jpg',
      headline: 'Investing in Educational Infrastructure',
      description: 'Modern facilities and safe learning environments for all students.',
    },
    {
      image: '/images/scholarship/OME1079.jpg',
      headline: 'Empowering Students Through Scholarships',
      description: 'Financial support for talented Ghanaians to pursue higher education.',
    },
    {
      image: '/images/infrastructure/school-building.jpg',
      headline: 'Building the Future of Ghana',
      description: 'GETFund is committed to sustainable growth in the education sector.',
    }
  ],
  vision: {
    title: 'Our Vision',
    description: 'To be a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians'
  },
  mission: {
    title: 'Our Mission',
    description: 'To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana'
  },
  coreValues: {
    title: 'Core Values',
    description: 'Integrity, transparency, excellence, and commitment to transforming lives through education'
  },
  aboutTitle: 'Empowering Ghana Through Education',
  aboutSubtitle: 'Building Brighter Futures',
  aboutDescription: 'The Ghana Education Trust Fund (GETFund) is a statutory body established to provide financial resources for educational development. Since our inception in 2000, we have remained committed to supplementing government efforts in providing educational infrastructure and facilities at all levels.',
  aboutStats: [
    { number: '5000+', label: 'Scholarships Awarded', description: 'Supporting talented students' },
    { number: '200+', label: 'Schools Built', description: 'Across all regions' },
    { number: '1000+', label: 'Infrastructure Projects', description: 'Completed nationwide' }
  ],
  aboutImage: '/images/about/getfund-7th-board-inauguration.jpg',
  aboutImageAlt: 'GETFund Office Building',
  ctaText: 'Learn More About Us',
  ctaLink: '/who-we-are',
  aboutGETFundHeading: 'About GETFund',
  aboutGETFundContent: ['The Ghana Education Trust Fund (GETFund) is a statutory body established to provide financial resources for educational development.'],
  relevantFactors: [
    'Established by Act 581 in 2000',
    'Funded through a 2.5% VAT levy',
    'Supports all levels of education',
    'Provides scholarships and infrastructure'
  ],
  newsTitle: 'Latest News & Updates',
  newsSubtitle: 'Stay informed about our latest projects, events, and educational initiatives across Ghana'
};

export default function Home() {
  const [pageContent, setPageContent] = useState<PageContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('home');

        if (response && response.sections) {
          const content: PageContent = { ...defaultContent };

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
        console.error('Failed to fetch home content from CMS, using defaults:', error);
        // Keep using default content
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  // Default testimonials data
  const testimonials = [
    {
      quote: "GETFund scholarship changed my life. I was able to complete my medical degree and now I'm serving my community as a doctor.",
      authorName: "Dr. Ama Mensah",
      authorRole: "GETFund Scholarship Beneficiary",
      location: "Kumasi, Ghana",
      authorImage: "/images/scholarship/OME1079.jpg"
    },
    {
      quote: "Our school was transformed with new classrooms and a modern science laboratory. Our students now have the facilities they need to excel.",
      authorName: "Mr. Kofi Asante",
      authorRole: "School Headmaster",
      location: "Northern Region",
      authorImage: "/images/about/getfund-7th-board-inauguration.jpg"
    },
    {
      quote: "Thanks to GETFund's infrastructure projects, our community now has access to quality education. The new school building has given our children hope.",
      authorName: "Madam Efua Darko",
      authorRole: "Community Leader",
      location: "Western Region",
      authorImage: "/images/hero/main-slider-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero slides={pageContent?.heroSlides} />

        {/* Video Section */}
        <VideoSection
          title="See Our Impact in Action"
          subtitle="Watch how GETFund is transforming education and building futures across Ghana"
          videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          provider="youtube"
        />

        {/* Image-Text Section for About */}
        <ImageTextSection
          title="Empowering Ghana Through Education"
          description={
            <>
              <p>The Ghana Education Trust Fund (GETFund) is a statutory body established by Act 581 in 2000 to provide financial resources for educational development across Ghana.</p>
              <p>We are committed to supplementing government efforts in providing educational infrastructure and facilities at all levels, from basic education to tertiary institutions.</p>
            </>
          }
          imageUrl="/images/about/getfund-7th-board-inauguration.jpg"
          imageAlt="GETFund Board Inauguration"
          ctaText="Learn More About Us"
          ctaLink="/who-we-are"
          className="bg-white"
        />

        {/* Animated Stats Section with Background Image */}
        <StatsBackgroundSection backgroundImage="/images/hero/main-slider-1.jpg">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
              Transforming education across Ghana through strategic investments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={5000} suffix="+" duration={2500} />
              </div>
              <p className="text-white/90 font-medium text-lg">Scholarships Awarded</p>
              <p className="text-white/70 text-sm mt-1">Supporting talented students nationwide</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={200} suffix="+" duration={2000} />
              </div>
              <p className="text-white/90 font-medium text-lg">Schools Built</p>
              <p className="text-white/70 text-sm mt-1">Modern facilities across all regions</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedCounter end={1000} suffix="+" duration={2200} />
              </div>
              <p className="text-white/90 font-medium text-lg">Infrastructure Projects</p>
              <p className="text-white/70 text-sm mt-1">Completed nationwide</p>
            </div>
          </div>
        </StatsBackgroundSection>

        {/* Original About Section with Vision/Mission */}
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

        {/* Testimonials Section */}
        <TestimonialsSection
          title="What Our Beneficiaries Say"
          subtitle="Hear from students and communities whose lives have been transformed through GETFund support"
          testimonials={testimonials}
          variant="grid"
        />

        {/* News Section */}
        <News
          title={pageContent?.newsTitle}
          subtitle={pageContent?.newsSubtitle}
        />
      </main>
      <Footer />
    </div>
  );
}