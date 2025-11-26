import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function BeneficiariesGiveBack() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>GETFund Beneficiaries - Give Back | GETFund</title>
        <meta
          name="description"
          content="To All GETFund Beneficiaries – Give Back, Build Forward"
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">GETFund Beneficiaries</h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              To All GETFund Beneficiaries – Give Back, Build Forward
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <p>
                If GETFund played a part in your educational journey, you are part of a powerful story of opportunity and impact. Today, you have the chance to extend that same opportunity to others. By giving back, you help us continue building classrooms, funding scholarships, and supporting students whose dreams depend on access to quality education.
              </p>

              <p>
                Your contribution, no matter the amount, ensures that the support you once received continues to transform lives across Ghana. Together, we can keep the cycle of empowerment alive and invest in the future of the next generation.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                to="/fundraising/ways-to-donate"
                className="inline-block bg-getfund-gold text-white px-12 py-4 rounded-md font-semibold hover:bg-yellow-600 transition-colors text-lg"
              >
                Make a Donation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
