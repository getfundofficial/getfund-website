import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WhatWeDo from './pages/WhatWeDo';
import WhoWeAre from './pages/WhoWeAre';
import AboutEdit from './pages/AboutEdit';
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
import Home from './pages/Home';
import WhyFundraising from './pages/WhyFundraising';
import WaysToDonate from './pages/WaysToDonate';
import Partnerships from './pages/Partnerships';
import BeneficiariesGiveBack from './pages/BeneficiariesGiveBack';
import Events from './pages/Events';
import PaymentCallback from './pages/PaymentCallback';
import TestSuccess from './pages/payment/TestSuccess';
import ScrollToTop from './components/ScrollToTop';
import FundraisingCampaigns from './pages/FundraisingCampaigns';
import Lottery from './pages/Lottery';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {/* Centered content wrapper with max-width and shadow for refined layout */}
        <div className="max-w-[1500px] mx-auto bg-white shadow-xl min-h-screen">
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Home />} />
          
          {/* What We Do - CMS-powered with Programs component */}
          <Route path="/what-we-do" element={<WhatWeDo />} />
          
          {/* About - Dedicated CMS-powered page */}
          <Route path="/about" element={<WhoWeAre />} />
          <Route path="/about/edit" element={<AboutEdit />} />

          {/* Impact - Dedicated CMS-powered page */}
          <Route path="/impact" element={<Impact />} />
          
          {/* Resources - Dedicated CMS-powered page */}
          <Route path="/resources" element={<Resources />} />

          {/* CMS-Powered Pages */}
          <Route path="/about/:slug" element={<CMSPage />} />
          <Route path="/impact/:slug" element={<CMSPage />} />
          <Route path="/resources/:slug" element={<CMSPage />} />
          <Route path="/support-us/:slug?" element={<CMSPage />} />
          <Route path="/contact/:slug?" element={<CMSPage />} />

          {/* News & Updates */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />

          {/* Fundraising Pages - Hardcoded with full content */}
          <Route path="/fundraising-campaigns" element={<FundraisingCampaigns />} />
          <Route path="/fundraising/why-fundraising" element={<WhyFundraising />} />
          <Route path="/fundraising/ways-to-donate" element={<WaysToDonate />} />
          <Route path="/fundraising/lottery" element={<Lottery />} />
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
      </div>
    </Router>
  );
}

export default App;
