import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ContactSection from '../components/ContactSection';

export default function Partnerships() {
  const partnershipWays = [
    'Infrastructure sponsorship',
    'Scholarships',
    'In-kind contributions',
    'Uniforms',
    'Stationary & books',
    'Laptops',
    'Furniture',
    'Feeding',
  ];

  const benefits = [
    {
      title: 'Tax and Financial Incentives:',
      description:
        'The Ghana Revenue Authority (GRA) has, in a written communication to GETFund, agreed that companies that invest in projects proposed by us through their Corporate Social Responsibility (CSR) budgets shall be entitled to claim a tax deduction equivalent to the amount of the contribution or donation made.',
    },
    {
      title: 'Enhanced Corporate Social Responsibility (CSR) Profile:',
      description:
        "One's contribution will position them to be a champion of education and community development in Ghana, strengthening your brand reputation locally and globally.",
    },
    {
      title: 'Community Goodwill and Brand Visibility:',
      description:
        "Partners' logo and name will be prominently featured on project sites, promotional materials, websites, and media campaigns, reaching thousands of stakeholders, including government officials, educators, and community members.",
    },
    {
      title: 'Positive Impact on Future Workforce:',
      description:
        "By supporting education, you invest in creating a skilled, educated workforce that can contribute to Ghana's economic growth, potentially benefiting your industry.",
    },
    {
      title: 'Long-term Partnership Opportunities:',
      description:
        'Opens doors for future engagements with GETFund and other governmental and non-governmental organizations in Ghana.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Partnerships | GETFund</title>
        <meta
          name="description"
          content="Partner with GETFund to transform education in Ghana"
        />
      </Helmet>

      <Header />
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-getfund-primary to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Partnerships with GETFund
            </h1>
          </div>
        </section>

        {/* Intro Paragraph */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              Partnering with the Ghana Education Trust Fund (GETFund), whether as a local business, international organization, or individual donor, you become part of a national effort to transform education in Ghana. Your support helps us build quality infrastructure, fund scholarships for underserved students, and equip schools and technical institutions with the tools they need to deliver world-class learning experiences. Together, we are bridging gaps in access, improving educational quality, and ensuring that every student, regardless of their background, can thrive.
            </p>
          </div>
        </section>

        {/* Ways to Partner */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Ways to partner
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnershipWays.map((way, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <p className="text-lg font-semibold text-gray-900">{way}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Support Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Why support us?
            </h2>

            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-getfund-primary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Partners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Partners
            </h2>

            <div className="bg-white p-12 rounded-lg shadow-md">
              <p className="text-center text-gray-600">
                (display logos of partners. Click-through functionality takes you to articles on the partnership)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                {/* Placeholder for partner logos */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-gray-400">Partner {i}</span>
                  </div>
                ))}
              </div>
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
