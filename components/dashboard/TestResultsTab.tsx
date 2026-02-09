'use client';

import { Award, FileText, ListOrdered, Download, ChevronRight } from "lucide-react";

type TestResult = {
  id: string | number;
  title: string;
  department: string;
  testDate: string;
  obtainedMarks: number;
  totalMarks: number;
  percentage: string;
  status: string;
  merit: string;
};

type TestResultsTabProps = {
  testResults: TestResult[];
};

export default function TestResultsTab({ testResults }: TestResultsTabProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Performance Overview</h3>
        <p className="text-sm text-slate-500 font-medium">
          Showing {testResults.length} completed examinations
        </p>
      </div>

      <div className="grid gap-6">
        {testResults.map((result) => {
          const isPassed = result.status.toLowerCase() === 'passed';
          
          return (
            <div
              key={result.id}
              className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Job & Department Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {result.title}
                      </h4>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                        isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {result.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      {result.department}
                    </p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8 border-y lg:border-y-0 lg:border-x border-slate-100 py-4 lg:py-0 lg:px-8">
                    <Metric label="Test Date" value={result.testDate} />
                    <Metric label="Score" value={`${result.obtainedMarks}/${result.totalMarks}`} />
                    <Metric 
                      label="Percentage" 
                      value={result.percentage} 
                      valueClass={isPassed ? "text-emerald-600" : "text-red-600"} 
                    />
                    <Metric label="Merit Status" value={result.merit} valueClass="text-blue-600" />
                  </div>

                  {/* Visual Progress Circle (Optional flair) */}
                  <div className="hidden xl:flex items-center justify-center w-16 h-16 rounded-full border-4 border-slate-50 relative">
                     <span className="text-xs font-black text-slate-700">{result.percentage}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <ResultButton 
                    icon={Download} 
                    label="Result Card" 
                    variant="emerald" 
                  />
                  <ResultButton 
                    icon={FileText} 
                    label="Detailed Report" 
                    variant="blue" 
                  />
                  <ResultButton 
                    icon={ListOrdered} 
                    label="Check Merit List" 
                    variant="purple" 
                  />
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
 * Reusable Metric Component for clean alignment
 */
function Metric({ label, value, valueClass = "text-slate-900" }: { label: string, value: string, valueClass?: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">{label}</p>
      <p className={`text-sm font-bold whitespace-nowrap ${valueClass}`}>{value}</p>
    </div>
  );
}

/**
 * Reusable Action Button with refined styling
 */
function ResultButton({ icon: Icon, label, variant }: { icon: any, label: string, variant: 'emerald' | 'blue' | 'purple' }) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border-emerald-100",
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border-blue-100",
    purple: "bg-purple-50 text-purple-700 hover:bg-purple-700 hover:text-white border-purple-100",
  };

  return (
    <button className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all active:scale-95 ${styles[variant]}`}>
      <Icon size={14} />
      {label}
    </button>
  );
}