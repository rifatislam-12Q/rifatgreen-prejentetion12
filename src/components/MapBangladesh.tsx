import React, { useState, useRef, useMemo } from 'react';
import { DistrictData, CropCategory, DivisionId, GlobalHub, GlobalHubId } from '../types';
import { DIVISIONS } from '../data/divisions';
import { GLOBAL_HUBS } from '../data/globalHubs';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
  Navigation,
  Layers,
  Sparkles,
  Plane,
  Anchor,
  Ship,
  X,
  Globe,
  ArrowRight,
  CheckCircle2,
  Building2,
  Truck,
} from 'lucide-react';

interface MapBangladeshProps {
  districts: DistrictData[];
  selectedDistrict: DistrictData | null;
  onSelectDistrict: (district: DistrictData) => void;
  showHubAndSpoke: boolean;
  activeCropFilter: CropCategory;
  activeDivisionFilter: DivisionId | 'all';
  lang: 'en' | 'bn';
}

export const MapBangladesh: React.FC<MapBangladeshProps> = ({
  districts,
  selectedDistrict,
  onSelectDistrict,
  showHubAndSpoke,
  activeCropFilter,
  activeDivisionFilter,
  lang,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictData | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [touchDistance, setTouchDistance] = useState<number | null>(null);
  const [activeGlobalHubFilter, setActiveGlobalHubFilter] = useState<'all' | GlobalHubId>('all');
  const [inspectedGlobalHub, setInspectedGlobalHub] = useState<GlobalHub | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // 2 Global Hubs: Dhaka HSIA Airport & Chattogram Seaport
  const dhakaAirportHub = useMemo(
    () => GLOBAL_HUBS.find((h) => h.id === 'dhaka_airport')!,
    []
  );
  const ctgSeaportHub = useMemo(
    () => GLOBAL_HUBS.find((h) => h.id === 'ctg_seaport')!,
    []
  );

  // Filtered districts
  const isDistrictMatchingFilter = (d: DistrictData) => {
    if (activeDivisionFilter !== 'all' && d.division !== activeDivisionFilter) {
      return false;
    }
    if (activeCropFilter !== 'all' && !d.cropsCategory.includes(activeCropFilter)) {
      return false;
    }
    return true;
  };

  // Mouse drag handlers (GPU smooth requestAnimationFrame throttling)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const nextX = e.clientX - dragStart.x;
      const nextY = e.clientY - dragStart.y;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        setPan({ x: nextX, y: nextY });
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  // Touch handlers for mobile and tablet devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const nextX = touch.clientX - dragStart.x;
      const nextY = touch.clientY - dragStart.y;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        setPan({ x: nextX, y: nextY });
      });
    } else if (e.touches.length === 2 && touchDistance !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchDistance;
      setZoom((prev) => Math.min(Math.max(prev * factor, 0.7), 3));
      setTouchDistance(dist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(null);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Spokes to render: either all if showHubAndSpoke is true, or just selected district
  const activeSpokes = useMemo(() => {
    if (!showHubAndSpoke && !selectedDistrict) return [];
    if (!showHubAndSpoke && selectedDistrict) {
      return [selectedDistrict];
    }
    return districts.filter((d) => isDistrictMatchingFilter(d));
  }, [showHubAndSpoke, selectedDistrict, districts, activeDivisionFilter, activeCropFilter]);

  return (
    <div className="relative w-full h-[380px] xs:h-[440px] sm:h-[540px] md:h-[620px] lg:h-[720px] xl:h-[760px] flex items-center justify-center bg-stone-100/70 rounded-2xl border border-stone-200 overflow-hidden select-none touch-none">
      {/* Map Control Bar (Optimized for touch targets on phones & tablets) */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-stone-200 shadow-md">
        <button
          onClick={handleZoomIn}
          title={lang === 'bn' ? 'জুম ইন (+)' : 'Zoom in (+)'}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer active:scale-95"
        >
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          title={lang === 'bn' ? 'জুম আউট (-)' : 'Zoom out (-)'}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer active:scale-95"
        >
          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleResetZoom}
          title={lang === 'bn' ? 'ম্যাপ রিসেট' : 'Reset map view'}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Floating Status & 2 Global Hubs Switcher */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex flex-wrap items-center gap-1 sm:gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-stone-200 shadow-md text-[10px] sm:text-xs">
        <button
          onClick={() => setActiveGlobalHubFilter('all')}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            activeGlobalHubFilter === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Globe className="w-3 h-3 text-emerald-400" />
          <span className="hidden xs:inline">{lang === 'bn' ? '২টি গ্লোবাল হাব' : '2 Global Hubs'}</span>
          <span className="xs:hidden">{lang === 'bn' ? 'উভয় হাব' : 'Dual'}</span>
        </button>

        <button
          onClick={() => setActiveGlobalHubFilter('dhaka_airport')}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            activeGlobalHubFilter === 'dhaka_airport'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
          title={lang === 'bn' ? 'ঢাকা হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর এয়ার কার্গো হাব' : 'Dhaka HSIA Air Cargo Hub'}
        >
          <Plane className="w-3 h-3 text-emerald-400" />
          <span>{lang === 'bn' ? 'শাহজালাল বিমানবন্দর' : 'HSIA Airport'}</span>
        </button>

        <button
          onClick={() => setActiveGlobalHubFilter('ctg_seaport')}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
            activeGlobalHubFilter === 'ctg_seaport'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
          title={lang === 'bn' ? 'চট্টগ্রাম সমুদ্র ও নৌবন্দর মেরিটাইম হাব' : 'Chattogram Seaport Maritime Hub'}
        >
          <Anchor className="w-3 h-3 text-sky-300" />
          <span>{lang === 'bn' ? 'চট্টগ্রাম নৌবন্দর' : 'Ctg Seaport'}</span>
        </button>
      </div>

      {/* Mobile Gesture Hint */}
      <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none bg-stone-900/75 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 shadow-sm md:hidden">
        <span>👆</span>
        <span>{lang === 'bn' ? 'যেকোনো জেলায় ট্যাপ করুন' : 'Tap any district'}</span>
      </div>

      {/* Interactive Tooltip Card on Hover / Tap */}
      {hoveredDistrict && (
        <div
          className="absolute pointer-events-none z-30 transition-all duration-75 bg-stone-900/90 text-white backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl shadow-xl border border-white/10 text-xs max-w-[calc(100vw-3rem)] sm:max-w-xs bottom-3 left-3 sm:bottom-4 sm:left-4"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-bold text-sm text-white">
              {lang === 'bn' ? hoveredDistrict.nameBn : hoveredDistrict.name}
            </span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
              style={{
                backgroundColor: `${DIVISIONS[hoveredDistrict.division].color}33`,
                color: '#86efac',
              }}
            >
              {lang === 'bn'
                ? `${hoveredDistrict.divisionBn} বিভাগ`
                : hoveredDistrict.division}
            </span>
          </div>
          <p className="text-stone-300 line-clamp-1 mb-1 text-[11px] sm:text-xs">
            {lang === 'bn'
              ? hoveredDistrict.agriculturalHighlights.signatureProduceBn
              : hoveredDistrict.agriculturalHighlights.signatureProduce}
          </p>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-emerald-400 font-mono">
            <span>
              {lang === 'bn' ? 'ক্ষতি হ্রাস:' : 'Waste cut:'}{' '}
              {hoveredDistrict.businessCase.wasteReduction.split(' ')[0]}
            </span>
            <span>
              {hoveredDistrict.supplyChain.transitHours}h ({hoveredDistrict.supplyChain.transitToDhakaKm} কি.মি.)
            </span>
          </div>
        </div>
      )}

      {/* Main SVG Map Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 900 1050"
        className="w-full h-full max-h-[850px] cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <defs>
          <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#047857" floodOpacity="0.4" />
          </filter>
          <filter id="dhaka-airport-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#10b981" floodOpacity="0.9" />
          </filter>
          <filter id="ctg-seaport-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#0284c7" floodOpacity="0.9" />
          </filter>

          <linearGradient id="spokeGradientAirport" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="spokeGradientSeaport" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
          </linearGradient>

          <style>{`
            @keyframes pulse-ring {
              0% { r: 8px; opacity: 0.9; }
              50% { r: 24px; opacity: 0.3; }
              100% { r: 36px; opacity: 0; }
            }
            @keyframes flowDash {
              to {
                stroke-dashoffset: -40;
              }
            }
            .animate-dash {
              animation: flowDash 1.8s linear infinite;
            }
            .animate-dash-seaport {
              animation: flowDash 2.1s linear infinite;
            }
            .animate-pulse-ring {
              animation: pulse-ring 2.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
            }
          `}</style>
        </defs>

        {/* Ambient Geographic Background Waterbodies / Rivers Representation */}
        <g id="rivers" opacity="0.4" pointerEvents="none">
          {/* Jamuna / Brahmaputra River Channel */}
          <path
            d="M 330 180 Q 345 280 340 370 Q 345 440 365 490 Q 395 530 430 550"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Padma River Channel */}
          <path
            d="M 140 435 Q 220 480 300 515 Q 365 525 430 550 Q 480 580 530 660 Q 560 720 560 820"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Meghna River Channel */}
          <path
            d="M 640 370 Q 570 450 510 520 Q 480 560 490 640 Q 520 720 540 820"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Bay of Bengal subtle baseline */}
          <path
            d="M 160 820 Q 300 840 470 850 Q 640 860 720 960"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
        </g>

        {/* 64 Districts Polygons */}
        <g id="districts-layer">
          {districts.map((district) => {
            const isSelected = selectedDistrict?.id === district.id;
            const isHovered = hoveredDistrict?.id === district.id;
            const matchesFilter = isDistrictMatchingFilter(district);
            const divisionMeta = DIVISIONS[district.division];

            const fillColor = matchesFilter ? divisionMeta.color : '#e7e5e4';
            const fillOpacity = matchesFilter
              ? isSelected
                ? 0.95
                : isHovered
                ? 0.85
                : 0.65
              : 0.25;

            return (
              <g key={district.id} className="transition-all duration-200">
                <path
                  d={district.path}
                  fill={fillColor}
                  fillOpacity={fillOpacity}
                  stroke={isSelected ? '#064e3b' : isHovered ? '#1c1917' : '#ffffff'}
                  strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.2}
                  strokeLinejoin="round"
                  filter={isSelected ? 'url(#glow-selected)' : undefined}
                  className="cursor-pointer transition-all duration-150 hover:opacity-100"
                  onMouseEnter={() => setHoveredDistrict(district)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDistrict(district);
                  }}
                />

                {/* District Center Node / Agricultural Marker */}
                <circle
                  cx={district.center.x}
                  cy={district.center.y}
                  r={isSelected ? 5 : isHovered ? 4 : 2.5}
                  fill={isSelected ? '#ffffff' : matchesFilter ? divisionMeta.accentColor : '#a8a29e'}
                  stroke={isSelected ? '#064e3b' : '#ffffff'}
                  strokeWidth={isSelected ? 2 : 1}
                  className="pointer-events-none transition-all duration-200"
                />

                {/* District Label */}
                {(isSelected || isHovered || zoom > 1.3 || ['dhaka', 'dinajpur', 'pabna', 'panchagarh', 'bogra', 'rajshahi', 'sylhet', 'barishal', 'chattogram', 'khulna'].includes(district.id)) && (
                  <text
                    x={district.center.x}
                    y={district.center.y + (isSelected ? 16 : 13)}
                    textAnchor="middle"
                    fill={isSelected ? '#064e3b' : '#1c1917'}
                    fontSize={isSelected ? '12px' : '10px'}
                    fontWeight={isSelected ? '700' : '600'}
                    className="pointer-events-none select-none font-sans drop-shadow-sm"
                  >
                    {lang === 'bn' ? district.nameBn : district.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* Dual Global Hubs Spokes (Airport & Seaport Supply Vectors) */}
        <g id="spokes-layer" pointerEvents="none">
          {activeSpokes.map((district) => {
            const isSelected = selectedDistrict?.id === district.id;
            const startX = district.center.x;
            const startY = district.center.y;

            // Spoke to Dhaka Hazrat Shahjalal Airport
            const showAirportSpoke =
              activeGlobalHubFilter === 'all' || activeGlobalHubFilter === 'dhaka_airport';
            const airportEndX = dhakaAirportHub.center.x;
            const airportEndY = dhakaAirportHub.center.y;
            const airportMidX = (startX + airportEndX) / 2 + (startY - airportEndY) * 0.12;
            const airportMidY = (startY + airportEndY) / 2 + (airportEndX - startX) * 0.12;
            const airportPathD = `M ${startX} ${startY} Q ${airportMidX} ${airportMidY} ${airportEndX} ${airportEndY}`;

            // Spoke to Chattogram Seaport
            const showSeaportSpoke =
              activeGlobalHubFilter === 'all' || activeGlobalHubFilter === 'ctg_seaport';
            const ctgEndX = ctgSeaportHub.center.x;
            const ctgEndY = ctgSeaportHub.center.y;
            const ctgMidX = (startX + ctgEndX) / 2 - (startY - ctgEndY) * 0.12;
            const ctgMidY = (startY + ctgEndY) / 2 + (ctgEndX - startX) * 0.12;
            const ctgPathD = `M ${startX} ${startY} Q ${ctgMidX} ${ctgMidY} ${ctgEndX} ${ctgEndY}`;

            return (
              <g key={`spoke-${district.id}`}>
                {/* Spoke to Dhaka HSIA Airport (Air Cargo Express) */}
                {showAirportSpoke && (
                  <g>
                    <path
                      d={airportPathD}
                      fill="none"
                      stroke={isSelected ? '#047857' : '#10b981'}
                      strokeWidth={isSelected ? 3 : 1.6}
                      strokeOpacity={isSelected ? 0.95 : 0.55}
                      strokeDasharray={isSelected ? '6 4' : '4 5'}
                      className="animate-dash"
                    />
                    {(isSelected || ['dinajpur', 'pabna', 'panchagarh', 'rajshahi', 'bogra', 'satkhira', 'barishal', 'sylhet'].includes(district.id)) && (
                      <circle r={isSelected ? 4.5 : 3} fill={isSelected ? '#047857' : '#059669'}>
                        <animateMotion
                          path={airportPathD}
                          dur={`${Math.max(2, district.supplyChain.transitHours * 0.45)}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                )}

                {/* Spoke to Chattogram Seaport (Ocean Freight & Reefer) */}
                {showSeaportSpoke && (
                  <g>
                    <path
                      d={ctgPathD}
                      fill="none"
                      stroke={isSelected ? '#0284c7' : '#38bdf8'}
                      strokeWidth={isSelected ? 3 : 1.6}
                      strokeOpacity={isSelected ? 0.95 : 0.55}
                      strokeDasharray={isSelected ? '6 4' : '4 5'}
                      className="animate-dash-seaport"
                    />
                    {(isSelected || ['satkhira', 'khulna', 'barishal', 'chattogram', 'coxs_bazar', 'sylhet'].includes(district.id)) && (
                      <circle r={isSelected ? 4.5 : 3} fill={isSelected ? '#0369a1' : '#0284c7'}>
                        <animateMotion
                          path={ctgPathD}
                          dur={`${Math.max(2.5, (district.supplyChain.transitHours * 1.35) * 0.45)}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* ============================================================== */}
        {/* GLOBAL HUB 1: DHAKA HAZRAT SHAHJALAL INTERNATIONAL AIRPORT      */}
        {/* ============================================================== */}
        {(activeGlobalHubFilter === 'all' || activeGlobalHubFilter === 'dhaka_airport') && (
          <g
            id="global-hub-dhaka-airport"
            className="cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              setInspectedGlobalHub(dhakaAirportHub);
            }}
          >
            <circle
              cx={dhakaAirportHub.center.x}
              cy={dhakaAirportHub.center.y}
              r="17"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              className="animate-pulse-ring"
            />
            <circle
              cx={dhakaAirportHub.center.x}
              cy={dhakaAirportHub.center.y}
              r="11"
              fill="#047857"
              filter="url(#dhaka-airport-glow)"
              className="group-hover:scale-110 transition-transform origin-center"
            />
            <circle
              cx={dhakaAirportHub.center.x}
              cy={dhakaAirportHub.center.y}
              r="4.5"
              fill="#ffffff"
            />

            {/* Plane Icon inside Hub Marker */}
            <g transform={`translate(${dhakaAirportHub.center.x - 7}, ${dhakaAirportHub.center.y - 7})`}>
              <path
                d="M10 2L8 6v5l-4-2v2l4 1.5v3L6 17v1.5l3-.8 3 .8V17l-2-1.5v-3l4-1.5V9l-4 2V6z"
                fill="#ffffff"
                transform="scale(0.75)"
              />
            </g>

            {/* Label Card */}
            <g transform={`translate(${dhakaAirportHub.center.x + 15}, ${dhakaAirportHub.center.y - 20})`}>
              <rect
                x="-4"
                y="-13"
                width="176"
                height="30"
                rx="8"
                fill="#064e3b"
                fillOpacity="0.95"
                stroke="#10b981"
                strokeWidth="1.2"
                className="drop-shadow-md"
              />
              <text
                x="4"
                y="0"
                fill="#86efac"
                fontSize="9px"
                fontWeight="800"
                className="font-sans uppercase tracking-wider"
              >
                {lang === 'bn' ? '🛫 গ্লোবাল এয়ার কার্গো হাব' : '🛫 Global Air Cargo Hub'}
              </text>
              <text
                x="4"
                y="12"
                fill="#ffffff"
                fontSize="10.5px"
                fontWeight="700"
                className="font-sans"
              >
                {lang === 'bn' ? 'শাহজালাল বিমানবন্দর' : 'HSIA Airport (Dhaka)'}
              </text>
            </g>
          </g>
        )}

        {/* ============================================================== */}
        {/* GLOBAL HUB 2: CHATTOGRAM MARITIME SEAPORT                      */}
        {/* ============================================================== */}
        {(activeGlobalHubFilter === 'all' || activeGlobalHubFilter === 'ctg_seaport') && (
          <g
            id="global-hub-ctg-seaport"
            className="cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              setInspectedGlobalHub(ctgSeaportHub);
            }}
          >
            <circle
              cx={ctgSeaportHub.center.x}
              cy={ctgSeaportHub.center.y}
              r="17"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              className="animate-pulse-ring"
            />
            <circle
              cx={ctgSeaportHub.center.x}
              cy={ctgSeaportHub.center.y}
              r="11"
              fill="#0369a1"
              filter="url(#ctg-seaport-glow)"
              className="group-hover:scale-110 transition-transform origin-center"
            />
            <circle
              cx={ctgSeaportHub.center.x}
              cy={ctgSeaportHub.center.y}
              r="4.5"
              fill="#ffffff"
            />

            {/* Anchor / Ship Icon inside Hub Marker */}
            <g transform={`translate(${ctgSeaportHub.center.x - 6}, ${ctgSeaportHub.center.y - 6})`}>
              <path
                d="M6 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1 4V3.87A3 3 0 0 0 6 3a3 3 0 0 0-1 .87V5H3v1h2v3.17A5.002 5.002 0 0 0 1 14h2a3 3 0 0 1 6 0h2a5.002 5.002 0 0 0-4-4.83V6h2V5H7z"
                fill="#ffffff"
                transform="scale(0.85)"
              />
            </g>

            {/* Label Card */}
            <g transform={`translate(${ctgSeaportHub.center.x + 15}, ${ctgSeaportHub.center.y - 20})`}>
              <rect
                x="-4"
                y="-13"
                width="176"
                height="30"
                rx="8"
                fill="#0c4a6e"
                fillOpacity="0.95"
                stroke="#38bdf8"
                strokeWidth="1.2"
                className="drop-shadow-md"
              />
              <text
                x="4"
                y="0"
                fill="#7dd3fc"
                fontSize="9px"
                fontWeight="800"
                className="font-sans uppercase tracking-wider"
              >
                {lang === 'bn' ? '⚓ গ্লোবাল মেরিটাইম হাব' : '⚓ Global Maritime Seaport'}
              </text>
              <text
                x="4"
                y="12"
                fill="#ffffff"
                fontSize="10.5px"
                fontWeight="700"
                className="font-sans"
              >
                {lang === 'bn' ? 'চট্টগ্রাম সমুদ্র ও নৌবন্দর' : 'Chattogram Seaport'}
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Global Hub Detailed Modal (When User Taps on Dhaka Airport or Chattogram Seaport) */}
      {inspectedGlobalHub && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setInspectedGlobalHub(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="p-4 sm:p-5 text-white flex items-start justify-between"
              style={{
                background: `linear-gradient(135deg, ${inspectedGlobalHub.accentColor} 0%, #1c1917 100%)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                  {inspectedGlobalHub.id === 'dhaka_airport' ? (
                    <Plane className="w-6 h-6 text-white" />
                  ) : (
                    <Anchor className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                    {lang === 'bn' ? inspectedGlobalHub.typeBn : inspectedGlobalHub.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {lang === 'bn' ? inspectedGlobalHub.nameBn : inspectedGlobalHub.name}
                  </h3>
                  <p className="text-xs text-white/80">
                    {lang === 'bn' ? inspectedGlobalHub.locationBn : inspectedGlobalHub.location}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectedGlobalHub(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-4 overflow-y-auto text-xs text-stone-700">
              {/* Daily Capacity Banner */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold block">
                    {lang === 'bn' ? 'দৈনিক হ্যান্ডলিং ও রফতানি ক্ষমতা' : 'Daily Export Capacity'}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-stone-900 font-mono">
                    {inspectedGlobalHub.dailyCapacity}
                  </span>
                </div>
                <div
                  className="px-2.5 py-1 rounded-lg text-white font-bold text-xs"
                  style={{ backgroundColor: inspectedGlobalHub.accentColor }}
                >
                  {inspectedGlobalHub.id === 'dhaka_airport'
                    ? lang === 'bn' ? 'আকাশপথ এক্সপ্রেস' : 'Air Cargo'
                    : lang === 'bn' ? 'সমুদ্রপথ কনটেইনার' : 'Ocean Freight'}
                </div>
              </div>

              {/* Primary Export Commodities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {lang === 'bn' ? 'প্রধান কৃষিজ রফতানি পণ্যসমূহ' : 'Primary Export Commodities'}
                  </span>
                </h4>
                <div className="space-y-1.5">
                  {(lang === 'bn'
                    ? inspectedGlobalHub.primaryExportCommoditiesBn
                    : inspectedGlobalHub.primaryExportCommodities
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-stone-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Global Destinations */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                  <span>
                    {lang === 'bn' ? 'আন্তর্জাতিক সরাসরি গন্তব্য' : 'International Direct Corridors'}
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {(lang === 'bn'
                    ? inspectedGlobalHub.destinationsBn
                    : inspectedGlobalHub.destinations
                  ).map((dest, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-3 h-3 text-sky-600 shrink-0" />
                      <span className="font-medium text-stone-800">{dest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'গ্রিনশপ গ্লোবাল গেটওয়ে ২০২৯' : 'GreenShop Global Gateway 2029'}
              </span>
              <button
                onClick={() => setInspectedGlobalHub(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-3 right-3 sm:right-4 z-20 flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-stone-600 bg-white/90 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-stone-200 shadow-xs">
        <span className="flex items-center gap-1">
          <Navigation className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>{lang === 'bn' ? 'টাচ/ড্র্যাগ করে সরান' : 'Drag/Touch to pan'}</span>
        </span>
        <span className="text-stone-300">·</span>
        <span className="flex items-center gap-1 font-semibold text-emerald-800">
          <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>{lang === 'bn' ? 'দিনাজপুর বা পাবনায় ট্যাপ করুন' : 'Tap Dinajpur or Pabna'}</span>
        </span>
      </div>
    </div>
  );
};
