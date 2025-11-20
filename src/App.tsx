import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WhatWeDo from './pages/WhatWeDo';
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
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          {/* Homepage - Static with CMS Components */}
          <Route path="/" element={<Home />} />
          
          {/* What We Do - CMS-powered with Programs component */}
          <Route path="/what-we-do" element={<WhatWeDo />} />

          {/* CMS-Powered Pages */}
          <Route path="/who-we-are/:slug?" element={<CMSPage />} />
          <Route path="/impact/:slug?" element={<CMSPage />} />
          <Route path="/resources/:slug?" element={<CMSPage />} />
          <Route path="/support-us/:slug?" element={<CMSPage />} />
          <Route path="/contact/:slug?" element={<CMSPage />} />

          {/* News & Updates */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />

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
