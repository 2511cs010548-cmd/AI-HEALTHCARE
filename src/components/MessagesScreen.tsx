import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  Video,
  Paperclip,
  CheckCheck,
  Bot,
  User,
  Sparkles,
  Info
} from 'lucide-react';
import { ScreenId, ChatMessage } from '../types';

interface MessagesScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({ setCurrentScreen }) => {
  const [activeContactId, setActiveContactId] = useState<'sarah' | 'lee' | 'pharmacy' | 'ai'>('sarah');
  const [inputText, setInputText] = useState('');

  const [chats, setChats] = useState<{
    [key: string]: {
      name: string;
      role: string;
      online: boolean;
      avatar: string;
      messages: ChatMessage[];
    };
  }>({
    sarah: {
      name: 'Dr. Sarah Johnson',
      role: 'Consultant Cardiologist',
      online: true,
      avatar: 'SJ',
      messages: [
        {
          id: '1',
          sender: 'doctor',
          text: 'Hello John, I reviewed your latest CBC lab report. Your platelet counts are stable at 2.5 Lakh/µL.',
          timestamp: '10:14 AM'
        },
        {
          id: '2',
          sender: 'patient',
          text: 'Thank you doctor! The fever has reduced, but I still feel mild body ache and weakness.',
          timestamp: '10:16 AM'
        },
        {
          id: '3',
          sender: 'doctor',
          text: 'That is typical during Dengue/viral recovery. Please continue the ORS fluids and complete bed rest. Let me know if fever returns.',
          timestamp: '10:18 AM'
        }
      ]
    },
    lee: {
      name: 'Dr. Michael Lee',
      role: 'Consultant Neurologist',
      online: false,
      avatar: 'ML',
      messages: [
        {
          id: '1',
          sender: 'doctor',
          text: 'Hi John, please keep logging any headache or dizziness frequency in your tracker.',
          timestamp: 'Yesterday'
        }
      ]
    },
    pharmacy: {
      name: 'Hospital Pharmacy Desk',
      role: 'Prescription Dispensing',
      online: true,
      avatar: 'Rx',
      messages: [
        {
          id: '1',
          sender: 'doctor',
          text: 'Your prescription for Paracetamol 500mg and ORS electrolytes has been prepared for dispatch.',
          timestamp: 'Yesterday'
        }
      ]
    },
    ai: {
      name: 'AI Health Assistant',
      role: 'Automated Symptom Support',
      online: true,
      avatar: 'AI',
      messages: [
        {
          id: '1',
          sender: 'doctor',
          text: 'Hello John! I am your AI Health Assistant. You can ask me questions about your medication dosage or symptom progress.',
          timestamp: '08:00 AM'
        }
      ]
    }
  });

  const activeChat = chats[activeContactId];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'patient',
      text: inputText,
      timestamp: 'Just now'
    };

    const updatedMessages = [...activeChat.messages, newMsg];

    setChats({
      ...chats,
      [activeContactId]: {
        ...activeChat,
        messages: updatedMessages
      }
    });

    const userText = inputText;
    setInputText('');

    // Simulate Doctor / AI automated friendly reply
    setTimeout(() => {
      let replyText = 'Thank you for the update John. I have noted this in your clinical record.';
      if (activeContactId === 'ai') {
        replyText = `I have logged your message regarding "${userText}". Make sure to stay hydrated and consult Dr. Sarah if symptoms persist.`;
      } else if (activeContactId === 'sarah') {
        replyText = 'Understood John. Keep monitoring your temperature and take rest.';
      }

      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        text: replyText,
        timestamp: 'Just now'
      };

      setChats((prev) => ({
        ...prev,
        [activeContactId]: {
          ...prev[activeContactId],
          messages: [...prev[activeContactId].messages, replyMsg]
        }
      }));
    }, 1000);
  };

  const sendQuickReply = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-hidden flex flex-col p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Messages & Doctor Consultations</span>
          </h2>
          <p className="text-xs text-slate-500">
            Secure HIPAA-compliant direct communication with your healthcare team
          </p>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="mt-4 flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex overflow-hidden min-h-[500px]">
        {/* Left Sidebar: Contact Thread List */}
        <div className="w-72 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-3.5 border-b border-slate-200 font-bold text-xs text-[#102747]">
            Active Conversations
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {Object.entries(chats).map(([key, contact]) => (
              <button
                key={key}
                onClick={() => setActiveContactId(key as any)}
                className={`w-full p-3.5 flex items-center space-x-3 text-left transition cursor-pointer ${
                  activeContactId === key ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-100/60'
                }`}
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center text-white ${
                    key === 'ai' ? 'bg-teal-600' : 'bg-blue-600'
                  }`}>
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 truncate">{contact.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{contact.role}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-slate-200 bg-white">
            <button
              onClick={() => setCurrentScreen('appointments')}
              className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition cursor-pointer"
            >
              Book In-Person Visit
            </button>
          </div>
        </div>

        {/* Right Area: Active Chat */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Top Chat Bar */}
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center text-white ${
                activeContactId === 'ai' ? 'bg-teal-600' : 'bg-blue-600'
              }`}>
                {activeChat.avatar}
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">{activeChat.name}</div>
                <div className="text-[10px] text-emerald-600 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{activeChat.online ? 'Online & Active' : 'Offline • Replies within 2 hrs'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <button
                onClick={() => alert('Starting audio consultation call...')}
                className="p-2 hover:bg-slate-100 rounded-lg hover:text-slate-700 transition cursor-pointer"
                title="Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert('Starting HD telemedicine video consultation...')}
                className="p-2 hover:bg-slate-100 rounded-lg hover:text-slate-700 transition cursor-pointer"
                title="Video Telemedicine"
              >
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8fafc]">
            {activeChat.messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'patient' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    m.sender === 'patient'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 flex items-center space-x-1">
                  <span>{m.timestamp}</span>
                  {m.sender === 'patient' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Presets */}
          <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center space-x-2 overflow-x-auto text-[11px]">
            <span className="text-slate-400 whitespace-nowrap">Quick replies:</span>
            <button
              onClick={() => sendQuickReply('My body temperature is normal today.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              Temperature normal
            </button>
            <button
              onClick={() => sendQuickReply('Platelet count blood test has been submitted.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              Test submitted
            </button>
            <button
              onClick={() => sendQuickReply('Need a refill for my oral rehydration salts.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              Request Refill
            </button>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Message ${activeChat.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
