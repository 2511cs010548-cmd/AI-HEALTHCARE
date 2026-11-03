import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  FileText,
  Pill,
  ChevronRight,
  Phone,
  Calendar,
  CheckCircle2,
  X
} from 'lucide-react';
import { ScreenId, DoctorPatient } from '../types';

interface PatientsScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
}

export const PatientsScreen: React.FC<PatientsScreenProps> = ({ setCurrentScreen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Under Observation' | 'Recovered'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [patients, setPatients] = useState<DoctorPatient[]>([
    {
      id: 'P12345',
      name: 'John Doe',
      age: 28,
      gender: 'Male',
      bloodGroup: 'O+',
      lastVisit: '10 May 2026',
      phone: '+1 (555) 234-5678',
      diagnosis: 'Dengue Fever',
      status: 'Under Observation'
    },
    {
      id: 'P12346',
      name: 'Emily Smith',
      age: 32,
      gender: 'Female',
      bloodGroup: 'A+',
      lastVisit: '09 May 2026',
      phone: '+1 (555) 876-5432',
      diagnosis: 'Typhoid',
      status: 'Active'
    },
    {
      id: 'P12347',
      name: 'Michael Brown',
      age: 45,
      gender: 'Male',
      bloodGroup: 'B+',
      lastVisit: '08 May 2026',
      phone: '+1 (555) 345-6789',
      diagnosis: 'Migraine',
      status: 'Recovered'
    },
    {
      id: 'P12348',
      name: 'Sarah Davis',
      age: 29,
      gender: 'Female',
      bloodGroup: 'AB+',
      lastVisit: '08 May 2026',
      phone: '+1 (555) 987-6543',
      diagnosis: 'Acidity',
      status: 'Recovered'
    },
    {
      id: 'P12349',
      name: 'Robert Miller',
      age: 54,
      gender: 'Male',
      bloodGroup: 'O-',
      lastVisit: '05 May 2026',
      phone: '+1 (555) 654-3210',
      diagnosis: 'Hypertension',
      status: 'Active'
    }
  ]);

  // Form State
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: 25,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    diagnosis: 'Viral Infection'
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name.trim()) return;

    const patient: DoctorPatient = {
      id: `P${12350 + patients.length}`,
      name: newPatient.name,
      age: Number(newPatient.age),
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      phone: newPatient.phone || '+1 (555) 000-0000',
      lastVisit: 'Today',
      diagnosis: newPatient.diagnosis,
      status: 'Active'
    };

    setPatients([patient, ...patients]);
    setShowAddModal(false);
    setNewPatient({
      name: '',
      age: 25,
      gender: 'Male',
      bloodGroup: 'O+',
      phone: '',
      diagnosis: 'Viral Infection'
    });
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Patients Directory</span>
          </h2>
          <p className="text-xs text-slate-500">
            Manage patient electronic medical records, histories, and diagnoses
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Patient</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Pills */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Registered</div>
          <div className="text-2xl font-bold text-[#102747] mt-1">{patients.length}</div>
          <span className="text-[10px] text-emerald-600 font-medium">All departments</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Under Observation</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {patients.filter((p) => p.status === 'Under Observation').length}
          </div>
          <span className="text-[10px] text-slate-400">Monitoring vitals</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Active Cases</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {patients.filter((p) => p.status === 'Active').length}
          </div>
          <span className="text-[10px] text-slate-400">In consultation</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Recovered</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {patients.filter((p) => p.status === 'Recovered').length}
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Discharged</span>
        </div>
      </div>

      {/* Controls: Search & Filters */}
      <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] mr-1">Filter:</span>
          {(['All', 'Active', 'Under Observation', 'Recovered'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer ${
                statusFilter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Patients Table */}
      <div className="mt-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Patient ID</th>
                <th className="py-3 px-5">Name & Contact</th>
                <th className="py-3 px-5">Age/Gender</th>
                <th className="py-3 px-5">Blood</th>
                <th className="py-3 px-5">AI Diagnosis</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-5 font-mono font-medium text-slate-600">{p.id}</td>
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                      <Phone className="w-2.5 h-2.5" />
                      <span>{p.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">{p.age} yrs • {p.gender}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-100 font-semibold text-[11px]">
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="font-semibold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-[11px]">
                      {p.diagnosis}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                        p.status === 'Recovered'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : p.status === 'Under Observation'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => setCurrentScreen('medical-reports')}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[11px] inline-flex items-center space-x-1 cursor-pointer"
                      title="View Medical Report"
                    >
                      <FileText className="w-3 h-3 text-slate-500" />
                      <span>Report</span>
                    </button>
                    <button
                      onClick={() => setCurrentScreen('prescriptions')}
                      className="px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium text-[11px] inline-flex items-center space-x-1 cursor-pointer"
                      title="View or Write Prescriptions"
                    >
                      <Pill className="w-3 h-3 text-blue-500" />
                      <span>Prescribe</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-sm text-[#102747]">Add New Patient Record</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial AI Diagnosis / Condition</label>
                <input
                  type="text"
                  value={newPatient.diagnosis}
                  onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })}
                  placeholder="e.g. Dengue Fever, Viral Infection"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600"
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
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
