'use client';

import Link from 'next/link';
import { Rocket, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen text-black bg-[#F8FAFC] selection:bg-emerald-100">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-teal-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold animate-fade-in">
            <Sparkles size={16} />
            Empowering Balochistan's Youth
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Elevate Your Career with <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Balochistan Testing System
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              The official gateway for competitive job assessments. Experience seamless registration, 
              secure online testing, and instant performance analytics.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              href="/login"
              className="group w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
            >
              Login <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/register"
              className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-black rounded-2xl shadow-lg shadow-slate-100 border border-slate-200 hover:border-emerald-500 transition-all text-center"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="text-amber-500" />}
            title="Instant Results"
            desc="No more waiting weeks. Get your detailed score breakdown immediately after submission."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-emerald-500" />}
            title="Secure & Fair"
            desc="Advanced proctoring ensures a level playing field for every candidate across the province."
          />
          <FeatureCard 
            icon={<Rocket className="text-blue-500" />}
            title="Career Growth"
            desc="Directly connect with government and private sector opportunities through your profile."
          />
        </div>

        {/* Stats Section */}
        <div className="mt-24 p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <StatItem value="5000+" label="Registered Students" />
          <StatItem value="50+" label="Testing Centers" />
          <StatItem value="98%" label="Satisfaction Rate" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50/50 transition-all group">
      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-4xl font-black text-emerald-600 tracking-tight">{value}</div>
      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}