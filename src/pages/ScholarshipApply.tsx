import { ExternalLink, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import OptimizedImage from '../components/OptimizedImage';

export default function ScholarshipApply() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumb />
      {/* Hero Banner */}
      <section className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] flex items-center justify-center mb-8">
        <OptimizedImage
          src="/images/scholarship/GETFund-Scholarship-Programme.jpg"
          alt="GETFund Scholarship Application"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          width={1920}
          height={520}
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4">
          <GraduationCap className="w-14 h-14 mb-4 text-getfund-gold drop-shadow-lg" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">Apply for GETFund Scholarship</h1>
          <p className="text-lg sm:text-xl max-w-2xl drop-shadow">Please review the eligibility criteria and guidelines before submitting your application.</p>
        </div>
      </section>
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Required Documents</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Completed online application form</li>
            <li>Admission letter from an accredited tertiary institution</li>
            <li>Academic transcripts and certificates</li>
            <li>National ID (Ghana Card, Passport, etc.)</li>
            <li>Proof of financial need (if applicable)</li>
            <li>Any other documents specified in the application guidelines</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary">How to Apply</h2>
          <ol className="list-decimal list-inside mb-4 text-gray-700">
            <li>Fill out the online application form during the open application window.</li>
            <li>Upload all required documents as specified.</li>
            <li>Submit your application before the published deadline.</li>
          </ol>
        </section>
        <div className="mt-8 text-center">
          <a
            href="https://scholarships.getfund.gov.gh/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-getfund-red text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
          >
            Start Application
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <p className="mt-8 text-gray-700 text-center">
          For more information on the application process, eligibility, and deadlines, please refer to the <a href="/resources" className="text-primary underline">Resources</a> page or <a href="/contact" className="text-primary underline">contact us</a> for assistance.
        </p>
      </main>
      <Footer />
    </div>
  );
}
