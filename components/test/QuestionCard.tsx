import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function QuestionCard({ question, index, total, selectedAnswer, onSelect, onNext, onPrev, isLast, onFinish }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-tighter">
            Question {index + 1} / {total}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-10 leading-relaxed">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`p-6 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between ${
                selectedAnswer === opt 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                : 'border-slate-50 bg-slate-50 text-slate-600 hover:border-slate-200'
              }`}
            >
              {opt}
              <div className={`w-5 h-5 rounded-full border-2 ${selectedAnswer === opt ? 'border-emerald-500 bg-emerald-500 ring-4 ring-emerald-100' : 'border-slate-300'}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button onClick={onPrev} disabled={index === 0} className="flex items-center gap-2 font-black text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all">
          <ChevronLeft /> PREVIOUS
        </button>
        {isLast ? (
          <button onClick={onFinish} className="px-12 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-emerald-100 flex items-center gap-2">
            SUBMIT FINAL TEST <Send size={18} />
          </button>
        ) : (
          <button onClick={onNext} className="flex items-center gap-2 font-black text-slate-900 hover:text-emerald-600 transition-all">
            NEXT <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
}