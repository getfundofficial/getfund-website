import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { paymentService } from '../services/paymentService';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      
      if (!reference) {
        setStatus('failed');
        return;
      }

      try {
        const response = await paymentService.verifyPayment(reference);
        
        if (response.success && response.data) {
          setPaymentDetails(response.data);
          
          if (response.data.status === 'success' || response.data.status === 'completed') {
            setStatus('success');
          } else {
            setStatus('failed');
          }
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {status === 'verifying' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-getfund-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your donation...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your generous donation. Your contribution will make a difference.
            </p>
            
            {paymentDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Amount:</span> <span className="font-medium">{paymentDetails.currency} {paymentDetails.amount}</span></p>
                  <p><span className="text-gray-600">Reference:</span> <span className="font-medium">{paymentDetails.reference}</span></p>
                  {paymentDetails.paidAt && (
                    <p><span className="text-gray-600">Date:</span> <span className="font-medium">{new Date(paymentDetails.paidAt).toLocaleString()}</span></p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => navigate('/fundraising/ways-to-donate')}
              className="w-full bg-getfund-primary hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Return to Fundraising
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't process your payment. Please try again or contact support if the problem persists.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/fundraising/ways-to-donate')}
                className="w-full bg-getfund-primary hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
