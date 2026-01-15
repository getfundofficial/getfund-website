
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import News from '../components/News';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import VideoSection from '../components/VideoSection';
import { TestimonialsSection } from '../components/TestimonialCard';
import AnimatedCounter from '../components/AnimatedCounter';
import GhanaRegionalMap from '../components/GhanaRegionalMap';
import { cmsApi } from '../services/cmsApi';
import { Target, Eye, Heart } from 'lucide-react';

// Default regional data for the map
const DEFAULT_REGIONS = [
  { name: 'Ashanti', totalProjects: 748, basicEducation: 451, secondaryEducation: 281, tertiaryEducation: 12, modelSchools: 2, tvetCenters: 2 },
  { name: 'Eastern', totalProjects: 541, basicEducation: 301, secondaryEducation: 230, tertiaryEducation: 8, modelSchools: 1, tvetCenters: 1 },
  { name: 'Northern', totalProjects: 172, basicEducation: 101, secondaryEducation: 66, tertiaryEducation: 5, modelSchools: 0, tvetCenters: 0 },
  { name: 'Greater Accra', totalProjects: 77, basicEducation: 66, secondaryEducation: 1, tertiaryEducation: 0, modelSchools: 10, tvetCenters: 0 },
  { name: 'Upper East', totalProjects: 121, basicEducation: 68, secondaryEducation: 47, tertiaryEducation: 6, modelSchools: 0, tvetCenters: 0 },
  { name: 'Bono', totalProjects: 142, basicEducation: 73, secondaryEducation: 64, tertiaryEducation: 4, modelSchools: 1, tvetCenters: 0 },
  { name: 'Western', totalProjects: 110, basicEducation: 54, secondaryEducation: 55, tertiaryEducation: 1, modelSchools: 0, tvetCenters: 0 },
  { name: 'Ahafo', totalProjects: 102, basicEducation: 62, secondaryEducation: 34, tertiaryEducation: 5, modelSchools: 1, tvetCenters: 0 },
  { name: 'Central', totalProjects: 91, basicEducation: 91, secondaryEducation: 0, tertiaryEducation: 0, modelSchools: 0, tvetCenters: 0 },
  { name: 'Volta', totalProjects: 93, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 5, modelSchools: 0, tvetCenters: 0 },
  { name: 'Oti', totalProjects: 90, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 2, modelSchools: 0, tvetCenters: 0 },
  { name: 'Upper West', totalProjects: 86, basicEducation: 41, secondaryEducation: 41, tertiaryEducation: 4, modelSchools: 0, tvetCenters: 0 },
  { name: 'Bono East', totalProjects: 55, basicEducation: 23, secondaryEducation: 31, tertiaryEducation: 0, modelSchools: 1, tvetCenters: 0 },
  { name: 'Western North', totalProjects: 51, basicEducation: 24, secondaryEducation: 19, tertiaryEducation: 7, modelSchools: 1, tvetCenters: 0 },
  { name: 'North East', totalProjects: 50, basicEducation: 20, secondaryEducation: 27, tertiaryEducation: 2, modelSchools: 1, tvetCenters: 0 },
  { name: 'Savannah', totalProjects: 34, basicEducation: 13, secondaryEducation: 21, tertiaryEducation: 0, modelSchools: 0, tvetCenters: 0 },
];

interface VideoSection {
  url: string;
  provider: 'youtube' | 'vimeo' | 'upload';
  title?: string;
  subtitle?: string;
  thumbnail?: string;
}

interface SlideOverlay {
  tintColor?: string;
  tintColor2?: string;
  useGradient?: boolean;
  gradientDirection?: 'to right' | 'to bottom' | 'to bottom right' | 'to top right';
  tintOpacity?: number;
}

interface PageContent {
  newsTitle?: string;
  newsSubtitle?: string;
  heroSlides?: Array<{
    image: string;
    headline: string;
    description: string;
    ctaText?: string;
    ctaLink?: string;
    titleFontSize?: 'small' | 'medium' | 'large' | 'xlarge';
    subtitleFontSize?: 'small' | 'medium' | 'large' | 'xlarge';
    overlay?: SlideOverlay;
  }>;
  videoSection?: VideoSection;
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
  newsTitle: 'Latest News & Updates',
  newsSubtitle: 'Stay informed about our latest projects, events, and educational initiatives across Ghana',
  videoSection: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    provider: 'youtube',
    title: 'See Our Impact in Action',
    subtitle: 'Watch how GETFund is transforming education and building futures across Ghana'
  }
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
            // Handle page_content section type (HomePageEditor unified format)
            if (section.section_type === 'page_content' && section.content && section.is_active) {
              if (section.content.heroSlides) {
                content.heroSlides = section.content.heroSlides;
              }
              if (section.content.newsTitle) {
                content.newsTitle = section.content.newsTitle;
              }
              if (section.content.newsSubtitle) {
                content.newsSubtitle = section.content.newsSubtitle;
              }
              // Read video section from page_content
              if (section.content.videoSection) {
                content.videoSection = {
                  url: section.content.videoSection.url,
                  provider: section.content.videoSection.provider || 'youtube',
                  title: section.content.videoSection.title,
                  subtitle: section.content.videoSection.subtitle
                };
              }
            }
            // Handle separate hero_slides section (legacy format)
            else if (section.section_key === 'hero_slides' && section.content) {
              // Support both 'slides' (legacy) and 'heroSlides' (new HomePageEditor format)
              content.heroSlides = section.content.slides || section.content.heroSlides;
            } else if (section.section_key === 'news_updates' && section.content) {
              content.newsTitle = section.content.newsTitle;
              content.newsSubtitle = section.content.newsSubtitle;
            } else if (section.section_type === 'video' && section.content && section.is_active) {
              content.videoSection = {
                url: section.content.url,
                provider: section.content.provider || 'youtube',
                title: section.content.title,
                subtitle: section.content.subtitle,
                thumbnail: section.content.thumbnail
              };
            }
          });

          setPageContent(content);
        }
      } catch {
        // Use default content if CMS fails
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
          title={pageContent?.videoSection?.title}
          subtitle={pageContent?.videoSection?.subtitle}
          videoUrl={pageContent?.videoSection?.url}
          provider={pageContent?.videoSection?.provider}
          thumbnailUrl={pageContent?.videoSection?.thumbnail}
        />

        {/* Regional Impact Map Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Our Regional Impact
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore how GETFund is transforming education across all 16 regions of Ghana
              </p>
            </div>

            <GhanaRegionalMap regions={DEFAULT_REGIONS} />
          </div>
        </section>

        {/* Empowering Ghana Section with Parallax Background */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          {/* Parallax Background - bg-fixed for desktop, bg-scroll for mobile (iOS doesn't support fixed) */}
          <div
            className="absolute inset-0 bg-scroll md:bg-fixed bg-center bg-cover"
            style={{ backgroundImage: "url('/images/hero/main-slider-1.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Empowering Ghana Through Education
              </h2>
              <p className="text-lg text-white/80">
                The Ghana Education Trust Fund (GETFund) is a statutory body established to provide financial resources for educational development. Since our inception in 2000, we have remained committed to supplementing government efforts in providing educational infrastructure and facilities at all levels.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  <AnimatedCounter end={5000} suffix="+" duration={2500} />
                </div>
                <p className="font-semibold text-white">Scholarships Awarded</p>
                <p className="text-sm text-white/70">Supporting talented students</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  <AnimatedCounter end={200} suffix="+" duration={2000} />
                </div>
                <p className="font-semibold text-white">Schools Built</p>
                <p className="text-sm text-white/70">Across all regions</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                  <AnimatedCounter end={1000} suffix="+" duration={2200} />
                </div>
                <p className="font-semibold text-white">Infrastructure Projects</p>
                <p className="text-sm text-white/70">Completed nationwide</p>
              </div>
            </div>

            {/* Mission, Vision, Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-white/80">
                  To mobilize and manage financial resources for the provision and expansion of educational infrastructure at all levels of education in Ghana
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-white/80">
                  To be a leading education trust fund in Africa, ensuring quality and accessible education for all Ghanaians
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Core Values</h3>
                <p className="text-white/80">
                  Integrity, transparency, excellence, and commitment to transforming lives through education
                </p>
              </div>
            </div>
          </div>
        </section>

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