import OptimizedImage from '../components/OptimizedImage';
import { GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function ScholarshipProgramme() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Breadcrumb />
      {/* Hero Banner */}
      <section className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] flex items-center justify-center mb-8">
        <OptimizedImage
          src="/images/scholarship/GETFund-Scholarship-Programme.jpg"
          alt="GETFund Scholarship Programme"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          width={1920}
          height={520}
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4">
          <GraduationCap className="w-14 h-14 mb-4 text-getfund-gold drop-shadow-lg" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">GETFund Scholarship Programme</h1>
          <p className="text-lg sm:text-xl max-w-2xl drop-shadow">Empowering Ghanaian students to achieve their academic dreams.</p>
        </div>
      </section>
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <p className="mb-6 text-lg text-gray-800">
          The GETFund Scholarship Programme is a flagship initiative designed to provide financial support to Ghanaian students pursuing tertiary education, both locally and internationally. The programme aims to bridge the financial gap for brilliant but needy students, empowering them to achieve their academic and professional aspirations.
        </p>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Programme Overview</h2>
          <p className="mb-4 text-gray-700">
            Since its inception, the GETFund Scholarship Programme has enabled thousands of Ghanaians to access quality higher education. The programme covers tuition, accommodation, and in some cases, stipends for living expenses. Scholarships are awarded based on merit, need, and alignment with national development priorities.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Key Objectives</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Expand access to tertiary education for Ghanaians from all backgrounds.</li>
            <li>Support students in fields critical to Ghana’s socio-economic development.</li>
            <li>Promote gender equity and inclusion in higher education.</li>
            <li>Develop a skilled workforce to drive national progress.</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Eligibility Criteria</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Be a Ghanaian citizen with a valid national ID.</li>
            <li>Have gained admission to an accredited tertiary institution (local or international).</li>
            <li>Demonstrate academic excellence and financial need.</li>
            <li>Meet any additional requirements specified in the annual call for applications.</li>
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Application Process</h2>
          <ol className="list-decimal list-inside mb-4 text-gray-700">
            <li>Monitor the GETFund website and official channels for the annual scholarship announcement.</li>
            <li>Prepare all required documents (admission letter, transcripts, national ID, etc.).</li>
            <li>Complete the online application form during the open application window.</li>
            <li>Upload supporting documents as specified in the guidelines.</li>
            <li>Submit the application before the published deadline.</li>
          </ol>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Only shortlisted applicants will be contacted for further steps.</li>
            <li>Decisions of the GETFund Scholarship Committee are final.</li>
            <li>Applicants are encouraged to read all instructions carefully before applying.</li>
          </ul>
        </section>
        <p className="mt-8 text-gray-800">
          For detailed guidelines, application timelines, and frequently asked questions, please visit the <a href="/resources" className="text-primary underline">Resources</a> page or contact us for assistance.
        </p>
      </main>
      <Footer />
    </div>
  );
}