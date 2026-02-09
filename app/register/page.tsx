'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link
import { ArrowLeft } from 'lucide-react'; // Import Icon
import PersonalInfoStep from '@/components/register/PersonalInfoStep';
import EducationStep from '@/components/register/EducationStep';

const balochistanCities = ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Hub', 'Chaman', 'Sibi', 'Zhob', 'Loralai', 'Pishin'];
const educationLevels = ['Matriculation', 'Intermediate', 'Bachelor', 'Master'];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({
    name: '', cnic: '', email: '', phoneNumber: '', fatherName: '', city: '', password: '',
  });
  const [selectedLevel, setSelectedLevel] = useState('');
  const [educationEntries, setEducationEntries] = useState<any[]>([]);

  const formatCNIC = (val: string) => {
    const d = val.replace(/\D/g, '');
    if (d.length <= 5) return d;
    if (d.length <= 12) return `${d.slice(0, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 5)}-${d.slice(5, 12)}-${d.slice(12, 13)}`;
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    const idx = educationLevels.indexOf(level);
    const required = educationLevels.slice(0, idx + 1);
    setEducationEntries(required.map(lvl => ({
      level: lvl, title: '', startDate: '', endDate: '', file: null 
    })));
  };

  return (
    <div className="min-h-screen text-black bg-[#F8FAFC] py-8 md:py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold transition-colors group"
        >
          <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-50 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Home
        </Link>

        {/* Progress Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Join Balochistan Testing System</h1>
          <div className="flex items-center justify-center gap-3">
             <span className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 1 ? 'bg-emerald-500' : 'bg-emerald-200'}`} />
             <span className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step === 2 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
          </div>
          <p className="text-slate-500 font-medium pt-2">
            Step {step} of 2: {step === 1 ? 'Personal Profile' : 'Education History'}
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 p-6 md:p-10 border border-slate-100">
          {step === 1 ? (
            <PersonalInfoStep 
              personalInfo={personalInfo}
              onChange={(e: any) => setPersonalInfo({...personalInfo, [e.target.name]: e.target.value})}
              onNext={() => setStep(2)}
              formatCNIC={formatCNIC}
              cities={balochistanCities}
            />
          ) : (
            <EducationStep 
              levels={educationLevels}
              selectedLevel={selectedLevel}
              onLevelSelect={handleLevelSelect}
              entries={educationEntries}
              onEntryChange={(idx: number, field: string, val: string) => {
                const updated = [...educationEntries];
                updated[idx][field] = val;
                setEducationEntries(updated);
              }}
              onFileChange={(idx: number, file: File) => {
                const updated = [...educationEntries];
                updated[idx].file = file;
                setEducationEntries(updated);
              }}
              onBack={() => setStep(1)}
              onFinish={() => router.push('/dashboard')}
            />
          )}
        </div>

        {/* Footer Support Text */}
        <p className="text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-emerald-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}