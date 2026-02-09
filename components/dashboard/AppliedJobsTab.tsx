'use client';

import { 
  Calendar, 
  MapPin, 
  Clock, 
  Fingerprint, 
  Download, 
  ExternalLink, 
  Activity 
} from "lucide-react";

type Job = {
  id: string | number;
  title: string;
  department: string;
  appliedDate: string;
  rollNumber: string;
  testDate: string;
  testTime: string;
  venue: string;
  status: "Test Scheduled" | string;
};

type AppliedJobsTabProps = {
  appliedJobs: Job[];
};

export default function AppliedJobsTab({ appliedJobs }: AppliedJobsTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Application Tracking</h3>
          <p className="text-sm text-slate-500">Manage and monitor your submitted job applications</p>
        </div>
      </div>

      <div className="grid gap-5">
        {appliedJobs.map((job) => {
          const isScheduled = job.status === "Test Scheduled";
          
          return (
            <div
              key={job.id}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Left Side: Header & Core Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-sm font-semibold text-emerald-600 uppercase tracking-tight mt-0.5">
                          {job.department}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isScheduled 
                          ? "bg-amber-50 text-amber-600 border border-amber-100" 
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}>
                        {job.status}
                      </span>
                    </div>

                    {/* Logistics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6 py-4 px-4 bg-slate-50 rounded-xl border border-slate-100">
                      <InfoItem icon={Calendar} label="Test Date" value={job.testDate} />
                      <InfoItem icon={Clock} label="Test Time" value={job.testTime} />
                      <InfoItem icon={Fingerprint} label="Roll Number" value={job.rollNumber} />
                      <InfoItem 
                        icon={MapPin} 
                        label="Venue" 
                        value={job.venue} 
                        className="sm:col-span-2 lg:col-span-3" 
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                  {isScheduled && (
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all active:scale-95">
                      <Download size={14} />
                      Download Admit Card
                    </button>
                  )}
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                    <ExternalLink size={14} />
                    View Application
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                    <Activity size={14} />
                    Track History
                  </button>
                  <div className="ml-auto text-[11px] font-medium text-slate-400 italic">
                    Applied on {job.appliedDate}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Reusable Info Component for the logistics grid
 */
function InfoItem({ icon: Icon, label, value, className = "" }: any) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="p-1.5 bg-white rounded-md border border-slate-100 text-slate-400">
        <Icon size={14} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-700 leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}