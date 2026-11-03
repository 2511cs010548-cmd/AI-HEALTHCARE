import React from 'react';
import {
  Heart,
  Activity,
  Droplets,
  Scale,
  Calendar,
  Sparkles,
  FileText,
  Download,
  Search,
  Bell,
  ChevronRight,
  Droplet,
  User,
  FlaskConical,
  TrendingUp,
  MessageSquare,
  Settings
} from 'lucide-react';
import { ScreenId, NotificationItem, PatientProfileData } from '../types';
import { NotificationsDropdown } from './NotificationsDropdown';

interface PatientDashboardProps {
  setCurrentScreen: (screen: ScreenId) => void;
  notifications?: NotificationItem[];
  setNotifications?: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  patientProfile?: PatientProfileData;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  setCurrentScreen,
  notifications = [],
  setNotifications,
  patientProfile
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const displayName = patientProfile?.name || 'John Doe';
  const displayInitials = patientProfile?.avatarInitials || 'JD';
  const displayId = patientProfile?.id || 'P12345';

  const handleMarkAllRead = () => {
    if (setNotifications) {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    }
  };

  const handleItemClick = (item: NotificationItem) => {
    if (setNotifications) {
      setNotifications(
        notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n))
      );
    }
    if (item.actionScreen) {
      setCurrentScreen(item.actionScreen);
    }
  };
  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Top Navbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <h2 className="text-xl font-bold text-[#102747]">Patient Dashboard</h2>
          <p className="text-xs text-slate-500">Monitor your health metrics, appointments, and AI diagnoses</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search health records..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -top-0.5 -right-0.5 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifDropdown && (
              <NotificationsDropdown
                notifications={notifications}
                onClose={() => setShowNotifDropdown(false)}
                setCurrentScreen={setCurrentScreen}
                onMarkAllRead={handleMarkAllRead}
                onItemClick={handleItemClick}
              />
            )}
          </div>
          <div
            onClick={() => setCurrentScreen('my-profile')}
            className="flex items-center space-x-2 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-80 transition"
            title="Edit Profile"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center text-xs shadow-sm">
              {displayInitials}
            </div>
            <div className="text-left text-xs leading-tight hidden sm:block">
              <div className="font-semibold text-slate-800">{displayName}</div>
              <div className="text-[10px] text-slate-500">{displayId}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 8: Welcome Header & Health Tip */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Welcome Card */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {displayInitials}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#102747]">Welcome, {displayName}!</h3>
                <p className="text-xs text-slate-500">Patient ID: {displayId}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {patientProfile?.gender === 'Female' ? '♀ Female' : '♂ Male'}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {patientProfile?.age || 28} Years
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                {patientProfile?.bloodGroup || 'O+'}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-500">Experiencing symptoms today?</span>
            <button
              onClick={() => setCurrentScreen('symptom-checker')}
              className="px-3.5 py-1.5 bg-[#1a64db] hover:bg-[#1553b7] text-white text-xs font-medium rounded-lg shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run AI Symptom Checker</span>
            </button>
          </div>
        </div>

        {/* Health Tip Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-teal-50 to-blue-50/70 p-5 rounded-2xl border border-teal-100/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-teal-800 font-semibold text-xs mb-2">
            <Droplet className="w-4 h-4 text-teal-600" />
            <span>Health Tip</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            "Drink plenty of water and stay active to keep your body and mind healthy."
          </p>
          <div className="mt-3 text-[11px] text-teal-700 font-semibold">
            Daily Goal: 2.5L / 3.0L Water Consumed
          </div>
        </div>
      </div>

      {/* Slide 8: Vitals Cards */}
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 fill-emerald-500/20" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Heart Rate</div>
            <div className="text-lg font-bold text-slate-900 leading-none mt-0.5">
              72 <span className="text-xs font-normal text-slate-500">bpm</span>
            </div>
            <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Normal
            </span>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Blood Pressure</div>
            <div className="text-lg font-bold text-slate-900 leading-none mt-0.5">
              120/80 <span className="text-xs font-normal text-slate-500">mmHg</span>
            </div>
            <span className="inline-block mt-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              Normal
            </span>
          </div>
        </div>

        {/* Blood Sugar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Blood Sugar</div>
            <div className="text-lg font-bold text-slate-900 leading-none mt-0.5">
              98 <span className="text-xs font-normal text-slate-500">mg/dL</span>
            </div>
            <span className="inline-block mt-1 text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              Normal
            </span>
          </div>
        </div>

        {/* Weight */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Weight</div>
            <div className="text-lg font-bold text-slate-900 leading-none mt-0.5">
              70 <span className="text-xs font-normal text-slate-500">kg</span>
            </div>
            <span className="inline-block mt-1 text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
              Normal
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Sections: Appointments & Diagnoses & Reports (Slide 8) */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Upcoming Appointments + Recent AI Diagnosis */}
        <div className="lg:col-span-7 space-y-5">
          {/* Upcoming Appointments */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 font-bold text-sm text-[#102747]">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Upcoming Appointments</span>
              </div>
              <button
                onClick={() => setCurrentScreen('appointments')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Dr. Sarah Johnson</div>
                  <div className="text-slate-500 text-[11px]">Cardiologist • 20 May 2026 - 11:00 AM</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                  Confirmed
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Dr. Michael Lee</div>
                  <div className="text-slate-500 text-[11px]">Neurologist • 28 May 2026 - 02:00 PM</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-600 border border-amber-100">
                  Pending
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Dr. Emily Davis</div>
                  <div className="text-slate-500 text-[11px]">Dermatologist • 05 Jun 2026 - 10:00 AM</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">
                  Scheduled
                </span>
              </div>
            </div>
          </div>

          {/* Recent AI Diagnosis (Slide 8) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 font-bold text-sm text-[#102747]">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Recent AI Diagnosis</span>
              </div>
              <button
                onClick={() => setCurrentScreen('symptom-checker')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
              >
                View Details
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Common Cold</div>
                  <div className="text-slate-500 text-[11px]">Confidence Score: <span className="font-semibold text-emerald-600">92%</span></div>
                </div>
                <button
                  onClick={() => setCurrentScreen('ai-diagnosis')}
                  className="text-blue-600 hover:text-blue-800 text-[11px] font-medium flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Allergy</div>
                  <div className="text-slate-500 text-[11px]">Confidence Score: <span className="font-semibold text-amber-600">78%</span></div>
                </div>
                <button
                  onClick={() => setCurrentScreen('ai-diagnosis')}
                  className="text-blue-600 hover:text-blue-800 text-[11px] font-medium flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">Migraine</div>
                  <div className="text-slate-500 text-[11px]">Confidence Score: <span className="font-semibold text-teal-600">85%</span></div>
                </div>
                <button
                  onClick={() => setCurrentScreen('ai-diagnosis')}
                  className="text-blue-600 hover:text-blue-800 text-[11px] font-medium flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Medical Reports (Slide 8) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2 font-bold text-sm text-[#102747]">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Recent Medical Reports</span>
                </div>
                <button
                  onClick={() => setCurrentScreen('medical-reports')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="mt-3 divide-y divide-slate-100 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Complete Blood Count</div>
                      <div className="text-slate-500 text-[11px]">15 May 2026</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('medical-reports')}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition cursor-pointer"
                    title="View & Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">X-Ray Chest</div>
                      <div className="text-slate-500 text-[11px]">02 May 2026</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('medical-reports')}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition cursor-pointer"
                    title="View & Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Thyroid Profile</div>
                      <div className="text-slate-500 text-[11px]">18 Apr 2026</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('medical-reports')}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition cursor-pointer"
                    title="View & Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Urine Routine</div>
                      <div className="text-slate-500 text-[11px]">06 Apr 2026</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('medical-reports')}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition cursor-pointer"
                    title="View & Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => setCurrentScreen('medical-reports')}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition text-center cursor-pointer"
              >
                Open Full Report Screen (Slide 11)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Hospital Services Grid (Requested by User) */}
      <div className="mt-6 pt-5 border-t border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <div className="font-bold text-sm text-[#102747]">Quick Patient Services & Clinical Tools</div>
          <span className="text-[11px] text-slate-500">6 Connected Portals Available</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Notifications */}
          <button
            onClick={() => setCurrentScreen('notifications')}
            className="p-3.5 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-300 text-left transition shadow-xs flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800">Notifications</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{unreadCount > 0 ? `${unreadCount} Unread Alerts` : 'Live Alerts'}</div>
            </div>
          </button>

          {/* 2. My Profile */}
          <button
            onClick={() => setCurrentScreen('my-profile')}
            className="p-3.5 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-300 text-left transition shadow-xs flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800">My Profile</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Demographics & Save</div>
            </div>
          </button>

          {/* 3. Lab Reports */}
          <button
            onClick={() => setCurrentScreen('lab-reports')}
            className="p-3.5 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-300 text-left transition shadow-xs flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800">Lab Reports</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Pathology & CBC</div>
            </div>
          </button>

          {/* 4. Health Tracking */}
          <button
            onClick={() => setCurrentScreen('health-tracking')}
            className="p-3.5 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-300 text-left transition shadow-xs flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800">Health Tracking</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Water, Steps & Log</div>
            </div>
          </button>

          {/* 5. Messages */}
          <button
            onClick={() => setCurrentScreen('messages')}
            className="p-3.5 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-300 text-left transition shadow-xs flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800">Messages</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Direct Doctor Chat</div>
            </div>
          </button>

          {/* 6. Settings */}
          <button
            onClick={() => setCurrentScreen('settings')}
            className="p-3.5 bg-white hover:bg-blue-50/60 rounded-xl border border-slate-200/80 hover:border-blue-300 text-left transition shadow-xs flex flex-col justify-between group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-800">Settings</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Security & Units</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
