/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ALL_DISTRICTS } from './data/bangladeshDistricts';
import { DIVISIONS } from './data/divisions';
import { DistrictData, CropCategory, DivisionId } from './types';
import { Navbar } from './components/Navbar';
import { MapBangladesh } from './components/MapBangladesh';
import { DistrictPopupCard } from './components/DistrictPopupCard';
import { HubAndSpokeView } from './components/HubAndSpokeView';
import { PresentationPitchDeck } from './components/PresentationPitchDeck';
import { ExportModal } from './components/ExportModal';
import {
  Sprout,
  TrendingUp,
  Factory,
  Truck,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Share2,
  Layers,
  Search,
  Github,
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'map' | 'hub_spoke' | 'pitch_deck'>('map');
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
      setActiveView('map');
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
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        lang={lang}
        setLang={setLang}
        onOpenExport={() => setIsExportOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-8 space-y-4 sm:space-y-6">
        {/* VIEW 1: INTERACTIVE MAP & DISTRICT INSPECTOR */}
        {activeView === 'map' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Header Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-2 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'প্রকল্প গ্রিনশপ' : 'Project GreenShop'}</span>
                  <span>·</span>
                  <span>{lang === 'bn' ? 'বিকেন্দ্রীকৃত কৃষি রূপকল্প' : 'Decentralized Agro-Vision'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
                  {lang === 'bn' ? 'আমাদের ২০২৯ সালের বাংলাদেশ' : 'Our Bangladesh 2029'}
                </h1>
                <p className="text-stone-600 text-xs sm:text-sm mt-0.5 sm:mt-1">
                  {lang === 'bn'
                    ? 'অঞ্চল ও জেলা নির্বাচন করুন: ৬৪টি জেলার অর্থনৈতিক তাৎপর্য, কৃষিজ বৈশিষ্ট্য ও আধুনিক মিল সম্ভাব্যতা।'
                    : 'Select region or district: Explore economic significance, signature crops, and decentralized processing feasibility.'}
                </p>
              </div>

              {/* Hub & Spoke Toggle Switch */}
              <div className="flex items-center gap-1.5 self-start md:self-auto bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setShowHubAndSpoke(false)}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    !showHubAndSpoke ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  {lang === 'bn' ? 'শুধুমাত্র জেলা ম্যাপ' : 'Districts Only'}
                </button>
                <button
                  onClick={() => setShowHubAndSpoke(true)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    showHubAndSpoke ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'সাপ্লাই চেইন স্পোকস' : 'Hub & Spoke Flow'}</span>
                </button>
              </div>
            </div>

            {/* Quick Spotlight Pills (Dinajpur, Pabna, Panchagarh, etc. - Touch pan friendly) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs no-scrollbar touch-pan-x">
              <span className="text-stone-500 font-bold uppercase text-[10px] sm:text-[11px] whitespace-nowrap">
                {lang === 'bn' ? 'অগ্রাধিকার হাব:' : 'Priority Hubs:'}
              </span>
              {spotlightDistricts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedDistrict(d);
                    setIsModalOpen(true);
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                    selectedDistrict?.id === d.id
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-600 hover:text-emerald-800'
                  }`}
                >
                  <span>{lang === 'bn' ? d.nameBn : d.name}</span>
                  <span className="text-[10px] opacity-80 ml-1">
                    ({d.id === 'dinajpur' ? (lang === 'bn' ? 'সুগন্ধি চাল' : 'Rice') : d.id === 'pabna' ? (lang === 'bn' ? 'লিচু/দুধ' : 'Litchi') : d.id === 'panchagarh' ? (lang === 'bn' ? 'গম/ভুট্টা/চা' : 'Wheat/Tea') : d.id === 'rajshahi' ? (lang === 'bn' ? 'আম' : 'Mango') : (lang === 'bn' ? d.divisionBn : d.division)})
                  </span>
                </button>
              ))}
            </div>

            {/* Filter Bar with Mobile Search Box */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2.5">
              {/* Mobile Search Input (Visible on phones < md) */}
              <div className="relative md:hidden">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'যেকোনো জেলা বা ফসল দিয়ে খুঁজুন (যেমন: দিনাজপুর, লিচু)...' : 'Search district or crop (e.g. Dinajpur, Litchi)...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-stone-50 focus:bg-white text-xs text-stone-900 rounded-lg border border-stone-200 focus:border-emerald-500 focus:outline-hidden transition-all"
                />
              </div>

              {/* Division Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar touch-pan-x">
                <span className="text-stone-500 font-bold uppercase text-[10px] mr-1 whitespace-nowrap">
                  {lang === 'bn' ? 'বিভাগ:' : 'Division:'}
                </span>
                <button
                  onClick={() => setDivisionFilter('all')}
                  className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    divisionFilter === 'all'
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {lang === 'bn' ? 'সকল বিভাগ (৬৪)' : 'All Divisions (64)'}
                </button>
                {(Object.keys(DIVISIONS) as DivisionId[]).map((divId) => {
                  const div = DIVISIONS[divId];
                  return (
                    <button
                      key={divId}
                      onClick={() => setDivisionFilter(divId)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        divisionFilter === divId
                          ? 'text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                      style={{
                        backgroundColor: divisionFilter === divId ? div.accentColor : undefined,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: div.color }}
                      />
                      <span>{lang === 'bn' ? div.nameBn : divId}</span>
                    </button>
                  );
                })}
              </div>

              {/* Crop Category Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar touch-pan-x pt-1 border-t border-stone-100">
                <span className="text-stone-500 font-bold uppercase text-[10px] mr-1 whitespace-nowrap">
                  {lang === 'bn' ? 'কৃষি খাত:' : 'Agri Sector:'}
                </span>
                {[
                  { id: 'all', label: 'All Produce', labelBn: 'সকল ফসল' },
                  { id: 'fine_rice', label: 'Fine Rice', labelBn: 'সুগন্ধি চাল (কাটারিভোগ/চিনিগুঁড়া)' },
                  { id: 'fruits', label: 'Fruits', labelBn: 'ফলমূল (লিচু/আম/পেয়ারা)' },
                  { id: 'grains_pulses', label: 'Wheat & Maize', labelBn: 'গম ও ভুট্টা' },
                  { id: 'vegetables_spices', label: 'Spices & Tubers', labelBn: 'মসলা ও আলু' },
                  { id: 'fisheries_livestock', label: 'Fisheries & Dairy', labelBn: 'মৎস্য ও দুগ্ধ সম্পদ' },
                  { id: 'cash_crops', label: 'Tea & Cash Crops', labelBn: 'চা ও অর্থকরী ফসল' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCropFilter(cat.id as CropCategory)}
                    className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      cropFilter === cat.id
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {lang === 'bn' ? cat.labelBn : cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen Layout: Map (Left) + District Preview Drawer (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
              {/* Map Column */}
              <div className="lg:col-span-8 flex flex-col">
                <MapBangladesh
                  districts={ALL_DISTRICTS}
                  selectedDistrict={selectedDistrict}
                  onSelectDistrict={handleSelectDistrict}
                  showHubAndSpoke={showHubAndSpoke}
                  activeCropFilter={cropFilter}
                  activeDivisionFilter={divisionFilter}
                  lang={lang}
                />
              </div>

              {/* District Preview Card & Search Results (Right Column) */}
              <div className="lg:col-span-4 space-y-4">
                {selectedDistrict ? (
                  <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-sm space-y-3.5 sm:space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {lang === 'bn' ? `${selectedDistrict.divisionBn} বিভাগ` : `${selectedDistrict.division} Division`}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                          {lang === 'bn' ? selectedDistrict.nameBn : selectedDistrict.name}
                        </h2>
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                          {lang === 'bn'
                            ? selectedDistrict.agriculturalHighlights.signatureProduceBn
                            : selectedDistrict.agriculturalHighlights.signatureProduce}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block uppercase font-mono">
                          {lang === 'bn' ? 'ঢাকা মেগা হাব' : 'To Dhaka Hub'}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-stone-900 font-mono">
                          {selectedDistrict.supplyChain.transitHours} {lang === 'bn' ? 'ঘণ্টা' : 'h'}
                        </span>
                        <span className="text-[10px] text-stone-500 block">
                          ({selectedDistrict.supplyChain.transitToDhakaKm} {lang === 'bn' ? 'কি.মি.' : 'km'})
                        </span>
                      </div>
                    </div>

                    {/* Agricultural Specs */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-stone-500 block">
                        {lang === 'bn' ? 'প্রধান ফসলসমূহ' : 'Primary Crops'}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedDistrict.agriculturalHighlights.primaryCrops.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-stone-200 rounded font-medium text-stone-800">
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-stone-600 pt-1">
                        {lang === 'bn' ? 'বার্ষিক ফলন:' : 'Yield:'} <b>{selectedDistrict.agriculturalHighlights.annualProduction}</b>
                      </p>
                    </div>

                    {/* Business Case Snippet */}
                    <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                        <Factory className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{lang === 'bn' ? 'গ্রিনশপ মিল প্রস্তাবনা' : 'GreenShop Decentralized Mill'}</span>
                      </div>
                      <p className="text-stone-800 font-semibold text-xs leading-snug">
                        {lang === 'bn' ? selectedDistrict.businessCase.millTypeBn : selectedDistrict.businessCase.proposedMill}
                      </p>

                      <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                        <div className="bg-white/80 p-1.5 rounded border border-amber-200">
                          <span className="text-[9px] text-stone-500 uppercase block font-semibold">
                            {lang === 'bn' ? 'অপচয় হ্রাস' : 'Waste Cut'}
                          </span>
                          <span className="font-bold text-stone-900 text-xs">
                            {selectedDistrict.businessCase.wasteReduction.split('to')[1]?.split(' ')[1] || selectedDistrict.businessCase.wasteReduction.split(' ')[0]}
                          </span>
                        </div>
                        <div className="bg-white/80 p-1.5 rounded border border-amber-200">
                          <span className="text-[9px] text-stone-500 uppercase block font-semibold">
                            {lang === 'bn' ? 'কৃষক লাভ' : 'Farmer Uplift'}
                          </span>
                          <span className="font-bold text-emerald-700 text-xs">
                            {selectedDistrict.businessCase.farmerMarginIncrease.split(' ')[0]}
                          </span>
                        </div>
                        <div className="bg-white/80 p-1.5 rounded border border-amber-200">
                          <span className="text-[9px] text-stone-500 uppercase block font-semibold">
                            {lang === 'bn' ? 'বিনিয়োগ ফেরত' : 'Payback'}
                          </span>
                          <span className="font-bold text-stone-900 text-xs">
                            {selectedDistrict.businessCase.paybackPeriod.split(' ')[0]} {lang === 'bn' ? 'বছর' : 'Yrs'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Full Modal Trigger CTA */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <span>
                        {lang === 'bn'
                          ? 'সম্পূর্ণ অর্থনৈতিক ও মিল কেস স্টাডি দেখুন'
                          : 'Open Full Business Case & ROI Simulator'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : null}

                {/* District Directory List (Search/Filtered) */}
                <div className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                      {lang === 'bn' ? 'জেলা তালিকা' : 'District Directory'} ({filteredDistricts.length})
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-stone-400">
                      {lang === 'bn' ? 'ক্লিক করে দেখুন' : 'Click to inspect'}
                    </span>
                  </div>

                  <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-1.5 pr-1 text-xs">
                    {filteredDistricts.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          setSelectedDistrict(d);
                          setIsModalOpen(true);
                        }}
                        className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between active:scale-98 ${
                          selectedDistrict?.id === d.id
                            ? 'bg-emerald-50 border-emerald-400 font-semibold'
                            : 'bg-stone-50/50 border-stone-200 hover:bg-white hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: DIVISIONS[d.division].color }}
                          />
                          <span className="text-stone-900 truncate font-medium">
                            {lang === 'bn' ? d.nameBn : d.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-500 font-mono shrink-0 ml-2">
                          ~{d.supplyChain.transitHours} {lang === 'bn' ? 'ঘণ্টা' : 'h'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: HUB AND SPOKE ARCHITECTURE */}
        {activeView === 'hub_spoke' && (
          <HubAndSpokeView
            districts={ALL_DISTRICTS}
            onSelectDistrict={(d) => {
              setSelectedDistrict(d);
              setIsModalOpen(true);
            }}
            lang={lang}
          />
        )}

        {/* VIEW 3: PRESENTATION PITCH DECK */}
        {activeView === 'pitch_deck' && (
          <PresentationPitchDeck
            onInspectDistrict={handleInspectFromDeck}
            lang={lang}
          />
        )}
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
