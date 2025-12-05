import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckCircle } from 'lucide-react';

export default function TestSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Payment Test Mode | GETFund</title>
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center bg-gray-50 py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test Mode Success!
          </h1>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800 font-medium mb-2">
              ⚠️ This is a TEST transaction
            </p>
            <p className="text-xs text-yellow-700">
              No real payment was processed. This is a simulation for testing the donation flow.
            </p>
          </div>

          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <div className="mb-3">
              <p className="text-sm text-gray-600">Reference Number:</p>
              <p className="font-mono text-sm font-semibold text-gray-900 break-all">
                {reference || 'N/A'}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-600">Amount:</p>
              <p className="text-2xl font-bold text-green-600">
                GH₵ {amount ? parseFloat(amount).toLocaleString() : '0'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Status:</p>
              <p className="font-semibold text-green-600">Test Payment Simulated</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 text-sm">
              In production mode with real Xcel API credentials, users would be redirected to the
              actual payment gateway to complete their donation.
            </p>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Redirecting to homepage in {countdown} seconds...
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-getfund-primary hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Return to Homepage
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <strong>Next Steps:</strong> Configure real Xcel API credentials in Vercel environment variables to enable live payments.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
