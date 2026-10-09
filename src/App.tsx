/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ALL_DISTRICTS } from './data/bangladeshDistricts';
import { DistrictData, CropCategory, DivisionId } from './types';
import { Navbar } from './components/Navbar';
import { DistrictPopupCard } from './components/DistrictPopupCard';
import { PresentationPitchDeck } from './components/PresentationPitchDeck';
import { ExportModal } from './components/ExportModal';
import { Github } from 'lucide-react';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [lang, setLang] = useState<'en' | 'bn'>('bn');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(
    ALL_DISTRICTS.find((d) => d.id === 'dinajpur') || ALL_DISTRICTS[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showHubAndSpoke, setShowHubAndSpoke] = useState(true);

  // Filters
  const [divisionFilter, setDivisionFilter] = useState<DivisionId | 'all'>('all');
  const [cropFilter, setCropFilter] = useState<CropCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Key spotlights requested by user (Dinajpur, Pabna, Panchagarh, etc.)
  const spotlightDistricts = useMemo(
    () => [
      ALL_DISTRICTS.find((d) => d.id === 'dinajpur')!,
      ALL_DISTRICTS.find((d) => d.id === 'pabna')!,
      ALL_DISTRICTS.find((d) => d.id === 'panchagarh')!,
      ALL_DISTRICTS.find((d) => d.id === 'rajshahi')!,
      ALL_DISTRICTS.find((d) => d.id === 'bogra')!,
      ALL_DISTRICTS.find((d) => d.id === 'satkhira')!,
      ALL_DISTRICTS.find((d) => d.id === 'sylhet')!,
      ALL_DISTRICTS.find((d) => d.id === 'barishal')!,
    ].filter(Boolean),
    []
  );

  // Filtered districts for list view or search
  const filteredDistricts = useMemo(() => {
    return ALL_DISTRICTS.filter((d) => {
      if (divisionFilter !== 'all' && d.division !== divisionFilter) return false;
      if (cropFilter !== 'all' && !d.cropsCategory.includes(cropFilter)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.nameBn.includes(q) ||
          d.agriculturalHighlights.signatureProduce.toLowerCase().includes(q) ||
          d.agriculturalHighlights.signatureProduceBn.includes(q)
        );
      }
      return true;
    });
  }, [divisionFilter, cropFilter, searchQuery]);

  const handleSelectDistrict = (district: DistrictData) => {
    setSelectedDistrict(district);
    setIsModalOpen(true);
  };

  const handleInspectFromDeck = (districtId: string) => {
    const target = ALL_DISTRICTS.find((d) => d.id === districtId);
    if (target) {
      setSelectedDistrict(target);
      setIsModalOpen(true);
    }
  };

  const handleNavigateNext = () => {
    if (!selectedDistrict) return;
    const currentIndex = ALL_DISTRICTS.findIndex((d) => d.id === selectedDistrict.id);
    const nextIndex = (currentIndex + 1) % ALL_DISTRICTS.length;
    setSelectedDistrict(ALL_DISTRICTS[nextIndex]);
  };

  const handleNavigatePrev = () => {
    if (!selectedDistrict) return;
    const currentIndex = ALL_DISTRICTS.findIndex((d) => d.id === selectedDistrict.id);
    const prevIndex = currentIndex === 0 ? ALL_DISTRICTS.length - 1 : currentIndex - 1;
    setSelectedDistrict(ALL_DISTRICTS[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Top Navbar with 6 Slides */}
      <Navbar
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
        lang={lang}
        setLang={setLang}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area: Unified 6 Slides Presentation (Slide 4 contains full interactive map) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-8">
        <PresentationPitchDeck
          districts={ALL_DISTRICTS}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
          onInspectDistrict={handleInspectFromDeck}
          lang={lang}
          currentSlideIndex={currentSlideIndex}
          onSelectSlideIndex={(idx) => setCurrentSlideIndex(idx)}
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
      </main>

      {/* Dynamic Pop-up Modal / Detail Card */}
      {isModalOpen && selectedDistrict && (
        <DistrictPopupCard
          district={selectedDistrict}
          onClose={() => setIsModalOpen(false)}
          onNavigateNext={handleNavigateNext}
          onNavigatePrev={handleNavigatePrev}
          lang={lang}
        />
      )}

      {/* Standalone HTML Export Modal for VS Code / GitHub Pages */}
      {isExportOpen && (
        <ExportModal
          onClose={() => setIsExportOpen(false)}
          lang={lang}
        />
      )}

      {/* Responsive Footer */}
      <footer className="mt-8 sm:mt-12 bg-white border-t border-stone-200 py-5 sm:py-6 px-4 text-xs text-stone-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-stone-900">
              {lang === 'bn' ? 'গ্রিনশপ বাংলাদেশ ২০২৯' : 'GreenShop Bangladesh 2029'}
            </span>
            <span>·</span>
            <span>
              {lang === 'bn'
                ? 'বিকেন্দ্রীকৃত কৃষি প্রক্রিয়াকরণ ও হাব-অ্যান্ড-স্পোক গ্রিড'
                : 'Decentralized Agro-Processing & Hub-and-Spoke Grid'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsExportOpen(true)}
              className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
            >
              {lang === 'bn' ? 'গিটহাব পেজেস এক্সপোর্ট' : 'Export for GitHub Pages'}
            </button>
            <span>·</span>
            <a
              href="https://github.com/rifatislam-12Q/rifatgreen-prejentetion12"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-stone-700 hover:text-stone-900 font-mono"
            >
              <Github className="w-3.5 h-3.5" />
              <span>rifatislam-12Q/rifatgreen-prejentetion12</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
