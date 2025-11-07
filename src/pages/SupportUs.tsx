import { Heart, Users, GraduationCap, Building, HandHeart, CheckCircle, ArrowRight, Globe, BookOpen, Lightbulb } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function SupportUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Breadcrumb />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-getfund-primary to-red-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Ghana's Educational Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Join us in transforming lives through education. Every contribution helps build a brighter tomorrow for Ghanaian students.
            </p>
            <div className="flex justify-center">
              <button className="bg-white text-getfund-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Heart className="w-6 h-6" />
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-4">
              Our Impact by Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since our establishment, GETFund has been at the forefront of educational development in Ghana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-getfund-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-getfund-primary mb-2">500,000+</div>
              <div className="text-gray-600">Students Supported</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-getfund-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-getfund-primary mb-2">2,500+</div>
              <div className="text-gray-600">Schools Improved</div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-getfund-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-getfund-primary mb-2">15,000+</div>
              <div className="text-gray-600">Scholarships Awarded</div>
            </div>
          </div>
        </div>
      </section>

      {/* About GETFund Act */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-4">
                The Ghana Education Trust Fund (GETFund) Act
              </h2>
              <div className="w-24 h-1 bg-getfund-primary mx-auto mb-6"></div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  The Ghana Education Trust Fund was established under <strong>Act 581 of 2000</strong> by the Parliament of Ghana. 
                  This landmark legislation created a dedicated funding mechanism to support and enhance educational delivery 
                  at all levels in Ghana from basic education through to tertiary institutions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-getfund-secondary mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      Legal Foundation
                    </h3>
                    <p className="text-gray-700">
                      The GETFund Act 2000 (Act 581) provides the legal framework for the establishment, 
                      operation, and governance of the Fund, ensuring accountability and transparency in 
                      educational resource allocation.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-getfund-secondary mb-4 flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      Funding Mechanism
                    </h3>
                    <p className="text-gray-700">
                      The Fund is primarily financed through a dedicated levy on goods and services, 
                      supplemented by government appropriations, donations, and investment income, 
                      creating a sustainable funding model for education.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-getfund-primary p-6 mb-8 text-center">
                  <h4 className="text-lg font-semibold text-getfund-secondary mb-3">Our Constitutional Mandate</h4>
                  <p className="text-gray-700 italic">
                    "To support the delivery of quality education to Ghanaians from the basic to tertiary level 
                    through dynamic funding policies aimed at ensuring equitable provision of essential resources 
                    for all levels of education."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-4">
              Ways to Support Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your support helps us continue our vital work in transforming Ghana's educational landscape
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <HandHeart className="w-6 h-6 text-getfund-primary" />
              </div>
              <h3 className="text-xl font-semibold text-getfund-secondary mb-3">Direct Donations</h3>
              <p className="text-gray-600 mb-4">
                Make a direct financial contribution to support scholarships, infrastructure development, 
                and educational programs across Ghana.
              </p>
              <button className="text-getfund-primary font-semibold hover:text-red-700 transition-colors flex items-center gap-2">
                Donate Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-getfund-secondary mb-3">Corporate Partnerships</h3>
              <p className="text-gray-600 mb-4">
                Partner with us through corporate social responsibility programs to make a lasting 
                impact on Ghana's educational sector.
              </p>
              <button className="text-getfund-primary font-semibold hover:text-red-700 transition-colors flex items-center gap-2">
                Partner With Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-getfund-secondary mb-3">International Support</h3>
              <p className="text-gray-600 mb-4">
                Join international organizations and diaspora communities in supporting 
                Ghana's educational development initiatives.
              </p>
              <button className="text-getfund-primary font-semibold hover:text-red-700 transition-colors flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-getfund-secondary mb-6">
                Support Scholarship Programs
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Your contributions directly fund scholarship opportunities for brilliant but needy students, 
                helping them access quality education and realize their full potential.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-getfund-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-getfund-secondary mb-1">Undergraduate Scholarships</h4>
                    <p className="text-gray-600">Supporting talented students through their university education</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-getfund-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-getfund-secondary mb-1">Postgraduate Programs</h4>
                    <p className="text-gray-600">Funding advanced degrees and research opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-getfund-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-getfund-secondary mb-1">International Exchange</h4>
                    <p className="text-gray-600">Enabling students to study abroad and gain global perspectives</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-getfund-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Support Scholarships
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-getfund-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-getfund-secondary mb-4">
                    Invest in Brilliance
                  </h3>
                  <p className="text-gray-700 text-lg mb-6">
                    Every scholarship you fund is an investment in Ghana's future leaders, 
                    innovators, and change-makers.
                  </p>
                  <div className="bg-white rounded-lg p-6">
                    <div className="text-3xl font-bold text-getfund-primary mb-2">GH₵ 5,000</div>
                    <div className="text-gray-600">can fund a full semester for one student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-getfund-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Join thousands of supporters who are helping us build a stronger, more educated Ghana. 
            Your contribution, no matter the size, makes a meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-getfund-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Heart className="w-6 h-6" />
              Make a Donation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-getfund-primary transition-colors">
              Contact Our Team
            </button>
          </div>
          
          <div className="mt-12 text-red-100">
            <p className="mb-2">Questions about donating or partnerships?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span>Email: donations@getfund.gov.gh</span>
              <span className="hidden sm:block">|</span>
              <span>Phone: +233 544 323 020</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}