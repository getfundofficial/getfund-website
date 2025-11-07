
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function InfrastructureProjects() {
  return (
    <>
      <Header />
  <Breadcrumb />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-primary">Infrastructure Projects</h1>
          <p className="mb-6 text-lg text-gray-800">
            GETFund’s infrastructure investments have transformed the educational landscape of Ghana. We build, rehabilitate, and equip schools and tertiary institutions to provide safe, modern, and inspiring spaces for learning and growth.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Project Highlights</h2>
          <ul className="list-disc list-inside mb-8 text-gray-700">
            <li>Construction of classroom blocks, dormitories, libraries, science and ICT laboratories.</li>
            <li>Modern school infrastructure in both urban and rural communities.</li>
            <li>Special focus on underserved, remote, and disadvantaged areas.</li>
            <li>Collaboration with government, local authorities, and development partners.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Community Day Senior High Schools</h3>
              <p>Newly constructed classroom blocks, dormitories, and science labs to expand access to secondary education, especially in rural communities.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Basic Education Infrastructure</h3>
              <p>Rehabilitation and equipping of basic schools with modern facilities, furniture, and teaching/learning materials.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Tertiary Institution Upgrades</h3>
              <p>Expansion and modernization of lecture halls, libraries, and laboratories in universities and colleges across Ghana.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Inclusive Facilities</h3>
              <p>Provision of disability-friendly infrastructure and resources to promote inclusive education for all learners.</p>
            </div>
          </div>
          <section className="mb-12 mt-12">
            <p className="mb-8 text-gray-700 text-lg">
              Since its inception, the core mandate of GETFund, per its enabling Act of parliament in 2000 (Act 581), has been to provide funding to supplement government effort for the provision of educational infrastructure and facilities within the public sector from the pre-tertiary to the tertiary level. In its efforts to discharge this important mandate, GETFund has chalked many successes and made significant contributions towards supporting education service delivery in the country.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>Key Achievements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>Expansion and improvement of academic facilities at tertiary, technical, and health institutions</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>Construction of lecture theatres, libraries, laboratories, and hostel facilities</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>Renovation of existing hostels and provision of essential laboratory equipment</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>Significant infrastructural improvements at institutions like University of Cape Coast (UCC)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>Funding Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-green-500 rounded-full inline-block"></span>In 2004, over 74% of total allocations were directed toward tertiary infrastructure</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-green-500 rounded-full inline-block"></span>In 2018, Parliament approved GHC 924.8 million for disbursement, with 37.48% allocated to tertiary education</li>
                  <li className="flex items-start gap-2"><span className="mt-1 w-2 h-2 bg-green-500 rounded-full inline-block"></span>In 2019, GHC 1.2 billion was approved, with tertiary education receiving the largest share of 26.4%</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><span className="inline-block w-2 h-2 bg-purple-600 rounded-full"></span>Impact</h3>
            <p className="mb-4 text-gray-700 text-lg">
              GETFund’s investments have enhanced the learning environment and strengthened Ghana’s capacity to train a new generation of skilled professionals. The Fund remains committed to ensuring that every Ghanaian learner has access to quality tertiary education in a modern, well-resourced academic environment.
            </p>
          </section>
          <section className="mb-12">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2"><span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>Ongoing Commitment</h3>
            <p className="mb-4 text-gray-700 text-lg">
              Through sustained investments, GETFund continues to play a transformative role in Ghana’s higher education landscape, ensuring access and quality for all.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}