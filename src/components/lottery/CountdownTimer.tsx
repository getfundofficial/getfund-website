import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - Date.now();

      if (difference <= 0) {
        setIsExpired(true);
        onComplete?.();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <span className="text-lg font-semibold text-getfund-gold animate-pulse">
          Draw in progress!
        </span>
      </div>
    );
  }

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center px-2 sm:px-3">
      <div className="bg-gradient-to-br from-getfund-primary to-green-700 text-white text-xl sm:text-2xl md:text-3xl font-bold w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 flex items-center justify-center rounded-lg shadow-lg">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs sm:text-sm text-gray-600 mt-1 uppercase tracking-wide">{label}</span>
    </div>
  );

  const isLessThanOneDay = timeLeft.days === 0;

  // Show only days when more than 1 day remains
  if (!isLessThanOneDay) {
    return (
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center px-4 sm:px-6">
          <div className="bg-gradient-to-br from-getfund-primary to-green-700 text-white text-3xl sm:text-4xl md:text-5xl font-bold px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-center rounded-lg shadow-lg">
            {timeLeft.days}
          </div>
          <span className="text-sm sm:text-base text-gray-600 mt-2 uppercase tracking-wide">
            {timeLeft.days === 1 ? 'Day' : 'Days'} remaining
          </span>
        </div>
      </div>
    );
  }

  // Show hours, minutes, seconds when less than 1 day remains
  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2">
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-xl sm:text-2xl font-bold text-gray-400 mt-[-20px]">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-xl sm:text-2xl font-bold text-gray-400 mt-[-20px]">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default CountdownTimer;
