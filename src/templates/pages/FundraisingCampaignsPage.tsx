import React, { useEffect, useState } from 'react';
import { Gift, Calendar, TrendingUp, Award, DollarSign } from 'lucide-react';

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
  section_title?: string;
  section_description?: string;
  prize_box_title?: string;
}

interface FundraisingCampaignsPageProps {
  pageData: {
    title: string;
    meta_title?: string;
    meta_description?: string;
  };
  content: {
    heroTitle?: string;
    heroSubtitle?: string;
    featuredCampaignsTitle?: string;
    lotteryTitle?: string;
    lotterySubtitle?: string;
  };
}

export const FundraisingCampaignsPage: React.FC<FundraisingCampaignsPageProps> = ({ pageData, content }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [lotteryConfig, setLotteryConfig] = useState<LotteryConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CMS_API_URL || 'http://localhost:5000/api';

    Promise.all([
      fetch(`${apiUrl}/campaigns?featured=true`).then(r => r.json()),
      fetch(`${apiUrl}/lottery/config`).then(r => r.json())
    ])
      .then(([campaignsData, lotteryData]) => {
        setCampaigns(campaignsData.campaigns || []);
        setLotteryConfig(lotteryData.config);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setError('Failed to load fundraising data. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-8">
            <img
              src="/images/logos/getfund-cropped-icon.png"
              alt="Loading..."
              className="w-full h-full object-contain animate-spin-slow"
            />
          </div>
          <p className="text-gray-700 text-xl font-semibold">Loading fundraising campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fundraising-campaigns-page">
      {/* Hero Section */}
      <section className="relative bg-getfund-primary text-white pt-24 pb-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Gift className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {content.heroTitle || 'Fundraising Campaigns'}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-red-100 leading-relaxed max-w-3xl mx-auto">
              {content.heroSubtitle || 'Join thousands of Ghanaians making a difference through our targeted fundraising campaigns. Every contribution counts towards building a better educational future.'}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.featuredCampaignsTitle || 'Featured Fundraising Campaigns'}
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

          {campaigns.length > 3 && (
            <div className="text-center mt-10 sm:mt-12">
              <a
                href="/fundraising/all-campaigns"
                className="inline-block bg-getfund-gold hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                View All Campaigns
              </a>
            </div>
          )}
        </div>
      </section>

      {/* GETfund Scholarship Lottery Section */}
      {lotteryConfig && lotteryConfig.is_active && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {lotteryConfig.section_title || content.lotteryTitle || 'GETfund Scholarship Lottery'}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
                {lotteryConfig.section_description || content.lotterySubtitle || 'Every contribution to our campaigns automatically enters you into our monthly scholarship lottery. Win full scholarships for yourself or your loved ones while supporting education in Ghana.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Prize Box */}
              <LotteryPrizeBox prizes={lotteryConfig.prizes} bannerColor={lotteryConfig.banner_color} prizeBoxTitle={lotteryConfig.prize_box_title} />

              {/* How It Works */}
              <LotteryHowItWorks
                steps={lotteryConfig.how_it_works_steps}
                nextDrawDate={lotteryConfig.next_draw_date}
                currentEntries={lotteryConfig.current_entries_count}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Campaign Card Component
const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
  const daysLeft = campaign.days_left;
  const percentageFunded = Math.min(campaign.percentage_funded || 0, 100);
  const currencySymbol = campaign.currency === 'GHS' ? '₵' : campaign.currency === 'USD' ? '$' : '€';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      {campaign.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={campaign.image_url}
            alt={campaign.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30"></div>
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
            <span className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {campaign.title}
        </h3>

        <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3 flex-1">
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
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-getfund-primary h-3 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${percentageFunded}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Goal: {currencySymbol}{campaign.goal_amount.toLocaleString()}
          </div>
        </div>

        <button
          onClick={() => window.location.href = `/fundraising/campaigns/${campaign.slug}`}
          className="w-full bg-getfund-gold hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center"
        >
          <DollarSign className="w-5 h-5 mr-2" />
          {campaign.button_text || 'Donate Now'}
        </button>
      </div>
    </div>
  );
};

// Lottery Prize Box Component
const LotteryPrizeBox: React.FC<{ prizes: LotteryConfig['prizes']; bannerColor: string; prizeBoxTitle?: string }> = ({ prizes, bannerColor, prizeBoxTitle }) => {
  const mainPrizes = prizes.filter(p => typeof p.rank === 'number');
  const additionalPrizes = prizes.filter(p => p.rank === 'additional');

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 border-t-4" style={{ borderTopColor: bannerColor }}>
      <div className="text-center mb-6 sm:mb-8">
        <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 animate-bounce" style={{ color: bannerColor }} />
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{prizeBoxTitle || "This Month's Lottery Prizes"}</h3>
        <p className="text-sm text-gray-600 mt-2">Support education and win amazing scholarships</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {mainPrizes.map((prize, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                {getOrdinal(prize.rank as number)} Prize
              </div>
              <div className="font-semibold text-sm sm:text-base text-gray-900">{prize.description}</div>
            </div>
            <div className="text-xl sm:text-2xl font-bold" style={{ color: bannerColor }}>
              {prize.currency === 'GHS' ? '₵' : prize.currency === 'USD' ? '$' : '€'}
              {prize.amount.toLocaleString()}
            </div>
          </div>
        ))}

        {additionalPrizes.map((prize, index) => (
          <div key={`add-${index}`} className="p-3 sm:p-4 rounded-lg text-center" style={{ backgroundColor: `${bannerColor}20` }}>
            <div className="text-base sm:text-lg font-semibold text-gray-900">
              Plus {prize.count} additional prizes of{' '}
              {prize.currency === 'GHS' ? '₵' : prize.currency === 'USD' ? '$' : '€'}
              {prize.amount.toLocaleString()} each!
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
    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 flex flex-col">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">How It Works</h3>

      <div className="space-y-5 sm:space-y-6 mb-8 flex-1">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div className="bg-getfund-primary text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 mr-4 font-bold text-lg shadow-lg">
              {step.step}
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{step.title}</h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Draw Info */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-5 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Next Draw:</span>
          <span className="font-bold text-base sm:text-lg text-getfund-primary">
            {new Date(nextDrawDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Current Entries:</span>
          <span className="font-bold text-base sm:text-lg text-getfund-gold">
            {currentEntries?.toLocaleString() || 0}
          </span>
        </div>
      </div>

      <button
        onClick={() => (window.location.href = '/fundraising/campaigns')}
        className="w-full bg-getfund-primary hover:bg-red-700 text-white py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Participate Now - Donate & Enter
      </button>
    </div>
  );
};

// Helper function
const getOrdinal = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
