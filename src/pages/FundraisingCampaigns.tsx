import React, { useEffect, useState } from 'react';
import { Gift, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import LoadingScreen from '../components/LoadingScreen';
import ContactSection from '../components/ContactSection';
import { FlipCard } from '../components/lottery/FlipCard';
import { CountdownTimer } from '../components/lottery/CountdownTimer';
import { SocialShareButtons } from '../components/lottery/SocialShareButtons';
import DonationModal from '../components/DonationModal';
import LoadingScreen from '../components/LoadingScreen';

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

interface LotteryPrize {
  rank: number | string;
  amount: number;
  description: string;
  currency: string;
  count?: number;
  flip_description?: string;
}

interface LotteryStep {
  step: number;
  title: string;
  description: string;
  flip_description?: string;
}

interface LotteryConfig {
  prizes: LotteryPrize[];
  next_draw_date: string;
  how_it_works_steps: LotteryStep[];
  is_active: boolean;
  banner_color: string;
  current_entries_count: number;
  section_title?: string;
  section_description?: string;
  prize_box_title?: string;
  sharing_enabled?: boolean;
  share_text?: string;
  share_hashtags?: string;
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
    return <LoadingScreen message="Loading fundraising campaigns..." />;
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
        {/* GETfund Scholarship Lottery Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lotteryConfig.section_title || 'GETFund Scholarship Lottery'}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
                {lotteryConfig.section_description ||
                  'Every contribution to our campaigns automatically enters you into our monthly scholarship lottery. Win full scholarships for yourself or your loved ones while supporting education in Ghana.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto items-start">
              {/* Prize Box */}
              <LotteryPrizeBox prizes={lotteryConfig.prizes} bannerColor={lotteryConfig.banner_color} prizeBoxTitle={lotteryConfig.prize_box_title} />

              {/* How It Works + Share Section */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* How It Works */}
                <div className="flex-1">
                  <LotteryHowItWorks
                    steps={lotteryConfig.how_it_works_steps}
                    nextDrawDate={lotteryConfig.next_draw_date}
                    currentEntries={lotteryConfig.current_entries_count}
                  />
                </div>

                {/* Social Sharing - Vertical */}
                {lotteryConfig.sharing_enabled !== false && (
                  <div className="flex lg:flex-col items-center justify-center gap-3 lg:gap-4 py-4 lg:py-0">
                    <p className="text-xs text-gray-500 font-medium lg:-rotate-90 lg:whitespace-nowrap lg:mb-2">Share</p>
                    <SocialShareButtons
                      shareText={lotteryConfig.share_text || 'Support education in Ghana and enter the GETFund Scholarship Lottery! Every donation gives you a chance to win.'}
                      shareUrl={typeof window !== 'undefined' ? `${window.location.origin}/fundraising-campaigns` : ''}
                      hashtags={lotteryConfig.share_hashtags || 'GETFund,EducationGhana,ScholarshipLottery'}
                      vertical={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Get in Touch Section */}
        <ContactSection />
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

// Lottery Prize Box Component - Modern Dark Theme
const LotteryPrizeBox: React.FC<{ prizes: LotteryConfig['prizes']; bannerColor: string; prizeBoxTitle?: string }> = ({ prizes, prizeBoxTitle }) => {
  const mainPrizes = prizes.filter(p => typeof p.rank === 'number');

  // Get prize by rank
  const getPrize = (rank: number) => mainPrizes.find(p => p.rank === rank);
  const firstPrize = getPrize(1);
  const secondPrize = getPrize(2);
  const thirdPrize = getPrize(3);

  // Prize card component with dark theme and metallic accents
  const PrizeCard: React.FC<{ prize: LotteryPrize; rank: 1 | 2 | 3 }> = ({ prize, rank }) => {
    const rankLabels = { 1: '1ST', 2: '2ND', 3: '3RD' };

    // Metallic accent colors and gradients
    const accentStyles = {
      1: {
        border: 'border-l-4 border-yellow-400',
        gradient: 'from-yellow-400 to-amber-500',
        text: 'text-yellow-400',
        glow: 'shadow-yellow-400/20',
      },
      2: {
        border: 'border-l-4 border-slate-300',
        gradient: 'from-slate-300 to-slate-400',
        text: 'text-slate-300',
        glow: 'shadow-slate-300/20',
      },
      3: {
        border: 'border-l-4 border-orange-400',
        gradient: 'from-orange-400 to-orange-600',
        text: 'text-orange-400',
        glow: 'shadow-orange-400/20',
      },
    };

    // Progressive sizing with explicit heights for FlipCard
    const sizeStyles = {
      1: { height: 'h-28 sm:h-32', padding: 'py-8', rankSize: 'text-3xl', amountSize: 'text-4xl sm:text-5xl' },
      2: { height: 'h-24 sm:h-28', padding: 'py-6', rankSize: 'text-2xl', amountSize: 'text-3xl sm:text-4xl' },
      3: { height: 'h-20 sm:h-24', padding: 'py-5', rankSize: 'text-xl', amountSize: 'text-2xl sm:text-3xl' },
    };

    const frontContent = (
      <div className={`${sizeStyles[rank].padding} px-5 sm:px-6 bg-gradient-to-r from-gray-800 to-gray-900 ${accentStyles[rank].border} rounded-lg flex items-center justify-between shadow-lg ${accentStyles[rank].glow} hover:shadow-xl transition-shadow duration-300`}>
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Rank badge */}
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${accentStyles[rank].gradient} flex items-center justify-center shadow-lg`}>
            <span className="text-gray-900 font-black text-sm sm:text-base">{rankLabels[rank]}</span>
          </div>
          <div>
            <span className={`${accentStyles[rank].text} font-semibold text-xs sm:text-sm uppercase tracking-widest`}>Prize</span>
          </div>
        </div>
        <div className={`${sizeStyles[rank].amountSize} font-bold text-white`}>
          <span className={`${accentStyles[rank].text}`}>GH₵</span>{prize.amount.toLocaleString()}
        </div>
      </div>
    );

    const backContent = prize.flip_description ? (
      <div className={`${sizeStyles[rank].padding} px-5 sm:px-6 bg-gradient-to-r ${accentStyles[rank].gradient} rounded-lg flex items-center justify-center text-center shadow-lg`}>
        <div>
          <div className="text-gray-900 font-black text-sm mb-1">{rankLabels[rank]} PRIZE</div>
          <p className="text-gray-900/80 text-sm leading-relaxed">{prize.flip_description}</p>
        </div>
      </div>
    ) : null;

    return (
      <FlipCard
        frontContent={frontContent}
        backContent={backContent}
        className={sizeStyles[rank].height}
      />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="relative px-8 py-6 border-b border-gray-200">
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {prizeBoxTitle || 'Monthly Scholarship Prizes'}
          </h3>
          <div className="mt-3 flex justify-center gap-1.5">
            <span className="w-10 h-1.5 bg-yellow-400 rounded-full"></span>
            <span className="w-10 h-1.5 bg-slate-400 rounded-full"></span>
            <span className="w-10 h-1.5 bg-orange-400 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Prizes stacked vertically */}
      <div className="p-6 sm:p-8 flex flex-col gap-4">
        {firstPrize && <PrizeCard prize={firstPrize} rank={1} />}
        {secondPrize && <PrizeCard prize={secondPrize} rank={2} />}
        {thirdPrize && <PrizeCard prize={thirdPrize} rank={3} />}
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
  // Step card front content
  const StepFront: React.FC<{ step: LotteryStep }> = ({ step }) => (
    <div className="flex items-start">
      <div className="bg-getfund-primary text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 mr-4 font-bold text-lg shadow-lg">
        {step.step}
      </div>
      <div className="flex-1">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{step.title}</h4>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
        {step.flip_description && (
          <span className="text-xs text-getfund-primary font-medium mt-1 block">Tap for more →</span>
        )}
      </div>
    </div>
  );

  // Step card back content
  const StepBack: React.FC<{ step: LotteryStep }> = ({ step }) => (
    <div className="bg-gradient-to-br from-getfund-primary to-green-700 rounded-lg p-4 h-full flex flex-col justify-center">
      <div className="flex items-center mb-2">
        <div className="bg-white/20 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 font-bold text-sm">
          {step.step}
        </div>
        <h4 className="text-base font-semibold text-white">{step.title}</h4>
      </div>
      <p className="text-sm text-white/90 leading-relaxed">{step.flip_description}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 flex flex-col border border-gray-100">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">How It Works</h3>

      <div className="space-y-5 sm:space-y-6 mb-8 flex-1">
        {steps.map((step, index) => (
          <FlipCard
            key={index}
            className="min-h-[80px]"
            frontContent={<StepFront step={step} />}
            backContent={step.flip_description ? <StepBack step={step} /> : null}
          />
        ))}
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 sm:p-5 mb-4">
        <div className="text-center mb-3">
          <span className="text-sm font-medium text-white/80">Time Until Next Draw</span>
        </div>
        <CountdownTimer targetDate={nextDrawDate} />
      </div>

      {/* Draw Info */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-5 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Next Draw</span>
          <span className="font-bold text-lg text-getfund-primary">
            {new Date(nextDrawDate).toLocaleDateString('en-GB', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
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
