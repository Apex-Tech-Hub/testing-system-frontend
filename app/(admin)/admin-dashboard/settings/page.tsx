'use client';

import { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Settings as SettingsIcon, 
  Mail, 
  Lock, 
  Trash2, 
  Globe, 
  Building2,
  Key
} from 'lucide-react';

// Mock Data for Admin Team
const adminTeam = [
  { id: 1, name: "Super Admin", email: "admin@bts.gob.pk", role: "Owner", status: "Active" },
  { id: 2, name: "Irfan Khan", email: "irfan@bts.gob.pk", role: "Editor", status: "Active" },
  { id: 3, name: "Sara Ahmed", email: "sara@bts.gob.pk", role: "Viewer", status: "Pending" },
];

export default function SettingsPage() {
  const [systemName, setSystemName] = useState('Balochistan Testing Service');

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
        <p className="text-slate-500 font-medium italic">Configure core platform behavior and manage administrative access</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: System Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Building2 size={16} className="text-blue-500" /> Organization Info
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portal Name</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="email" 
                    placeholder="support@bts.gob.pk"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 pl-12 pr-4 font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
              Update Identity
            </button>
          </div>

          <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100">
             <div className="flex items-center gap-3 mb-2 text-rose-600">
                <ShieldCheck size={20} />
                <h4 className="font-black text-xs uppercase tracking-widest">Security Protocol</h4>
             </div>
             <p className="text-[11px] font-bold text-rose-700/70 leading-relaxed uppercase">
                Two-Factor Authentication (2FA) is currently mandatory for all Super-Admin accounts.
             </p>
          </div>
        </div>

        {/* Right: Admin Team Management */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div>
                <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest flex items-center gap-2">
                  <UserPlus size={18} className="text-emerald-500" /> Admin Team
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Manage access levels for staff members</p>
              </div>
              <button className="bg-slate-900 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2">
                Invite New Admin
              </button>
            </div>

            <div className="p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="p-4">Staff Member</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {adminTeam.map((member) => (
                    <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs uppercase">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm">{member.name}</p>
                            <p className="text-[11px] font-bold text-slate-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                          member.role === 'Owner' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                          member.role === 'Editor' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                          <span className="text-[10px] font-black uppercase text-slate-600 tracking-tighter">{member.status}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors" title="Edit Permissions">
                            <Key size={16} />
                          </button>
                          <button className="p-2 text-slate-300 hover:text-rose-600 transition-colors" title="Remove Access">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Create Admin Form Section */}
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-dashed border-slate-200">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Quick-Add Staff</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Full Name" className="bg-white border-none rounded-xl px-4 py-3 text-xs font-bold shadow-sm outline-none focus:ring-2 focus:ring-emerald-500" />
              <input type="email" placeholder="Email Address" className="bg-white border-none rounded-xl px-4 py-3 text-xs font-bold shadow-sm outline-none focus:ring-2 focus:ring-emerald-500" />
              <select className="bg-white border-none rounded-xl px-4 py-3 text-[10px] font-black uppercase shadow-sm outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                <option>Viewer</option>
                <option>Editor</option>
                <option>Super Admin</option>
              </select>
            </div>
            <p className="text-[9px] font-medium text-slate-400 mt-4 uppercase tracking-widest italic">An invitation link will be sent to the email provided above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}