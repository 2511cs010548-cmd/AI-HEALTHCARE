import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Heart, Shield, ArrowRight } from 'lucide-react';
import { ScreenId } from '../types';

interface LoginScreenProps {
  onLogin: (role: 'patient' | 'doctor') => void;
  setCurrentScreen: (screen: ScreenId) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, setCurrentScreen }) => {
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().includes('doctor') || email.toLowerCase().includes('sarah')) {
      onLogin('doctor');
      setCurrentScreen('doctor-dashboard');
    } else {
      onLogin('patient');
      setCurrentScreen('patient-dashboard');
    }
  };

  return (
    <div className="min-h-full flex-1 flex items-center justify-center p-4 md:p-8 bg-[#eef4fb]">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-100 min-h-[580px]">
        {/* Left Side: Illustration & Branding (Slide 8 - 1. Login Screen) */}
        <div className="md:col-span-6 bg-gradient-to-br from-[#ebf4fd] via-[#e2eefb] to-[#d3e5f8] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-blue-200/40 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-teal-200/30 blur-2xl pointer-events-none" />

          {/* Logo */}
          <div className="flex items-center space-x-2.5 z-10">
            <div className="w-8 h-8 rounded-lg bg-[#1a64db] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
              <span className="text-lg leading-none">+</span>
            </div>
            <span className="text-base font-bold text-[#14325a] tracking-tight">AI Healthcare System</span>
          </div>

          {/* Main Visual Content */}
          <div className="my-auto py-8 z-10">
            <h2 className="text-3xl font-extrabold text-[#112d55] tracking-tight leading-tight">
              Smart Healthcare <br />
              <span className="text-[#1a64db]">Better Tomorrow</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xs leading-relaxed">
              AI-powered predictions and insights for a healthier you.
            </p>

            {/* Stethoscope & Heart Graphic */}
            <div className="mt-8 flex items-center justify-center relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-blue-400/20 to-teal-400/20 flex items-center justify-center border border-white/60 shadow-xl backdrop-blur-sm relative">
                {/* 3D Heart Element */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#1a64db] to-[#0ea5e9] flex items-center justify-center shadow-2xl shadow-blue-600/40 transform -rotate-3 hover:rotate-0 transition duration-300">
                  <Heart className="w-14 h-14 text-white fill-white drop-shadow-md animate-pulse" />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-2 -left-2 bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-1.5 text-xs font-semibold text-[#14325a]">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>99% Diagnostic Precision</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom badge */}
          <div className="text-[11px] text-slate-500 z-10 flex items-center space-x-2">
            <span>Verified AI Medical Engine</span>
            <span>•</span>
            <span>HIPAA Compliant</span>
          </div>
        </div>

        {/* Right Side: Login Form (Slide 8) */}
        <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between bg-white">
          <div className="flex items-center justify-end text-xs text-slate-500">
            <span>Don't have an account?</span>
            <button
              onClick={() => {
                onLogin('patient');
                setCurrentScreen('patient-dashboard');
              }}
              className="ml-2 px-3 py-1 text-xs font-medium text-[#1a64db] border border-blue-200 rounded-md hover:bg-blue-50 transition cursor-pointer"
            >
              Register
            </button>
          </div>

          <div className="my-auto max-w-sm w-full mx-auto py-4">
            <h3 className="text-2xl font-bold text-[#112d55]">Welcome Back!</h3>
            <p className="text-xs text-slate-500 mt-1">Login to your account</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email / Username
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or username"
                    className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1a64db] hover:bg-[#1553b7] text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Social Logins */}
            <div className="mt-5">
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-[11px] text-slate-400 absolute">or continue with</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onLogin('patient');
                    setCurrentScreen('patient-dashboard');
                  }}
                  className="flex items-center justify-center space-x-2 py-2 px-3 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onLogin('doctor');
                    setCurrentScreen('doctor-dashboard');
                  }}
                  className="flex items-center justify-center space-x-2 py-2 px-3 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <rect fill="#F25022" x="1" y="1" width="10" height="10" />
                    <rect fill="#7FBA00" x="13" y="1" width="10" height="10" />
                    <rect fill="#00A4EF" x="1" y="13" width="10" height="10" />
                    <rect fill="#FFB900" x="13" y="13" width="10" height="10" />
                  </svg>
                  <span>Microsoft</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Switcher Buttons for Presentation */}
            <div className="mt-5 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center justify-between text-[11px]">
              <span className="text-blue-900 font-medium">Quick Demo:</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    onLogin('patient');
                    setCurrentScreen('patient-dashboard');
                  }}
                  className="px-2 py-1 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  Enter as Patient
                </button>
                <button
                  onClick={() => {
                    onLogin('doctor');
                    setCurrentScreen('doctor-dashboard');
                  }}
                  className="px-2 py-1 bg-slate-800 text-white font-medium rounded hover:bg-slate-900 transition cursor-pointer"
                >
                  Enter as Doctor
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            AI Healthcare System © 2026. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
