import React, { useEffect, useState } from 'react';
import { Gift, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
import FloatingContact from '../components/FloatingContact';
import DonationModal from '../components/DonationModal';
import { cmsApi } from '../services/cmsApi';
import { BannerBackground } from '../types/bannerBackground';

interface PageContent {
  // Hero Section
  heroTitle?: string;
  heroSubtitle?: string;
  bannerBackground?: BannerBackground;

  // Featured Campaigns Section
  campaignsSectionTitle?: string;
  campaignsSectionSubtitle?: string;
  viewAllButtonText?: string;
}

interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  goal_amount: number;
  raised_amount: number;
  currency: string;
  status: string;
  button_text: string;
  percentage_funded: number;
  days_left: number | null;
  donation_count: number;
  display_order?: number;
  is_featured?: boolean;
}

// Default campaigns data
const defaultCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Education Infrastructure Development',
    slug: 'education-infrastructure',
    description: 'Building modern classrooms and laboratories for rural schools across Ghana',
    image_url: null,
    goal_amount: 500000,
    raised_amount: 0,
    currency: 'GHS',
    status: 'active',
    button_text: 'Donate Now',
    percentage_funded: 0,
    days_left: 36,
    donation_count: 0
  },
  {
    id: '2',
    title: 'Digital Learning Initiative',
    slug: 'digital-learning',
    description: 'Providing tablets and internet connectivity to underserved communities',
    image_url: null,
    goal_amount: 250000,
    raised_amount: 0,
    currency: 'GHS',
    status: 'active',
    button_text: 'Donate Now',
    percentage_funded: 0,
    days_left: 0,
    donation_count: 0
  },
  {
    id: '3',
    title: 'Teacher Training Program',
    slug: 'teacher-training',
    description: 'Professional development and certification for educators in remote areas',
    image_url: null,
    goal_amount: 150000,
    raised_amount: 0,
    currency: 'GHS',
    status: 'active',
    button_text: 'Donate Now',
    percentage_funded: 0,
    days_left: 0,
    donation_count: 0
  }
];

// Default page content
const defaultPageContent: PageContent = {
  heroTitle: 'Support Education Through Giving',
  heroSubtitle: 'Your donations directly fund scholarships, infrastructure, and educational programs across Ghana',
  bannerBackground: {
    imageUrl: '/images/hero/main-slider-3.jpg',
    tintColor: '#DC143C',
    tintColor2: '#2563EB',
    useGradient: true,
    tintOpacity: 75,
    gradientDirection: 'to right'
  },
  campaignsSectionTitle: 'Featured Fundraising Campaigns',
  campaignsSectionSubtitle: 'Join thousands of Ghanaians making a difference through our targeted fundraising campaigns. Every contribution counts towards building a better educational future.',
  viewAllButtonText: 'View All Campaigns'
};

export default function FundraisingCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(defaultCampaigns);
  const [pageContent, setPageContent] = useState<PageContent>(defaultPageContent);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    // Use relative URL in development (via Vite proxy) or absolute URL in production
    const apiUrl = import.meta.env.VITE_CMS_API_URL || '/api';

    const fetchOptions = {
      cache: 'no-store' as RequestCache,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    };

    Promise.all([
      fetch(`${apiUrl}/campaigns`, fetchOptions)
        .then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .catch(err => {
          console.error('Failed to fetch campaigns:', err);
          return { campaigns: [] };
        }),
      // Fetch page content from CMS
      cmsApi.getPageBySlug('fundraising-campaigns')
        .catch(err => {
          console.error('Failed to fetch page content:', err);
          return null;
        })
    ])
      .then(([campaignsData, pageData]) => {
        if (campaignsData.campaigns && campaignsData.campaigns.length > 0) {
          // Filter for active campaigns and sort by display_order
          const activeCampaigns = campaignsData.campaigns
            .filter((c: Campaign) => c.status === 'active')
            .sort((a: Campaign, b: Campaign) => (a.display_order || 0) - (b.display_order || 0));

          if (activeCampaigns.length > 0) {
            setCampaigns(activeCampaigns);
          }
        }

        // Process page content from CMS
        if (pageData && pageData.sections) {
          const content: PageContent = { ...defaultPageContent };

          pageData.sections.forEach((section: any) => {
            if (section.section_type === 'page_content' && section.content && section.is_active) {
              // Hero section
              if (section.content.heroTitle) content.heroTitle = section.content.heroTitle;
              if (section.content.heroSubtitle) content.heroSubtitle = section.content.heroSubtitle;
              if (section.content.bannerBackground) content.bannerBackground = section.content.bannerBackground;

              // Campaigns section
              if (section.content.campaignsSectionTitle) content.campaignsSectionTitle = section.content.campaignsSectionTitle;
              if (section.content.campaignsSectionSubtitle) content.campaignsSectionSubtitle = section.content.campaignsSectionSubtitle;
              if (section.content.viewAllButtonText) content.viewAllButtonText = section.content.viewAllButtonText;
            }
          });

          setPageContent(content);
        }

        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        // Use defaults on error
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <PageBanner
        title={pageContent.heroTitle || 'Support Education Through Giving'}
        subtitle={pageContent.heroSubtitle || 'Your donations directly fund scholarships, infrastructure, and educational programs across Ghana'}
        bannerBackground={pageContent.bannerBackground || {
          imageUrl: '/images/hero/main-slider-3.jpg',
          tintColor: '#DC143C',
          tintColor2: '#2563EB',
          useGradient: true,
          tintOpacity: 75,
          gradientDirection: 'to right'
        }}
      />
      <main className="flex-1">
        {/* Featured Campaigns Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {pageContent.campaignsSectionTitle || 'Featured Fundraising Campaigns'}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                {pageContent.campaignsSectionSubtitle || 'Join thousands of Ghanaians making a difference through our targeted fundraising campaigns. Every contribution counts towards building a better educational future.'}
              </p>
            </div>

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg">No active campaigns at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className={`grid gap-6 sm:gap-8 ${
                campaigns.length === 1
                  ? 'grid-cols-1 max-w-md mx-auto'
                  : campaigns.length === 2
                    ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {campaigns.slice(0, 3).map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}

            <div className="text-center mt-10 sm:mt-12">
              <a
                href="/fundraising/all-campaigns"
                className="inline-block bg-getfund-secondary hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                {pageContent.viewAllButtonText || 'View All Campaigns'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Floating Contact Button */}
      <FloatingContact />

      {/* Donation Modal */}
      {selectedCampaign && (
        <DonationModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCampaign(null);
          }}
          title={selectedCampaign.title}
          amount={selectedCampaign.goal_amount / 100} // Default suggested amount
          description={selectedCampaign.description}
          campaignId={selectedCampaign.id}
          campaignSlug={selectedCampaign.slug}
        />
      )}
    </div>
  );
}

// Campaign Card Component
const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const daysLeft = campaign.days_left;
  const percentageFunded = Math.min(campaign.percentage_funded || 0, 100);
  const currencySymbol = campaign.currency === 'GHS' ? 'GH₵' : campaign.currency === 'USD' ? '$' : '€';

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 flex flex-col">
      {/* Campaign Image */}
      {campaign.image_url ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={campaign.image_url}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="relative h-48 bg-getfund-primary flex items-center justify-center">
          <Gift className="w-16 h-16 text-white/50" />
        </div>
      )}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            Active Campaign
          </span>
          {daysLeft !== null && daysLeft >= 0 && (
            <span className="flex items-center text-sm text-gray-500">
              {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {campaign.title}
        </h3>

        <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3 flex-1">
          {campaign.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-semibold">{percentageFunded.toFixed(0)}% funded</span>
            <span className="font-medium">
              {currencySymbol}{campaign.raised_amount.toLocaleString()} raised
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(percentageFunded, 2)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Goal: {currencySymbol}{campaign.goal_amount.toLocaleString()}
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCampaign(campaign);
            setModalOpen(true);
          }}
          className="w-full bg-getfund-gold hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          {campaign.button_text || 'Donate Now'}
        </button>
      </div>
    </div>
  );
};

