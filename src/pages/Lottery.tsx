import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LoadingScreen from '../components/LoadingScreen';
import FloatingContact from '../components/FloatingContact';
import { FlipCard } from '../components/lottery/FlipCard';
import { CountdownTimer } from '../components/lottery/CountdownTimer';
import { SocialShareButtons } from '../components/lottery/SocialShareButtons';
import { cmsApi } from '../services/cmsApi';

interface LotteryPageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  intro: {
    paragraph: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
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
      description: 'Every GH₵10 donated automatically gives you one lottery entry. The more you give, the better your chances!'
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

// Default page content
const defaultPageContent: LotteryPageContent = {
  meta: {
    title: 'Scholarship Lottery | GETFund',
    description: 'Enter the GETFund Scholarship Lottery - every donation gives you a chance to win educational scholarships for yourself or loved ones.'
  },
  hero: {
    title: 'Scholarship Lottery',
    subtitle: 'Every contribution gives you a chance to win full scholarships while supporting education in Ghana'
  },
  intro: {
    paragraph: 'Every contribution to our campaigns automatically enters you into our monthly scholarship lottery. Win full scholarships for yourself or your loved ones while supporting education in Ghana.'
  }
};

export default function Lottery() {
  const [content, setContent] = useState<LotteryPageContent | null>(null);
  const [lotteryConfig, setLotteryConfig] = useState<LotteryConfig>(defaultLotteryConfig);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_CMS_API_URL || '/api';

    const fetchOptions = {
      cache: 'no-store' as RequestCache,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    };

    Promise.all([
      fetch(`${apiUrl}/lottery/config?_t=${Date.now()}`, fetchOptions)
        .then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .catch(err => {
          console.error('Failed to fetch lottery config:', err);
          return { config: null };
        }),
      cmsApi.getPageBySlug('lottery')
        .catch(err => {
          console.error('Failed to fetch page content:', err);
          return null;
        })
    ])
      .then(([lotteryData, pageData]) => {
        if (lotteryData.config) {
          setLotteryConfig(lotteryData.config);
        }

        // Process page content from CMS
        if (pageData && pageData.sections) {
          const section = pageData.sections.find((s: any) => s.section_type === 'page_content' && s.is_active);
          if (section?.content) {
            setContent(section.content as LotteryPageContent);
          } else {
            setContent(defaultPageContent);
          }
        } else {
          setContent(defaultPageContent);
        }

        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setContent(defaultPageContent);
        setIsLoading(false);
      });
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
        <title>{content.meta?.title || 'Scholarship Lottery | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || 'Enter the GETFund Scholarship Lottery'}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Page Title Section - Clean, minimal */}
        <section className="bg-white pt-8 pb-4">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Scholarship Lottery'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
            {content.intro?.paragraph && (
              <p className="text-gray-600 mt-4 max-w-3xl">
                {content.intro.paragraph}
              </p>
            )}
          </div>
        </section>

        {/* Featured Image Section - CMS Editable */}
        {content.featuredImage?.url && (
          <section className="py-6 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={content.featuredImage.url}
                  alt={content.featuredImage.alt || 'Scholarship Lottery'}
                  className="w-full h-auto object-cover"
                />
                {content.featuredImage.caption && (
                  <p className="text-sm text-gray-500 text-center py-3 bg-gray-50">
                    {content.featuredImage.caption}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Lottery Section */}
        <section className="py-8 sm:py-10 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto items-start">
              {/* Prize Box */}
              <LotteryPrizeBox
                prizes={lotteryConfig.prizes}
                bannerColor={lotteryConfig.banner_color}
                prizeBoxTitle={lotteryConfig.prize_box_title}
              />

              {/* How It Works + Share Section */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* How It Works */}
                <div className="flex-1">
                  <LotteryHowItWorks
                    steps={lotteryConfig.how_it_works_steps}
                    nextDrawDate={lotteryConfig.next_draw_date}
                    currentEntries={lotteryConfig.current_entries_count}
                    isActive={lotteryConfig.is_active}
                  />
                </div>

                {/* Social Sharing - Vertical */}
                {lotteryConfig.sharing_enabled !== false && (
                  <div className="flex lg:flex-col items-start gap-3 lg:gap-4 pt-2 lg:pt-0">
                    <SocialShareButtons
                      shareText={lotteryConfig.share_text || 'Support education in Ghana and enter the GETFund Scholarship Lottery! Every donation gives you a chance to win.'}
                      shareUrl={typeof window !== 'undefined' ? `${window.location.origin}/fundraising/lottery` : ''}
                      hashtags={lotteryConfig.share_hashtags || 'GETFund,EducationGhana,ScholarshipLottery'}
                      vertical={true}
                    />
                  </div>
                )}
              </div>
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

// Lottery Prize Box Component
const LotteryPrizeBox: React.FC<{ prizes: LotteryConfig['prizes']; bannerColor: string; prizeBoxTitle?: string }> = ({ prizes, prizeBoxTitle }) => {
  const mainPrizes = prizes.filter(p => typeof p.rank === 'number');

  const getPrize = (rank: number) => mainPrizes.find(p => p.rank === rank);
  const firstPrize = getPrize(1);
  const secondPrize = getPrize(2);
  const thirdPrize = getPrize(3);

  const PrizeCard: React.FC<{ prize: LotteryPrize; rank: 1 | 2 | 3 }> = ({ prize, rank }) => {
    const styles = {
      1: {
        bg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
        border: 'border-l-4 border-yellow-400',
        badge: 'bg-yellow-400 text-yellow-900',
        amount: 'text-gray-900',
        backBg: 'bg-yellow-400',
      },
      2: {
        bg: 'bg-gradient-to-r from-gray-50 to-slate-100',
        border: 'border-l-4 border-gray-400',
        badge: 'bg-gray-400 text-white',
        amount: 'text-gray-900',
        backBg: 'bg-gray-400',
      },
      3: {
        bg: 'bg-gradient-to-r from-orange-50 to-amber-50',
        border: 'border-l-4 border-orange-400',
        badge: 'bg-orange-400 text-white',
        amount: 'text-gray-900',
        backBg: 'bg-orange-400',
      },
    };

    const frontContent = (
      <div className={`${styles[rank].bg} ${styles[rank].border} rounded-lg p-4 sm:p-5 flex items-center justify-between h-full`}>
        <div className="flex items-center gap-3">
          <span className={`${styles[rank].badge} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold`}>
            {rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'}
          </span>
          <span className="text-gray-500 font-medium text-sm sm:text-base">Prize</span>
        </div>
        <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${styles[rank].amount}`}>
          GH₵{prize.amount.toLocaleString()}
        </span>
      </div>
    );

    const backContent = prize.flip_description ? (
      <div className={`${styles[rank].backBg} rounded-lg p-4 sm:p-5 flex items-center justify-center text-center h-full`}>
        <div>
          <div className="text-white font-bold text-sm mb-1">{rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'} Prize</div>
          <p className="text-white/90 text-sm">{prize.flip_description}</p>
        </div>
      </div>
    ) : null;

    return (
      <FlipCard
        frontContent={frontContent}
        backContent={backContent}
        className="h-20 sm:h-24"
      />
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5" style={{ backgroundColor: '#2a3f75' }}>
        <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
          {prizeBoxTitle || 'Prizes'}
        </h3>
      </div>

      {/* Prizes */}
      <div className="p-5 space-y-3">
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
  isActive: boolean;
}> = ({ steps, nextDrawDate, currentEntries, isActive }) => {
  const StepFront: React.FC<{ step: LotteryStep }> = ({ step }) => (
    <div className="flex items-start">
      <div className="text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 mr-4 font-bold text-lg shadow-lg" style={{ backgroundColor: '#2a3f75' }}>
        {step.step}
      </div>
      <div className="flex-1">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{step.title}</h4>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{step.description}</p>
        {step.flip_description && (
          <span className="text-xs font-medium mt-1 block" style={{ color: '#2a3f75' }}>Tap for more →</span>
        )}
      </div>
    </div>
  );

  const StepBack: React.FC<{ step: LotteryStep }> = ({ step }) => (
    <div className="rounded-lg p-4 h-full flex flex-col justify-center" style={{ backgroundColor: '#2a3f75' }}>
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
    <div className="glass-card rounded-xl p-6 sm:p-8 flex flex-col">
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
      <div className="bg-gray-900 rounded-lg p-4 sm:p-5 mb-4">
        <div className="text-center mb-3">
          <span className="text-sm font-medium text-white/80">Time Until Next Draw</span>
        </div>
        <CountdownTimer targetDate={nextDrawDate} />
      </div>

      {/* Draw Info */}
      <div className="glass-solid rounded-lg p-4 sm:p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Next Draw</span>
          <span className="font-bold text-lg" style={{ color: '#2a3f75' }}>
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

      {isActive ? (
        <button
          onClick={() => window.location.href = '/fundraising/ways-to-donate'}
          className="w-full text-white py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90"
          style={{ backgroundColor: '#1e3a5f' }}
        >
          Participate Now - Donate & Enter
        </button>
      ) : (
        <div className="text-center">
          <div className="bg-gray-100 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">Lottery Closed</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              This lottery draw has ended. Stay tuned for the next one!
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/fundraising/ways-to-donate'}
            className="w-full text-white py-3 rounded-lg font-medium text-sm transition-all duration-300 opacity-80 hover:opacity-100"
            style={{ backgroundColor: '#6b7280' }}
          >
            Support Education (No Lottery Entry)
          </button>
        </div>
      )}
    </div>
  );
};
