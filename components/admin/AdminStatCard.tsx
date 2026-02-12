// components/admin/AdminStatCard.tsx
'use client';

import { ReactNode } from 'react';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'slate';
}

const colorConfigs = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  slate: 'bg-slate-50 text-slate-600 border-slate-100',
};

export default function AdminStatCard({ title, value, icon, trend, color }: AdminStatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        {/* Icon Container with Dynamic Colors */}
        <div className={`p-3 rounded-2xl border ${colorConfigs[color]}`}>
          {icon}
        </div>
        
        {/* Trend Indicator (Optional) */}
        {trend && (
          <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>

      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {value}
        </h3>
      </div>
      
      {/* Decorative Progress Accent */}
      <div className="mt-4 w-full h-1 bg-slate-50 rounded-full overflow-hidden">
        <div className={`h-full w-2/3 rounded-full opacity-40 ${
          color === 'blue' ? 'bg-blue-500' : 
          color === 'emerald' ? 'bg-emerald-500' : 
          color === 'amber' ? 'bg-amber-500' : 
          'bg-slate-500'
        }`} />
      </div>
    </div>
  );
}