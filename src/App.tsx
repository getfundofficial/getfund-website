import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WhatWeDo from './pages/WhatWeDo';
import WhoWeAre from './pages/WhoWeAre';
import Impact from './pages/Impact';
import Resources from './pages/Resources';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import FAQ from './pages/FAQ';
import ScholarshipApply from './pages/ScholarshipApply';
import ScholarshipApply2 from './pages/ScholarshipApply2';
import InfrastructureProjects from './pages/InfrastructureProjects';
import ScholarshipProgramme from './pages/ScholarshipProgramme';
import EducationSectorSupport from './pages/EducationSectorSupport';
import CommunitySHSProgramme from './pages/CommunitySHSProgramme';
import SecondaryEducationImprovementProgramme from './pages/SecondaryEducationImprovementProgramme';
import CMSPage from './pages/CMSPage';
import WhyFundraising from './pages/WhyFundraising';
import WaysToDonate from './pages/WaysToDonate';
import Partnerships from './pages/Partnerships';
import BeneficiariesGiveBack from './pages/BeneficiariesGiveBack';
import Events from './pages/Events';
import PaymentCallback from './pages/PaymentCallback';
import TestSuccess from './pages/payment/TestSuccess';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          {/* Homepage - CMS-powered */}
          <Route path="/" element={<CMSPage />} />
          
          {/* What We Do - CMS-powered with Programs component */}
          <Route path="/what-we-do" element={<WhatWeDo />} />
          
          {/* Who We Are - Dedicated CMS-powered page */}
          <Route path="/who-we-are" element={<WhoWeAre />} />
          
          {/* Impact - Dedicated CMS-powered page */}
          <Route path="/impact" element={<Impact />} />
          
          {/* Resources - Dedicated CMS-powered page */}
          <Route path="/resources" element={<Resources />} />

          {/* CMS-Powered Pages */}
          <Route path="/who-we-are/:slug" element={<CMSPage />} />
          <Route path="/impact/:slug" element={<CMSPage />} />
          <Route path="/resources/:slug" element={<CMSPage />} />
          <Route path="/support-us/:slug?" element={<CMSPage />} />
          <Route path="/contact/:slug?" element={<CMSPage />} />

          {/* News & Updates */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />

          {/* Fundraising Pages - Hardcoded with full content */}
          <Route path="/fundraising/why-fundraising" element={<WhyFundraising />} />
          <Route path="/fundraising/ways-to-donate" element={<WaysToDonate />} />
          <Route path="/fundraising/partnerships" element={<Partnerships />} />
          <Route path="/fundraising/beneficiaries-give-back" element={<BeneficiariesGiveBack />} />
          <Route path="/fundraising/events" element={<Events />} />

          {/* Payment Routes */}
          <Route path="/payment/callback" element={<PaymentCallback />} />
          <Route path="/payment/success" element={<PaymentCallback />} />
          <Route path="/payment/test-success" element={<TestSuccess />} />

          {/* Other Pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/scholarship-apply" element={<ScholarshipApply />} />
          <Route path="/scholarship-apply-2" element={<ScholarshipApply2 />} />
          <Route path="/service/infrastructure-projects" element={<InfrastructureProjects />} />
          <Route path="/service/scholarship-programme" element={<ScholarshipProgramme />} />
          <Route path="/service/education-sector-support" element={<EducationSectorSupport />} />
          <Route path="/portfolio/community-shs-programme" element={<CommunitySHSProgramme />} />
          <Route path="/portfolio/secondary-education-improvement-programme" element={<SecondaryEducationImprovementProgramme />} />

          {/* Catch-all CMS route (must be last) */}
          <Route path="/:slug" element={<CMSPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
