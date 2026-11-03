import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Activity,
  Heart,
  ShieldCheck,
  Maximize2,
  X,
  Send
} from 'lucide-react';

interface TelemedicineModalProps {
  doctorName?: string;
  specialty?: string;
  onClose: () => void;
}

export const TelemedicineModal: React.FC<TelemedicineModalProps> = ({
  doctorName = 'Dr. Sarah Johnson',
  specialty = 'Cardiologist & Internal Medicine',
  onClose
}) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(38);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'Dr. Sarah', text: 'Good morning John! I have your CBC lab report and Dengue differential up on my monitor.' },
    { sender: 'You', text: 'Good morning Doctor! The high fever broke, but I wanted to make sure my platelet count is okay.' },
    { sender: 'Dr. Sarah', text: 'Yes, 2.5 Lakh/µL is very stable. Let me review your hydration schedule.' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { sender: 'You', text: chatInput }]);
    const current = chatInput;
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'Dr. Sarah', text: `Got it, John: "${current}". Continue the ORS and resting.` }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-5xl h-[88vh] overflow-hidden shadow-2xl flex flex-col relative text-white">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-10 backdrop-blur">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <div className="font-bold text-sm flex items-center space-x-2">
                <span>{doctorName}</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono">
                  HD Encrypted Telehealth
                </span>
              </div>
              <div className="text-[11px] text-slate-400">{specialty} • Call Duration: {formatTime(callDuration)}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Live Patient Vitals HUD */}
            <div className="hidden md:flex items-center space-x-4 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono">
              <span className="flex items-center space-x-1 text-red-400">
                <Heart className="w-3.5 h-3.5 fill-red-400 animate-pulse" />
                <span>72 BPM</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-blue-400">BP: 120/80</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400">SpO2: 98%</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Stage Area */}
        <div className="flex-1 relative flex overflow-hidden">
          {/* Main Doctor Screen */}
          <div className="flex-1 relative bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 flex items-center justify-center">
            {/* Doctor Avatar & Video Frame */}
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-4xl md:text-5xl font-bold shadow-2xl border-4 border-blue-400/40">
                  SJ
                </div>
                <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-slate-900" />
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-bold">{doctorName}</h3>
                <p className="text-xs text-slate-400">Doctor camera feed connected (1080p 60fps)</p>
              </div>

              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>End-to-End HIPAA Cryptographic Tunnel</span>
              </div>
            </div>

            {/* Self-View Picture in Picture (PiP) */}
            <div className="absolute bottom-4 right-4 w-36 h-28 md:w-48 md:h-36 bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>You (John Doe)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="flex-1 flex items-center justify-center">
                {videoOn ? (
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                    JD
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 flex flex-col items-center">
                    <VideoOff className="w-4 h-4 mb-1" />
                    <span>Cam Muted</span>
                  </div>
                )}
              </div>

              <div className="text-[10px] text-center text-slate-500">
                {micOn ? 'Mic Active' : 'Mic Muted'}
              </div>
            </div>
          </div>

          {/* Optional In-Call Chat Drawer */}
          {showChat && (
            <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col animate-fadeIn">
              <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-bold">
                <span>Consultation Chat</span>
                <button onClick={() => setShowChat(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl leading-relaxed ${
                      m.sender === 'You'
                        ? 'bg-blue-600 text-white ml-6 rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 mr-6 rounded-tl-none border border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-bold opacity-75 mb-0.5">{m.sender}</div>
                    <div>{m.text}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-2 border-t border-slate-800 flex space-x-1.5">
                <input
                  type="text"
                  placeholder="Type message to doctor..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Control Dock */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-center space-x-4">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`p-3.5 rounded-2xl transition cursor-pointer ${
              micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`p-3.5 rounded-2xl transition cursor-pointer ${
              videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
            title={videoOn ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-3.5 rounded-2xl transition cursor-pointer ${
              showChat ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title="Toggle In-Call Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center space-x-2 transition cursor-pointer shadow-lg shadow-red-600/30"
          >
            <PhoneOff className="w-5 h-5" />
            <span>End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
