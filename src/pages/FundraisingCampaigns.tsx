import React, { useEffect, useState } from 'react';
import { Gift, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import FloatingContact from '../components/FloatingContact';
import DonationModal from '../components/DonationModal';
import { cmsApi } from '../services/cmsApi';

interface PageContent {
  // Hero Section
  heroTitle?: string;

  // Featured Campaigns Section
  campaignsSectionTitle?: string;
  campaignsSectionSubtitle?: string;
  viewAllButtonText?: string;

  // Featured Image
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
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

// Default page content
const defaultPageContent: PageContent = {
  heroTitle: 'Fundraising Campaigns',
  campaignsSectionTitle: 'Featured Fundraising Campaigns',
  campaignsSectionSubtitle: 'Join thousands of Ghanaians making a difference through our targeted fundraising campaigns. Every contribution counts towards building a better educational future.',
  viewAllButtonText: 'View All Campaigns'
};

export default function FundraisingCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [pageContent, setPageContent] = useState<PageContent>(defaultPageContent);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    // Use relative URL in development (via Vite proxy) or absolute URL in production
    const apiUrl = import.meta.env.VITE_CMS_API_URL || '/api';

    Promise.all([
      fetch(`${apiUrl}/campaigns`)
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
        // Always set campaigns from API (empty array if none exist)
        const activeCampaigns = (campaignsData.campaigns || [])
          .filter((c: Campaign) => c.status === 'active')
          .sort((a: Campaign, b: Campaign) => (a.display_order || 0) - (b.display_order || 0));

        setCampaigns(activeCampaigns);

        // Process page content from CMS
        if (pageData && pageData.sections) {
          const content: PageContent = { ...defaultPageContent };

          pageData.sections.forEach((section: any) => {
            if (section.section_type === 'page_content' && section.content && section.is_active) {
              // Hero section
              if (section.content.heroTitle) content.heroTitle = section.content.heroTitle;

              // Campaigns section
              if (section.content.campaignsSectionTitle) content.campaignsSectionTitle = section.content.campaignsSectionTitle;
              if (section.content.campaignsSectionSubtitle) content.campaignsSectionSubtitle = section.content.campaignsSectionSubtitle;
              if (section.content.viewAllButtonText) content.viewAllButtonText = section.content.viewAllButtonText;

              // Featured Image
              if (section.content.featuredImage) content.featuredImage = section.content.featuredImage;
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

      {/* Page Title Section - Clean, minimal */}
      <section className="bg-white pt-8 pb-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {pageContent.heroTitle || 'Fundraising Campaigns'}
          </h1>
          <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
          <p className="text-gray-600 mt-4 max-w-3xl">
            {pageContent.campaignsSectionSubtitle || 'Join thousands of Ghanaians making a difference through our targeted fundraising campaigns. Every contribution counts towards building a better educational future.'}
          </p>
        </div>
      </section>

      {/* Featured Image Section - CMS Editable */}
      {pageContent.featuredImage?.url && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={pageContent.featuredImage.url}
                alt={pageContent.featuredImage.alt || 'Fundraising Campaigns'}
                className="w-full h-auto object-cover"
              />
              {pageContent.featuredImage.caption && (
                <p className="text-sm text-gray-500 text-center py-3 bg-gray-50">
                  {pageContent.featuredImage.caption}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <main className="flex-1">
        {/* Campaigns Section */}
        <section className="py-12 sm:py-16" style={{ backgroundColor: 'rgba(42, 63, 117, 0.03)' }}>
          <div className="container mx-auto px-4 sm:px-6">

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg">No active campaigns currently</p>
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
                className="inline-block font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg hover:opacity-90"
                style={{ backgroundColor: '#f59e0b', color: '#1e3a5f' }}
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
        <div className="relative h-48 flex items-center justify-center" style={{ backgroundColor: '#2a3f75' }}>
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
              className="h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ backgroundColor: '#2a3f75', width: `${Math.max(percentageFunded, 2)}%` }}
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
          className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:opacity-90 flex items-center justify-center"
          style={{ backgroundColor: '#1e3a5f' }}
        >
          {campaign.button_text || 'Donate Now'}
        </button>
      </div>
    </div>
  );
};

