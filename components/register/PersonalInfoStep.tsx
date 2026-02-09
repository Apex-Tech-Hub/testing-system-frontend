'use client';

import { User, CreditCard, Mail, Phone, Lock, MapPin, Users } from 'lucide-react';

export default function PersonalInfoStep({ personalInfo, onChange, onNext, formatCNIC, cities }: any) {
  return (
    <form onSubmit={onNext} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input icon={User} label="Full Name" name="name" value={personalInfo.name} onChange={onChange} placeholder="Ahmed Khan" />
        <Input icon={CreditCard} label="CNIC" name="cnic" value={personalInfo.cnic} 
          onChange={(e: any) => onChange({ target: { name: 'cnic', value: formatCNIC(e.target.value) } })} 
          placeholder="XXXXX-XXXXXXX-X" maxLength={15} />
        <Input icon={Mail} label="Email" name="email" type="email" value={personalInfo.email} onChange={onChange} placeholder="ahmed@example.com" />
        <Input icon={Phone} label="Phone" name="phoneNumber" type="tel" value={personalInfo.phoneNumber} onChange={onChange} placeholder="03XX-XXXXXXX" />
        <Input icon={Users} label="Father's Name" name="fatherName" value={personalInfo.fatherName} onChange={onChange} placeholder="Father's name" />
        
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <MapPin size={16} className="text-emerald-600" /> City / District
          </label>
          <select name="city" required value={personalInfo.city} onChange={onChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
            <option value="">Select City</option>
            {cities.map((c: string) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <Input icon={Lock} label="Password" name="password" type="password" value={personalInfo.password} onChange={onChange} placeholder="••••••••" className="md:col-span-2" />
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="group flex items-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
          Next Step <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </form>
  );
}

function Input({ icon: Icon, label, className = "", ...props }: any) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
        <Icon size={16} className="text-emerald-600" /> {label}
      </label>
      <input required {...props} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
    </div>
  );
}