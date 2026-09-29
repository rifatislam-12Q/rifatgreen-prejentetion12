import { CropCategory, DistrictData } from '../../types';
import { DISTRICTS_GEOM } from './districtsGeom';

type DistrictDetail = Omit<DistrictData, 'center' | 'path' | 'name' | 'nameBn' | 'division' | 'divisionBn'>;

const DISTRICT_DETAILS: Record<string, DistrictDetail> = {
  dinajpur: {
    id: 'dinajpur',
    cropsCategory: ['fine_rice', 'fruits', 'grains_pulses'],
    agriculturalHighlights: {
      primaryCrops: ['Katarirogh Rice', 'Chinigura Aromatic Rice', 'Bedana Litchi', 'Yellow Maize', 'Potatoes'],
      signatureProduce: 'GI-certified Dinajpur Katarirogh & Chinigura Fine Aromatic Rice',
      signatureProduceBn: 'জিআই সনদপ্রাপ্ত সুগন্ধি কাটারিভোগ ও চিনিগুঁড়া চাল এবং বেদানা লিচু',
      annualProduction: '1,840,000 MT paddy / 42,000 MT premium litchi',
      harvestSeason: 'Aman: Nov-Dec · Boro: Apr-May · Litchi: May-Jun',
      surplusRatio: '74% commercial export surplus'
    },
    economicSignificance: {
      farmerHouseholds: '475,000 agrarian households',
      annualTurnover: '৳3,680 Crore ($335M USD)',
      majorHaats: ['Ranirbandar Aromatic Rice Haat', 'Railbazar Dinajpur', 'Gopalganj Corn Yard'],
      currentLossRate: '21.8% post-harvest spoilage & kernel fracturing',
      keyBottlenecks: [
        'Open-air yard drying subject to unseasonal monsoon showers',
        'Outdated single-pass hullers causing 18% broken rice rate',
        'Brokers (Farias) capturing 34% of retail margin'
      ]
    },
    businessCase: {
      proposedMill: 'Micro-Parboiling, Optical Color Sorting & Cryo-Pulping Facility',
      millTypeBn: 'আধুনিক অপটিক্যাল চাল সর্টিং মিল ও লিচু পাল্প প্রসেসিং ইউনিট',
      capitalInvestment: '৳5.4 Crore ($490,000)',
      wasteReduction: 'Reduces post-harvest loss from 21.8% to 3.2% (-85% reduction)',
      farmerMarginIncrease: '+32% direct farm-gate income uplift',
      paybackPeriod: '2.5 Years (IRR 38.4%)',
      processingCapacity: '50 MT paddy/day + 12 MT seasonal litchi chilling',
      valueAddedProducts: [
        'GreenShop 1kg/5kg Nitrogen-Flushed Katarirogh Packets',
        'Stabilized Cold-Pressed Rice Bran Oil (Gamma Oryzanol rich)',
        'Cryo-Pulp Pure Litchi Concentrate for premium beverage brands'
      ]
    },
    supplyChain: {
      transitToDhakaKm: 335,
      primaryCorridor: 'N5 Highway via Bangabandhu Jamuna Bridge & Chandra Hub',
      transitHours: 6.8,
      coldChainRequired: true,
      spokeRole: 'Northern Granary Fine Grain & Stone Fruit Primary Spoke',
      weeklyDispatches: '18 refrigerated & dry freight containers/week'
    }
  },

  pabna: {
    id: 'pabna',
    cropsCategory: ['fruits', 'fisheries_livestock', 'vegetables_spices', 'grains_pulses'],
    agriculturalHighlights: {
      primaryCrops: ['Ishwardi Bombai Litchi', 'Fresh Dairy Milk', 'Onions (Taherpuri)', 'Mustard Seed', 'Lentils'],
      signatureProduce: 'Ishwardi Giant Litchi & Dairy Bathan Pure Cow Milk',
      signatureProduceBn: 'ঈশ্বরদীর সুমিষ্ট বোম্বাই লিচু ও বাথানের খাঁটি তরল দুধ',
      annualProduction: '38,500 MT litchi / 320 Million Litres milk / 410,000 MT onion',
      harvestSeason: 'Litchi: May-Jun · Milk: Year-round · Onion: Jan-Mar',
      surplusRatio: '82% surplus distributed nationally'
    },
    economicSignificance: {
      farmerHouseholds: '390,000 farmers and livestock herders',
      annualTurnover: '৳2,940 Crore ($268M USD)',
      majorHaats: ['Ishwardi Fruit Market', 'Sujanagar Onion Haat', 'Chatmohar Dairy Cooperative'],
      currentLossRate: '28.5% litchi rot during peak 20-day harvest window',
      keyBottlenecks: [
        'Severe price collapse within 72 hours of peak litchi drop',
        'Lack of farm-gate milk chilling causing souring in summer heat',
        'High onion rotting during traditional bamboo loft storage'
      ]
    },
    businessCase: {
      proposedMill: 'Rapid Hydro-Cooling, Modified Atmosphere Fruit Hub & Dairy Chilling Depot',
      millTypeBn: 'হাইড্রো-কুলিং লিচু সংরক্ষণ ও বিকেন্দ্রীকৃত দুগ্ধ চিলিং হাব',
      capitalInvestment: '৳4.8 Crore ($435,000)',
      wasteReduction: 'Reduces peak fruit spoilage from 28.5% down to 4.1%',
      farmerMarginIncrease: '+36% higher price realization at peak harvest',
      paybackPeriod: '2.2 Years (IRR 41.2%)',
      processingCapacity: '25 MT hydro-cooled litchi/day + 15,000L milk chilling/day',
      valueAddedProducts: [
        'GreenShop Wax-dipped Fresh Litchis with 21-day shelf life',
        'Aseptic UHT Bottled Whole Milk and Ghee',
        'Dehydrated Crispy Onion Flakes and Onion Powder'
      ]
    },
    supplyChain: {
      transitToDhakaKm: 215,
      primaryCorridor: 'N6 & N5 via Jamuna Bridge / Padma Bridge Radial Route',
      transitHours: 4.5,
      coldChainRequired: true,
      spokeRole: 'Western Dairy & Perishable Horticulture Consolidation Spoke',
      weeklyDispatches: '22 cold-chain trucks/week'
    }
  },

  panchagarh: {
    id: 'panchagarh',
    cropsCategory: ['cash_crops', 'grains_pulses', 'vegetables_spices'],
    agriculturalHighlights: {
      primaryCrops: ['Organic Lowland Tea', 'High-Protein Hard Wheat', 'Hybrid Yellow Maize', 'Seed Potatoes'],
      signatureProduce: 'Panchagarh Himalayan Foothill Organic CTC Tea & Premium Yellow Maize',
      signatureProduceBn: 'হিমালয়ের পাদদেশের অর্গানিক চা, গম এবং উচ্চফলনশীল ভুট্টা',
      annualProduction: '21 Million kg processed tea / 520,000 MT maize / 110,000 MT wheat',
      harvestSeason: 'Tea: Mar-Nov · Maize: Apr-May · Wheat: Mar-Apr',
      surplusRatio: '88% industrial surplus'
    },
    economicSignificance: {
      farmerHouseholds: '260,000 smallholder growers & tea small-farmers',
      annualTurnover: '৳2,150 Crore ($195M USD)',
      majorHaats: ['Tetulia Green Leaf Collection Haat', 'Boda Maize Haat', 'Mirgarh Grain Market'],
      currentLossRate: '19.2% moisture-induced fungal spoilage in maize',
      keyBottlenecks: [
        'Tea green leaf rejection by corporate bought-leaf factories',
        'Lack of continuous column grain dryers for wet season corn',
        'Long transit distance to Dhaka causing high logistics drag'
      ]
    },
    businessCase: {
      proposedMill: 'Continuous Solar-Biomass Hybrid Grain Drying, Milling & Smallholder Tea Processing',
      millTypeBn: 'সোলার-বায়োমাস ভুট্টা ড্রায়ার ও ক্ষুদ্র চা চাষী প্রসেসিং প্ল্যান্ট',
      capitalInvestment: '৳5.9 Crore ($535,000)',
      wasteReduction: 'Reduces grain moisture loss & aflatoxin contamination by 92%',
      farmerMarginIncrease: '+29% increase in farm-gate grain price',
      paybackPeriod: '2.8 Years (IRR 33.5%)',
      processingCapacity: '60 MT grain drying/day + 8 MT orthodox tea grading/day',
      valueAddedProducts: [
        'GreenShop Pure Single-Estate Himalayan CTC & Green Tea',
        'De-germed High-Fiber Maize Grits & Poultry Feed Pre-mix',
        'Stone-ground Whole Wheat Atta with full germ retention'
      ]
    },
    supplyChain: {
      transitToDhakaKm: 445,
      primaryCorridor: 'N5 Northern Trunk Corridor via Bogura & Bangabandhu Bridge',
      transitHours: 8.5,
      coldChainRequired: false,
      spokeRole: 'Far-North Grain Drying, Seed Security & Organic Tea Spoke',
      weeklyDispatches: '14 multi-axle freight carriers/week'
    }
  },

  rajshahi: {
    id: 'rajshahi',
    cropsCategory: ['fruits', 'vegetables_spices'],
    agriculturalHighlights: {
      primaryCrops: ['Khirsapat (Himsagar) Mango', 'Fazli Mango', 'Silk Cocoon', 'Winter Tomato', 'Guava'],
      signatureProduce: 'GI-certified Khirsapat Mango & Pure Mulberry Raw Silk',
      signatureProduceBn: 'জিআই সার্টিফাইড খিরসাপাত (হিমসাগর) আম ও রাজশাহী সিল্ক',
      annualProduction: '230,000 MT export-grade mangoes / 380,000 MT vegetables',
      harvestSeason: 'Mango: May-Jul · Tomato: Dec-Feb',
      surplusRatio: '78% export & inter-district surplus'
    },
    economicSignificance: {
      farmerHouseholds: '360,000 orchardists and farmers',
      annualTurnover: '৳3,100 Crore ($280M USD)',
      majorHaats: ['Baneswar Mango Haat (Largest in South Asia)', 'Shaheb Bazar'],
      currentLossRate: '26% bruising and fruit-fly quarantine rejections',
      keyBottlenecks: [
        'Fruit-fly infestation blocking direct European and Middle-Eastern exports',
        'Severe price crash during 15-day peak June harvest glut'
      ]
    },
    businessCase: {
      proposedMill: 'Vapor Heat Treatment (VHT), Optical Grading & Dehydrated Mango Leather Plant',
      millTypeBn: 'ভেপার হিট ট্রিটমেন্ট (VHT) ও আম প্রসেসিং প্ল্যান্ট',
      capitalInvestment: '৳6.5 Crore ($590,000)',
      wasteReduction: 'Reduces export quarantine rejections from 30% to 0.4%',
      farmerMarginIncrease: '+42% premium on export-certified lots',
      paybackPeriod: '2.3 Years (IRR 43%)',
      processingCapacity: '30 MT VHT mangoes/day + 5 MT dried mango slices/day',
      valueAddedProducts: [
        'GreenShop Export-Pack GI Khirsapat & Langra',
        'Sugar-free Freeze-Dried Mango Crisps',
        'Aseptic Mango Puree for institutional confectionery'
      ]
    },
    supplyChain: {
      transitToDhakaKm: 250,
      primaryCorridor: 'N6 Rajshahi-Natore-Sirajganj Express to N5',
      transitHours: 5.2,
      coldChainRequired: true,
      spokeRole: 'Western Premium Fruit & Export Phytosanitary Hub',
      weeklyDispatches: '20 refrigerated reefers/week'
    }
  },

  bogra: {
    id: 'bogra',
    cropsCategory: ['vegetables_spices', 'fisheries_livestock', 'grains_pulses'],
    agriculturalHighlights: {
      primaryCrops: ['Red Chili (Morich)', 'Bogura Curd (Doi)', 'Hybrid Vegetable Seeds', 'Potatoes', 'Cabbage'],
      signatureProduce: 'GI Bogura Sweetened Curd & High-Pungency Dry Red Chili',
      signatureProduceBn: 'জিআই স্বীকৃতিপ্রাপ্ত ঐতিহ্যবাহী বগুড়ার দই ও ঝাল শুকনো মরিচ',
      annualProduction: '32,000 MT dry chili / 480,000 MT potatoes / 25M earthen curd pots',
      harvestSeason: 'Chili: Jan-Mar · Potato: Jan-Mar · Curd: Year-round',
      surplusRatio: '85% surplus distributed across Bangladesh'
    },
    economicSignificance: {
      farmerHouseholds: '410,000 agrarian households',
      annualTurnover: '৳3,800 Crore ($345M USD)',
      majorHaats: ['Mahasthangarh Agri Haat', 'Chandanbaisha Riverine Char Haat'],
      currentLossRate: '17.8% aflatoxin mold during traditional riverbank drying',
      keyBottlenecks: ['Char chili exposed to river sand and rain molds', 'Traditional cold stores charging exorbitant rents for potatoes']
    },
    businessCase: {
      proposedMill: 'Controlled Dehumidified Chili Flaking, Spice Grinding & Controlled Atmosphere Storage',
      millTypeBn: 'মরিচ ও মসলা প্রসেসিং, গ্রাইন্ডিং ও কোল্ড স্টোরেজ হাব',
      capitalInvestment: '৳5.2 Crore ($470,000)',
      wasteReduction: 'Eliminates mold loss from 17.8% to under 1.5%',
      farmerMarginIncrease: '+30% farmer profit boost',
      paybackPeriod: '2.4 Years (IRR 39%)',
      processingCapacity: '20 MT dried spices/day + 2,000 MT CA potato storage',
      valueAddedProducts: ['GreenShop Cryo-Ground Aflatoxin-Zero Pure Chili Flakes', 'Sealed GI Bogura Mishti Doi', 'Frozen French Fry Potato Batons']
    },
    supplyChain: {
      transitToDhakaKm: 195,
      primaryCorridor: 'N5 Highway directly via Bangabandhu Jamuna Bridge',
      transitHours: 4.2,
      coldChainRequired: true,
      spokeRole: 'Northern Central Seed, Spice & Agro-Machinery Transit Anchor',
      weeklyDispatches: '25 freight units/week'
    }
  },

  satkhira: {
    id: 'satkhira',
    cropsCategory: ['fisheries_livestock', 'fruits', 'cash_crops'],
    agriculturalHighlights: {
      primaryCrops: ['Black Tiger Shrimp (Bagda)', 'Sundarbans Natural Honey', 'Govindobhog Mango', 'Crabs'],
      signatureProduce: 'Saline-zone Black Tiger Shrimp & Sundarban Wild Khalsi Honey',
      signatureProduceBn: 'সুন্দরবনের প্রাকৃতিক মধু ও গলদা-বাগদা চিংড়ি',
      annualProduction: '28,000 MT tiger shrimp & crabs / 950 MT mangrove honey',
      harvestSeason: 'Shrimp: Apr-Nov · Honey: Apr-May · Mango: May-Jun',
      surplusRatio: '92% high-value commercial export'
    },
    economicSignificance: {
      farmerHouseholds: '310,000 coastal aquaculture farmers & mouals',
      annualTurnover: '৳3,400 Crore ($310M USD)',
      majorHaats: ['Parulia Shrimp Depot', 'Kaliganj Honey Haat'],
      currentLossRate: '24% mortality and post-harvest melanosis black-spotting',
      keyBottlenecks: ['Chemical adulteration (jelly injection by rogue middlemen)', 'Lack of solar brine-freezers at remote gher ponds']
    },
    businessCase: {
      proposedMill: 'IQF (Individually Quick Frozen) Nitrogen Shrimp Line & Honey Moisture Evaporator',
      millTypeBn: 'আধুনিক আইকিউএফ চিংড়ি হিমায়িত প্ল্যান্ট ও খাঁটি মধু প্রক্রিয়াকরণ',
      capitalInvestment: '৳6.8 Crore ($615,000)',
      wasteReduction: 'Reduces melanosis spoilage by 88% with zero chemical residue',
      farmerMarginIncrease: '+45% premium on blockchain-traceable shrimp',
      paybackPeriod: '2.1 Years (IRR 46%)',
      processingCapacity: '15 MT IQF shrimp/day + 3 MT raw honey filtration/day',
      valueAddedProducts: ['GreenShop Peeled & Deveined IQF Bagda Prawns', 'Sundarban Raw Certified Wild Forest Honey', 'Soft-shell Frozen Crab Portions']
    },
    supplyChain: {
      transitToDhakaKm: 275,
      primaryCorridor: 'N7 & Padma Bridge South-Western Express Corridor',
      transitHours: 5.0,
      coldChainRequired: true,
      spokeRole: 'Coastal Saline Premium Blue-Economy & Mangrove Products Spoke',
      weeklyDispatches: '16 cryogenic reefers/week'
    }
  },

  sylhet: {
    id: 'sylhet',
    cropsCategory: ['cash_crops', 'fruits', 'fisheries_livestock'],
    agriculturalHighlights: {
      primaryCrops: ['Orthodox Specialty Tea', 'Shatkora Citrus Fruit', 'Agarwood Oil', 'Haor Indigenous Fish'],
      signatureProduce: 'Surma Valley Single-Origin Green Tea & Aromatic Shatkora',
      signatureProduceBn: 'সুরমা উপত্যকার সিঙ্গেল-অরিজিন চা ও সাতকড়া',
      annualProduction: '18 Million kg high-grade tea / 14,000 MT Shatkora fruit',
      harvestSeason: 'Tea: Mar-Nov · Shatkora: Sep-Dec · Haor Fish: Oct-Jan',
      surplusRatio: '84% commercial distribution'
    },
    economicSignificance: {
      farmerHouseholds: '280,000 tea plantation workers and citrus farmers',
      annualTurnover: '৳2,450 Crore ($220M USD)',
      majorHaats: ['Sreemangal Tea Auction Yard', 'Jaintiapur Citrus Bazaar'],
      currentLossRate: '18% spoilage during traditional open transit of citrus',
      keyBottlenecks: ['Citrus fruit rot during humid transit', 'Lack of modern vacuum dehydration for culinary export']
    },
    businessCase: {
      proposedMill: 'Specialty Tea Vacuum Packaging, Citrus Essential Oil Distiller & Solar Fish Dehydrator',
      millTypeBn: 'স্পেশালিটি চা প্যাকেজিং, সাতকড়া তেল এক্সট্রাকশন ও ড্রায়ার হাব',
      capitalInvestment: '৳4.6 Crore ($415,000)',
      wasteReduction: 'Cuts transit spoilage to 2.1%',
      farmerMarginIncrease: '+33% farm-gate value addition',
      paybackPeriod: '2.6 Years (IRR 36%)',
      processingCapacity: '8 MT specialty tea packaging/day + 4 MT citrus processing/day',
      valueAddedProducts: ['GreenShop Single-Estate White & Green Tea', 'Cold-Pressed Shatkora Flavor Extract', 'Hygienic Solar-Dried Haor Baim & Shol Fish']
    },
    supplyChain: {
      transitToDhakaKm: 240,
      primaryCorridor: 'N2 Highway via Kishoreganj / Narsingdi direct to Dhaka',
      transitHours: 5.0,
      coldChainRequired: true,
      spokeRole: 'North-Eastern Tea, Herbal Aromatics & Haor Produce Spoke',
      weeklyDispatches: '14 climate-controlled trucks/week'
    }
  },

  barishal: {
    id: 'barishal',
    cropsCategory: ['fruits', 'fisheries_livestock', 'fine_rice'],
    agriculturalHighlights: {
      primaryCrops: ['Boro/Aman Paddy (Balam Rice)', 'Guava', 'Amra (Hog Plum)', 'Freshwater Hilsa', 'Coconuts'],
      signatureProduce: 'Bimar Floating Guava & Traditional Balam Fine Rice',
      signatureProduceBn: 'ভাসমান বাজারের পেয়ারা, আমড়া ও ঐতিহ্যবাহী বালাম চাল',
      annualProduction: '1,450,000 MT paddy / 46,000 MT guava & amra',
      harvestSeason: 'Guava: Jul-Sep · Amra: Aug-Oct · Paddy: Nov-Dec',
      surplusRatio: '72% regional surplus'
    },
    economicSignificance: {
      farmerHouseholds: '370,000 riparian farmers and canal boat traders',
      annualTurnover: '৳2,850 Crore ($260M USD)',
      majorHaats: ['Bhimruli Floating Guava Market', 'Kawnia Port Barishal'],
      currentLossRate: '31% catastrophic spoilage during monsoon humidity',
      keyBottlenecks: ['Monsoon heat causes ripe guavas to ferment in wooden country boats within 36 hours']
    },
    businessCase: {
      proposedMill: 'Riverine Cold Barges, Guava Puree & Clarified Juice Extraction Plant',
      millTypeBn: 'নদীভিত্তিক ফ্লোটিং কোল্ড চেইন ও পেয়ারা জুস প্রসেসিং মিল',
      capitalInvestment: '৳4.9 Crore ($445,000)',
      wasteReduction: 'Reduces monsoon guava dumping from 31% to 3.8%',
      farmerMarginIncrease: '+38% increase during harvest surplus',
      paybackPeriod: '2.3 Years (IRR 42%)',
      processingCapacity: '35 MT guava pulping/day + 20 MT grain parboiling/day',
      valueAddedProducts: ['GreenShop Pure Tropical Guava Nectar', 'Vacuum-Sorted Authentic Balam Rice', 'Desiccated Coconut Powder']
    },
    supplyChain: {
      transitToDhakaKm: 180,
      primaryCorridor: 'N8 Padma Bridge Direct 6-Lane Expressway',
      transitHours: 3.5,
      coldChainRequired: true,
      spokeRole: 'Southern Riverine Fruit, Dairy & Delta Grain Spoke',
      weeklyDispatches: '20 refrigerated vans/week'
    }
  },

  munshiganj: {
    id: 'munshiganj',
    cropsCategory: ['vegetables_spices', 'fruits'],
    agriculturalHighlights: {
      primaryCrops: ['Diamond & Cardinal Potatoes', 'Kachur Lati (Colocasia)', 'Amritashagar Banana', 'Mustard'],
      signatureProduce: 'Munshiganj Premium High-Yield Tubers (Potato Capital)',
      signatureProduceBn: 'মুন্সীগঞ্জের ডায়মন্ড ও কার্ডিনাল জাতের বিখ্যাত আলু',
      annualProduction: '1,320,000 MT potatoes (over 15% of national output)',
      harvestSeason: 'Potato: Jan-Mar · Banana: Year-round',
      surplusRatio: '90% national surplus'
    },
    economicSignificance: {
      farmerHouseholds: '240,000 potato farming families',
      annualTurnover: '৳2,900 Crore ($265M USD)',
      majorHaats: ['Mirkadim Agri Haat', 'Lohajang Port'],
      currentLossRate: '16.5% rot & sprouting in overcrowded traditional chillers',
      keyBottlenecks: ['Extreme cold storage electricity costs passed down to growers', 'Volatile potato market gluts']
    },
    businessCase: {
      proposedMill: 'Solar-Powered Modified Atmosphere Cold Storage & Potato Starch / Flakes Plant',
      millTypeBn: 'সোলার পাওয়ারড আলু স্টোরেজ ও পটেটো ফ্লেক্স ম্যানুফ্যাকচারিং প্ল্যান্ট',
      capitalInvestment: '৳6.2 Crore ($560,000)',
      wasteReduction: 'Reduces sprouting & shrinkage losses by 85%',
      farmerMarginIncrease: '+27% guaranteed purchase contract margin',
      paybackPeriod: '2.7 Years (IRR 35%)',
      processingCapacity: '5,000 MT CA storage + 20 MT potato starch/day',
      valueAddedProducts: ['GreenShop Dehydrated Potato Flakes (Snack Ingredient)', 'Graded Washed & Mesh-Bagged Cooking Potatoes', 'Native Edible Potato Starch']
    },
    supplyChain: {
      transitToDhakaKm: 42,
      primaryCorridor: 'Dhaka-Munshiganj Regional Access Highway',
      transitHours: 1.2,
      coldChainRequired: false,
      spokeRole: 'Immediate Tuber Staging & Industrial Starch Spoke to Central Hub',
      weeklyDispatches: '35 trucks/week'
    }
  },

  dhaka: {
    id: 'dhaka',
    cropsCategory: ['all'],
    agriculturalHighlights: {
      primaryCrops: ['Hydroponic Urban Greens', 'Mushroom Culture', 'Commercial Dairy & Poultry', 'Central Aggregation'],
      signatureProduce: 'GreenShop Central Mega-Hub: National Cold Storage & Quality Control Core',
      signatureProduceBn: 'গ্রিনশপ কেন্দ্রীয় মেগাহাব: জাতীয় কোল্ড স্টোরেজ ও মান নিয়ন্ত্রণ কেন্দ্র',
      annualProduction: 'Consumption Mega-Center: 22,000 MT fresh produce consumed daily',
      harvestSeason: 'Continuous 365-day cold intake and automated sorting',
      surplusRatio: 'Consumer import center'
    },
    economicSignificance: {
      farmerHouseholds: 'Direct connection to 1.8M farmers across 63 peripheral spoke districts',
      annualTurnover: '৳45,000 Crore national urban food market',
      majorHaats: ['Kawran Bazar', 'Jatrabari Wholesale Terminal', 'Badamtoli Fruit Exchange'],
      currentLossRate: 'Traditional city wholesale markets experience 22% retail spoilage in urban bins',
      keyBottlenecks: ['Night-time truck congestions causing 6-hour idle times with rotting produce']
    },
    businessCase: {
      proposedMill: 'GreenShop Central Automated Cold Distribution, Traceability & Packaging Terminal',
      millTypeBn: 'গ্রিনশপ সেন্ট্রাল অটোমেটেড লজিস্টিকস ও কিউসি টার্মিনাল (তেজগাঁও/কেরানীগঞ্জ)',
      capitalInvestment: '৳18.5 Crore ($1.68M USD)',
      wasteReduction: 'Eliminates urban transit rot via temperature-controlled delivery cross-docks',
      farmerMarginIncrease: '+30% to +45% across all 63 network feeder spokes',
      paybackPeriod: '3.1 Years (IRR 34%)',
      processingCapacity: '350 MT daily inbound intake, optical QC, robotic palletizing',
      valueAddedProducts: ['Standardized Retail-Ready GreenShop Branded Eco-Packs', 'Zero-Chemical Washed Salads', 'Institutional B2B Clean-Pack Supplies']
    },
    supplyChain: {
      transitToDhakaKm: 0,
      primaryCorridor: 'Central National Logistics Apex (Confluence of N1, N2, N3, N5, N8)',
      transitHours: 0,
      coldChainRequired: true,
      spokeRole: 'Central National Mega-Hub & Export Clearance Consolidation Core',
      weeklyDispatches: '140 outbound distribution fleet dispatches/week'
    }
  }
};

// Helper to provide realistic agricultural data for the remaining districts
export function getDistrictDetail(id: string, name: string, nameBn: string, division: string): DistrictDetail {
  if (DISTRICT_DETAILS[id]) {
    return DISTRICT_DETAILS[id];
  }

  // Sensible, highly realistic agricultural profiles for all other districts
  const sampleProfiles: Record<string, Partial<DistrictDetail>> = {
    thakurgaon: {
      cropsCategory: ['grains_pulses', 'vegetables_spices', 'cash_crops'],
      agriculturalHighlights: {
        primaryCrops: ['Sugarcane', 'Hard Wheat', 'Potatoes', 'Mango', 'Maize'],
        signatureProduce: 'High-Sucrose Sugarcane & Seed Potatoes',
        signatureProduceBn: 'ঠাকুরগাঁওয়ের মিষ্টি আখ ও উন্নত বীজ আলু',
        annualProduction: '380,000 MT sugarcane / 290,000 MT potatoes',
        harvestSeason: 'Sugarcane: Nov-Feb · Potato: Jan-Mar',
        surplusRatio: '72% surplus'
      },
      businessCase: {
        proposedMill: 'Organic Jaggery (Gur) Pelletizer & Potato Flakes Mill',
        millTypeBn: 'অর্গানিক দানাদার গুড় ও পটেটো প্রসেসিং ইউনিট',
        capitalInvestment: '৳4.2 Crore',
        wasteReduction: 'Reduces field rot from 19% to 2.8%',
        farmerMarginIncrease: '+29% value addition',
        paybackPeriod: '2.6 Years',
        processingCapacity: '35 MT sugarcane/day + 15 MT potatoes/day',
        valueAddedProducts: ['GreenShop Certified Chemical-Free Solid Brown Jaggery', 'Graded Seed Potatoes']
      }
    },
    chapai_nawabganj: {
      cropsCategory: ['fruits'],
      agriculturalHighlights: {
        primaryCrops: ['Fazli Mango', 'Khirsapat Mango', 'Langra Mango', 'Ashwina Late Mango'],
        signatureProduce: 'GI-certified Fazli & Khirsapat Royal Mangoes (Mango Capital)',
        signatureProduceBn: 'আমের রাজধানী চাঁপাইনবাবগঞ্জের জিআই ফজলি ও ক্ষীরশাপাত',
        annualProduction: '360,000 MT fresh mangoes',
        harvestSeason: 'Mango: May-Aug',
        surplusRatio: '92% commercial export'
      },
      businessCase: {
        proposedMill: 'Solar Cold-Storage & Aseptic Mango Puree Extraction Line',
        millTypeBn: 'সোলার কোল্ড স্টোরেজ ও ম্যাঙ্গো পাল্প কারখানা',
        capitalInvestment: '৳5.8 Crore',
        wasteReduction: 'Reduces post-harvest loss from 27% to 3.5%',
        farmerMarginIncrease: '+38% farm-gate price retention',
        paybackPeriod: '2.2 Years',
        processingCapacity: '40 MT mango pulp/day',
        valueAddedProducts: ['GreenShop GI Fazli Single-Tree Packs', 'Export Aseptic Mango Puree Drums']
      }
    },
    natore: {
      cropsCategory: ['vegetables_spices', 'cash_crops', 'fruits'],
      agriculturalHighlights: {
        primaryCrops: ['Garlic', 'Sugarcane', 'Kanchagolla Sweet', 'Litchi', 'Onion'],
        signatureProduce: 'GI Natore Kanchagolla & Chalan Beel Garlic (Garlic Capital)',
        signatureProduceBn: 'চলনবিল এলাকার বিখ্যাত রসুন ও নাটোরের কাঁচাগোল্লা',
        annualProduction: '185,000 MT garlic / 450,000 MT sugarcane',
        harvestSeason: 'Garlic: Feb-Apr · Sugarcane: Dec-Feb',
        surplusRatio: '84% surplus'
      },
      businessCase: {
        proposedMill: 'Garlic Peeling, Dehydration & Cold Chalan Beel Storage',
        millTypeBn: 'রসুন ছিলা, ডিহাইড্রেশন ও কোল্ড স্টোরেজ',
        capitalInvestment: '৳4.5 Crore',
        wasteReduction: 'Cuts moisture loss by 82%',
        farmerMarginIncrease: '+34% price gain',
        paybackPeriod: '2.4 Years',
        processingCapacity: '20 MT dried garlic flakes/day',
        valueAddedProducts: ['GreenShop Pure Dehydrated Minced Garlic', 'Hygienic Packed Kanchagolla']
      }
    },
    sirajganj: {
      cropsCategory: ['fisheries_livestock', 'vegetables_spices', 'cash_crops'],
      agriculturalHighlights: {
        primaryCrops: ['Cow Milk', 'Mustard Seed (Tori-7)', 'Handloom Jute', 'Sesame'],
        signatureProduce: 'Chalan Beel & Jamuna Basin Dairy Milk & Cold-Pressed Mustard Oil',
        signatureProduceBn: 'যমুনা চরের খাঁটি সরিষার তেল ও বাথানের তরল দুধ',
        annualProduction: '280 Million Litres milk / 95,000 MT mustard seeds',
        harvestSeason: 'Mustard: Dec-Feb · Milk: Year-round',
        surplusRatio: '78% surplus'
      },
      businessCase: {
        proposedMill: 'Cold-Press Ghani Mustard Extraction & Automated Milk Chilling Depot',
        millTypeBn: 'ঘানিভাঙা খাঁটি সরিষার তেল মিল ও চিলিং প্ল্যান্ট',
        capitalInvestment: '৳4.9 Crore',
        wasteReduction: 'Preserves 98% pungency and eliminates milk spoilage',
        farmerMarginIncrease: '+31% higher farm-gate price',
        paybackPeriod: '2.3 Years',
        processingCapacity: '15 MT cold-press mustard seeds/day + 20,000L milk/day',
        valueAddedProducts: ['GreenShop Virgin Cold-Pressed Mustard Oil (Kachi Ghani)', 'Cultured Ghee']
      }
    },
    naogaon: {
      cropsCategory: ['fine_rice', 'fruits'],
      agriculturalHighlights: {
        primaryCrops: ['Miniket & BR-28 Paddy', 'Katari Rice', 'Amrapali Mango', 'Mustard'],
        signatureProduce: 'Bangladesh Grain Bowl Premium Milled Fine Rice & Mangoes',
        signatureProduceBn: 'উত্তরাঞ্চলের শস্যভাণ্ডার খ্যাত নওগাঁর সরু চাল ও আম্রপালি',
        annualProduction: '2,200,000 MT paddy (Highest grain producing district)',
        harvestSeason: 'Boro: Apr-May · Aman: Nov-Dec',
        surplusRatio: '86% surplus'
      },
      businessCase: {
        proposedMill: 'Ultra-Modern Grain Silo & Bio-Gas Powered Parboiling Facility',
        millTypeBn: 'আধুনিক শস্য সাইলো ও বায়োগ্যাস চালিত রাইস প্রসেসিং মিল',
        capitalInvestment: '৳6.4 Crore',
        wasteReduction: 'Reduces rodent and moisture grain losses by 89%',
        farmerMarginIncrease: '+28% farm-gate income boost',
        paybackPeriod: '2.5 Years',
        processingCapacity: '70 MT paddy/day sorting and packaging',
        valueAddedProducts: ['GreenShop Fortified Premium Fine Rice', 'Organic Husk Ash Bio-Silica']
      }
    },
    mymensingh: {
      cropsCategory: ['fisheries_livestock', 'fine_rice'],
      agriculturalHighlights: {
        primaryCrops: ['Pangash & Tilapia Aquaculture', 'Indigenous Koi/Shing', 'Paddy', 'Mustard'],
        signatureProduce: 'Bangladesh Inland Freshwater Aquaculture Capital',
        signatureProduceBn: 'মিঠাপানির মৎস্য রাজধানী ময়মনসিংহ ও সুগন্ধি চাল',
        annualProduction: '320,000 MT cultivated fish / 1,400,000 MT paddy',
        harvestSeason: 'Aquaculture: Year-round',
        surplusRatio: '85% surplus'
      },
      businessCase: {
        proposedMill: 'Automated Fish Filleting, Blast Freezing & Fish Oil Extraction Unit',
        millTypeBn: 'মাছের ফিলে, ব্লাস্ট ফ্রিজিং ও ওমেগা-৩ অয়েল প্ল্যান্ট',
        capitalInvestment: '৳5.7 Crore',
        wasteReduction: 'Reduces transport fish mortality from 18% to 1.2%',
        farmerMarginIncrease: '+35% return',
        paybackPeriod: '2.2 Years',
        processingCapacity: '25 MT fish filleting & vacuum blast freezing/day',
        valueAddedProducts: ['GreenShop Ready-to-Cook Boneless Pangas/Tilapia Fillets', 'Organic Fish-meal Feed']
      }
    },
    bhola: {
      cropsCategory: ['fisheries_livestock', 'vegetables_spices', 'cash_crops'],
      agriculturalHighlights: {
        primaryCrops: ['Water Buffalo Milk & Curd', 'Meghna Hilsa Fish', 'Betel Nut', 'Watermelon'],
        signatureProduce: 'GI Bhola Buffalo Curd (Doi) & Fresh Estuarine Hilsa',
        signatureProduceBn: 'ঐতিহ্যবাহী ভোলার মহিষের দুধের দই ও ইলিশ মাছ',
        annualProduction: '42,000 MT buffalo milk / 52,000 MT Hilsa catch',
        harvestSeason: 'Hilsa: Jul-Oct · Buffalo Curd: Year-round',
        surplusRatio: '80% surplus'
      },
      businessCase: {
        proposedMill: 'Hygienic Clay-Pot Buffalo Curd Packing & Solar Ice-Slurry Marine Chilling',
        millTypeBn: 'মহিষের দই প্যাকেজিং ও সৌরবিদ্যুৎ চালিত আইস-স্লারি হিমাগার',
        capitalInvestment: '৳4.7 Crore',
        wasteReduction: 'Stops fish spoilage and milk coagulation losses by 90%',
        farmerMarginIncrease: '+40% earnings',
        paybackPeriod: '2.3 Years',
        processingCapacity: '12,000L buffalo milk/day + 15 MT fish chilling/day',
        valueAddedProducts: ['GreenShop Pure Bhola Buffalo Curd in Earthen Pots', 'Blast-Chilled Whole Meghna Hilsa']
      }
    },
    khulna: {
      cropsCategory: ['fisheries_livestock', 'cash_crops'],
      agriculturalHighlights: {
        primaryCrops: ['Bagda & Galda Prawns', 'Crabs', 'Coconut', 'Betel Leaf'],
        signatureProduce: 'Export Grade Brackish-Water Shrimp & Mangrove Honey',
        signatureProduceBn: 'খুলনার রপ্তানিমুখী বাগদা চিংড়ি ও সুন্দরবনের খাঁটি মধু',
        annualProduction: '35,000 MT shrimp and crabs',
        harvestSeason: 'Shrimp: Apr-Nov',
        surplusRatio: '90% export'
      },
      businessCase: {
        proposedMill: 'Solar Brine IQF Freezing & Chitin Byproduct Biopolymer Plant',
        millTypeBn: 'সোলার আইকিউএফ হিমায়িত চিংড়ি মিল ও কাইটিন প্ল্যান্ট',
        capitalInvestment: '৳6.2 Crore',
        wasteReduction: 'Reduces black-spot rot by 92%',
        farmerMarginIncrease: '+38% margin',
        paybackPeriod: '2.4 Years',
        processingCapacity: '20 MT shrimp/day',
        valueAddedProducts: ['GreenShop Ocean-Certified Easy-Peel Prawns', 'Agricultural Chitosan Bio-Stimulant']
      }
    },
    coxs_bazar: {
      cropsCategory: ['fisheries_livestock', 'cash_crops'],
      agriculturalHighlights: {
        primaryCrops: ['Marine Dry Fish (Shutki)', 'Sea Salt', 'Betel Leaf (Paan)', 'Watermelon'],
        signatureProduce: 'Nazirtek Solar-Dried Marine Fish (Shutki) & Pure Sea Salt',
        signatureProduceBn: 'নাজিরারটেকের বিষমুক্ত স্বাস্থ্যকর শুঁটকি ও সামুদ্রিক লবণ',
        annualProduction: '28,000 MT dry fish / 1,800,000 MT sea salt',
        harvestSeason: 'Dry Fish: Oct-Mar · Salt: Nov-May',
        surplusRatio: '88% surplus'
      },
      businessCase: {
        proposedMill: 'UV-Protected Solar Tunnel Dryers & Mechanized Vacuum Pack Plant',
        millTypeBn: 'ইউভি প্রোটেকটেড সোলার ড্রায়ার ও জীবাণুমুক্ত শুঁটকি হাব',
        capitalInvestment: '৳4.4 Crore',
        wasteReduction: 'Eliminates chemical pesticides (DDT/pesticide-free) 100%',
        farmerMarginIncrease: '+44% premium on pesticide-free organic dried fish',
        paybackPeriod: '2.1 Years',
        processingCapacity: '15 MT hygienic dried fish/day',
        valueAddedProducts: ['GreenShop 100% Chemical-Free Sun-Dried Loitta, Chhuri & Rupchanda', 'Iodized Flake Sea Salt']
      }
    },
    tangail: {
      cropsCategory: ['fruits', 'cash_crops', 'vegetables_spices'],
      agriculturalHighlights: {
        primaryCrops: ['Modhupur Pineapple (Giant Kew)', 'Ginger & Turmeric', 'Tangail Chamcham Sweet', 'Mustard'],
        signatureProduce: 'GI Modhupur Sweet Pineapple & Tangail Porabari Chamcham',
        signatureProduceBn: 'মধুপুরের মিষ্টি আনারস ও ঐতিহ্যবাহী পোড়াবাড়ির চমচম',
        annualProduction: '240,000 MT pineapples / 35,000 MT ginger',
        harvestSeason: 'Pineapple: Jun-Aug · Ginger: Jan-Mar',
        surplusRatio: '80% surplus'
      },
      businessCase: {
        proposedMill: 'Pineapple Canning, Juice Concentrate & Bromelain Enzyme Extraction',
        millTypeBn: 'আনারস জুস, ক্যানিং ও ব্রোমেলাইন এনজাইম এক্সট্রাকশন',
        capitalInvestment: '৳5.1 Crore',
        wasteReduction: 'Reduces pineapple post-harvest glut loss by 85%',
        farmerMarginIncrease: '+36% farmer income uplift',
        paybackPeriod: '2.3 Years',
        processingCapacity: '30 MT pineapple processing/day',
        valueAddedProducts: ['GreenShop NFC Pineapple Juice Cans', 'Dried Pineapple Rings', 'Nutraceutical Grade Bromelain']
      }
    }
  };

  const specific = sampleProfiles[id] || {};

  return {
    id,
    cropsCategory: specific.cropsCategory || ['grains_pulses', 'vegetables_spices'],
    agriculturalHighlights: specific.agriculturalHighlights || {
      primaryCrops: ['High-Yield Rice', 'Winter Vegetables', 'Mustard', 'Pulses'],
      signatureProduce: `${name} High-Yield Regional Agriculture`,
      signatureProduceBn: `${nameBn} অঞ্চলের ঐতিহ্যবাহী কৃষিজ পণ্য`,
      annualProduction: '450,000 MT mixed agricultural produce',
      harvestSeason: 'Boro: Apr-May · Aman: Nov-Dec · Rabi: Jan-Mar',
      surplusRatio: '68% regional surplus'
    },
    economicSignificance: {
      farmerHouseholds: '310,000 agrarian households',
      annualTurnover: '৳2,100 Crore ($190M USD)',
      majorHaats: [`${name} Central Agri Market`, `${name} Upazila Haat`],
      currentLossRate: '21.5% post-harvest handling loss',
      keyBottlenecks: [
        'Lack of local micro-cold storage facilities',
        'Seasonal market gluts causing price drops',
        'Multi-tier middleman deductions'
      ]
    },
    businessCase: specific.businessCase || {
      proposedMill: `Decentralized Modern Sorting, Grading & Cold Storage Unit for ${name}`,
      millTypeBn: `${nameBn} বিকেন্দ্রীকৃত আধুনিক সর্টিং ও এগ্রো-প্রসেসিং মিল`,
      capitalInvestment: '৳4.5 Crore ($410,000)',
      wasteReduction: 'Reduces post-harvest loss from 21.5% to 3.4%',
      farmerMarginIncrease: '+30% direct farm-gate income increase',
      paybackPeriod: '2.5 Years (IRR 37%)',
      processingCapacity: '30 MT sorted and packaged produce/day',
      valueAddedProducts: [
        `GreenShop Graded & Clean-Packed ${name} Produce`,
        'Quality-Tested Traceable Farm Packs'
      ]
    },
    supplyChain: {
      transitToDhakaKm: Math.floor(Math.random() * 200 + 80),
      primaryCorridor: `Highway Connector to Dhaka Central Hub`,
      transitHours: Number((Math.random() * 4 + 2.5).toFixed(1)),
      coldChainRequired: true,
      spokeRole: `${division} Division Regional Aggregation Spoke`,
      weeklyDispatches: '12-16 logistics dispatch units/week'
    }
  };
}

// Combine geometries with data to create the full 64 districts array
export const ALL_DISTRICTS: DistrictData[] = DISTRICTS_GEOM.map((geom) => {
  const detail = getDistrictDetail(geom.id, geom.name, geom.nameBn, geom.division);
  const divBnMap: Record<string, string> = {
    Rangpur: 'রংপুর',
    Rajshahi: 'রাজশাহী',
    Mymensingh: 'ময়মনসিংহ',
    Sylhet: 'সিলেট',
    Dhaka: 'ঢাকা',
    Barishal: 'বরিশাল',
    Chattogram: 'চট্টগ্রাম',
    Khulna: 'খুলনা'
  };

  return {
    ...geom,
    ...detail,
    divisionBn: divBnMap[geom.division] || geom.division
  };
});
