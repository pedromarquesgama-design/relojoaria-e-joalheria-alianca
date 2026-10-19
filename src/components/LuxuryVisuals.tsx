import React from 'react';

export const GoldEmblem: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="1.2" strokeDasharray="1 3" />
    <circle cx="20" cy="20" r="14.5" stroke="#D4943E" strokeWidth="1.5" />
    <circle cx="20" cy="20" r="11" stroke="#FAF8F5" strokeWidth="0.8" opacity="0.6" />
    {/* Minimalist clock hand & jewel intersection */}
    <line x1="20" y1="20" x2="20" y2="11" stroke="#FAF8F5" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="20" x2="26" y2="20" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="20" r="2" fill="#D4943E" />
    {/* 4 cardinal hour marks */}
    <circle cx="20" cy="7.5" r="1" fill="#C9A84C" />
    <circle cx="32.5" cy="20" r="1" fill="#C9A84C" />
    <circle cx="20" cy="32.5" r="1" fill="#C9A84C" />
    <circle cx="7.5" cy="20" r="1" fill="#C9A84C" />
  </svg>
);

export const HeroVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-full h-full min-h-[380px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0D0D10] border border-[#C9A84C]/25 ${className}`}>
    {/* Dark atmospheric radial glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_40%,rgba(212,148,62,0.18)_0%,rgba(18,18,22,0.85)_55%,#0A0A0C_100%)] pointer-events-none" />
    
    {/* Subtle fine technical grid backdrop */}
    <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

    <svg
      viewBox="0 0 600 500"
      className="w-full h-full max-h-[520px] select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gold Gradients */}
        <linearGradient id="heroGold1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="30%" stopColor="#E6C364" />
          <stop offset="60%" stopColor="#C9A84C" />
          <stop offset="85%" stopColor="#966C22" />
          <stop offset="100%" stopColor="#D4943E" />
        </linearGradient>

        <linearGradient id="heroGold2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF8F5" />
          <stop offset="25%" stopColor="#E3BE62" />
          <stop offset="50%" stopColor="#B38934" />
          <stop offset="80%" stopColor="#875E19" />
          <stop offset="100%" stopColor="#E4BA58" />
        </linearGradient>

        <linearGradient id="steelBezel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#303038" />
          <stop offset="40%" stopColor="#1C1B20" />
          <stop offset="70%" stopColor="#0E0E12" />
          <stop offset="100%" stopColor="#24232B" />
        </linearGradient>

        <linearGradient id="dialGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.12" />
          <stop offset="45%" stopColor="#FAF8F5" stopOpacity="0.04" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.08" />
        </linearGradient>

        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <radialGradient id="ringShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Surface Shadow pool */}
      <ellipse cx="260" cy="400" rx="200" ry="40" fill="url(#ringShadow)" />
      <ellipse cx="410" cy="380" rx="140" ry="30" fill="url(#ringShadow)" />

      {/* --- WATCH COMPONENT (Dark Steel & Gold Chronograph) --- */}
      <g transform="translate(140, 70)">
        {/* Lug accents */}
        <path d="M40 90 L60 160 L80 150 L60 80 Z" fill="#202026" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6" />
        <path d="M260 90 L240 160 L220 150 L240 80 Z" fill="#202026" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6" />
        <path d="M40 310 L60 240 L80 250 L60 320 Z" fill="#202026" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6" />
        <path d="M260 310 L240 240 L220 250 L240 320 Z" fill="#202026" stroke="#C9A84C" strokeWidth="0.8" opacity="0.6" />

        {/* Watch Outer Case */}
        <circle cx="150" cy="200" r="120" fill="url(#steelBezel)" stroke="#393945" strokeWidth="2" />
        
        {/* Knurled Gold Bezel Rim */}
        <circle cx="150" cy="200" r="114" stroke="url(#heroGold1)" strokeWidth="3.5" strokeDasharray="3 2" />
        <circle cx="150" cy="200" r="110" stroke="#0E0E12" strokeWidth="1.5" />

        {/* Tachymetre Ceramic Ring */}
        <circle cx="150" cy="200" r="105" fill="#111116" stroke="#25242C" strokeWidth="1" />
        {/* Tachymetre fine markings */}
        <circle cx="150" cy="200" r="102" stroke="#8A8275" strokeWidth="0.7" strokeDasharray="1 5" />
        
        {/* Chronograph Crown & Pushers */}
        <rect x="268" y="188" width="16" height="24" rx="2" fill="url(#heroGold1)" stroke="#5A4315" strokeWidth="0.8" />
        <rect x="256" y="145" width="12" height="16" rx="2" fill="#2E2E38" stroke="url(#heroGold1)" strokeWidth="1" />
        <rect x="256" y="239" width="12" height="16" rx="2" fill="#2E2E38" stroke="url(#heroGold1)" strokeWidth="1" />

        {/* Deep Black Sunburst Dial */}
        <circle cx="150" cy="200" r="90" fill="#0A0A0E" />
        
        {/* Concentric Subdials */}
        <circle cx="150" cy="165" r="25" fill="#0E0E14" stroke="#C9A84C" strokeWidth="0.75" opacity="0.7" />
        <circle cx="115" cy="215" r="22" fill="#0E0E14" stroke="#C9A84C" strokeWidth="0.75" opacity="0.7" />
        <circle cx="185" cy="215" r="22" fill="#0E0E14" stroke="#C9A84C" strokeWidth="0.75" opacity="0.7" />
        
        {/* Subdial Hands */}
        <line x1="150" y1="165" x2="150" y2="150" stroke="#FAF8F5" strokeWidth="1" />
        <line x1="115" y1="215" x2="124" y2="210" stroke="#FAF8F5" strokeWidth="1" />
        <line x1="185" y1="215" x2="178" y2="222" stroke="#C9A84C" strokeWidth="1" />

        {/* Applied 18K Gold Faceted Hour Batons */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 150 + Math.sin(rad) * 74;
          const y1 = 200 - Math.cos(rad) * 74;
          const x2 = 150 + Math.sin(rad) * 85;
          const y2 = 200 - Math.cos(rad) * 85;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#heroGold1)"
              strokeWidth={i % 3 === 0 ? "3" : "1.8"}
              strokeLinecap="square"
            />
          );
        })}

        {/* Brand Inscription on Dial */}
        <text
          x="150"
          y="132"
          textAnchor="middle"
          fill="#FAF8F5"
          fontFamily="Playfair Display, serif"
          fontSize="9"
          letterSpacing="2.5"
          fontWeight="600"
        >
          ALIANÇA
        </text>
        <text
          x="150"
          y="142"
          textAnchor="middle"
          fill="#C9A84C"
          fontFamily="JetBrains Mono, monospace"
          fontSize="5.5"
          letterSpacing="1.2"
        >
          PORTO SEGURO
        </text>

        {/* Date Window at 4 o'clock */}
        <rect x="188" y="196" width="14" height="11" fill="#FAF8F5" stroke="#C9A84C" strokeWidth="0.8" rx="1" />
        <text x="195" y="205" textAnchor="middle" fill="#0A0A0C" fontFamily="JetBrains Mono, monospace" fontSize="7.5" fontWeight="600">
          19
        </text>

        {/* Hands */}
        {/* Hour Hand */}
        <polygon points="150,202 146,200 148,145 152,145 154,200" fill="url(#heroGold1)" stroke="#5A4315" strokeWidth="0.5" />
        {/* Minute Hand */}
        <polygon points="150,202 147,200 149,122 151,122 153,200" fill="url(#heroGold2)" stroke="#5A4315" strokeWidth="0.5" />
        {/* Chrono Second Hand in Gold */}
        <line x1="150" y1="220" x2="150" y2="114" stroke="#FAF8F5" strokeWidth="1" />
        <circle cx="150" cy="200" r="3.5" fill="url(#heroGold1)" stroke="#0E0E12" strokeWidth="1" />
        <circle cx="150" cy="200" r="1" fill="#FAF8F5" />

        {/* Curved Sapphire Specular Arc */}
        <path
          d="M75 160 A85 85 0 0 1 200 120"
          stroke="url(#dialGlass)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* --- HANDCRAFTED 18K GOLD WEDDING BANDS (In foreground with chiaroscuro) --- */}
      {/* Primary Thick Chamfered Ring */}
      <g transform="translate(320, 260) rotate(-14)">
        {/* Outer Ring Body Ellipse (3D Torus projection) */}
        <path
          d="M30 70 C30 30, 150 30, 150 70 C150 110, 30 110, 30 70 Z"
          fill="url(#heroGold1)"
          stroke="#E6C364"
          strokeWidth="1.5"
        />
        {/* Inner Hole Cutout */}
        <path
          d="M48 70 C48 42, 132 42, 132 70 C132 98, 48 98, 48 70 Z"
          fill="#0C0C10"
          stroke="#8A631E"
          strokeWidth="2"
        />
        {/* Inner Inscription */}
        <path
          d="M58 66 C75 52, 105 52, 122 66"
          stroke="#553F16"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          fill="none"
        />
        {/* Chamfered Bevel Highlight Ridge */}
        <path
          d="M31 71 C34 98, 146 98, 149 71 C144 104, 36 104, 31 71 Z"
          fill="url(#heroGold2)"
        />
        {/* Mirror Specular Glint */}
        <path
          d="M40 76 C60 96, 90 99, 110 88"
          stroke="#FAF8F5"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#goldGlow)"
          opacity="0.9"
        />
        <circle cx="44" cy="78" r="3" fill="#FFFFFF" filter="url(#goldGlow)" />
      </g>

      {/* Secondary Companion Ring (Interlocking / Angled) */}
      <g transform="translate(385, 290) rotate(22)">
        <path
          d="M20 55 C20 22, 120 22, 120 55 C120 88, 20 88, 20 55 Z"
          fill="url(#heroGold2)"
          stroke="#C9A84C"
          strokeWidth="1.2"
        />
        <path
          d="M34 55 C34 32, 106 32, 106 55 C106 78, 34 78, 34 55 Z"
          fill="#0A0A0E"
          stroke="#6E4D12"
          strokeWidth="1.5"
        />
        {/* Micro-pave diamond row on top edge */}
        {[48, 58, 68, 78, 88].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={34} r="1.8" fill="#FFFFFF" />
            <circle cx={x} cy={34} r="0.8" fill="#D0EFFF" />
          </g>
        ))}
        {/* Specular Edge */}
        <path
          d="M22 56 C26 78, 114 78, 118 56"
          stroke="#FFF2D6"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>

    {/* Floating Technical Caliber & Spec Tags */}
    <div className="absolute top-5 right-5 flex flex-col items-end gap-1.5 pointer-events-none">
      <span className="text-[10px] uppercase font-mono tracking-[0.14em] text-[#C9A84C] bg-[#121216]/90 px-2.5 py-1 border border-[#C9A84C]/30 backdrop-blur-md">
        CALIBRE AUTOMÁTICO 28.800 VPH
      </span>
      <span className="text-[9px] uppercase font-mono tracking-[0.12em] text-[#9A968E] bg-[#0A0A0C]/80 px-2 py-0.5 border border-white/5">
        OURO 18K 750 MACIÇO
      </span>
    </div>

    {/* Bottom Authenticity Seal */}
    <div className="absolute bottom-5 left-5 flex items-center gap-2.5 pointer-events-none">
      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] ring-4 ring-[#C9A84C]/20" />
      <span className="text-[11px] font-mono tracking-wider text-[#9A968E]">
        OURIVESARIA PRÓPRIA · PORTO SEGURO, BA
      </span>
    </div>
  </div>
);

export const CategoryGraphic: React.FC<{ type: 'relogios' | 'joias' | 'aliancas' | 'oculos' | 'oficina'; className?: string }> = ({ type, className = '' }) => {
  return (
    <div className={`relative w-full h-full min-h-[260px] bg-[#101014] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background vignette & ambient tone */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.12)_0%,rgba(14,14,18,0.95)_70%,#0A0A0C_100%)] pointer-events-none" />

      {type === 'relogios' && (
        <svg viewBox="0 0 280 320" className="w-4/5 h-4/5 max-h-[260px]" fill="none">
          <circle cx="140" cy="160" r="95" fill="#14141A" stroke="#C9A84C" strokeWidth="2" />
          <circle cx="140" cy="160" r="88" stroke="#33333F" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="140" cy="160" r="75" fill="#0A0A0D" stroke="#D4943E" strokeWidth="0.8" />
          {/* Subdials */}
          <circle cx="140" cy="130" r="20" stroke="#C9A84C" strokeWidth="0.75" />
          <circle cx="110" cy="175" r="18" stroke="#C9A84C" strokeWidth="0.75" />
          <circle cx="170" cy="175" r="18" stroke="#C9A84C" strokeWidth="0.75" />
          {/* Hour markers */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={140 + Math.sin(rad) * 62}
                y1={160 - Math.cos(rad) * 62}
                x2={140 + Math.sin(rad) * 72}
                y2={160 - Math.cos(rad) * 72}
                stroke="#E6C364"
                strokeWidth={i % 3 === 0 ? "2.5" : "1.2"}
              />
            );
          })}
          {/* Hands */}
          <line x1="140" y1="160" x2="140" y2="105" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="140" y1="160" x2="185" y2="160" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
          <circle cx="140" cy="160" r="4" fill="#D4943E" />
          {/* Light specular sweep */}
          <path d="M70 120 Q140 90 200 120" stroke="#FFF2D6" strokeWidth="2" opacity="0.4" fill="none" />
        </svg>
      )}

      {type === 'aliancas' && (
        <svg viewBox="0 0 280 320" className="w-4/5 h-4/5 max-h-[260px]" fill="none">
          <ellipse cx="140" cy="240" rx="90" ry="20" fill="#000000" opacity="0.6" />
          {/* Open velvet box rim */}
          <rect x="50" y="160" width="180" height="90" rx="8" fill="#181820" stroke="#C9A84C" strokeWidth="1" />
          <ellipse cx="140" cy="160" rx="90" ry="25" fill="#111116" stroke="#C9A84C" strokeWidth="0.8" />
          <rect x="75" y="145" width="130" height="25" rx="4" fill="#0A0A0D" />
          
          {/* First Ring */}
          <g transform="translate(95, 115) rotate(-12)">
            <ellipse cx="25" cy="40" rx="35" ry="18" fill="none" stroke="#D4943E" strokeWidth="9" />
            <ellipse cx="25" cy="40" rx="35" ry="18" fill="none" stroke="#FAF8F5" strokeWidth="1.5" opacity="0.8" />
          </g>
          {/* Second Ring */}
          <g transform="translate(135, 125) rotate(15)">
            <ellipse cx="25" cy="40" rx="30" ry="16" fill="none" stroke="#E6C364" strokeWidth="8" />
            <ellipse cx="25" cy="40" rx="30" ry="16" fill="none" stroke="#FFF" strokeWidth="1.2" opacity="0.9" />
          </g>
          {/* Sparkles */}
          <circle cx="105" cy="130" r="2.5" fill="#FFFFFF" />
          <circle cx="160" cy="140" r="2" fill="#FFFFFF" />
        </svg>
      )}

      {type === 'joias' && (
        <svg viewBox="0 0 280 320" className="w-4/5 h-4/5 max-h-[260px]" fill="none">
          {/* Gold Chain draping */}
          <path
            d="M30 60 C80 180, 200 180, 250 60"
            stroke="#D4943E"
            strokeWidth="5"
            strokeDasharray="4 2"
            fill="none"
          />
          <path
            d="M30 60 C80 180, 200 180, 250 60"
            stroke="#FAF8F5"
            strokeWidth="1.2"
            strokeDasharray="1 8"
            fill="none"
            opacity="0.9"
          />
          {/* Solitaire Ring Centerpiece */}
          <g transform="translate(110, 160)">
            <ellipse cx="30" cy="50" rx="36" ry="16" fill="none" stroke="#C9A84C" strokeWidth="6" />
            {/* Prongs */}
            <line x1="25" y1="36" x2="22" y2="24" stroke="#FAF8F5" strokeWidth="2.5" />
            <line x1="35" y1="36" x2="38" y2="24" stroke="#FAF8F5" strokeWidth="2.5" />
            {/* Brilliant Diamond */}
            <polygon points="30,12 44,24 16,24" fill="#E8F4F8" stroke="#FAF8F5" strokeWidth="1" />
            <polygon points="16,24 44,24 30,38" fill="#CFE6F2" stroke="#FAF8F5" strokeWidth="1" />
            <circle cx="30" cy="24" r="3" fill="#FFFFFF" />
          </g>
        </svg>
      )}

      {type === 'oculos' && (
        <svg viewBox="0 0 280 320" className="w-4/5 h-4/5 max-h-[260px]" fill="none">
          <ellipse cx="140" cy="230" rx="100" ry="16" fill="#000000" opacity="0.6" />
          <g transform="translate(20, 120)">
            {/* Left Rim */}
            <rect x="25" y="20" width="85" height="65" rx="16" fill="#14141B" stroke="#C9A84C" strokeWidth="3" />
            <rect x="30" y="25" width="75" height="55" rx="12" fill="#0C0C12" stroke="#FAF8F5" strokeWidth="0.8" opacity="0.3" />
            {/* Right Rim */}
            <rect x="130" y="20" width="85" height="65" rx="16" fill="#14141B" stroke="#C9A84C" strokeWidth="3" />
            <rect x="135" y="25" width="75" height="55" rx="12" fill="#0C0C12" stroke="#FAF8F5" strokeWidth="0.8" opacity="0.3" />
            {/* Titanium Bridge */}
            <path d="M110 38 Q120 30 130 38" stroke="#E6C364" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M109 46 Q120 42 131 46" stroke="#D4943E" strokeWidth="2" fill="none" />
            {/* Temples */}
            <line x1="25" y1="35" x2="5" y2="48" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="215" y1="35" x2="235" y2="48" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
            {/* Specular glare across lens */}
            <path d="M40 70 L85 30" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
            <path d="M145 70 L190 30" stroke="#FFF" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          </g>
        </svg>
      )}

      {type === 'oficina' && (
        <svg viewBox="0 0 280 320" className="w-4/5 h-4/5 max-h-[260px]" fill="none">
          {/* Anvil / Jeweler block */}
          <polygon points="70,220 210,220 230,260 50,260" fill="#181822" stroke="#C9A84C" strokeWidth="1" />
          {/* Goldsmith ring mandrel */}
          <polygon points="120,110 160,110 145,210 135,210" fill="#30303E" stroke="#505064" strokeWidth="1" />
          {/* Ring being worked on */}
          <ellipse cx="140" cy="160" rx="26" ry="12" fill="none" stroke="#D4943E" strokeWidth="6" />
          <ellipse cx="140" cy="160" rx="26" ry="12" fill="none" stroke="#FFDF85" strokeWidth="1.5" />
          {/* Micro blowtorch tip */}
          <polygon points="60,130 85,142 80,150 55,138" fill="#5A5A6A" />
          <line x1="85" y1="145" x2="120" y2="158" stroke="#4AA3FF" strokeWidth="3" strokeLinecap="round" />
          {/* Flame core */}
          <polygon points="115,155 130,159 116,163" fill="#FFA500" />
          <circle cx="125" cy="159" r="4" fill="#FFF275" opacity="0.9" />
          {/* Incandescent glow */}
          <circle cx="138" cy="160" r="18" fill="#FF8C00" opacity="0.25" />
          {/* Tweezers */}
          <line x1="185" y1="120" x2="155" y2="156" stroke="#9090A0" strokeWidth="2.5" />
          <line x1="190" y1="125" x2="157" y2="162" stroke="#707080" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

export const ProductCardGraphic: React.FC<{ type: string; className?: string }> = ({ type, className = '' }) => {
  switch (type) {
    case 'aliancas-18k':
      return <CategoryGraphic type="aliancas" className={className} />;
    case 'cronografo-gold':
      return <CategoryGraphic type="relogios" className={className} />;
    case 'solitario-diamante':
      return <CategoryGraphic type="joias" className={className} />;
    case 'corrente-grumet':
      return (
        <div className={`relative w-full h-full min-h-[220px] bg-[#101014] flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,148,62,0.14)_0%,#0A0A0C_85%)]" />
          <svg viewBox="0 0 240 240" className="w-3/4 h-3/4" fill="none">
            {/* Grumet Links */}
            {[0, 1, 2, 3, 4].map((idx) => {
              const y = 50 + idx * 28;
              return (
                <g key={idx} transform={`translate(70, ${y})`}>
                  <rect x="0" y="0" width="100" height="20" rx="10" fill="none" stroke="#D4943E" strokeWidth="5" />
                  <rect x="15" y="4" width="70" height="12" rx="6" fill="#0A0A0E" />
                  <line x1="5" y1="10" x2="95" y2="10" stroke="#FFF2D6" strokeWidth="1" opacity="0.6" />
                </g>
              );
            })}
            {/* Solid Gold Custom Pendant */}
            <circle cx="120" cy="190" r="24" fill="#D4943E" stroke="#FFF2D6" strokeWidth="1.5" />
            <circle cx="120" cy="190" r="20" fill="#B37C2B" />
            <text x="120" y="195" textAnchor="middle" fill="#FAF8F5" fontFamily="Playfair Display, serif" fontSize="14" fontWeight="bold">
              A
            </text>
          </svg>
        </div>
      );
    default:
      return <CategoryGraphic type="aliancas" className={className} />;
  }
};
