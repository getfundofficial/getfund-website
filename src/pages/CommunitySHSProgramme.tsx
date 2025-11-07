import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function CommunitySHSProgramme() {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Free SHS Intervention Project</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Infrastructure Intervention</h2>
          <p className="mb-4">The increase in enrollment figures necessitated investment in education infrastructure to support the Free and Quality Education Agenda. The infrastructure gap widened following the increase in secondary school enrollment numbers.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Educational Materials & Supplies</h2>
          <p className="mb-4">In addition to infrastructure intervention, additional supplies and learning materials were distributed to various schools (e.g. bunk beds, mattresses, teachers’ tables & chairs, common room chairs, mono desks, etc).</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Policy Objectives</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Removal of cost barriers</li>
            <li>Expansion of infrastructure</li>
            <li>Improvement in Quality and Equity</li>
            <li>Development of Employable Skills</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Impact</h2>
          <p className="mb-4">Government has given full effect to SDG 4.1 with the implementation of a Free SHS Policy. The programme is anchored in the above pillars and has significantly increased access to secondary education in Ghana.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">The Role of GETFund</h2>
          <p className="mb-4">GETFund provides financial support for infrastructure, educational materials, and supplementary funding to institutions under the Ministry of Education, Scholarship Secretariat, and Student Loan Trust Fund.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
