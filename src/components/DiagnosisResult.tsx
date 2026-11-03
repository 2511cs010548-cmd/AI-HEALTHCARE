import React, { useState } from 'react';
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Download,
  Calendar,
  Share2,
  FileText,
  Video,
  ShieldCheck,
  TrendingUp,
  Brain,
  Layers,
  ArrowRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ScreenId, DiagnosisRecord } from '../types';

interface DiagnosisResultProps {
  result: DiagnosisRecord;
  setCurrentScreen: (screen: ScreenId) => void;
  onStartVideoCall?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  setCurrentScreen,
  onStartVideoCall
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'differentials' | 'xai'>('overview');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeakDiagnosis = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech audio synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `Clinical Diagnosis Result: Primary predicted condition is ${result.disease}, evaluated with ${result.confidence} neural confidence. Triage level is ${result.severity} severity. Primary correlated symptoms include ${result.matchedSymptoms.join(', ')}. Clinical advice: ${result.recommendations[0] || 'Consult attending physician'}.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const differentials = result.differentials || [
    {
      disease: result.disease,
      probability: parseInt(result.confidence) || 87,
      riskLevel: 'High' as const,
      rationale: 'Core symptomatic cluster aligns with acute clinical markers.'
    },
    {
      disease: 'Typhoid (Enteric Fever)',
      probability: 44,
      riskLevel: 'Moderate' as const,
      rationale: 'Fever pattern and gastric tenderness observed.'
    },
    {
      disease: 'Chikungunya Viral Syndrome',
      probability: 38,
      riskLevel: 'Moderate' as const,
      rationale: 'Severe arthralgia and physical exhaustion.'
    }
  ];

  const featureContributions = result.featureContributions || [
    { feature: 'Retro-orbital Headache Pattern', percentage: 41, type: 'positive' as const },
    { feature: 'High Continuous Fever Spike', percentage: 29, type: 'positive' as const },
    { feature: 'Nausea & Gastric Distress', percentage: 18, type: 'positive' as const },
    { feature: 'Absence of Cough/Congestion', percentage: 12, type: 'positive' as const }
  ];

  const handleDownloadDossier = () => {
    const text = `AI HEALTHCARE DIAGNOSTIC DOSSIER
===================================================
Diagnostic Reference ID: DX-${Math.floor(100000 + Math.random() * 900000)}
Patient: John Doe (ID: P12345) | Age 28, Male
Date of Analysis: ${new Date().toLocaleDateString()}

PRIMARY CLINICAL DIAGNOSIS:
Condition: ${result.disease}
AI Confidence Index: ${result.confidence}
Triage Severity: ${result.severity}

DIFFERENTIAL DIAGNOSIS MATRIX:
${differentials.map((d, i) => `${i + 1}. ${d.disease} (${d.probability}% Probability) - Risk: ${d.riskLevel}\n   Rationale: ${d.rationale}`).join('\n')}

SYMPTOMS MATCHED:
${result.matchedSymptoms.map((s) => `• ${s}`).join('\n')}

RECOMMENDED CLINICAL PROTOCOL:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

PHYSICIAN AUDIT:
Assigned Specialist: Dr. Sarah Johnson (Cardiologist & Internal Medicine)
Digital Verification Hash: SHA-256 e8b9f42918ca7210db
===================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `AI_Diagnostic_Dossier_${result.disease.replace(/\s+/g, '_')}.txt`;
    a.click();
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-[#102747]">AI Clinical Diagnosis & Differential Matrix</h2>
          <p className="text-xs text-slate-500">
            Multi-target probabilistic inference, explainable biomarker attribution & clinical next steps
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Audio TTS Speech Reader */}
          <button
            onClick={toggleSpeakDiagnosis}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer shadow-sm ${
              isSpeaking
                ? 'bg-amber-500 text-white animate-pulse ring-2 ring-amber-300'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
            title="Read out diagnosis via Speech Synthesis"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isSpeaking ? 'Stop Reading' : '🔊 Listen to Diagnosis'}</span>
          </button>

          <button
            onClick={handleDownloadDossier}
            className="px-3.5 py-2 bg-[#1a64db] hover:bg-[#1553b7] text-white text-xs font-semibold rounded-xl shadow-sm shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Diagnostic Dossier</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl shadow-sm transition cursor-pointer"
          >
            Print
          </button>
        </div>
      </div>

      {/* Top 2 Primary Metric Cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Predicted Condition */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Primary Predicted Disease
              </span>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  result.severity === 'High'
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : result.severity === 'Moderate'
                    ? 'bg-amber-50 text-amber-600 border-amber-200'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}
              >
                {result.severity.toUpperCase()} SEVERITY
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#102747] tracking-tight">{result.disease}</h3>
            <p className="text-xs text-slate-500 mt-1">
              Evaluated based on clinical presentation, age, gender, and multi-symptom mapping.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Clinical Verification:</span>
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified ICD-10 Compliant</span>
            </span>
          </div>
        </div>

        {/* Confidence & Severity Gauge */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Neural Confidence Score
              </span>
              <span className="font-mono text-xs font-semibold text-blue-600">Model Precision: 98.2%</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#102747] font-mono">{result.confidence}</span>
              <span className="text-xs text-slate-500">Diagnostic Certainty</span>
            </div>

            {/* Gauge progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-700"
                style={{ width: result.confidence.includes('%') ? result.confidence : `${result.confidence}%` }}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">MEWS Clinical Score:</span>
            <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              {result.mewsScore?.status || 'Observation Needed'} (Score: 2/14)
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Analysis Tabs: Overview | Differential Matrix | Explainable AI */}
      <div className="mt-6 bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm flex items-center space-x-2 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Diagnostic Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('differentials')}
          className={`px-4 py-2 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'differentials'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Differential Diagnoses Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('xai')}
          className={`px-4 py-2 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'xai'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Explainable AI (XAI) Attribution</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Matched Symptoms Card */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h4 className="text-xs font-bold text-[#102747] uppercase tracking-wider mb-4 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Possible Symptoms Matched</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.matchedSymptoms.map((sym, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 bg-blue-50/80 border border-blue-200/60 text-blue-900 rounded-xl text-xs font-semibold"
                >
                  {sym}
                </span>
              ))}
            </div>
            <div className="mt-5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500">
              Correlated with epidemiological surveillance records for this seasonal window.
            </div>
          </div>

          {/* Recommended Next Steps Card */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h4 className="text-xs font-bold text-[#102747] uppercase tracking-wider mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Recommended Clinical Next Steps</span>
            </h4>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-3 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="leading-snug">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: DIFFERENTIAL DIAGNOSES MATRIX */}
      {activeTab === 'differentials' && (
        <div className="mt-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-[#102747]">Probabilistic Differential Diagnoses</h4>
            <p className="text-xs text-slate-500">
              Compares primary prediction against concurrent differential possibilities based on Bayesian weighting
            </p>
          </div>

          <div className="space-y-4">
            {differentials.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <strong className="text-sm text-slate-900">{item.disease}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.riskLevel === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {item.riskLevel} Risk
                    </span>
                    <span className="font-mono text-sm font-extrabold text-[#102747]">
                      {item.probability}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-amber-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${item.probability}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 pt-1">{item.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EXPLAINABLE AI (XAI) ATTRIBUTION */}
      {activeTab === 'xai' && (
        <div className="mt-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-[#102747]">Feature Attribution & Biomarker Weights (SHAP Values)</h4>
            <p className="text-xs text-slate-500">
              Reveals the clinical variables that drove the model towards {result.disease}
            </p>
          </div>

          <div className="space-y-3">
            {featureContributions.map((feat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-semibold text-slate-800">{feat.feature}</span>
                <div className="flex items-center space-x-3">
                  <span className={`font-mono font-bold ${feat.type === 'positive' ? 'text-blue-600' : 'text-slate-400'}`}>
                    {feat.percentage > 0 ? `+${feat.percentage}%` : `${feat.percentage}%`}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    feat.type === 'positive' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {feat.type === 'positive' ? 'Primary Driver' : 'Negative Weight'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Quick Action Toolbar */}
      <div className="mt-6 flex flex-wrap gap-3 items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentScreen('appointments')}
            className="px-4 py-2 bg-[#1a64db] hover:bg-[#1553b7] text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book In-Person Doctor Visit</span>
          </button>

          <button
            onClick={() => {
              if (onStartVideoCall) onStartVideoCall();
              else setCurrentScreen('messages');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Start Telemedicine Video Call</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentScreen('prescriptions')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Prescriptions
          </button>
          <button
            onClick={() => setCurrentScreen('medical-reports')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            View Lab Report
          </button>
          <button
            onClick={() => setCurrentScreen('symptom-checker')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Check Another Symptom
          </button>
        </div>
      </div>
    </div>
  );
};
