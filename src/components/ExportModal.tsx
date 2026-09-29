import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, Code2, Globe, Terminal, Sparkles } from 'lucide-react';
import { ALL_DISTRICTS } from '../data/bangladeshDistricts';

interface ExportModalProps {
  onClose: () => void;
  lang: 'en' | 'bn';
}

export const ExportModal: React.FC<ExportModalProps> = ({ onClose, lang }) => {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);

  const gitCommands = `git init
git add .
git commit -m "First commit - GreenShop Bangladesh 2029"
git branch -M main
git remote add origin https://github.com/rifatislam-12Q/rifatgreen-prejentetion12.git
git push -u origin main`;

  // Generate self-contained standalone HTML bundle in Bengali with full mobile responsive touch support
  const generateStandaloneHtml = () => {
    const districtsJson = JSON.stringify(
      ALL_DISTRICTS.map((d) => ({
        id: d.id,
        name: d.name,
        nameBn: d.nameBn,
        division: d.division,
        divisionBn: d.divisionBn,
        center: d.center,
        path: d.path,
        signature: d.agriculturalHighlights.signatureProduce,
        signatureBn: d.agriculturalHighlights.signatureProduceBn,
        crops: d.agriculturalHighlights.primaryCrops,
        lossRate: d.economicSignificance.currentLossRate,
        turnover: d.economicSignificance.annualTurnover,
        mill: d.businessCase.proposedMill,
        millBn: d.businessCase.millTypeBn,
        wasteCut: d.businessCase.wasteReduction,
        farmerUplift: d.businessCase.farmerMarginIncrease,
        payback: d.businessCase.paybackPeriod,
        transitKm: d.supplyChain.transitToDhakaKm,
        transitHours: d.supplyChain.transitHours,
        spokeRole: d.supplyChain.spokeRole,
      }))
    );

    return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>গ্রিনশপ - আমাদের ২০২৯ সালের বাংলাদেশ (কৃষি ও সরবরাহ শৃঙ্খল)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
    @keyframes pulseRing {
      0% { r: 8px; opacity: 0.9; }
      50% { r: 24px; opacity: 0.3; }
      100% { r: 36px; opacity: 0; }
    }
    @keyframes dashFlow {
      to { stroke-dashoffset: -40; }
    }
    .animate-dash { animation: dashFlow 1.8s linear infinite; }
    .pulse-hub { animation: pulseRing 2.2s infinite; }
    .district-poly:hover { fill-opacity: 0.95; stroke: #1c1917; stroke-width: 2.5px; }
  </style>
</head>
<body class="bg-stone-50 text-stone-900 min-h-screen">
  <!-- Top Navigation Bar -->
  <header class="bg-white border-b border-stone-200 sticky top-0 z-40 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">G</div>
      <div>
        <h1 class="text-base sm:text-lg font-bold text-stone-900 leading-tight">গ্রিনশপ (GreenShop)</h1>
        <p class="text-[10px] sm:text-xs text-stone-500">আমাদের ২০২৯ সালের বাংলাদেশ · কৃষি ও সরবরাহ শৃঙ্খল</p>
      </div>
    </div>
    <div class="text-[11px] sm:text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
      ৬৪ জেলা ও ঢাকা হাব
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-7xl mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
    <!-- Map Section -->
    <div class="lg:col-span-8 bg-stone-100/70 border border-stone-200 rounded-2xl p-2 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[460px] sm:min-h-[580px] lg:min-h-[660px]">
      <div id="map-container" class="w-full h-full flex items-center justify-center">
        <!-- SVG will be injected here -->
      </div>
    </div>

    <!-- Inspector Details Drawer -->
    <div class="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between" id="inspector-panel">
      <div id="inspector-content">
        <div class="text-center py-12 text-stone-400">
          <p class="text-xs sm:text-sm">ম্যাপে যেকোনো জেলার ওপর ক্লিক বা ট্যাপ করুন (যেমন: <b>দিনাজপুর</b>, <b>পাবনা</b>, বা <b>পঞ্চগড়</b>)।</p>
        </div>
      </div>
    </div>
  </main>

  <script>
    const DISTRICTS = ${districtsJson};
    const DHAKA = DISTRICTS.find(d => d.id === 'dhaka') || DISTRICTS[0];
    const DIVISION_COLORS = {
      Rangpur: '#84cc16', Rajshahi: '#0d9488', Mymensingh: '#10b981',
      Sylhet: '#0284c7', Dhaka: '#22c55e', Barishal: '#06b6d4',
      Chattogram: '#f43f5e', Khulna: '#65a30d'
    };

    let selectedDistrict = DISTRICTS.find(d => d.id === 'dinajpur') || DISTRICTS[0];

    function renderMap() {
      const container = document.getElementById('map-container');
      let svgHtml = \`
        <svg viewBox="0 0 900 1050" class="w-full h-full max-h-[750px] select-none">
          <!-- Spokes -->
          <g id="spokes">
            \${DISTRICTS.filter(d => d.id !== 'dhaka').map(d => {
              const isSelected = selectedDistrict && selectedDistrict.id === d.id;
              const startX = d.center.x, startY = d.center.y;
              const endX = DHAKA.center.x, endY = DHAKA.center.y;
              const midX = (startX + endX)/2 + (startY - endY)*0.15;
              const midY = (startY + endY)/2 + (endX - startX)*0.15;
              const pathD = \`M \${startX} \${startY} Q \${midX} \${midY} \${endX} \${endY}\`;
              return \`
                <path d="\${pathD}" fill="none" stroke="\${isSelected ? '#047857' : '#10b981'}" 
                      stroke-width="\${isSelected ? '3.5' : '1.5'}" stroke-opacity="\${isSelected ? '0.9' : '0.4'}" 
                      stroke-dasharray="\${isSelected ? '6 4' : '4 6'}" class="animate-dash" />
              \`;
            }).join('')}
          </g>
          <!-- Districts -->
          <g id="districts">
            \${DISTRICTS.map(d => {
              const isSelected = selectedDistrict && selectedDistrict.id === d.id;
              const color = DIVISION_COLORS[d.division] || '#84cc16';
              return \`
                <path d="\${d.path}" fill="\${color}" fill-opacity="\${isSelected ? '0.95' : '0.7'}" 
                      stroke="\${isSelected ? '#064e3b' : '#ffffff'}" stroke-width="\${isSelected ? '3.5' : '1.2'}" 
                      class="district-poly cursor-pointer transition-all" onclick="selectDistrict('\${d.id}')" />
                <circle cx="\${d.center.x}" cy="\${d.center.y}" r="\${isSelected ? '5' : '3'}" fill="#ffffff" stroke="#064e3b" stroke-width="1.5" pointer-events="none" />
                \${isSelected || ['dhaka', 'dinajpur', 'pabna', 'panchagarh', 'bogra', 'rajshahi', 'sylhet', 'barishal', 'chattogram', 'khulna'].includes(d.id) ? 
                  \`<text x="\${d.center.x}" y="\${d.center.y + 14}" text-anchor="middle" font-size="11px" font-weight="700" fill="#1c1917">\${d.nameBn}</text>\` : ''}
              \`;
            }).join('')}
          </g>
          <!-- Dhaka Beacon -->
          <circle cx="\${DHAKA.center.x}" cy="\${DHAKA.center.y}" r="12" fill="none" stroke="#10b981" stroke-width="2" class="pulse-hub" />
          <circle cx="\${DHAKA.center.x}" cy="\${DHAKA.center.y}" r="8" fill="#059669" />
          <circle cx="\${DHAKA.center.x}" cy="\${DHAKA.center.y}" r="3" fill="#ffffff" />
          <text x="\${DHAKA.center.x + 14}" y="\${DHAKA.center.y + 4}" font-size="11px" font-weight="700" fill="#064e3b">ঢাকা মেগা হাব</text>
        </svg>
      \`;
      container.innerHTML = svgHtml;
      renderInspector();
    }

    function selectDistrict(id) {
      selectedDistrict = DISTRICTS.find(d => d.id === id);
      renderMap();
    }

    function renderInspector() {
      const panel = document.getElementById('inspector-content');
      if (!selectedDistrict) return;
      const d = selectedDistrict;
      panel.innerHTML = \`
        <div class="space-y-3.5">
          <div class="border-b border-stone-200 pb-2.5">
            <span class="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">\${d.divisionBn} বিভাগ</span>
            <h2 class="text-xl sm:text-2xl font-bold text-stone-900 mt-1">\${d.nameBn} <span class="text-stone-400 font-normal">(\${d.name})</span></h2>
            <p class="text-xs font-semibold text-emerald-800 mt-0.5">\${d.signatureBn}</p>
          </div>

          <div class="space-y-1.5">
            <h4 class="text-[10px] font-bold uppercase text-stone-500">প্রধান কৃষিজ ফসল</h4>
            <div class="flex flex-wrap gap-1">
              \${d.crops.map(c => \`<span class="px-2 py-0.5 bg-stone-100 text-stone-800 rounded text-xs font-medium border border-stone-200">\${c}</span>\`).join('')}
            </div>
            <p class="text-xs text-stone-600 mt-1">বার্ষিক লেনদেন: <b>\${d.turnover}</b> | বর্তমান অপচয়: <b class="text-rose-600">\${d.lossRate}</b></p>
          </div>

          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
            <span class="text-[10px] font-bold uppercase text-amber-800">প্রস্তাবিত গ্রিনশপ প্রক্রিয়াকরণ মিল</span>
            <h4 class="text-xs sm:text-sm font-bold text-amber-950">\${d.millBn || d.mill}</h4>
            <div class="grid grid-cols-3 gap-1.5 pt-1.5 text-center text-xs">
              <div class="bg-white p-1.5 rounded border border-amber-200"><span class="block text-[9px] text-stone-500">অপচয় হ্রাস</span><b>\${d.wasteCut.split(' ')[0]}</b></div>
              <div class="bg-white p-1.5 rounded border border-amber-200"><span class="block text-[9px] text-stone-500">কৃষক লাভ</span><b class="text-emerald-700">\${d.farmerUplift}</b></div>
              <div class="bg-white p-1.5 rounded border border-amber-200"><span class="block text-[9px] text-stone-500">বিনিয়োগ ফেরত</span><b>\${d.payback.split(' ')[0]} বছর</b></div>
            </div>
          </div>

          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase text-emerald-900 flex items-center gap-1">📸 ছবি ও তথ্য আপলোড / নোটস</span>
              <span id="note-count-badge" class="px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-950 font-bold text-[10px]"></span>
            </div>
            <input type="file" id="standalone-photo-input" accept="image/*" class="w-full text-xs text-stone-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-700 file:text-white hover:file:bg-emerald-800" />
            <input type="text" id="standalone-title-input" placeholder="শিরোনাম বা বিষয়..." class="w-full px-2 py-1 text-xs rounded border border-emerald-300 bg-white" />
            <textarea id="standalone-note-input" rows="2" placeholder="মাঠপর্যায়ের তথ্য বা বিবরণ লিখুন..." class="w-full px-2 py-1 text-xs rounded border border-emerald-300 bg-white"></textarea>
            <button onclick="saveDistrictData('\${d.id}')" class="w-full py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer">সংরক্ষণ করুন (Save Note & Photo)</button>
            <div id="standalone-saved-notes" class="space-y-1.5 pt-1"></div>
          </div>

          <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <span class="text-[10px] font-bold uppercase text-stone-500">হাব-অ্যান্ড-স্পোক সরবরাহ রুট</span>
            <p class="font-medium text-stone-800 text-[11px] sm:text-xs">\${d.spokeRole}</p>
            <p class="text-stone-500">ট্রানজিট দূরত্ব: <b>\${d.transitKm} কি.মি.</b> (~<b>\${d.transitHours} ঘণ্টা</b> এক্সপ্রেস ট্রানজিট)</p>
          </div>
        </div>
      \`;
      renderStandaloneNotes(d.id);
    }

    function renderStandaloneNotes(districtId) {
      const container = document.getElementById('standalone-saved-notes');
      const badge = document.getElementById('note-count-badge');
      if (!container) return;
      const notes = JSON.parse(localStorage.getItem('greenshop_district_media_' + districtId) || '[]');
      if (badge) badge.innerText = notes.length > 0 ? notes.length + 'টি সংরক্ষিত' : '০টি';
      if (notes.length === 0) {
        container.innerHTML = '<p class="text-[11px] text-stone-500 italic">এখনো কোনো ছবি বা তথ্য যুক্ত করা হয়নি।</p>';
        return;
      }
      container.innerHTML = notes.map((n, idx) => \`
        <div class="p-2 rounded bg-white border border-emerald-100 text-xs space-y-1">
          \${n.imageUrl ? \`<img src="\${n.imageUrl}" class="w-full h-28 object-cover rounded mb-1" />\` : ''}
          <div class="flex justify-between items-start">
            <b class="text-emerald-950 font-bold">\${n.title || 'নোট'}</b>
            <button onclick="deleteStandaloneNote('\${districtId}', '\${n.id}')" class="text-rose-600 text-[10px] hover:underline">মুছুন</button>
          </div>
          \${n.content ? \`<p class="text-stone-700 text-[11px]">\${n.content}</p>\` : ''}
          <span class="text-[9px] text-stone-400 block">\${n.formattedDateBn || ''}</span>
        </div>
      \`).join('');
    }

    function saveDistrictData(districtId) {
      const fileInput = document.getElementById('standalone-photo-input');
      const titleInput = document.getElementById('standalone-title-input');
      const noteInput = document.getElementById('standalone-note-input');
      const file = fileInput ? fileInput.files[0] : null;
      const title = titleInput ? titleInput.value.trim() : '';
      const content = noteInput ? noteInput.value.trim() : '';

      if (!file && !title && !content) {
        alert('অনুগ্রহ করে ছবি অথবা কোনো তথ্য প্রদান করুন!');
        return;
      }

      function doSave(imgData) {
        const key = 'greenshop_district_media_' + districtId;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        const newNote = {
          id: 'note_' + Date.now(),
          title: title || 'ফিল্ড নোট',
          content: content,
          imageUrl: imgData || null,
          category: 'general',
          formattedDateBn: new Date().toLocaleDateString('bn-BD')
        };
        existing.unshift(newNote);
        localStorage.setItem(key, JSON.stringify(existing));
        if (titleInput) titleInput.value = '';
        if (noteInput) noteInput.value = '';
        if (fileInput) fileInput.value = '';
        renderStandaloneNotes(districtId);
        alert('✓ সফলভাবে সংরক্ষিত হয়েছে!');
      }

      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            const canvas = document.createElement('canvas');
            const max = 600;
            let w = img.width, h = img.height;
            if (w > h) { if (w > max) { h = Math.round((h * max) / w); w = max; } }
            else { if (h > max) { w = Math.round((w * max) / h); h = max; } }
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            doSave(canvas.toDataURL('image/jpeg', 0.7));
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        doSave(null);
      }
    }

    function deleteStandaloneNote(districtId, noteId) {
      if (confirm('আপনি কি এই তথ্যটি মুছে ফেলতে চান?')) {
        const key = 'greenshop_district_media_' + districtId;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        const filtered = existing.filter(n => n.id !== noteId);
        localStorage.setItem(key, JSON.stringify(filtered));
        renderStandaloneNotes(districtId);
      }
    }

    renderMap();
  </script>
</body>
</html>`;
  };

  const handleCopyCode = () => {
    const code = generateStandaloneHtml();
    navigator.clipboard.writeText(code);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyGitCommands = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedGit(true);
    setTimeout(() => setCopiedGit(false), 2000);
  };

  const handleDownload = () => {
    const code = generateStandaloneHtml();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {lang === 'bn' ? 'গিটহাব পেজেস ও কোড এক্সপোর্ট' : 'GitHub Pages & Standalone Code Export'}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-1">
                {lang === 'bn'
                  ? 'আপনার রিপোজিটরি: rifatislam-12Q/rifatgreen-prejentetion12'
                  : 'Repository: rifatislam-12Q/rifatgreen-prejentetion12'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 text-sm text-stone-700">
          {/* GitHub Repository Quick Push Box */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-900 text-stone-100 space-y-2.5 shadow-sm border border-stone-800">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  {lang === 'bn' ? 'গিটহাব পুশ কমান্ড (Ready to Run)' : 'Git Push Commands'}
                </span>
              </div>
              <button
                onClick={handleCopyGitCommands}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
              >
                {copiedGit ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'কমান্ড কপি' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3 bg-stone-950 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto select-all leading-relaxed no-scrollbar">
              {gitCommands}
            </pre>

            <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                {lang === 'bn' ? 'টার্গেট রিপোজিটরি:' : 'Target URL:'}{' '}
                <a
                  href="https://github.com/rifatislam-12Q/rifatgreenpr1"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-emerald-400 hover:text-emerald-300"
                >
                  github.com/rifatislam-12Q/rifatgreenpr1
                </a>
              </span>
            </div>
          </div>

          {/* Quick Actions: Download single index.html */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <button
              onClick={handleDownload}
              className="p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95 text-xs sm:text-sm"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'bn' ? 'index.html ডাউনলোড করুন' : 'Download index.html'}</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="p-3.5 rounded-xl border border-stone-300 hover:bg-stone-50 font-semibold text-stone-800 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 text-xs sm:text-sm"
            >
              {copiedHtml ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">
                    {lang === 'bn' ? 'HTML কপি হয়েছে!' : 'HTML Copied!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-600" />
                  <span>{lang === 'bn' ? 'সম্পূর্ণ HTML কপি করুন' : 'Copy Standalone HTML'}</span>
                </>
              )}
            </button>
          </div>

          {/* Step-by-Step GitHub Pages Deployment Guide */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>
                {lang === 'bn'
                  ? 'গিটহাব পেজেসে লাইভ করার সহজ ধাপসমূহ'
                  : 'How to Deploy to GitHub Pages (2 Minutes)'}
              </span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-600">
              <li>
                {lang === 'bn'
                  ? 'উপরে দেওয়া '
                  : 'Run the '}
                <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-900 font-mono text-[11px]">git push</code>{' '}
                {lang === 'bn'
                  ? 'কমান্ডগুলো আপনার প্রজেক্ট ফোল্ডারে টার্মিনাল বা VS Code-এ রান করুন।'
                  : 'commands in your project directory.'}
              </li>
              <li>
                {lang === 'bn'
                  ? 'অথবা সরাসরি '
                  : 'Or download '}
                <b className="font-mono text-stone-800">index.html</b>{' '}
                {lang === 'bn'
                  ? 'ডাউনলোড করে রিপোজিটরিতে আপলোড করুন।'
                  : 'and upload to GitHub.'}
              </li>
              <li>
                {lang === 'bn'
                  ? 'গিটহাবে গিয়ে '
                  : 'Go to '}
                <b>Settings &rarr; Pages</b>-এ যান।
              </li>
              <li>
                {lang === 'bn'
                  ? 'সর্বোত্তম পদ্ধতির জন্য Source ড্রপডাউনে '
                  : 'For best results, in the Source dropdown select '}
                <b className="text-emerald-800 font-bold">GitHub Actions</b>{' '}
                {lang === 'bn'
                  ? 'নির্বাচন করুন (আমাদের রিপোজিটরিতে থাকা .github/workflows/deploy.yml স্বয়ংক্রিয়ভাবে বিল্ড করে লাইভ করে দেবে)। অথবা '
                  : '(automatic build). Or for standalone HTML select '}
                <b>Deploy from a branch &rarr; main / (root)</b>।
              </li>
              <li>
                {lang === 'bn'
                  ? 'আপনার ওয়েবসাইট কোনো ব্ল্যাঙ্ক পেজ বা লিংক সমস্যা ছাড়াই লাইভ হবে:'
                  : 'Your website will be live without errors at:'}{' '}
                <a
                  href="https://rifatislam-12Q.github.io/rifatgreen-prejentetion12/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-700 underline block mt-0.5"
                >
                  https://rifatislam-12Q.github.io/rifatgreen-prejentetion12/
                </a>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
