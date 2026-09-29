import React, { useState, useRef, useMemo } from 'react';
import { DistrictData, CropCategory, DivisionId } from '../types';
import { DIVISIONS } from '../data/divisions';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Navigation, Layers, Sparkles, Touchpad } from 'lucide-react';

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

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Central Hub: Dhaka
  const dhakaDistrict = useMemo(
    () => districts.find((d) => d.id === 'dhaka') || districts[0],
    [districts]
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

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
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
    if (!showHubAndSpoke && selectedDistrict && selectedDistrict.id !== 'dhaka') {
      return [selectedDistrict];
    }
    return districts.filter((d) => d.id !== 'dhaka' && isDistrictMatchingFilter(d));
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

      {/* Floating Status / Legend Indicator */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-md px-2 py-1 sm:px-3 sm:py-2 rounded-xl border border-stone-200 shadow-sm text-[10px] sm:text-xs">
        <span className="flex items-center gap-1.5 text-stone-800 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{lang === 'bn' ? '৬৪ জেলা' : '64 Districts'}</span>
        </span>
        <span className="text-stone-300">|</span>
        <span className="text-stone-600 hidden xs:inline">
          {showHubAndSpoke
            ? lang === 'bn'
              ? 'হাব-অ্যান্ড-স্পোক চালু'
              : 'Hub & Spoke Active'
            : lang === 'bn'
            ? 'ট্যাপ করে দেখুন'
            : 'Tap to inspect'}
        </span>
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
          <filter id="dhaka-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#10b981" floodOpacity="0.8" />
          </filter>

          <linearGradient id="spokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
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

        {/* Hub-and-Spoke Logistics Supply Vectors */}
        <g id="spokes-layer" pointerEvents="none">
          {activeSpokes.map((district) => {
            const isSelected = selectedDistrict?.id === district.id;
            const startX = district.center.x;
            const startY = district.center.y;
            const endX = dhakaDistrict.center.x;
            const endY = dhakaDistrict.center.y;

            const midX = (startX + endX) / 2 + (startY - endY) * 0.15;
            const midY = (startY + endY) / 2 + (endX - startX) * 0.15;

            const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

            return (
              <g key={`spoke-${district.id}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isSelected ? '#047857' : '#10b981'}
                  strokeWidth={isSelected ? 3.5 : 2}
                  strokeOpacity={isSelected ? 0.9 : 0.6}
                  strokeDasharray={isSelected ? '6 4' : '4 6'}
                  className="animate-dash"
                />

                <circle r={isSelected ? 4.5 : 3} fill={isSelected ? '#047857' : '#059669'}>
                  <animateMotion
                    path={pathD}
                    dur={`${Math.max(2, district.supplyChain.transitHours * 0.5)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>

        {/* Central Hub Dhaka Beacon */}
        <g id="central-hub-dhaka" pointerEvents="none">
          <circle
            cx={dhakaDistrict.center.x}
            cy={dhakaDistrict.center.y}
            r="12"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            className="animate-pulse-ring"
          />
          <circle
            cx={dhakaDistrict.center.x}
            cy={dhakaDistrict.center.y}
            r="8"
            fill="#059669"
            filter="url(#dhaka-glow)"
          />
          <circle
            cx={dhakaDistrict.center.x}
            cy={dhakaDistrict.center.y}
            r="4"
            fill="#ffffff"
          />

          <g transform={`translate(${dhakaDistrict.center.x + 14}, ${dhakaDistrict.center.y - 12})`}>
            <rect
              x="-4"
              y="-12"
              width="142"
              height="24"
              rx="6"
              fill="#064e3b"
              fillOpacity="0.9"
            />
            <text
              x="6"
              y="4"
              fill="#ffffff"
              fontSize="10px"
              fontWeight="700"
              className="font-sans"
            >
              {lang === 'bn' ? 'ঢাকা মেগা হাব (কেন্দ্রীয়)' : 'Dhaka Central Hub'}
            </text>
          </g>
        </g>
      </svg>

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
