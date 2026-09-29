import { GlobalHub } from '../types';

export const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: 'dhaka_airport',
    name: 'Hazrat Shahjalal International Airport (HSIA)',
    nameBn: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর',
    type: 'air_cargo',
    typeBn: 'গ্লোবাল এয়ার কার্গো হাব (আকাশপথ)',
    subtitle: 'Global Air Cargo Express Gateway (Perishables & Fine Agro)',
    subtitleBn: 'আন্তর্জাতিক আকাশপথ দ্রুত পচনশীল খাদ্য ও সুগন্ধি চাল রফতানি টার্মিনাল',
    location: 'Kurmitola, Dhaka',
    locationBn: 'কুর্মিটোলা, ঢাকা',
    center: { x: 442, y: 490 },
    dailyCapacity: '২৫০+ মেট্রিক টন এয়ার কার্গো / দিন',
    primaryExportCommodities: [
      'Dinajpur Kataribhog & Chinigura Aromatic Rice',
      'Pabna & Dinajpur Fresh Litchi',
      'Rajshahi & Chapainawabganj Premium Mangoes',
      'Fresh Perishable Vegetables & Green Chilies',
      'Sylhet Premium Organic First-flush Tea'
    ],
    primaryExportCommoditiesBn: [
      'দিনাজপুরের কাটারিভোগ ও সুগন্ধি চিনিগুঁড়া চাল',
      'পাবনা ও দিনাজপুরের বোম্বাই ও বেদানা লিচু',
      'রাজশাহী ও চাঁপাইনবাবগঞ্জের ক্ষীরশাপাত ও ল্যাংড়া আম',
      'তাজা দ্রুত পচনশীল শাকসবজি, পটল ও কাঁচামরিচ',
      'সিলেটের প্রিমিয়াম অর্গানিক ফার্স্ট-ফ্লাশ চা'
    ],
    destinations: [
      'Middle East (Dubai, Jeddah, Riyadh, Doha, Kuwait)',
      'United Kingdom (London Heathrow)',
      'European Union (Frankfurt, Milan, Paris)',
      'Southeast Asia (Singapore, Kuala Lumpur)'
    ],
    destinationsBn: [
      'মধ্যপ্রাচ্য (দুবাই, জেদ্দা, রিয়াদ, দোহা, কুয়েত)',
      'যুক্তরাজ্য (লন্ডন হিথ্রো)',
      'ইউরোপীয় ইউনিয়ন (ফ্রাঙ্কফুর্ট, মিলান, প্যারিস)',
      'দক্ষিণ-পূর্ব এশিয়া (সিঙ্গাপুর, কুয়ালালামপুর)'
    ],
    color: '#10b981',
    accentColor: '#047857'
  },
  {
    id: 'ctg_seaport',
    name: 'Chattogram Maritime Seaport',
    nameBn: 'চট্টগ্রাম সমুদ্র ও নৌবন্দর',
    type: 'maritime_seaport',
    typeBn: 'গ্লোবাল মেরিটাইম সিপোর্ট ও নৌবন্দর হাব (সমুদ্রপথ)',
    subtitle: 'Global Ocean Freight & Reefer Container Port (Bulk & Marine)',
    subtitleBn: 'আন্তর্জাতিক সমুদ্রপথ ও শীতল কনটেইনার বাল্ক খাদ্য রফতানি বন্দর',
    location: 'Patenga / Karnaphuli Estuary, Chattogram',
    locationBn: 'পতেঙ্গা ও কর্ণফুলী মোহনা, চট্টগ্রাম',
    center: { x: 670, y: 725 },
    dailyCapacity: '১২,০০০+ টিইইউ রিফার ও বাল্ক কনটেইনার / দিন',
    primaryExportCommodities: [
      'Frozen Black Tiger & Freshwater Shrimp (Satkhira/Khulna/Cox\'s Bazar)',
      'Deep Sea Fish & Marine Seafood Catch',
      'Bulk Processed Grains, Maize & Agro-Starch',
      'Export-grade Tea Auction Bulk Containers',
      'Jute Fibers, Geo-textiles & Diversified Eco-products'
    ],
    primaryExportCommoditiesBn: [
      'সাতক্ষীরা, খুলনা ও কক্সবাজারের হিমায়িত বাগদা ও গলদা চিংড়ি',
      'গভীর সমুদ্রের সামুদ্রিক মৎস্য ও শুঁটকি প্রক্রিয়াজাত পণ্য',
      'বাল্ক প্রক্রিয়াজাত খাদ্যশস্য, ভুট্টা ও অ্যাগ্রো-স্টার্চ',
      'রফতানি মানের কনটেইনার চা ও গুঁড়া মসলা',
      'পরিবেশবান্ধব পাটজাত সুতা ও বহুমুখী আঁশ'
    ],
    destinations: [
      'European Union (Rotterdam, Hamburg, Antwerp, Valencia)',
      'North America (New York, Savannah, Los Angeles)',
      'East Asia (Yokohama, Shanghai, Busan)',
      'Regional Transshipment Hubs (Colombo, Port Klang, Tanjung Pelepas)'
    ],
    destinationsBn: [
      'ইউরোপীয় ইউনিয়ন (রটারডাম, হামবুর্গ, এন্টওয়ার্প, ভ্যালেন্সিয়া)',
      'উত্তর আমেরিকা (নিউ ইয়র্ক, সাভানা, লস অ্যাঞ্জেলেস)',
      'পূর্ব এশিয়া (ইয়োকোহামা, সাংহাই, বুসান)',
      'আঞ্চলিক ট্রান্সশিপমেন্ট হাব (কলম্বো, পোর্ট ক্লাং, তানজুং পেলেপাস)'
    ],
    color: '#0284c7',
    accentColor: '#0369a1'
  }
];
