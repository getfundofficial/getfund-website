import React, { useEffect, useState } from 'react';
import { Gift, Calendar, TrendingUp, Award, DollarSign } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import DonationModal from '../components/DonationModal';

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

interface LotteryConfig {
  prizes: Array<{
    rank: number | string;
    amount: number;
    description: string;
    currency: string;
    count?: number;
  }>;
  next_draw_date: string;
  how_it_works_steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  is_active: boolean;
  banner_color: string;
  current_entries_count: number;
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

// Default lottery config
const defaultLotteryConfig: LotteryConfig = {
  prizes: [
    { rank: 1, amount: 50000, description: 'Full 4-year university education', currency: 'GHS' },
    { rank: 2, amount: 20000, description: 'Technical Education', currency: 'GHS' },
    { rank: 3, amount: 10000, description: 'Secondary School', currency: 'GHS' },
    { rank: 'additional', amount: 1000, description: 'Educational support', currency: 'GHS', count: 20 }
  ],
  next_draw_date: '2024-03-29T20:00:00.000Z',
  how_it_works_steps: [
    {
      step: 1,
      title: 'Donate to Any Campaign',
      description: 'Every ₵10 donated automatically gives you one lottery entry. The more you give, the better your chances!'
    },
    {
      step: 2,
      title: 'Monthly Draw',
      description: 'Winners are selected transparently on the last Friday of each month via live broadcast.'
    },
    {
      step: 3,
      title: 'Claim Your Prize',
      description: 'Scholarship winners receive direct educational funding or can nominate deserving candidates.'
    }
  ],
  is_active: true,
  banner_color: '#C41E3A',
  current_entries_count: 12847
};

export default function FundraisingCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(defaultCampaigns);
  const [lotteryConfig, setLotteryConfig] = useState<LotteryConfig>(defaultLotteryConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    // Use relative URL in development (via Vite proxy) or absolute URL in production
    const apiUrl = import.meta.env.VITE_CMS_API_URL || '/api';

    console.log('Fetching campaigns from:', apiUrl);

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
      fetch(`${apiUrl}/lottery/config`)
        .then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .catch(err => {
          console.error('Failed to fetch lottery config:', err);
          return { config: null };
        })
    ])
      .then(([campaignsData, lotteryData]) => {
        console.log('Campaigns data:', campaignsData);
        console.log('Lottery data:', lotteryData);

        if (campaignsData.campaigns && campaignsData.campaigns.length > 0) {
          // Filter for active campaigns and sort by display_order
          const activeCampaigns = campaignsData.campaigns
            .filter((c: Campaign) => c.status === 'active')
            .sort((a: Campaign, b: Campaign) => (a.display_order || 0) - (b.display_order || 0));

          if (activeCampaigns.length > 0) {
            setCampaigns(activeCampaigns);
          }
        }
        if (lotteryData.config) {
          setLotteryConfig(lotteryData.config);
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
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-getfund-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading fundraising campaigns...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <PageBanner
        title="Support Education Through Giving"
        subtitle="Your donations directly fund scholarships, infrastructure, and educational programs across Ghana"
        bannerBackground={{
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
                Featured Fundraising Campaigns
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Join thousands of Ghanaians making a difference through our targeted fundraising campaigns. Every contribution counts towards building a better educational future.
              </p>
            </div>

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 text-lg">No active campaigns at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                View All Campaigns
              </a>
            </div>
          </div>
        </section>
        {/* GETfund Scholarship Lottery Section - First */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GETFund Scholarship Lottery
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
                Every contribution to our campaigns automatically enters you into our monthly scholarship lottery. Win full scholarships for yourself or your loved ones while supporting education in Ghana.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Prize Box */}
              <LotteryPrizeBox prizes={lotteryConfig.prizes} bannerColor={lotteryConfig.banner_color} />

              {/* How It Works */}
              <LotteryHowItWorks
                steps={lotteryConfig.how_it_works_steps}
                nextDrawDate={lotteryConfig.next_draw_date}
                currentEntries={lotteryConfig.current_entries_count}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
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
        <div className="relative h-48 bg-gradient-to-br from-getfund-primary to-getfund-secondary flex items-center justify-center">
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
              className="bg-gradient-to-r from-blue-600 to-blue-800 h-2.5 rounded-full transition-all duration-500 ease-out"
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

// Lottery Prize Box Component
const LotteryPrizeBox: React.FC<{ prizes: LotteryConfig['prizes']; bannerColor: string }> = ({ prizes, bannerColor }) => {
  const mainPrizes = prizes.filter(p => typeof p.rank === 'number');
  const additionalPrizes = prizes.filter(p => p.rank === 'additional');

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Yellow header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">This Month's Lottery Prizes</h3>
      </div>

      <div className="p-6 sm:p-8">
        {/* 1st Prize - Large */}
        {mainPrizes.filter(p => p.rank === 1).map((prize, index) => (
          <div key={index} className="text-center mb-6 pb-6 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-500 mb-1">1st Prize</div>
            <div className="text-3xl sm:text-4xl font-bold text-getfund-primary mb-1">
              ₵{prize.amount.toLocaleString()}
            </div>
            <div className="text-lg text-gray-700">{prize.description}</div>
          </div>
        ))}

        {/* 2nd and 3rd Prize - Side by side */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {mainPrizes.filter(p => p.rank === 2 || p.rank === 3).map((prize, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xs font-medium text-gray-500 mb-1">
                {prize.rank === 2 ? '2nd Prize' : '3rd Prize'}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                ₵{prize.amount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">{prize.description}</div>
            </div>
          ))}
        </div>

        {/* Additional prizes */}
        {additionalPrizes.map((prize, index) => (
          <div key={`add-${index}`} className="p-4 bg-yellow-50 rounded-lg text-center border border-yellow-200">
            <div className="text-base sm:text-lg font-semibold text-gray-900">
              Plus {prize.count} additional prizes of ₵{prize.amount.toLocaleString()} each!
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Lottery How It Works Component
const LotteryHowItWorks: React.FC<{
  steps: LotteryConfig['how_it_works_steps'];
  nextDrawDate: string;
  currentEntries: number;
}> = ({ steps, nextDrawDate, currentEntries }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 flex flex-col border border-gray-100">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">How It Works</h3>

      <div className="space-y-5 sm:space-y-6 mb-8 flex-1">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="bg-getfund-primary text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 mr-4 font-bold text-lg shadow-lg">
              {step.step}
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Draw Info */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-5 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Next Draw</span>
          <div className="text-right">
            <span className="font-bold text-lg text-getfund-primary block">
              {new Date(nextDrawDate).toLocaleDateString('en-GB', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-xs text-gray-500">8:00 PM GMT • Live on GTV</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Current Entries</span>
          <span className="font-bold text-2xl text-gray-900">
            {currentEntries?.toLocaleString() || 0}
          </span>
        </div>
      </div>

      <button
        onClick={() => window.location.href = '/fundraising/ways-to-donate'}
        className="w-full bg-gradient-to-r from-getfund-primary to-red-700 hover:from-red-700 hover:to-getfund-primary text-white py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Participate Now - Donate & Enter
      </button>
    </div>
  );
};
