import React from 'react';
import {
  Users,
  Calendar,
  BarChart3,
  FileCheck,
  Search,
  Bell,
  ChevronRight,
  Eye
} from 'lucide-react';
import { ScreenId, NotificationItem } from '../types';
import { NotificationsDropdown } from './NotificationsDropdown';

interface DoctorDashboardProps {
  setCurrentScreen: (screen: ScreenId) => void;
  notifications?: NotificationItem[];
  setNotifications?: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  setCurrentScreen,
  notifications = [],
  setNotifications
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

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
  const patients = [
    { id: 'P12345', name: 'John Doe', age: 28, lastVisit: '10 May 2026', diagnosis: 'Dengue Fever', badgeColor: 'bg-red-50 text-red-600 border-red-100' },
    { id: 'P12346', name: 'Emily Smith', age: 32, lastVisit: '09 May 2026', diagnosis: 'Typhoid', badgeColor: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 'P12347', name: 'Michael Brown', age: 45, lastVisit: '08 May 2026', diagnosis: 'Migraine', badgeColor: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'P12348', name: 'Sarah Davis', age: 29, lastVisit: '08 May 2026', diagnosis: 'Acidity', badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  ];

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header (Slide 10 - 5. Doctor Dashboard) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-800 text-white font-bold flex items-center justify-center text-lg shadow-sm">
            SJ
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#102747]">Welcome, Dr. Sarah Johnson</h2>
            <p className="text-xs text-slate-500 font-medium">Chief Cardiologist • Department of Internal Medicine</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients or reports..."
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
        </div>
      </div>

      {/* 4 Metric Cards (Slide 10) */}
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Patients */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Patients</div>
            <div className="text-3xl font-extrabold text-[#102747] mt-1">120</div>
            <span className="text-[10px] text-slate-500 font-medium">Today</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Appointments</div>
            <div className="text-3xl font-extrabold text-[#102747] mt-1">18</div>
            <span className="text-[10px] text-slate-500 font-medium">Today</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* AI Reports */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">AI Reports</div>
            <div className="text-3xl font-extrabold text-[#102747] mt-1">32</div>
            <span className="text-[10px] text-slate-500 font-medium">This Week</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
        </div>

        {/* Prescriptions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Prescriptions</div>
            <div className="text-3xl font-extrabold text-[#102747] mt-1">26</div>
            <span className="text-[10px] text-slate-500 font-medium">This Week</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recent Patients Table (Slide 10) */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#102747]">Recent Patients</h3>
          <span className="text-xs text-slate-500">Live AI diagnosis records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Patient ID</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Age</th>
                <th className="py-3 px-5">Last Visit</th>
                <th className="py-3 px-5">AI Diagnosis</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-5 font-mono text-slate-500 font-medium">{p.id}</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-900">{p.name}</td>
                  <td className="py-3.5 px-5">{p.age}</td>
                  <td className="py-3.5 px-5 text-slate-500">{p.lastVisit}</td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${p.badgeColor}`}>
                      {p.diagnosis}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <button
                      onClick={() => setCurrentScreen('medical-reports')}
                      className="px-2.5 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-[11px] inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Report</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={() => setCurrentScreen('patients')}
            className="px-4 py-2 bg-[#1a64db] hover:bg-[#1553b7] text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 transition cursor-pointer"
          >
            View All Patients
          </button>
        </div>
      </div>
    </div>
  );
};
