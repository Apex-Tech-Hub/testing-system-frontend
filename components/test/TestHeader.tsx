'use client';

import { useState, useEffect } from 'react';
import { Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

interface TestHeaderProps {
  duration: number; // in seconds
  onTimeout: () => void;
}

export default function TestHeader({ duration, onTimeout }: TestHeaderProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300; // 5 minutes

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Branding/Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight leading-none">
              BTS Assessment Portal
            </h1>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
              Live Examination Session
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-4">
          {isLowTime && (
            <div className="hidden md:flex items-center gap-2 text-rose-600 animate-pulse">
              <AlertTriangle size={16} />
              <span className="text-[10px] font-black uppercase">Time is running out!</span>
            </div>
          )}
          
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 transition-all duration-300 ${
            isLowTime 
            ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-lg shadow-rose-100' 
            : 'bg-slate-50 border-slate-100 text-slate-900'
          }`}>
            <Clock size={20} className={isLowTime ? 'animate-spin-slow' : ''} />
            <span className="text-xl font-black tabular-nums tracking-tighter">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}