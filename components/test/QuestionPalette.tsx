'use client';

import { CheckCircle2, Circle, LayoutGrid } from 'lucide-react';

interface QuestionPaletteProps {
  questions: any[];       // Questions for the CURRENT category
  currentIdx: number;     // Index within the current category
  answers: Record<number, string>;
  onJump: (index: number) => void;
  globalStats: {          // New prop for global tracking
    total: number;
    answered: number;
  };
}

export default function QuestionPalette({ 
  questions, 
  currentIdx, 
  answers, 
  onJump, 
  globalStats 
}: QuestionPaletteProps) {
  
  // Calculate percentage based on total questions across ALL categories
  const progressPercentage = (globalStats.answered / globalStats.total) * 100;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm sticky top-28">
      
      {/* Global Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Overall Progress</h3>
            <p className="text-sm font-black text-slate-900">
              {globalStats.answered} <span className="text-slate-400 font-medium">of</span> {globalStats.total}
            </p>
          </div>
          <span className="text-xl font-black text-emerald-600 tracking-tighter">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        {/* Unified Completion Bar */}
        <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Module Navigator */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-900 uppercase flex items-center gap-2">
            <LayoutGrid size={14} className="text-emerald-500" />
            Current Module
          </h4>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
            {questions.length} Qs
          </span>
        </div>

        {/* Question Grid for Active Category */}
        <div className="grid grid-cols-4 gap-3">
          {questions.map((q, i) => {
            const isAnswered = !!answers[q.id];
            const isActive = currentIdx === i;

            return (
              <button
                key={q.id}
                onClick={() => onJump(i)}
                className={`h-12 rounded-xl font-black text-sm transition-all duration-300 border-2 relative group flex items-center justify-center ${
                  isActive 
                  ? 'bg-slate-900 border-slate-900 text-white scale-110 shadow-xl shadow-slate-200 z-10' 
                  : isAnswered 
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:border-emerald-300' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                }`}
              >
                {i + 1}
                {isAnswered && !isActive && (
                  <div className="absolute -top-1 -right-1">
                    <CheckCircle2 size={14} className="text-emerald-500 fill-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modern Legend */}
      <div className="mt-8 pt-6 border-t border-slate-50 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-50 bg-slate-50/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[9px] font-black text-slate-500 uppercase">Solved</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-50 bg-slate-50/50">
            <div className="w-2 h-2 rounded-full bg-slate-900 shadow-[0_0_8px_rgba(15,23,42,0.3)]" />
            <span className="text-[9px] font-black text-slate-500 uppercase">Active</span>
          </div>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100/50 flex gap-3 items-start">
        <Circle size={14} className="text-amber-500 mt-1 shrink-0" fill="currentColor" />
        <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
          Session Security: Do not refresh or use the back button. Your data is encrypted and saved in real-time.
        </p>
      </div>
    </div>
  );
}