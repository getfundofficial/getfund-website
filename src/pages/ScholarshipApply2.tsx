import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function ScholarshipApply2() {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Scholarship Application (Alternate)</h1>
        <p className="text-lg mb-4">Alternate GETFund scholarship application page. Please provide all required information to apply.</p>
        {/* Add more content as needed */}
      </main>
      <Footer />
    </div>
  );
}
