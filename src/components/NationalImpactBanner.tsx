import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface NationalImpactBannerProps {
  lang?: 'en' | 'bn';
}

export const NationalImpactBanner: React.FC<NationalImpactBannerProps> = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredCard(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[16/9] min-h-[440px] xs:min-h-[480px] sm:min-h-[540px] md:min-h-[580px] max-h-[660px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/40 select-none transition-all duration-300 flex flex-col items-center justify-between p-4 sm:p-7 md:p-10"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #0d281e 0%, #081d15 45%, #04120d 80%, #020a07 100%)',
      }}
    >
      {/* Background Organic Leaf Veins & Texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leafVeinNet5" width="160" height="160" patternUnits="userSpaceOnUse">
              <path
                d="M0,80 Q40,30 80,80 T160,80 M80,0 Q40,40 80,80 T80,160 M20,40 Q60,60 100,40 M60,100 Q80,130 120,100"
                fill="none"
                stroke="#52b788"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafVeinNet5)" />
        </svg>
      </div>

      {/* Ambient Pulsating Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Tiny Shopping Cart (Top Right as in the picture) */}
      <div
        className="absolute top-10 sm:top-14 right-14 sm:right-24 text-emerald-400/40 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px) rotate(14deg)`,
          animation: 'cartBobImpact 4s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
      </div>

      {/* ============================================================== */}
      {/* 1. TOP LOGO UNIT: GREENSHOP BAG WITH LEAF + LAUREL BRANCHES   */}
      {/* ============================================================== */}
      <div
        className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 pt-1 transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
        }}
      >
        {/* Left Laurel Leaves Branch */}
        <div
          className="w-14 sm:w-20 md:w-24 text-emerald-400/80 pointer-events-none"
          style={{ animation: 'laurelSwayLeft5 5s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 60" fill="none" className="w-full h-auto drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
            <path d="M95,45 Q50,30 5,20" stroke="#52b788" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M80,38 C70,25 78,16 88,28 C89,33 84,37 80,38 Z" fill="#74c69d" />
            <path d="M60,32 C50,18 58,10 68,22 C69,27 64,31 60,32 Z" fill="#52b788" />
            <path d="M40,26 C30,12 38,4 48,16 C49,21 44,25 40,26 Z" fill="#74c69d" />
            <path d="M20,22 C10,8 18,2 27,12 C28,17 23,21 20,22 Z" fill="#40916c" />
            <path d="M72,42 C70,55 80,58 84,46 C83,41 77,41 72,42 Z" fill="#40916c" />
            <path d="M52,36 C50,49 60,52 64,40 C63,35 57,35 52,36 Z" fill="#52b788" />
            <path d="M32,30 C30,43 40,46 44,34 C43,29 37,29 32,30 Z" fill="#74c69d" />
          </svg>
        </div>

        {/* Center GreenShop Bag Icon */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(52,211,153,0.7)]"
            style={{ animation: 'logoPulse5 3.5s ease-in-out infinite' }}
          >
            {/* Bag outline */}
            <rect
              x="8"
              y="14"
              width="32"
              height="30"
              rx="6"
              stroke="#ffffff"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bag handle */}
            <path
              d="M17 14V11C17 7.134 20.134 4 24 4C27.866 4 31 7.134 31 11V14"
              stroke="#ffffff"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
            {/* Vibrant Emerald Leaf Motif inside Bag */}
            <path
              d="M16 36C16 36 17 24 28 20C28 20 28 29 22 33C19 35 16 36 16 36Z"
              fill="url(#impactLeafMain)"
            />
            <path
              d="M21 34C21 34 26 23 34 21C34 21 33 30 26 33C24 34 21 34 21 34Z"
              fill="url(#impactLeafAccent)"
            />
            {/* Stem line */}
            <path
              d="M14 38C17 35 22 29 31 22"
              stroke="#a7f3d0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="impactLeafMain" x1="16" y1="20" x2="28" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="impactLeafAccent" x1="21" y1="21" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="1" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Right Laurel Leaves Branch */}
        <div
          className="w-14 sm:w-20 md:w-24 text-emerald-400/80 pointer-events-none transform -scale-x-100"
          style={{ animation: 'laurelSwayRight5 5s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 60" fill="none" className="w-full h-auto drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
            <path d="M95,45 Q50,30 5,20" stroke="#52b788" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M80,38 C70,25 78,16 88,28 C89,33 84,37 80,38 Z" fill="#74c69d" />
            <path d="M60,32 C50,18 58,10 68,22 C69,27 64,31 60,32 Z" fill="#52b788" />
            <path d="M40,26 C30,12 38,4 48,16 C49,21 44,25 40,26 Z" fill="#74c69d" />
            <path d="M20,22 C10,8 18,2 27,12 C28,17 23,21 20,22 Z" fill="#40916c" />
            <path d="M72,42 C70,55 80,58 84,46 C83,41 77,41 72,42 Z" fill="#40916c" />
            <path d="M52,36 C50,49 60,52 64,40 C63,35 57,35 52,36 Z" fill="#52b788" />
            <path d="M32,30 C30,43 40,46 44,34 C43,29 37,29 32,30 Z" fill="#74c69d" />
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. THE 3 NATIONAL PILLAR CARDS (কর্মসংস্থান | উৎপাদন | GDP)    */}
      {/* ============================================================== */}
      <div
        className="relative z-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-auto px-2 transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
        }}
      >
        {/* CARD 1: কর্মসংস্থান (Employment & Workforce Growth) */}
        <div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`flex flex-col items-center justify-center p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
            hoveredCard === 1
              ? 'bg-[#1b4332]/95 border-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.45)] scale-[1.04]'
              : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-xl'
          }`}
        >
          {/* Icon Unit */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(116,198,157,0.4)]">
              {/* 3 People silhouettes in team formation */}
              {/* Person Left */}
              <circle cx="28" cy="40" r="7" fill="#b7e4c7" />
              <path d="M18,60 C18,52 24,49 28,49 C32,49 38,52 38,60 Z" fill="#74c69d" />
              {/* Person Right */}
              <circle cx="72" cy="40" r="7" fill="#b7e4c7" />
              <path d="M62,60 C62,52 68,49 72,49 C76,49 82,52 82,60 Z" fill="#74c69d" />
              {/* Person Center Front (Leader) */}
              <circle cx="50" cy="34" r="8" fill="#d8f3dc" />
              <path d="M38,56 C38,47 45,44 50,44 C55,44 62,47 62,56 Z" fill="#95d5b2" />

              {/* Bold Upward Growth Arrow (Animated gently rising) */}
              <path
                d="M20,68 L44,48 L56,58 L82,32"
                stroke="#52b788"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: 'arrowRise1 3s ease-in-out infinite' }}
              />
              <path
                d="M72,32 L82,32 L82,42"
                stroke="#52b788"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: 'arrowRise1 3s ease-in-out infinite' }}
              />
            </svg>
          </div>

          {/* Bangla Label */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
            কর্মসংস্থান
          </h3>
        </div>

        {/* CARD 2: উৎপাদন (Production & Processing Machinery) */}
        <div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`flex flex-col items-center justify-center p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
            hoveredCard === 2
              ? 'bg-[#1b4332]/95 border-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.45)] scale-[1.04]'
              : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-xl'
          }`}
        >
          {/* Icon Unit */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(116,198,157,0.4)]">
              {/* Modern Agro Factory with Roof and Chimney */}
              <path
                d="M20,70 L20,44 L32,32 L32,70 L48,54 L48,70 L62,70 L62,72 L20,72 Z"
                fill="#74c69d"
              />
              {/* Smokestack chimney on left */}
              <rect x="22" y="24" width="7" height="18" fill="#52b788" />
              {/* Smoke puffs */}
              <circle cx="25" cy="18" r="3.5" fill="#d8f3dc" opacity="0.8" style={{ animation: 'smokePuff 2.5s infinite' }} />
              <circle cx="27" cy="11" r="4.5" fill="#b7e4c7" opacity="0.6" style={{ animation: 'smokePuff 2.5s infinite 0.5s' }} />

              {/* Rotating Gear 1 (Right top) */}
              <g
                transform="translate(68, 42)"
                style={{ animation: 'gearSpinClockwise 8s linear infinite', transformOrigin: 'center' }}
              >
                <circle cx="0" cy="0" r="10" fill="none" stroke="#b7e4c7" strokeWidth="4" />
                <circle cx="0" cy="0" r="4" fill="#1b4332" />
                {/* Gear teeth */}
                <rect x="-2" y="-14" width="4" height="4" fill="#b7e4c7" />
                <rect x="-2" y="10" width="4" height="4" fill="#b7e4c7" />
                <rect x="-14" y="-2" width="4" height="4" fill="#b7e4c7" />
                <rect x="10" y="-2" width="4" height="4" fill="#b7e4c7" />
                <rect x="-10" y="-10" width="4" height="4" fill="#b7e4c7" transform="rotate(45)" />
                <rect x="7" y="7" width="4" height="4" fill="#b7e4c7" transform="rotate(45)" />
              </g>

              {/* Rotating Gear 2 (Right bottom) */}
              <g
                transform="translate(74, 62)"
                style={{ animation: 'gearSpinCounter 6s linear infinite', transformOrigin: 'center' }}
              >
                <circle cx="0" cy="0" r="8" fill="none" stroke="#74c69d" strokeWidth="3" />
                <circle cx="0" cy="0" r="3" fill="#1b4332" />
                <rect x="-1.5" y="-11" width="3" height="3" fill="#74c69d" />
                <rect x="-1.5" y="8" width="3" height="3" fill="#74c69d" />
                <rect x="-11" y="-1.5" width="3" height="3" fill="#74c69d" />
                <rect x="8" y="-1.5" width="3" height="3" fill="#74c69d" />
              </g>

              {/* Factory windows */}
              <rect x="25" y="52" width="4" height="6" fill="#1b4332" />
              <rect x="37" y="52" width="4" height="6" fill="#1b4332" />
              <rect x="25" y="62" width="4" height="6" fill="#1b4332" />
              <rect x="37" y="62" width="4" height="6" fill="#1b4332" />
            </svg>
          </div>

          {/* Bangla Label */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
            উৎপাদন
          </h3>
        </div>

        {/* CARD 3: GDP (Gross Domestic Product & Export Revenue) */}
        <div
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`flex flex-col items-center justify-center p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${
            hoveredCard === 3
              ? 'bg-[#1b4332]/95 border-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.45)] scale-[1.04]'
              : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-xl'
          }`}
        >
          {/* Icon Unit */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(116,198,157,0.4)]">
              {/* Floating Currency Coins (৳ Taka on left, $ Dollar on right) */}
              <circle cx="34" cy="28" r="8" fill="#d8f3dc" stroke="#2d6a4f" strokeWidth="1.5" />
              <text x="31" y="32" fontSize="9" fontWeight="bold" fill="#1b4332">৳</text>

              <circle cx="56" cy="22" r="8" fill="#b7e4c7" stroke="#2d6a4f" strokeWidth="1.5" />
              <text x="53.5" y="26" fontSize="9" fontWeight="bold" fill="#1b4332">$</text>

              {/* Upward Growth Arrow */}
              <path
                d="M32,46 L54,34 L68,38 L86,18"
                stroke="#52b788"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: 'arrowRise1 3s ease-in-out infinite' }}
              />
              <path
                d="M78,18 L86,18 L86,26"
                stroke="#52b788"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: 'arrowRise1 3s ease-in-out infinite' }}
              />

              {/* Bar Chart Bars (Ascending order) */}
              <rect x="36" y="58" width="6" height="14" rx="1.5" fill="#52b788" />
              <rect x="47" y="50" width="6" height="22" rx="1.5" fill="#74c69d" />
              <rect x="58" y="42" width="6" height="30" rx="1.5" fill="#95d5b2" />
              <rect x="69" y="34" width="6" height="38" rx="1.5" fill="#b7e4c7" />
              <rect x="80" y="26" width="6" height="46" rx="1.5" fill="#d8f3dc" />

              {/* "GDP" Badge under the bars */}
              <rect x="30" y="74" width="46" height="12" rx="3" fill="#74c69d" />
              <text x="39" y="83" fontSize="9" fontWeight="900" fill="#0d281e" letterSpacing="0.8">GDP</text>
            </svg>
          </div>

          {/* GDP Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm font-sans">
            GDP
          </h3>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. BOTTOM GREEN HORIZONTAL DIVIDER BAR                         */}
      {/* ============================================================== */}
      <div className="relative w-64 xs:w-80 sm:w-[420px] md:w-[540px] lg:w-[620px] h-2 xs:h-2.5 sm:h-3 mt-1 sm:mt-2 rounded-full overflow-hidden shadow-xs border border-emerald-900/40">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'linear-gradient(to right, #0d3b25 0%, #1e5438 35%, #2d6a4f 60%, #52b788 85%, #d8f3dc 98%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-90 rounded-full"
          style={{ animation: 'barShimmerBottom5 3s ease-in-out infinite' }}
        />
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes logoPulse5 {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 16px rgba(52,211,153,0.6)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 24px rgba(52,211,153,0.85)); }
        }
        @keyframes laurelSwayLeft5 {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-4deg) translateY(-2px); }
        }
        @keyframes laurelSwayRight5 {
          0%, 100% { transform: scaleX(-1) rotate(0deg); }
          50% { transform: scaleX(-1) rotate(4deg) translateY(-2px); }
        }
        @keyframes cartBobImpact {
          0%, 100% { transform: translateY(0px) rotate(14deg); }
          50% { transform: translateY(-7px) rotate(18deg); }
        }
        @keyframes barShimmerBottom5 {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        @keyframes arrowRise1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px) translateX(2px); }
        }
        @keyframes smokePuff {
          0% { transform: translateY(0) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(-8px) scale(1.4); opacity: 0; }
        }
        @keyframes gearSpinClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gearSpinCounter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};
