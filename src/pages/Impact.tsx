import { useEffect, useState } from 'react';
import { TrendingUp, Users, Building, Award, BookOpen, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import OptimizedImage from '../components/OptimizedImage';
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
        {/* Page Title Section */}
        <section className="bg-white pt-8 pb-4">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {pageContent?.heroTitle || 'Our Impact'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
            <p className="text-gray-600 mt-3 max-w-3xl">
              {pageContent?.heroSubtitle || 'Transforming lives and communities through quality education across Ghana'}
            </p>
          </div>
        </section>

        {/* Regional Impact - First section after title */}
        <section className="py-10 bg-blue-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {pageContent?.regionalTitle || 'Regional Impact'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {pageContent?.regionalSubtitle || 'Ensuring equitable distribution of educational resources across all regions'}
              </p>
            </div>

            {/* Interactive Regional Map */}
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
            />
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {pageContent?.statsTitle || 'Our Impact in Numbers'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {pageContent?.statsSubtitle || 'Measurable results that showcase our commitment to educational excellence'}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {(pageContent?.stats || [
                { number: '11,248', label: 'Total Projects', description: 'Since inception', icon: 'building' },
                { number: '16,000+', label: 'Scholars Supported', description: 'Local and foreign', icon: 'graduation-cap' },
                { number: '2,749+', label: 'Recent Projects', description: 'Since 2017', icon: 'trending-up' },
                { number: '16', label: 'Regions Covered', description: 'Nationwide', icon: 'award' },
                { number: '5,026', label: 'Scholarships', description: '2023/24', icon: 'graduation-cap' },
                { number: '677,470', label: 'Furniture Items', description: '2019-2021', icon: 'building' }
              ]).map((stat, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#2a3f75' }}>{stat.number}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <p className="text-gray-500 text-xs">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Portfolio Breakdown */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {pageContent?.portfolioTitle || 'Project Portfolio'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {pageContent?.portfolioSubtitle || 'Our comprehensive investment across all levels of education'}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(pageContent?.projectCategories || [
                { category: 'Basic Education', count: 6272, description: 'Primary schools', image: '/images/impact/infrastructure-1.jpg' },
                { category: 'Secondary Education', count: 3863, description: 'High schools', image: '/images/impact/infrastructure-2.jpg' },
                { category: 'Tertiary Education', count: 999, description: 'Universities', image: '/images/impact/infrastructure-3.jpg' },
                { category: 'TVET Centers', count: 4, description: 'Vocational training', image: '/images/impact/infrastructure-4.jpg' }
              ]).map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {project.image && (
                    <div className="h-32">
                      <OptimizedImage
                        src={project.image}
                        alt={project.category}
                        className="w-full h-full object-cover"
                        fallbackSrc="/images/placeholder.jpg"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1" style={{ color: '#2a3f75' }}>{project.count.toLocaleString()}</h3>
                    <h4 className="text-sm font-semibold text-gray-900">{project.category}</h4>
                    <p className="text-gray-500 text-xs">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Distributed */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {pageContent?.resourcesTitle || 'Resources Distributed'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {pageContent?.resourcesSubtitle || 'Supporting education with essential equipment and resources'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(pageContent?.resources || [
                { type: 'Vehicles', count: 2718, period: '2019-2021', image: '/images/impact/vehicles-1.jpg' },
                { type: 'Furniture Items', count: 677470, period: '2019-2021', image: '/images/impact/furniture-1.jpg' }
              ]).map((resource, index) => (
                <div key={index} className="bg-blue-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex">
                  {resource.image && (
                    <div className="w-32 h-32 flex-shrink-0">
                      <OptimizedImage
                        src={resource.image}
                        alt={resource.type}
                        className="w-full h-full object-cover"
                        fallbackSrc="/images/placeholder.jpg"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col justify-center">
                    <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#2a3f75' }}>{resource.count.toLocaleString()}</div>
                    <h3 className="text-lg font-semibold text-gray-900">{resource.type}</h3>
                    <p className="text-gray-500 text-sm">Distributed ({resource.period})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stories */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {pageContent?.storiesTitle || 'Stories of Impact'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {pageContent?.storiesSubtitle || 'Real people, real transformations, real futures'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
                  story: 'The new science laboratory at our school has transformed how we teach and learn. Students are now excelling in STEM.',
                  image: '/images/impact/teacher-1.jpg',
                  category: 'Teacher'
                },
                {
                  id: '3',
                  name: 'Ama Owusu',
                  story: 'Thanks to GETFund\'s infrastructure support, our school now has modern classrooms and a library.',
                  image: '/images/impact/principal-1.jpg',
                  category: 'School Principal'
                }
              ]).map((story) => (
                <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32">
                    <OptimizedImage
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                      fallbackSrc="/images/placeholder.jpg"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)', color: '#2a3f75' }}>
                      {story.category}
                    </span>
                    <p className="text-gray-600 text-sm italic mb-2">"{story.story}"</p>
                    <p className="font-semibold text-gray-900 text-sm">— {story.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scholarship Program */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {pageContent?.scholarshipTitle || 'Scholarship Program'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {pageContent?.scholarshipSubtitle || 'Transforming lives through educational opportunities'}
              </p>
            </div>

            {/* Total Scholars and Growth */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: '#2a3f75' }}>
                  {pageContent?.totalScholars || '16,000+'}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Total Scholars Supported</h3>
                <p className="text-gray-500 text-sm">Across local and foreign institutions</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Scholarship Growth</h3>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-600">
                      {pageContent?.scholarshipGrowth?.from.count.toLocaleString() || '1,680'}
                    </div>
                    <div className="text-xs text-gray-500">{pageContent?.scholarshipGrowth?.from.year || '2019/20'}</div>
                  </div>
                  <div className="text-2xl" style={{ color: '#2a3f75' }}>→</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#2a3f75' }}>
                      {pageContent?.scholarshipGrowth?.to.count.toLocaleString() || '5,026'}
                    </div>
                    <div className="text-xs text-gray-500">{pageContent?.scholarshipGrowth?.to.year || '2023/24'}</div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="inline-block text-white text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: '#2a3f75' }}>
                    199% Growth
                  </span>
                </div>
              </div>
            </div>

            {/* Scholarship Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Scholarship Categories</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {(pageContent?.scholarshipCategories || [
                  { title: 'General Scholarships', description: 'Applications for Tertiary education' },
                  { title: 'Faculty Development', description: 'PhD scholarships through GTEC' },
                  { title: 'Professional Enhancement', description: 'Government organizations support' },
                  { title: 'Educational Sponsorship', description: 'NSMQ, Robotics, STEM Programmes' }
                ]).map((category, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border-l-3" style={{ borderLeftWidth: '3px', borderLeftColor: '#2a3f75' }}>
                    <h4 className="text-sm font-semibold text-gray-900">{category.title}</h4>
                    <p className="text-gray-500 text-xs">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reforms */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Key Reforms</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(pageContent?.reforms || [
                  'Streamlined eligibility',
                  'Digitized applications',
                  'STEM emphasis',
                  'Girl-child Education',
                  'Payment optimization',
                  'Programme Monitoring'
                ]).map((reform, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#2a3f75' }}>
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600 text-xs">{reform}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* University Logos */}
            {pageContent?.universityLogos && pageContent.universityLogos.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">Partner Universities</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {pageContent.universityLogos.map((logo, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-center aspect-square hover:shadow-md transition-shadow">
                      <OptimizedImage
                        src={logo}
                        alt={`University ${index + 1}`}
                        className="max-h-12 max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

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
                { year: '2024', title: '11,248 Projects', description: 'Across all 16 regions' }
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
