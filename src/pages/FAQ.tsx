import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'FAQ', href: '/faq' }]} />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions (FAQ)</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">What is GETFund?</h2>
          <p>GETFund (Ghana Education Trust Fund) is a public trust established by the Government of Ghana to provide dedicated funding to support the development and improvement of education infrastructure, scholarships, and educational resources at all levels in Ghana.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">How do I apply for a GETFund scholarship?</h2>
          <p>Visit the <a href="/scholarship-apply" className="text-primary underline">Scholarship Application</a> page for step-by-step instructions, eligibility criteria, and a list of required documents. Applications are accepted only during the official application window announced each year.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Who is eligible for GETFund support?</h2>
          <p>Eligibility varies by programme, but generally applicants must be Ghanaian citizens, have gained admission to an accredited institution, demonstrate academic excellence, and show financial need.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">What documents are required for scholarship applications?</h2>
          <p>Required documents typically include an admission letter, academic transcripts, national ID, and any other documents specified in the application guidelines for the relevant year.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">How are scholarship recipients selected?</h2>
          <p>Recipients are selected based on merit, need, and alignment with national development priorities. The process is competitive and transparent, and only shortlisted applicants are contacted.</p>
        </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">How can I contact GETFund for more information?</h2>
            <p>Visit the <a href="/contact" className="text-getfund-primary underline">Contact</a> page for our address, email, phone number, and office hours, or use the contact form to send us a message.</p>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}