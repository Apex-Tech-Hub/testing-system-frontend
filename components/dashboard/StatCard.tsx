'use client';

import { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  variant: "emerald" | "blue" | "orange" | "purple";
  trend?: {
    value: number;
    isUp: boolean;
  };
};

const VARIANTS = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    bar: "bg-emerald-600",
    glow: "group-hover:shadow-emerald-900/5",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    bar: "bg-blue-600",
    glow: "group-hover:shadow-blue-900/5",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    bar: "bg-orange-600",
    glow: "group-hover:shadow-orange-900/5",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",    bar: "bg-purple-600",
    glow: "group-hover:shadow-purple-900/5",
  },
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  variant,
  trend,
}: StatCardProps) {
  const style = VARIANTS[variant];

  return (
    <div className={`group relative bg-white rounded-3xl p-6 border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${style.glow}`}>
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          {/* Top Row: Label and responsive Icon */}
          <div className="flex items-center gap-3">
            <div className={`${style.bg} ${style.icon} p-2.5 rounded-xl sm:p-4 sm:rounded-2xl transition-all duration-500 group-hover:rotate-12`}>
              <Icon 
                strokeWidth={2.5} 
                className="w-4 h-4 sm:w-7 sm:h-7 transition-all duration-500" 
              />
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              {label}
            </p>
          </div>

          {/* Value and Trend */}
          <div className="flex items-baseline gap-2">
            <h4 className="text-3xl font-black text-slate-900 tracking-tight">
              {value}
            </h4>
            
            {trend && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                trend.isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {trend.isUp ? '↑' : '↓'} {trend.value}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Progress Bar Decoration */}
      <div className="absolute bottom-0 left-6 right-6 h-1 bg-slate-50 rounded-t-full overflow-hidden">
         <div className={`h-full w-1/3 rounded-full ${style.bar} opacity-30`} />
      </div>
    </div>
  );
}