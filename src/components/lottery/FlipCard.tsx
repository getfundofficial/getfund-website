import React, { useState } from 'react';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode | null;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // If no back content, just render front without flip functionality
  if (!backContent) {
    return <div className={className}>{frontContent}</div>;
  }

  return (
    <div
      className={`flip-card-container ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          {frontContent}
        </div>
        <div className="flip-card-back">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
