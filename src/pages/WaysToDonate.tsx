import { BannerBackground } from '../types/bannerBackground';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import PageBanner from '../components/PageBanner';
import DonationInterface from '../components/DonationInterface';
import PledgeToSupportForm from '../components/PledgeToSupportForm';
import ContactSection from '../components/ContactSection';
import DonationCard from '../components/DonationCard';
import DonationModal from '../components/DonationModal';
import { cmsApi } from '../services/cmsApi';

interface PresetAmount {
  value: number;
  label: string;
}

interface DonationOption {
  title: string;
  description: string;
  buttonText: string;
  presetAmounts?: PresetAmount[];
}


interface WaysToDonateContent {
  bannerBackground?: BannerBackground;
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

export default function WaysToDonate() {
  const [content, setContent] = useState<WaysToDonateContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<{
    title: string;
    amount: number;
    description: string;
    presetAmounts?: PresetAmount[];
  } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const page = await cmsApi.getPageBySlug('ways-to-donate');
        const section = page.sections?.find(s => s.section_type === 'page_content');
        if (section?.content) {
          setContent(section.content as WaysToDonateContent);
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-getfund-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
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

      <main className="flex-1">
        <PageBanner
          title={content.hero?.title || 'Ways to Donate'}
          subtitle={content.hero?.subtitle || "Investing in Education. Building Ghana's Tomorrow."}
          bannerBackground={content.bannerBackground}
          defaultGradient="linear-gradient(to right, #DC143C, #2563EB)"
        />

        {/* Impact Visualized - TOP LEFT */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-6 inline-block">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Impact Visualized</h3>
                <div className="flex gap-8">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Raised</div>
                    <div className="text-3xl font-bold text-getfund-primary">
                      {content.impactVisualized?.totalRaised || 'GH₵ [TBD]'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Donations</div>
                    <div className="text-3xl font-bold text-getfund-gold">
                      {content.impactVisualized?.totalDonations || '[TBD]'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split Card: Donation Interface + Pledge to Support */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left: Donation Interface */}
              <DonationInterface />

              {/* Right: Pledge to Support Form */}
              <PledgeToSupportForm />
            </div>
          </div>
        </section>

        {/* Donation Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              There are many ways you can donate and support:
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {(content.donationOptions || []).map((option, index) => (
                <DonationCard
                  key={index}
                  {...option}
                  buttonAction={() => {
                    setSelectedDonation({
                      title: option.title,
                      amount: donationAmounts[option.title] || 5000,
                      description: option.description,
                      presetAmounts: option.presetAmounts,
                    });
                    setModalOpen(true);
                  }}
                />
              ))}
            </div>
            
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
              />
            )}
          </div>
        </section>

        {/* Other Ways of Donating */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.otherWays?.heading}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {content.otherWays?.cheque?.title}
                </h3>
                <p className="text-gray-700">{content.otherWays?.cheque?.description}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {content.otherWays?.mobileMoney?.title}
                </h3>
                <p className="text-gray-700">{content.otherWays?.mobileMoney?.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Give with Confidence */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.giveWithConfidence?.heading}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {content.giveWithConfidence?.description}
            </p>
          </div>
        </section>

        {/* Contact Section - HARDCODED COMPONENT */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
