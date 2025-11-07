import OptimizedImage from '../components/OptimizedImage';
import { Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function Impact() {
  return (
    <>
      <Header />
      <Breadcrumb />
      {/* Hero Banner */}
      <section className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] flex items-center justify-center mb-8">
        <OptimizedImage
          src="/images/hero/main-slider-3.jpg"
          alt="GETFund Impact"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          width={1920}
          height={520}
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4">
          <Award className="w-14 h-14 mb-4 text-getfund-gold drop-shadow-lg" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">Our Impact</h1>
          <p className="text-lg sm:text-xl max-w-2xl drop-shadow">Transforming education and empowering Ghana’s future.</p>
        </div>
      </section>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Achievements</h2>
          <ul className="list-disc list-inside mb-8 text-gray-700">
            <li>Constructed and rehabilitated thousands of classrooms, dormitories, libraries, and laboratories across all regions.</li>
            <li>Awarded scholarships to over 30,000 Ghanaian students at the tertiary level.</li>
            <li>Supplied teaching and learning materials to basic, secondary, and tertiary institutions.</li>
            <li>Supported capacity building for teachers, school leaders, and administrators.</li>
            <li>Promoted STEM education, gender equity, and inclusive learning environments.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Impact Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Scholarship Beneficiary</h3>
              <p>“Thanks to GETFund, I was able to complete my university education and pursue my dream career. The scholarship support made all the difference.”</p>
              <p className="mt-2 text-sm text-gray-600">— Ama, GETFund Scholar</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">School Infrastructure</h3>
              <p>“Our school now has modern classrooms and science labs, thanks to GETFund. This has improved teaching and learning for both students and teachers.”</p>
              <p className="mt-2 text-sm text-gray-600">— Mr. Mensah, Headteacher</p>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Nationwide Reach</h2>
            <p className="text-gray-700 mb-2">GETFund projects and scholarships have impacted every region of Ghana, from urban centers to rural communities.</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Basic schools, senior high schools, and tertiary institutions have all benefited from GETFund support.</li>
              <li>Special focus on underserved and disadvantaged areas to promote equity in education.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}