/**
 * Local storage utility for managing district-specific photos, field notes, and documents
 */

export interface DistrictNoteItem {
  id: string;
  districtId: string;
  districtNameBn: string;
  title: string;
  content: string;
  imageUrl?: string; // base64 compressed data URL
  imageFileName?: string;
  category: 'crop' | 'mill' | 'market' | 'farmer' | 'general';
  createdAt: string;
  formattedDateBn: string;
}

const STORAGE_KEY_PREFIX = 'greenshop_district_media_';

// Initial default seed notes for major districts so user sees immediate interactive examples
const SEED_NOTES: Record<string, DistrictNoteItem[]> = {
  dinajpur: [
    {
      id: 'seed-dinajpur-1',
      districtId: 'dinajpur',
      districtNameBn: 'দিনাজপুর',
      title: 'কাটারিভোগ ও সুগন্ধি চাল প্রক্রিয়াকরণ চাতাল',
      content: 'দিনাজপুরের চিরিরবন্দর ও সদর এলাকায় কাটারিভোগ ও চিনিগুঁড়া চালের মান অত্যন্ত উৎকৃষ্ট। অটোমেটিক গ্রেডিং ও ভ্যাকুয়াম প্যাকেজিং মিল স্থাপন করলে সরাসরি ঢাকা ও বিদেশে রপ্তানি সম্ভব।',
      category: 'crop',
      createdAt: new Date().toISOString(),
      formattedDateBn: '২৮ সেপ্টেম্বর ২০২৬',
    }
  ],
  pabna: [
    {
      id: 'seed-pabna-1',
      districtId: 'pabna',
      districtNameBn: 'পাবনা',
      title: 'ঈশ্বরদী লিচু বাজার ও হিমাগার সাইট পরিদর্শন',
      content: 'ঈশ্বরদীতে বোম্বাই ও চায়না-৩ জাতের লিচু প্রচুর ফলে। ফসল তোলার সময় প্রতিদিন ২০-২৫% লিচু পচে যায়। পাল্প প্রসেসিং ইউনিট ও রেফ্রিজারেটেড পরিবহন ব্যবস্থার প্রস্তাব করা হলো।',
      category: 'market',
      createdAt: new Date().toISOString(),
      formattedDateBn: '২৮ সেপ্টেম্বর ২০২৬',
    }
  ],
  panchagarh: [
    {
      id: 'seed-panchagarh-1',
      districtId: 'panchagarh',
      districtNameBn: 'পঞ্চগড়',
      title: 'ভুট্টা ও গম সঞ্চয় সাইলো এবং ফ্লাওয়ার মিল প্ল্যান',
      content: 'বোদা ও তেঁতুলিয়া এলাকায় ভুট্টা ও গম উৎপাদন বাড়ছে। পোল্ট্রি ফিড ও আটা মিলের সাথে সরাসরি হাব যোগাযোগ নিশ্চিত করা প্রয়োজন।',
      category: 'mill',
      createdAt: new Date().toISOString(),
      formattedDateBn: '২৮ সেপ্টেম্বর ২০২৬',
    }
  ],
};

function formatBengaliDate(date: Date): string {
  const bnMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const day = date.getDate().toString().split('').map(d => bnDigits[Number(d)]).join('');
  const year = date.getFullYear().toString().split('').map(d => bnDigits[Number(d)]).join('');
  const month = bnMonths[date.getMonth()];
  return `${day} ${month} ${year}`;
}

export function getDistrictNotes(districtId: string): DistrictNoteItem[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${districtId}`);
    if (raw) {
      return JSON.parse(raw);
    }
    // Check seed notes if not modified yet
    if (SEED_NOTES[districtId]) {
      return SEED_NOTES[districtId];
    }
    return [];
  } catch (err) {
    console.error('Failed to load notes from localStorage', err);
    return SEED_NOTES[districtId] || [];
  }
}

export function saveDistrictNote(
  noteData: Omit<DistrictNoteItem, 'id' | 'createdAt' | 'formattedDateBn'>
): DistrictNoteItem {
  const now = new Date();
  const newNote: DistrictNoteItem = {
    ...noteData,
    id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    createdAt: now.toISOString(),
    formattedDateBn: formatBengaliDate(now),
  };

  const existingNotes = getDistrictNotes(noteData.districtId);
  const updated = [newNote, ...existingNotes];

  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${noteData.districtId}`,
      JSON.stringify(updated)
    );
  } catch (err) {
    console.error('LocalStorage save error (likely quota):', err);
    throw new Error('মেমোরি সীমা পূর্ণ হয়েছে! অনুগ্রহ করে অপ্রয়োজনীয় বড় ছবি মুছে নতুন ছবি আপলোড করুন।');
  }

  return newNote;
}

export function deleteDistrictNote(districtId: string, noteId: string): DistrictNoteItem[] {
  const existingNotes = getDistrictNotes(districtId);
  const updated = existingNotes.filter((item) => item.id !== noteId);
  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${districtId}`,
      JSON.stringify(updated)
    );
  } catch (err) {
    console.error('Failed to delete note from localStorage', err);
  }
  return updated;
}

export function getDistrictNotesCount(districtId: string): number {
  return getDistrictNotes(districtId).length;
}

/**
 * Resizes and compresses image via HTML Canvas to avoid exceeding LocalStorage quotas.
 */
export function compressImageFile(file: File, maxWidth = 960, maxHeight = 960, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp if supported or jpeg
        try {
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('ছবি লোড করতে সমস্যা হয়েছে'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('ফাইল পড়তে সমস্যা হয়েছে'));
    reader.readAsDataURL(file);
  });
}
