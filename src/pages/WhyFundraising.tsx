import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Users, GraduationCap, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import DonationInterface from '../components/DonationInterface';
import FloatingContact from '../components/FloatingContact';
import LoadingScreen from '../components/LoadingScreen';
import { cmsApi } from '../services/cmsApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

interface ImpactStat {
  id: number;
  title: string;
  value: string;
  color: string;
}


interface WhyFundraisingContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
  };
  mainContent: {
    paragraph: string;
  };
  whyDonate: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  getInvolved: {
    heading: string;
    description: string;
    donationHeading: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
}

// Impact points for visual cards
const impactPoints = [
  {
    icon: GraduationCap,
    title: 'Scholarships',
    description: 'Fund scholarships for talented students who lack financial resources',
    color: '#2a3f75'
  },
  {
    icon: Building2,
    title: 'Infrastructure',
    description: 'Build and renovate schools to create better learning environments',
    color: '#f59e0b'
  },
  {
    icon: Users,
    title: 'Teacher Training',
    description: 'Support professional development programs for educators',
    color: '#1e3a5f'
  },
  {
    icon: TrendingUp,
    title: 'Research & Innovation',
    description: 'Fund educational research and innovative teaching methods',
    color: '#d97706'
  }
];

export default function WhyFundraising() {
  const [content, setContent] = useState<WhyFundraisingContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [impactStats, setImpactStats] = useState<ImpactStat[]>([]);
  const [impactTitle, setImpactTitle] = useState('Our Impact');
  const [impactSubtitle, setImpactSubtitle] = useState('25+ years of giving');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('why-fundraising');
        const section = page.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as WhyFundraisingContent);
        }
      } catch {
        // Keep loading state false to show error
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();

    // Fetch impact stats
    const fetchImpactStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/impact-stats?page=why-fundraising`);
        const data = await response.json();
        if (data.success && data.data) {
          setImpactStats(data.data.stats || []);
          if (data.data.title) setImpactTitle(data.data.title);
          if (data.data.subtitle) setImpactSubtitle(data.data.subtitle);
        }
      } catch (error) {
        console.error('Failed to fetch impact stats:', error);
      }
    };
    fetchImpactStats();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Content not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content.meta?.title || 'Why Fundraising? | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || 'Your support helps us expand access to quality education'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section with Grainy Grey Effect */}
        <section
          className="relative py-16 md:py-24 overflow-hidden bg-gray-100"
        >
          {/* Grain Texture Overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#2a3f75]/5" />
            <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-amber-500/10" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-[#2a3f75]/5" />
          </div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Text Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a3f75]/10 text-[#2a3f75] text-sm mb-6">
                  <Heart className="w-4 h-4" />
                  Support Education in Ghana
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {content.hero?.title || 'Why Fundraising?'}
                </h1>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {content.mainContent?.paragraph}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/fundraising/ways-to-donate"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#f59e0b', color: '#1e3a5f', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)' }}
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </Link>
                  <Link
                    to="/fundraising-campaigns"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-[#2a3f75] text-[#2a3f75] transition-all duration-300 hover:bg-[#2a3f75] hover:text-white hover:border-[#2a3f75]"
                  >
                    View Campaigns
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right - Featured Image (hidden on mobile, shown on desktop) */}
              {content.featuredImage?.url && (
                <div className="relative hidden lg:block">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-200">
                    <img
                      src={content.featuredImage.url}
                      alt={content.featuredImage.alt || 'Why Fundraising'}
                      className="w-full h-auto object-cover min-h-[500px] max-h-[600px]"
                    />
                  </div>
                  {content.featuredImage.caption && (
                    <p className="text-sm text-gray-500 text-center mt-3">
                      {content.featuredImage.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Where Your Donations Go Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Where Your Donations Go
              </h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Your contributions directly support these critical areas of educational development
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactPoints.map((point, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-gray-200"
                >
                  {/* Accent line at top */}
                  <div
                    className="absolute top-0 left-6 right-6 h-1 rounded-b-full transition-all duration-300 group-hover:left-4 group-hover:right-4"
                    style={{ backgroundColor: point.color }}
                  />
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${point.color}15` }}
                  >
                    <point.icon className="w-7 h-7" style={{ color: point.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats Section - Counter Style */}
        {impactStats.length > 0 && (
          <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 max-w-6xl">
              {/* Section Title - Top Left */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Impact</h2>
                <p className="text-gray-500 text-sm mt-1">{impactSubtitle}</p>
              </div>

              {/* Horizontal stats row */}
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                {impactStats.map((stat) => (
                  <div
                    key={stat.id}
                    className="text-center group"
                  >
                    {/* Number */}
                    <div className="text-4xl md:text-5xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-110 text-[#2a3f75]">
                      {stat.value}
                    </div>
                    {/* Label with underline */}
                    <div className="mt-1 relative inline-block">
                      <span className="text-gray-600 text-xs md:text-sm font-medium uppercase tracking-wider">
                        {stat.title}
                      </span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full bg-[#2a3f75] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Donate Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left - Why Donate Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {content.whyDonate?.heading || 'Why Donate to Us?'}
                </h2>
                <div className="space-y-6">
                  {content.whyDonate?.paragraph1 && (
                    <div className="flex gap-4">
                      <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#2a3f75' }} />
                      <p className="text-gray-700 leading-relaxed">{content.whyDonate.paragraph1}</p>
                    </div>
                  )}
                  {content.whyDonate?.paragraph2 && (
                    <div className="flex gap-4">
                      <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#f59e0b' }} />
                      <p className="text-gray-700 leading-relaxed">{content.whyDonate.paragraph2}</p>
                    </div>
                  )}
                  {content.whyDonate?.paragraph3 && (
                    <div className="flex gap-4">
                      <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#1e3a5f' }} />
                      <p className="text-gray-700 leading-relaxed">{content.whyDonate.paragraph3}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Donation Interface */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {content.getInvolved?.donationHeading || 'Make a Donation'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {content.getInvolved?.description}
                </p>
                <DonationInterface />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with Grainy Grey Effect */}
        <section className="relative py-16 overflow-hidden bg-gray-100">
          {/* Grain Texture Overlay */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#2a3f75]/5" />
            <div className="absolute top-1/2 -right-24 w-48 h-48 rounded-full bg-amber-500/10" />
            <div className="absolute -bottom-12 left-1/3 w-40 h-40 rounded-full bg-[#2a3f75]/5" />
          </div>

          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of donors who are transforming education in Ghana. Every contribution, big or small, creates lasting impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/fundraising/ways-to-donate"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#2a3f75', color: 'white' }}
              >
                <Heart className="w-5 h-5" />
                Start Donating
              </Link>
              <Link
                to="/fundraising/partnerships"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-[#2a3f75] text-[#2a3f75] transition-all duration-300 hover:bg-[#2a3f75] hover:text-white"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
}
