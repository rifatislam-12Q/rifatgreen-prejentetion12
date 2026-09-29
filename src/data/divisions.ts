import { DivisionId, DivisionMeta } from '../types';

export const DIVISIONS: Record<DivisionId, DivisionMeta> = {
  Rangpur: {
    id: 'Rangpur',
    nameBn: 'রংপুর',
    color: '#84cc16', // lime green
    accentColor: '#4d7c0f',
    bgLight: 'bg-lime-50',
    textColor: 'text-lime-800',
    districtCount: 8,
    regionalProcessingFocus: 'Aromatic Paddy Sorting, Starch Extraction & Cryo-Fruit Pulping',
    corridorName: 'North-Western Agrarian Highway (N5 via Jamuna)'
  },
  Rajshahi: {
    id: 'Rajshahi',
    nameBn: 'রাজশাহী',
    color: '#0d9488', // teal
    accentColor: '#115e59',
    bgLight: 'bg-teal-50',
    textColor: 'text-teal-800',
    districtCount: 8,
    regionalProcessingFocus: 'Mango Vapor Heat Treatment, Litchi Chilling & Mustard Oil Expellers',
    corridorName: 'Western Fruit & Grain Spine (N6 & N5)'
  },
  Mymensingh: {
    id: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    color: '#10b981', // emerald
    accentColor: '#047857',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    districtCount: 4,
    regionalProcessingFocus: 'Aquaculture IQF Quick Freezing & Fine Rice De-stoning',
    corridorName: 'North-Central Agri Corridor (N3)'
  },
  Sylhet: {
    id: 'Sylhet',
    nameBn: 'সিলেট',
    color: '#0284c7', // light ocean blue
    accentColor: '#0369a1',
    bgLight: 'bg-sky-50',
    textColor: 'text-sky-800',
    districtCount: 4,
    regionalProcessingFocus: 'Specialty CTC & Orthodox Tea Blending, Citrus & Haor Fish Dehydration',
    corridorName: 'North-Eastern Tea & Haor Highway (N2)'
  },
  Dhaka: {
    id: 'Dhaka',
    nameBn: 'ঢাকা',
    color: '#22c55e', // vivid green
    accentColor: '#15803d',
    bgLight: 'bg-green-50',
    textColor: 'text-green-800',
    districtCount: 13,
    regionalProcessingFocus: 'Central Mega Logistics, Cold Aggregation, Traceability & Urban Distribution',
    corridorName: 'Central Golden Confluence & National Terminal'
  },
  Barishal: {
    id: 'Barishal',
    nameBn: 'বরিশাল',
    color: '#06b6d4', // cyan
    accentColor: '#0e7490',
    bgLight: 'bg-cyan-50',
    textColor: 'text-cyan-800',
    districtCount: 6,
    regionalProcessingFocus: 'Floating Fruit Value Addition, Buffalo Dairy Curd & Coastal Marine Logistics',
    corridorName: 'Southern Riverine & Padma Express (N8)'
  },
  Chattogram: {
    id: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    color: '#f43f5e', // rose coral (as seen in user image!)
    accentColor: '#be123c',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-800',
    districtCount: 11,
    regionalProcessingFocus: 'Export-Grade Deep Sea Marine IQF, Spices & Hill Tracts Agro-Forestry',
    corridorName: 'South-Eastern Maritime & Export Spine (N1)'
  },
  Khulna: {
    id: 'Khulna',
    nameBn: 'খুলনা',
    color: '#65a30d', // warm moss green
    accentColor: '#3f6212',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-900',
    districtCount: 10,
    regionalProcessingFocus: 'Black Tiger Shrimp Cold Chain, Floriculture Packaging & Organic Sundarban Honey',
    corridorName: 'South-Western Padma Bridge Direct Radial (N7 & N8)'
  }
};
