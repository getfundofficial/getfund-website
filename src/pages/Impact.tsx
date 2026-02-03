import { useEffect, useState } from 'react';
import { TrendingUp, Users, Building, Award, BookOpen, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import OptimizedImage from '../components/OptimizedImage';
import GhanaRegionalMap from '../components/GhanaRegionalMap';
import AnimatedCounter from '../components/AnimatedCounter';
import { cmsApi } from '../services/cmsApi';
import { REGIONS_DATA } from '../data/regional-data';

// New visualization components
import { PortfolioTimeline, CompletionDonut, CompletionStackedBars, ChartLegend, SectorProgressGrid, SectorTabs } from '../components/visualizations';
import SectorGauges from '../components/visualizations/SectorGauges';
import SectorProgressBars from '../components/visualizations/SectorProgressBars';
import SectorRadialBars from '../components/visualizations/SectorRadialBars';
import SectorWaffleCharts from '../components/visualizations/SectorWaffleCharts';
import SectorStatCards from '../components/visualizations/SectorStatCards';
import SectorVerticalBars from '../components/visualizations/SectorVerticalBars';
import CompletionVerticalChart from '../components/visualizations/CompletionVerticalChart';
import { DONUT_CHART_DATA, SECTOR_COMPLETION_DATA, COMPLETION_COLORS } from '../data/completionData';

interface StatItem {
  number: string;
  label: string;
  description: string;
  icon?: string;
}

interface Achievement {
  year: string;
  title: string;
  description: string;
}

interface ProjectCategory {
  category: string;
  count: number;
  description: string;
  image?: string;
}

interface ResourceDistribution {
  type: string;
  count: number;
  period: string;
  image?: string;
}

interface ScholarshipCategory {
  title: string;
  description: string;
}

interface PageContent {
  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;

  // Video Section
  videoSection?: {
    url: string;
    provider: 'youtube' | 'vimeo' | 'upload';
    title?: string;
    subtitle?: string;
    thumbnail?: string;
  };

  // Impact Statistics
  statsTitle?: string;
  statsSubtitle?: string;
  stats?: StatItem[];

  // Project Portfolio
  portfolioTitle?: string;
  portfolioSubtitle?: string;
  projectCategories?: ProjectCategory[];

  // Resources Distributed
  resourcesTitle?: string;
  resourcesSubtitle?: string;
  resources?: ResourceDistribution[];

  // Scholarship Program
  scholarshipTitle?: string;
  scholarshipSubtitle?: string;
  totalScholars?: string;
  scholarshipGrowth?: {
    from: { year: string; count: number };
    to: { year: string; count: number };
  };
  percentToPublicUniversities?: string;
  scholarshipCategories?: ScholarshipCategory[];
  reforms?: string[];
  universityLogos?: string[];
  scholarshipImages?: string[];

  // Achievements Timeline
  achievementsTitle?: string;
  achievementsSubtitle?: string;
  achievements?: Achievement[];

  // Regional Impact
  regionalTitle?: string;
  regionalSubtitle?: string;
  regionalDescription?: string;
  regionalMap?: string;
  regions?: Array<{
    name: string;
    totalProjects: number;
    basicEducation?: number;
    secondaryEducation?: number;
    tertiaryEducation?: number;
    modelSchools?: number;
    tvetCenters?: number;
  }>;

  // Call to Action
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export default function Impact() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await cmsApi.getPageBySlug('impact');

        if (response && response.sections) {
          // Look for page_content section first
          const pageContentSection = response.sections.find((s: any) => s.section_type === 'page_content');

          if (pageContentSection && pageContentSection.content) {
            // Use page_content section directly
            setPageContent(pageContentSection.content as PageContent);
          } else {
            // Fallback: Map individual sections (legacy support)
            const content: PageContent = {};

            response.sections.forEach((section: any) => {
              if (section.section_key === 'hero' && section.content) {
                content.heroTitle = section.content.title;
                content.heroSubtitle = section.content.subtitle;
              } else if (section.section_key === 'impact_statistics' && section.content) {
                content.statsTitle = section.content.title;
                content.statsSubtitle = section.content.subtitle;
                content.stats = section.content.stats;
              } else if (section.section_key === 'project_portfolio' && section.content) {
                content.portfolioTitle = section.content.title;
                content.portfolioSubtitle = section.content.subtitle;
                content.projectCategories = section.content.projectCategories;
              } else if (section.section_key === 'resources_distributed' && section.content) {
                content.resourcesTitle = section.content.title;
                content.resourcesSubtitle = section.content.subtitle;
                content.resources = section.content.resources;
              } else if (section.section_key === 'scholarship_program' && section.content) {
                content.scholarshipTitle = section.content.title;
                content.scholarshipSubtitle = section.content.subtitle;
                content.totalScholars = section.content.totalScholars;
                content.scholarshipGrowth = section.content.scholarshipGrowth;
                content.percentToPublicUniversities = section.content.percentToPublicUniversities;
                content.scholarshipCategories = section.content.scholarshipCategories;
                content.reforms = section.content.reforms;
                content.universityLogos = section.content.universityLogos;
                content.scholarshipImages = section.content.scholarshipImages;
              } else if (section.section_key === 'achievements' && section.content) {
                content.achievementsTitle = section.content.title;
                content.achievementsSubtitle = section.content.subtitle;
                content.achievements = section.content.achievements;
              } else if (section.section_key === 'regional_impact' && section.content) {
                content.regionalTitle = section.content.title;
                content.regionalSubtitle = section.content.subtitle;
                content.regionalDescription = section.content.description;
                content.regionalMap = section.content.regionalMap;
                content.regions = section.content.regions;
              } else if (section.section_key === 'cta' && section.content) {
                content.ctaTitle = section.content.title;
                content.ctaDescription = section.content.description;
                content.ctaButtonText = section.content.buttonText;
                content.ctaButtonLink = section.content.buttonLink;
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
        }
      } catch (error) {
        console.error('Failed to fetch impact content from CMS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const getIconComponent = (iconName?: string) => {
    const icons: { [key: string]: any } = {
      'trending-up': TrendingUp,
      'users': Users,
      'building': Building,
      'award': Award,
      'book-open': BookOpen,
      'graduation-cap': GraduationCap
    };
    const Icon = icons[iconName || 'trending-up'] || TrendingUp;
    return <Icon className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1">
        {/* Page Title Section */}
        <section className="bg-white pt-8 pb-4">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {pageContent?.heroTitle || 'Our Work & Impact'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
            <p className="text-gray-600 mt-3 max-w-3xl">
              {pageContent?.heroSubtitle || 'Transforming lives and communities through quality education across Ghana'}
            </p>
          </div>
        </section>

        {/* Overview Statistics */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Impact at a Glance
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Key metrics showcasing our commitment to educational excellence
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-getfund-primary text-white p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  <AnimatedCounter end={11488} duration={1500} />
                </div>
                <div className="text-sm font-semibold opacity-90">Total Projects</div>
                <p className="text-xs opacity-75 mt-1">Since 2001</p>
              </div>
              <div className="bg-blue-50 p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#059669' }}>
                  <AnimatedCounter end={8553} duration={1500} />
                </div>
                <div className="text-sm font-semibold text-gray-900">Completed</div>
                <p className="text-xs text-gray-500 mt-1">100% finished</p>
              </div>
              <div className="bg-blue-50 p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#f59e0b' }}>
                  <AnimatedCounter end={2935} duration={1500} />
                </div>
                <div className="text-sm font-semibold text-gray-900">Ongoing</div>
                <p className="text-xs text-gray-500 mt-1">In progress</p>
              </div>
              <div className="bg-blue-50 p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#2a3f75' }}>
                  <AnimatedCounter end={16} duration={1500} />
                </div>
                <div className="text-sm font-semibold text-gray-900">Regions</div>
                <p className="text-xs text-gray-500 mt-1">Nationwide</p>
              </div>
              <div className="bg-blue-50 p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#2a3f75' }}>
                  <AnimatedCounter end={5} duration={1500} />
                </div>
                <div className="text-sm font-semibold text-gray-900">Sectors</div>
                <p className="text-xs text-gray-500 mt-1">Education levels</p>
              </div>
              <div className="bg-blue-50 p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#2a3f75' }}>
                  <AnimatedCounter end={24} duration={1500} suffix="+" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Years</div>
                <p className="text-xs text-gray-500 mt-1">Of impact</p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Portfolio Timeline - NEW */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                GETFund Projects Portfolio
              </h2>
              <p className="text-gray-600 max-w-2xl">
                8 major programmes spanning over 24 years of educational infrastructure development
              </p>
            </div>

            <PortfolioTimeline showDescription />
          </div>
        </section>

        {/* Sector Analysis Tabs - Combines Completion, Regional, Performance, and Scholarships */}
        <SectorTabs
          scholarshipTitle={pageContent?.scholarshipTitle}
          scholarshipSubtitle={pageContent?.scholarshipSubtitle}
          totalScholars={pageContent?.totalScholars}
          scholarshipGrowth={pageContent?.scholarshipGrowth}
          scholarshipCategories={pageContent?.scholarshipCategories}
          reforms={pageContent?.reforms}
          universityLogos={pageContent?.universityLogos}
        />

        {/* Achievements Timeline */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {pageContent?.achievementsTitle || 'Key Achievements'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {pageContent?.achievementsSubtitle || 'Milestones in our journey to transform education in Ghana'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {(pageContent?.achievements || [
                { year: '2000', title: 'GETFund Established', description: 'Founded by Act of Parliament' },
                { year: '2010', title: 'International Scholarships', description: 'Postgraduate program launched' },
                { year: '2020', title: 'Digital Infrastructure', description: 'E-learning support deployed' },
                { year: '2024', title: '11,488 Projects', description: 'Across all 16 regions' }
              ]).map((achievement, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border-t-3" style={{ borderTopWidth: '3px', borderTopColor: '#2a3f75' }}>
                  <span className="inline-block text-white text-xs font-bold px-2 py-1 rounded mb-2" style={{ backgroundColor: '#2a3f75' }}>
                    {achievement.year}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{achievement.title}</h3>
                  <p className="text-gray-500 text-xs">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10 text-white" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {pageContent?.ctaTitle || 'Be Part of Our Impact Story'}
              </h2>
              <p className="text-white/80 mb-4">
                {pageContent?.ctaDescription || 'Join us in transforming education and creating opportunities'}
              </p>
              <a
                href={pageContent?.ctaButtonLink || '/support-us'}
                className="inline-block bg-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                style={{ color: '#1e3a5f' }}
              >
                {pageContent?.ctaButtonText || 'Support Our Mission'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
