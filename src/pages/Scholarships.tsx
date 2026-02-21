import { Navigate } from 'react-router-dom';

// Scholarships is now split into separate pages.
// This component redirects to the overview page.
export default function Scholarships() {
  return <Navigate to="/scholarships/overview" replace />;
}
