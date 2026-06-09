
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AchievementsSection from '../components/AchievementsSection';
import News from '../components/News';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import { TestimonialsSection } from '../components/TestimonialCard';
import AnimatedCounter from '../components/AnimatedCounter';
import { cmsApi } from '../services/cmsApi';

interface SlideOverlay {
  tintColor?: string;
  tintColor2?: string;
  useGradient?: boolean;
  gradientDirection?: 'to right' | 'to bottom' | 'to bottom right' | 'to top right';
  tintOpacity?: number;
}

interface AchievementCircle {
  title: string;
  value: string;
}

interface AchievementCategory {
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface ImpactStat {
  number: number;
  suffix?: string;
  label: string;
  description?: string;
}

interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  location?: string;
  authorImage?: string;
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
    mediaType?: 'image' | 'video';
    videoUrl?: string; // YouTube, Vimeo, or direct video URL
    loop?: boolean; // Whether the video loops continuously (defaults to true)
  }>;
  // Achievements section
  achievementsTitle?: string;
  achievementsSubtitle?: string;
  achievementCircles?: AchievementCircle[];
  achievementCategories?: AchievementCategory[];
  // Stats Section (Empowering Ghana) - CMS editable from Home page editor
  statsTitle?: string;
  statsDescription?: string;
  statsBackgroundImage?: string;
  impactStats?: ImpactStat[];
  // Testimonials Section - CMS editable from Home page editor
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  testimonials?: Testimonial[];
}

// Default content when CMS is not available
const defaultContent: PageContent = {
  heroSlides: [
    {
      image: '/images/hero/main-slider-3.jpg', // Fallback image while video loads
      headline: 'Every Ghanaian Child Deserves the Opportunity to be Educated',
      description: 'Supporting the delivery of quality education to Ghanaians from basic to tertiary level',
      ctaText: 'Apply for Scholarship',
      ctaLink: '/scholarship-apply',
      // To use a video, add these two fields:
      // mediaType: 'video',
      // videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
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
};

export default function Home() {
  const [pageContent, setPageContent] = useState<PageContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const content: PageContent = { ...defaultContent };

        // Fetch home page content
        const homeResponse = await cmsApi.getPageBySlug('home');

        if (homeResponse && homeResponse.sections) {
          homeResponse.sections.forEach((section: any) => {
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
              // Achievements section
              if (section.content.achievementsTitle) {
                content.achievementsTitle = section.content.achievementsTitle;
              }
              if (section.content.achievementsSubtitle) {
                content.achievementsSubtitle = section.content.achievementsSubtitle;
              }
              if (section.content.achievementCircles) {
                content.achievementCircles = section.content.achievementCircles;
              }
              if (section.content.achievementCategories) {
                content.achievementCategories = section.content.achievementCategories;
              }
              // Stats section
              if (section.content.statsTitle) {
                content.statsTitle = section.content.statsTitle;
              }
              if (section.content.statsDescription) {
                content.statsDescription = section.content.statsDescription;
              }
              if (section.content.statsBackgroundImage) {
                content.statsBackgroundImage = section.content.statsBackgroundImage;
              }
              if (section.content.impactStats) {
                content.impactStats = section.content.impactStats;
              }
              // Testimonials section
              if (section.content.testimonialsTitle) {
                content.testimonialsTitle = section.content.testimonialsTitle;
              }
              if (section.content.testimonialsSubtitle) {
                content.testimonialsSubtitle = section.content.testimonialsSubtitle;
              }
              if (section.content.testimonials) {
                content.testimonials = section.content.testimonials;
              }
            }
            // Handle separate hero_slides section (legacy format)
            else if (section.section_key === 'hero_slides' && section.content) {
              // Support both 'slides' (legacy) and 'heroSlides' (new HomePageEditor format)
              content.heroSlides = section.content.slides || section.content.heroSlides;
            } else if (section.section_key === 'news_updates' && section.content) {
              content.newsTitle = section.content.newsTitle;
              content.newsSubtitle = section.content.newsSubtitle;
            }
          });
        }

        setPageContent(content);
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
  const defaultTestimonials = [
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

  // Use CMS testimonials if available, otherwise use defaults
  const testimonials = pageContent?.testimonials && pageContent.testimonials.length > 0
    ? pageContent.testimonials
    : defaultTestimonials;

  // Default impact stats
  const defaultImpactStats: ImpactStat[] = [
    { number: 5000, suffix: '+', label: 'Scholarships Awarded', description: 'Supporting talented students' },
    { number: 2000, suffix: '+', label: 'Schools Built', description: 'Across all regions' },
    { number: 1000, suffix: '+', label: 'Infrastructure Projects', description: 'Completed nationwide' }
  ];

  // Use CMS impact stats if available, otherwise use defaults
  const impactStats = pageContent?.impactStats && pageContent.impactStats.length > 0
    ? pageContent.impactStats
    : defaultImpactStats;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero slides={pageContent?.heroSlides} />

        {/* What GETFund Has Done Section */}
        <AchievementsSection
          sectionTitle={pageContent?.achievementsTitle}
          sectionSubtitle={pageContent?.achievementsSubtitle}
          circles={pageContent?.achievementCircles}
          categories={pageContent?.achievementCategories}
        />

        {/* Empowering Ghana — parallax impact section */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          {/* Parallax background — fixed on desktop, scroll on mobile (iOS doesn't support fixed) */}
          <div
            className="absolute inset-0 bg-scroll md:bg-fixed bg-center bg-cover"
            style={{ backgroundImage: `url('${pageContent?.statsBackgroundImage || '/images/hero/main-slider-1.jpg'}')` }}
          />
          {/* Layered modern overlay — dark base + brand green wash */}
          <div className="absolute inset-0 bg-getfund-secondary/80" />
          <div className="absolute inset-0 bg-gradient-to-br from-getfund-primary/30 via-transparent to-transparent" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14 md:mb-20">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-getfund-gold">Our Impact</span>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-white mt-5 mb-6 leading-[1.05]" style={{ letterSpacing: '-0.035em' }}>
                {pageContent?.statsTitle || 'Empowering Ghana through education.'}
              </h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                {pageContent?.statsDescription || 'The Ghana Education Trust Fund is a statutory body established to provide financial resources for educational development. Since 2000, we have supplemented government efforts in providing educational infrastructure and facilities at all levels.'}
              </p>
            </div>

            {/* Stats — hairline divider grid on glass */}
            <div className={`grid ${impactStats.length === 4 ? 'grid-cols-2 md:grid-cols-4' : impactStats.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'} divide-y sm:divide-y-0 sm:divide-x divide-white/15 border-y border-white/15`}>
              {impactStats.map((stat, index) => (
                <div key={index} className="py-8 md:py-10 px-2 sm:px-6">
                  <div className="font-display text-4xl md:text-6xl font-semibold text-getfund-gold mb-3" style={{ letterSpacing: '-0.04em' }}>
                    <AnimatedCounter end={stat.number} suffix={stat.suffix || ''} duration={2000 + index * 200} />
                  </div>
                  <p className="text-xs md:text-sm font-semibold uppercase text-white" style={{ letterSpacing: '0.12em' }}>{stat.label}</p>
                  {stat.description && (
                    <p className="text-sm text-white/60 mt-2 hidden sm:block">{stat.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection
          title={pageContent?.testimonialsTitle || "What Our Beneficiaries Say"}
          subtitle={pageContent?.testimonialsSubtitle || "Hear from students and communities whose lives have been transformed through GETFund support"}
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