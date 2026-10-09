import React from 'react';
import { Download, Globe, Map, Presentation, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentSlideIndex: number;
  onSelectSlide: (slideIndex: number) => void;
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  onOpenExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSlideIndex,
  onSelectSlide,
  lang,
  setLang,
  onOpenExport,
}) => {
  const slides = [
    { id: 1, title: 'What is GreenShop', titleBn: '১. পরিচিতি', badge: 'Hero' },
    { id: 2, title: 'Business Model', titleBn: '২. বিজনেস মডেল', badge: 'Model' },
    { id: 3, title: 'Platform Features', titleBn: '৩. প্ল্যাটফর্ম ফিচারস', badge: 'Features' },
    { id: 4, title: '64-District Agro Map', titleBn: '৪. ৬৪ জেলা ম্যাপ', badge: 'GIS Map', isMap: true },
    { id: 5, title: 'Jobs, Output & GDP', titleBn: '৫. কর্মসংস্থান ও GDP', badge: 'Impact' },
    { id: 6, title: 'Question Now', titleBn: '৬. প্রশ্নোত্তর', badge: 'Q&A' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Header Row: Brand Logo & Global Actions */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Unit */}
        <div
          onClick={() => onSelectSlide(0)}
          className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer group"
          title={lang === 'bn' ? 'স্লাইড ১-এ ফিরে যান' : 'Go to Slide 1'}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0 border border-emerald-700/50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
              <path d="M14 2c1.5 2 2 3.5 1 5s-3 1.5-3 1.5" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg md:text-xl font-black tracking-tight text-stone-900 leading-tight">
                greenshop<span className="text-emerald-700 font-extrabold">.com</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-emerald-800 font-bold bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                {lang === 'bn' ? 'বাংলাদেশ ২০২৯' : 'Vision 2029'}
              </span>
            </div>
            <p className="text-[10px] text-stone-500 hidden sm:block truncate">
              {lang === 'bn' ? '৬৪ জেলা কৃষি গ্রিড ও বিকেন্দ্রীকৃত সাপ্লাই চেইন' : '64-District Decentralized Agro Grid'}
            </p>
          </div>
        </div>

        {/* Desktop 6 Slides Navigation (Visible on lg+) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200/80">
          {slides.map((s, idx) => {
            const isActive = currentSlideIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSlide(idx)}
                className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs ring-2 ring-emerald-600/30'
                    : s.isMap
                    ? 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/80'
                }`}
                title={lang === 'bn' ? `স্লাইড ${s.id}: ${s.titleBn}` : `Slide ${s.id}: ${s.title}`}
              >
                {s.isMap ? (
                  <Map className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-200' : 'text-emerald-700 animate-pulse'}`} />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-emerald-300 animate-pulse' : 'bg-stone-400'
                    }`}
                  />
                )}
                <span>{lang === 'bn' ? `স্লাইড ${s.id}` : `Slide ${s.id}`}</span>
                <span className={`text-[10px] font-normal ${isActive ? 'text-emerald-100' : 'text-stone-500'}`}>
                  · {lang === 'bn' ? s.titleBn : s.title}
                </span>
                {s.isMap && !isActive && (
                  <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-mono ml-0.5">
                    ম্যাপ
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Utilities: Language & Export */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer active:scale-95 border border-stone-200/70"
            title={lang === 'bn' ? 'ভাষা পরিবর্তন (Switch Language)' : 'Toggle Language'}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Standalone Export Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer active:scale-95"
            title={lang === 'bn' ? 'গিটহাব পেজেস বা ভিএস কোডের জন্য ডাউনলোড' : 'Export for GitHub Pages / VS Code'}
          >
            <Download className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">
              {lang === 'bn' ? 'গিটহাব এক্সপোর্ট' : 'GitHub Export'}
            </span>
            <span className="sm:hidden">
              {lang === 'bn' ? 'এক্সপোর্ট' : 'Export'}
            </span>
          </button>
        </div>
      </div>

      {/* 6 Slides Primary Navigation Bar (Prominent, horizontal-scroll friendly on mobile & tablets) */}
      <div className="border-t border-stone-200 bg-stone-50/95 backdrop-blur-sm px-3 sm:px-6 py-1.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-max">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 border border-emerald-300 px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
              <Presentation className="w-3 h-3 text-emerald-800" />
              <span>{lang === 'bn' ? '৬টি স্লাইড:' : '6 Slides:'}</span>
            </span>

            {slides.map((s, idx) => {
              const isActive = currentSlideIndex === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectSlide(idx)}
                  className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs ring-2 ring-emerald-600/40'
                      : s.isMap
                      ? 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-50'
                      : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                  title={lang === 'bn' ? `স্লাইড ${s.id}: ${s.titleBn}` : `Slide ${s.id}: ${s.title}`}
                >
                  {s.isMap ? (
                    <Map className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-200' : 'text-emerald-700'}`} />
                  ) : (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-emerald-300 animate-pulse' : 'bg-stone-400'
                      }`}
                    />
                  )}
                  <span>
                    {lang === 'bn' ? `স্লাইড ${s.id}` : `Slide ${s.id}`}
                  </span>
                  <span className="text-[11px] font-medium opacity-90 hidden xs:inline">
                    · {lang === 'bn' ? s.titleBn : s.title}
                  </span>
                  {s.isMap && (
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded font-mono ${
                        isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {lang === 'bn' ? 'ম্যাপ' : 'MAP'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-stone-600 font-medium shrink-0 pl-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-800 hidden sm:inline">
              {currentSlideIndex === 3
                ? lang === 'bn'
                  ? 'স্লাইড ৪: ৬৪ জেলা লাইভ ম্যাপ'
                  : 'Slide 4: 64-District Live Map'
                : currentSlideIndex === 0
                ? lang === 'bn'
                  ? 'স্লাইড ১: greenshop.com ব্যানার'
                  : 'Slide 1: greenshop.com Banner'
                : lang === 'bn'
                ? `স্লাইড ${currentSlideIndex + 1} সক্রিয়`
                : `Slide ${currentSlideIndex + 1} Active`}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

