'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import TestHeader from '@/components/test/TestHeader';
import QuestionCard from '@/components/test/QuestionCard';
import QuestionPalette from '@/components/test/QuestionPalette';
import { CheckCircle2, Loader2 } from 'lucide-react';

const testData = {
  English: [
    { id: 1, question: "Choose the correct synonym for 'Diligent'.", options: ["Lazy", "Hardworking", "Careless", "Weak"] },
    { id: 2, question: "Identify the verb: 'The cat sat on the mat.'", options: ["Cat", "Sat", "Mat", "The"] }
  ],
  Computer: [
    { id: 3, question: "What does 'RAM' stand for?", options: ["Read Access Memory", "Random Access Memory", "Run Active Module", "Remote Access Method"] },
    { id: 4, question: "Which is an output device?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"] }
  ],
  Science: [
    { id: 5, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"] },
    { id: 6, question: "What is the chemical symbol for Water?", options: ["CO2", "O2", "H2O", "HO"] }
  ]
};

export default function TestExecutionPage() {
  const router = useRouter();
  const categories = useMemo(() => Object.keys(testData) as Array<keyof typeof testData>, []);
  
  const [activeCategory, setActiveCategory] = useState<keyof typeof testData>(categories[0]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Flatten all questions to calculate global progress
  const allQuestions = useMemo(() => Object.values(testData).flat(), []);
  const totalQuestionsCount = allQuestions.length;
  const answeredCount = Object.keys(answers).length;

  const currentQuestions = testData[activeCategory];
  const isLastQuestionInCategory = currentIdx === currentQuestions.length - 1;
  const isLastCategory = activeCategory === categories[categories.length - 1];

  const handleNext = () => {
    if (isLastQuestionInCategory) {
      if (!isLastCategory) {
        // Auto-move to next category
        const nextCatIndex = categories.indexOf(activeCategory) + 1;
        setActiveCategory(categories[nextCatIndex]);
        setCurrentIdx(0);
      }
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    } else {
      const currentCatIndex = categories.indexOf(activeCategory);
      if (currentCatIndex > 0) {
        // Move back to previous category's last question
        const prevCat = categories[currentCatIndex - 1];
        setActiveCategory(prevCat);
        setCurrentIdx(testData[prevCat].length - 1);
      }
    }
  };

  const handleFinish = () => {
    setIsSubmitted(true);
    setTimeout(() => router.push('/dashboard'), 3000);
  };

  if (isSubmitted) return <SubmissionSuccess />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <TestHeader duration={1800} onTimeout={handleFinish} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Enhanced Category Sidebar */}
        <div className="lg:col-span-2 space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Test Modules</p>
          {categories.map((cat) => {
            const catQuestions = testData[cat];
            const catAnswered = catQuestions.filter(q => answers[q.id]).length;
            const isDone = catAnswered === catQuestions.length;

            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentIdx(0); }}
                className={`w-full group flex flex-col p-4 rounded-2xl border transition-all ${
                  activeCategory === cat 
                  ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-200' 
                  : 'bg-white border-slate-100 hover:border-emerald-200'
                }`}
              >
                <span className={`text-xs font-bold mb-1 ${activeCategory === cat ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isDone ? '✓ Completed' : `Module 0${categories.indexOf(cat) + 1}`}
                </span>
                <span className={`font-black text-sm ${activeCategory === cat ? 'text-white' : 'text-slate-700'}`}>
                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Center: Question Area */}
        <div className="lg:col-span-7">
          <QuestionCard 
            question={currentQuestions[currentIdx]} 
            total={currentQuestions.length}
            index={currentIdx}
            selectedAnswer={answers[currentQuestions[currentIdx].id]}
            onSelect={(val: any) => setAnswers({...answers, [currentQuestions[currentIdx].id]: val})}
            onNext={handleNext}
            onPrev={handlePrev}
            // Show "Submit" only on the final question of the final category
            isLast={isLastQuestionInCategory && isLastCategory} 
            onFinish={handleFinish}
          />
        </div>

        {/* Right: Global Question Palette */}
        <div className="lg:col-span-3">
          <QuestionPalette 
            questions={currentQuestions} // Navigator shows current category
            currentIdx={currentIdx}
            answers={answers}
            onJump={(i: number) => setCurrentIdx(i)}
            // Pass global stats for the completion bar
            globalStats={{
                total: totalQuestionsCount,
                answered: answeredCount
            }}
          />
        </div>
      </main>
    </div>
  );
}

function SubmissionSuccess() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="text-center">
                <div className="relative inline-block mb-6">
                    <CheckCircle2 size={80} className="text-emerald-500 animate-in zoom-in duration-500" />
                    <Loader2 size={100} className="text-emerald-100 absolute -top-2.5 -left-2.5 animate-spin-slow" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-2">Test Submitted!</h1>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                    Your responses have been securely uploaded to the Balochistan Testing System servers.
                </p>
            </div>
        </div>
    );
}