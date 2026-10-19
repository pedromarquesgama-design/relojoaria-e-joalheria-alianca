import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'emblem';
  showSubtitle?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-11 w-auto',
  variant = 'full',
  showSubtitle = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''}`}
    >
      <svg
        viewBox="0 0 540 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} transition-transform duration-300`}
      >
        <defs>
          {/* Rich antique warm gold gradient */}
          <linearGradient id="aliancaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9C874" />
            <stop offset="35%" stopColor="#C9A84C" />
            <stop offset="70%" stopColor="#DFB25E" />
            <stop offset="100%" stopColor="#A87E2C" />
          </linearGradient>

          {/* Clock hands faceted shading gradient */}
          <linearGradient id="handFacet1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="50%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>

          <linearGradient id="handFacet2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE6A1" />
            <stop offset="60%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#7A5618" />
          </linearGradient>

          {/* Subtle gold glow filter */}
          <filter id="subtleGoldGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* ========================================================
            1. EMBLEM: ZEN BRUSH RING WITH PRECISION CLOCK HANDS
            ======================================================== */}
        <g transform="translate(10, 5)">
          {/* Main Artisan Brush Enso Ring */}
          {/* Outer Ring Body with variable calligraphy thickness and brush-texture tail */}
          <path
            d="M 65 14
               C 35 14, 12 37, 12 67
               C 12 97, 35 120, 65 120
               C 85 120, 102 110, 111 93
               C 112.5 90.5, 109 88.5, 107 90.5
               C 99 98, 83 105, 65 105
               C 44 105, 27 88, 27 67
               C 27 46, 44 29, 65 29
               C 84 29, 100 42, 104 60
               C 104.8 63.5, 108.5 63.5, 109 60
               C 107 43, 94 24, 75 16
               C 72 14.8, 68.5 14, 65 14 Z"
            fill="url(#aliancaGoldGrad)"
          />

          {/* Textured brush stroke bristles and tapered tails at bottom-right (4h - 5h) */}
          <path
            d="M 103 89 C 112 79, 115 67, 114 55 C 113.8 52, 111 52, 110.8 54 C 111.5 65, 108 76, 100 85 C 98.5 87, 101.5 90.5, 103 89 Z"
            fill="url(#aliancaGoldGrad)"
            opacity="0.85"
          />
          <path
            d="M 95 102 C 104 96, 111 88, 114 78 C 114.8 75.5, 112 74, 111 76 C 108 85, 101 92, 93 98 C 91.5 99.5, 93.5 103, 95 102 Z"
            fill="url(#aliancaGoldGrad)"
            opacity="0.75"
          />
          <path
            d="M 82 114 C 91 112, 101 106, 108 97 C 109.5 95, 107 93, 105 95 C 99 103, 89 108, 80 110 C 78.5 110.5, 80 114.5, 82 114 Z"
            fill="url(#aliancaGoldGrad)"
            opacity="0.9"
          />
          <path
            d="M 68 119.5 C 76 119.2, 85 116.5, 92 112 C 93.5 110.8, 92 108.5, 90.5 109.5 C 84 113.5, 76 115.8, 68 116 C 66 116, 66 119.5, 68 119.5 Z"
            fill="url(#aliancaGoldGrad)"
            opacity="0.6"
          />

          {/* Center Pivot Point */}
          <circle cx="65" cy="67" r="5" fill="url(#aliancaGoldGrad)" />
          <circle cx="65" cy="67" r="2.2" fill="#0A0A0C" />

          {/* Clock Hour Hand (points towards ~11:00 with beveled watchmaker edge) */}
          <path
            d="M 63.5 65
               L 69.5 44
               L 72.5 45
               L 66.5 66
               Z"
            fill="url(#handFacet1)"
          />
          <path
            d="M 69.5 44
               L 71.5 41
               L 73.5 44.5
               L 72.5 45
               Z"
            fill="url(#handFacet1)"
          />

          {/* Clock Minute Hand (points towards ~3:15 with dagger sword profile) */}
          <path
            d="M 66 65
               L 95 72
               L 104 74.5
               L 95 77
               L 66 69
               Z"
            fill="url(#handFacet2)"
          />
          <path
            d="M 66 65 L 104 74.5 L 66 67 Z"
            fill="#FFF5DE"
            opacity="0.5"
          />
        </g>

        {/* ========================================================
            2. WORDMARK: "ALIANÇA" IN NOBLE GOLD SERIF
            ======================================================== */}
        <g id="logoTextAlianca">
          <text
            x="148"
            y="76"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="54"
            fontWeight="600"
            letterSpacing="5"
            fill="url(#aliancaGoldGrad)"
          >
            ALIANÇA
          </text>
        </g>

        {/* ========================================================
            3. SUBTITLE: "RELOJOARIA E JOALHERIA" IN CRISP WHITE
            ======================================================== */}
        {showSubtitle && (
          <g id="logoSubtitle">
            <text
              x="152"
              y="108"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontSize="16.5"
              fontWeight="500"
              letterSpacing="7.5"
              fill="#FAF8F5"
              opacity="0.98"
            >
              RELOJOARIA E JOALHERIA
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export const BrandEmblemOnly: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 32,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="emblemGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E9C874" />
          <stop offset="35%" stopColor="#C9A84C" />
          <stop offset="70%" stopColor="#DFB25E" />
          <stop offset="100%" stopColor="#A87E2C" />
        </linearGradient>
        <linearGradient id="embHandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D1" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#8A6721" />
        </linearGradient>
      </defs>

      {/* Main Artisan Brush Enso Ring */}
      <path
        d="M 65 14
           C 35 14, 12 37, 12 67
           C 12 97, 35 120, 65 120
           C 85 120, 102 110, 111 93
           C 112.5 90.5, 109 88.5, 107 90.5
           C 99 98, 83 105, 65 105
           C 44 105, 27 88, 27 67
           C 27 46, 44 29, 65 29
           C 84 29, 100 42, 104 60
           C 104.8 63.5, 108.5 63.5, 109 60
           C 107 43, 94 24, 75 16
           C 72 14.8, 68.5 14, 65 14 Z"
        fill="url(#emblemGoldGrad)"
      />

      {/* Bristles at 4h - 5h */}
      <path
        d="M 103 89 C 112 79, 115 67, 114 55 C 113.8 52, 111 52, 110.8 54 C 111.5 65, 108 76, 100 85 C 98.5 87, 101.5 90.5, 103 89 Z"
        fill="url(#emblemGoldGrad)"
        opacity="0.85"
      />
      <path
        d="M 95 102 C 104 96, 111 88, 114 78 C 114.8 75.5, 112 74, 111 76 C 108 85, 101 92, 93 98 C 91.5 99.5, 93.5 103, 95 102 Z"
        fill="url(#emblemGoldGrad)"
        opacity="0.75"
      />
      <path
        d="M 82 114 C 91 112, 101 106, 108 97 C 109.5 95, 107 93, 105 95 C 99 103, 89 108, 80 110 C 78.5 110.5, 80 114.5, 82 114 Z"
        fill="url(#emblemGoldGrad)"
        opacity="0.9"
      />

      {/* Center Pivot Point */}
      <circle cx="65" cy="67" r="5" fill="url(#emblemGoldGrad)" />
      <circle cx="65" cy="67" r="2.2" fill="#0A0A0C" />

      {/* Hour Hand */}
      <path
        d="M 63.5 65 L 69.5 44 L 72.5 45 L 66.5 66 Z"
        fill="url(#embHandGrad)"
      />
      <path
        d="M 69.5 44 L 71.5 41 L 73.5 44.5 L 72.5 45 Z"
        fill="url(#embHandGrad)"
      />

      {/* Minute Hand */}
      <path
        d="M 66 65 L 95 72 L 104 74.5 L 95 77 L 66 69 Z"
        fill="url(#embHandGrad)"
      />
    </svg>
  );
};
