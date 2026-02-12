'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StatCard from '@/components/dashboard/StatCard';
import TopNavbar from '@/components/dashboard/TopNavbar';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import AppliedJobsTab from '@/components/dashboard/AppliedJobsTab';
import TestResultsTab from '@/components/dashboard/TestResultsTab';
import ProfileTab from '@/components/dashboard/ProfileTab';
import AvailableJobsTab from '@/components/dashboard/AvailableJobsTab';
import OverviewTab from '@/components/dashboard/OverviewTab';
import OnlineTestCard from '@/components/dashboard/OnlineTestCard';

// Data imports
import { 
  userData, 
  statsData, 
  recentActivities, 
  availableJobs, 
  appliedJobs, 
  testResults,
  onlineTestData 
} from './data';

export default function DashboardPage() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<
    "overview" | "available" | "applied" | "results" | "profile" | "online-test"
  >("overview");

  const handleLogout = () => {
    router.push('/');
  };

  const handleStartTest = (id: string | number) => {
    router.push(`/test/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopNavbar userData={userData} handleLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">
              Welcome back, {userData.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-slate-500 font-medium italic">BTS Portal Candidate Dashboard</p>
          </div>
          
          {/* Quick Action: Online Test Shortcut */}
          {onlineTestData && (
            <button 
              onClick={() => setActiveTab('online-test')}
              className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              1 Test Pending
            </button>
          )}
        </div>

        {/* Statistics on Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-4xl shadow-2xl shadow-slate-200/50 mb-8 border border-slate-100 overflow-hidden">
          <DashboardTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="p-6 md:p-8">
            {activeTab === "overview" && (
              <OverviewTab recentActivities={recentActivities} setActiveTab={setActiveTab} />
            )}
            
            {activeTab === "available" && (
              <AvailableJobsTab availableJobs={availableJobs} />
            )}

            {activeTab === "applied" && (
              <AppliedJobsTab appliedJobs={appliedJobs} />
            )}

            {activeTab === "results" && (
              <TestResultsTab testResults={testResults} />
            )}

            {/* Online Test Tab */}
            {activeTab === "online-test" && (<OnlineTestCard test={onlineTestData} onStart={handleStartTest} />)}

            {activeTab === "profile" && (
              <ProfileTab userData={userData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}