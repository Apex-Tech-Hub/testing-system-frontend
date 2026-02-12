'use client';

import { useState } from 'react';
import { 
  Trophy, Users, TrendingUp, Download, Search,
  ChevronRight, BarChart, Award, FileSpreadsheet,
  Calendar, CheckCircle, XCircle, Layout
} from 'lucide-react';

// Mock Data for different tests
const testDatabase = {
  "T-101": {
    name: "Junior Clerk (BPS-11) - Batch A",
    date: "Feb 10, 2026",
    stats: { pass: "72%", total: 1240, high: 96 },
    merit: [
      { rank: 1, name: "Zeeshan Ahmed", rollNo: "BTS-1029", score: 96, district: "Quetta" },
      { rank: 2, name: "Iqra Baloch", rollNo: "BTS-1045", score: 94, district: "Mastung" },
    ]
  },
  "T-102": {
    name: "SST General (BPS-16)",
    date: "Jan 25, 2026",
    stats: { pass: "45%", total: 3500, high: 88 },
    merit: [
      { rank: 1, name: "Arif Hussain", rollNo: "BTS-9921", score: 88, district: "Sibi" },
      { rank: 2, name: "Mehak Jan", rollNo: "BTS-8832", score: 85, district: "Gwadar" },
    ]
  }
};

export default function ResultsPage() {
  const [selectedTest, setSelectedTest] = useState<keyof typeof testDatabase>("T-101");
  const currentData = testDatabase[selectedTest];

  return (
    <div className="p-8 space-y-8">
      {/* Test Selector Header */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Layout size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-1">Active Report</p>
              <select 
                className="bg-transparent text-2xl font-black outline-none cursor-pointer border-b-2 border-emerald-500/30 focus:border-emerald-500 transition-all pr-8"
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value as any)}
              >
                <option value="T-101" className="text-slate-900">Junior Clerk (BPS-11)</option>
                <option value="T-102" className="text-slate-900">SST General (BPS-16)</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-6 px-8 py-4 bg-slate-800/50 rounded-3xl border border-slate-700">
            <div className="text-center">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Exam Date</p>
              <p className="text-sm font-bold flex items-center gap-2"><Calendar size={14}/> {currentData.date}</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-700" />
            <div className="text-center">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Test ID</p>
              <p className="text-sm font-bold text-emerald-400">{selectedTest}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Candidates" value={currentData.stats.total} icon={<Users />} color="blue" />
        <StatCard title="Passing Rate" value={currentData.stats.pass} icon={<TrendingUp />} color="emerald" />
        <StatCard title="Highest Score" value={`${currentData.stats.high}/100`} icon={<Trophy />} color="amber" />
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass/Fail Ratio</p>
                <div className="flex items-center gap-3">
                    <span className="text-emerald-500 flex items-center gap-1 font-black text-lg"><CheckCircle size={16}/> 800</span>
                    <span className="text-rose-500 flex items-center gap-1 font-black text-lg"><XCircle size={16}/> 440</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Merit List */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-black text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest">
              <Award className="text-emerald-500" size={18} /> Merit List: {currentData.name}
            </h3>
            <button className="text-[10px] font-black text-emerald-600 hover:underline uppercase">Download PDF</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-slate-50">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase">Rank</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase">Candidate</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase">District</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase text-center">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentData.merit.map((item) => (
                <tr key={item.rank} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs italic">
                      #{item.rank}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="font-black text-slate-900 text-sm">{item.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest">{item.rollNo}</p>
                  </td>
                  <td className="p-6 text-sm font-bold text-slate-600 italic underline decoration-emerald-200 underline-offset-4">
                    {item.district}
                  </td>
                  <td className="p-6 text-center">
                    <span className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-100">
                      {item.score}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200">
            <h3 className="font-black uppercase text-xs tracking-[0.2em] mb-4 opacity-80">Official Actions</h3>
            <div className="space-y-3">
                <button className="w-full bg-white text-emerald-600 p-4 rounded-2xl font-black text-xs flex items-center justify-between group hover:scale-[1.02] transition-all">
                    GENERATE GAZETTE <Download size={16} />
                </button>
                <button className="w-full bg-emerald-700 text-emerald-100 p-4 rounded-2xl font-black text-xs flex items-center justify-between group hover:bg-emerald-800 transition-all">
                    EMAIL ALL CANDIDATES <ChevronRight size={16} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Small Stat Card for internal use
function StatCard({ title, value, icon, color }: any) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100'
    };
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
            <div className={`p-4 rounded-2xl ${colors[color as keyof typeof colors]}`}>
                {icon}
            </div>
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <h4 className="text-xl font-black text-slate-900">{value}</h4>
            </div>
        </div>
    );
}