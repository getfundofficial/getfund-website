import React from 'react';
import { CheckCircle2, Ticket, Calendar, Trophy, X } from 'lucide-react';

interface LotteryEntryData {
  id: string;
  payment_reference: string;
  donation_amount: number;
  currency: string;
  draw_month: string;
  campaign_title?: string;
  total_entries: number;
}

interface LotteryEntryConfirmationProps {
  entry: LotteryEntryData;
  onClose: () => void;
}

export const LotteryEntryConfirmation: React.FC<LotteryEntryConfirmationProps> = ({ entry, onClose }) => {
  const drawDate = new Date(entry.draw_month);
  const drawDateFormatted = drawDate.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  const currencySymbol = entry.currency === 'GHS' ? 'GH₵' : entry.currency === 'USD' ? '$' : '€';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-getfund-primary to-green-600 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex justify-center mb-3">
            <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-white">
            You're Entered!
          </h2>
          <p className="text-center text-white/90 mt-1 text-sm">
            Your donation has automatically entered you into the GETFund Scholarship Lottery
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Entry Details */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Ticket className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="font-semibold text-gray-900">Entry Details</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Entry Reference:</span>
                <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded text-xs">
                  {entry.payment_reference.slice(-12).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Donation Amount:</span>
                <span className="font-bold text-getfund-primary text-lg">
                  {currencySymbol}{entry.donation_amount.toLocaleString()}
                </span>
              </div>
              {entry.campaign_title && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Campaign:</span>
                  <span className="font-medium text-right max-w-[180px] truncate">{entry.campaign_title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Draw Info */}
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-getfund-primary" />
              <span className="text-sm text-gray-600">Draw Month:</span>
            </div>
            <span className="font-bold text-getfund-primary">{drawDateFormatted}</span>
          </div>

          {/* Current Entries Counter */}
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-getfund-primary/10 to-green-100 rounded-xl p-4 mb-6">
            <Trophy className="w-5 h-5 text-getfund-gold" />
            <span className="text-sm text-gray-700">
              Competing with <span className="font-bold text-getfund-primary">{entry.total_entries.toLocaleString()}</span> entries this month!
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => window.location.href = '/fundraising-campaigns'}
              className="flex-1 bg-getfund-primary hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              View Lottery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryEntryConfirmation;
