import { Target, Eye, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function WhoWeAre() {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-getfund-primary via-red-800 to-red-900 text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              About Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 leading-relaxed">
              Supporting the delivery of quality education to Ghanaians from basic to tertiary level
            </p>
          </div>
        </div>
      </section>

      <main className="py-20">
        <div className="container mx-auto px-4">
          {/* Since 2000 Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/images/about/getfund-7th-board-inauguration.jpg"
                  alt="GETFund Inauguration - 7th Board"
                  className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ghana Education Trust Fund
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold text-getfund-red mb-4">
                  Since its establishment in the year 2000,
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The fund has remained committed to its mandate espouse in its governing legislation, 
                  the GETFund Act (Act 581), to provide funding to supplement government effort for the 
                  provision of educational infrastructure and facilities with the public sector.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  GETFund has played a significant role in this country's education sector not only by 
                  way of physical infrastructure, but also through the enhancement of our human capital 
                  by way of scholarships.
                </p>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-red-800" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become a trusted public sector educational financing agency that sustainably 
                  manages assigned government resources
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-getfund-gold" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To support the delivery of quality education to Ghanaians from the basic to tertiary 
                  level through dynamic funding policies aimed at ensuring equitable provision of essential 
                  resources for all levels of education
                </p>
              </div>

              

              <div className="text-center">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-orange-800" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrity, transparency, excellence, and commitment to transforming lives through education
                </p>
              </div>
            </div>
          </section>

          {/* Educational Financing History */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12 rounded-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">The Issue of Educational Financing</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-getfund-red mb-4">The Cost Sharing Policy</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In Ghana, like most African countries, due to government's inability to finance 
                    tertiary education wholly, the idea of cost sharing was introduced in 1997 through 
                    the adoption of the Akosombo Accord (NCTE, 1998). This idea of cost sharing divided 
                    responsibility for university funding between the government (responsible for 70 percent 
                    of total funding) and 30 percent from three other sources including internal 
                    revenue-generation by the university, private donations and students‟ tuition fees.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-getfund-red mb-4">Public Response & Agitation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    However, the introduction of cost sharing policies in the country yielded negative 
                    response from the public. The policy was not only politicized and attacked by 
                    Ghanaians but it also created severe inequalities making higher education the preserve 
                    of the socially privileged (Atuahene, 2006).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Funding Formula */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Funding Formula</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The law further stipulates that some crucial factors related to Education delivery 
                and development are taken into account in the process of preparing this Formula. 
                These relevant factors are:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-getfund-gold mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">promotion of the study of Mathematics, Science and Technology;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-getfund-gold mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">advancement of female education;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-getfund-gold mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">reduction in the high level of illiteracy in historically disadvantaged areas;</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-getfund-gold mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">promotion Vocational and Technical Education and Training; and,</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-getfund-gold mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">equitable allocation of funds to the Districts at the Pre-Tertiary level of education.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Leadership & Governance Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership & Governance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strong leadership and transparent governance driving our educational transformation mission
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/about/getfund-7th-board-inauguration.jpg"
                    alt="GETFund Board Inauguration"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Committed Board of Directors
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our distinguished board members bring decades of experience in education, finance, 
                  and public administration to guide GETFund's strategic direction and ensure 
                  accountability in all our initiatives.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-getfund-red rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Strategic Oversight</h4>
                      <p className="text-gray-600">Ensuring alignment with national education priorities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-getfund-gold rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Performance Monitoring</h4>
                      <p className="text-gray-600">Tracking impact and ensuring efficient resource utilization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Stakeholder Engagement</h4>
                      <p className="text-gray-600">Building partnerships across all education sectors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Supporting the delivery of quality education.
            </h2>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-getfund-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Watch video</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}