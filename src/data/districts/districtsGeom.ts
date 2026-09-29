// Geographic coordinate centers and SVG boundary paths for all 64 districts of Bangladesh
// SVG ViewBox: 0 0 900 1050

export interface DistrictGeom {
  id: string;
  name: string;
  nameBn: string;
  division: 'Rangpur' | 'Rajshahi' | 'Mymensingh' | 'Sylhet' | 'Dhaka' | 'Barishal' | 'Chattogram' | 'Khulna';
  center: { x: number; y: number };
  path: string;
}

export const DISTRICTS_GEOM: DistrictGeom[] = [
  // =================== RANGPUR DIVISION (8) ===================
  {
    id: 'panchagarh',
    name: 'Panchagarh',
    nameBn: 'পঞ্চগড়',
    division: 'Rangpur',
    center: { x: 145, y: 110 },
    path: 'M 130 70 L 175 75 L 180 125 L 155 155 L 120 145 L 110 100 Z'
  },
  {
    id: 'thakurgaon',
    name: 'Thakurgaon',
    nameBn: 'ঠাকুরগাঁও',
    division: 'Rangpur',
    center: { x: 130, y: 175 },
    path: 'M 110 145 L 155 155 L 150 205 L 115 210 L 95 170 Z'
  },
  {
    id: 'dinajpur',
    name: 'Dinajpur',
    nameBn: 'দিনাজপুর',
    division: 'Rangpur',
    center: { x: 165, y: 240 },
    path: 'M 155 155 L 180 160 L 205 210 L 195 285 L 150 300 L 130 250 L 150 205 Z'
  },
  {
    id: 'nilphamari',
    name: 'Nilphamari',
    nameBn: 'নীলফামারী',
    division: 'Rangpur',
    center: { x: 215, y: 175 },
    path: 'M 180 125 L 245 135 L 250 185 L 205 210 L 180 160 Z'
  },
  {
    id: 'lalmonirhat',
    name: 'Lalmonirhat',
    nameBn: 'লালমনিরহাট',
    division: 'Rangpur',
    center: { x: 285, y: 165 },
    path: 'M 245 135 L 305 130 L 330 180 L 270 195 L 250 185 Z'
  },
  {
    id: 'rangpur',
    name: 'Rangpur',
    nameBn: 'রংপুর',
    division: 'Rangpur',
    center: { x: 255, y: 225 },
    path: 'M 205 210 L 270 195 L 305 230 L 285 275 L 230 270 L 210 240 Z'
  },
  {
    id: 'kurigram',
    name: 'Kurigram',
    nameBn: 'কুড়িগ্রাম',
    division: 'Rangpur',
    center: { x: 335, y: 215 },
    path: 'M 305 130 L 350 160 L 375 240 L 335 275 L 305 230 L 330 180 Z'
  },
  {
    id: 'gaibandha',
    name: 'Gaibandha',
    nameBn: 'গাইবান্ধা',
    division: 'Rangpur',
    center: { x: 295, y: 295 },
    path: 'M 285 275 L 335 275 L 340 335 L 270 340 L 265 295 Z'
  },

  // =================== RAJSHAHI DIVISION (8) ===================
  {
    id: 'joypurhat',
    name: 'Joypurhat',
    nameBn: 'জয়পুরহাট',
    division: 'Rajshahi',
    center: { x: 220, y: 310 },
    path: 'M 195 285 L 245 280 L 255 330 L 205 340 L 190 315 Z'
  },
  {
    id: 'bogra',
    name: 'Bogura',
    nameBn: 'বগুড়া',
    division: 'Rajshahi',
    center: { x: 285, y: 360 },
    path: 'M 255 330 L 325 330 L 340 385 L 280 405 L 245 375 Z'
  },
  {
    id: 'naogaon',
    name: 'Naogaon',
    nameBn: 'নওগাঁ',
    division: 'Rajshahi',
    center: { x: 185, y: 365 },
    path: 'M 150 300 L 205 340 L 225 395 L 165 415 L 135 360 Z'
  },
  {
    id: 'chapai_nawabganj',
    name: 'Chapai Nawabganj',
    nameBn: 'চাঁপাইনবাবগঞ্জ',
    division: 'Rajshahi',
    center: { x: 105, y: 405 },
    path: 'M 85 365 L 135 360 L 140 435 L 80 430 Z'
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    nameBn: 'রাজশাহী',
    division: 'Rajshahi',
    center: { x: 155, y: 445 },
    path: 'M 140 435 L 185 415 L 210 460 L 145 480 L 125 450 Z'
  },
  {
    id: 'natore',
    name: 'Natore',
    nameBn: 'নাটোর',
    division: 'Rajshahi',
    center: { x: 225, y: 435 },
    path: 'M 225 395 L 270 410 L 265 470 L 210 460 Z'
  },
  {
    id: 'sirajganj',
    name: 'Sirajganj',
    nameBn: 'সিরাজগঞ্জ',
    division: 'Rajshahi',
    center: { x: 320, y: 425 },
    path: 'M 280 405 L 345 395 L 360 460 L 295 475 L 270 435 Z'
  },
  {
    id: 'pabna',
    name: 'Pabna',
    nameBn: 'পাবনা',
    division: 'Rajshahi',
    center: { x: 255, y: 495 },
    path: 'M 210 460 L 265 470 L 315 475 L 305 525 L 220 520 Z'
  },

  // =================== MYMENSINGH DIVISION (4) ===================
  {
    id: 'jamalpur',
    name: 'Jamalpur',
    nameBn: 'জামালপুর',
    division: 'Mymensingh',
    center: { x: 380, y: 350 },
    path: 'M 345 315 L 395 300 L 420 375 L 370 395 L 340 370 Z'
  },
  {
    id: 'sherpur',
    name: 'Sherpur',
    nameBn: 'শেরপুর',
    division: 'Mymensingh',
    center: { x: 415, y: 295 },
    path: 'M 395 270 L 450 270 L 450 325 L 400 325 Z'
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    nameBn: 'ময়মনসিংহ',
    division: 'Mymensingh',
    center: { x: 450, y: 370 },
    path: 'M 420 325 L 485 330 L 495 405 L 420 410 L 405 375 Z'
  },
  {
    id: 'netrokona',
    name: 'Netrokona',
    nameBn: 'নেত্রকোণা',
    division: 'Mymensingh',
    center: { x: 515, y: 340 },
    path: 'M 485 305 L 560 315 L 555 375 L 495 370 Z'
  },

  // =================== SYLHET DIVISION (4) ===================
  {
    id: 'sunamganj',
    name: 'Sunamganj',
    nameBn: 'সুনামগঞ্জ',
    division: 'Sylhet',
    center: { x: 605, y: 315 },
    path: 'M 560 295 L 670 295 L 665 355 L 565 365 Z'
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    nameBn: 'সিলেট',
    division: 'Sylhet',
    center: { x: 710, y: 335 },
    path: 'M 670 295 L 775 320 L 760 385 L 675 375 L 665 345 Z'
  },
  {
    id: 'moulvibazar',
    name: 'Moulvibazar',
    nameBn: 'মৌলভীবাজার',
    division: 'Sylhet',
    center: { x: 700, y: 415 },
    path: 'M 675 375 L 755 385 L 745 465 L 670 455 Z'
  },
  {
    id: 'habiganj',
    name: 'Habiganj',
    nameBn: 'হবিগঞ্জ',
    division: 'Sylhet',
    center: { x: 625, y: 425 },
    path: 'M 585 375 L 665 370 L 665 470 L 595 465 Z'
  },

  // =================== DHAKA DIVISION (13) ===================
  {
    id: 'dhaka',
    name: 'Dhaka',
    nameBn: 'ঢাকা',
    division: 'Dhaka',
    center: { x: 440, y: 510 },
    path: 'M 415 485 L 470 480 L 475 535 L 415 540 Z'
  },
  {
    id: 'gazipur',
    name: 'Gazipur',
    nameBn: 'গাজীপুর',
    division: 'Dhaka',
    center: { x: 445, y: 450 },
    path: 'M 415 425 L 485 420 L 480 480 L 420 480 Z'
  },
  {
    id: 'narayanganj',
    name: 'Narayanganj',
    nameBn: 'নারায়ণগঞ্জ',
    division: 'Dhaka',
    center: { x: 465, y: 545 },
    path: 'M 445 525 L 485 525 L 490 570 L 450 570 Z'
  },
  {
    id: 'narsingdi',
    name: 'Narsingdi',
    nameBn: 'নরসিংদী',
    division: 'Dhaka',
    center: { x: 505, y: 480 },
    path: 'M 475 445 L 535 440 L 545 500 L 485 510 Z'
  },
  {
    id: 'tangail',
    name: 'Tangail',
    nameBn: 'টাঙ্গাইল',
    division: 'Dhaka',
    center: { x: 365, y: 445 },
    path: 'M 335 410 L 415 415 L 415 480 L 350 490 L 335 450 Z'
  },
  {
    id: 'manikganj',
    name: 'Manikganj',
    nameBn: 'মানিকগঞ্জ',
    division: 'Dhaka',
    center: { x: 375, y: 505 },
    path: 'M 350 480 L 415 480 L 415 535 L 355 530 Z'
  },
  {
    id: 'munshiganj',
    name: 'Munshiganj',
    nameBn: 'মুন্সীগঞ্জ',
    division: 'Dhaka',
    center: { x: 460, y: 585 },
    path: 'M 430 555 L 495 555 L 500 610 L 435 615 Z'
  },
  {
    id: 'faridpur',
    name: 'Faridpur',
    nameBn: 'ফরিদপুর',
    division: 'Dhaka',
    center: { x: 350, y: 565 },
    path: 'M 315 530 L 390 535 L 390 605 L 320 600 Z'
  },
  {
    id: 'rajbari',
    name: 'Rajbari',
    nameBn: 'রাজবাড়ী',
    division: 'Dhaka',
    center: { x: 305, y: 535 },
    path: 'M 270 515 L 335 515 L 335 560 L 275 555 Z'
  },
  {
    id: 'gopalganj',
    name: 'Gopalganj',
    nameBn: 'গোপালগঞ্জ',
    division: 'Dhaka',
    center: { x: 345, y: 645 },
    path: 'M 315 605 L 380 610 L 375 680 L 320 675 Z'
  },
  {
    id: 'madaripur',
    name: 'Madaripur',
    nameBn: 'মাদারীপুর',
    division: 'Dhaka',
    center: { x: 405, y: 625 },
    path: 'M 380 595 L 435 600 L 435 655 L 380 650 Z'
  },
  {
    id: 'shariatpur',
    name: 'Shariatpur',
    nameBn: 'শরীয়তপুর',
    division: 'Dhaka',
    center: { x: 445, y: 630 },
    path: 'M 425 600 L 475 600 L 475 665 L 425 660 Z'
  },
  {
    id: 'kishoreganj',
    name: 'Kishoreganj',
    nameBn: 'কিশোরগঞ্জ',
    division: 'Dhaka',
    center: { x: 535, y: 430 },
    path: 'M 505 385 L 575 390 L 575 460 L 515 465 Z'
  },

  // =================== KHULNA DIVISION (10) ===================
  {
    id: 'kushtia',
    name: 'Kushtia',
    nameBn: 'কুষ্টিয়া',
    division: 'Khulna',
    center: { x: 215, y: 525 },
    path: 'M 185 500 L 245 495 L 255 550 L 195 560 Z'
  },
  {
    id: 'meherpur',
    name: 'Meherpur',
    nameBn: 'মেহেরপুর',
    division: 'Khulna',
    center: { x: 165, y: 535 },
    path: 'M 140 510 L 190 510 L 185 570 L 140 560 Z'
  },
  {
    id: 'chuadanga',
    name: 'Chuadanga',
    nameBn: 'চুয়াডাঙ্গা',
    division: 'Khulna',
    center: { x: 175, y: 585 },
    path: 'M 145 565 L 210 560 L 205 615 L 145 610 Z'
  },
  {
    id: 'jhenaidah',
    name: 'Jhenaidah',
    nameBn: 'ঝিনাইদহ',
    division: 'Khulna',
    center: { x: 235, y: 590 },
    path: 'M 205 560 L 265 560 L 265 625 L 205 620 Z'
  },
  {
    id: 'magura',
    name: 'Magura',
    nameBn: 'মাগুরা',
    division: 'Khulna',
    center: { x: 285, y: 595 },
    path: 'M 265 565 L 320 570 L 315 630 L 265 625 Z'
  },
  {
    id: 'jashore',
    name: 'Jashore',
    nameBn: 'যশোর',
    division: 'Khulna',
    center: { x: 225, y: 660 },
    path: 'M 180 625 L 270 625 L 265 690 L 185 685 Z'
  },
  {
    id: 'narail',
    name: 'Narail',
    nameBn: 'নড়াইল',
    division: 'Khulna',
    center: { x: 290, y: 665 },
    path: 'M 265 635 L 325 635 L 320 690 L 265 690 Z'
  },
  {
    id: 'khulna',
    name: 'Khulna',
    nameBn: 'খুলনা',
    division: 'Khulna',
    center: { x: 265, y: 735 },
    path: 'M 235 690 L 305 690 L 305 795 L 240 790 Z'
  },
  {
    id: 'bagerhat',
    name: 'Bagerhat',
    nameBn: 'বাগেরহাট',
    division: 'Khulna',
    center: { x: 335, y: 755 },
    path: 'M 305 690 L 375 700 L 370 820 L 305 815 Z'
  },
  {
    id: 'satkhira',
    name: 'Satkhira',
    nameBn: 'সাতক্ষীরা',
    division: 'Khulna',
    center: { x: 195, y: 745 },
    path: 'M 160 685 L 235 690 L 240 825 L 175 815 Z'
  },

  // =================== BARISHAL DIVISION (6) ===================
  {
    id: 'barishal',
    name: 'Barishal',
    nameBn: 'বরিশাল',
    division: 'Barishal',
    center: { x: 440, y: 700 },
    path: 'M 405 660 L 475 660 L 470 735 L 405 730 Z'
  },
  {
    id: 'jhalokati',
    name: 'Jhalokati',
    nameBn: 'ঝালকাঠি',
    division: 'Barishal',
    center: { x: 395, y: 725 },
    path: 'M 370 695 L 415 695 L 415 755 L 370 750 Z'
  },
  {
    id: 'pirojpur',
    name: 'Pirojpur',
    nameBn: 'পিরোজপুর',
    division: 'Barishal',
    center: { x: 365, y: 715 },
    path: 'M 345 680 L 385 685 L 380 755 L 340 745 Z'
  },
  {
    id: 'bhola',
    name: 'Bhola',
    nameBn: 'ভোলা',
    division: 'Barishal',
    center: { x: 495, y: 730 },
    path: 'M 475 675 L 525 680 L 520 810 L 470 795 Z'
  },
  {
    id: 'patuakhali',
    name: 'Patuakhali',
    nameBn: 'পটুয়াখালী',
    division: 'Barishal',
    center: { x: 435, y: 785 },
    path: 'M 405 735 L 470 740 L 460 840 L 400 830 Z'
  },
  {
    id: 'barguna',
    name: 'Barguna',
    nameBn: 'বরগুনা',
    division: 'Barishal',
    center: { x: 380, y: 795 },
    path: 'M 355 755 L 405 755 L 400 840 L 350 830 Z'
  },

  // =================== CHATTOGRAM DIVISION (11) ===================
  {
    id: 'brahmanbaria',
    name: 'Brahmanbaria',
    nameBn: 'ব্রাহ্মণবাড়িয়া',
    division: 'Chattogram',
    center: { x: 575, y: 505 },
    path: 'M 545 470 L 615 470 L 610 540 L 545 540 Z'
  },
  {
    id: 'cumilla',
    name: 'Cumilla',
    nameBn: 'কুমিল্লা',
    division: 'Chattogram',
    center: { x: 585, y: 575 },
    path: 'M 550 540 L 635 540 L 630 625 L 550 620 Z'
  },
  {
    id: 'chandpur',
    name: 'Chandpur',
    nameBn: 'চাঁদপুর',
    division: 'Chattogram',
    center: { x: 515, y: 615 },
    path: 'M 485 580 L 545 585 L 540 655 L 485 645 Z'
  },
  {
    id: 'lakshmipur',
    name: 'Lakshmipur',
    nameBn: 'লক্ষ্মীপুর',
    division: 'Chattogram',
    center: { x: 535, y: 680 },
    path: 'M 505 645 L 565 650 L 560 715 L 505 705 Z'
  },
  {
    id: 'noakhali',
    name: 'Noakhali',
    nameBn: 'নোয়াখালী',
    division: 'Chattogram',
    center: { x: 585, y: 675 },
    path: 'M 560 635 L 635 640 L 630 735 L 560 725 Z'
  },
  {
    id: 'feni',
    name: 'Feni',
    nameBn: 'ফেনী',
    division: 'Chattogram',
    center: { x: 635, y: 645 },
    path: 'M 615 615 L 665 615 L 665 685 L 615 675 Z'
  },
  {
    id: 'chattogram',
    name: 'Chattogram',
    nameBn: 'চট্টগ্রাম',
    division: 'Chattogram',
    center: { x: 670, y: 725 },
    path: 'M 645 665 L 705 665 L 700 815 L 640 790 Z'
  },
  {
    id: 'coxs_bazar',
    name: "Cox's Bazar",
    nameBn: 'কক্সবাজার',
    division: 'Chattogram',
    center: { x: 710, y: 865 },
    path: 'M 680 810 L 730 815 L 720 955 L 675 925 Z'
  },
  {
    id: 'khagrachhari',
    name: 'Khagrachhari',
    nameBn: 'খাগড়াছড়ি',
    division: 'Chattogram',
    center: { x: 715, y: 575 },
    path: 'M 675 515 L 755 520 L 750 635 L 675 625 Z'
  },
  {
    id: 'rangamati',
    name: 'Rangamati',
    nameBn: 'রাঙ্গামাটি',
    division: 'Chattogram',
    center: { x: 775, y: 655 },
    path: 'M 740 575 L 825 580 L 810 745 L 735 730 Z'
  },
  {
    id: 'bandarban',
    name: 'Bandarban',
    nameBn: 'বান্দরবান',
    division: 'Chattogram',
    center: { x: 770, y: 795 },
    path: 'M 730 735 L 820 745 L 800 885 L 725 865 Z'
  }
];
