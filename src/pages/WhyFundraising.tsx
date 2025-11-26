import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import DonationInterface from '../components/DonationInterface';
import ImpactStats from '../components/ImpactStats';
import ContactSection from '../components/ContactSection';

export default function WhyFundraising() {
  const scrollToDonation = () => {
    const element = document.getElementById('donation-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Why Fundraising? | GETFund</title>
        <meta
          name="description"
          content="Your support helps us expand access to quality education through infrastructure, scholarships, and partnerships that change lives."
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Why Fundraising?</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Your support helps us expand access to quality education through infrastructure, scholarships, and partnerships that change lives.
            </p>
            <button
              onClick={scrollToDonation}
              className="inline-block bg-getfund-gold text-white px-8 py-4 rounded-md font-semibold hover:bg-yellow-600 transition-colors text-lg"
            >
              Make a Donation
            </button>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              At the Ghana Education Trust Fund (GETFund), fundraising is a strategic pillar of our commitment to expanding access to quality education for all. While statutory allocations remain essential, the growing needs of schools, communities, and learners across the country call for broader partnerships, innovative financing models, and shared responsibility. Through purposeful resource mobilization from individuals, corporate partners, development agencies, and philanthropic organizations, GETFund strengthens and diversifies support for educational infrastructure, scholarships, teaching and learning resources, and other vital interventions. In this work, we are guided by a long-term ambition to drive sustainable education financing and foster impactful partnerships that advance equity, improve learning outcomes, and build a stronger future for Ghana.
            </p>
          </div>
        </section>

        {/* Impact Stats */}
        <ImpactStats />

        {/* Why Donate Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Donate to Us - Give with Confidence
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Imagine a brilliant young student in Ghana, eager to learn and full of potential. Now, imagine their classroom is the shade of a tree, or a room so crowded they can barely move. Imagine they have no textbook to read and no electricity to study by at night. For countless children, this is not imagination; it is their reality. Their dreams are put on hold simply because their families cannot afford the cost of education.
              </p>

              <p>
                The Ghana Education Trust Fund (GETFund) was created to rewrite this story. Your gift can become the four walls of a safe classroom, the desk a child can call their own, or the scholarship that turns a dream into a degree. Together, we can provide the tools and opportunities that allow these bright minds to grow and thrive.
              </p>

              <p>
                Your trust is our priority. GETFund is committed to the highest standards of accountability, with transparent financial systems and audited reports under government supervision. The impact of your generosity is clear to see in the schools, ICT labs, and libraries we have built, and in the success of the students we have sponsored. Help us empower the next generation, transforming education brick by brick, one child at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section id="donation-section" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Get Involved
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
              Every contribution, irrespective of the amount, brings us closer to ensuring that no child in Ghana is left behind because of inadequate facilities or financial barriers.
            </p>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Make Your Donation
              </h3>
              <DonationInterface />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
