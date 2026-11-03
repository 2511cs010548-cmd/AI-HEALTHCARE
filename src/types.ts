export type ScreenId = 
  | 'login'
  | 'patient-dashboard'
  | 'symptom-checker'
  | 'ai-diagnosis'
  | 'doctor-dashboard'
  | 'appointments'
  | 'medical-reports'
  | 'patients'
  | 'prescriptions'
  | 'my-profile'
  | 'lab-reports'
  | 'health-tracking'
  | 'messages'
  | 'settings'
  | 'notifications';

export interface Vitals {
  heartRate: number;
  heartRateStatus: string;
  bloodPressure: string;
  bpStatus: string;
  bloodSugar: number;
  sugarStatus: string;
  weight: number;
  weightStatus: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Scheduled' | 'Pending';
}

export interface DifferentialItem {
  disease: string;
  probability: number;
  riskLevel: 'High' | 'Moderate' | 'Low';
  rationale: string;
}

export interface FeatureImpact {
  feature: string;
  percentage: number;
  type: 'positive' | 'negative';
}

export interface DiagnosisRecord {
  disease: string;
  confidence: string;
  severity: string;
  date?: string;
  matchedSymptoms: string[];
  recommendations: string[];
  differentials?: DifferentialItem[];
  featureContributions?: FeatureImpact[];
  mewsScore?: {
    score: number;
    status: 'Stable' | 'Observation' | 'Critical';
    description: string;
  };
}

export interface PatientProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  allergies: string;
  chronicConditions: string;
  insuranceProvider: string;
  avatarInitials: string;
}

export interface PatientInfo {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  reportDate: string;
  reportId: string;
}

export interface LabTestItem {
  id: string;
  testName: string;
  category: 'Blood Work' | 'Imaging' | 'Pathology' | 'Biochemistry';
  date: string;
  department: string;
  status: 'Completed' | 'Pending' | 'Abnormal';
  resultSummary: string;
  doctor: string;
}

export interface DoctorPatient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  lastVisit: string;
  phone: string;
  diagnosis: string;
  status: 'Active' | 'Recovered' | 'Under Observation';
}

export interface PrescriptionItem {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  doctorName: string;
  prescribedDate: string;
  status: 'Active' | 'Completed' | 'Refill Due';
}

export interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient' | 'system';
  text: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'lab' | 'prescription' | 'ai' | 'system';
  read: boolean;
  actionScreen?: ScreenId;
  actionLabel?: string;
}
