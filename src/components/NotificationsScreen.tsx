import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  FlaskConical,
  Pill,
  Sparkles,
  CheckCircle2,
  Trash2,
  CheckCheck,
  ChevronRight,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { ScreenId, NotificationItem } from '../types';

interface NotificationsScreenProps {
  setCurrentScreen: (screen: ScreenId) => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  setCurrentScreen,
  notifications,
  setNotifications
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'appointment' | 'lab' | 'prescription' | 'ai'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const toggleRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleActionClick = (notif: NotificationItem) => {
    // mark as read
    toggleRead(notif.id);
    if (notif.actionScreen) {
      setCurrentScreen(notif.actionScreen);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'appointment') return n.type === 'appointment';
    if (filter === 'lab') return n.type === 'lab';
    if (filter === 'prescription') return n.type === 'prescription';
    if (filter === 'ai') return n.type === 'ai';
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'lab':
        return <FlaskConical className="w-4 h-4 text-emerald-600" />;
      case 'prescription':
        return <Pill className="w-4 h-4 text-amber-600" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBadgeStyle = (type: NotificationItem['type']) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'lab':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'prescription':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'ai':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="flex-1 bg-[#f4f7fb] overflow-y-auto p-4 md:p-6 text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-[#102747] flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <span>Notifications & Health Alerts</span>
          </h2>
          <p className="text-xs text-slate-500">
            Real-time updates on scheduled consultations, laboratory results, and prescription refills
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-sm flex items-center space-x-1.5 transition cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Mark all read</span>
            </button>
          )}
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
            {unreadCount} Unread
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-5 flex items-center space-x-1.5 overflow-x-auto bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm text-xs">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'appointment', label: 'Appointments' },
          { id: 'lab', label: 'Lab Results' },
          { id: 'prescription', label: 'Prescriptions' },
          { id: 'ai', label: 'AI Health Insights' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filter === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="mt-5 space-y-3 max-w-4xl">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-sm text-center text-slate-400">
            <Bell className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <div className="font-semibold text-sm text-slate-600">No notifications found</div>
            <p className="text-xs text-slate-400 mt-1">You are completely caught up with your clinical updates.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4.5 rounded-2xl border transition flex items-start justify-between gap-4 ${
                notif.read
                  ? 'bg-white border-slate-200/80 shadow-sm'
                  : 'bg-gradient-to-r from-blue-50/70 via-white to-white border-blue-300 shadow-md ring-1 ring-blue-500/10'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${getBadgeStyle(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm text-[#102747]">{notif.title}</h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{notif.message}</p>

                  <div className="flex items-center space-x-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{notif.time}</span>
                    </span>
                    <span>•</span>
                    <span className="uppercase font-semibold tracking-wider text-[10px] text-slate-500">
                      {notif.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-center flex-shrink-0">
                {notif.actionScreen && (
                  <button
                    onClick={() => handleActionClick(notif)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-sm transition cursor-pointer"
                  >
                    <span>{notif.actionLabel || 'View'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => toggleRead(notif.id)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  title={notif.read ? 'Mark as unread' : 'Mark as read'}
                >
                  <CheckCheck className={`w-4 h-4 ${notif.read ? 'text-slate-400' : 'text-blue-600'}`} />
                </button>

                <button
                  onClick={() => clearNotification(notif.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
