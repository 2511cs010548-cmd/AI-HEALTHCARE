import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Video,
  Building,
  User,
  Download,
  Printer,
  CalendarCheck,
  MapPin,
  Trash2,
  X
} from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentScreenProps {
  onAppointmentBooked?: (apt: Appointment) => void;
}

export const AppointmentScreen: React.FC<AppointmentScreenProps> = ({ onAppointmentBooked }) => {
  // Booking Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState('doc-1');
  const [date, setDate] = useState('2026-05-22');
  const [time, setTime] = useState('11:00 AM');
  const [consultType, setConsultType] = useState<'In-Person' | 'Video Call'>('In-Person');
  const [reason, setReason] = useState('Dengue fever follow-up & platelet count review');
  
  // Confirmation Slip State
  const [confirmedTicket, setConfirmedTicket] = useState<{
    id: string;
    tokenNo: string;
    doctorName: string;
    specialty: string;
    department: string;
    room: string;
    date: string;
    time: string;
    type: string;
    fee: string;
  } | null>(null);

  const doctors = [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist & Internal Medicine',
      department: 'Cardiology, 3rd Floor, Room 304',
      experience: '14 Years Exp.',
      rating: '4.9 ★',
      fee: '$50 (Covered by Insurance)',
      avatar: 'SJ'
    },
    {
      id: 'doc-2',
      name: 'Dr. Michael Lee',
      specialty: 'Neurologist',
      department: 'Neurology Clinic, 2nd Floor, Room 212',
      experience: '11 Years Exp.',
      rating: '4.8 ★',
      fee: '$60',
      avatar: 'ML'
    },
    {
      id: 'doc-3',
      name: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      department: 'Dermatology OPD, 1st Floor, Room 108',
      experience: '9 Years Exp.',
      rating: '4.9 ★',
      fee: '$45',
      avatar: 'ED'
    },
    {
      id: 'doc-4',
      name: 'Dr. Robert Chen',
      specialty: 'General Physician & Infectious Diseases',
      department: 'General OPD, Ground Floor, Room 015',
      experience: '18 Years Exp.',
      rating: '4.9 ★',
      fee: '$40',
      avatar: 'RC'
    }
  ];

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt-101',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '20 May 2026',
      time: '11:00 AM',
      status: 'Confirmed'
    },
    {
      id: 'apt-102',
      doctorName: 'Dr. Michael Lee',
      specialty: 'Neurologist',
      date: '25 May 2026',
      time: '02:00 PM',
      status: 'Scheduled'
    },
    {
      id: 'apt-103',
      doctorName: 'Dr. Emily Davis',
      specialty: 'Dermatologist',
      date: '30 May 2026',
      time: '10:00 AM',
      status: 'Pending'
    }
  ]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];
    const token = `TKN-${Math.floor(100 + Math.random() * 900)}`;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctorName: doc.name,
      specialty: doc.specialty.split('&')[0].trim(),
      date: date,
      time: time,
      status: 'Confirmed'
    };

    setAppointments([newApt, ...appointments]);

    // Generate Confirmation Slip
    setConfirmedTicket({
      id: newApt.id,
      tokenNo: token,
      doctorName: doc.name,
      specialty: doc.specialty,
      department: doc.department,
      room: doc.department.split(',')[2] || 'Room 304',
      date: date,
      time: time,
      type: consultType,
      fee: doc.fee
    });

    if (onAppointmentBooked) {
      onAppointmentBooked(newApt);
    }
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter((a) => a.id !== id));
    }
  };

  const handleDownloadSlip = () => {
    if (!confirmedTicket) return;
    const content = `AI HEALTHCARE HOSPITAL - OFFICIAL APPOINTMENT PASS
==================================================
Booking Token: ${confirmedTicket.tokenNo}
Patient Name: John Doe (ID: P12345)
Date of Visit: ${confirmedTicket.date}
Time Slot: ${confirmedTicket.time}
Consultation Mode: ${confirmedTicket.type}

DOCTOR DETAILS:
Consultant: ${confirmedTicket.doctorName}
Specialty: ${confirmedTicket.specialty}
Hospital Location: ${confirmedTicket.department}
Consultation Fee: ${confirmedTicket.fee}

INSTRUCTIONS:
1. Please report at least 15 minutes prior to your slot.
2. Present this token at Reception Desk 2 for priority check-in.
3. Bring previous lab reports & medical files.

Emergency Hospital Helpline: +1 (555) 019-2834
==================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Appointment_Pass_${confirmedTicket.tokenNo}.txt`;
    a.click();
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="pb-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <CalendarCheck className="w-5 h-5 text-blue-600" />
            <span>Doctor Appointment Booking</span>
          </h2>
          <p className="text-xs text-slate-500">
            Select a verified hospital specialist, choose your preferred slot, and get your digital check-in token
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 font-semibold flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>OPD Available Today</span>
          </span>
        </div>
      </div>

      {/* Confirmation Slip Banner (Appears immediately after booking) */}
      {confirmedTicket && (
        <div className="mt-5 p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-300 rounded-2xl shadow-md animate-fadeIn flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xl flex-shrink-0 shadow-md shadow-emerald-600/20">
              ✓
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm text-[#102747]">Appointment Successfully Confirmed!</span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                  Token: {confirmedTicket.tokenNo}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Scheduled with <strong>{confirmedTicket.doctorName}</strong> ({confirmedTicket.specialty}) on{' '}
                <strong>{confirmedTicket.date}</strong> at <strong>{confirmedTicket.time}</strong>.
              </p>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-2">
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{confirmedTicket.department}</span>
                <span>•</span>
                <span className="font-medium text-blue-700">Mode: {confirmedTicket.type}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end md:self-center">
            <button
              onClick={handleDownloadSlip}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Pass</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl shadow-sm flex items-center space-x-1 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print</span>
            </button>
            <button
              onClick={() => setConfirmedTicket(null)}
              className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Booking Form & Active Appointments List */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Book Appointment Card */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2 font-bold text-sm text-[#102747]">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <span>Select Doctor & Consultation Slot</span>
              </div>
              <span className="text-[11px] text-slate-400">Step 1 of 2</span>
            </div>

            <form onSubmit={handleBook} className="space-y-4 text-xs">
              {/* Doctor Selector Cards */}
              <div>
                <label className="block font-semibold text-slate-700 mb-2">Choose Hospital Specialist</label>
                <div className="space-y-2">
                  {doctors.map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                            : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-full font-bold flex items-center justify-center text-xs text-white ${
                            isSelected ? 'bg-blue-600' : 'bg-slate-700'
                          }`}>
                            {doc.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{doc.name}</div>
                            <div className="text-[11px] text-slate-500">{doc.specialty}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{doc.experience} • {doc.rating}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-blue-700 text-[11px]">{doc.fee}</div>
                          <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-blue-600 text-white' : 'text-slate-400'
                          }`}>
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Consultation Mode */}
              <div className="pt-2">
                <label className="block font-semibold text-slate-700 mb-1.5">Consultation Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultType('In-Person')}
                    className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center space-x-2 transition cursor-pointer ${
                      consultType === 'In-Person'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>In-Person OPD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultType('Video Call')}
                    className={`p-2.5 rounded-xl border font-semibold flex items-center justify-center space-x-2 transition cursor-pointer ${
                      consultType === 'Video Call'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>HD Telemedicine</span>
                  </button>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Available Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="09:00 AM">09:00 AM (Morning Slot)</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM (Fastest)</option>
                    <option value="01:30 PM">01:30 PM (Afternoon)</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:30 PM">04:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chief Complaint / Reason</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Fever checkup, headache review, blood test prescription"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Book Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1a64db] hover:bg-[#1553b7] text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Confirm & Generate Appointment Pass</span>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Free cancellation up to 2 hours before consultation</span>
            <span className="text-emerald-700 font-semibold">Instant Confirmation</span>
          </div>
        </div>

        {/* Right: My Scheduled Appointments List */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#102747]">My Scheduled Visits</h3>
                <p className="text-xs text-slate-500">Active tokens & confirmed doctor consults</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                {appointments.length} Total
              </span>
            </div>

            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900">{apt.doctorName}</span>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          apt.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : apt.status === 'Scheduled'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500">{apt.specialty}</div>

                    <div className="flex items-center space-x-3 text-[11px] text-slate-600 pt-1 font-mono">
                      <span className="flex items-center space-x-1 text-blue-600 font-semibold">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{apt.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{apt.time}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleDownloadSlip()}
                      className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                      title="View Pass"
                    >
                      View Pass
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-start space-x-2">
            <UserCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Need immediate urgent care?</span>
              <span className="text-[11px] text-slate-600">
                Walk-ins are welcomed 24/7 at the Emergency Trauma Ward, Block C.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
