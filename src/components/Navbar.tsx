import React from 'react';
import { Download, Globe, Map, Network, Presentation, Search } from 'lucide-react';

interface NavbarProps {
  activeView: 'map' | 'hub_spoke' | 'pitch_deck';
  setActiveView: (view: 'map' | 'hub_spoke' | 'pitch_deck') => void;
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  onOpenExport: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  lang,
  setLang,
  onOpenExport,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Wordmark / Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base sm:text-xl shadow-xs shrink-0">
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
              <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-stone-900 leading-tight truncate">
                {lang === 'bn' ? 'গ্রিনশপ' : 'GreenShop'}
              </span>
              <span className="hidden sm:inline-block text-[10px] sm:text-[11px] text-emerald-800 font-bold bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                {lang === 'bn' ? 'বাংলাদেশ ২০২৯' : 'Vision 2029'}
              </span>
            </div>
          </div>
        </div>

        {/* Zone 2: Desktop / Tablet Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'map'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'জেলা কৃষি ম্যাপ' : 'District Map'}</span>
          </button>

          <button
            onClick={() => setActiveView('hub_spoke')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'hub_spoke'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'হাব-অ্যান্ড-স্পোক লজিস্টিকস' : 'Hub & Spoke Network'}</span>
          </button>

          <button
            onClick={() => setActiveView('pitch_deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeView === 'pitch_deck'
                ? 'bg-white text-emerald-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'কৌশলগত প্রেজেন্টেশন' : 'Pitch Deck (2029)'}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search for Tablets, Laptops & Desktops */}
          <div className="relative hidden md:block w-40 lg:w-52">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'জেলা বা ফসল খুঁজুন...' : 'Search district or crop...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-stone-100 hover:bg-stone-50 focus:bg-white text-xs text-stone-900 rounded-lg border border-transparent focus:border-emerald-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer active:scale-95"
            title={lang === 'bn' ? 'ভাষা পরিবর্তন (Switch Language)' : 'Toggle Language'}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Standalone Export Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer active:scale-95"
            title={lang === 'bn' ? 'গিটহাব পেজেস বা ভিএস কোডের জন্য ডাউনলোড' : 'Export for GitHub Pages / VS Code'}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {lang === 'bn' ? 'গিটহাব এক্সপোর্ট' : 'GitHub Export'}
            </span>
            <span className="sm:hidden">
              {lang === 'bn' ? 'গিটহাব' : 'GitHub'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar (Phones) */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 bg-stone-50/95 backdrop-blur-sm px-2 py-1.5 text-xs">
        <button
          onClick={() => setActiveView('map')}
          className={`flex-1 py-1.5 px-1 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeView === 'map'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'জেলা ম্যাপ' : 'Map'}</span>
        </button>
        <button
          onClick={() => setActiveView('hub_spoke')}
          className={`flex-1 py-1.5 px-1 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeView === 'hub_spoke'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'লজিস্টিকস' : 'Logistics'}</span>
        </button>
        <button
          onClick={() => setActiveView('pitch_deck')}
          className={`flex-1 py-1.5 px-1 font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
            activeView === 'pitch_deck'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'প্রেজেন্টেশন' : 'Deck'}</span>
        </button>
      </div>
    </header>
  );
};
