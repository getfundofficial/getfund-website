import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Building, Award, BookOpen, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
import GhanaRegionalMap from '../components/GhanaRegionalMap';
import { cmsApi } from '../services/cmsApi';

interface StatItem {
  number: string;
  label: string;
  description: string;
  icon?: string;
}

interface ImpactStory {
  id: string;
  name: string;
  story: string;
  image: string;
  category: string;
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
  bannerBackground?: BannerBackground;

  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;

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

  // Impact Stories
  storiesTitle?: string;
  storiesSubtitle?: string;
  stories?: ImpactStory[];

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
              } else if (section.section_key === 'impact_stories' && section.content) {
                content.storiesTitle = section.content.title;
                content.storiesSubtitle = section.content.subtitle;
                content.stories = section.content.stories;
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
        <PageBanner
          title={pageContent?.heroTitle || 'Our Impact'}
          subtitle={pageContent?.heroSubtitle || 'Transforming lives and communities through quality education across Ghana'}
          bannerBackground={pageContent?.bannerBackground || {
            imageUrl: '/images/scholarship/OME1079.jpg',
            tintColor: '#DC143C',
            tintColor2: '#059669',
            useGradient: true,
            tintOpacity: 70,
            gradientDirection: 'to right'
          }}
        />

        {/* Impact Statistics */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.statsTitle || 'Our Impact in Numbers'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.statsSubtitle || 'Measurable results that showcase our commitment to educational excellence'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(pageContent?.stats || [
                { number: '11,248', label: 'Total Projects', description: 'Since inception', icon: 'building' },
                { number: '16,000+', label: 'Scholars Supported', description: 'Local and foreign institutions', icon: 'graduation-cap' },
                { number: '2,749+', label: 'Recent Projects', description: 'Since 2017', icon: 'trending-up' },
                { number: '16', label: 'Regions Covered', description: 'Nationwide impact', icon: 'award' },
                { number: '5,026', label: 'Scholarships (2023/24)', description: 'Academic year', icon: 'graduation-cap' },
                { number: '677,470', label: 'Furniture Items', description: 'Distributed (2019-2021)', icon: 'building' }
              ]).map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-getfund-primary">
                    {getIconComponent(stat.icon)}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-getfund-primary mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Portfolio Breakdown */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.portfolioTitle || 'Project Portfolio'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.portfolioSubtitle || 'Our comprehensive investment across all levels of education'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(pageContent?.projectCategories || [
                { category: 'Basic Education', count: 6272, description: 'Primary and elementary schools', image: '/images/impact/infrastructure-1.jpg' },
                { category: 'Secondary Education', count: 3863, description: 'Secondary and high schools', image: '/images/impact/infrastructure-2.jpg' },
                { category: 'Tertiary Education', count: 999, description: 'Universities and colleges', image: '/images/impact/infrastructure-3.jpg' },
                { category: 'TVET Centers', count: 4, description: 'Technical and vocational training', image: '/images/impact/infrastructure-4.jpg' }
              ]).map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  {project.image && (
                    <div className="h-48 bg-gray-200">
                      <img
                        src={project.image}
                        alt={project.category}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-getfund-primary mb-2">{project.count.toLocaleString()}</h3>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{project.category}</h4>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Distributed */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.resourcesTitle || 'Resources Distributed'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.resourcesSubtitle || 'Supporting education with essential equipment and resources'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {(pageContent?.resources || [
                { type: 'Vehicles', count: 2718, period: '2019-2021', image: '/images/impact/vehicles-1.jpg' },
                { type: 'Furniture Items', count: 677470, period: '2019-2021', image: '/images/impact/furniture-1.jpg' }
              ]).map((resource, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  {resource.image && (
                    <div className="h-56 bg-gray-200">
                      <img
                        src={resource.image}
                        alt={resource.type}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-8 text-center">
                    <div className="text-5xl font-bold text-getfund-primary mb-2">{resource.count.toLocaleString()}</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{resource.type}</h3>
                    <p className="text-gray-600">Distributed to various agencies and institutions ({resource.period})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stories */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.storiesTitle || 'Stories of Impact'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.storiesSubtitle || 'Real people, real transformations, real futures'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(pageContent?.stories || [
                {
                  id: '1',
                  name: 'Akosua Mensah',
                  story: 'GETFund scholarship enabled me to pursue medical studies abroad. Now I\'m back serving my community as a doctor.',
                  image: '/images/impact/student-1.jpg',
                  category: 'Scholarship Beneficiary'
                },
                {
                  id: '2',
                  name: 'Kofi Asante',
                  story: 'The new science laboratory at our school has transformed how we teach and learn. Students are now excelling in STEM subjects.',
                  image: '/images/impact/teacher-1.jpg',
                  category: 'Teacher'
                },
                {
                  id: '3',
                  name: 'Ama Owusu',
                  story: 'Thanks to GETFund\'s infrastructure support, our school now has modern classrooms and a library. Enrollment has doubled!',
                  image: '/images/impact/principal-1.jpg',
                  category: 'School Principal'
                }
              ]).map((story) => (
                <div key={story.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-red-100 text-getfund-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {story.category}
                    </span>
                    <p className="text-gray-700 italic mb-4">"{story.story}"</p>
                    <p className="font-bold text-gray-900">— {story.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scholarship Program */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.scholarshipTitle || 'Scholarship Program'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.scholarshipSubtitle || 'Transforming lives through educational opportunities'}
              </p>
            </div>

            {/* Total Scholars and Growth */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 text-center">
                  <div className="text-6xl font-bold text-getfund-primary mb-2">
                    {pageContent?.totalScholars || '16,000+'}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Total Scholars Supported</h3>
                  <p className="text-gray-600">Lifetime achievement across local and foreign institutions</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Scholarship Growth</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-1">
                        {pageContent?.scholarshipGrowth?.from.count.toLocaleString() || '1,680'}
                      </div>
                      <div className="text-sm text-gray-600">{pageContent?.scholarshipGrowth?.from.year || '2019/20'}</div>
                    </div>
                    <div className="text-4xl text-getfund-primary">→</div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-getfund-primary mb-1">
                        {pageContent?.scholarshipGrowth?.to.count.toLocaleString() || '5,026'}
                      </div>
                      <div className="text-sm text-gray-600">{pageContent?.scholarshipGrowth?.to.year || '2023/24'}</div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="inline-block bg-getfund-primary text-white px-4 py-2 rounded-full font-semibold">
                      199% Growth
                    </span>
                  </div>
                </div>
              </div>

              {/* Percentage to Public Universities */}
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-700">
                  <span className="font-bold text-getfund-primary">{pageContent?.percentToPublicUniversities || '74%'}</span> of local scholarship awards go to public universities
                </p>
              </div>
            </div>

            {/* Scholarship Categories */}
            <div className="max-w-5xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Scholarship Categories</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {(pageContent?.scholarshipCategories || [
                  { title: 'General Scholarships', description: 'Applications from general population for Tertiary education' },
                  { title: 'Faculty Development Programmes', description: 'PhD scholarships through GTEC applications' },
                  { title: 'Professional Enhancement & Capacity Building', description: 'For government organizations - Police, Prison, Fire, Judicial, Parliamentary Services' },
                  { title: 'Educational Programme & Activity Sponsorship', description: 'NSMQ, Robotics Competitions, STEM Programmes' }
                ]).map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-getfund-primary">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h4>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reforms */}
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Reforms Implemented</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(pageContent?.reforms || [
                  'Streamlined eligibility criteria',
                  'Digitized application process',
                  'Emphasis on STEM subjects',
                  'Increased support for Girl-child Education',
                  'Overhauled payment bottlenecks for foreign scholars',
                  'Scholarship Programme Monitoring'
                ]).map((reform, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0 mt-1 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{reform}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* University Logos */}
            {pageContent?.universityLogos && pageContent.universityLogos.length > 0 && (
              <div className="max-w-5xl mx-auto mb-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Partner Universities</h3>
                <div className="flex flex-wrap justify-center items-center gap-8">
                  {pageContent.universityLogos.map((logo, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={logo}
                        alt={`University ${index + 1}`}
                        className="h-16 w-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scholarship Images */}
            {pageContent?.scholarshipImages && pageContent.scholarshipImages.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {pageContent.scholarshipImages.map((image, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-md">
                      <img
                        src={image}
                        alt={`Scholarship Program ${index + 1}`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Achievements Timeline */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.achievementsTitle || 'Key Achievements'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {pageContent?.achievementsSubtitle || 'Milestones in our journey to transform education in Ghana'}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {(pageContent?.achievements || [
                  { year: '2000', title: 'GETFund Established', description: 'Ghana Education Trust Fund established by Act of Parliament (Act 581) to provide supplementary funding for education.' },
                  { year: '2005', title: '1,000 Schools Supported', description: 'Reached milestone of supporting infrastructure development in 1,000 schools across Ghana.' },
                  { year: '2010', title: 'International Scholarship Program', description: 'Launched comprehensive international scholarship program for postgraduate studies.' },
                  { year: '2015', title: 'STEM Initiative', description: 'Major investment in Science, Technology, Engineering, and Mathematics education infrastructure.' },
                  { year: '2019/20', title: '1,680 Local Scholarships Awarded', description: 'Significant expansion of local scholarship program to support students in Ghanaian tertiary institutions.' },
                  { year: '2020', title: 'Digital Learning Infrastructure', description: 'Implemented digital learning infrastructure to support education during pandemic and beyond.' },
                  { year: '2023/24', title: '5,026 Scholarships - 199% Growth', description: 'Achieved remarkable 199% growth in local scholarships, with majority (74%) going to public universities.' },
                  { year: '2024', title: '11,248 Total Projects', description: 'Celebrated reaching 11,248 total educational projects since inception across all 16 regions of Ghana.' }
                ]).map((achievement, index) => (
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-24 text-right">
                      <span className="inline-block bg-getfund-primary text-white text-lg font-bold px-4 py-2 rounded-lg">
                        {achievement.year}
                      </span>
                    </div>
                    <div className="flex-1 pb-8 border-l-4 border-red-200 pl-6 relative">
                      <div className="absolute w-4 h-4 bg-getfund-primary rounded-full -left-[10px] top-2"></div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Regional Impact */}
        <section className="py-16 md:py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent?.regionalTitle || 'Regional Impact'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                {pageContent?.regionalSubtitle || 'Ensuring equitable distribution of educational resources across all regions'}
              </p>
              {pageContent?.regionalDescription && (
                <p className="text-gray-700 max-w-4xl mx-auto">
                  {pageContent.regionalDescription}
                </p>
              )}
            </div>

            {/* Interactive Regional Map */}
            <div className="max-w-6xl mx-auto mb-12">
              <GhanaRegionalMap
                regions={pageContent?.regions || [
                  { name: 'Ashanti', totalProjects: 748, basicEducation: 451, secondaryEducation: 281, tertiaryEducation: 12, modelSchools: 2, tvetCenters: 2 },
                  { name: 'Eastern', totalProjects: 541, basicEducation: 301, secondaryEducation: 230, tertiaryEducation: 8, modelSchools: 1, tvetCenters: 1 },
                  { name: 'Northern', totalProjects: 172, basicEducation: 101, secondaryEducation: 66, tertiaryEducation: 5 },
                  { name: 'Greater Accra', totalProjects: 77, basicEducation: 66, secondaryEducation: 1, modelSchools: 10 },
                  { name: 'Upper East', totalProjects: 121, basicEducation: 68, secondaryEducation: 47, tertiaryEducation: 6 },
                  { name: 'Bono', totalProjects: 142, basicEducation: 73, secondaryEducation: 64, tertiaryEducation: 4, modelSchools: 1 },
                  { name: 'Western', totalProjects: 110, basicEducation: 54, secondaryEducation: 55, tertiaryEducation: 1 },
                  { name: 'Ahafo', totalProjects: 102, basicEducation: 62, secondaryEducation: 34, tertiaryEducation: 5, modelSchools: 1 },
                  { name: 'Central', totalProjects: 91, basicEducation: 91 },
                  { name: 'Volta', totalProjects: 93, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 5 },
                  { name: 'Oti', totalProjects: 90, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 2 },
                  { name: 'Upper West', totalProjects: 86, basicEducation: 41, secondaryEducation: 41, tertiaryEducation: 4 },
                  { name: 'Bono East', totalProjects: 55, basicEducation: 23, secondaryEducation: 31, modelSchools: 1 },
                  { name: 'Western North', totalProjects: 51, basicEducation: 24, secondaryEducation: 19, tertiaryEducation: 7, modelSchools: 1 },
                  { name: 'North East', totalProjects: 50, basicEducation: 20, secondaryEducation: 27, tertiaryEducation: 2, modelSchools: 1 },
                  { name: 'Savannah', totalProjects: 34, basicEducation: 13, secondaryEducation: 21 }
                ]}
                className="bg-white rounded-xl shadow-lg p-6"
              />
            </div>

            {/* Optional: Regional Cards Grid (if needed as additional detail) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {(pageContent?.regions || [
                { name: 'Ashanti', totalProjects: 748, basicEducation: 451, secondaryEducation: 281, tertiaryEducation: 12, modelSchools: 2, tvetCenters: 2 },
                { name: 'Eastern', totalProjects: 541, basicEducation: 301, secondaryEducation: 230, tertiaryEducation: 8, modelSchools: 1, tvetCenters: 1 },
                { name: 'Northern', totalProjects: 172, basicEducation: 101, secondaryEducation: 66, tertiaryEducation: 5 },
                { name: 'Greater Accra', totalProjects: 77, basicEducation: 66, secondaryEducation: 1, modelSchools: 10 },
                { name: 'Upper East', totalProjects: 121, basicEducation: 68, secondaryEducation: 47, tertiaryEducation: 6 },
                { name: 'Bono', totalProjects: 142, basicEducation: 73, secondaryEducation: 64, tertiaryEducation: 4, modelSchools: 1 },
                { name: 'Western', totalProjects: 110, basicEducation: 54, secondaryEducation: 55, tertiaryEducation: 1 },
                { name: 'Ahafo', totalProjects: 102, basicEducation: 62, secondaryEducation: 34, tertiaryEducation: 5, modelSchools: 1 },
                { name: 'Central', totalProjects: 91, basicEducation: 91 },
                { name: 'Volta', totalProjects: 93, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 5 },
                { name: 'Oti', totalProjects: 90, basicEducation: 47, secondaryEducation: 41, tertiaryEducation: 2 },
                { name: 'Upper West', totalProjects: 86, basicEducation: 41, secondaryEducation: 41, tertiaryEducation: 4 },
                { name: 'Bono East', totalProjects: 55, basicEducation: 23, secondaryEducation: 31, modelSchools: 1 },
                { name: 'Western North', totalProjects: 51, basicEducation: 24, secondaryEducation: 19, tertiaryEducation: 7, modelSchools: 1 },
                { name: 'North East', totalProjects: 50, basicEducation: 20, secondaryEducation: 27, tertiaryEducation: 2, modelSchools: 1 },
                { name: 'Savannah', totalProjects: 34, basicEducation: 13, secondaryEducation: 21 }
              ]).map((region, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{region.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-900 font-semibold">Total Projects:</span>
                      <span className="text-2xl font-bold text-getfund-primary">{region.totalProjects.toLocaleString()}</span>
                    </div>
                    {region.basicEducation && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Basic:</span>
                        <span className="font-semibold text-gray-900">{region.basicEducation}</span>
                      </div>
                    )}
                    {region.secondaryEducation && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Secondary:</span>
                        <span className="font-semibold text-gray-900">{region.secondaryEducation}</span>
                      </div>
                    )}
                    {region.tertiaryEducation && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Tertiary:</span>
                        <span className="font-semibold text-gray-900">{region.tertiaryEducation}</span>
                      </div>
                    )}
                    {region.modelSchools && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Model Schools:</span>
                        <span className="font-semibold text-gray-900">{region.modelSchools}</span>
                      </div>
                    )}
                    {region.tvetCenters && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">TVET:</span>
                        <span className="font-semibold text-gray-900">{region.tvetCenters}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-getfund-primary to-getfund-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {pageContent?.ctaTitle || 'Be Part of Our Impact Story'}
              </h2>
              <p className="text-xl text-red-100 mb-8">
                {pageContent?.ctaDescription || 'Join us in transforming education and creating opportunities for future generations'}
              </p>
              <a 
                href={pageContent?.ctaButtonLink || '/support-us'}
                className="inline-block bg-white text-getfund-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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
