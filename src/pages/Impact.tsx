import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Building, Award, BookOpen, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
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


interface PageContent {
  bannerBackground?: BannerBackground;

  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;
  
  // Impact Statistics
  statsTitle?: string;
  statsSubtitle?: string;
  stats?: StatItem[];
  
  // Impact Stories
  storiesTitle?: string;
  storiesSubtitle?: string;
  stories?: ImpactStory[];
  
  // Achievements Timeline
  achievementsTitle?: string;
  achievementsSubtitle?: string;
  achievements?: Achievement[];
  
  // Regional Impact
  regionalTitle?: string;
  regionalSubtitle?: string;
  regionalDescription?: string;
  regions?: Array<{
    name: string;
    schools: number;
    students: number;
    projects: number;
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
              } else if (section.section_key === 'impact_stories' && section.content) {
                content.storiesTitle = section.content.title;
                content.storiesSubtitle = section.content.subtitle;
                content.stories = section.content.stories;
              } else if (section.section_key === 'achievements' && section.content) {
                content.achievementsTitle = section.content.title;
                content.achievementsSubtitle = section.content.subtitle;
                content.achievements = section.content.achievements;
              } else if (section.section_key === 'regional_impact' && section.content) {
                content.regionalTitle = section.content.title;
                content.regionalSubtitle = section.content.subtitle;
                content.regionalDescription = section.content.description;
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
          bannerBackground={pageContent?.bannerBackground}
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
                { number: '5,000+', label: 'Schools Supported', description: 'Educational institutions nationwide', icon: 'building' },
                { number: '2M+', label: 'Students Reached', description: 'Beneficiaries of our programs', icon: 'users' },
                { number: '50+', label: 'Infrastructure Projects', description: 'Completed and ongoing', icon: 'trending-up' },
                { number: '16', label: 'Regions Covered', description: 'Nationwide impact', icon: 'award' },
                { number: '15,000+', label: 'Scholarships Awarded', description: 'Supporting academic excellence', icon: 'graduation-cap' },
                { number: 'GHS 5B+', label: 'Total Investment', description: 'Since establishment', icon: 'trending-up' }
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

        {/* Achievements Timeline */}
        <section className="py-16 md:py-20 bg-white">
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
                  { year: '2020', title: 'Digital Learning', description: 'Implemented digital learning infrastructure to support education during pandemic and beyond.' },
                  { year: '2024', title: '5,000+ Schools Milestone', description: 'Celebrated supporting over 5,000 educational institutions nationwide with 2M+ student beneficiaries.' }
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(pageContent?.regions || [
                { name: 'Greater Accra', schools: 850, students: 425000, projects: 12 },
                { name: 'Ashanti Region', schools: 920, students: 460000, projects: 15 },
                { name: 'Northern Region', schools: 680, students: 340000, projects: 10 },
                { name: 'Western Region', schools: 520, students: 260000, projects: 8 }
              ]).map((region, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{region.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Schools:</span>
                      <span className="font-bold text-getfund-primary">{region.schools.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-bold text-getfund-primary">{region.students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Projects:</span>
                      <span className="font-bold text-getfund-primary">{region.projects}</span>
                    </div>
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
