export type DivisionId =
  | 'Rangpur'
  | 'Rajshahi'
  | 'Mymensingh'
  | 'Sylhet'
  | 'Dhaka'
  | 'Barishal'
  | 'Chattogram'
  | 'Khulna';

export type CropCategory =
  | 'all'
  | 'fine_rice'
  | 'fruits'
  | 'vegetables_spices'
  | 'grains_pulses'
  | 'fisheries_livestock'
  | 'cash_crops';

export interface DistrictData {
  id: string;
  name: string;
  nameBn: string;
  division: DivisionId;
  divisionBn: string;
  center: { x: number; y: number };
  path: string; // SVG path d attribute
  cropsCategory: CropCategory[];
  agriculturalHighlights: {
    primaryCrops: string[];
    signatureProduce: string;
    signatureProduceBn: string;
    annualProduction: string;
    harvestSeason: string;
    surplusRatio: string;
  };
  economicSignificance: {
    farmerHouseholds: string;
    annualTurnover: string;
    majorHaats: string[];
    currentLossRate: string;
    keyBottlenecks: string[];
  };
  businessCase: {
    proposedMill: string;
    millTypeBn: string;
    capitalInvestment: string;
    wasteReduction: string;
    farmerMarginIncrease: string;
    paybackPeriod: string;
    processingCapacity: string;
    valueAddedProducts: string[];
  };
  supplyChain: {
    transitToDhakaKm: number;
    primaryCorridor: string;
    transitHours: number;
    transitToCtgKm?: number;
    transitToCtgHours?: number;
    coldChainRequired: boolean;
    spokeRole: string;
    weeklyDispatches: string;
    primaryGlobalHub?: 'dhaka_airport' | 'ctg_seaport' | 'dual';
  };
}

export type GlobalHubId = 'dhaka_airport' | 'ctg_seaport';

export interface GlobalHub {
  id: GlobalHubId;
  name: string;
  nameBn: string;
  type: 'air_cargo' | 'maritime_seaport';
  typeBn: string;
  subtitle: string;
  subtitleBn: string;
  location: string;
  locationBn: string;
  center: { x: number; y: number };
  dailyCapacity: string;
  primaryExportCommodities: string[];
  primaryExportCommoditiesBn: string[];
  destinations: string[];
  destinationsBn: string[];
  color: string;
  accentColor: string;
}

export interface DivisionMeta {
  id: DivisionId;
  nameBn: string;
  color: string;
  accentColor: string;
  bgLight: string;
  textColor: string;
  districtCount: number;
  regionalProcessingFocus: string;
  corridorName: string;
}

export interface PresentationSlide {
  id: number;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn?: string;
  districtFeatured?: string;
  content: {
    heading: string;
    headingBn?: string;
    points: { label: string; labelBn?: string; text: string; textBn?: string; stat?: string }[];
    highlightBox?: { title: string; titleBn?: string; desc: string; descBn?: string; metric?: string };
    districtFeatured?: string;
  };
}
