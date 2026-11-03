import React, { useState } from 'react';
import {
  Pill,
  Plus,
  Printer,
  Download,
  Clock,
  User,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Zap,
  Info,
  X
} from 'lucide-react';
import { ScreenId, PrescriptionItem } from '../types';

interface PrescriptionsScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
}

export const PrescriptionsScreen: React.FC<PrescriptionsScreenProps> = ({ setCurrentScreen }) => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    {
      id: 'RX-1029',
      medicineName: 'Paracetamol (Calpol)',
      dosage: '500 mg',
      frequency: 'Twice daily after meals',
      duration: '5 Days',
      instructions: 'Take with full glass of water. Avoid taking on empty stomach.',
      doctorName: 'Dr. Sarah Johnson',
      prescribedDate: '10 May 2026',
      status: 'Active'
    },
    {
      id: 'RX-1030',
      medicineName: 'ORS (Oral Rehydration Salts)',
      dosage: '1 Sachet in 1L Water',
      frequency: 'Throughout the day',
      duration: '4 Days',
      instructions: 'Sip steadily to replenish vital minerals and prevent dehydration.',
      doctorName: 'Dr. Sarah Johnson',
      prescribedDate: '10 May 2026',
      status: 'Active'
    },
    {
      id: 'RX-1021',
      medicineName: 'Cetirizine Hydrochloride',
      dosage: '10 mg',
      frequency: 'Once daily at bedtime',
      duration: '7 Days',
      instructions: 'May cause mild drowsiness. Avoid driving or operating machinery.',
      doctorName: 'Dr. Emily Davis',
      prescribedDate: '02 May 2026',
      status: 'Completed'
    },
    {
      id: 'RX-1014',
      medicineName: 'Vitamin C + Zinc Chewable',
      dosage: '500 mg',
      frequency: 'Once daily after breakfast',
      duration: '30 Days',
      instructions: 'Immunity booster. Chew thoroughly before swallowing.',
      doctorName: 'Dr. Robert Chen',
      prescribedDate: '18 Apr 2026',
      status: 'Refill Due'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showSafetyAudit, setShowSafetyAudit] = useState(true);

  const [newRx, setNewRx] = useState({
    medicineName: '',
    dosage: '500 mg',
    frequency: 'Twice daily after meals',
    duration: '5 Days',
    instructions: 'Take after meals with water.',
    doctorName: 'Dr. Sarah Johnson'
  });

  const handleAddRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRx.medicineName.trim()) return;

    const item: PrescriptionItem = {
      id: `RX-${1031 + prescriptions.length}`,
      medicineName: newRx.medicineName,
      dosage: newRx.dosage,
      frequency: newRx.frequency,
      duration: newRx.duration,
      instructions: newRx.instructions,
      doctorName: newRx.doctorName,
      prescribedDate: 'Today',
      status: 'Active'
    };

    setPrescriptions([item, ...prescriptions]);
    setShowAddModal(false);
    setNewRx({
      medicineName: '',
      dosage: '500 mg',
      frequency: 'Twice daily after meals',
      duration: '5 Days',
      instructions: 'Take after meals with water.',
      doctorName: 'Dr. Sarah Johnson'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    let content = `AI HEALTHCARE SYSTEM - OFFICIAL E-PRESCRIPTION
===================================================
Patient: John Doe (ID: P12345) | Age 28 / Male
Issuing Hospital: AI Healthcare Medical Center
Date Issued: 10 May 2026

ACTIVE MEDICATIONS:\n`;

    prescriptions.forEach((p, idx) => {
      content += `\n${idx + 1}. ${p.medicineName} (${p.dosage})
   Frequency: ${p.frequency}
   Duration: ${p.duration}
   Doctor: ${p.doctorName}
   Instructions: ${p.instructions}\n`;
    });

    content += `\nAI PHARMACOLOGICAL SAFETY AUDIT:
• Drug-Drug Interaction: 0 Conflict Detected
• Renal / Hepatic Clearance: Safe for Normal Clearance
• Contraindications: Avoid Alcohol with Antihistamines
Digital Verification: Verified by Hospital Automated Pharmacy Dispenser.
===================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Prescriptions_John_Doe.txt';
    a.click();
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800 print:bg-white print:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 print:hidden">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <span>Prescriptions & Pharmacological Safety</span>
          </h2>
          <p className="text-xs text-slate-500">
            Active digital prescriptions with real-time AI drug-drug interaction audit & pharmacy dispenser
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Prescription</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Advanced AI Drug Interaction Safety Banner */}
      {showSafetyAudit && (
        <div className="mt-5 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs text-emerald-950">AI Drug-to-Drug Interaction Audit: 100% CLEAR</span>
                <span className="font-mono text-[10px] font-bold px-2 py-0.2 bg-emerald-600 text-white rounded">
                  Safety Index: 98/100
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                No adverse pharmacological synergies or hepatic overloads identified between Paracetamol, ORS, and Cetirizine.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1 flex-shrink-0">
            <span>Hospital Pharmacy Verified</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Patient Header Banner */}
      <div className="mt-4 bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm border border-blue-100">
            Rx
          </div>
          <div>
            <div className="font-bold text-sm text-[#102747]">Prescription Profile: John Doe</div>
            <div className="text-xs text-slate-500">Patient ID: P12345 • Age 28 • Male • Blood Group: O+</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
            {prescriptions.filter((p) => p.status === 'Active').length} Active Regimens
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500 font-mono text-[11px]">Sync: E-Prescription Network</span>
        </div>
      </div>

      {/* Prescription Cards List */}
      <div className="mt-5 space-y-4">
        {prescriptions.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base text-[#102747]">{p.medicineName}</h3>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {p.dosage}
                  </span>
                </div>
                <div className="text-xs text-slate-500 flex items-center space-x-3">
                  <span className="font-mono font-medium text-blue-600">{p.id}</span>
                  <span>•</span>
                  <span>Prescribed by: <strong className="text-slate-700">{p.doctorName}</strong></span>
                  <span>•</span>
                  <span>Date: {p.prescribedDate}</span>
                </div>
              </div>

              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                    p.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : p.status === 'Refill Due'
                      ? 'bg-amber-50 text-amber-600 border-amber-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Frequency</div>
                <div className="font-semibold text-slate-800 mt-0.5">{p.frequency}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Duration</div>
                <div className="font-semibold text-slate-800 mt-0.5">{p.duration}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Instructions</div>
                <div className="text-slate-700 mt-0.5 leading-snug">{p.instructions}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Prescription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-sm text-[#102747]">Issue New Prescription</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRx} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medication Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amoxicillin, Ibuprofen"
                  value={newRx.medicineName}
                  onChange={(e) => setNewRx({ ...newRx, medicineName: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 mg"
                    value={newRx.dosage}
                    onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 Days"
                    value={newRx.duration}
                    onChange={(e) => setNewRx({ ...newRx, duration: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                <select
                  value={newRx.frequency}
                  onChange={(e) => setNewRx({ ...newRx, frequency: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="Once daily in morning">Once daily in morning</option>
                  <option value="Twice daily after meals">Twice daily after meals</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Once daily at bedtime">Once daily at bedtime</option>
                  <option value="As needed for pain/fever">As needed for pain/fever</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Instructions / Advisory</label>
                <textarea
                  rows={2}
                  value={newRx.instructions}
                  onChange={(e) => setNewRx({ ...newRx, instructions: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer"
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
