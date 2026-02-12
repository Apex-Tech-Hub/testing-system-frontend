// components/admin/QuestionForm.tsx
'use client';

import { useState } from 'react';
import { Plus, Trash2, Save, Sparkles } from 'lucide-react';

export default function QuestionForm() {
  const [question, setQuestion] = useState({
    text: '',
    category: 'English',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const handleOptionChange = (idx: number, val: string) => {
    const newOptions = [...question.options];
    newOptions[idx] = val;
    setQuestion({ ...question, options: newOptions });
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Create New Question</h3>
          <p className="text-slate-500 font-medium italic">Define the logic for your upcoming assessment</p>
        </div>
        <select 
          className="bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-sm text-slate-600 outline-none ring-2 ring-transparent focus:ring-emerald-500 transition-all"
          value={question.category}
          onChange={(e) => setQuestion({...question, category: e.target.value})}
        >
          <option>English</option>
          <option>Science</option>
          <option>Computer</option>
          <option>General Knowledge</option>
        </select>
      </div>

      <div className="space-y-6">
        {/* Question Text */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Question Content</label>
          <textarea 
            className="w-full bg-slate-50 border-none rounded-[1.5rem] p-6 text-slate-900 font-bold placeholder:text-slate-300 outline-none ring-2 ring-transparent focus:ring-emerald-500 transition-all min-h-[120px]"
            placeholder="e.g., What is the primary function of the CPU?"
            value={question.text}
            onChange={(e) => setQuestion({...question, text: e.target.value})}
          />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((opt, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Option 0{i+1}</label>
                <input 
                  type="radio" 
                  name="correct" 
                  checked={question.correctAnswer === i}
                  onChange={() => setQuestion({...question, correctAnswer: i})}
                  className="w-4 h-4 accent-emerald-500"
                />
              </div>
              <input 
                type="text"
                className={`w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold outline-none ring-2 transition-all ${
                  question.correctAnswer === i ? 'ring-emerald-500 bg-emerald-50/30' : 'ring-transparent focus:ring-slate-200'
                }`}
                value={opt}
                placeholder={`Option ${i+1}...`}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-8 flex gap-4 border-t border-slate-50">
          <button className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200">
            <Save size={18} />
            SAVE TO BANK
          </button>
          <button className="px-8 bg-slate-50 text-slate-400 font-black py-4 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}