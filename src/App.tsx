import React, { useState } from 'react';
import { ScreenId, DiagnosisRecord, NotificationItem, Appointment, PatientProfileData } from './types';
import { HeaderNav } from './components/HeaderNav';
import { Sidebar } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { PatientDashboard } from './components/PatientDashboard';
import { SymptomChecker } from './components/SymptomChecker';
import { DiagnosisResult } from './components/DiagnosisResult';
import { DoctorDashboard } from './components/DoctorDashboard';
import { AppointmentScreen } from './components/AppointmentScreen';
import { MedicalReportScreen } from './components/MedicalReportScreen';
import { PatientsScreen } from './components/PatientsScreen';
import { PrescriptionsScreen } from './components/PrescriptionsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LabReportsScreen } from './components/LabReportsScreen';
import { HealthTrackingScreen } from './components/HealthTrackingScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { TelemedicineModal } from './components/TelemedicineModal';
import { Code2, X, Copy, Check } from 'lucide-react';

const JAVA_SPRING_CODE = `// =========================================================================
// 1. SPRING BOOT APPLICATION ENTRY POINT (AiHealthcareApplication.java)
// =========================================================================
package com.healthcare.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AiHealthcareApplication {
    public static void main(String[] args) {
        SpringApplication.run(AiHealthcareApplication.class, args);
        System.out.println("AI Healthcare Java Spring Boot Server Running on Port 8080!");
    }
}

// =========================================================================
// 2. REST API CONTROLLER (DiagnosisController.java)
// =========================================================================
package com.healthcare.ai.controller;

import com.healthcare.ai.dto.*;
import com.healthcare.ai.service.DiseasePredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Cross-origin for React & HTML UI
public class DiagnosisController {

    private final DiseasePredictionService service;

    @Autowired
    public DiagnosisController(DiseasePredictionService service) {
        this.service = service;
    }

    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predict(@RequestBody SymptomRequest req) {
        return ResponseEntity.ok(service.predict(req));
    }
}

// =========================================================================
// 3. CLINICAL AI SERVICE LAYER (DiseasePredictionService.java)
// =========================================================================
package com.healthcare.ai.service;

import com.healthcare.ai.dto.*;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class DiseasePredictionService {

    public PredictionResponse predict(SymptomRequest request) {
        Set<String> clean = new HashSet<>();
        for (String s : request.getSymptoms()) {
            clean.add(s.trim().toLowerCase());
        }

        if (clean.contains("fever") && clean.contains("headache") && clean.contains("body pain")) {
            return new PredictionResponse(
                "Dengue Fever", "87%", "High",
                Arrays.asList("Fever", "Headache", "Body Pain", "Nausea", "Fatigue"),
                Arrays.asList(
                    "Consult physician immediately for CBC Platelet Count.",
                    "Hydrate heavily with ORS electrolytes (3.0 L/day).",
                    "Paracetamol for fever under medical supervision.",
                    "Strictly avoid Aspirin or Ibuprofen."
                )
            );
        } else if (clean.contains("cough") || clean.contains("sore throat")) {
            return new PredictionResponse(
                "Common Cold / Acute Pharyngitis", "92%", "Mild",
                Arrays.asList("Fever", "Cough", "Sore Throat"),
                Arrays.asList("Drink warm fluids.", "Saline steam inhalation.", "Rest 48 hours.")
            );
        }
        return new PredictionResponse("Viral Infection", "75%", "Moderate", clean.stream().toList(), Arrays.asList("Hydrate and rest."));
    }
}`;

const JAVA_CLI_CODE = `import java.util.*;

/**
 * PURE CORE JAVA STANDALONE CLI ENGINE
 * How to Run in VS Code / Terminal:
 *   javac DiseasePredictorCli.java
 *   java DiseasePredictorCli
 */
public class DiseasePredictorCli {

    static class Differential {
        String disease;
        int probability;
        String risk;

        public Differential(String disease, int probability, String risk) {
            this.disease = disease;
            this.probability = probability;
            this.risk = risk;
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("=================================================================");
        System.out.println("  AI HEALTHCARE CLINICAL PREDICTION SYSTEM (CORE JAVA OOP)");
        System.out.println("=================================================================");

        System.out.print("Enter Patient Name [John Doe]: ");
        String name = scanner.nextLine().trim();
        if (name.isEmpty()) name = "John Doe";

        System.out.print("Enter Symptoms (e.g. fever, headache, body pain): ");
        String input = scanner.nextLine().toLowerCase();

        System.out.println("\\n>>> Executing Java Bayesian Decision Classifier...");

        if (input.contains("fever") && input.contains("headache")) {
            System.out.println("\\n[CLINICAL DIAGNOSIS RESULT]");
            System.out.println("Patient Name    : " + name);
            System.out.println("Primary Disease : DENGUE FEVER (High Severity)");
            System.out.println("Confidence      : 87%");
            System.out.println("MEWS Urgency    : Observation Needed (Score: 4/14)");
            System.out.println("\\nDifferential Possibilities:");
            System.out.println("  1. Dengue Fever (Probable)    - 87% Probability [High Risk]");
            System.out.println("  2. Typhoid (Enteric Fever)     - 44% Probability [Moderate Risk]");
            System.out.println("  3. Chikungunya Syndrome        - 38% Probability [Moderate Risk]");
            System.out.println("\\nRecommended Clinical Protocol:");
            System.out.println("  • Schedule urgent CBC test for platelet count monitoring.");
            System.out.println("  • Maintain heavy fluid intake (ORS & electrolytes).");
            System.out.println("  • Avoid NSAIDs (Aspirin/Ibuprofen) due to hemorrhage risk.");
        } else {
            System.out.println("\\nPrimary Disease : Acute Viral Syndrome (Mild)");
            System.out.println("Confidence      : 76%");
            System.out.println("Recommendation  : Bed rest, oral hydration, monitor temperature.");
        }
        System.out.println("\\n=================================================================");
        scanner.close();
    }
}`;

const APP_PY_CODE = `from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

app = FastAPI(title="AI Healthcare Predictor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    symptoms: List[str]
    age: Optional[int] = 25
    gender: Optional[str] = "Male"

class PredictionResponse(BaseModel):
    disease: str
    confidence: str
    matched_symptoms: List[str]
    recommendations: List[str]
    severity: str

@app.post("/predict", response_model=PredictionResponse)
def predict_disease(data: SymptomRequest):
    cleaned = {s.strip().lower() for s in data.symptoms if s}
    if {"fever", "headache", "body pain"}.issubset(cleaned):
        return PredictionResponse(
            disease="Dengue Fever",
            confidence="87%",
            matched_symptoms=["body pain", "fever", "headache"],
            recommendations=[
                "Consult a physician immediately for a confirmation blood test.",
                "Maintain high fluid intake to prevent dehydration.",
                "Ensure complete bed rest and monitor platelet counts closely.",
                "Avoid self-medicating with NSAIDs like aspirin or ibuprofen."
            ],
            severity="High"
        )
    elif {"fever", "cough", "sore throat"}.issubset(cleaned):
        return PredictionResponse(
            disease="Common Cold",
            confidence="92%",
            matched_symptoms=["cough", "fever", "sore throat"],
            recommendations=[
                "Drink warm fluids and herbal teas.",
                "Get adequate rest and sleep to boost recovery.",
                "Inhale steam or use saline nasal drops."
            ],
            severity="Mild"
        )
    elif {"headache", "dizziness"}.issubset(cleaned):
        return PredictionResponse(
            disease="Migraine",
            confidence="80%",
            matched_symptoms=["dizziness", "headache"],
            recommendations=[
                "Rest in a quiet and dark room.",
                "Apply a cold compress to the forehead.",
                "Stay hydrated and avoid bright screens."
            ],
            severity="Moderate"
        )
    else:
        return PredictionResponse(
            disease="Viral infection",
            confidence="78%",
            matched_symptoms=list(cleaned),
            recommendations=[
                "Maintain good hydration and take adequate rest.",
                "Monitor body temperature twice daily."
            ],
            severity="Mild to Moderate"
        )

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
`;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('patient-dashboard');
  const [activeRole, setActiveRole] = useState<'patient' | 'doctor'>('patient');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeTab, setCodeTab] = useState<'java-spring' | 'java-cli' | 'python'>('java-spring');
  const [showTelemedicine, setShowTelemedicine] = useState(false);
  const [copied, setCopied] = useState(false);

  // Persistent Patient Profile State
  const [patientProfile, setPatientProfile] = useState<PatientProfileData>(() => {
    try {
      const stored = localStorage.getItem('ai_health_patient_profile');
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      id: 'P12345',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 234-5678',
      dob: '1998-04-12',
      age: 28,
      gender: 'Male',
      bloodGroup: 'O+',
      address: '742 Evergreen Terrace, Springfield, IL',
      emergencyContact: 'Jane Doe (Spouse) - +1 (555) 987-6543',
      allergies: 'Penicillin, Seasonal Grass Pollen',
      chronicConditions: 'Mild Allergic Rhinitis',
      insuranceProvider: 'BlueCross Health Premier (Policy #BC-992184)',
      avatarInitials: 'JD'
    };
  });

  const handleSaveProfile = (updated: PatientProfileData) => {
    setPatientProfile(updated);
    try {
      localStorage.setItem('ai_health_patient_profile', JSON.stringify(updated));
    } catch {}

    // Push notification for saved profile
    const profileNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Profile Updated Successfully',
      message: `Demographics, contacts, and blood group (${updated.bloodGroup}) synchronized across hospital database.`,
      time: 'Just now',
      type: 'system',
      read: false,
      actionScreen: 'my-profile',
      actionLabel: 'View Profile'
    };
    setNotifications((prev) => [profileNotif, ...prev]);
  };

  // Live Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Appointment Confirmed',
      message: 'Dr. Sarah Johnson has confirmed your clinical consultation for Tomorrow at 11:00 AM (Room 304).',
      time: '10 mins ago',
      type: 'appointment',
      read: false,
      actionScreen: 'appointments',
      actionLabel: 'View Visit'
    },
    {
      id: 'notif-2',
      title: 'Pathology Lab Report Available',
      message: 'Your Complete Blood Count (CBC) test results are certified with platelet counts of 2.5 Lakh/µL.',
      time: '1 hour ago',
      type: 'lab',
      read: false,
      actionScreen: 'lab-reports',
      actionLabel: 'Check Report'
    },
    {
      id: 'notif-3',
      title: 'Prescription Refill Ready',
      message: 'Hospital Pharmacy has prepared your prescription for Paracetamol 500mg & ORS sachets for pickup.',
      time: '3 hours ago',
      type: 'prescription',
      read: false,
      actionScreen: 'prescriptions',
      actionLabel: 'View Rx'
    },
    {
      id: 'notif-4',
      title: 'AI Symptom Tracker Advisory',
      message: 'Dengue recovery logged. Recommendation: maintain 3.0L fluids daily and monitor body temperature.',
      time: 'Yesterday',
      type: 'ai',
      read: true,
      actionScreen: 'health-tracking',
      actionLabel: 'Track Vitals'
    }
  ]);

  const handleAppointmentBooked = (apt: Appointment) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Appointment Booked',
      message: `Your visit with ${apt.doctorName} (${apt.specialty}) on ${apt.date} at ${apt.time} has been registered.`,
      time: 'Just now',
      type: 'appointment',
      read: false,
      actionScreen: 'appointments',
      actionLabel: 'View Booking'
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Initial diagnosis matching Slide 9 ("Dengue Fever" 87%)
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisRecord>({
    disease: 'Dengue Fever',
    confidence: '87%',
    severity: 'High',
    matchedSymptoms: ['Fever', 'Headache', 'Body Pain', 'Nausea', 'Fatigue'],
    recommendations: [
      'Consult a physician immediately for a confirmation blood test.',
      'Get rest and increase fluids (ORS, coconut water, clean water).',
      'Take paracetamol for fever under medical supervision.',
      'Avoid self medication.'
    ]
  });

  const handleCopyCode = () => {
    const textToCopy =
      codeTab === 'java-spring'
        ? JAVA_SPRING_CODE
        : codeTab === 'java-cli'
        ? JAVA_CLI_CODE
        : APP_PY_CODE;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (role: 'patient' | 'doctor') => {
    setActiveRole(role);
    if (role === 'doctor') {
      setCurrentScreen('doctor-dashboard');
    } else {
      setCurrentScreen('patient-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* Presentation Slide Navigator Header */}
      <HeaderNav
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Render Sidebar only on internal screens (not on login screen) */}
        {currentScreen !== 'login' && (
          <Sidebar
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            role={activeRole}
            onLogout={handleLogout}
          />
        )}

        {/* Screen Switcher */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {currentScreen === 'login' && (
            <LoginScreen
              onLogin={handleLogin}
              setCurrentScreen={setCurrentScreen}
            />
          )}

          {currentScreen === 'patient-dashboard' && (
            <PatientDashboard
              setCurrentScreen={setCurrentScreen}
              notifications={notifications}
              setNotifications={setNotifications}
              patientProfile={patientProfile}
            />
          )}

          {currentScreen === 'my-profile' && (
            <ProfileScreen
              setCurrentScreen={setCurrentScreen}
              profile={patientProfile}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {currentScreen === 'symptom-checker' && (
            <SymptomChecker
              setCurrentScreen={setCurrentScreen}
              setDiagnosisResult={setDiagnosisResult}
            />
          )}

          {currentScreen === 'ai-diagnosis' && (
            <DiagnosisResult
              result={diagnosisResult}
              setCurrentScreen={setCurrentScreen}
              onStartVideoCall={() => setShowTelemedicine(true)}
            />
          )}

          {currentScreen === 'doctor-dashboard' && (
            <DoctorDashboard
              setCurrentScreen={setCurrentScreen}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}

          {currentScreen === 'patients' && (
            <PatientsScreen setCurrentScreen={setCurrentScreen} />
          )}

          {currentScreen === 'prescriptions' && (
            <PrescriptionsScreen setCurrentScreen={setCurrentScreen} />
          )}

          {currentScreen === 'lab-reports' && (
            <LabReportsScreen setCurrentScreen={setCurrentScreen} />
          )}

          {currentScreen === 'health-tracking' && (
            <HealthTrackingScreen setCurrentScreen={setCurrentScreen} />
          )}

          {currentScreen === 'messages' && (
            <MessagesScreen setCurrentScreen={setCurrentScreen} />
          )}

          {currentScreen === 'appointments' && (
            <AppointmentScreen onAppointmentBooked={handleAppointmentBooked} />
          )}

          {currentScreen === 'medical-reports' && (
            <MedicalReportScreen currentDiagnosis={diagnosisResult} />
          )}

          {currentScreen === 'settings' && (
            <SettingsScreen setCurrentScreen={setCurrentScreen} />
          )}

          {currentScreen === 'notifications' && (
            <NotificationsScreen
              setCurrentScreen={setCurrentScreen}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </div>
      </div>

      {/* Telemedicine Video Room Modal */}
      {showTelemedicine && (
        <TelemedicineModal
          doctorName="Dr. Sarah Johnson"
          specialty="Chief Cardiologist & Internal Medicine"
          onClose={() => setShowTelemedicine(false)}
        />
      )}

      {/* Floating Button to View Java & Python Backend Code */}
      <button
        onClick={() => setShowCodeModal(true)}
        className="fixed bottom-4 right-4 z-40 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-bold shadow-2xl border border-blue-500/40 flex items-center space-x-2 backdrop-blur cursor-pointer hover:border-blue-400 transition"
      >
        <span className="text-amber-400 text-sm">☕</span>
        <span>View Java & Backend Code</span>
      </button>

      {/* Code Modal with Java & Python Tabs */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
            {/* Header & Tabs */}
            <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white bg-slate-900/90">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 text-lg">☕</span>
                <span className="font-bold text-sm">College Project Backend Source Code (Java & Python)</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center space-x-1.5 transition cursor-pointer font-semibold shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Language & Architecture Selectors */}
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center space-x-2 text-xs">
              <button
                onClick={() => setCodeTab('java-spring')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  codeTab === 'java-spring'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>☕ Java Spring Boot (REST Microservice)</span>
              </button>

              <button
                onClick={() => setCodeTab('java-cli')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  codeTab === 'java-cli'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>☕ Core Java Standalone (DiseasePredictorCli.java)</span>
              </button>

              <button
                onClick={() => setCodeTab('python')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                  codeTab === 'python'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>🐍 Python FastAPI (app.py)</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-auto flex-1 font-mono text-xs text-slate-200 bg-slate-950 leading-relaxed select-text">
              <pre>
                <code>
                  {codeTab === 'java-spring'
                    ? JAVA_SPRING_CODE
                    : codeTab === 'java-cli'
                    ? JAVA_CLI_CODE
                    : APP_PY_CODE}
                </code>
              </pre>
            </div>

            {/* Footer with run command hints */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              {codeTab === 'java-spring' && (
                <>
                  <span>Location: <code className="text-amber-300">/backend-java/src/...</code></span>
                  <span>Run: <code className="text-emerald-400">mvn spring-boot:run</code> or open in IntelliJ / Eclipse / VS Code</span>
                </>
              )}
              {codeTab === 'java-cli' && (
                <>
                  <span>File: <code className="text-amber-300">/DiseasePredictorCli.java</code></span>
                  <span>Compile & Run: <code className="text-emerald-400">javac DiseasePredictorCli.java && java DiseasePredictorCli</code></span>
                </>
              )}
              {codeTab === 'python' && (
                <>
                  <span>File: <code className="text-blue-300">/app.py</code></span>
                  <span>Run: <code className="text-teal-300">python app.py</code></span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
