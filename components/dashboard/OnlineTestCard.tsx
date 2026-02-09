'use client';

import { 
  PlayCircle, 
  Clock, 
  HelpCircle, 
  AlertCircle, 
  ChevronRight,
  Info,
  LayoutGrid
} from "lucide-react";

type OnlineTest = {
  id: string | number;
  title: string;
  department: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number;
  deadline: string;
  instructions: string[];
};

type OnlineTestCardProps = {
  test: OnlineTest;
  onStart: (id: string | number) => void;
};

export default function OnlineTestCard({ test, onStart }: OnlineTestCardProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <LayoutGrid size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Available Assessments</h2>
            <p className="text-sm text-slate-500 font-medium">Select a test to begin your examination</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</span>
          <span className="text-sm font-black text-emerald-600">01</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Side: Test Identity & Details */}
          <div className="flex-1 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                Live Now
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter italic">
                Expires: {test.deadline}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
              {test.title}
            </h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-6">
              {test.department}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Duration</span>
                </div>
                <p className="text-sm font-bold text-slate-700">{test.durationMinutes} Minutes</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <HelpCircle size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Questions</span>
                </div>
                <p className="text-sm font-bold text-slate-700">{test.totalQuestions} MCQs</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <AlertCircle size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Passing</span>
                </div>
                <p className="text-sm font-bold text-slate-700">{test.passingPercentage}%</p>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Instructions & Action */}
          <div className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100 p-8 flex flex-col justify-between">
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Info size={14} className="text-blue-500" />
                Quick Rules
              </h4>
              <ul className="space-y-2">
                {test.instructions.map((item, i) => (
                  <li key={i} className="text-[11px] font-medium text-slate-500 flex items-start gap-2 leading-relaxed">
                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => onStart(test.id)}
              className="w-full group/btn flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              <PlayCircle size={20} className="group-hover/btn:scale-110 transition-transform" />
              START TEST
              <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}