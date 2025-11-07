import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function SecondaryEducationImprovementProgramme() {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Secondary Education Improvement Programme</h1>
        <p className="text-lg mb-4">Details about the Secondary Education Improvement Programme, its goals, and achievements.</p>
        {/* Add more content as needed */}
      </main>
      <Footer />
    </div>
  );
}
