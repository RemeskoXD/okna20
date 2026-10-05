import React from 'react';

interface RenoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
}

export const RenoLogo: React.FC<RenoLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
}) => {
  const sizeConfig = {
    sm: { icon: 26, text: 'text-xl' },
    md: { icon: 32, text: 'text-2xl sm:text-[26px]' },
    lg: { icon: 40, text: 'text-3xl sm:text-4xl' },
    xl: { icon: 52, text: 'text-4xl sm:text-5xl' },
  };

  const currentSize = sizeConfig[size];
  const renoTextColor = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const oknaTextColor = 'text-cyan-600';

  return (
    <div className={`inline-flex items-center gap-2 select-none tracking-tight font-extrabold ${className}`}>
      {/* Precision architectural window mark */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Outer window chassis */}
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="6"
          className={variant === 'dark' ? 'stroke-cyan-400' : 'stroke-cyan-600'}
          strokeWidth="2.5"
          fill={variant === 'dark' ? 'rgba(6, 182, 212, 0.08)' : 'rgba(8, 145, 178, 0.05)'}
        />
        {/* Subtle pane division */}
        <line
          x1="20"
          y1="5"
          x2="20"
          y2="35"
          className={variant === 'dark' ? 'stroke-cyan-500/40' : 'stroke-cyan-600/30'}
          strokeWidth="1.5"
        />
        <line
          x1="5"
          y1="20"
          x2="35"
          y2="20"
          className={variant === 'dark' ? 'stroke-cyan-500/40' : 'stroke-cyan-600/30'}
          strokeWidth="1.5"
        />
        {/* Modern dynamic 'R' profile mark */}
        <path
          d="M12 28V12H19.5C22.5 12 24.5 13.6 24.5 16.2C24.5 18.3 23.2 19.8 21 20.3L25 28H20.8L17.2 21.2H15.2V28H12ZM15.2 18.2H19.2C20.8 18.2 21.6 17.5 21.6 16.3C21.6 15.1 20.8 14.5 19.2 14.5H15.2V18.2Z"
          className={variant === 'dark' ? 'fill-white' : 'fill-slate-900'}
        />
        {/* Precision service dot in cyan */}
        <circle
          cx="28"
          cy="12"
          r="2.5"
          className="fill-cyan-500"
        />
      </svg>

      {/* Typography wordmark */}
      <span className={`flex items-baseline leading-none ${currentSize.text}`}>
        <span className={`${renoTextColor} font-black tracking-[-0.03em]`}>Reno</span>
        <span className={`${oknaTextColor} font-black tracking-[-0.02em] ml-1.5`}>okna</span>
      </span>
    </div>
  );
};

