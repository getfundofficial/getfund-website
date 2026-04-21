export interface ScholarRecord {
  name: string;
  academicYear: string;
  country: string;
  institution: string;
  course: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScholarshipsContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    heroImage: string;
  };
  programmeOverview: {
    heading: string;
    paragraphs: string[];
  };
  supportProvided: {
    heading: string;
    description: string;
  };
  coreBelief: string;
  priorityAreas: {
    heading: string;
    items: { title: string; description: string }[];
  };
  programmeStats: {
    heading: string;
    stats: { label: string; value: string }[];
  };
  scopeOfScholarship: {
    heading: string;
    description: string;
    items: string[];
  };
  callForApplication: {
    heading: string;
    subheading: string;
    description: string;
    openingDate: string;
    closingDate: string;
  };
  applicationProcedure: {
    heading: string;
    steps: { title: string; description: string }[];
  };
  eligibilityRequirements: {
    heading: string;
    items: string[];
  };
  academicRequirements: {
    heading: string;
    items: string[];
  };
  supportingDocuments: {
    heading: string;
    items: string[];
  };
  specialDispensation: {
    heading: string;
    description: string;
    items: string[];
  };
  applicationSteps: {
    heading: string;
    steps: string[];
  };
  disqualifyingFactors: {
    heading: string;
    items: string[];
  };
  fundingAndDuration: {
    heading: string;
    items: FAQItem[];
  };
  faqs: {
    heading: string;
    items: FAQItem[];
  };
  scholars: {
    heading: string;
    subheading: string;
    totalRecords: string;
    sampleData: ScholarRecord[];
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    showViewResourcesButton?: boolean;
  };
}

export const defaultContent: ScholarshipsContent = {
  meta: {
    title: 'Scholarships | Ghana Education Trust Fund',
    description: 'GETFund Scholarship Programme - Empowering Ghanaian students through postgraduate and undergraduate scholarships. Learn about eligibility, application process, and our scholars.',
  },
  hero: {
    title: 'GETFund Scholarship Programme',
    subtitle: 'GETFund Scholarships: Meeting 21st Century Needs',
    heroImage: '/images/scholarship/GETFund-Scholarship-Programme.jpg',
  },
  programmeOverview: {
    heading: 'Programme Overview',
    paragraphs: [
      'Education is the bedrock upon which every nation\'s growth and development is anchored, particularly in our fast-evolving 21st century global society that requires a multiplicity of skill sets.',
      'Our human resource capital is our greatest asset, and we have a duty to capitalize on that for the ultimate benefit of our society.',
      'A nation that therefore fails or refuses to invest in the education of its citizens clearly sets itself up for failure. Brains, it is said, develop a nation, not its natural resources, as countries like Japan, Switzerland, Singapore and several other countries have proven over time.',
    ],
  },
  supportProvided: {
    heading: 'Support Provided',
    description: 'The Program provides financial, social, and academic support to Scholars. Financial support includes tuition fees, accommodation, and scholastic materials.',
  },
  coreBelief: 'We believe education is a catalyst for social and economic change.',
  priorityAreas: {
    heading: 'Priority Areas',
    items: [
      { title: 'STEM Programmes', description: 'High prevalence to Science, Technology, Engineering and Mathematics programmes' },
      { title: 'Female Education', description: 'Promoting access and equity in education for women and girls' },
    ],
  },
  programmeStats: {
    heading: 'Programme Statistics',
    stats: [
      { label: 'Undergraduate Scholars', value: '00' },
      { label: 'Executive Education Programmes', value: '00' },
      { label: 'Masters Scholars', value: '00' },
      { label: 'PhD Scholars', value: '00' },
    ],
  },
  scopeOfScholarship: {
    heading: 'Scope of Scholarship',
    description: 'The programme expands beyond the traditional "brilliant but needy" requirement to include:',
    items: [
      'Support for "brilliant but needy" applicants at undergraduate and postgraduate levels',
      'Capacity building in public institutions and agencies (e.g., forensic science, cyber security, fire-fighting domains)',
      'Faculty development through Ghana Tertiary Education Commission (GTEC) for university lecturers pursuing further education abroad',
      'Funding for short courses abroad by MPs, judges and others upon request',
      'Support for students competing in international educational competitive programmes',
    ],
  },
  callForApplication: {
    heading: '2024/25 Scholarship Call For Application',
    subheading: 'Postgraduate Foreign Scholarship Call for Application',
    description: 'The Ghana Education Trust Fund is accepting applications for Postgraduate (Masters Programmes) for the award of Foreign scholarships for the 2024/25 Academic Year.',
    openingDate: 'Friday 30th May 2025',
    closingDate: 'Sunday 15th June 2025',
  },
  applicationProcedure: {
    heading: 'Procedure For Applications',
    steps: [
      { title: 'Apply via Scholarship Portal', description: 'Applicants must visit the GETFund Website to access the scholarship Portal and complete an online application form.' },
      { title: 'Provide Required Documentation', description: 'Complete the online form with required information and upload documents for vetting and shortlisting.' },
      { title: 'Application Status Update', description: 'Communication occurs via email and SMS, with further actions continuing through the portal.' },
    ],
  },
  eligibilityRequirements: {
    heading: 'Eligibility Requirements',
    items: [
      'Applicant must be a Ghanaian',
      'Must have obtained admission to undertake a Masters or Undergraduate-Medicine Only (Eastern Europe & Asia)',
      'Must hold a first degree of at least second-class (for Master\'s applicants)',
      'Must be available to start academic studies by the start of the academic year for which sponsorship is sought',
      'Applicant must not be pursuing a PhD or Master\'s degree at the time of application',
      'Should not be a previous beneficiary of a GETFund Foreign Scholarship applying for the same scholarship category',
    ],
  },
  academicRequirements: {
    heading: 'Academic Requirements',
    items: [
      'Admission Letter from accredited University (Unconditional & Financial Condition letters only)',
      'Fee Schedule',
      'Previous academic certificates (Where Applicable)',
      'Previous transcript (Where Applicable)',
      'Project or Research proposal (not exceeding 5 pages) (Masters and PhD Applicants)',
    ],
  },
  supportingDocuments: {
    heading: 'Supporting Documents',
    items: [
      'Curriculum Vitae',
      'Academic Referees',
      'Letter of Recommendation (occupational)',
      'Support Document from employer for Academic Leave (Where applicable)',
      'Passport Bio Page',
      'Ghana Card',
      'National Service certificate (Where Applicable)',
    ],
  },
  specialDispensation: {
    heading: 'Special Dispensation',
    description: 'Priority consideration for applicants pursuing:',
    items: [
      'Science, Technology, Engineering, Mathematics (STEM)',
      'Technical and Vocational Education and Training (TVET)',
      'Special needs programmes',
      'National Initiative Priority programmes',
      'Programmes at tuition-free Universities',
      'Lecturers of public Tertiary Institutions (Via GTEC)',
      'Persons with special needs',
    ],
  },
  applicationSteps: {
    heading: 'Application Steps',
    steps: [
      'Create Profile',
      'Verify Account',
      'Fill Application Form and upload required documents',
      'Review Application Summary',
      'Submit Application',
    ],
  },
  disqualifyingFactors: {
    heading: 'Disqualifying Factors',
    items: [
      'Poor Academic Performance',
      'Not providing required documentation (Admission letter & Financial Details)',
      'Uploading invisible or unclear documents',
      'Not completing application before deadline',
      'Providing false or misleading information',
      'Multiple applications by one applicant (instant disqualification)',
      'Previous GETFund Scholarship beneficiary applying for the same category',
    ],
  },
  fundingAndDuration: {
    heading: 'Funding and Duration',
    items: [
      { question: 'Local Scholarship Coverage', answer: 'Tuition Fees Only' },
      { question: 'Foreign Scholarship Coverage', answer: 'Typically covers tuition, accommodation, and sometimes stipend for living expenses. Specific details regarding partial or full scholarship will be provided upon award.' },
      { question: 'Deferment', answer: 'No, scholarships must be used for the academic year awarded.' },
      { question: 'Duration', answer: 'Valid for the postgraduate program duration as specified in the admission letter, subject to satisfactory academic performance.' },
    ],
  },
  faqs: {
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'Who can apply?', answer: 'Every Ghanaian citizen who meets the prerequisite requirements.' },
      { question: 'Which Universities qualify?', answer: 'For Foreign Universities: Accredited and Globally Recognised Universities. For Local Universities: All Local Universities accredited by Ghana Tertiary Education Commission to run Post Graduate courses.' },
      { question: 'Can I apply before university acceptance?', answer: 'No. All applicants are required to have a valid Admission letter from a local university.' },
      { question: 'How do I know if I\'m eligible?', answer: 'The basic requirement is being a Ghanaian Citizen, followed by other requirements stated on the application portal.' },
      { question: 'How are applications submitted?', answer: 'All correspondences occur exclusively between GETFund and the applicant. All submissions are received through the scholarship web application portal only.' },
      { question: 'Can second-year and beyond students apply?', answer: 'For programmes with more than one year of academic activities, yes, but sponsorship takes effect from the year of application.' },
      { question: 'Can I apply to other government agencies?', answer: 'Yes, but applicants cannot hold two or more scholarships from Ghana Government Agencies simultaneously.' },
      { question: 'Where is the portal?', answer: 'Visit www.getfund.gov.gh/scholarship-apply' },
      { question: 'Can I save my progress?', answer: 'Yes, the portal allows saving progress to complete later before the deadline.' },
      { question: 'What if I have technical issues?', answer: 'Contact the support team via details provided on the portal.' },
      { question: 'Can I edit after submission?', answer: 'No, once submitted, changes cannot be made. Ensure accuracy before submitting.' },
      { question: 'What is the selection process?', answer: 'Applications are vetted and shortlisted based on eligibility and documentation completeness. Shortlisted applicants will be contacted for further processes.' },
      { question: 'When will I be notified?', answer: 'Shortlisted applicants receive notification after vetting completion. The specific timeline will be communicated via portal and email.' },
      { question: 'What if I am not shortlisted?', answer: 'Applicants receive email notification and may reapply in the following cycle if eligible.' },
    ],
  },
  scholars: {
    heading: 'GETFund Scholars',
    subheading: '14+ Years of Empowering Minds, Transforming Futures',
    totalRecords: '16,367',
    sampleData: [],
  },
  contactInfo: {
    address: 'No. 42, 4th Close, Airport Res. Area, Accra',
    phone: '+233 544 323 020',
    email: 'info@getfund.gov.gh',
    website: 'www.getfund.gov.gh',
  },
  cta: {
    heading: 'Ready to Apply?',
    description: 'Ghana Education Trust Fund (GETFund) - Supporting the delivery of quality education in Ghana. By working in partnership, we create lasting change.',
    buttonText: 'Start Application',
    buttonUrl: 'https://scholarships.getfund.gov.gh/',
    showViewResourcesButton: true,
  },
};
