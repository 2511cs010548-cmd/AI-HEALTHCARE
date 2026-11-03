import React from 'react';
import {
  LayoutDashboard,
  User,
  Calendar,
  FileText,
  Activity,
  Pill,
  FlaskConical,
  TrendingUp,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  Sparkles,
  Bot,
  Bell
} from 'lucide-react';
import { ScreenId } from '../types';

interface SidebarProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  role?: 'patient' | 'doctor';
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  setCurrentScreen,
  role = 'patient',
  onLogout
}) => {
  const isDoctor = role === 'doctor';

  return (
    <aside className="w-64 bg-[#0d223a] text-slate-300 flex flex-col flex-shrink-0 min-h-screen border-r border-[#153255] select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#18365c] flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
          <span className="text-xl leading-none">+</span>
        </div>
        <div>
          <div className="text-white font-bold text-base tracking-tight leading-tight flex items-center space-x-1.5">
            <span>AI Healthcare</span>
          </div>
          <p className="text-[11px] text-blue-300/80 font-normal">Smart Health, Better Life</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto text-[13px]">
        {isDoctor ? (
          <>
            <button
              onClick={() => setCurrentScreen('doctor-dashboard')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'doctor-dashboard'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentScreen('patients')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'patients'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Patients</span>
            </button>

            <button
              onClick={() => setCurrentScreen('appointments')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'appointments'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
            </button>

            <button
              onClick={() => setCurrentScreen('medical-reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'medical-reports'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Medical Reports</span>
            </button>

            <button
              onClick={() => setCurrentScreen('symptom-checker')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'symptom-checker' || currentScreen === 'ai-diagnosis'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>AI Diagnosis Reports</span>
            </button>

            <button
              onClick={() => setCurrentScreen('prescriptions')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'prescriptions'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Prescriptions</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentScreen('patient-dashboard')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'patient-dashboard'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentScreen('my-profile')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'my-profile'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => setCurrentScreen('appointments')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'appointments'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
            </button>

            <button
              onClick={() => setCurrentScreen('medical-reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'medical-reports'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Medical Records</span>
            </button>

            <button
              onClick={() => setCurrentScreen('symptom-checker')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'symptom-checker' || currentScreen === 'ai-diagnosis'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>AI Diagnosis</span>
            </button>

            <button
              onClick={() => setCurrentScreen('prescriptions')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'prescriptions'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Prescriptions</span>
            </button>

            <button
              onClick={() => setCurrentScreen('lab-reports')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'lab-reports'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Lab Reports</span>
            </button>

            <button
              onClick={() => setCurrentScreen('health-tracking')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'health-tracking'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Health Tracking</span>
            </button>

            <button
              onClick={() => setCurrentScreen('messages')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'messages'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </button>

            <button
              onClick={() => setCurrentScreen('notifications')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'notifications'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </button>

            <button
              onClick={() => setCurrentScreen('settings')}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left cursor-pointer ${
                currentScreen === 'settings'
                  ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/30'
                  : 'hover:bg-[#16365c] text-slate-300 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </>
        )}

        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg transition text-left text-slate-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer pt-3"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Slide 8 Callout Cards at bottom of sidebar */}
      {!isDoctor && (
        <div className="p-3 space-y-2.5 border-t border-[#18365c]/80 text-xs">
          <div className="bg-gradient-to-br from-blue-700/60 to-indigo-900/60 p-3 rounded-xl border border-blue-500/30 text-white shadow-inner">
            <div className="flex items-center space-x-1.5 font-semibold text-blue-200 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Take control of health</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug mb-2">
              Get AI insights and personalized recommendations.
            </p>
            <button
              onClick={() => setCurrentScreen('symptom-checker')}
              className="w-full py-1 text-center bg-white text-blue-900 font-semibold text-[11px] rounded-md hover:bg-blue-50 transition cursor-pointer"
            >
              Explore Now
            </button>
          </div>

          <div className="bg-[#122a47] p-2.5 rounded-xl border border-[#1b3d66] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-[11px]">
                <div className="font-medium text-white leading-tight">Need Health Help?</div>
                <div className="text-[10px] text-slate-400">Instant AI support</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('symptom-checker')}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium rounded transition cursor-pointer"
            >
              Chat
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
