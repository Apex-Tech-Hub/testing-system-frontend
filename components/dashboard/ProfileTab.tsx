'use client';

import { 
  User, 
  Mail, 
  CreditCard, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  ShieldCheck,
  Edit3,
  Plus
} from "lucide-react";

type UserData = {
  name: string;
  email: string;
  cnic: string;
  phone: string;
  city: string;
  registrationDate: string;
  education?: { degree: string; institution: string; year: string }[];
};

type ProfileTabProps = {
  userData: UserData;
};

export default function ProfileTab({ userData }: ProfileTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative group">
          <User size={48} className="text-emerald-400" />
          <button className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-lg shadow-lg hover:scale-110 transition-transform">
            <Edit3 size={14} className="text-white" />
          </button>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">{userData.name}</h3>
          <p className="text-slate-400 text-sm mt-1">{userData.email}</p>
          <div className="flex items-center gap-2 mt-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">
              Verified Candidate
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                Personal Information
              </h4>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DisplayField icon={User} label="Full Name" value={userData.name} />
              <DisplayField icon={Mail} label="Email Address" value={userData.email} />
              <DisplayField icon={CreditCard} label="CNIC Number" value={userData.cnic} />
              <DisplayField icon={Phone} label="Contact Phone" value={userData.phone} />
              <DisplayField icon={MapPin} label="Residential City" value={userData.city} />
              <DisplayField icon={Calendar} label="Member Since" value={userData.registrationDate} />
            </div>
          </div>

          {/* Education Details */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-600" />
                Academic History
              </h4>
              <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                <Plus size={14} /> Add New
              </button>
            </div>
            <div className="p-6 space-y-4">
              {userData.education?.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/30 group hover:border-blue-200 transition-colors">
                  <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 group-hover:text-blue-600 transition-colors">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{edu.degree}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{edu.institution}</p>
                    <span className="inline-block mt-2 text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                      Class of {edu.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Account Actions</h4>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <SidebarButton icon={Edit3} label="Edit Basic Info" primary />
            <SidebarButton icon={GraduationCap} label="Update Education" />
            <SidebarButton icon={ShieldCheck} label="Change Password" />
          </div>
          
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-tighter mb-2">Profile Strength</p>
            <div className="h-2 w-full bg-emerald-200 rounded-full overflow-hidden mb-3">
              <div className="h-full w-[85%] bg-emerald-600 rounded-full"></div>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium leading-relaxed">
              Complete your experience details to improve your chances by 40%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Clean Field Display Component
 */
function DisplayField({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Icon size={12} /> {label}
      </p>
      <p className="text-sm font-bold text-slate-700 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
        {value}
      </p>
    </div>
  );
}

/**
 * Sidebar Action Button
 */
function SidebarButton({ icon: Icon, label, primary = false }: { icon: any; label: string; primary?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
      primary 
        ? "bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800" 
        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
    }`}>
      <Icon size={16} />
      {label}
    </button>
  );
}