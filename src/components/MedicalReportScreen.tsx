import React from 'react';
import {
  Download,
  Printer,
  FileText,
  User,
  CheckCircle,
  Pill,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { DiagnosisRecord } from '../types';

interface MedicalReportScreenProps {
  currentDiagnosis?: DiagnosisRecord;
}

export const MedicalReportScreen: React.FC<MedicalReportScreenProps> = ({ currentDiagnosis }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportText = `AI HEALTHCARE SYSTEM - MEDICAL REPORT
Report ID: RPT56789 | Date: 10 May 2026
Patient Name: John Doe (ID: P12345)
Age/Gender: 28 / Male
Diagnosis: ${currentDiagnosis ? currentDiagnosis.disease : 'Mild Viral Fever'} (${currentDiagnosis ? currentDiagnosis.confidence : '82% AI Confidence'})

LAB TEST RESULTS:
- Hemoglobin: 14.2 g/dL (Range: 13.0 - 17.0) [Normal]
- WBC Count: 6,200 /µL (Range: 4,000 - 11,000) [Normal]
- Platelet Count: 2.5 Lakh /µL (Range: 1.5 - 4.5 Lakh) [Normal]
- Blood Sugar (F): 92 mg/dL (Range: 70 - 100) [Normal]

PRESCRIPTION:
- Paracetamol 500mg - Twice a day
- ORS - After meals
- Take rest and drink plenty of fluids.
`;
    const element = document.createElement('a');
    const file = new Blob([reportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Medical_Report_John_Doe_P12345.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800 print:bg-white print:p-0">
      {/* Header (Slide 11 - 7. Medical Report Details) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 print:hidden">
        <div>
          <h2 className="text-xl font-bold text-[#102747]">Medical Report Details</h2>
          <p className="text-xs text-slate-500">
            Validated pathology tests, automated AI diagnostic summary, and prescribed regimen
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-[#1a64db] hover:bg-[#1553b7] text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Report Container (Slide 11) */}
      <div className="mt-5 max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 md:p-8 space-y-6 print:border-none print:shadow-none">
        
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              +
            </div>
            <div>
              <div className="text-base font-bold text-[#102747]">AI Healthcare Diagnostics Center</div>
              <div className="text-[11px] text-slate-500">Accredited Clinical Pathology & AI Health Analytics</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-blue-600">REPORT ID: RPT56789</div>
            <div className="text-[10px] text-slate-400">Date: 10 May 2026</div>
          </div>
        </div>

        {/* Patient Details & Diagnosis/Prescription Layout (Slide 11) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Patient Details + Test Results Table */}
          <div className="lg:col-span-8 space-y-5">
            {/* Patient Details Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-[#102747] uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Patient Details</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block">Name</span>
                  <span className="font-semibold text-slate-900">John Doe</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Patient ID</span>
                  <span className="font-semibold text-slate-900 font-mono">P12345</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Age / Gender</span>
                  <span className="font-semibold text-slate-900">28 / Male</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Report Date</span>
                  <span className="font-semibold text-slate-900">10 May 2026</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Report ID</span>
                  <span className="font-semibold text-slate-900 font-mono">RPT56789</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Referred By</span>
                  <span className="font-semibold text-slate-900">Dr. Sarah Johnson</span>
                </div>
              </div>
            </div>

            {/* Test Results Table (Slide 11) */}
            <div className="border border-slate-200/80 rounded-xl overflow-hidden">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200/80 font-bold text-xs text-[#102747]">
                Test Results
              </div>
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/50 text-slate-500 font-semibold text-[11px] border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-4">Test Name</th>
                    <th className="py-2.5 px-4">Result</th>
                    <th className="py-2.5 px-4">Range</th>
                    <th className="py-2.5 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">Hemoglobin</td>
                    <td className="py-2.5 px-4 font-mono font-semibold">14.2 g/dL</td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono">13.0 - 17.0</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Normal
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">WBC Count</td>
                    <td className="py-2.5 px-4 font-mono font-semibold">6,200 /µL</td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono">4,000 - 11,000</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Normal
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">Platelet Count</td>
                    <td className="py-2.5 px-4 font-mono font-semibold">2.5 Lakh /µL</td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono">1.5 - 4.5 Lakh</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Normal
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">Blood Sugar (F)</td>
                    <td className="py-2.5 px-4 font-mono font-semibold">92 mg/dL</td>
                    <td className="py-2.5 px-4 text-slate-500 font-mono">70 - 100</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        Normal
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Diagnosis & Prescription (Slide 11) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Diagnosis Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200/80">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                Diagnosis
              </span>
              <h4 className="text-lg font-extrabold text-[#102747] mt-1">
                {currentDiagnosis ? currentDiagnosis.disease : 'Mild Viral Fever'}
              </h4>
              <div className="mt-2 text-xs font-semibold text-teal-700 bg-white/80 border border-teal-200/80 px-2 py-1 rounded inline-block">
                AI Confidence: {currentDiagnosis ? currentDiagnosis.confidence : '82%'}
              </div>
            </div>

            {/* Prescription Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-[#102747] uppercase tracking-wider flex items-center space-x-1.5">
                <Pill className="w-3.5 h-3.5 text-blue-600" />
                <span>Prescription</span>
              </h4>

              <ul className="text-xs text-slate-700 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-slate-900">Paracetamol 500mg</span>
                    <span className="text-slate-500 block text-[11px]">Twice a day</span>
                  </div>
                </li>

                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <div>
                    <span className="font-semibold text-slate-900">ORS (Oral Rehydration Salts)</span>
                    <span className="text-slate-500 block text-[11px]">After meals</span>
                  </div>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-600 italic">
                Take rest and drink plenty of fluids.
              </div>
            </div>

            {/* Doctor Signature / Verification */}
            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center">
              <div className="text-[11px] text-slate-400">Digitally Verified By</div>
              <div className="font-serif italic text-slate-800 text-sm font-bold mt-0.5">
                Dr. Sarah Johnson, M.D.
              </div>
              <div className="text-[10px] text-slate-500">Reg. No: MED-884920</div>
            </div>
          </div>
        </div>

        {/* Footer verification */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Electronically verified & signed clinical document</span>
          </div>
          <div>Page 1 of 1</div>
        </div>
      </div>
    </div>
  );
};
