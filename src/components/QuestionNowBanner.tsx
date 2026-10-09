import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface QuestionNowBannerProps {
  lang?: 'en' | 'bn';
}

export const QuestionNowBanner: React.FC<QuestionNowBannerProps> = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[16/9] min-h-[440px] xs:min-h-[480px] sm:min-h-[540px] md:min-h-[580px] max-h-[660px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/40 select-none transition-all duration-300 flex flex-col items-center justify-center p-6 sm:p-10 md:p-14"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #0d281e 0%, #081d15 45%, #04120d 80%, #020a07 100%)',
      }}
    >
      {/* Background Organic Leaf Veins & Texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leafVeinNet6" width="160" height="160" patternUnits="userSpaceOnUse">
              <path
                d="M0,80 Q40,30 80,80 T160,80 M80,0 Q40,40 80,80 T80,160 M20,40 Q60,60 100,40 M60,100 Q80,130 120,100"
                fill="none"
                stroke="#52b788"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafVeinNet6)" />
        </svg>
      </div>

      {/* Ambient Pulsating Glow Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#6ee7b7]"
          style={{ animation: 'floatParticle1 6s ease-in-out infinite' }}
        />
        <div
          className="absolute top-2/3 left-1/5 w-2 h-2 rounded-full bg-lime-300/80 shadow-[0_0_10px_#bef264]"
          style={{ animation: 'floatParticle2 7.5s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-emerald-200/90 shadow-[0_0_8px_#a7f3d0]"
          style={{ animation: 'floatParticle3 5.5s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-teal-300/70 shadow-[0_0_10px_#5eead4]"
          style={{ animation: 'floatParticle1 8s ease-in-out infinite 1s' }}
        />
        <div
          className="absolute top-1/2 left-1/12 w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
          style={{ animation: 'floatParticle2 6.5s ease-in-out infinite 0.5s' }}
        />
      </div>

      {/* ============================================================== */}
      {/* FLOATING GREEN SHOPPING CARTS (EXACT LOCATIONS IN USER IMAGE) */}
      {/* ============================================================== */}

      {/* Cart 1: Top Right */}
      <div
        className="absolute top-10 sm:top-14 right-16 sm:right-28 text-emerald-400/40 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px) rotate(14deg)`,
          animation: 'cartBobQ1 4.5s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
      </div>

      {/* Cart 2: Middle Right (under the right vines) */}
      <div
        className="absolute top-[58%] right-10 sm:right-20 text-emerald-400/35 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px) rotate(-10deg)`,
          animation: 'cartBobQ2 5.2s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2]" />
      </div>

      {/* Cart 3: Bottom Left */}
      <div
        className="absolute bottom-14 sm:bottom-20 left-12 sm:left-24 text-emerald-400/35 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px) rotate(-16deg)`,
          animation: 'cartBobQ3 4.8s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2]" />
      </div>

      {/* ============================================================== */}
      {/* 1. TOP LOGO & WORDMARK UNIT: BAG + greenshop.com               */}
      {/* ============================================================== */}
      <div
        className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
        }}
      >
        {/* Logo glyph + "greenshop.com" text inline */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          {/* Shopping Bag Glyph */}
          <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(52,211,153,0.7)]"
              style={{ animation: 'logoPulse6 3.5s ease-in-out infinite' }}
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
                fill="url(#qLeafMain)"
              />
              <path
                d="M21 34C21 34 26 23 34 21C34 21 33 30 26 33C24 34 21 34 21 34Z"
                fill="url(#qLeafAccent)"
              />
              {/* Stem line */}
              <path
                d="M14 38C17 35 22 29 31 22"
                stroke="#a7f3d0"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="qLeafMain" x1="16" y1="20" x2="28" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="qLeafAccent" x1="21" y1="21" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34d399" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Wordmark: "greenshop.com" */}
          <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-sans select-none flex items-baseline">
            <span className="text-[#a3e635]">green</span>
            <span className="text-white">shop.com</span>
          </span>
        </div>

        {/* ============================================================== */}
        {/* 2. SYMMETRICAL BOTANICAL VINES EXTENDING OUTWARD                */}
        {/* ============================================================== */}
        <div className="relative w-full max-w-xl flex items-center justify-between pointer-events-none mt-1 sm:mt-2">
          {/* Left Branch */}
          <div
            className="w-24 xs:w-32 sm:w-44 md:w-56 text-emerald-400/80"
            style={{ animation: 'vineSwayQLeft 5s ease-in-out infinite' }}
          >
            <svg viewBox="0 0 160 50" fill="none" className="w-full h-auto drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
              <path d="M155,42 Q80,25 5,30" stroke="#52b788" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M130,34 C120,20 128,12 138,24 C139,29 134,33 130,34 Z" fill="#74c69d" />
              <path d="M100,28 C90,14 98,6 108,18 C109,23 104,27 100,28 Z" fill="#52b788" />
              <path d="M70,24 C60,10 68,2 78,14 C79,19 74,23 70,24 Z" fill="#74c69d" />
              <path d="M40,24 C30,10 38,2 47,14 C48,19 43,23 40,24 Z" fill="#40916c" />
              <path d="M15,28 C5,16 12,8 22,20 C23,24 18,27 15,28 Z" fill="#52b788" />
              <path d="M115,38 C112,50 122,54 126,42 C125,37 119,37 115,38 Z" fill="#40916c" />
              <path d="M85,32 C82,44 92,48 96,36 C95,31 89,31 85,32 Z" fill="#52b788" />
              <path d="M55,28 C52,40 62,44 66,32 C65,27 59,27 55,28 Z" fill="#74c69d" />
            </svg>
          </div>

          {/* Right Branch */}
          <div
            className="w-24 xs:w-32 sm:w-44 md:w-56 text-emerald-400/80 transform -scale-x-100"
            style={{ animation: 'vineSwayQRight 5s ease-in-out infinite' }}
          >
            <svg viewBox="0 0 160 50" fill="none" className="w-full h-auto drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
              <path d="M155,42 Q80,25 5,30" stroke="#52b788" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M130,34 C120,20 128,12 138,24 C139,29 134,33 130,34 Z" fill="#74c69d" />
              <path d="M100,28 C90,14 98,6 108,18 C109,23 104,27 100,28 Z" fill="#52b788" />
              <path d="M70,24 C60,10 68,2 78,14 C79,19 74,23 70,24 Z" fill="#74c69d" />
              <path d="M40,24 C30,10 38,2 47,14 C48,19 43,23 40,24 Z" fill="#40916c" />
              <path d="M15,28 C5,16 12,8 22,20 C23,24 18,27 15,28 Z" fill="#52b788" />
              <path d="M115,38 C112,50 122,54 126,42 C125,37 119,37 115,38 Z" fill="#40916c" />
              <path d="M85,32 C82,44 92,48 96,36 C95,31 89,31 85,32 Z" fill="#52b788" />
              <path d="M55,28 C52,40 62,44 66,32 C65,27 59,27 55,28 Z" fill="#74c69d" />
            </svg>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CENTER HERO: "Question now" IN CLASSIC SERIF TYPOGRAPHY    */}
      {/* ============================================================== */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center my-4 sm:my-6 transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
        }}
      >
        <h1
          className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-normal text-white select-none drop-shadow-md"
          style={{
            fontFamily: '"Times New Roman", Times, "Playfair Display", Georgia, serif',
            animation: 'questionTextGlow 4s ease-in-out infinite',
          }}
        >
          Question now
        </h1>

        {/* ============================================================== */}
        {/* 4. BOTTOM GREEN HORIZONTAL DIVIDER BAR                         */}
        {/* ============================================================== */}
        <div className="relative w-64 xs:w-80 sm:w-[420px] md:w-[540px] lg:w-[620px] h-2 xs:h-2.5 sm:h-3 mt-4 sm:mt-6 rounded-full overflow-hidden shadow-xs border border-emerald-900/40">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #0d3b25 0%, #1e5438 35%, #2d6a4f 60%, #52b788 85%, #d8f3dc 98%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-90 rounded-full"
            style={{ animation: 'barShimmerBottom6 3s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes logoPulse6 {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 16px rgba(52,211,153,0.6)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 24px rgba(52,211,153,0.85)); }
        }
        @keyframes questionTextGlow {
          0%, 100% {
            filter: drop-shadow(0 2px 12px rgba(255, 255, 255, 0.2));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 4px 20px rgba(163, 230, 53, 0.45));
            transform: scale(1.012);
          }
        }
        @keyframes vineSwayQLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-3deg) translateY(-2px); }
        }
        @keyframes vineSwayQRight {
          0%, 100% { transform: scaleX(-1) rotate(0deg); }
          50% { transform: scaleX(-1) rotate(3deg) translateY(-2px); }
        }
        @keyframes cartBobQ1 {
          0%, 100% { transform: translateY(0px) rotate(14deg); }
          50% { transform: translateY(-7px) rotate(18deg); }
        }
        @keyframes cartBobQ2 {
          0%, 100% { transform: translateY(0px) rotate(-10deg); }
          50% { transform: translateY(-6px) rotate(-6deg); }
        }
        @keyframes cartBobQ3 {
          0%, 100% { transform: translateY(0px) rotate(-16deg); }
          50% { transform: translateY(-8px) rotate(-12deg); }
        }
        @keyframes barShimmerBottom6 {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        @keyframes floatParticle1 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-16px) translateX(8px); opacity: 0.9; }
        }
        @keyframes floatParticle2 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-22px) translateX(-10px); opacity: 1; }
        }
        @keyframes floatParticle3 {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-14px) translateX(12px); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
};
