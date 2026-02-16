'use client';

import { GraduationCap, Calendar, FileText, CheckCircle2, Loader2 } from 'lucide-react';

// Types define kiye taake 'any' wala error na aaye
interface EducationEntry {
  level: string;
  title: string;
  startDate: string;
  endDate: string;
  file: File | null;
}

interface Props {
  selectedLevel: string;
  levels: string[];
  onLevelSelect: (level: string) => void;
  entries: EducationEntry[];
  onEntryChange: (index: number, field: string, value: string) => void;
  onFileChange: (index: number, file: File) => void;
  onBack: () => void;
  onFinish: () => void;
  loading?: boolean; // Loading state add kiya
}

export default function EducationStep({ 
  selectedLevel, 
  levels, 
  onLevelSelect, 
  entries, 
  onEntryChange, 
  onFileChange, 
  onBack, 
  onFinish,
  loading = false // Default value
}: Props) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Level Selection Header */}
      <div className="space-y-4">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-center block">
          Select Your Highest Qualification
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {levels.map((lvl) => (
            <button 
              key={lvl} 
              type="button" 
              onClick={() => onLevelSelect(lvl)}
              className={`py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                selectedLevel === lvl 
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-200' 
                  : 'bg-white border-slate-100 text-slate-500 hover:border-emerald-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Forms */}
      <div className="space-y-6">
        {entries.map((entry, idx) => (
          <div key={idx} className="relative p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 text-emerald-600 font-black uppercase text-xs">
              <CheckCircle2 size={14} /> Level {idx + 1}: {entry.level}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Degree Title */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <GraduationCap size={14}/> Degree Title
                </label>
                <input 
                  required 
                  value={entry.title} 
                  onChange={(e) => onEntryChange(idx, 'title', e.target.value)} 
                  placeholder="e.g. BS Computer Science" 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" 
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <Calendar size={14}/> Start Date
                </label>
                <input 
                  type="date" 
                  required 
                  value={entry.startDate} 
                  onChange={(e) => onEntryChange(idx, 'startDate', e.target.value)} 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none" 
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <Calendar size={14}/> End Date
                </label>
                <input 
                  type="date" 
                  required 
                  value={entry.endDate} 
                  onChange={(e) => onEntryChange(idx, 'endDate', e.target.value)} 
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none" 
                />
              </div>

              {/* File Upload */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                  <FileText size={14}/> Certificate (PDF/JPG)
                </label>
                <input 
                  type="file" 
                  required 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  onChange={(e) => onFileChange(idx, e.target.files?.[0] || null!)} 
                  className="w-full px-4 py-2 bg-white border border-dashed border-slate-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center pt-6">
        <button 
          type="button" 
          onClick={onBack} 
          className="px-8 py-3.5 font-bold text-slate-400 hover:text-slate-900 transition-colors"
        >
          ← Go Back
        </button>

        {/* Update Button Logic */}
        <button 
          type="button" // Zaroori hai taake ye form submit na samjhe
          onClick={onFinish} 
          disabled={entries.length === 0 || loading} // Loading ke waqt button disable
          className="px-10 py-3.5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-100 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Processing...
            </>
          ) : (
            "Complete Registration"
          )}
        </button>
      </div>
    </div>
  );
}