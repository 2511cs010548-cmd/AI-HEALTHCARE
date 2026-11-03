import React, { useState } from 'react';
import {
  TrendingUp,
  Heart,
  Droplet,
  Flame,
  Moon,
  Activity,
  Plus,
  Scale,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { ScreenId } from '../types';

interface HealthTrackingScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
}

export const HealthTrackingScreen: React.FC<HealthTrackingScreenProps> = ({ setCurrentScreen }) => {
  const [waterMl, setWaterMl] = useState(2500);
  const targetWater = 3000;
  const [steps, setSteps] = useState(8420);
  const targetSteps = 10000;

  const [vitalsHistory, setVitalsHistory] = useState([
    { date: 'Today, 08:30 AM', heartRate: 72, bp: '120/80', sugar: 98, weight: 70 },
    { date: 'Yesterday, 09:15 AM', heartRate: 74, bp: '118/78', sugar: 95, weight: 70.2 },
    { date: '08 May 2026', heartRate: 76, bp: '122/82', sugar: 102, weight: 70.4 },
    { date: '07 May 2026', heartRate: 71, bp: '119/79', sugar: 97, weight: 70.1 },
  ]);

  const [showLogModal, setShowLogModal] = useState(false);
  const [newLog, setNewLog] = useState({
    heartRate: 72,
    bp: '120/80',
    sugar: 98,
    weight: 70
  });

  const handleAddWater = () => {
    setWaterMl((prev) => Math.min(prev + 250, targetWater + 1000));
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVitalsHistory([
      {
        date: 'Just now',
        heartRate: Number(newLog.heartRate),
        bp: newLog.bp,
        sugar: Number(newLog.sugar),
        weight: Number(newLog.weight)
      },
      ...vitalsHistory
    ]);
    setShowLogModal(false);
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Health & Vitals Tracking</span>
          </h2>
          <p className="text-xs text-slate-500">
            Real-time biometric monitoring, hydration tracking, and wellness milestones
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log New Vitals</span>
        </button>
      </div>

      {/* Main Trackers Row */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Daily Steps */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              👟
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              {Math.round((steps / targetSteps) * 100)}%
            </span>
          </div>

          <div className="my-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Daily Steps</div>
            <div className="text-2xl font-bold text-[#102747]">{steps.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Goal: {targetSteps.toLocaleString()} steps</div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((steps / targetSteps) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Droplet className="w-5 h-5 text-blue-500 fill-blue-500/20" />
            </div>
            <button
              onClick={handleAddWater}
              className="text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition cursor-pointer"
            >
              +250 ml
            </button>
          </div>

          <div className="my-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Water Hydration</div>
            <div className="text-2xl font-bold text-[#102747]">
              {(waterMl / 1000).toFixed(1)} <span className="text-xs font-normal text-slate-500">L</span>
            </div>
            <div className="text-xs text-slate-500">Goal: {(targetWater / 1000).toFixed(1)} L/day</div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((waterMl / targetWater) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Calories Burned */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>

          <div className="my-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Calories Burned</div>
            <div className="text-2xl font-bold text-[#102747]">
              1,840 <span className="text-xs font-normal text-slate-500">kcal</span>
            </div>
            <div className="text-xs text-slate-500">Target: 2,200 kcal/day</div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-red-500 h-full rounded-full" style={{ width: '84%' }} />
          </div>
        </div>

        {/* Sleep Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Moon className="w-5 h-5 text-indigo-500" />
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Score: 88
            </span>
          </div>

          <div className="my-3">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Sleep Quality</div>
            <div className="text-2xl font-bold text-[#102747]">
              7h 24m <span className="text-xs font-normal text-slate-500">rest</span>
            </div>
            <div className="text-xs text-slate-500">Deep Sleep: 2h 10m</div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '88%' }} />
          </div>
        </div>
      </div>

      {/* Vitals History Table */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#102747]">Recent Biometric Logs</h3>
            <p className="text-xs text-slate-500">Synchronized clinical records & home-tracked readings</p>
          </div>
          <button
            onClick={() => setCurrentScreen('symptom-checker')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition cursor-pointer"
          >
            Check Symptoms with Vitals
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-5">Heart Rate</th>
                <th className="py-3 px-5">Blood Pressure</th>
                <th className="py-3 px-5">Blood Sugar</th>
                <th className="py-3 px-5">Body Weight</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {vitalsHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-5 font-semibold text-slate-900">{item.date}</td>
                  <td className="py-3.5 px-5 font-mono text-emerald-600 font-bold">{item.heartRate} bpm</td>
                  <td className="py-3.5 px-5 font-mono text-blue-600 font-bold">{item.bp} mmHg</td>
                  <td className="py-3.5 px-5 font-mono text-amber-600 font-bold">{item.sugar} mg/dL</td>
                  <td className="py-3.5 px-5 font-mono text-purple-600 font-bold">{item.weight} kg</td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Normal Range
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Vitals Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-sm text-[#102747]">Log Today's Biometrics</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLogSubmit} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    value={newLog.heartRate}
                    onChange={(e) => setNewLog({ ...newLog, heartRate: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Pressure</label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={newLog.bp}
                    onChange={(e) => setNewLog({ ...newLog, bp: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    value={newLog.sugar}
                    onChange={(e) => setNewLog({ ...newLog, sugar: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newLog.weight}
                    onChange={(e) => setNewLog({ ...newLog, weight: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
