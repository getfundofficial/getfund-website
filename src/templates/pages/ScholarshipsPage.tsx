/**
 * Scholarships Page Template
 *
 * Wrapper for the Scholarships page component to be used in the CMS template system.
 * The actual page renders its own Header/Footer, so this template delegates to it.
 */

import React from 'react';
import Scholarships from '../../pages/Scholarships';

interface ScholarshipsPageProps {
  pageData?: any;
  content?: any;
}

export const ScholarshipsPage: React.FC<ScholarshipsPageProps> = () => {
  return <Scholarships />;
};
