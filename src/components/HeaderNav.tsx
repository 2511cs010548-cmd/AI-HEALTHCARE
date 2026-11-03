import React from 'react';
import { ScreenId } from '../types';
import { Stethoscope } from 'lucide-react';

interface HeaderNavProps {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  activeRole: 'patient' | 'doctor';
  setActiveRole: (role: 'patient' | 'doctor') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  setCurrentScreen,
  activeRole,
  setActiveRole
}) => {
  const screens: { id: ScreenId; label: string; slide: string }[] = [
    { id: 'login', label: '1. Login Screen', slide: 'Slide 8' },
    { id: 'patient-dashboard', label: '2. Patient Dashboard', slide: 'Slide 8' },
    { id: 'my-profile', label: 'My Profile', slide: 'Patient' },
    { id: 'symptom-checker', label: '3. Symptom Input', slide: 'Slide 9' },
    { id: 'ai-diagnosis', label: '4. AI Diagnosis Result', slide: 'Slide 9' },
    { id: 'doctor-dashboard', label: '5. Doctor Dashboard', slide: 'Slide 10' },
    { id: 'patients', label: 'Patients Directory', slide: 'Doctors' },
    { id: 'prescriptions', label: 'Prescriptions', slide: 'Pharmacy' },
    { id: 'lab-reports', label: 'Lab Reports', slide: 'Diagnostic' },
    { id: 'health-tracking', label: 'Health Tracking', slide: 'Vitals' },
    { id: 'messages', label: 'Messages', slide: 'Chat' },
    { id: 'appointments', label: '6. Appointment Screen', slide: 'Slide 10' },
    { id: 'medical-reports', label: '7. Medical Report Details', slide: 'Slide 11' },
    { id: 'settings', label: 'Settings', slide: 'Config' },
    { id: 'notifications', label: 'Notifications', slide: 'Alerts' },
  ];

  return (
    <div className="bg-[#091829] border-b border-[#152e4d] px-4 py-2 flex flex-wrap items-center justify-between text-xs select-none sticky top-0 z-50">
      <div className="flex items-center space-x-3 mr-3 py-1">
        <div className="flex items-center space-x-2 text-white font-semibold">
          <Stethoscope className="w-4 h-4 text-blue-400" />
          <span className="hidden sm:inline">Project Presentation Demo:</span>
        </div>
      </div>

      {/* Screen selector pills matching user's presentation slides */}
      <div className="flex items-center space-x-1.5 overflow-x-auto py-1 max-w-full">
        {screens.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setCurrentScreen(s.id);
              if (s.id === 'doctor-dashboard') {
                setActiveRole('doctor');
              } else if (s.id === 'patient-dashboard') {
                setActiveRole('patient');
              }
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition cursor-pointer font-medium ${
              currentScreen === s.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-[#122842] text-slate-300 hover:bg-[#1a385c] hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2 ml-3 py-1">
        <span className="text-[11px] text-slate-400">Role:</span>
        <button
          onClick={() => {
            const next = activeRole === 'patient' ? 'doctor' : 'patient';
            setActiveRole(next);
            setCurrentScreen(next === 'patient' ? 'patient-dashboard' : 'doctor-dashboard');
          }}
          className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#173861] text-blue-300 hover:bg-[#204a80] transition cursor-pointer"
        >
          {activeRole === 'patient' ? '👤 Patient' : '👨‍⚕️ Doctor'}
        </button>
      </div>
    </div>
  );
};
