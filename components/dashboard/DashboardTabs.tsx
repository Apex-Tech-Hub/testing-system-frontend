'use client';

import { 
  LayoutDashboard, 
  Briefcase, 
  FileCheck, 
  Trophy, 
  UserCircle,
  MonitorPlay // Added for Online Test
} from "lucide-react";

// Updated TabKey to include online-test
type TabKey =
  | "overview"
  | "available"
  | "applied"
  | "results"
  | "online-test"
  | "profile";

type DashboardTabsProps = {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
};

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "available", label: "Available Jobs", icon: Briefcase },
  { key: "applied", label: "Applied Jobs", icon: FileCheck },
  { key: "results", label: "Test Results", icon: Trophy },
  { key: "online-test", label: "Online Test", icon: MonitorPlay }, // New Tab
  { key: "profile", label: "Profile", icon: UserCircle },
];

export default function DashboardTabs({
  activeTab,
  setActiveTab,
}: DashboardTabsProps) {
  return (
    <div className="relative border-b border-slate-100 px-2 sm:px-6 bg-white rounded-t-2xl">
      <div className="flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`group relative flex items-center gap-2.5 py-5 px-3 font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap outline-none ${
                isActive
                  ? "text-emerald-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon 
                size={18} 
                className={`transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`} 
              />
              
              <span>{tab.label}</span>

              {/* Bottom Indicator with Glow */}
              {isActive ? (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-full shadow-[0_-2px_10px_rgba(16,185,129,0.4)]" />
              ) : (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-slate-200 transition-all rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}