'use client';

import { useState } from 'react';
import { 
  Plus, Search, BookOpen, Edit3, Trash2, 
  Layers, FileUp, Zap
} from 'lucide-react';

const initialQuestions = [
  { 
    id: 1024, 
    text: "Which pass connects Quetta with Afghanistan?", 
    category: "General Knowledge", 
    difficulty: "Medium", 
    correct: "B", 
    correctText: "Khozak Pass",
    options: ["Bolan Pass", "Khozak Pass", "Gomal Pass", "Khyber Pass"]
  },
  { 
    id: 1025, 
    text: "In MS Word, which function key is used for 'Spell Check'?", 
    category: "Computer", 
    difficulty: "Easy", 
    correct: "D", 
    correctText: "F7",
    options: ["F1", "F5", "F2", "F7"]
  },
  { 
    id: 1026, 
    text: "What is the synonym of 'Resilient'?", 
    category: "English", 
    difficulty: "Hard", 
    correct: "A", 
    correctText: "Tough",
    options: ["Tough", "Fragile", "Lazy", "Quick"]
  },
  { 
    id: 1027, 
    text: "Which element has the atomic number 1?", 
    category: "Science", 
    difficulty: "Easy", 
    correct: "C", 
    correctText: "Hydrogen",
    options: ["Helium", "Oxygen", "Hydrogen", "Carbon"]
  },
  { 
    id: 1028, 
    text: "The 'Hanna Lake' is situated near which city of Balochistan?", 
    category: "General Knowledge", 
    difficulty: "Easy", 
    correct: "A", 
    correctText: "Quetta",
    options: ["Quetta", "Ziarat", "Sibi", "Pishin"]
  }
];

// Color Mapping for Difficulty
const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Medium: "bg-amber-50 text-amber-600 border-amber-100",
  Hard: "bg-rose-50 text-rose-600 border-rose-100",
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = questions.filter((q: any) => {
    const matchesTab = activeTab === 'All' || q.category === activeTab;
    const matchesSearch = q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.id.toString().includes(searchQuery);
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Question Bank</h1>
          <p className="text-slate-500 font-medium italic">
            Showing {filteredQuestions.length} of {questions.length} Items
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border-2 border-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
            <FileUp size={18} /> IMPORT
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
            <Plus size={18} /> ADD NEW
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-full lg:w-fit overflow-x-auto">
          {['All', 'English', 'Computer', 'Science', 'General Knowledge'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-xl py-3 pl-11 pr-4 font-bold text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Table-Style List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-12 text-center">#</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Question Detail</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Level</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Correct Answer</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((q: any) => (
                  <tr key={q.id} className="group hover:bg-slate-50/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <td className="p-6 text-center text-xs font-black text-slate-300">{q.id}</td>
                    <td className="p-6 max-w-md font-bold text-slate-900">{q.text}</td>
                    <td className="p-6">
                       <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[9px] font-black uppercase rounded-lg border border-slate-100">
                        {q.category}
                       </span>
                    </td>
                    {/* NEW DIFFICULTY COLUMN */}
                    <td className="p-6">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1 w-fit ${difficultyStyles[q.difficulty]}`}>
                        <Zap size={10} fill="currentColor" /> {q.difficulty}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                          {q.correct}
                        </span>
                        <span className="text-xs font-bold text-slate-600">{q.correctText}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 text-slate-400 hover:text-slate-900 bg-white rounded-lg border border-slate-100 transition-colors"><Edit3 size={14}/></button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 bg-white rounded-lg border border-slate-100 transition-colors"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Search size={40} className="opacity-20" />
                      <p className="font-black uppercase text-xs tracking-widest">No questions found</p>
                      <button onClick={() => {setActiveTab('All'); setSearchQuery('')}} className="text-emerald-500 text-[10px] font-bold underline">Clear all filters</button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}