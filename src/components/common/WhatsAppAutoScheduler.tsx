'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useExamStore } from '@/store/useExamStore';
import {
  MessageSquare,
  Bell,
  Clock,
  Send,
  X,
  Sparkles,
  CheckCircle2,
  Volume2,
} from 'lucide-react';

interface BriefingSlotDef {
  id: 'morning' | 'afternoon' | 'evening' | 'night';
  hour: number;
  minute: number;
  label: string;
  timeStr: string;
}

const BRIEFING_SLOTS: BriefingSlotDef[] = [
  { id: 'morning', hour: 8, minute: 0, label: '8:00 AM Morning Briefing', timeStr: '08:00 AM' },
  { id: 'afternoon', hour: 14, minute: 0, label: '2:00 PM Midday Study & Internship Sync', timeStr: '02:00 PM' },
  { id: 'evening', hour: 19, minute: 30, label: '7:30 PM Evening Deep Work Sprint', timeStr: '07:30 PM' },
  { id: 'night', hour: 23, minute: 0, label: '11:00 PM Night Audit & Tomorrow Prep', timeStr: '11:00 PM' },
];

export function WhatsAppAutoScheduler() {
  const {
    whatsAppSettings,
    selectedDate,
    currentDate,
    getWhatsAppDailyDigestLink,
    markBriefingDispatched,
  } = useExamStore();

  const [activeAlert, setActiveAlert] = useState<{
    slot: BriefingSlotDef;
    link: string;
    date: string;
  } | null>(null);

  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Request notification permissions on mount if supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((perm) => setNotificationPermission(perm));
      }
    }
  }, []);

  // Web Audio Synth Chime
  const playAlertChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch {}
  };

  // Clock ticker for automated briefings
  useEffect(() => {
    const checkBriefingTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Active date to brief
      const todayDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const targetDate = selectedDate || todayDateStr;

      for (const slot of BRIEFING_SLOTS) {
        if (currentHour === slot.hour && currentMinute === slot.minute) {
          const slotKey = `${todayDateStr}-${slot.id}`;

          if (whatsAppSettings.lastDispatchedSlot !== slotKey) {
            // Mark as dispatched
            markBriefingDispatched(slotKey);

            const waLink = getWhatsAppDailyDigestLink(targetDate, undefined, slot.label);

            // Play Chime
            playAlertChime();

            // Trigger Browser Notification
            if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
              new Notification(`SPPU AI&DS ExamOS: ${slot.label}`, {
                body: `Your scheduled study & personal life briefing is ready. Click to open WhatsApp.`,
                icon: '/favicon.ico',
              });
            }

            // Auto-open WhatsApp in background / new tab
            if (whatsAppSettings.autoOpenTab !== false) {
              window.open(waLink, '_blank');
            }

            // Show interactive banner in-app
            setActiveAlert({
              slot,
              link: waLink,
              date: targetDate,
            });
          }
        }
      }
    };

    // Check immediately and every 15 seconds
    checkBriefingTime();
    const interval = setInterval(checkBriefingTime, 15000);
    return () => clearInterval(interval);
  }, [whatsAppSettings.lastDispatchedSlot, whatsAppSettings.autoOpenTab, selectedDate, getWhatsAppDailyDigestLink, markBriefingDispatched]);

  // Compute next scheduled briefing
  const nextSlot = useMemo(() => {
    const now = new Date();
    const currentTotalMin = now.getHours() * 60 + now.getMinutes();

    for (const slot of BRIEFING_SLOTS) {
      const slotTotalMin = slot.hour * 60 + slot.minute;
      if (slotTotalMin > currentTotalMin) {
        return slot;
      }
    }
    // If past 11:00 PM, return 8:00 AM next morning
    return BRIEFING_SLOTS[0];
  }, []);

  return (
    <>
      {/* Active Scheduled Briefing Popup Alert Banner */}
      {activeAlert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-950 text-white shadow-2xl space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-100 font-mono">
                    🔔 Automated WhatsApp Briefing Triggered!
                  </h4>
                  <p className="text-xs text-emerald-300 font-medium">
                    {activeAlert.slot.label} ({activeAlert.date})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveAlert(null)}
                className="text-emerald-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Your automated schedule briefing has been dispatched. Click below if your browser popup was blocked.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={activeAlert.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActiveAlert(null)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Open WhatsApp Web Now
              </a>
              <button
                onClick={() => setActiveAlert(null)}
                className="px-3 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-xs font-medium text-emerald-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
