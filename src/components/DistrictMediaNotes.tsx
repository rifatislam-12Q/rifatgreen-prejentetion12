import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Camera,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Eye,
  X,
  FileText,
  Calendar,
  Tag,
  Download,
  Sparkles,
} from 'lucide-react';
import {
  DistrictNoteItem,
  getDistrictNotes,
  saveDistrictNote,
  deleteDistrictNote,
  compressImageFile,
} from '../utils/districtStorage';

interface DistrictMediaNotesProps {
  districtId: string;
  districtNameBn: string;
  districtNameEn: string;
  lang: 'en' | 'bn';
}

export const DistrictMediaNotes: React.FC<DistrictMediaNotesProps> = ({
  districtId,
  districtNameBn,
  districtNameEn,
  lang,
}) => {
  const [notes, setNotes] = useState<DistrictNoteItem[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<DistrictNoteItem['category']>('crop');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Fullscreen preview lightbox
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load notes on district change
  useEffect(() => {
    const loaded = getDistrictNotes(districtId);
    setNotes(loaded);
    setIsAddingNew(false);
    resetForm();
  }, [districtId]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('crop');
    setPreviewImage(null);
    setImageFileName('');
    setErrorMessage(null);
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন' : 'Please select an image file');
      return;
    }

    try {
      setIsProcessingImage(true);
      setErrorMessage(null);
      setImageFileName(file.name);
      const compressedDataUrl = await compressImageFile(file, 960, 960, 0.78);
      setPreviewImage(compressedDataUrl);
    } catch (err: any) {
      setErrorMessage(err.message || (lang === 'bn' ? 'ছবি প্রক্রিয়াকরণে সমস্যা হয়েছে' : 'Failed to process image'));
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim() && !previewImage) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে অন্তত একটি শিরোনাম, তথ্য অথবা ছবি প্রদান করুন।'
          : 'Please enter a title, details, or choose an image.'
      );
      return;
    }

    try {
      setErrorMessage(null);
      const saved = saveDistrictNote({
        districtId,
        districtNameBn,
        title: title.trim() || (lang === 'bn' ? `${districtNameBn} ফিল্ড নোট` : `${districtNameEn} Field Note`),
        content: content.trim(),
        imageUrl: previewImage || undefined,
        imageFileName: imageFileName || undefined,
        category,
      });

      setNotes((prev) => [saved, ...prev]);
      resetForm();
      setIsAddingNew(false);
      showNotification(
        lang === 'bn'
          ? '✓ তথ্য ও ছবি সফলভাবে সংরক্ষিত হয়েছে!'
          : '✓ Note and photo saved successfully!'
      );
    } catch (err: any) {
      setErrorMessage(err.message || 'সংরক্ষণ ব্যর্থ হয়েছে');
    }
  };

  const handleDelete = (noteId: string) => {
    const confirmText =
      lang === 'bn'
        ? 'আপনি কি নিশ্চিত যে এই ছবিটি ও তথ্য মুছে ফেলতে চান?'
        : 'Are you sure you want to delete this photo & note?';
    if (window.confirm(confirmText)) {
      const remaining = deleteDistrictNote(districtId, noteId);
      setNotes(remaining);
      showNotification(lang === 'bn' ? 'মুছে ফেলা হয়েছে' : 'Deleted successfully');
    }
  };

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3500);
  };

  const categoryLabels: Record<DistrictNoteItem['category'], { bn: string; en: string; color: string }> = {
    crop: { bn: 'ফসল ও ফলন', en: 'Crops & Yield', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    mill: { bn: 'প্রসেসিং ও মিল', en: 'Processing & Mill', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    market: { bn: 'বাজার ও আড়ত', en: 'Haat & Market', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    farmer: { bn: 'কৃষক তথ্য', en: 'Farmer Info', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    general: { bn: 'সাধারণ নোট', en: 'General Note', color: 'bg-stone-100 text-stone-800 border-stone-200' },
  };

  const filteredNotes = notes.filter((n) => {
    if (activeCategoryFilter === 'all') return true;
    return n.category === activeCategoryFilter;
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-3 bg-emerald-600 text-white text-xs sm:text-sm font-medium rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-white/80 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner & Quick Trigger */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-emerald-800/40">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {lang === 'bn'
                ? `${districtNameBn} জেলার ছবি ও তথ্য ভাণ্ডার`
                : `${districtNameEn} District Photo & Notes Vault`}
            </h3>
          </div>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            {lang === 'bn'
              ? 'এখানে আপনি মাঠপর্যায়ের ছবি, ফসলের নমুনা, স্থানীয় মিলের তথ্য বা নিজস্ব নোট আপলোড করে চিরতরে সংরক্ষণ করতে পারবেন।'
              : 'Upload and save real field photos, crop samples, mill data, or local notes for this district.'}
          </p>
        </div>

        <button
          onClick={() => {
            setIsAddingNew(!isAddingNew);
            if (!isAddingNew) {
              setErrorMessage(null);
            }
          }}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm ${
            isAddingNew
              ? 'bg-stone-700 text-white hover:bg-stone-600'
              : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold active:scale-95'
          }`}
        >
          {isAddingNew ? (
            <>
              <X className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ফর্ম বন্ধ করুন' : 'Close Form'}</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন ছবি ও তথ্য যোগ করুন' : 'Add Photo & Note'}</span>
            </>
          )}
        </button>
      </div>

      {/* Form: Add New Photo & Note */}
      {isAddingNew && (
        <form
          onSubmit={handleSave}
          className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/40 bg-white shadow-md space-y-3.5 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
            <h4 className="font-bold text-sm sm:text-base text-stone-800 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>
                {lang === 'bn' ? 'ছবি ও বিবরণ আপলোড ফর্ম' : 'Upload Photo & Note Details'}
              </span>
            </h4>
            <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
              {districtNameBn}
            </span>
          </div>

          {errorMessage && (
            <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Photo Dropzone / Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              {lang === 'bn' ? '১. ছবি নির্বাচন বা আপলোড করুন (ঐচ্ছিক):' : '1. Select / Take Photo (Optional):'}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            {previewImage ? (
              <div className="relative rounded-xl border border-stone-200 overflow-hidden bg-stone-100 group max-h-56">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-48 sm:h-56 object-cover object-center"
                />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-semibold text-stone-900 shadow cursor-pointer"
                  >
                    {lang === 'bn' ? 'ছবি পরিবর্তন' : 'Change Photo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setImageFileName('');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-semibold text-white shadow cursor-pointer"
                  >
                    {lang === 'bn' ? 'মুছে ফেলুন' : 'Remove'}
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-colors bg-emerald-50/30 hover:bg-emerald-50/60 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-950">
                    {lang === 'bn'
                      ? 'ছবি আপলোড করতে এখানে ক্লিক করুন'
                      : 'Click to upload image or take a photo'}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {lang === 'bn'
                      ? 'JPG, PNG বা WEBP (স্বয়ংক্রিয়ভাবে সাইজ অপ্টিমাইজ হবে)'
                      : 'JPG, PNG or WEBP (automatically optimized)'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {lang === 'bn' ? '২. শিরোনাম বা বিষয়:' : '2. Title or Subject:'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                lang === 'bn'
                  ? 'যেমন: কাটারিভোগ ধানের নমুনা, স্থানীয় লিচু বাগান, হিমাগার সাইট...'
                  : 'e.g. Rice sample photo, mango orchard, cold storage plan...'
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {lang === 'bn' ? '৩. ক্যাটাগরি:' : '3. Category:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {(
                [
                  { id: 'crop', bn: 'ফসল ও ফলন' },
                  { id: 'mill', bn: 'প্রসেসিং ও মিল' },
                  { id: 'market', bn: 'বাজার ও আড়ত' },
                  { id: 'farmer', bn: 'কৃষক তথ্য' },
                  { id: 'general', bn: 'সাধারণ নোট' },
                ] as const
              ).map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    category === cat.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {cat.bn}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Content / Notes Textarea */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {lang === 'bn' ? '৪. বিস্তারিত তথ্য বা বিবরণ:' : '4. Detailed Notes or Observations:'}
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                lang === 'bn'
                  ? 'কৃষকের মন্তব্য, মিলের জায়গা, যোগাযোগ নম্বর বা অন্য কোনো গুরুত্বপূর্ণ তথ্য এখানে লিখে রাখুন...'
                  : 'Write field notes, farmer feedback, local mill coordinates, contact numbers...'
              }
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                resetForm();
              }}
              className="px-3.5 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isProcessingImage}
              className="px-5 py-2 rounded-lg text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সংরক্ষণ করুন (Save)' : 'Save Note & Photo'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Categories Filter Tabs for Saved Notes */}
      {notes.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-stone-400 shrink-0">
            {lang === 'bn' ? 'ফিল্টার:' : 'Filter:'}
          </span>
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer shrink-0 transition-colors ${
              activeCategoryFilter === 'all'
                ? 'bg-stone-800 text-white font-semibold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'bn' ? 'সবগুলো' : 'All'} ({notes.length})
          </button>
          {(['crop', 'mill', 'market', 'farmer', 'general'] as const).map((catKey) => {
            const count = notes.filter((n) => n.category === catKey).length;
            if (count === 0) return null;
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategoryFilter(catKey)}
                className={`px-2.5 py-1 rounded-lg font-medium cursor-pointer shrink-0 transition-colors ${
                  activeCategoryFilter === catKey
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {categoryLabels[catKey].bn} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Saved Notes Feed / Gallery */}
      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <div className="p-8 rounded-2xl border border-dashed border-stone-200 bg-stone-50/70 text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-stone-800">
              {lang === 'bn'
                ? `${districtNameBn} জেলার জন্য কোনো নোট বা ছবি নেই`
                : `No notes or photos yet for ${districtNameEn}`}
            </h4>
            <p className="text-xs text-stone-500 max-w-sm">
              {lang === 'bn'
                ? 'উপরের "নতুন ছবি ও তথ্য যোগ করুন" বাটনে ক্লিক করে আপনার মাঠপর্যায়ের তথ্য বা ফসলের ছবি আপলোড করে রাখুন।'
                : 'Click "Add Photo & Note" above to capture and preserve your agricultural field records.'}
            </p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="mt-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ছবি ও তথ্য আপলোড করুন' : 'Upload Photo & Info'}</span>
            </button>
          </div>
        ) : (
          filteredNotes.map((item) => (
            <div
              key={item.id}
              className="p-3.5 sm:p-4 rounded-xl border border-stone-200 bg-white shadow-xs hover:border-emerald-300 transition-all flex flex-col gap-3"
            >
              {/* Note Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                        categoryLabels[item.category].color
                      }`}
                    >
                      {categoryLabels[item.category].bn}
                    </span>
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 inline" />
                      {item.formattedDateBn}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {item.imageUrl && (
                    <button
                      onClick={() => setLightboxImage({ url: item.imageUrl!, title: item.title })}
                      title={lang === 'bn' ? 'বড় করে দেখুন' : 'View Full Image'}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-stone-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Photo Display if attached */}
              {item.imageUrl && (
                <div
                  onClick={() => setLightboxImage({ url: item.imageUrl!, title: item.title })}
                  className="relative rounded-lg overflow-hidden border border-stone-100 cursor-pointer group bg-stone-100 max-h-64 sm:max-h-72"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-44 sm:h-56 object-cover object-center group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-stone-900/70 text-white text-[11px] flex items-center gap-1 backdrop-blur-xs">
                    <Eye className="w-3 h-3" />
                    <span>{lang === 'bn' ? 'বড় করে দেখুন' : 'Click to Enlarge'}</span>
                  </div>
                </div>
              )}

              {/* Note Content Text */}
              {item.content && (
                <p className="text-xs sm:text-sm text-stone-700 whitespace-pre-wrap leading-relaxed bg-stone-50/60 p-2.5 rounded-lg border border-stone-100">
                  {item.content}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Lightbox / Modal for Enlarge Image */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800">
              <span className="font-semibold text-xs sm:text-sm truncate pr-2 text-stone-200">
                {lightboxImage.title}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  download={`${districtId}_photo.jpg`}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                  title={lang === 'bn' ? 'ডাউনলোড' : 'Download'}
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-2 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
