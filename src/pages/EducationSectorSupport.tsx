import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OptimizedImage from '../components/OptimizedImage';
import Breadcrumb from '../components/Breadcrumb';

export default function EducationSectorSupport() {
  useEffect(() => {
    // Force scroll to top when component mounts
    const scrollToTop = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        const header = document.querySelector('header');
        if (header) {
          header.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
      } catch (error) {
        console.warn('Scroll to top failed:', error);
      }
    };
    
    scrollToTop();
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-getfund-primary via-green-700 to-getfund-secondary text-white pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Education Sector Support</h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Supporting initiatives that improve education quality and learning outcomes
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Education Support</h2>
                
                <p className="text-lg text-gray-700 mb-8">
                  GETFund provides comprehensive support to Ghana's education sector through various 
                  initiatives designed to improve the quality of education delivery and enhance learning 
                  outcomes at all levels of education.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <OptimizedImage
                      src="/images/scholarships/corporate-image.jpg"
                      alt="Education Sector Support"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-3">Institutional Support</h3>
                    <p className="text-gray-600">
                      Providing financial and technical support to educational institutions 
                      under the Ministry of Education.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <OptimizedImage
                      src="/images/scholarships/student.jpg"
                      alt="Student Support Programs"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-3">Student Support</h3>
                    <p className="text-gray-600">
                      Supporting the Student Loan Trust Fund and providing supplementary 
                      funding for student financial assistance.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Support Areas</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-getfund-primary">
                    <h4 className="font-bold text-lg mb-3 text-getfund-primary">Financial Support</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Institutional funding assistance</li>
                      <li>• Scholarship Secretariat support</li>
                      <li>• Student Loan Trust Fund backing</li>
                      <li>• Emergency educational funding</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-l-4 border-getfund-secondary">
                    <h4 className="font-bold text-lg mb-3 text-getfund-secondary">Capacity Building</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Faculty training programs</li>
                      <li>• Research grants through NCTE</li>
                      <li>• Professional development initiatives</li>
                      <li>• Educational leadership programs</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">Support Programs</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-getfund-primary">
                    <h4 className="text-xl font-bold text-getfund-primary mb-3">Ministry of Education Support</h4>
                    <p className="text-gray-700 mb-4">
                      Direct financial assistance to institutions under the Ministry of Education to 
                      enhance their operational capacity and educational delivery.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Basic Education</h5>
                        <p className="text-sm text-gray-600">Supporting primary and junior high schools</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Secondary Education</h5>
                        <p className="text-sm text-gray-600">Enhancing senior high school programs</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Tertiary Education</h5>
                        <p className="text-sm text-gray-600">Supporting universities and colleges</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-getfund-accent">
                    <h4 className="text-xl font-bold text-getfund-accent mb-3">NCTE Research Grants</h4>
                    <p className="text-gray-700 mb-4">
                      Providing grants through the National Council for Tertiary Education (NCTE) for 
                      faculty member training and research initiatives.
                    </p>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Research Focus Areas</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Educational innovation and technology</li>
                        <li>• Curriculum development and assessment</li>
                        <li>• Teacher training and professional development</li>
                        <li>• Educational policy and administration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-getfund-primary/10 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Impact Metrics</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-getfund-primary mb-2">200+</h4>
                      <p className="text-gray-700">Institutions supported annually</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-getfund-primary mb-2">1,500+</h4>
                      <p className="text-gray-700">Faculty members trained</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-3xl font-bold text-getfund-primary mb-2">₵500M+</h4>
                      <p className="text-gray-700">Annual support provided</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}