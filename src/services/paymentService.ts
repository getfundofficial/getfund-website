const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://getfund-cms-backend.vercel.app/api';

export interface InitiatePaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: string;
  customerEmail: string;
  customerPhone?: string;
  campaignTitle: string;
  donorName?: string;
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
    try {
      const reference = this.generateReference();
      
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
          },
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment initiation error:', error);
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
    try {
      const response = await fetch(`${API_BASE_URL}/payments?reference=${reference}`, {
        method: 'GET',
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Payment verification error:', error);
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
    const minimumAmount = currency === 'GHS' ? 10 : 1;
    if (amount < minimumAmount) {
      return { valid: false, error: `Minimum donation is ${currency} ${minimumAmount}` };
    }

    return { valid: true };
  }
}

export const paymentService = new PaymentService();
