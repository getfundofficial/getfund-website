import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WhoWeAre from './pages/WhoWeAre';
import WhatWeDo from './pages/WhatWeDo';
import Impact from './pages/Impact';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ScholarshipApply from './pages/ScholarshipApply';
import ScholarshipApply2 from './pages/ScholarshipApply2';
import InfrastructureProjects from './pages/InfrastructureProjects';
import ScholarshipProgramme from './pages/ScholarshipProgramme';
import EducationSectorSupport from './pages/EducationSectorSupport';
import SupportUs from './pages/SupportUs';
import Resources from './pages/Resources';
import CommunitySHSProgramme from './pages/CommunitySHSProgramme';
import SecondaryEducationImprovementProgramme from './pages/SecondaryEducationImprovementProgramme';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/scholarship-apply" element={<ScholarshipApply />} />
          <Route path="/scholarship-apply-2" element={<ScholarshipApply2 />} />
          <Route path="/service/infrastructure-projects" element={<InfrastructureProjects />} />
          <Route path="/service/scholarship-programme" element={<ScholarshipProgramme />} />
          <Route path="/service/education-sector-support" element={<EducationSectorSupport />} />
          <Route path="/support-us" element={<SupportUs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/portfolio/community-shs-programme" element={<CommunitySHSProgramme />} />
          <Route path="/portfolio/secondary-education-improvement-programme" element={<SecondaryEducationImprovementProgramme />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
