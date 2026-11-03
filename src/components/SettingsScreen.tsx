import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Lock,
  Globe,
  Shield,
  Download,
  CheckCircle2,
  Trash2,
  Save,
  Moon,
  Smartphone
} from 'lucide-react';
import { ScreenId } from '../types';

interface SettingsScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ setCurrentScreen }) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [labReadyAlerts, setLabReadyAlerts] = useState(true);
  const [aiAssistantSync, setAiAssistantSync] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [language, setLanguage] = useState('English');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportData = () => {
    const data = {
      patient: {
        name: 'John Doe',
        id: 'P12345',
        dob: '1998-04-12',
        gender: 'Male',
        bloodGroup: 'O+'
      },
      vitals: {
        heartRate: '72 bpm',
        bp: '120/80 mmHg',
        sugar: '98 mg/dL',
        weight: '70 kg'
      },
      activeDiagnoses: ['Dengue Fever', 'Common Cold', 'Mild Viral Fever'],
      prescriptions: [
        'Paracetamol 500mg - Twice daily',
        'ORS Sachet in 1L water'
      ],
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'John_Doe_Medical_History_Export.json';
    a.click();
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <span>Settings & Preferences</span>
          </h2>
          <p className="text-xs text-slate-500">
            Account security, clinical notifications, data privacy, and language options
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg flex items-center space-x-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="mt-5 max-w-4xl space-y-6 text-xs">
        {/* Notifications Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 font-bold text-sm text-[#102747]">
            <Bell className="w-4 h-4 text-blue-600" />
            <span>Notification Preferences</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">Email Notifications</div>
                <div className="text-[11px] text-slate-500">Receive appointment receipts and doctor consultation summaries</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">SMS Appointment Reminders</div>
                <div className="text-[11px] text-slate-500">Get text message reminders 2 hours before doctor visits</div>
              </div>
              <input
                type="checkbox"
                checked={smsReminders}
                onChange={(e) => setSmsReminders(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">Lab Test Result Ready Alerts</div>
                <div className="text-[11px] text-slate-500">Instant alert when pathology blood or imaging results are verified</div>
              </div>
              <input
                type="checkbox"
                checked={labReadyAlerts}
                onChange={(e) => setLabReadyAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 font-bold text-sm text-[#102747]">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Security & Privacy</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">Two-Factor Authentication (2FA)</div>
                <div className="text-[11px] text-slate-500">Require an SMS or authenticator code during hospital login</div>
              </div>
              <input
                type="checkbox"
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 transition cursor-pointer">
              <div>
                <div className="font-semibold text-slate-800">AI Diagnostic Data Consent</div>
                <div className="text-[11px] text-slate-500">Allow machine learning engine to suggest preliminary differentials</div>
              </div>
              <input
                type="checkbox"
                checked={aiAssistantSync}
                onChange={(e) => setAiAssistantSync(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        {/* Regional & System Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 font-bold text-sm text-[#102747]">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>System Preferences</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="English">English (United States)</option>
                <option value="Spanish">Español (Spanish)</option>
                <option value="French">Français (French)</option>
                <option value="Hindi">हिंदी (Hindi)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Measurement Units</label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="metric">Metric (kg, cm, mmHg, mg/dL)</option>
                <option value="imperial">Imperial (lbs, ft/in, mmHg, mg/dL)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Export & Data Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 font-bold text-sm text-[#102747]">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>Data Ownership & Portability</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl">
            <div>
              <div className="font-semibold text-slate-800">Download Complete Medical Record</div>
              <div className="text-[11px] text-slate-500">Export your vitals, past diagnoses, and prescriptions in JSON format</div>
            </div>
            <button
              type="button"
              onClick={handleExportData}
              className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg shadow-sm flex items-center space-x-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Record</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-500/20 flex items-center space-x-2 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
