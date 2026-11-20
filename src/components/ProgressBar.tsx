import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  daysElapsed: number;
  totalDays?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ daysElapsed, totalDays = 30 }) => {
  const daysLeft = Math.max(0, totalDays - daysElapsed);
  const percentage = Math.min(100, (daysElapsed / totalDays) * 100);

  return (
    <div className="progress-wrapper">
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-labels">
        <span className="progress-left-text">
          Publicado hace {daysElapsed} días · {daysLeft} días restantes
        </span>
        <span className="progress-right-text">
          caducidad a los {totalDays} días
        </span>
      </div>
    </div>
  );
};