const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

export interface InitiatePaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: string;
  customerEmail: string;
  customerPhone?: string;
  campaignTitle: string;
  donorName?: string;
  campaignId?: string;
  campaignSlug?: string;
  donationType?: 'impact' | 'campaign' | 'general';
  donationDescription?: string;
}

export interface PaymentResponse {
  success: boolean;
  data?: {
    paymentUrl: string;
    reference: string;
    accessCode: string;
  };
  error?: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  data?: {
    status: string;
    amount: number;
    currency: string;
    reference: string;
    paidAt?: string;
  };
  error?: string;
}

class PaymentService {
  /**
   * Initialize a payment transaction
   */
  async initiatePayment(paymentData: InitiatePaymentRequest): Promise<PaymentResponse> {
    const timestamp = new Date().toISOString();
    console.log('%c========== PAYMENT INITIATION START ==========', 'color: #4CAF50; font-weight: bold; font-size: 14px');
    console.log('[CLIENT DEBUG] Timestamp:', timestamp);
    console.log('[CLIENT DEBUG] API Base URL:', API_BASE_URL);
    console.log('[CLIENT DEBUG] Payment Data:', {
      amount: paymentData.amount,
      currency: paymentData.currency,
      method: paymentData.paymentMethod,
      email: paymentData.customerEmail,
      phone: paymentData.customerPhone || 'Not provided',
      campaign: paymentData.campaignTitle,
      donor: paymentData.donorName || 'Anonymous',
    });

    try {
      const reference = this.generateReference();
      console.log('[CLIENT DEBUG] Generated Reference:', reference);

      const payload = {
        amount: paymentData.amount,
        currency: paymentData.currency,
        paymentMethod: paymentData.paymentMethod,
        customerEmail: paymentData.customerEmail,
        customerPhone: paymentData.customerPhone,
        reference,
        description: `Donation for ${paymentData.campaignTitle}`,
        metadata: {
          campaignTitle: paymentData.campaignTitle,
          donorName: paymentData.donorName,
          campaignId: paymentData.campaignId,
          campaignSlug: paymentData.campaignSlug,
          donationType: paymentData.donationType || 'general',
          donationDescription: paymentData.donationDescription,
        },
      };

      console.log('[CLIENT DEBUG] Request Payload:', payload);
      console.log('[CLIENT DEBUG] Making fetch request to:', `${API_BASE_URL}/payments`);

      const fetchStartTime = performance.now();
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const fetchDuration = (performance.now() - fetchStartTime).toFixed(2);
      console.log(`[CLIENT DEBUG] Fetch completed in ${fetchDuration}ms`);
      console.log('[CLIENT DEBUG] Response Status:', response.status, response.statusText);
      console.log('[CLIENT DEBUG] Response OK:', response.ok);
      console.log('[CLIENT DEBUG] Response Headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('[CLIENT DEBUG] Response Data:', data);

      if (data.success) {
        console.log('%c[CLIENT DEBUG] ✓ Payment initiation SUCCESSFUL!', 'color: #4CAF50; font-weight: bold');
        console.log('[CLIENT DEBUG] Payment URL:', data.data?.paymentUrl);
        console.log('[CLIENT DEBUG] Reference:', data.data?.reference);
        console.log('[CLIENT DEBUG] Access Code:', data.data?.accessCode);
        console.log('[CLIENT DEBUG] Test Mode:', data.testMode || false);
      } else {
        console.error('%c[CLIENT DEBUG] ✗ Payment initiation FAILED', 'color: #f44336; font-weight: bold');
        console.error('[CLIENT DEBUG] Error:', data.error);
        console.error('[CLIENT DEBUG] Error Details:', data);
      }

      console.log('%c========== PAYMENT INITIATION END ==========', 'color: #4CAF50; font-weight: bold; font-size: 14px');
      return data;
    } catch (error) {
      console.error('%c========== PAYMENT INITIATION ERROR ==========', 'color: #f44336; font-weight: bold; font-size: 14px');
      console.error('[CLIENT DEBUG] Exception:', error);
      console.error('[CLIENT DEBUG] Error Message:', error instanceof Error ? error.message : 'Unknown error');
      console.error('[CLIENT DEBUG] Error Stack:', error instanceof Error ? error.stack : undefined);

      return {
        success: false,
        error: 'Failed to initialize payment. Please try again.',
      };
    }
  }

  /**
   * Verify payment status
   */
  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    const timestamp = new Date().toISOString();
    console.log('%c========== PAYMENT VERIFICATION START ==========', 'color: #2196F3; font-weight: bold; font-size: 14px');
    console.log('[CLIENT DEBUG] Timestamp:', timestamp);
    console.log('[CLIENT DEBUG] Reference:', reference);
    console.log('[CLIENT DEBUG] Verification URL:', `${API_BASE_URL}/payments?reference=${reference}`);

    try {
      const fetchStartTime = performance.now();
      const response = await fetch(`${API_BASE_URL}/payments?reference=${reference}`, {
        method: 'GET',
      });

      const fetchDuration = (performance.now() - fetchStartTime).toFixed(2);
      console.log(`[CLIENT DEBUG] Verification fetch completed in ${fetchDuration}ms`);
      console.log('[CLIENT DEBUG] Response Status:', response.status, response.statusText);
      console.log('[CLIENT DEBUG] Response OK:', response.ok);

      const data = await response.json();
      console.log('[CLIENT DEBUG] Verification Response Data:', data);

      if (data.success) {
        console.log('%c[CLIENT DEBUG] ✓ Payment verification SUCCESSFUL!', 'color: #4CAF50; font-weight: bold');
        console.log('[CLIENT DEBUG] Payment Status:', data.data?.status);
        console.log('[CLIENT DEBUG] Amount:', data.data?.amount, data.data?.currency);
        console.log('[CLIENT DEBUG] Paid At:', data.data?.paidAt);
      } else {
        console.error('%c[CLIENT DEBUG] ✗ Payment verification FAILED', 'color: #f44336; font-weight: bold');
        console.error('[CLIENT DEBUG] Error:', data.error);
      }

      console.log('%c========== PAYMENT VERIFICATION END ==========', 'color: #2196F3; font-weight: bold; font-size: 14px');
      return data;
    } catch (error) {
      console.error('%c========== PAYMENT VERIFICATION ERROR ==========', 'color: #f44336; font-weight: bold; font-size: 14px');
      console.error('[CLIENT DEBUG] Exception:', error);
      console.error('[CLIENT DEBUG] Error Message:', error instanceof Error ? error.message : 'Unknown error');

      return {
        success: false,
        error: 'Failed to verify payment status.',
      };
    }
  }

  /**
   * Generate a unique payment reference
   */
  private generateReference(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `GETFUND-${timestamp}-${random}`;
  }

  /**
   * Get payment method label
   */
  getPaymentMethodLabel(method: string): string {
    const labels: { [key: string]: string } = {
      'mobile-money': 'Mobile Money',
      'credit-card': 'Credit/Debit Card',
      'bank-transfer': 'Bank Transfer',
      'paypal': 'PayPal',
    };
    return labels[method] || method;
  }

  /**
   * Validate payment amount
   */
  validateAmount(amount: number, currency: string = 'GHS'): { valid: boolean; error?: string } {
    if (!amount || amount <= 0) {
      return { valid: false, error: 'Please enter a valid amount' };
    }

    // Minimum donation amount
    const minimumAmount = currency === 'GHS' ? 0.1 : 0.01;
    if (amount < minimumAmount) {
      return { valid: false, error: `Minimum donation is ${currency} ${minimumAmount}` };
    }

    return { valid: true };
  }
}

export const paymentService = new PaymentService();
