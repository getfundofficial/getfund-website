import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';

// Eagerly load the homepage (most common entry point)
import Home from './pages/Home';

// Lazy load all other pages for faster initial load
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'));
const WhoWeAre = lazy(() => import('./pages/WhoWeAre'));
const AboutEdit = lazy(() => import('./pages/AboutEdit'));
const Impact = lazy(() => import('./pages/Impact'));
const Resources = lazy(() => import('./pages/Resources'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ScholarshipApply = lazy(() => import('./pages/ScholarshipApply'));
const Scholarships = lazy(() => import('./pages/Scholarships'));
const ScholarshipOverview = lazy(() => import('./pages/ScholarshipOverview'));
const PartnerUniversities = lazy(() => import('./pages/PartnerUniversities'));
const ScholarshipHowToApply = lazy(() => import('./pages/ScholarshipHowToApply'));
const GetfundScholars = lazy(() => import('./pages/GetfundScholars'));
const InfrastructureProjects = lazy(() => import('./pages/InfrastructureProjects'));
const EducationSectorSupport = lazy(() => import('./pages/EducationSectorSupport'));
const CommunitySHSProgramme = lazy(() => import('./pages/CommunitySHSProgramme'));
const SecondaryEducationImprovementProgramme = lazy(() => import('./pages/SecondaryEducationImprovementProgramme'));
const CMSPage = lazy(() => import('./pages/CMSPage'));
const WhyFundraising = lazy(() => import('./pages/WhyFundraising'));
const WaysToDonate = lazy(() => import('./pages/WaysToDonate'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const BeneficiariesGiveBack = lazy(() => import('./pages/BeneficiariesGiveBack'));
const Events = lazy(() => import('./pages/Events'));
const PaymentCallback = lazy(() => import('./pages/PaymentCallback'));
const TestSuccess = lazy(() => import('./pages/payment/TestSuccess'));
const FundraisingCampaigns = lazy(() => import('./pages/FundraisingCampaigns'));
const Lottery = lazy(() => import('./pages/Lottery'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {/* Centered content wrapper with max-width and shadow for refined layout */}
        <div className="max-w-[1500px] mx-auto bg-white shadow-xl min-h-screen">
        <Suspense fallback={<LoadingScreen />}>
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

          {/* Scholarships Pages */}
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/overview" element={<ScholarshipOverview />} />
          <Route path="/scholarships/partner-universities" element={<PartnerUniversities />} />
          <Route path="/scholarships/how-to-apply" element={<ScholarshipHowToApply />} />
          <Route path="/scholarships/getfund-scholars" element={<GetfundScholars />} />
          <Route path="/scholarship-apply" element={<ScholarshipApply />} />

          {/* Other Pages */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/service/infrastructure-projects" element={<InfrastructureProjects />} />
          <Route path="/service/scholarship-programme" element={<ScholarshipOverview />} />
          <Route path="/service/education-sector-support" element={<EducationSectorSupport />} />
          <Route path="/portfolio/community-shs-programme" element={<CommunitySHSProgramme />} />
          <Route path="/portfolio/secondary-education-improvement-programme" element={<SecondaryEducationImprovementProgramme />} />

          {/* Catch-all CMS route (must be last) */}
          <Route path="/:slug" element={<CMSPage />} />
        </Routes>
        </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
