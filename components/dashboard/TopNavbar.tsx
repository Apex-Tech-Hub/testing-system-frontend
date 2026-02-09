'use client';

import { LogOut, User, Bell } from "lucide-react";

type UserData = {
  name: string;
  email: string;
};

type TopNavbarProps = {
  userData: UserData;
  handleLogout: () => void;
};

export default function TopNavbar({ userData, handleLogout }: TopNavbarProps) {
  // Get initials for the avatar
  const initials = userData.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
          
            <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Balochistan <span className="text-emerald-600">Jobs</span>
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Notification Icon */}
            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Vertical Divider */}
            <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

            {/* User Info & Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  {userData.name}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {userData.email}
                </p>
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold text-xs">
                {initials.slice(0, 2)}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
              <span className="text-sm font-semibold hidden lg:block">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}