'use client';

import { 
  Search, 
  MapPin, 
  GraduationCap, 
  Banknote, 
  Users, 
  Calendar, 
  Download, 
  ArrowRight 
} from "lucide-react";

type Job = {
  id: string | number;
  title: string;
  department: string;
  location: string;
  positions: number;
  salary: string;
  education: string;
  lastDate: string;
  status: string;
};

type AvailableJobsTabProps = {
  availableJobs: Job[];
};

export default function AvailableJobsTab({ availableJobs }: AvailableJobsTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      
      {/* Search & Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Open Opportunities</h3>
          <p className="text-xs text-slate-500 font-medium">Discover your next career move</p>
        </div>
        
        <div className="flex items-center gap-2 group">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by title or dept..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Filter
          </button>
        </div>
      </div>

      {/* Jobs Listing */}
      <div className="grid gap-4">
        {availableJobs.map((job) => (
          <div
            key={job.id}
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
          >
            {/* Top Row: Title and Status */}
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {job.title}
                </h4>
                <p className="text-sm font-bold text-emerald-600 tracking-tight uppercase italic">
                  {job.department}
                </p>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {job.status}
              </span>
            </div>

            {/* Middle Row: Job Attributes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-50">
              <JobMeta icon={MapPin} label="Location" value={job.location} />
              <JobMeta icon={Users} label="Vacancies" value={`${job.positions} Posts`} />
              <JobMeta icon={Banknote} label="Salary Scale" value={job.salary} />
              <JobMeta icon={GraduationCap} label="Requirement" value={job.education} />
            </div>

            {/* Bottom Row: Date and Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
              <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <Calendar size={14} className="text-rose-500" />
                <span className="text-xs font-bold">Deadline: <span className="text-slate-900">{job.lastDate}</span></span>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                  Apply Now <ArrowRight size={14} />
                </button>
                <button className="p-2.5 bg-white text-slate-400 border border-slate-200 rounded-xl hover:text-blue-600 hover:border-blue-200 transition-all" title="Download Advertisement">
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Reusable component for job metadata
 */
function JobMeta({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-700 truncate max-w-[120px] md:max-w-none">{value}</p>
      </div>
    </div>
  );
}