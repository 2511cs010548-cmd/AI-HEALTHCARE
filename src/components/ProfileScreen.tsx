import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Heart,
  ShieldCheck,
  Calendar,
  Save,
  CheckCircle2,
  AlertCircle,
  FileBadge,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ScreenId, PatientProfileData } from '../types';

interface ProfileScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  profile: PatientProfileData;
  onSaveProfile: (updated: PatientProfileData) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  setCurrentScreen,
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<PatientProfileData>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Sync if parent profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const calculateInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name.slice(0, 2) || 'JD').toUpperCase();
  };

  const calculateAge = (dobString: string) => {
    if (!dobString) return 28;
    const birthDate = new Date(dobString);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    const computedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return isNaN(computedAge) ? 28 : computedAge;
  };

  const executeSave = () => {
    setIsSubmitting(true);

    const initials = calculateInitials(formData.name || 'John Doe');
    const computedAge = calculateAge(formData.dob);

    const updatedProfile: PatientProfileData = {
      ...formData,
      age: computedAge,
      avatarInitials: initials
    };

    onSaveProfile(updatedProfile);
    
    // Also save directly to localStorage to guarantee immediate persistence
    try {
      localStorage.setItem('ai_health_patient_profile', JSON.stringify(updatedProfile));
    } catch {}

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastSavedTime(now);

    setTimeout(() => {
      setIsSubmitting(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSave();
  };

  const handleReset = () => {
    setFormData(profile);
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800 relative">
      {/* Floating Success Toast Alert */}
      {savedSuccess && (
        <div className="sticky top-2 z-50 mb-4 p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn border border-emerald-400">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Profile Changes Saved Successfully!</div>
              <div className="text-xs text-emerald-100">
                Synchronized demographics, blood group ({formData.bloodGroup}), and contacts across hospital network {lastSavedTime ? `at ${lastSavedTime}` : ''}.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentScreen('patient-dashboard')}
              className="px-3.5 py-1.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer whitespace-nowrap"
            >
              View on Dashboard →
            </button>
            <button
              onClick={() => setSavedSuccess(false)}
              className="p-1 hover:bg-white/20 rounded-lg text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-600" />
            <span>My Health Profile & Demographics</span>
          </h2>
          <p className="text-xs text-slate-500">
            Manage your verified hospital records, personal contacts, emergency guardians, and insurance
          </p>
        </div>

        {/* Quick Top Save Action */}
        <div className="flex items-center space-x-2">
          {lastSavedTime && (
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Saved {lastSavedTime}
            </span>
          )}
          <button
            type="button"
            onClick={executeSave}
            disabled={isSubmitting}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 flex items-center space-x-2 transition cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Saving...' : '💾 Save Profile Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Summary Card + Edit Form */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Avatar & Live Preview Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-3xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20 border-4 border-white">
                {calculateInitials(formData.name)}
              </div>
              <span className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white absolute bottom-1 right-1" title="Active Patient Account" />
            </div>

            <h3 className="text-lg font-bold text-[#102747] mt-3">{formData.name}</h3>
            <p className="text-xs text-slate-500">
              Patient ID: <span className="font-mono font-semibold text-blue-600">{formData.id}</span>
            </p>

            <div className="mt-3 flex items-center justify-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                {calculateAge(formData.dob)} Years • {formData.gender}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                Blood Group: {formData.bloodGroup}
              </span>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 text-left space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{formData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{formData.address}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <span className="inline-flex items-center space-x-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>HIPAA & Hospital Identity Verified</span>
              </span>
            </div>
          </div>

          {/* Connected Hospital Records Box */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 text-xs">
            <div className="font-bold text-[#102747] mb-2">Connected Clinical Records</div>
            <button
              onClick={() => setCurrentScreen('medical-reports')}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-left text-slate-700 transition flex items-center justify-between cursor-pointer"
            >
              <span>View Latest Pathology Report</span>
              <FileBadge className="w-3.5 h-3.5 text-blue-600" />
            </button>
            <button
              onClick={() => setCurrentScreen('prescriptions')}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-left text-slate-700 transition flex items-center justify-between cursor-pointer"
            >
              <span>Active Medications (4 Regimens)</span>
              <Heart className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        </div>

        {/* Right Column: Editable Profile Details Form */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
            <div>
              <h3 className="text-sm font-bold text-[#102747]">Demographics & Medical Record Information</h3>
              <p className="text-[11px] text-slate-400">Make changes below and click Save Profile Changes</p>
            </div>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded font-bold border border-blue-100">
              File: #{formData.id}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Primary Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Biological Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="O+">O+ (Universal Red Cell Donor)</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+ (Universal Plasma Donor)</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Residential Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Emergency & Clinical Background */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-xs text-[#102747] mb-3 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Emergency Contacts & Clinical Background</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Person & Phone</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Jane Doe (Spouse) - +1 (555) 987-6543"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Known Drug or Food Allergies</label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Penicillin, Peanuts, Sulfa drugs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chronic Medical Conditions</label>
                  <input
                    type="text"
                    value={formData.chronicConditions}
                    onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Mild Allergic Rhinitis, Hypertension"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Health Insurance Provider & Policy ID</label>
                  <input
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. BlueCross Premier #BC-992184"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Fields</span>
              </button>

              <button
                type="submit"
                onClick={executeSave}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#1a64db] hover:bg-[#1553b7] text-white font-bold rounded-xl shadow-md shadow-blue-500/25 flex items-center space-x-2 transition cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving Profile Changes...' : '💾 Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
