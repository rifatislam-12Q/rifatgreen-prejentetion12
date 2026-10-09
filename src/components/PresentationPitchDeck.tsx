import React, { useState } from 'react';
import { PRESENTATION_SLIDES } from '../data/presentationSlides';
import { WhatIsGreenShopBanner } from './WhatIsGreenShopBanner';
import { BusinessModelBanner } from './BusinessModelBanner';
import { PlatformFeaturesBanner } from './PlatformFeaturesBanner';
import { NationalImpactBanner } from './NationalImpactBanner';
import { QuestionNowBanner } from './QuestionNowBanner';
import { InteractiveMapSection } from './InteractiveMapSection';
import { DistrictData, CropCategory, DivisionId } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  BarChart2,
  TrendingUp,
  Presentation,
  CheckCircle2,
} from 'lucide-react';

interface PresentationPitchDeckProps {
  districts: DistrictData[];
  selectedDistrict: DistrictData | null;
  onSelectDistrict: (district: DistrictData) => void;
  onInspectDistrict: (districtId: string) => void;
  lang: 'en' | 'bn';
  currentSlideIndex?: number;
  onSelectSlideIndex?: (index: number) => void;
  showHubAndSpoke: boolean;
  setShowHubAndSpoke: (val: boolean) => void;
  divisionFilter: DivisionId | 'all';
  setDivisionFilter: (val: DivisionId | 'all') => void;
  cropFilter: CropCategory;
  setCropFilter: (val: CropCategory) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  spotlightDistricts: DistrictData[];
  filteredDistricts: DistrictData[];
}

export const PresentationPitchDeck: React.FC<PresentationPitchDeckProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  onInspectDistrict,
  lang,
  currentSlideIndex: controlledIndex,
  onSelectSlideIndex,
  showHubAndSpoke,
  setShowHubAndSpoke,
  divisionFilter,
  setDivisionFilter,
  cropFilter,
  setCropFilter,
  searchQuery,
  setSearchQuery,
  spotlightDistricts,
  filteredDistricts,
}) => {
  const [internalSlideIndex, setInternalSlideIndex] = useState(0);

  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalSlideIndex;

  const setActiveIndex = (idx: number) => {
    if (onSelectSlideIndex) {
      onSelectSlideIndex(idx);
    } else {
      setInternalSlideIndex(idx);
    }
  };

  const currentSlide = PRESENTATION_SLIDES[activeIndex] || PRESENTATION_SLIDES[0];

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % PRESENTATION_SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      activeIndex === 0 ? PRESENTATION_SLIDES.length - 1 : activeIndex - 1
    );
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') handleNext();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') handlePrev();
      if (['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx >= 0 && targetIdx < PRESENTATION_SLIDES.length) {
          setActiveIndex(targetIdx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="space-y-4">
      {/* Compact Slide Quick Controller */}
      <div className="bg-white rounded-2xl border border-stone-200 px-3 sm:px-4 py-2 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 uppercase font-mono">
            {lang === 'bn' ? `স্লাইড ${activeIndex + 1} / ${PRESENTATION_SLIDES.length}` : `Slide ${activeIndex + 1} of ${PRESENTATION_SLIDES.length}`}
          </span>
          <span className="text-xs font-semibold text-stone-700 hidden sm:inline">
            {lang === 'bn' ? currentSlide.titleBn : currentSlide.title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-stone-400 font-mono hidden md:inline mr-1">
            {lang === 'bn' ? 'কীবোর্ড: ← / → অথবা ১-৬' : 'Keys: ← / → or 1-6'}
          </span>
          <button
            onClick={handlePrev}
            title={lang === 'bn' ? 'পূর্ববর্তী স্লাইড (←)' : 'Previous Slide (←)'}
            className="px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}</span>
          </button>
          <button
            onClick={handleNext}
            title={lang === 'bn' ? 'পরবর্তী স্লাইড (→)' : 'Next Slide (→)'}
            className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs active:scale-95"
          >
            <span className="hidden xs:inline">{lang === 'bn' ? 'পরবর্তী' : 'Next'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slide Presenter Stage */}
      <div className="relative min-h-[460px] sm:min-h-[500px] bg-white rounded-2xl border border-stone-200 shadow-md p-4 sm:p-7 md:p-10 flex flex-col justify-between overflow-hidden">
        {/* Subtle Watermark/Pattern */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Slide Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-md border border-emerald-200">
              {lang === 'bn'
                ? `স্লাইড ${currentSlide.id} / ${PRESENTATION_SLIDES.length}`
                : `Slide ${currentSlide.id} of ${PRESENTATION_SLIDES.length}`}
            </span>
            <span className="text-[10px] sm:text-xs text-stone-400">
              {lang === 'bn'
                ? 'গ্রিনশপ কৌশলগত রূপরেখা ২০২৯'
                : 'GreenShop Vision 2029'}
            </span>
          </div>

          {activeIndex !== 0 && activeIndex !== 1 && activeIndex !== 2 && activeIndex !== 4 && activeIndex !== 5 && (
            <>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-stone-900 mt-1 sm:mt-2">
                {lang === 'bn' ? currentSlide.titleBn : currentSlide.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-stone-600 font-medium mt-1">
                {lang === 'bn'
                  ? currentSlide.subtitleBn || currentSlide.subtitle
                  : currentSlide.subtitle}
              </p>
            </>
          )}
        </div>

        {/* Slide Main Content */}
        <div className="relative z-10 my-4 sm:my-8 space-y-4 sm:space-y-6">
          {/* SLIDE 1 HERO BANNER: Animated "what is greenshop.com" Picture (Pure, without extra text or buttons) */}
          {activeIndex === 0 && (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex items-center justify-center">
              <WhatIsGreenShopBanner lang={lang} />
            </div>
          )}

          {/* SLIDE 2 HERO BANNER: Animated "Business Model" Picture (Pure, without extra text or buttons) */}
          {activeIndex === 1 && (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex items-center justify-center">
              <BusinessModelBanner lang={lang} />
            </div>
          )}

          {/* SLIDE 3 HERO BANNER: Animated "Platform Features" Picture (Pure, without extra text or buttons) */}
          {activeIndex === 2 && (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex items-center justify-center">
              <PlatformFeaturesBanner lang={lang} />
            </div>
          )}

          {/* SLIDE 4 HERO SECTION: Interactive 64-Districts Map & Logistics Grid */}
          {activeIndex === 3 && (
            <div className="mb-6 animate-in fade-in zoom-in-95 duration-300">
              <InteractiveMapSection
                districts={districts}
                selectedDistrict={selectedDistrict}
                onSelectDistrict={onSelectDistrict}
                onInspectDistrict={onInspectDistrict}
                lang={lang}
                showHubAndSpoke={showHubAndSpoke}
                setShowHubAndSpoke={setShowHubAndSpoke}
                divisionFilter={divisionFilter}
                setDivisionFilter={setDivisionFilter}
                cropFilter={cropFilter}
                setCropFilter={setCropFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                spotlightDistricts={spotlightDistricts}
                filteredDistricts={filteredDistricts}
              />
            </div>
          )}

          {/* SLIDE 5 HERO BANNER: Animated "National Impact: Jobs, Production & GDP" Picture (Pure, without extra text or buttons) */}
          {activeIndex === 4 && (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex items-center justify-center">
              <NationalImpactBanner lang={lang} />
            </div>
          )}

          {/* SLIDE 6 HERO BANNER: Animated "Question now" Picture (Pure, without extra text or buttons) */}
          {activeIndex === 5 && (
            <div className="animate-in fade-in zoom-in-95 duration-300 flex items-center justify-center">
              <QuestionNowBanner lang={lang} />
            </div>
          )}

          {/* Slide Points Grid (Rendered only when NOT on Slide 1, 2, 3, 5, or 6) */}
          {activeIndex !== 0 && activeIndex !== 1 && activeIndex !== 2 && activeIndex !== 4 && activeIndex !== 5 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {currentSlide.content.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-colors"
                >
                  {pt.stat && (
                    <span className="text-lg font-bold text-emerald-700 font-mono block mb-1">
                      {pt.stat}
                    </span>
                  )}
                  <h4 className="font-bold text-stone-900 text-sm mb-1.5">
                    {lang === 'bn' ? pt.labelBn || pt.label : pt.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {lang === 'bn' ? pt.textBn || pt.text : pt.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Highlight Box or District Deep-Dive link (Rendered only when NOT on Slide 1, 2, 3, 5, or 6) */}
          {activeIndex !== 0 && activeIndex !== 1 && activeIndex !== 2 && activeIndex !== 4 && activeIndex !== 5 && currentSlide.content.highlightBox && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-900 to-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-semibold text-emerald-300">
                  {lang === 'bn'
                    ? currentSlide.content.highlightBox.titleBn || currentSlide.content.highlightBox.title
                    : currentSlide.content.highlightBox.title}
                </span>
                <p className="text-sm text-stone-200 mt-1 max-w-xl">
                  {lang === 'bn'
                    ? currentSlide.content.highlightBox.descBn || currentSlide.content.highlightBox.desc
                    : currentSlide.content.highlightBox.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {currentSlide.content.highlightBox.metric && (
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">
                      {lang === 'bn' ? 'ফলাফল সূচক' : 'Outcome Metric'}
                    </span>
                    <span className="text-xl font-bold font-mono text-emerald-400">
                      {currentSlide.content.highlightBox.metric}
                    </span>
                  </div>
                )}

                {currentSlide.content.districtFeatured && (
                  <button
                    onClick={() =>
                      currentSlide.content.districtFeatured &&
                      onInspectDistrict(currentSlide.content.districtFeatured)
                    }
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{lang === 'bn' ? 'জেলার তথ্য ও মিল দেখুন' : 'Inspect District Data'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Slide Bottom Pagination & Navigation */}
        <div className="relative z-10 pt-4 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {PRESENTATION_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === activeIndex
                    ? 'w-8 bg-emerald-600'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                title={lang === 'bn' ? `স্লাইড ${i + 1}-এ যান` : `Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'bn' ? 'পূর্ববর্তী' : 'Previous'}</span>
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{lang === 'bn' ? 'পরবর্তী' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

