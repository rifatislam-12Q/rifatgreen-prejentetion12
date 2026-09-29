import React, { useState } from 'react';
import { DistrictData, DivisionId } from '../types';
import { DIVISIONS } from '../data/divisions';
import { GLOBAL_HUBS } from '../data/globalHubs';
import {
  Truck,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Cpu,
  BarChart3,
  CheckCircle2,
  Clock,
  Navigation,
  Sparkles,
  Plane,
  Anchor,
  Ship,
  Globe,
} from 'lucide-react';

interface HubAndSpokeViewProps {
  districts: DistrictData[];
  onSelectDistrict: (district: DistrictData) => void;
  lang: 'en' | 'bn';
}

export const HubAndSpokeView: React.FC<HubAndSpokeViewProps> = ({
  districts,
  onSelectDistrict,
  lang,
}) => {
  const [selectedCorridor, setSelectedCorridor] = useState<DivisionId>('Rangpur');

  const activeDivision = DIVISIONS[selectedCorridor];
  const corridorDistricts = districts.filter((d) => d.division === selectedCorridor);

  // Key spotlight districts for quick access
  const spotlightIds = ['dinajpur', 'pabna', 'panchagarh', 'bogra', 'satkhira', 'barishal', 'sylhet'];

  return (
    <div className="space-y-6">
      {/* Overview Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 text-white p-4 sm:p-6 lg:p-8 border border-stone-800 shadow-xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              {lang === 'bn' ? 'জাতীয় কৃষি লজিস্টিকস গ্রিড' : 'National Agri-Logistics Grid'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            {lang === 'bn'
              ? 'গ্রিনশপ হাব-অ্যান্ড-স্পোক সরবরাহ শৃঙ্খল (২০২৯ রূপকল্প)'
              : 'GreenShop Hub-and-Spoke Supply Chain Model (2029 Vision)'}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed">
            {lang === 'bn'
              ? '৬৪টি জেলার স্থানীয় বিকেন্দ্রীকৃত প্রসেসিং মিলগুলোকে সরাসরি ঢাকার সেন্ট্রাল মেগা-টার্মিনালের সাথে যুক্ত করে মধ্যস্বত্বভোগীহীন দ্রুততম খাদ্য সরবরাহ শৃঙ্খল।'
              : 'Connecting 64 decentralized district micro-processing mills directly to Dhaka’s Central Mega-Hub via temperature-controlled express corridors, eliminating 5 to 7 traditional intermediary layers.'}
          </p>
        </div>

        {/* Live Performance Comparison Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-stone-800">
          <div>
            <span className="text-[11px] text-stone-400 uppercase font-medium">
              {lang === 'bn' ? 'মধ্যস্বত্বভোগী ধাপ' : 'Intermediary Layers'}
            </span>
            <p className="text-lg sm:text-xl font-bold text-white mt-0.5 font-mono">
              {lang === 'bn' ? '১টি সরাসরি ধাপ' : '1 Direct Hop'}{' '}
              <span className="text-xs text-stone-500 line-through">
                {lang === 'bn' ? 'বনাম ৬টি ধাপ' : 'vs 6 Layers'}
              </span>
            </p>
          </div>

          <div>
            <span className="text-[11px] text-stone-400 uppercase font-medium">
              {lang === 'bn' ? 'পোস্ট-হার্ভেস্ট খাদ্য অপচয়' : 'Post-Harvest Loss'}
            </span>
            <p className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5 font-mono">
              ৩.২%{' '}
              <span className="text-xs text-stone-500 line-through">
                {lang === 'bn' ? 'বনাম ২৪.৫%' : 'vs 24.5%'}
              </span>
            </p>
          </div>

          <div>
            <span className="text-[11px] text-stone-400 uppercase font-medium">
              {lang === 'bn' ? 'কৃষকের নিট লাভ বৃদ্ধি' : 'Farmer Net Margin'}
            </span>
            <p className="text-lg sm:text-xl font-bold text-emerald-400 mt-0.5 font-mono">
              {lang === 'bn' ? '+৩২% সরাসরি প্রবৃদ্ধি' : '+32% Direct Uplift'}
            </p>
          </div>

          <div>
            <span className="text-[11px] text-stone-400 uppercase font-medium">
              {lang === 'bn' ? 'ঢাকা পৌঁছানোর সময়' : 'Farm-to-Dhaka Transit'}
            </span>
            <p className="text-lg sm:text-xl font-bold text-cyan-400 mt-0.5 font-mono">
              {lang === 'bn' ? '৩.৫ - ৮.৫ ঘণ্টা' : '3.5 - 8.5 Hours'}
            </p>
          </div>
        </div>
      </div>

      {/* Corridor Selector Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500">
            {lang === 'bn' ? 'আঞ্চলিক এক্সপ্রেস করিডোর নির্বাচন করুন' : 'Select Regional Arterial Corridor'}
          </h3>
          <span className="text-xs text-stone-500">
            {lang === 'bn' ? '৮টি বিভাগীয় করিডোর' : '8 Divisional Corridors'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {(Object.keys(DIVISIONS) as DivisionId[]).map((divId) => {
            const div = DIVISIONS[divId];
            const isSelected = selectedCorridor === divId;

            return (
              <button
                key={divId}
                onClick={() => setSelectedCorridor(divId)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                    : 'bg-white/80 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: div.color }}
                  />
                  <span className="text-xs font-bold text-stone-900 truncate">
                    {lang === 'bn' ? div.nameBn : div.id}
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-mono block">
                  {div.districtCount} {lang === 'bn' ? 'জেলা স্পোক' : 'Spokes'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Corridor Architecture Diagram */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: activeDivision.color }}
              />
              <h3 className="text-lg font-bold text-stone-900">
                {lang === 'bn' ? activeDivision.nameBn : activeDivision.id}{' '}
                {lang === 'bn' ? 'করিডোর নেটওয়ার্ক' : 'Corridor Logistics Network'}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {activeDivision.corridorName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-800 font-medium px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200">
              {activeDivision.regionalProcessingFocus}
            </span>
          </div>
        </div>

        {/* Visual Hub-and-Spoke Flow Diagram */}
        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: District Spokes */}
            <div className="lg:col-span-7 space-y-2.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-1">
                {lang === 'bn'
                  ? 'আঞ্চলিক বিকেন্দ্রীকৃত স্পোক মিলসমূহ (ক্লিক করে বিস্তারিত দেখুন)'
                  : 'Decentralized District Spokes (Click to Inspect)'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {corridorDistricts.map((district) => {
                  const isSpotlight = spotlightIds.includes(district.id);

                  return (
                    <div
                      key={district.id}
                      onClick={() => onSelectDistrict(district)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer group hover:shadow-md ${
                        isSpotlight
                          ? 'border-emerald-300 bg-emerald-50/40 hover:border-emerald-500'
                          : 'border-stone-200 bg-stone-50/50 hover:border-stone-400 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900 text-sm group-hover:text-emerald-800 transition-colors">
                              {lang === 'bn' ? district.nameBn : district.name}
                            </span>
                            {isSpotlight && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                {lang === 'bn' ? 'অগ্রাধিকার হাব' : 'Priority Hub'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {lang === 'bn'
                              ? district.agriculturalHighlights.signatureProduceBn
                              : district.agriculturalHighlights.signatureProduce}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200/60 font-mono">
                        <span>{district.supplyChain.transitToDhakaKm} কি.মি.</span>
                        <span>
                          ~{district.supplyChain.transitHours} {lang === 'bn' ? 'ঘণ্টা ট্রানজিট' : 'h transit'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Middle: Arterial Transit Pipeline */}
            <div className="lg:col-span-2 flex lg:flex-col items-center justify-center gap-2 py-4 text-center">
              <div className="h-0.5 w-full lg:w-0.5 lg:h-32 bg-gradient-to-r lg:bg-gradient-to-b from-stone-200 via-emerald-500 to-emerald-700 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-emerald-400 shadow-sm text-emerald-700">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-[11px] text-stone-500 font-mono whitespace-nowrap">
                {lang === 'bn' ? 'জিপিএস রেফ্রিজারেটেড ফ্লিট' : 'Direct GPS Reefer Fleet'}
              </div>
            </div>

            {/* Right: 2 Global Gateway Hubs (Dhaka Airport & Chattogram Seaport) */}
            <div className="lg:col-span-3 space-y-3">
              {/* Global Hub 1: Dhaka HSIA Airport */}
              <div className="p-3.5 rounded-xl border border-emerald-300 bg-gradient-to-b from-emerald-50 to-white shadow-xs">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
                    <Plane className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block leading-tight">
                      {lang === 'bn' ? 'গ্লোবাল এয়ার কার্গো হাব' : 'Global Air Cargo Hub'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                      {lang === 'bn' ? 'শাহজালাল আন্তর্জাতিক বিমানবন্দর' : 'Dhaka HSIA Airport'}
                    </h4>
                  </div>
                </div>
                <p className="text-[11px] text-stone-600">
                  {lang === 'bn'
                    ? 'কাটারিভোগ চাল, তাজা লিচু, আম ও শাকসবজি ৬-১২ ঘণ্টায় মধ্যপ্রাচ্য, ইউরোপ ও সিঙ্গাপুরে প্রেরণ।'
                    : 'Aromatic fine rice, fresh litchi, mangoes & herbs airfreighted worldwide in 6-12 hours.'}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-800 font-bold mt-2 pt-2 border-t border-emerald-100">
                  <span>{lang === 'bn' ? '২৫০+ টন দৈনিক কার্গো' : '250+ MT Daily'}</span>
                  <span>{lang === 'bn' ? 'দুবাই/হিথ্রো/ফ্রাঙ্কফুর্ট' : 'DXB / LHR / FRA'}</span>
                </div>
              </div>

              {/* Global Hub 2: Chattogram Maritime Seaport */}
              <div className="p-3.5 rounded-xl border border-sky-300 bg-gradient-to-b from-sky-50 to-white shadow-xs">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-6 h-6 rounded-lg bg-sky-800 text-white flex items-center justify-center shrink-0">
                    <Anchor className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block leading-tight">
                      {lang === 'bn' ? 'গ্লোবাল মেরিটাইম সিপোর্ট ও নৌবন্দর' : 'Global Maritime Seaport'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                      {lang === 'bn' ? 'চট্টগ্রাম সমুদ্র ও নৌবন্দর' : 'Chattogram Seaport'}
                    </h4>
                  </div>
                </div>
                <p className="text-[11px] text-stone-600">
                  {lang === 'bn'
                    ? 'হিমায়িত বাগদা/গলদা চিংড়ি, সামুদ্রিক মৎস্য, বাল্ক খাদ্যশস্য ও চা আন্তর্জাতিক রিফার কনটেইনারে রফতানি।'
                    : 'Frozen shrimp, ocean catch, bulk grains & export tea shipped via ocean reefer containers.'}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-sky-800 font-bold mt-2 pt-2 border-t border-sky-100">
                  <span>{lang === 'bn' ? '১২,০০০+ টিইইউ কনটেইনার' : '12k+ TEU Daily'}</span>
                  <span>{lang === 'bn' ? 'রটারডাম/নিউইয়র্ক/জাপান' : 'RTM / NYC / JPN'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
