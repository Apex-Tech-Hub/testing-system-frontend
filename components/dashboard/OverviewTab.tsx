'use client';

import { LucideIcon, Search, FileText, Award, Calendar, Download } from "lucide-react";

type Activity = {
  id: string | number;
  title: string;
  description: string;
  date: string;
  color: "blue" | "orange" | "green";
  icon: LucideIcon;
};

type OverviewTabProps = {
  recentActivities: Activity[];
  setActiveTab: (tab: "overview" | "available" | "applied" | "results" | "profile") => void;
};

// Configuration for consistent styling
const COLOR_VARIANTS = {
  blue: {
    bg: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-600",
    text: "text-blue-700",
  },
  orange: {
    bg: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-600",
    text: "text-orange-700",
  },
  green: {
    bg: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-600",
    text: "text-emerald-700",
  },
};

export default function OverviewTab({ recentActivities, setActiveTab }: OverviewTabProps) {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      
      {/* 1. Recent Activity Section */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View All
          </button>
        </div>
        <div className="grid gap-3">
          {recentActivities.map((activity) => {
            const variant = COLOR_VARIANTS[activity.color];
            return (
              <div 
                key={activity.id} 
                className={`flex items-center p-4 rounded-xl border transition-all hover:shadow-sm ${variant.bg}`}
              >
                <div className={`${variant.iconBg} p-2.5 rounded-lg shadow-sm mr-4 text-white`}>
                  <activity.icon size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm md:text-base">{activity.title}</p>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5">{activity.description}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {activity.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Quick Actions Section */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-5">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ActionButton 
            onClick={() => setActiveTab("available")}
            icon={Search}
            label="Browse Jobs"
            description="Find new openings"
            colorClass="text-emerald-600 border-emerald-100 hover:bg-emerald-50"
          />
          <ActionButton 
            onClick={() => setActiveTab("applied")}
            icon={FileText}
            label="Applications"
            description="Track your status"
            colorClass="text-blue-600 border-blue-100 hover:bg-blue-50"
          />
          <ActionButton 
            onClick={() => setActiveTab("results")}
            icon={Award}
            label="Check Results"
            description="View test scores"
            colorClass="text-purple-600 border-purple-100 hover:bg-purple-50"
          />
        </div>
      </section>

      {/* 3. Upcoming Test Alert (High Priority) */}
      <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-500/30">
              <Calendar className="text-orange-400" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-orange-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Priority</span>
                <h4 className="text-lg font-bold">Upcoming Test Reminder</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Your test for <span className="text-white font-medium">Data Entry Operator</span> is scheduled for 
                <span className="text-white font-medium"> Feb 25, 2026</span> at the Quetta Center.
              </p>
            </div>
          </div>
          
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all active:scale-95 shadow-lg shadow-black/20">
            <Download size={16} />
            Download Admit Card
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable Action Button Component
 */
function ActionButton({ icon: Icon, label, description, onClick, colorClass }: any) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center p-4 border-2 rounded-2xl transition-all duration-300 text-left ${colorClass}`}
    >
      <div className="p-3 rounded-xl bg-current/10 mr-4 group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <div>
        <p className="font-bold text-slate-800">{label}</p>
        <p className="text-xs text-slate-500 font-medium">{description}</p>
      </div>
    </button>
  );
}