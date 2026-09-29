import React, { useState, useEffect } from 'react';
import { DistrictData } from '../types';
import { DIVISIONS } from '../data/divisions';
import { DistrictMediaNotes } from './DistrictMediaNotes';
import { getDistrictNotesCount } from '../utils/districtStorage';
import {
  X,
  TrendingUp,
  Sprout,
  Factory,
  Truck,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Calculator,
  Camera,
  Plane,
  Anchor,
  Globe,
} from 'lucide-react';

interface DistrictPopupCardProps {
  district: DistrictData;
  onClose: () => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  lang: 'en' | 'bn';
}

export const DistrictPopupCard: React.FC<DistrictPopupCardProps> = ({
  district,
  onClose,
  onNavigateNext,
  onNavigatePrev,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'economic' | 'business_case' | 'logistics' | 'calculator' | 'media_notes'>('highlights');
  const [notesCount, setNotesCount] = useState<number>(0);

  // Sync saved notes count when district changes or tab switches
  useEffect(() => {
    setNotesCount(getDistrictNotesCount(district.id));
  }, [district.id, activeTab]);
  
  // Interactive feasibility calculator state
  const [farmAcres, setFarmAcres] = useState<number>(3500);
  const [millCapacity, setMillCapacity] = useState<number>(40);

  const divisionMeta = DIVISIONS[district.division];

  // Calculated ROI simulator metrics
  const annualLossSavedTons = Math.round(farmAcres * 0.42 * (millCapacity / 40));
  const additionalFarmerIncomeLakh = Math.round((annualLossSavedTons * 32000) / 100000);
  const projectedPaybackMonths = Math.max(18, Math.round(34 - (millCapacity / 50) * 10));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div
          className="p-4 sm:p-5 text-white flex items-start justify-between relative overflow-hidden shrink-0"
          style={{
            background: `linear-gradient(135deg, ${divisionMeta.accentColor} 0%, #1c1917 100%)`,
          }}
        >
          {/* Subtle background badge */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

          <div className="flex-1 min-w-0 pr-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold px-1.5 sm:px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm whitespace-nowrap">
                {lang === 'bn' ? district.divisionBn : district.division} {lang === 'bn' ? 'বিভাগ' : 'Division'}
              </span>
              <span className="text-xs text-white/70">·</span>
              <span className="text-[10px] sm:text-xs text-emerald-200 flex items-center gap-1 whitespace-nowrap">
                <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline" />
                {district.supplyChain.transitHours} {lang === 'bn' ? 'ঘণ্টা (ঢাকা হতে)' : 'h to Dhaka'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight flex flex-wrap items-baseline gap-1 sm:gap-2">
              <span>{lang === 'bn' ? district.nameBn : district.name}</span>
              <span className="text-xs sm:text-base md:text-lg font-normal text-white/80">
                {lang === 'bn' ? `(${district.name})` : district.nameBn}
              </span>
            </h2>
            <p className="text-[11px] sm:text-sm text-emerald-100 font-medium mt-0.5 line-clamp-1">
              {lang === 'bn'
                ? district.agriculturalHighlights.signatureProduceBn
                : district.agriculturalHighlights.signatureProduce}
            </p>
          </div>

          {/* Quick Controls & Upload Button */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Direct Upload Photo & Note Icon Button */}
            <button
              onClick={() => setActiveTab('media_notes')}
              title={lang === 'bn' ? 'ছবি ও তথ্য আপলোড / নোটস' : 'Upload photo and notes'}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 border ${
                activeTab === 'media_notes'
                  ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-xs'
              }`}
            >
              <Camera className="w-4 h-4 text-amber-300" />
              <span className="hidden xs:inline">
                {lang === 'bn' ? 'ছবি ও তথ্য' : 'Photos'}
              </span>
              {notesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                  {notesCount}
                </span>
              )}
            </button>

            <button
              onClick={onNavigatePrev}
              title={lang === 'bn' ? 'পূর্ববর্তী জেলা' : 'Previous district'}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onNavigateNext}
              title={lang === 'bn' ? 'পরবর্তী জেলা' : 'Next district'}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={onClose}
              title={lang === 'bn' ? 'বন্ধ করুন' : 'Close modal'}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-0.5 cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls (Segmented Bar - Touch scrollable) */}
        <div className="flex items-center gap-1 p-1.5 sm:p-2 bg-stone-100/90 border-b border-stone-200 overflow-x-auto text-xs font-medium no-scrollbar touch-pan-x shrink-0">
          <button
            onClick={() => setActiveTab('highlights')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'highlights'
                ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{lang === 'bn' ? 'কৃষি বৈশিষ্ট্য' : 'Agricultural Highlights'}</span>
          </button>

          <button
            onClick={() => setActiveTab('economic')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'economic'
                ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{lang === 'bn' ? 'অর্থনৈতিক প্রভাব' : 'Economic Profile'}</span>
          </button>

          <button
            onClick={() => setActiveTab('business_case')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'business_case'
                ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Factory className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{lang === 'bn' ? 'প্রসেসিং বিজনেস কেস' : 'Mill Business Case'}</span>
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'logistics'
                ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>{lang === 'bn' ? 'লজিস্টিকস ও হাব' : 'Hub & Spoke'}</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>{lang === 'bn' ? 'মুনাফা সিমুলেটর' : 'ROI Simulator'}</span>
          </button>

          <button
            onClick={() => setActiveTab('media_notes')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'media_notes'
                ? 'bg-emerald-700 text-white shadow-sm font-bold'
                : 'text-stone-700 hover:text-stone-900 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/60'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{lang === 'bn' ? 'ছবি ও তথ্য আপলোড' : 'Photos & Notes'}</span>
            {notesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-200 text-stone-950 font-bold">
                {notesCount}
              </span>
            )}
          </button>
        </div>

        {/* Scrollable Tab Content Body - Fully touch & wheel scrollable */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto overscroll-contain custom-scrollbar space-y-4 text-stone-700 text-xs sm:text-sm">
          {/* TAB: MEDIA & NOTES (PHOTO + TEXT UPLOAD) */}
          {activeTab === 'media_notes' && (
            <DistrictMediaNotes
              districtId={district.id}
              districtNameBn={district.nameBn}
              districtNameEn={district.name}
              lang={lang}
            />
          )}

          {/* TAB 1: AGRICULTURAL HIGHLIGHTS */}
          {activeTab === 'highlights' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 sm:gap-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-900 text-xs sm:text-sm">
                    {lang === 'bn' ? 'স্বাক্ষর কৃষিজ পণ্য (Signature Produce)' : 'Signature Agro-Specialization'}
                  </h4>
                  <p className="text-emerald-800 text-xs sm:text-sm mt-0.5 font-medium">
                    {lang === 'bn'
                      ? district.agriculturalHighlights.signatureProduceBn
                      : district.agriculturalHighlights.signatureProduce}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">
                  {lang === 'bn' ? 'প্রধান ফসলসমূহ' : 'Primary Harvested Crops'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {district.agriculturalHighlights.primaryCrops.map((crop, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 font-medium text-xs border border-stone-200"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/50">
                  <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{lang === 'bn' ? 'মৌসুম ও ফলন ক্যালেন্ডার' : 'Harvesting Seasonality'}</span>
                  </div>
                  <p className="text-stone-800 font-medium text-xs">
                    {district.agriculturalHighlights.harvestSeason}
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/50">
                  <div className="flex items-center gap-1.5 text-stone-500 text-xs font-medium mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{lang === 'bn' ? 'বার্ষিক মোট উৎপাদন ও উদ্বৃত্ত' : 'Annual Yield & Surplus'}</span>
                  </div>
                  <p className="text-stone-800 font-medium text-xs">
                    {district.agriculturalHighlights.annualProduction}
                  </p>
                  <p className="text-emerald-700 text-[11px] font-semibold mt-0.5">
                    {district.agriculturalHighlights.surplusRatio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ECONOMIC SIGNIFICANCE */}
          {activeTab === 'economic' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-[10px] sm:text-[11px] text-blue-700 uppercase font-semibold">
                    {lang === 'bn' ? 'কৃষক পরিবার সংখ্যা' : 'Farmer Base'}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-blue-950 mt-0.5">
                    {district.economicSignificance.farmerHouseholds}
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[10px] sm:text-[11px] text-emerald-700 uppercase font-semibold">
                    {lang === 'bn' ? 'বার্ষিক কৃষিজ লেনদেন' : 'Farmgate Turnover'}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-emerald-950 mt-0.5">
                    {district.economicSignificance.annualTurnover}
                  </p>
                </div>
              </div>

              {/* Loss Rate Alert */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-rose-950 text-xs sm:text-sm">
                    {lang === 'bn'
                      ? 'বর্তমান অপচয় ও পোস্ট-হার্ভেস্ট ক্ষতি:'
                      : 'Current Post-Harvest Spoilage & Breakage Loss:'}{' '}
                    <span className="text-rose-700 font-bold">{district.economicSignificance.currentLossRate}</span>
                  </h4>
                  <p className="text-rose-800 text-[11px] sm:text-xs mt-1">
                    {lang === 'bn'
                      ? 'স্থানীয় প্রক্রিয়াকরণ ও চিলিং ব্যবস্থার অভাবে কৃষকরা ন্যায্যমূল্য থেকে বঞ্চিত হচ্ছে এবং প্রতি মৌসুমে শত শত কোটি টাকার ক্ষতি হচ্ছে।'
                      : 'Due to lack of local chilling and modern micro-parboiling at farm-gate, distress sales force heavy margin capture by brokers.'}
                  </p>
                </div>
              </div>

              {/* Haats and Bottlenecks */}
              <div>
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">
                  {lang === 'bn' ? 'প্রধান স্থানীয় হাট ও বাজার কেন্দ্র' : 'Primary Trading Haats & Rural Assemblies'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {district.economicSignificance.majorHaats.map((haat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
                    >
                      {haat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-stone-500 mb-1.5">
                  {lang === 'bn' ? 'প্রধান কাঠামোগত অন্তরায়' : 'Systemic Supply Bottlenecks'}
                </h4>
                <ul className="space-y-1 text-xs text-stone-600">
                  {district.economicSignificance.keyBottlenecks.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: DECENTRALIZED MILL BUSINESS CASE */}
          {activeTab === 'business_case' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Proposed Mill Banner */}
              <div className="p-3 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="text-[10px] sm:text-[11px] font-semibold text-amber-800 uppercase tracking-wide">
                  {lang === 'bn' ? 'প্রস্তাবিত গ্রিনশপ বিকেন্দ্রীকৃত মিল' : 'GreenShop Decentralized Micro-Mill'}
                </span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-amber-950 mt-0.5">
                  {lang === 'bn' ? district.businessCase.millTypeBn : district.businessCase.proposedMill}
                </h3>
                <p className="text-xs text-amber-900 mt-1 font-medium">
                  {lang === 'bn' ? 'দৈনিক প্রক্রিয়াকরণ ক্ষমতা:' : 'Capacity:'} {district.businessCase.processingCapacity}
                </p>
              </div>

              {/* Financial Feasibility Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2 sm:p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-semibold">
                    {lang === 'bn' ? 'মূলধন বিনিয়োগ' : 'CapEx Investment'}
                  </span>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-stone-900 mt-0.5">
                    {district.businessCase.capitalInvestment.split(' ')[0]} {lang === 'bn' ? 'কোটি' : 'Cr'}
                  </p>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-[9px] sm:text-[10px] text-emerald-700 uppercase font-semibold">
                    {lang === 'bn' ? 'অপচয় হ্রাস' : 'Waste Cut'}
                  </span>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-emerald-800 mt-0.5">
                    {district.businessCase.wasteReduction.includes('to')
                      ? district.businessCase.wasteReduction.split('to')[1].split(' ')[1]
                      : district.businessCase.wasteReduction.split(' ')[0]}
                  </p>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-[9px] sm:text-[10px] text-blue-700 uppercase font-semibold">
                    {lang === 'bn' ? 'কৃষকের লাভ বৃদ্ধি' : 'Farmer Uplift'}
                  </span>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-blue-800 mt-0.5">
                    {district.businessCase.farmerMarginIncrease.split(' ')[0]}
                  </p>
                </div>

                <div className="p-2 sm:p-2.5 rounded-lg bg-purple-50 border border-purple-200">
                  <span className="text-[9px] sm:text-[10px] text-purple-700 uppercase font-semibold">
                    {lang === 'bn' ? 'বিনিয়োগ ফেরত' : 'Payback'}
                  </span>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-purple-800 mt-0.5">
                    {district.businessCase.paybackPeriod.split(' ')[0]} {lang === 'bn' ? 'বছর' : 'Yrs'}
                  </p>
                </div>
              </div>

              {/* Value-Added Products */}
              <div>
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">
                  {lang === 'bn' ? 'উৎপাদিত প্রিমিয়াম ভ্যালু-অ্যাডেড পণ্য' : 'Value-Added Branded Product Line'}
                </h4>
                <div className="space-y-1.5">
                  {district.businessCase.valueAddedProducts.map((prod, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{prod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HUB & SPOKE LOGISTICS */}
          {activeTab === 'logistics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 sm:p-3.5 rounded-xl bg-purple-50/70 border border-purple-200">
                <span className="text-[10px] sm:text-[11px] font-semibold text-purple-800 uppercase tracking-wide">
                  {lang === 'bn' ? 'জাতীয় নেটওয়ার্কে স্পোক ভূমিকা' : 'Spoke Role in National Grid'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-purple-950 mt-0.5">
                  {district.supplyChain.spokeRole}
                </p>
              </div>

              {/* 2 Global Export Gateways */}
              <div className="space-y-1.5">
                <span className="text-[11px] sm:text-xs uppercase font-bold text-stone-900 tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{lang === 'bn' ? '২টি গ্লোবাল গেটওয়ে হাব সংযোগ' : 'Dual Global Export Gateways'}</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Global Hub 1: Dhaka HSIA Airport */}
                  <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/50">
                    <div className="flex items-center gap-1.5 text-emerald-900 font-bold mb-1">
                      <Plane className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-xs">
                        {lang === 'bn' ? 'ঢাকা শাহজালাল বিমানবন্দর' : 'HSIA Airport (Dhaka)'}
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-800 font-medium">
                      {lang === 'bn' ? 'গ্লোবাল এয়ার কার্গো হাব (আকাশপথ)' : 'Global Air Cargo Hub'}
                    </p>
                    <div className="flex items-baseline justify-between mt-2 pt-1.5 border-t border-emerald-200/80">
                      <span className="text-base font-bold text-stone-900 font-mono">
                        {district.supplyChain.transitHours} {lang === 'bn' ? 'ঘণ্টা' : 'hrs'}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {district.supplyChain.transitToDhakaKm} {lang === 'bn' ? 'কি.মি.' : 'km'}
                      </span>
                    </div>
                  </div>

                  {/* Global Hub 2: Chattogram Seaport */}
                  <div className="p-3 rounded-xl border border-sky-300 bg-sky-50/50">
                    <div className="flex items-center gap-1.5 text-sky-900 font-bold mb-1">
                      <Anchor className="w-4 h-4 text-sky-700 shrink-0" />
                      <span className="text-xs">
                        {lang === 'bn' ? 'চট্টগ্রাম সমুদ্র ও নৌবন্দর' : 'Chattogram Seaport'}
                      </span>
                    </div>
                    <p className="text-[10px] text-sky-800 font-medium">
                      {lang === 'bn' ? 'গ্লোবাল মেরিটাইম হাব (সমুদ্রপথ)' : 'Global Maritime Reefer Port'}
                    </p>
                    <div className="flex items-baseline justify-between mt-2 pt-1.5 border-t border-sky-200/80">
                      <span className="text-base font-bold text-stone-900 font-mono">
                        {district.division === 'Chattogram'
                          ? Math.max(1.2, Math.round(district.supplyChain.transitHours * 0.4 * 10) / 10)
                          : Math.round((district.supplyChain.transitHours + 4.5) * 10) / 10}{' '}
                        {lang === 'bn' ? 'ঘণ্টা' : 'hrs'}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {district.division === 'Chattogram'
                          ? Math.max(30, Math.round(district.supplyChain.transitToDhakaKm * 0.45))
                          : district.supplyChain.transitToDhakaKm + 245}{' '}
                        {lang === 'bn' ? 'কি.মি.' : 'km'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                  <span className="text-[10px] sm:text-[11px] text-stone-500 font-semibold block">
                    {lang === 'bn' ? 'কোল্ড চেইন প্রয়োজনীয়তা' : 'Cold Chain Requirement'}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-stone-900 mt-0.5">
                    {district.supplyChain.coldChainRequired ? (
                      <span className="text-cyan-700">{lang === 'bn' ? 'হিমাগার (২-৪° সে.)' : 'Refrigerated (2-4°C)'}</span>
                    ) : (
                      <span className="text-emerald-700">{lang === 'bn' ? 'ড্রাই নাইট্রোজেন কন্টেইনার' : 'Dry Nitrogen Container'}</span>
                    )}
                  </p>
                  <span className="text-xs text-stone-500 font-medium mt-0.5 block">
                    {district.supplyChain.weeklyDispatches}
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-stone-200 bg-stone-50">
                  <span className="text-[11px] sm:text-xs font-semibold text-stone-500 block mb-1">
                    {lang === 'bn' ? 'প্রধান জাতীয় হাইওয়ে করিডোর' : 'Primary Logistics Arterial Corridor'}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-stone-800">
                    {district.supplyChain.primaryCorridor}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INTERACTIVE FEASIBILITY CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  {lang === 'bn'
                    ? `${district.nameBn} মিলের সক্ষমতা ও আয় বৃদ্ধি সিমুলেটর`
                    : `Feasibility & Farmer Dividend Simulator: ${district.name}`}
                </h4>

                {/* Slider 1: Farm Acreage */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs font-medium text-stone-700">
                    <span>{lang === 'bn' ? 'সংযুক্ত কৃষি জমি:' : 'Farmer Catchment Area:'}</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {farmAcres.toLocaleString()} {lang === 'bn' ? 'একর' : 'Acres'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="500"
                    value={farmAcres}
                    onChange={(e) => setFarmAcres(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 touch-pan-x"
                  />
                </div>

                {/* Slider 2: Mill Daily Capacity */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-stone-700">
                    <span>{lang === 'bn' ? 'দৈনিক প্রক্রিয়াকরণ সক্ষমতা:' : 'Daily Mill Capacity:'}</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {millCapacity} {lang === 'bn' ? 'মেট্রিক টন/দিন' : 'MT/Day'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={millCapacity}
                    onChange={(e) => setMillCapacity(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 touch-pan-x"
                  />
                </div>
              </div>

              {/* Dynamic Projection Results */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 text-center">
                <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[9px] sm:text-[10px] text-emerald-800 font-semibold uppercase">
                    {lang === 'bn' ? 'সংরক্ষিত খাদ্য' : 'Food Saved'}
                  </span>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-950 mt-0.5 sm:mt-1 font-mono">
                    {annualLossSavedTons.toLocaleString()} {lang === 'bn' ? 'মে.টন' : 'MT'}
                  </p>
                </div>

                <div className="p-2 sm:p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[9px] sm:text-[10px] text-blue-800 font-semibold uppercase">
                    {lang === 'bn' ? 'কৃষক আয়' : 'Farmer Uplift'}
                  </span>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-blue-950 mt-0.5 sm:mt-1 font-mono">
                    ৳{additionalFarmerIncomeLakh} {lang === 'bn' ? 'লাখ' : 'Lakh'}
                  </p>
                </div>

                <div className="p-2 sm:p-3 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-[9px] sm:text-[10px] text-purple-800 font-semibold uppercase">
                    {lang === 'bn' ? 'বিনিয়োগ ফেরত' : 'Payback'}
                  </span>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-purple-950 mt-0.5 sm:mt-1 font-mono">
                    {projectedPaybackMonths} {lang === 'bn' ? 'মাস' : 'Mos'}
                  </p>
                </div>
              </div>

              <p className="text-[10px] sm:text-[11px] text-stone-500 italic text-center">
                {lang === 'bn'
                  ? '*কৃষি বিপণন অধিদপ্তর (DAM)-এর বাজার সমীক্ষা ও গ্রিনশপ বিকেন্দ্রীকৃত মাইক্রো-মিলের কার্যকারিতার ওপর ভিত্তি করে অনুমিত হিসাব।'
                  : '*Projections calibrated based on Bangladesh Department of Agricultural Marketing (DAM) benchmark margins and GreenShop decentralized micro-milling efficiency rates.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('media_notes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                activeTab === 'media_notes'
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'ছবি ও নোট যোগ করুন' : 'Add Photo & Note'}</span>
              {notesCount > 0 && (
                <span className="text-[10px] bg-emerald-200 text-emerald-950 font-bold px-1.5 py-0.2 rounded-full">
                  {notesCount}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors cursor-pointer active:scale-95"
          >
            {lang === 'bn' ? 'ম্যাপে ফিরে যান' : 'Back to Map'}
          </button>
        </div>
      </div>
    </div>
  );
};
