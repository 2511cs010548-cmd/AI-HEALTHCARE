import React, { useState } from 'react';
import {
  FlaskConical,
  FileText,
  Download,
  Printer,
  Calendar,
  Search,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Eye,
  X
} from 'lucide-react';
import { ScreenId, LabTestItem } from '../types';

interface LabReportsScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
}

export const LabReportsScreen: React.FC<LabReportsScreenProps> = ({ setCurrentScreen }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeReportModal, setActiveReportModal] = useState<LabTestItem | null>(null);

  const [reports, setReports] = useState<LabTestItem[]>([
    {
      id: 'LAB-901',
      testName: 'Complete Blood Count (CBC)',
      category: 'Blood Work',
      date: '15 May 2026',
      department: 'Pathology Diagnostics',
      status: 'Completed',
      resultSummary: 'Platelet Count: 2.5 Lakh/µL, Hemoglobin: 14.2 g/dL, WBC: 6,200/µL. All values within normal biological ranges.',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 'LAB-884',
      testName: 'Chest X-Ray (PA View)',
      category: 'Imaging',
      date: '02 May 2026',
      department: 'Radiology & Imaging',
      status: 'Completed',
      resultSummary: 'Bilateral lung fields appear clear. Heart size normal with clear cardiophrenic angles.',
      doctor: 'Dr. Michael Lee'
    },
    {
      id: 'LAB-823',
      testName: 'Thyroid Function Profile (T3, T4, TSH)',
      category: 'Biochemistry',
      date: '18 Apr 2026',
      department: 'Biochemical Endocrine Lab',
      status: 'Completed',
      resultSummary: 'Serum TSH: 2.14 µIU/mL (Normal: 0.4 - 4.2). Free T4: 1.18 ng/dL. Normal thyroid activity.',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: 'LAB-802',
      testName: 'Comprehensive Metabolic Panel (CMP)',
      category: 'Biochemistry',
      date: '06 Apr 2026',
      department: 'Biochemical Pathology',
      status: 'Completed',
      resultSummary: 'Blood Glucose (Fasting): 92 mg/dL. Creatinine: 0.9 mg/dL. Liver enzymes (ALT/AST) normal.',
      doctor: 'Dr. Robert Chen'
    },
    {
      id: 'LAB-791',
      testName: 'Urine Analysis & Microscopy',
      category: 'Pathology',
      date: '06 Apr 2026',
      department: 'Clinical Microbiology',
      status: 'Completed',
      resultSummary: 'Color: Pale Yellow. Specific Gravity: 1.015. Protein/Glucose: Negative. Microscopic: Normal.',
      doctor: 'Dr. Robert Chen'
    }
  ]);

  const filteredReports = reports.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (rep: LabTestItem) => {
    const content = `AI HEALTHCARE HOSPITAL - LAB REPORT
Report ID: ${rep.id} | Date: ${rep.date}
Test Name: ${rep.testName}
Department: ${rep.department}
Ordering Physician: ${rep.doctor}
Status: ${rep.status}

SUMMARY FINDINGS:
${rep.resultSummary}

Electronically verified and signed by Clinical Diagnostics Laboratory.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Lab_Report_${rep.id}.txt`;
    a.click();
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-blue-600" />
            <span>Diagnostic Lab Reports</span>
          </h2>
          <p className="text-xs text-slate-500">
            Validated pathology, radiology, biochemical test results, and blood analyses
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentScreen('medical-reports')}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-1.5 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Complete Pathology Summary</span>
          </button>
        </div>
      </div>

      {/* Categories & Search */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto text-xs">
          {['All', 'Blood Work', 'Imaging', 'Biochemistry', 'Pathology'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tests, IDs, or departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {rep.id}
                    </span>
                    <span className="text-[11px] text-slate-400">{rep.category}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#102747] mt-1.5">{rep.testName}</h3>
                </div>

                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{rep.status}</span>
                </span>
              </div>

              <div className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {rep.resultSummary}
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>Ordered by: <strong className="text-slate-700 font-medium">{rep.doctor}</strong></span>
                <span>Date: {rep.date}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                onClick={() => setActiveReportModal(rep)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Values</span>
              </button>
              <button
                onClick={() => handleDownload(rep)}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <FlaskConical className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-sm text-[#102747]">{activeReportModal.testName}</span>
              </div>
              <button
                onClick={() => setActiveReportModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px] block">Report ID</span>
                  <span className="font-mono font-bold text-slate-800">{activeReportModal.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Sample Date</span>
                  <span className="font-semibold text-slate-800">{activeReportModal.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Laboratory Dept</span>
                  <span className="font-semibold text-slate-800">{activeReportModal.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Consulting Physician</span>
                  <span className="font-semibold text-slate-800">{activeReportModal.doctor}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 mb-1.5">Clinical Diagnostic Observations:</h4>
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-slate-800 leading-relaxed">
                  {activeReportModal.resultSummary}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Assurance Certified</span>
                </span>
                <div className="space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => handleDownload(activeReportModal)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                  >
                    Save Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
