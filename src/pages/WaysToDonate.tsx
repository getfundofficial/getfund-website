import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, ArrowRight, TrendingUp, Users, ChevronLeft, ChevronRight, CheckCircle, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import DonationInterface from '../components/DonationInterface';
import PledgeToSupportForm from '../components/PledgeToSupportForm';
import FloatingContact from '../components/FloatingContact';
import DonationModal from '../components/DonationModal';
import LoadingScreen from '../components/LoadingScreen';
import OptimizedImage from '../components/OptimizedImage';
import { cmsApi } from '../services/cmsApi';
import { paymentService } from '../services/paymentService';

interface PresetAmount {
  value: number;
  label: string;
}

interface DonationOption {
  title: string;
  description: string;
  buttonText: string;
  image?: string;
  presetAmounts?: PresetAmount[];
}


interface WaysToDonateContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  impactVisualized?: {
    totalRaised: string;
    totalDonations: string;
  };
  donationOptions: DonationOption[];
  otherWays: {
    heading: string;
    cheque: {
      title: string;
      description: string;
    };
    mobileMoney: {
      title: string;
      description: string;
    };
  };
  giveWithConfidence: {
    heading: string;
    description: string;
  };
}

// Donation amounts in GHC for each option
const donationAmounts: Record<string, number> = {
  'Classroom construction support': 50000,
  'Student Scholarship (Local)': 5000,
  'Student Scholarship (International)': 20000,
  'School Meals': 1000,
  'Classroom Furniture': 3000,
  'Learning Materials': 2000,
  'ICT & Digital Learning Tools': 10000,
  'School Sanitation & Water Access': 15000,
};

// Default images for donation options
const defaultDonationImages: Record<string, string> = {
  'Classroom construction support': '/images/hero/main-slider-1.jpg',
  'Student Scholarship (Local)': '/images/hero/main-slider-2.jpg',
  'Student Scholarship (International)': '/images/hero/main-slider-3.jpg',
  'School Meals': '/images/hero/main-slider-1.jpg',
  'Classroom Furniture': '/images/hero/main-slider-2.jpg',
  'Learning Materials': '/images/hero/main-slider-3.jpg',
  'ICT & Digital Learning Tools': '/images/hero/main-slider-1.jpg',
  'School Sanitation & Water Access': '/images/hero/main-slider-2.jpg',
};

// Impact Slider Component
interface ImpactSliderProps {
  donationOptions: DonationOption[];
  impactVisualized?: {
    totalRaised: string;
    totalDonations: string;
  };
  donationAmounts: Record<string, number>;
  onSelectDonation: (option: DonationOption) => void;
}

function ImpactSlider({ donationOptions, impactVisualized, onSelectDonation }: ImpactSliderProps) {
  const sliderRef = useRef<Slider>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '30px',
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Impact Visualized Stats */}
        {impactVisualized && (
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 63, 117, 0.15)' }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#2a3f75' }} />
              </div>
              <div>
                <span className="text-2xl font-bold" style={{ color: '#2a3f75' }}>
                  {impactVisualized.totalRaised}
                </span>
                <span className="text-gray-500 text-xs ml-2">Total Raised</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 63, 117, 0.15)' }}>
                <Users className="w-5 h-5" style={{ color: '#2a3f75' }} />
              </div>
              <div>
                <span className="text-2xl font-bold" style={{ color: '#2a3f75' }}>
                  {impactVisualized.totalDonations}
                </span>
                <span className="text-gray-500 text-xs ml-2">Donations</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Choose How You Want to Make an Impact
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a cause that resonates with you and directly support education in Ghana.
          </p>
        </div>

        {/* 3D Perspective Slider */}
        <div className="relative impact-slider-container">
          <style>{`
            .impact-slider-container .slick-slide {
              transition: all 0.4s ease;
              opacity: 0.6;
              transform: scale(0.85);
              filter: brightness(0.7);
            }
            .impact-slider-container .slick-slide.slick-center,
            .impact-slider-container .slick-slide.slick-current {
              opacity: 1;
              transform: scale(1);
              filter: brightness(1);
              z-index: 10;
            }
            .impact-slider-container .slick-list {
              overflow: visible;
              padding: 40px 0 !important;
            }
            .impact-slider-container .slick-track {
              display: flex;
              align-items: center;
            }
          `}</style>

          {/* Navigation Arrows */}
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center hover:bg-white transition-all duration-300"
            style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#2a3f75' }} />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center hover:bg-white transition-all duration-300"
            style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: '#2a3f75' }} />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {donationOptions.map((option, index) => {
              const imageSrc = option.image || defaultDonationImages[option.title] || '/images/hero/main-slider-1.jpg';
              console.log(`[ImpactSlider] Rendering option ${index}:`, {
                title: option.title,
                optionImage: option.image,
                defaultImage: defaultDonationImages[option.title],
                finalSrc: imageSrc
              });
              return (
              <div key={index} className="px-3">
                <div
                  className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                  onClick={() => onSelectDonation(option)}
                >
                  {/* Background Image */}
                  <OptimizedImage
                    src={imageSrc}
                    alt={option.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackSrc="/images/hero/main-slider-1.jpg"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

                  {/* Centered Title and Description */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-base md:text-lg lg:text-xl font-bold text-center leading-tight tracking-wide uppercase drop-shadow-lg mb-2">
                      {option.title}
                    </h3>
                    {option.description && (
                      <p className="text-white/90 text-xs md:text-sm text-center max-w-[200px] drop-shadow-md">
                        {option.description}
                      </p>
                    )}
                  </div>
                  {/* Button at bottom */}
                  <div className="absolute bottom-[65px] left-0 right-0 flex justify-center">
                    <button
                      className="px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: '#2a3f75',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(42, 63, 117, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {option.buttonText || 'Donate Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </Slider>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {donationOptions.map((_, index) => (
              <button
                key={index}
                onClick={() => sliderRef.current?.slickGoTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? 'w-8 bg-[#2a3f75]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WaysToDonate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState<WaysToDonateContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<{
    title: string;
    amount: number;
    description: string;
    presetAmounts?: PresetAmount[];
  } | null>(null);

  // Check for payment success on mount
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const reference = searchParams.get('reference');

    if (paymentStatus === 'success' && reference) {
      setShowPaymentSuccess(true);
      setPaymentReference(reference);

      // Call verification API to update donation status in database
      paymentService.verifyPayment(reference)
        .then(result => {
          console.log('[WaysToDonate] Payment verification result:', result);
        })
        .catch(err => {
          console.error('[WaysToDonate] Payment verification error:', err);
        });

      // Clear the query params from URL after reading them
      searchParams.delete('payment');
      searchParams.delete('reference');
      searchParams.delete('test');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('ways-to-donate');
        console.log('[WaysToDonate] Fetched page:', page);
        const section = page.sections?.find(s => s.section_type === 'page_content');
        console.log('[WaysToDonate] Found section:', section);
        if (section?.content) {
          const typedContent = section.content as WaysToDonateContent;
          console.log('[WaysToDonate] Donation options:', typedContent.donationOptions);
          typedContent.donationOptions?.forEach((opt, i) => {
            console.log(`[WaysToDonate] Option ${i} image:`, opt.image);
          });
          setContent(typedContent);
        }
      } catch (error) {
        console.error('Failed to load page content:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
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
        <title>{content.meta?.title || 'Ways to Donate | GETFund'}</title>
        <meta
          name="description"
          content={content.meta?.description || "Investing in Education. Building Ghana's Tomorrow."}
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      {/* Payment Success Banner */}
      {showPaymentSuccess && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-800 mb-1">Thank you for your generous donation!</h3>
                  <p className="text-green-700 mb-3">
                    Your payment has been processed successfully. Your contribution will help transform education in Ghana.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {paymentReference && (
                      <div className="bg-white/70 px-3 py-1.5 rounded-lg">
                        <span className="text-gray-600">Reference:</span>{' '}
                        <span className="font-mono font-semibold text-green-800">{paymentReference}</span>
                      </div>
                    )}
                    <div className="bg-white/70 px-3 py-1.5 rounded-lg">
                      <span className="text-gray-600">Status:</span>{' '}
                      <span className="font-semibold text-green-800">Completed</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-3">
                    A confirmation email will be sent to your email address shortly.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentSuccess(false)}
                className="p-2 hover:bg-green-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Page Title Section */}
        <section className="bg-white pt-8 pb-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {content.hero?.title || 'Ways to Donate'}
            </h1>
            <div className="w-16 h-1" style={{ backgroundColor: '#2a3f75' }} />
            {content.hero?.subtitle && (
              <p className="text-gray-600 mt-4 max-w-3xl">
                {content.hero.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Impact Slider Section */}
        {(content.donationOptions || []).length > 0 && (
          <ImpactSlider
            donationOptions={content.donationOptions}
            impactVisualized={content.impactVisualized}
            donationAmounts={donationAmounts}
            onSelectDonation={(option) => {
              setSelectedDonation({
                title: option.title,
                amount: donationAmounts[option.title] || 5000,
                description: option.description,
                presetAmounts: option.presetAmounts,
              });
              setModalOpen(true);
            }}
          />
        )}

        {selectedDonation && (
          <DonationModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedDonation(null);
            }}
            title={selectedDonation.title}
            amount={selectedDonation.amount}
            description={selectedDonation.description}
            presetAmounts={selectedDonation.presetAmounts}
            donationType="impact"
          />
        )}

        {/* Main Donation Section - Donation Interface + Pledge Side by Side */}
        <section className="py-10" style={{ backgroundColor: 'rgba(42, 63, 117, 0.03)' }}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Make a Direct Donation
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm">
                Give a one-time or recurring donation to support GETFund's mission.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
              {/* Left: Donation Interface */}
              <DonationInterface />

              {/* Right: Pledge to Support Form */}
              <PledgeToSupportForm />
            </div>

            {/* Other Ways to Donate - Text below both cards */}
            <div className="mt-6 space-y-3 max-w-4xl mx-auto">
              <h3 className="text-base font-semibold text-gray-900">
                {content.otherWays?.heading || 'Other Ways to Give'}
              </h3>
              <div className="space-y-2 text-gray-600 text-sm leading-relaxed">
                <p>
                  <span className="font-medium text-gray-900">{content.otherWays?.cheque?.title || 'Bank Transfer'}:</span>{' '}
                  {content.otherWays?.cheque?.description}
                </p>
                <p>
                  <span className="font-medium text-gray-900">{content.otherWays?.mobileMoney?.title || 'Mobile Money'}:</span>{' '}
                  {content.otherWays?.mobileMoney?.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 63, 117, 0.1)' }}>
                <Shield className="w-6 h-6" style={{ color: '#2a3f75' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {content.giveWithConfidence?.heading || 'Give with Confidence'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {content.giveWithConfidence?.description || 'Your donation is secure and goes directly to supporting education in Ghana.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16" style={{ backgroundColor: '#1e3a5f' }}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Every donation, no matter the size, helps transform education in Ghana. Join thousands of donors who are building a brighter future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/fundraising-campaigns"
                className="inline-flex items-center gap-2 bg-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                style={{ color: '#1e3a5f' }}
              >
                View Campaigns
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/fundraising/partnerships"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
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
