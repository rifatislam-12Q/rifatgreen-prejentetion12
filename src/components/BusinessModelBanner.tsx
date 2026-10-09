import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface BusinessModelBannerProps {
  lang?: 'en' | 'bn';
}

export const BusinessModelBanner: React.FC<BusinessModelBannerProps> = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 24;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[16/9] min-h-[380px] xs:min-h-[440px] sm:min-h-[500px] md:min-h-[560px] max-h-[640px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-white select-none transition-all duration-300 flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #fafbf9 55%, #f0f5f1 85%, #e6efe8 100%)',
      }}
    >
      {/* ============================================================== */}
      {/* 1. LUSH BOTANICAL LEAF TEXTURE CORNERS (Vignette & Vein Atmosphere) */}
      {/* ============================================================== */}

      {/* Top-Right Lush Dark Foliage Cluster */}
      <div
        className="absolute -top-10 -right-10 w-72 xs:w-96 sm:w-[460px] md:w-[540px] h-72 xs:h-96 sm:h-[460px] md:h-[540px] pointer-events-none opacity-90 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
        }}
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          <defs>
            <radialGradient id="foliageGlowTR" cx="80%" cy="20%" r="70%">
              <stop offset="0%" stopColor="#0d3b25" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#1e5438" stopOpacity="0.65" />
              <stop offset="75%" stopColor="#2d6a4f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="foliageBlurTR" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <pattern id="veinPatternTR" width="90" height="90" patternUnits="userSpaceOnUse">
              <path
                d="M10,90 Q50,40 90,10 M40,65 Q70,60 85,35 M20,80 Q45,75 60,50"
                stroke="#52b788"
                strokeWidth="1.6"
                strokeOpacity="0.3"
                fill="none"
              />
            </pattern>
          </defs>
          <circle cx="420" cy="80" r="320" fill="url(#foliageGlowTR)" filter="url(#foliageBlurTR)" />
          <path
            d="M200,0 C320,60 440,160 500,320 L500,0 Z"
            fill="url(#foliageGlowTR)"
          />
          <path
            d="M260,0 C360,70 450,150 500,280 L500,0 Z"
            fill="url(#veinPatternTR)"
          />
        </svg>
      </div>

      {/* Bottom-Left Lush Dark Foliage Cluster */}
      <div
        className="absolute -bottom-14 -left-14 w-80 xs:w-96 sm:w-[480px] md:w-[560px] h-80 xs:h-96 sm:h-[480px] md:h-[560px] pointer-events-none opacity-90 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
        }}
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
          <defs>
            <radialGradient id="foliageGlowBL" cx="20%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#0b3820" stopOpacity="0.88" />
              <stop offset="45%" stopColor="#1b4d32" stopOpacity="0.65" />
              <stop offset="75%" stopColor="#2d6a4f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="foliageBlurBL" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <pattern id="veinPatternBL" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M0,10 Q40,50 80,90 M15,35 Q45,45 65,70 M25,15 Q55,30 75,55"
                stroke="#74c69d"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                fill="none"
              />
            </pattern>
          </defs>
          <circle cx="80" cy="420" r="320" fill="url(#foliageGlowBL)" filter="url(#foliageBlurBL)" />
          <path
            d="M0,200 C80,320 180,440 340,500 L0,500 Z"
            fill="url(#foliageGlowBL)"
          />
          <path
            d="M0,260 C70,360 160,450 300,500 L0,500 Z"
            fill="url(#veinPatternBL)"
          />
        </svg>
      </div>

      {/* Top-Left Ambient Subtle Misty Green Halo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Right Edge Ambient Soft Halo */}
      <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-72 h-72 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================== */}
      {/* 2. TOP-LEFT LOGO: "Greenshop.com"                               */}
      {/* ============================================================== */}
      <div className="absolute top-5 left-5 xs:top-7 xs:left-8 sm:top-9 sm:left-12 z-20">
        <div className="flex items-center gap-1.5 group cursor-default">
          <span className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-[#1b4332] font-sans flex items-center">
            Greenshop
            <span className="text-[#2d6a4f]">.com</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332] mt-1 animate-pulse" />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. FLOATING GREEN BOTANICAL TWIGS, FERNS & LEAVES (ANIMATED)    */}
      {/* ============================================================== */}

      {/* Fern Sprig 1: Left Center (Vertical delicate fern branch) */}
      <div
        className="absolute left-6 xs:left-10 sm:left-16 md:left-24 top-[38%] -translate-y-1/2 w-14 xs:w-18 sm:w-24 md:w-28 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
          animation: 'fernSwayLeft 5.5s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 100 130" fill="none" className="w-full h-auto drop-shadow-[0_2px_6px_rgba(27,67,50,0.15)]">
          {/* Main stem */}
          <path d="M70,120 Q50,70 30,10" stroke="#2d6a4f" strokeWidth="2.2" strokeLinecap="round" />
          {/* Fern fronds pairs */}
          <path d="M60,100 C45,95 40,85 55,85 C62,85 64,95 60,100 Z" fill="#40916c" opacity="0.9" />
          <path d="M63,95 C78,92 82,82 68,82 C61,82 60,90 63,95 Z" fill="#52b788" opacity="0.85" />
          <path d="M52,78 C38,72 34,62 48,64 C56,65 57,73 52,78 Z" fill="#40916c" opacity="0.9" />
          <path d="M55,74 C70,70 74,60 60,61 C53,62 52,69 55,74 Z" fill="#52b788" opacity="0.85" />
          <path d="M44,55 C32,49 28,40 42,42 C49,43 50,50 44,55 Z" fill="#40916c" opacity="0.95" />
          <path d="M47,52 C61,48 64,38 51,40 C44,41 44,48 47,52 Z" fill="#74c69d" opacity="0.9" />
          <path d="M36,32 C26,27 24,18 36,21 C42,22 42,28 36,32 Z" fill="#52b788" />
          <path d="M39,30 C51,26 53,17 41,20 C35,21 36,27 39,30 Z" fill="#74c69d" />
          <path d="M30,10 C25,3 35,0 36,8 Z" fill="#52b788" />
        </svg>
      </div>

      {/* Fern Sprig 2: Bottom-Left Branch with curved leaves */}
      <div
        className="absolute left-10 xs:left-16 sm:left-24 md:left-32 bottom-12 xs:bottom-16 sm:bottom-20 w-16 xs:w-20 sm:w-28 md:w-32 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.7}px, ${mousePos.y * -0.7}px)`,
          animation: 'fernSwayAngle 6.5s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 120 100" fill="none" className="w-full h-auto drop-shadow-[0_2px_6px_rgba(27,67,50,0.18)]">
          <path d="M10,95 Q55,75 110,60" stroke="#1b4332" strokeWidth="2.4" strokeLinecap="round" />
          {/* Leaves branching along stem */}
          <path d="M25,87 C20,70 32,60 40,75 C42,80 35,87 25,87 Z" fill="#2d6a4f" />
          <path d="M40,83 C45,66 58,62 55,77 C53,82 48,84 40,83 Z" fill="#40916c" />
          <path d="M55,77 C52,60 65,52 72,67 C73,72 67,77 55,77 Z" fill="#2d6a4f" />
          <path d="M70,72 C76,55 89,51 86,66 C84,71 78,73 70,72 Z" fill="#52b788" />
          <path d="M85,67 C83,50 96,44 102,57 C103,62 96,67 85,67 Z" fill="#40916c" />
          <path d="M100,62 C108,50 118,52 115,61 C112,65 107,64 100,62 Z" fill="#74c69d" />
        </svg>
      </div>

      {/* Fern Sprig 3: Bottom Center delicate horizontal herb branch */}
      <div
        className="absolute left-1/3 bottom-8 xs:bottom-12 sm:bottom-16 w-20 xs:w-24 sm:w-32 pointer-events-none transition-transform duration-500 ease-out hidden xs:block"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          animation: 'fernGentleFloat 7s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 140 60" fill="none" className="w-full h-auto">
          <path d="M5,45 Q70,30 135,15" stroke="#40916c" strokeWidth="2" strokeLinecap="round" />
          <path d="M30,38 C28,26 38,20 44,30 C45,34 38,39 30,38 Z" fill="#52b788" opacity="0.9" />
          <path d="M55,33 C53,20 64,15 70,25 C71,30 63,34 55,33 Z" fill="#2d6a4f" opacity="0.85" />
          <path d="M80,27 C78,14 90,10 95,20 C96,24 88,28 80,27 Z" fill="#74c69d" opacity="0.9" />
          <path d="M105,21 C104,10 115,6 120,15 C121,19 113,22 105,21 Z" fill="#52b788" />
        </svg>
      </div>

      {/* Fern Sprig 4: Top-Right branch emerging from foliage */}
      <div
        className="absolute right-12 xs:right-20 sm:right-28 md:right-36 top-16 xs:top-20 sm:top-24 w-18 xs:w-22 sm:w-28 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          animation: 'fernSwayRight 6s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 110 90" fill="none" className="w-full h-auto drop-shadow-[0_2px_6px_rgba(27,67,50,0.15)]">
          <path d="M10,80 Q55,50 100,20" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
          <path d="M30,68 C25,55 36,48 42,60 C43,64 36,69 30,68 Z" fill="#40916c" />
          <path d="M50,55 C45,42 56,35 62,47 C63,51 56,56 50,55 Z" fill="#52b788" />
          <path d="M70,42 C66,29 77,22 83,34 C84,38 77,43 70,42 Z" fill="#74c69d" />
          <path d="M90,28 C87,17 97,12 101,21 C102,25 96,29 90,28 Z" fill="#52b788" />
        </svg>
      </div>

      {/* Floating Single Green Leaves (Drifting naturally) */}
      {/* Leaf 1: Near top-right */}
      <div
        className="absolute right-36 xs:right-48 sm:right-64 top-24 xs:top-28 sm:top-32 w-5 h-5 pointer-events-none"
        style={{ animation: 'leafDrift1 4.5s ease-in-out infinite' }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#40916c]">
          <path d="M12 2C6 6 4 14 12 22C20 14 18 6 12 2Z" fill="currentColor" transform="rotate(35 12 12)" />
        </svg>
      </div>

      {/* Leaf 2: Near bottom-left */}
      <div
        className="absolute left-20 xs:left-28 sm:left-36 top-[55%] w-4 h-4 pointer-events-none"
        style={{ animation: 'leafDrift2 5.2s ease-in-out infinite' }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#52b788]">
          <path d="M12 2C6 6 4 14 12 22C20 14 18 6 12 2Z" fill="currentColor" transform="rotate(-40 12 12)" />
        </svg>
      </div>

      {/* Leaf 3: Far right top */}
      <div
        className="absolute right-8 xs:right-14 sm:right-20 top-32 xs:top-36 sm:top-40 w-4 h-4 pointer-events-none"
        style={{ animation: 'leafDrift3 4.8s ease-in-out infinite' }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#2d6a4f]">
          <path d="M12 2C6 6 4 14 12 22C20 14 18 6 12 2Z" fill="currentColor" transform="rotate(15 12 12)" />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 4. FLOATING GREEN MINIMALIST SHOPPING CARTS (EXACT AS IMAGE)   */}
      {/* ============================================================== */}

      {/* Cart 1: Top-Left (above "Business") */}
      <div
        className="absolute left-24 xs:left-32 sm:left-48 md:left-56 top-24 xs:top-28 sm:top-36 pointer-events-none text-[#2d6a4f] transition-transform duration-500"
        style={{
          transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
          animation: 'cartFloat1 4.2s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
      </div>

      {/* Cart 2: Bottom-Left (under fern leaves) */}
      <div
        className="absolute left-32 xs:left-44 sm:left-64 bottom-14 xs:bottom-18 sm:bottom-24 pointer-events-none text-[#40916c] transition-transform duration-500"
        style={{
          transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)`,
          animation: 'cartFloat2 5s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
      </div>

      {/* Cart 3: Top-Right (above "Model") */}
      <div
        className="absolute right-28 xs:right-40 sm:right-60 md:right-72 top-20 xs:top-24 sm:top-32 pointer-events-none text-[#2d6a4f] transition-transform duration-500"
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
          animation: 'cartFloat3 4.6s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
      </div>

      {/* Cart 4: Bottom-Right (to the right of the divider line) */}
      <div
        className="absolute right-12 xs:right-16 sm:right-28 md:right-36 bottom-20 xs:bottom-24 sm:bottom-32 pointer-events-none text-[#2d6a4f] transition-transform duration-500"
        style={{
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          animation: 'cartFloat4 5.4s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
      </div>

      {/* ============================================================== */}
      {/* 5. CENTER HERO: "Business Model" & EMERALD ACCENT DIVIDER BAR   */}
      {/* ============================================================== */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
        }}
      >
        {/* "Business Model" Title (Exact warm coral/rose-pink hue #DE3D5E) */}
        <h1
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight font-sans select-none drop-shadow-xs"
          style={{
            color: '#de3d5e',
            animation: 'textGlowBreath 4s ease-in-out infinite',
          }}
        >
          Business Model
        </h1>

        {/* Horizontal Gradient Progress/Accent Bar (Exact as the picture) */}
        <div className="relative w-64 xs:w-80 sm:w-[420px] md:w-[520px] lg:w-[600px] h-2.5 xs:h-3 sm:h-3.5 mt-3 sm:mt-5 rounded-full overflow-hidden shadow-xs border border-emerald-900/10">
          {/* Base gradient bar: deep forest green on left, fading to light white-green on right */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #0d3b25 0%, #1e5438 35%, #2d6a4f 60%, #52b788 85%, #d8f3dc 98%, transparent 100%)',
            }}
          />

          {/* Running animated shimmer light beam */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-90 rounded-full"
            style={{ animation: 'barShimmer 3s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 6. PURE 60FPS CSS KEYFRAMES FOR LIFELIKE NATURAL ANIMATIONS     */}
      {/* ============================================================== */}
      <style>{`
        @keyframes textGlowBreath {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 2px 10px rgba(222, 61, 94, 0.2));
          }
          50% {
            transform: scale(1.012);
            filter: drop-shadow(0 4px 18px rgba(222, 61, 94, 0.35));
          }
        }
        @keyframes barShimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
        @keyframes fernSwayLeft {
          0%, 100% { transform: translateY(-50%) rotate(0deg); }
          50% { transform: translateY(-50%) rotate(-4deg) scale(1.02); }
        }
        @keyframes fernSwayAngle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg) scale(1.03); }
        }
        @keyframes fernGentleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-2deg); }
        }
        @keyframes fernSwayRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-3.5deg) scale(1.02); }
        }
        @keyframes cartFloat1 {
          0%, 100% { transform: translateY(0px) rotate(-6deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        @keyframes cartFloat2 {
          0%, 100% { transform: translateY(0px) rotate(4deg); }
          50% { transform: translateY(-7px) rotate(-5deg); }
        }
        @keyframes cartFloat3 {
          0%, 100% { transform: translateY(0px) rotate(8deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes cartFloat4 {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(-6px) rotate(5deg); }
        }
        @keyframes leafDrift1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-6px, -8px) rotate(18deg); }
        }
        @keyframes leafDrift2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(5px, -6px) rotate(-20deg); }
        }
        @keyframes leafDrift3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-4px, 5px) rotate(12deg); }
        }
      `}</style>
    </div>
  );
};
