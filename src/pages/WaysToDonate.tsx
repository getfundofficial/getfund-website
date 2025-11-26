import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import DonationInterface from '../components/DonationInterface';
import ImpactStats from '../components/ImpactStats';
import ContactSection from '../components/ContactSection';
import DonationCard from '../components/DonationCard';

export default function WaysToDonate() {
  const donationOptions = [
    {
      title: 'Classroom construction support',
      description:
        'Imagine children clustered under a leaking roof, or found under trees, rain soaking their notebooks. Your gift builds a bright, safe classroom where dreams can finally take root.',
      buttonText: 'Build a Classroom',
    },
    {
      title: 'Student Scholarship (Local)',
      description:
        'She\'s brilliant, but poverty whispers "quit" every day. Your support silences that voice and hands her the key to a university degree.',
      buttonText: 'Sponsor a Student',
    },
    {
      title: 'Student Scholarship (International)',
      description:
        'He dreams of studying abroad, yet the cost feels like a locked door; your kindness swings it wide open for a life-changing opportunity.',
      buttonText: 'Sponsor a Student',
    },
    {
      title: 'School Meals',
      description:
        'An empty stomach steals focus and hope. Your meal fills a hungry child with energy, joy, and the promise of a brighter tomorrow.',
      buttonText: 'Provide a School Meal',
    },
    {
      title: 'Classroom Furniture',
      description:
        'Picture kids sitting on bare floors with aching backs. Your desks and chairs give them comfort, dignity, and the simple joy of learning with pride.',
      buttonText: 'Buy a desk',
    },
    {
      title: 'Learning Materials',
      description:
        'Without books, a teacher\'s voice fades into silence. Your textbooks ignite curiosity and turn "I can\'t" into "I will!".',
      buttonText: 'Give Learning Materials',
    },
    {
      title: 'ICT & Digital Learning Tools',
      description:
        'In a world racing ahead, these children risk being left behind. Your computers and tablets connect them to endless possibilities.',
      buttonText: 'Support ICT Learning',
    },
    {
      title: 'School Sanitation & Water Access',
      description:
        'No clean water, no safe toilet, girls miss school, dignity crumbles. Your gift brings flowing water and hope that keeps every child in class.',
      buttonText: 'Provide Clean Water',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Ways to Donate | GETFund</title>
        <meta
          name="description"
          content="Investing in Education. Building Ghana's Tomorrow."
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Investing in Education. Building Ghana's Tomorrow.
            </h1>
            <p className="text-lg md:text-xl leading-relaxed">
              The Ghana Education Trust Fund (GETFund) is committed to advancing education through sustainable investment in infrastructure and human capital. From modern school infrastructure to life-changing scholarships, your generosity strengthens the foundation of learning for generations to come. With every gift, you help transform potential into progress - and ensure every child has a place to learn and a chance to thrive.
            </p>
          </div>
        </section>

        {/* Donation Interface & Impact Visualized */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Donation Interface */}
              <div>
                <DonationInterface />
              </div>

              {/* Impact Visualized */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Impact Visualized</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Raised</div>
                    <div className="text-4xl font-bold text-getfund-primary">GH₵ [TBD]</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Total Donations</div>
                    <div className="text-4xl font-bold text-getfund-gold">[TBD]</div>
                  </div>
                </div>
              </div>
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
              {donationOptions.map((option, index) => (
                <DonationCard key={index} {...option} />
              ))}
            </div>
          </div>
        </section>

        {/* Other Ways of Donating */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Other ways of donating
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Send a Cheque</h3>
                <p className="text-gray-700">(mailing instructions to be included)</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Donate with Mobile Money</h3>
                <p className="text-gray-700">(shortcode, networks, etc)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <ImpactStats />

        {/* Give with Confidence */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Give with Confidence
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Your trust is our priority. GETFund is committed to the highest standards of accountability, with transparent financial systems and audited reports under government supervision. The impact of your generosity is evident in the schools, ICT labs, and libraries we have built, as well as in the success of the students we have sponsored. Help us empower the next generation, transforming education brick by brick, one child at a time.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
