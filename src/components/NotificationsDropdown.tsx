import React from 'react';
import {
  Bell,
  Calendar,
  FlaskConical,
  Pill,
  Sparkles,
  CheckCheck,
  ChevronRight,
  Clock,
  X
} from 'lucide-react';
import { ScreenId, NotificationItem } from '../types';

interface NotificationsDropdownProps {
  notifications: NotificationItem[];
  onClose: () => void;
  setCurrentScreen: (screen: ScreenId) => void;
  onMarkAllRead: () => void;
  onItemClick: (item: NotificationItem) => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  notifications,
  onClose,
  setCurrentScreen,
  onMarkAllRead,
  onItemClick
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-3.5 h-3.5 text-blue-600" />;
      case 'lab':
        return <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />;
      case 'prescription':
        return <Pill className="w-3.5 h-3.5 text-amber-600" />;
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 text-purple-600" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fadeIn select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-xs text-[#102747]">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.slice(0, 5).map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                onItemClick(notif);
                onClose();
              }}
              className={`p-3.5 flex items-start space-x-3 transition cursor-pointer ${
                notif.read ? 'hover:bg-slate-50' : 'bg-blue-50/50 hover:bg-blue-50/80'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 truncate text-xs">{notif.title}</span>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-600 ml-1 flex-shrink-0" />}
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-snug">{notif.message}</p>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{notif.time}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            setCurrentScreen('notifications');
            onClose();
          }}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center justify-center space-x-1 w-full cursor-pointer"
        >
          <span>View All Notifications Page</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
