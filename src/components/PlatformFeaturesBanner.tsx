import React, { useState } from 'react';
import {
  ShoppingCart,
  User,
  Gauge,
  Video,
  Handshake,
  Store,
  MessageCircle,
  Bell,
  Truck,
  Star,
  Info,
  Globe,
} from 'lucide-react';

interface PlatformFeaturesBannerProps {
  lang?: 'en' | 'bn';
}

export const PlatformFeaturesBanner: React.FC<PlatformFeaturesBannerProps> = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setActiveItem(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[16/9] min-h-[440px] xs:min-h-[480px] sm:min-h-[540px] md:min-h-[600px] max-h-[680px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/40 select-none transition-all duration-300 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #0d281e 0%, #081d15 45%, #04120d 80%, #020a07 100%)',
      }}
    >
      {/* Background Organic Leaf Veins & Vignette Texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leafVeinNet" width="160" height="160" patternUnits="userSpaceOnUse">
              <path
                d="M0,80 Q40,30 80,80 T160,80 M80,0 Q40,40 80,80 T80,160 M20,40 Q60,60 100,40 M60,100 Q80,130 120,100"
                fill="none"
                stroke="#52b788"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafVeinNet)" />
        </svg>
      </div>

      {/* Ambient Pulsating Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Tiny Shopping Cart (Top Right as in the picture) */}
      <div
        className="absolute top-12 sm:top-16 right-16 sm:right-28 text-emerald-400/40 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px) rotate(14deg)`,
          animation: 'cartBobSmall 4s ease-in-out infinite',
        }}
      >
        <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
      </div>

      {/* ============================================================== */}
      {/* 1. TOP LOGO UNIT: GREENSHOP BAG WITH LEAF + LAUREL BRANCHES   */}
      {/* ============================================================== */}
      <div
        className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 pt-1 sm:pt-2 transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
        }}
      >
        {/* Left Laurel Leaves Branch */}
        <div
          className="w-14 sm:w-20 md:w-24 text-emerald-400/80 pointer-events-none"
          style={{ animation: 'laurelSwayLeft 5s ease-in-out infinite' }}
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
            style={{ animation: 'logoPulse 3.5s ease-in-out infinite' }}
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
              fill="url(#featureLeafMain)"
            />
            <path
              d="M21 34C21 34 26 23 34 21C34 21 33 30 26 33C24 34 21 34 21 34Z"
              fill="url(#featureLeafAccent)"
            />
            {/* Stem line */}
            <path
              d="M14 38C17 35 22 29 31 22"
              stroke="#a7f3d0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="featureLeafMain" x1="16" y1="20" x2="28" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="featureLeafAccent" x1="21" y1="21" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="1" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Right Laurel Leaves Branch */}
        <div
          className="w-14 sm:w-20 md:w-24 text-emerald-400/80 pointer-events-none transform -scale-x-100"
          style={{ animation: 'laurelSwayRight 5s ease-in-out infinite' }}
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
      {/* 2. THE 11 FEATURE BUTTON PILLS (AS SEEN IN USER IMAGE)         */}
      {/* ============================================================== */}
      <div
        className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-2.5 sm:gap-3.5 my-auto py-2 transition-transform duration-300"
        style={{
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
        }}
      >
        {/* Row 1: Marketplace, Profile, Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full">
          {/* 1. Marketplace */}
          <div
            onMouseEnter={() => setActiveItem('Marketplace')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Marketplace'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                <Globe className="w-2.5 h-2.5 text-emerald-300 absolute -top-1 -right-1" />
              </div>
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Marketplace
            </span>
          </div>

          {/* 2. Profile */}
          <div
            onMouseEnter={() => setActiveItem('Profile')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Profile'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Profile
            </span>
          </div>

          {/* 3. Dashboard */}
          <div
            onMouseEnter={() => setActiveItem('Dashboard')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Dashboard'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Dashboard
            </span>
          </div>
        </div>

        {/* Row 2: Live Bazaar, Business Details, Local Market */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full">
          {/* 4. Live Bazaar */}
          <div
            onMouseEnter={() => setActiveItem('Live Bazaar')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Live Bazaar'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-rose-300 shrink-0">
              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Live Bazaar
            </span>
          </div>

          {/* 5. Business Details */}
          <div
            onMouseEnter={() => setActiveItem('Business Details')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Business Details'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0">
              <Handshake className="w-4 h-4 sm:w-5 sm:h-5 text-teal-200" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Business Details
            </span>
          </div>

          {/* 6. Local Market */}
          <div
            onMouseEnter={() => setActiveItem('Local Market')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Local Market'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
              <Store className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Local Market
            </span>
          </div>
        </div>

        {/* Row 3: Chatting, Notifications, Tracking */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full">
          {/* 7. Chatting */}
          <div
            onMouseEnter={() => setActiveItem('Chatting')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Chatting'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Chatting
            </span>
          </div>

          {/* 8. Notifications */}
          <div
            onMouseEnter={() => setActiveItem('Notifications')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Notifications'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 animate-ping" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Notifications
            </span>
          </div>

          {/* 9. Tracking */}
          <div
            onMouseEnter={() => setActiveItem('Tracking')}
            className={`flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Tracking'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-teal-200" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
              Tracking
            </span>
          </div>
        </div>

        {/* Row 4 (Centered 2 items): Review & Product Information */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-xl">
          {/* 10. Review */}
          <div
            onMouseEnter={() => setActiveItem('Review')}
            className={`flex-1 w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Review'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-300 shrink-0">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-400" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide">
              Review
            </span>
          </div>

          {/* 11. Product Information */}
          <div
            onMouseEnter={() => setActiveItem('Product Information')}
            className={`flex-1 w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-2.5 sm:py-3 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
              activeItem === 'Product Information'
                ? 'bg-emerald-800/90 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-[1.03]'
                : 'bg-[#153427]/85 hover:bg-[#1b4332]/90 border-emerald-600/30 hover:border-emerald-400/60 shadow-lg'
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
              <Info className="w-4 h-4 text-emerald-200" />
            </div>
            <span className="text-sm sm:text-base font-bold text-white tracking-wide">
              Product Information
            </span>
          </div>
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
          style={{ animation: 'barShimmerBottom 3s ease-in-out infinite' }}
        />
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 16px rgba(52,211,153,0.6)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 24px rgba(52,211,153,0.85)); }
        }
        @keyframes laurelSwayLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-4deg) translateY(-2px); }
        }
        @keyframes laurelSwayRight {
          0%, 100% { transform: scaleX(-1) rotate(0deg); }
          50% { transform: scaleX(-1) rotate(4deg) translateY(-2px); }
        }
        @keyframes cartBobSmall {
          0%, 100% { transform: translateY(0px) rotate(14deg); }
          50% { transform: translateY(-7px) rotate(18deg); }
        }
        @keyframes barShimmerBottom {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};
