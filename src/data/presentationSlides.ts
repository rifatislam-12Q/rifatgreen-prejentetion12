import { PresentationSlide } from '../types';

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    title: 'what is greenshop.com',
    titleBn: 'গ্রিনশপ ডটকম কী? · রূপকল্প ২০২৯',
    subtitle: 'Decentralized Agricultural Supply Chain & Direct Farm-to-Fork Platform',
    subtitleBn: 'বাংলাদেশের প্রথম বিকেন্দ্রীকৃত ডিজিটাল খাদ্য সরবরাহ শৃঙ্খল ও সরাসরি কৃষিজ প্ল্যাটফর্ম',
    content: {
      heading: 'GreenShop Strategic Imperative',
      headingBn: 'গ্রিনশপ কৌশলগত লক্ষ্য',
      points: [
        {
          label: 'The Challenge',
          labelBn: 'বর্তমান সংকট',
          text: 'Bangladesh produces over 72 Million MT of food annually, yet 22-31% is lost post-harvest due to lack of local chilling and milling.',
          textBn: 'বাংলাদেশে বছরে ৭ কোটি ২০ লাখ মেট্রিক টন খাদ্য উৎপাদিত হলেও স্থানীয় আধুনিক হিমাগার ও প্রসেসিং মিলের অভাবে ২২-৩১% ফসল নষ্ট হয়ে যায়।',
          stat: '২৪% গড় অপচয়'
        },
        {
          label: 'The Opportunity',
          labelBn: 'সম্ভাবনা ও সমাধান',
          text: 'Establishing 64 decentralized micro-processing mills puts value addition directly in farmers hands.',
          textBn: '৬৪ জেলায় বিকেন্দ্রীকৃত আধুনিক মাইক্রো-প্রসেসিং মিল স্থাপন করে ফসলের প্রক্রিয়াজাতকরণ সরাসরি কৃষকের উঠোনে নিয়ে আসা।',
          stat: '+৩২% কৃষক আয়'
        },
        {
          label: 'The Architecture',
          labelBn: 'সাপ্লাই চেইন নেটওয়ার্ক',
          text: 'A coordinated Hub-and-Spoke supply chain connects rural micro-mills directly to Dhaka Central Mega-Hub and international export docks.',
          textBn: 'একটি সমন্বিত হাব-অ্যান্ড-স্পোক সরবরাহ শৃঙ্খল যা প্রান্তিক জেলা মিলগুলোকে সরাসরি ঢাকা মেগা-টার্মিনাল ও বৈশ্বিক রপ্তানির সাথে যুক্ত করে।',
          stat: '৬৪টি সংযুক্ত স্পোক'
        }
      ],
      highlightBox: {
        title: 'Project GreenShop 2029 Goal',
        titleBn: 'প্রকল্প গ্রিনশপ ২০২৯ চূড়ান্ত লক্ষ্য',
        desc: 'Build Bangladesh’s first integrated agro-processing and cold-chain grid, reducing food waste by 80% and retaining maximum margin at farmgate.',
        descBn: 'বাংলাদেশের প্রথম সমন্বিত কৃষি প্রক্রিয়াকরণ ও কোল্ড-চেইন গ্রিড নির্মাণ, যা খাদ্য অপচয় ৮০% কমাবে এবং কৃষকের ন্যায্য মুনাফা নিশ্চিত করবে।',
        metric: '১২,০০০ কোটি ৳ সাশ্রয়'
      }
    }
  },
  {
    id: 2,
    title: 'Business Model',
    titleBn: 'বিজনেস মডেল · Business Model',
    subtitle: 'Decentralized Agri Value Chain & Hub-and-Spoke Monetization',
    subtitleBn: 'গ্রিনশপ বিকেন্দ্রীকৃত বিজনেস মডেল ও সরবরাহ শৃঙ্খল',
    content: {
      heading: 'Two-Tier Logistics Infrastructure & Dual Global Gateways',
      headingBn: 'দ্বি-স্তর লজিস্টিকস ও ২টি গ্লোবাল এক্সপোর্ট গেটওয়ে হাব',
      points: [
        {
          label: 'Tier 1: Decentralized District Mills (Spokes)',
          labelBn: 'স্তর ১: জেলাভিত্তিক বিকেন্দ্রীকৃত মিল (স্পোক)',
          text: 'Located within 15 km of harvest zones. Performs instant optical sorting, grading, nitrogen packing, and solar cold stabilization.',
          textBn: 'ফসল কাটার স্থানের ১৫ কিলোমিটারের মধ্যে অবস্থিত। তাৎক্ষণিক অপটিক্যাল সর্টিং, গ্রেডিং, নাইট্রোজেন প্যাকেজিং ও কোল্ড স্টোরেজ।',
          stat: '<২৪ ঘণ্টা ফার্ম-টু-মিল'
        },
        {
          label: 'Global Hub 1: Dhaka HSIA Airport',
          labelBn: 'গ্লোবাল হাব ১: ঢাকা শাহজালাল বিমানবন্দর',
          text: 'Dedicated Agro-Air Cargo Terminal. Dispatches high-value fresh litchis, mangoes, herbs, and Kataribhog aromatic rice to Middle East, UK, and EU within 6-12 hours.',
          textBn: 'আন্তর্জাতিক আকাশপথ কার্গো টার্মিনাল। কাটারিভোগ চাল, তাজা লিচু, আম ও শাকসবজি মাত্র ৬-১২ ঘণ্টায় মধ্যপ্রাচ্য, যুক্তরাজ্য ও ইউরোপে রপ্তানি।',
          stat: '২৫০+ টন দৈনিক কার্গো'
        },
        {
          label: 'Global Hub 2: Chattogram Seaport',
          labelBn: 'গ্লোবাল হাব ২: চট্টগ্রাম সমুদ্র ও নৌবন্দর',
          text: 'Maritime Ocean Freight & Reefer Terminal. Exports frozen black tiger shrimp, sea catch, bulk grains, and tea containers across global ocean routes.',
          textBn: 'মেরিটাইম সমুদ্র ও নৌবন্দর টার্মিনাল। সাতক্ষীরা-খুলনার হিমায়িত চিংড়ি, সামুদ্রিক মৎস্য, বাল্ক খাদ্যশস্য ও চা রটারডাম, নিউ ইয়র্ক ও পূর্ব এশিয়ায় প্রেরণ।',
          stat: '১২,০০০+ টিইইউ রিফার'
        }
      ],
      highlightBox: {
        title: 'Bypassing the Broker Gauntlet',
        titleBn: 'মধ্যস্বত্বভোগীদের ৫-৭ ধাপের অবসান',
        desc: 'Traditional supply chains involve 5 to 7 middlemen (Faria, Bepari, Aratdar, Wholesaler, Retailer). GreenShop connects farmer cooperatives directly to consumers in 1 hop.',
        descBn: 'চিরাচরিত ব্যবস্থায় ফড়িয়া, বেপারি, আড়তদার ও পাইকারদের দৌরাত্ম্যে কৃষক দাম পেত না। গ্রিনশপ মাত্র ১টি সরাসরি ধাপে উৎপাদক ও ভোক্তাকে সংযুক্ত করে।',
        metric: '১টি সরাসরি ধাপ'
      }
    }
  },
  {
    id: 3,
    title: 'Platform Features',
    titleBn: 'প্ল্যাটফর্ম সার্ভিসেস ও ফিচারস · Features',
    subtitle: 'Decentralized Agro Ecosystem & All-in-One Services',
    subtitleBn: 'গ্রিনশপ ডিজিটাল প্ল্যাটফর্মের সকল মূল সেবা ও সার্ভিসসমূহ',
    districtFeatured: 'dinajpur',
    content: {
      heading: 'High-Value Northern Granary Engine',
      headingBn: 'উত্তরাঞ্চলের শস্যভাণ্ডার ইঞ্জিন',
      points: [
        {
          label: 'Current Reality',
          labelBn: 'বর্তমান বাস্তবতা',
          text: 'Dinajpur farmers sell raw paddy to archaic hullers at ৳32/kg. Breakage rate exceeds 18%, and litchis rot within 3 days of peak harvest.',
          textBn: 'দিনাজপুরের কৃষকরা পুরনো অটো রাইস মিলের কাছে মাত্র ৩২ টাকা/কেজি দরে ধান বিক্রি করে। ১৮% চাল ভেঙে যায় এবং লিচু ৩ দিনে পচে যায়।',
          stat: '২২% ফসল নষ্ট'
        },
        {
          label: 'GreenShop Decentralized Mill',
          labelBn: 'গ্রিনশপ আধুনিক মিল প্রস্তাবনা',
          text: 'Micro-parboiling with multi-stage optical sorter and 12 MT/day fruit blast chiller. Retains whole grain integrity and yields premium edible rice bran oil.',
          textBn: 'মাল্টি-স্টেজ অপটিক্যাল সর্টার ও ১২ মে.টন দৈনিক লিচু ব্লাস্ট চিলার। চালের পূর্ণ মান অক্ষুণ্ণ রেখে প্রিমিয়াম রাইস ব্র্যান অয়েল উৎপাদন।',
          stat: '৫.৪ কোটি ৳ বিনিয়োগ'
        },
        {
          label: 'Unit Economics',
          labelBn: 'ইউনিট অর্থনীতি ও মুনাফা',
          text: 'Farmers receive ৳43/kg (+34% premium). GreenShop packages 1kg vacuum sealed GI-certified packs sold at ৳125/kg in premium Dhaka supermarkets.',
          textBn: 'কৃষক প্রতি কেজিতে ৪৩ টাকা পান (+৩৪% বেশি)। ভ্যাকুয়াম সিল জিআই কাটারিভোগ ঢাকায় ১২৫ টাকা/কেজি মূল্যে সরাসরি সুপারমার্কেটে বিক্রি হয়।',
          stat: '২.৫ বছরে মুনাফায় পরিশোধ'
        }
      ],
      highlightBox: {
        title: 'Value Creation Breakdown',
        titleBn: 'মূল্য সংযোজনের হিসাব',
        desc: 'Transforming commodity paddy into packaged GI Katarirogh and stabilized rice bran oil yields 2.8x higher gross margin per acre.',
        descBn: 'সাধারণ ধানকে প্যাকেটজাত জিআই সুগন্ধি চাল ও পুষ্টিকর তেলে রূপান্তর করে প্রতি একরে ২.৮ গুণ বেশি লাভ পাওয়া যায়।',
        metric: '৩৮.৪% প্রজেক্ট আইআরআর'
      }
    }
  },
  {
    id: 4,
    title: 'National 64 Districts Agro & Logistics Grid',
    titleBn: 'জাতীয় ৬৪ জেলা এগ্রিকালচার ম্যাপ ও সরবরাহ শৃঙ্খল গ্রিড',
    subtitle: 'Interactive 64-District GIS Network with Dual Global Export Gateways (HSIA Airport & Chattogram Seaport)',
    subtitleBn: 'ইন্টারেক্টিভ ৬৪ জেলা ভেক্টর ম্যাপ, ফসলের তথ্য ও ২টি গ্লোবাল এক্সপোর্ট হাব',
    districtFeatured: 'pabna',
    content: {
      heading: 'Decentralized 64-District Agro Grid',
      headingBn: '৬৪ জেলার সমন্বিত কৃষি ও লজিস্টিকস গ্রিড',
      points: [
        {
          label: '64 Administrative Spokes',
          labelBn: '৬৪টি প্রশাসনিক স্পোক',
          text: 'Every district features a dedicated decentralized micro-mill situated within 15 km of harvest clusters, guaranteeing instant sorting and chilling.',
          textBn: 'প্রতিটি জেলায় ফসল কাটার ১৫ কিলোমিটারের মধ্যে বিকেন্দ্রীকৃত আধুনিক মাইক্রো-মিল, যা তাৎক্ষণিক সর্টিং ও প্রসেসিং নিশ্চিত করে।',
          stat: '৬৪ জেলা সংযুক্ত'
        },
        {
          label: 'Dual Global Gateways',
          labelBn: '২টি গ্লোবাল এক্সপোর্ট হাব',
          text: 'Connected via GPS-tracked cold corridors to Dhaka HSIA Airport (express air cargo) and Chattogram Maritime Port (deep-sea reefer containers).',
          textBn: 'জিপিএস ট্র্যাকিংযুক্ত কোল্ড করিডোরের মাধ্যমে ঢাকা শাহজালাল বিমানবন্দর এবং চট্টগ্রাম সমুদ্রবন্দরের সাথে সরাসরি রপ্তানি সংযোগ।',
          stat: '২টি আন্তর্জাতিক হাব'
        },
        {
          label: 'Farmgate Value Capture',
          labelBn: 'কৃষক পর্যায়ে মূল্য সংযোজন',
          text: 'Local blast chillers and optical graders preserve perishable fruits (Pabna/Dinajpur litchi, mango) and fine aromatic rice at peak freshness.',
          textBn: 'হাইড্রো-কুলিং ও ব্লাস্ট চিলারের মাধ্যমে লিচু, আম ও সুগন্ধি চালের সতেজতা বজায় রেখে কৃষকের মুনাফা ৩২-৩৬% বৃদ্ধি।',
          stat: '<৩.৫% অপচয় হার'
        }
      ],
      highlightBox: {
        title: 'Interactive 64-District GIS Control',
        titleBn: 'ইন্টারেক্টিভ ৬৪ জেলা জিআইএস কন্ট্রোল',
        desc: 'Explore any of Bangladesh’s 64 districts below to inspect signature produce, transit times to dual export hubs, and tailored mill business cases.',
        descBn: 'নিচের ইন্টারেক্টিভ ম্যাপে বাংলাদেশের যেকোনো জেলায় ক্লিক করে বিশেষ ফসল, ২টি গ্লোবাল হাবের দূরত্ব ও মিলের বিস্তারিত হিসাব দেখুন।',
        metric: '৬৪ জেলা স্পোক'
      }
    }
  },
  {
    id: 5,
    title: 'National Economic Impact: Jobs, Output & GDP',
    titleBn: 'কর্মসংস্থান, উৎপাদন ও GDP · National Impact',
    subtitle: 'Employment Generation, Agro-Industrial Output & GDP Contribution',
    subtitleBn: 'জাতীয় অর্থনীতিতে কর্মসংস্থান সৃষ্টি, শিল্প উৎপাদন ও জিডিপি প্রবৃদ্ধি',
    districtFeatured: 'panchagarh',
    content: {
      heading: 'Northern Frontier Processing Engine',
      headingBn: 'উত্তরের সীমান্তবর্তী শস্য রূপান্তর হাব',
      points: [
        {
          label: 'Maize & Wheat Moisture Threat',
          labelBn: 'ভুট্টা ও গমে ছত্রাক ও আর্দ্রতার ঝুঁকি',
          text: 'Pre-monsoon rains catch harvested corn in unpaved yards, causing catastrophic aflatoxin contamination and 35% discount by feed mills.',
          textBn: 'বৃষ্টির পানিতে কাঁচা ভুট্টায় ছত্রাক ও ক্ষতিকর এফলাটক্সিন ছড়িয়ে পড়ে, যার ফলে ফিড মিলগুলো ৩৫% কম দাম দিয়ে কিনে নেয়।',
          stat: '১৯.২% আর্দ্রতাজনিত ক্ষতি'
        },
        {
          label: 'Solar-Biomass Column Dryers',
          labelBn: 'সোলার ও বায়োগ্যাস শস্য ড্রায়ার',
          text: 'Standardizes moisture from 26% to safe 13% within 4 hours using corn-cob waste biomass energy.',
          textBn: 'ভুট্টার অবশিষ্ট অংশ পুড়িয়ে বায়োগ্যাসের মাধ্যমে ৪ ঘণ্টার মধ্যে ভুট্টার আর্দ্রতা ২৬% থেকে নিরাপদ ১৩%-এ নামিয়ে আনা হয়।',
          stat: '৬০ মে.টন দৈনিক ড্রায়িং'
        },
        {
          label: 'Smallholder Tea Cooperative Processing',
          labelBn: 'ক্ষুদ্র চা চাষী সমবায় প্রসেসিং',
          text: 'Empowers 12,000 small-plot tea farmers with fair digital weigh-ins and chemical-free whole-leaf CTC drying.',
          textBn: '১২,০০০ ক্ষুদ্র চা চাষীকে ডিজিটাল ওজনে পাতার ন্যায্য দাম দিয়ে কীটনাশকমুক্ত প্রিমিয়াম সিটিসি ও গ্রিন টি তৈরি।',
          stat: '+২৯% কৃষকের আয় বৃদ্ধি'
        }
      ],
      highlightBox: {
        title: 'Food Security Impact',
        titleBn: 'খাদ্য নিরাপত্তার প্রভাব',
        desc: 'Local continuous grain drying preserves high germination seed quality and guarantees aflatoxin-free corn for export.',
        descBn: 'স্থানীয় পর্যায়ে দ্রুত শুকানোর ফলে বীজ অঙ্কুরোদগমের গুণাগুণ অক্ষুণ্ণ থাকে এবং বিষমুক্ত রপ্তানিযোগ্য ভুট্টা পাওয়া যায়।',
        metric: '৯২% অপচয় রোধ'
      }
    }
  },
  {
    id: 6,
    title: 'National Impact & Financial Feasibility Roadmap',
    titleBn: 'জাতীয় অর্থনৈতিক প্রভাব ও ২০২৯ বাস্তবায়নের রূপরেখা',
    subtitle: 'The 64-District Rollout Plan (2025 - 2029)',
    subtitleBn: '২০২৫ থেকে ২০২৯ পর্যন্ত ৬৪টি জেলায় পূর্ণাঙ্গ বাস্তবায়ন পরিকল্পনা',
    content: {
      heading: 'Scale, Governance & Socio-Economic Returns',
      headingBn: 'সার্বিক প্রভাব, পরিচালনা ও অর্থনৈতিক রিটার্ন',
      points: [
        {
          label: 'Phase 1 (2025-2026): Northern & Western Corridors',
          labelBn: 'পর্যায় ১ (২০২৫-২০২৬): উত্তর ও পশ্চিমাঞ্চল করিডোর',
          text: 'Deploy 16 pilot mills in Dinajpur, Pabna, Bogura, Panchagarh, Rajshahi, Chapai Nawabganj, Naogaon and Tangail.',
          textBn: 'দিনাজপুর, পাবনা, বগুড়া, পঞ্চগড়, রাজশাহী, চাঁপাইনবাবগঞ্জ, নওগাঁ ও টাঙ্গাইলে প্রথম ১৬টি আধুনিক মডেল মিল স্থাপন।',
          stat: '১৬টি প্রাথমিক স্পোক'
        },
        {
          label: 'Phase 2 (2027-2028): Delta & Coastal Corridors',
          labelBn: 'পর্যায় ২ (২০২৭-২০২৮): দক্ষিণাঞ্চল ও উপকূলীয় করিডোর',
          text: 'Deploy 28 mills across Barishal, Khulna, Satkhira, Bhola, Munshiganj, Mymensingh and Sylhet.',
          textBn: 'বরিশাল, খুলনা, সাতক্ষীরা, ভোলা, মুন্সীগঞ্জ, ময়মনসিংহ ও সিলেটে আরও ২৮টি প্রক্রিয়াকরণ হাব চালু করা।',
          stat: '৪৪টি চালু স্পোক'
        },
        {
          label: 'Phase 3 (2029): Complete 64-District Full Integration',
          labelBn: 'পর্যায় ৩ (২০২৯): ৬৪ জেলায় পূর্ণাঙ্গ জাতীয় নেটওয়ার্ক',
          text: 'All 64 districts live with seamless IoT sensor monitoring, cold chain GPS telematics, and direct farmer profit-share dividends.',
          textBn: 'দেশের ৬৪টি জেলাতেই আইওটি সেন্সর ও কোল্ড-চেইন জিপিএস ট্র্যাক সংবলিত স্মার্ট নেটওয়ার্কের আওতায় কৃষকের সরাসরি মুনাফা বণ্টন।',
          stat: '৬৪/৬৪ জেলা সক্রিয়'
        }
      ],
      highlightBox: {
        title: '2029 Cumulative National Outcome',
        titleBn: '২০২৯ সালের সম্মিলিত জাতীয় অর্জন',
        desc: 'Over 2.4 Million smallholder farm families onboarded. Post-harvest national food loss slashed by 1.8 Million metric tons annually.',
        descBn: '২৪ লাখের বেশি প্রান্তিক কৃষক পরিবারকে সরাসরি যুক্ত করে প্রতি বছর ১৮ লাখ মেট্রিক টন খাদ্য অপচয় রোধ করা হবে।',
        metric: '৩১ লাখ মে.টন খাদ্য সাশ্রয়'
      }
    }
  }
];
