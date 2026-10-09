import React from 'react';
import { DistrictData, CropCategory, DivisionId } from '../types';
import { DIVISIONS } from '../data/divisions';
import { MapBangladesh } from './MapBangladesh';
import {
  Sparkles,
  Truck,
  Search,
  Factory,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface InteractiveMapSectionProps {
  districts: DistrictData[];
  selectedDistrict: DistrictData | null;
  onSelectDistrict: (district: DistrictData) => void;
  onInspectDistrict: (districtId: string) => void;
  lang: 'en' | 'bn';
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

export const InteractiveMapSection: React.FC<InteractiveMapSectionProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  onInspectDistrict,
  lang,
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
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header Bar with Hub-and-Spoke Toggle & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <h3 className="text-sm sm:text-base font-bold text-stone-900">
            {lang === 'bn'
              ? 'জাতীয় ৬৪ জেলা ইন্টারেক্টিভ কৃষি ও লজিস্টিকস ম্যাপ'
              : 'Interactive 64-District Agro & Logistics Grid'}
          </h3>
        </div>

        {/* Hub & Spoke Toggle */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white p-1 rounded-xl border border-stone-200 shadow-2xs">
          <button
            onClick={() => setShowHubAndSpoke(false)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              !showHubAndSpoke ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {lang === 'bn' ? 'শুধুমাত্র জেলা' : 'Districts'}
          </button>
          <button
            onClick={() => setShowHubAndSpoke(true)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              showHubAndSpoke ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? '২টি গ্লোবাল হাব ও স্পোকস' : 'Dual Global Hubs'}</span>
          </button>
        </div>
      </div>

      {/* Priority Spotlights Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs no-scrollbar touch-pan-x">
        <span className="text-stone-500 font-bold uppercase text-[10px] sm:text-[11px] whitespace-nowrap">
          {lang === 'bn' ? 'অগ্রাধিকার হাব:' : 'Priority Hubs:'}
        </span>
        {spotlightDistricts.map((d) => (
          <button
            key={d.id}
            onClick={() => onSelectDistrict(d)}
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

      {/* Filter Bar with Division and Search */}
      <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5">
        <div className="relative">
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
            { id: 'fine_rice', label: 'Fine Rice', labelBn: 'সুগন্ধি চাল' },
            { id: 'fruits', label: 'Fruits', labelBn: 'ফলমূল (লিচু/আম)' },
            { id: 'grains_pulses', label: 'Wheat & Maize', labelBn: 'গম ও ভুট্টা' },
            { id: 'vegetables_spices', label: 'Spices & Tubers', labelBn: 'মসলা ও আলু' },
            { id: 'fisheries_livestock', label: 'Fisheries & Dairy', labelBn: 'মৎস্য ও দুগ্ধ' },
            { id: 'cash_crops', label: 'Tea & Cash Crops', labelBn: 'চা ও অর্থকরী' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCropFilter(cat.id as CropCategory)}
              className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                cropFilter === cat.id
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {lang === 'bn' ? cat.labelBn : cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Screen Layout: Map (Left 8 cols) + District Preview Drawer (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Map Column */}
        <div className="lg:col-span-8 flex flex-col">
          <MapBangladesh
            districts={districts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={onSelectDistrict}
            showHubAndSpoke={showHubAndSpoke}
            activeCropFilter={cropFilter}
            activeDivisionFilter={divisionFilter}
            lang={lang}
          />
        </div>

        {/* District Preview Card & Search Results */}
        <div className="lg:col-span-4 space-y-4">
          {selectedDistrict ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4">
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

                <div className="text-right space-y-1">
                  <div className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="text-[9px] text-emerald-800 font-bold block uppercase font-mono">
                      🛫 {lang === 'bn' ? 'শাহজালাল বিমানবন্দর' : 'HSIA Airport'}
                    </span>
                    <span className="text-xs font-bold text-stone-900 font-mono">
                      {selectedDistrict.supplyChain.transitHours} {lang === 'bn' ? 'ঘণ্টা' : 'h'}
                    </span>
                  </div>
                  <div className="bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    <span className="text-[9px] text-sky-800 font-bold block uppercase font-mono">
                      ⚓ {lang === 'bn' ? 'চট্টগ্রাম নৌবন্দর' : 'Ctg Seaport'}
                    </span>
                    <span className="text-xs font-bold text-stone-900 font-mono">
                      {selectedDistrict.division === 'Chattogram'
                        ? Math.max(1.2, Math.round(selectedDistrict.supplyChain.transitHours * 0.4 * 10) / 10)
                        : Math.round((selectedDistrict.supplyChain.transitHours + 4.5) * 10) / 10}{' '}
                      {lang === 'bn' ? 'ঘণ্টা' : 'h'}
                    </span>
                  </div>
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
                <p className="font-semibold text-stone-800">
                  {lang === 'bn' ? selectedDistrict.businessCase.millTypeBn : selectedDistrict.businessCase.proposedMill}
                </p>
                <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono text-[11px]">
                  <div className="bg-white/80 p-1.5 rounded border border-amber-200/60">
                    <span className="text-[9px] text-stone-500 block">{lang === 'bn' ? 'অপচয় হ্রাস' : 'Waste Cut'}</span>
                    <span className="font-bold text-emerald-700">{selectedDistrict.businessCase.wasteReduction}</span>
                  </div>
                  <div className="bg-white/80 p-1.5 rounded border border-amber-200/60">
                    <span className="text-[9px] text-stone-500 block">{lang === 'bn' ? 'কৃষক লাভ' : 'Margin+'}</span>
                    <span className="font-bold text-emerald-700">{selectedDistrict.businessCase.farmerMarginIncrease}</span>
                  </div>
                  <div className="bg-white/80 p-1.5 rounded border border-amber-200/60">
                    <span className="text-[9px] text-stone-500 block">{lang === 'bn' ? 'বিনিয়োগ ফেরত' : 'Payback'}</span>
                    <span className="font-bold text-stone-800">{selectedDistrict.businessCase.paybackPeriod}</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Open Full Modal */}
              <button
                onClick={() => onInspectDistrict(selectedDistrict.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>{lang === 'bn' ? 'সম্পূর্ণ অর্থনৈতিক ও মিল কেস স্টাডি দেখুন' : 'View Full Case Study'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-stone-300 text-stone-500 text-xs">
              {lang === 'bn' ? 'ম্যাপ থেকে যেকোনো জেলা নির্বাচন করুন' : 'Select any district on the map'}
            </div>
          )}

          {/* Quick Districts Search & Selection List */}
          <div className="bg-white rounded-2xl border border-stone-200 p-3 sm:p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-700">
                {lang === 'bn' ? `জেলা তালিকা (${filteredDistricts.length})` : `Districts (${filteredDistricts.length})`}
              </span>
              <span className="text-[10px] text-stone-400">
                {lang === 'bn' ? 'ক্লিক করে দেখুন' : 'Click to select'}
              </span>
            </div>

            <div className="max-h-56 overflow-y-auto space-y-1 pr-1 text-xs no-scrollbar">
              {filteredDistricts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => onSelectDistrict(d)}
                  className={`w-full p-2 rounded-lg text-left flex items-center justify-between transition-colors cursor-pointer ${
                    selectedDistrict?.id === d.id
                      ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: DIVISIONS[d.division].color }}
                    />
                    <span>{lang === 'bn' ? d.nameBn : d.name}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">
                    ~{d.supplyChain.transitHours}h
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
