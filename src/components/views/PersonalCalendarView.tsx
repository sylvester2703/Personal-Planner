'use client';

import React, { useState, useMemo } from 'react';
import { useExamStore } from '@/store/useExamStore';
import {
  PersonalEvent,
  PersonalEventCategory,
  PersonalEventPriority,
} from '@/types';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  MapPin,
  Share2,
  MessageSquare,
  Settings,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Dumbbell,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  BookOpen,
  Send,
  CalendarDays,
  ListTodo,
  ExternalLink,
  X,
  Smartphone,
  Copy,
  Check,
} from 'lucide-react';

const CATEGORY_CONFIG: Record<
  PersonalEventCategory,
  { label: string; icon: any; color: string; badgeClass: string }
> = {
  FITNESS: {
    label: 'Fitness & Health',
    icon: Dumbbell,
    color: 'emerald',
    badgeClass:
      'dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800/60 bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  INTERNSHIP: {
    label: 'Internship & Dev',
    icon: Briefcase,
    color: 'sky',
    badgeClass:
      'dark:bg-sky-950/50 dark:text-sky-400 dark:border-sky-800/60 bg-sky-100 text-sky-800 border-sky-300',
  },
  PRAYER: {
    label: 'Prayer & Faith',
    icon: Heart,
    color: 'purple',
    badgeClass:
      'dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800/60 bg-purple-100 text-purple-800 border-purple-300',
  },
  COLLEGE: {
    label: 'College Formalities',
    icon: GraduationCap,
    color: 'amber',
    badgeClass:
      'dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/60 bg-amber-100 text-amber-800 border-amber-300',
  },
  HABIT: {
    label: 'Habits & Routine',
    icon: Flame,
    color: 'orange',
    badgeClass:
      'dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800/60 bg-orange-100 text-orange-800 border-orange-300',
  },
  PERSONAL: {
    label: 'Personal & Family',
    icon: Sparkles,
    color: 'rose',
    badgeClass:
      'dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800/60 bg-rose-100 text-rose-800 border-rose-300',
  },
  MEETING: {
    label: 'Meetings & Syncs',
    icon: Users,
    color: 'indigo',
    badgeClass:
      'dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800/60 bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  STUDY: {
    label: 'Self-Study & Reading',
    icon: BookOpen,
    color: 'cyan',
    badgeClass:
      'dark:bg-cyan-950/50 dark:text-cyan-400 dark:border-cyan-800/60 bg-cyan-100 text-cyan-800 border-cyan-300',
  },
};

const PRIORITY_BADGES: Record<PersonalEventPriority, string> = {
  URGENT:
    'dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800 bg-rose-100 text-rose-800 border-rose-300 font-semibold',
  HIGH:
    'dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800 bg-amber-100 text-amber-800 border-amber-300 font-medium',
  MEDIUM:
    'dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800 bg-sky-100 text-sky-800 border-sky-300',
  LOW:
    'dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700 bg-zinc-100 text-zinc-700 border-zinc-300',
};

export function PersonalCalendarView() {
  const {
    personalEvents,
    whatsAppSettings,
    selectedDate,
    setSelectedDate,
    addPersonalEvent,
    deletePersonalEvent,
    togglePersonalEvent,
    updateWhatsAppSettings,
    getWhatsAppEventLink,
    getWhatsAppDailyDigestLink,
  } = useExamStore();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'stream'>('month');
  const [selectedCategory, setSelectedCategory] = useState<PersonalEventCategory | 'ALL'>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<PersonalEventPriority | 'ALL'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWhatsAppSettingsModal, setShowWhatsAppSettingsModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: selectedDate || '2026-10-08',
    startTime: '08:00 AM',
    endTime: '09:00 AM',
    category: 'FITNESS' as PersonalEventCategory,
    priority: 'HIGH' as PersonalEventPriority,
    location: '',
    reminderWhatsApp: true,
    reminderTimeMinutesBefore: 15,
    isRecurringDaily: false,
  });

  // Calendar Navigation calculations
  const activeDateObj = useMemo(() => {
    const [y, m, d] = (selectedDate || '2026-10-08').split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [selectedDate]);

  const year = activeDateObj.getFullYear();
  const month = activeDateObj.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return personalEvents.filter((evt) => {
      const matchCategory = selectedCategory === 'ALL' || evt.category === selectedCategory;
      const matchPriority = selectedPriority === 'ALL' || evt.priority === selectedPriority;
      return matchCategory && matchPriority;
    });
  }, [personalEvents, selectedCategory, selectedPriority]);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, PersonalEvent[]>();
    filteredEvents.forEach((evt) => {
      const list = map.get(evt.date) || [];
      list.push(evt);
      map.set(evt.date, list);
    });
    return map;
  }, [filteredEvents]);

  // Selected date events
  const selectedDateEvents = useMemo(() => {
    return eventsByDate.get(selectedDate) || [];
  }, [eventsByDate, selectedDate]);

  const completedCount = personalEvents.filter((e) => e.isCompleted).length;
  const totalCount = personalEvents.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(year, month + direction, 1);
    const yStr = newMonth.getFullYear();
    const mStr = String(newMonth.getMonth() + 1).padStart(2, '0');
    setSelectedDate(`${yStr}-${mStr}-01`);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    addPersonalEvent({
      title: newEvent.title.trim(),
      description: newEvent.description.trim() || undefined,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime || undefined,
      category: newEvent.category,
      priority: newEvent.priority,
      isCompleted: false,
      location: newEvent.location.trim() || undefined,
      reminderWhatsApp: newEvent.reminderWhatsApp,
      reminderTimeMinutesBefore: newEvent.reminderTimeMinutesBefore,
      isRecurringDaily: newEvent.isRecurringDaily,
    });

    setShowAddModal(false);
    setNewEvent({
      title: '',
      description: '',
      date: selectedDate,
      startTime: '08:00 AM',
      endTime: '09:00 AM',
      category: 'FITNESS',
      priority: 'HIGH',
      location: '',
      reminderWhatsApp: true,
      reminderTimeMinutesBefore: 15,
      isRecurringDaily: false,
    });
  };

  const handleCopyWhatsAppDailyDigest = () => {
    const link = getWhatsAppDailyDigestLink(selectedDate);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 p-5 rounded-xl border dark:bg-zinc-900/80 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg dark:bg-emerald-950/60 bg-emerald-100 flex items-center justify-center text-emerald-500 border dark:border-emerald-800/60 border-emerald-300">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight dark:text-zinc-100 text-zinc-900">
                  Personal Life & Routine Operating System
                </h2>
                <p className="text-xs dark:text-zinc-400 text-zinc-600">
                  Dedicated scheduler for internships, prayers, fitness, habits & family routines.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t dark:border-zinc-800/80 border-zinc-100 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 dark:text-zinc-300 text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <strong>{completedCount}</strong> / {totalCount} Done ({completionPercent}%)
              </span>
              <span className="flex items-center gap-1.5 dark:text-zinc-300 text-zinc-700">
                <Flame className="w-4 h-4 text-orange-500" />
                Streak: <strong>14 Days Active</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setNewEvent((prev) => ({ ...prev, date: selectedDate }));
                  setShowAddModal(true);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-950 text-zinc-50 hover:opacity-90 transition flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Event
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Notification & Digest Card */}
        <div className="p-5 rounded-xl border dark:bg-emerald-950/20 bg-emerald-50/70 dark:border-emerald-800/40 border-emerald-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" /> WhatsApp Alerts
              </div>
              <button
                onClick={() => setShowWhatsAppSettingsModal(true)}
                title="Configure WhatsApp Phone & Preferences"
                className="p-1 rounded dark:hover:bg-emerald-900/50 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-300 transition"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2 text-xs dark:text-zinc-300 text-zinc-700">
              {whatsAppSettings.phoneNumber ? (
                <span>
                  Linked Phone: <strong className="font-mono">{whatsAppSettings.countryCode} {whatsAppSettings.phoneNumber}</strong>
                </span>
              ) : (
                <span className="italic text-amber-600 dark:text-amber-400">
                  Phone number not configured. Click settings to set.
                </span>
              )}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <a
              href={getWhatsAppDailyDigestLink(selectedDate)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Send Today&apos;s Digest
            </a>
            <button
              onClick={handleCopyWhatsAppDailyDigest}
              title="Copy WhatsApp Briefing Link"
              className="p-2 rounded-lg border dark:border-emerald-800 border-emerald-300 dark:bg-zinc-900 bg-white dark:text-zinc-200 text-zinc-700 hover:opacity-80 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Selected Date Quick Status */}
        <div className="p-5 rounded-xl border dark:bg-zinc-900/80 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs dark:text-zinc-400 text-zinc-500">
              <span className="uppercase tracking-wider font-mono">Selected Day</span>
              <span className="font-medium text-emerald-500">{selectedDateEvents.length} events</span>
            </div>
            <div className="mt-1 text-xl font-bold dark:text-zinc-100 text-zinc-900 font-mono">
              {selectedDate}
            </div>
            <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-1">
              {selectedDateEvents.filter((e) => e.isCompleted).length} completed •{' '}
              {selectedDateEvents.filter((e) => !e.isCompleted).length} remaining
            </p>
          </div>

          <button
            onClick={() => setSelectedDate('2026-10-08')}
            className="mt-3 text-xs text-left text-sky-500 hover:underline flex items-center gap-1"
          >
            Jump to System Baseline (Oct 08, 2026) →
          </button>
        </div>
      </div>

      {/* Controls, View Switchers, & Category Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b dark:border-zinc-800 border-zinc-200 pb-4">
        {/* Month Navigator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border dark:border-zinc-800 border-zinc-200 rounded-lg dark:bg-zinc-900 bg-white p-1">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1.5 rounded dark:hover:bg-zinc-800 hover:bg-zinc-100 text-zinc-600 dark:text-zinc-300 transition"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold px-2 min-w-[140px] text-center dark:text-zinc-200 text-zinc-800">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1.5 rounded dark:hover:bg-zinc-800 hover:bg-zinc-100 text-zinc-600 dark:text-zinc-300 transition"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center rounded-lg border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-white p-1 text-xs">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                viewMode === 'month'
                  ? 'dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-900'
                  : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                viewMode === 'day'
                  ? 'dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-900'
                  : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900'
              }`}
            >
              Day Agenda
            </button>
            <button
              onClick={() => setViewMode('stream')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                viewMode === 'stream'
                  ? 'dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-900'
                  : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900'
              }`}
            >
              All Events ({filteredEvents.length})
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
              selectedCategory === 'ALL'
                ? 'dark:bg-zinc-200 bg-zinc-900 dark:text-zinc-900 text-zinc-100 dark:border-zinc-200 border-zinc-900'
                : 'dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200'
            }`}
          >
            All Categories
          </button>
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => {
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(isSelected ? 'ALL' : (key as PersonalEventCategory))}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition flex items-center gap-1 ${
                  isSelected
                    ? cfg.badgeClass
                    : 'dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200'
                }`}
              >
                <cfg.icon className="w-3 h-3" />
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Calendar Render Area */}
      {viewMode === 'month' && (
        <div className="space-y-6">
          {/* Month Grid */}
          <div className="rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900/50 bg-white overflow-hidden shadow-sm">
            {/* Weekdays Header */}
            <div className="grid grid-cols-7 border-b dark:border-zinc-800 border-zinc-200 text-center py-2 text-xs font-semibold uppercase tracking-wider dark:bg-zinc-900 bg-zinc-50 dark:text-zinc-400 text-zinc-600">
              <div className="text-rose-500">Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div className="text-sky-500">Sat</div>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 divide-x divide-y dark:divide-zinc-800 divide-zinc-200">
              {/* Empty padding boxes */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[110px] dark:bg-zinc-950/40 bg-zinc-50/50 p-2" />
              ))}

              {/* Days of current month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const isToday = dateStr === '2026-10-08';
                const isSelected = dateStr === selectedDate;
                const dayEvents = eventsByDate.get(dateStr) || [];

                return (
                  <div
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`min-h-[110px] p-2 transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'dark:bg-zinc-800/80 bg-zinc-100 ring-2 ring-inset dark:ring-emerald-500 ring-emerald-600'
                        : isToday
                        ? 'dark:bg-emerald-950/10 bg-emerald-50/40'
                        : 'dark:bg-zinc-900/30 bg-white dark:hover:bg-zinc-800/40 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono font-medium w-6 h-6 rounded-full flex items-center justify-center ${
                          isToday
                            ? 'bg-emerald-500 text-white font-bold'
                            : isSelected
                            ? 'dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-900 text-white font-bold'
                            : 'dark:text-zinc-300 text-zinc-700'
                        }`}
                      >
                        {dayNum}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-[10px] font-mono dark:text-zinc-400 text-zinc-500">
                          {dayEvents.filter((e) => e.isCompleted).length}/{dayEvents.length}
                        </span>
                      )}
                    </div>

                    {/* Event indicators / chips in cell */}
                    <div className="mt-1.5 space-y-1 overflow-hidden flex-1">
                      {dayEvents.slice(0, 2).map((evt) => {
                        const cfg = CATEGORY_CONFIG[evt.category] || CATEGORY_CONFIG.PERSONAL;
                        return (
                          <div
                            key={evt.id}
                            title={`${evt.startTime} - ${evt.title}`}
                            className={`text-[10px] truncate px-1.5 py-0.5 rounded flex items-center gap-1 border ${
                              evt.isCompleted
                                ? 'line-through opacity-50 dark:bg-zinc-900 bg-zinc-100 text-zinc-400 border-zinc-300 dark:border-zinc-800'
                                : cfg.badgeClass
                            }`}
                          >
                            <cfg.icon className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{evt.title}</span>
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] dark:text-zinc-400 text-zinc-500 pl-1 font-mono">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Date Detail Section below month grid */}
          <div className="p-6 rounded-xl border dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b dark:border-zinc-800 border-zinc-200 pb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-base dark:text-zinc-100 text-zinc-900">
                  Agenda for {selectedDate}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={getWhatsAppDailyDigestLink(selectedDate)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Daily Briefing
                </a>
                <button
                  onClick={() => {
                    setNewEvent((prev) => ({ ...prev, date: selectedDate }));
                    setShowAddModal(true);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-200 text-zinc-800 hover:opacity-80 transition flex items-center gap-1 border dark:border-zinc-700 border-zinc-300"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to {selectedDate}
                </button>
              </div>
            </div>

            {selectedDateEvents.length === 0 ? (
              <div className="py-8 text-center text-xs dark:text-zinc-500 text-zinc-400">
                No personal events scheduled for {selectedDate}. Click &quot;Add to {selectedDate}&quot; to create one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDateEvents.map((evt) => {
                  const cfg = CATEGORY_CONFIG[evt.category] || CATEGORY_CONFIG.PERSONAL;
                  const waLink = getWhatsAppEventLink(evt.id);

                  return (
                    <div
                      key={evt.id}
                      className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                        evt.isCompleted
                          ? 'dark:bg-zinc-950/40 bg-zinc-50/80 dark:border-zinc-800/60 border-zinc-200 opacity-70'
                          : 'dark:bg-zinc-850/70 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <button
                          onClick={() => togglePersonalEvent(evt.id)}
                          className="mt-0.5 text-zinc-400 hover:text-emerald-500 transition shrink-0"
                        >
                          {evt.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded border flex items-center gap-1 ${cfg.badgeClass}`}
                            >
                              <cfg.icon className="w-3 h-3" />
                              {cfg.label}
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded border ${PRIORITY_BADGES[evt.priority]}`}
                            >
                              {evt.priority}
                            </span>
                            {evt.isRecurringDaily && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-300 text-zinc-700 font-mono">
                                Daily
                              </span>
                            )}
                          </div>

                          <h4
                            className={`font-semibold text-sm mt-1.5 ${
                              evt.isCompleted
                                ? 'line-through dark:text-zinc-400 text-zinc-400'
                                : 'dark:text-zinc-100 text-zinc-900'
                            }`}
                          >
                            {evt.title}
                          </h4>

                          {evt.description && (
                            <p className="text-xs dark:text-zinc-400 text-zinc-600 mt-1 line-clamp-2">
                              {evt.description}
                            </p>
                          )}

                          <div className="flex items-center gap-3 mt-3 text-xs dark:text-zinc-400 text-zinc-500 font-mono flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-emerald-500" />
                              {evt.startTime}
                              {evt.endTime ? ` – ${evt.endTime}` : ''}
                            </span>
                            {evt.location && (
                              <span className="flex items-center gap-1 text-zinc-400">
                                <MapPin className="w-3.5 h-3.5" />
                                {evt.location}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-1 shrink-0">
                          {waLink && (
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Send Reminder on WhatsApp"
                              className="p-1.5 rounded-lg dark:hover:bg-emerald-950/80 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 transition border dark:border-emerald-800/60 border-emerald-300"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => deletePersonalEvent(evt.id)}
                            title="Delete Event"
                            className="p-1.5 rounded-lg dark:hover:bg-rose-950 hover:bg-rose-100 text-zinc-400 hover:text-rose-500 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Day Agenda View */}
      {viewMode === 'day' && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl border dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between border-b dark:border-zinc-800 border-zinc-200 pb-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-500 font-semibold">
                  Detailed Day Agenda
                </span>
                <h3 className="text-xl font-bold dark:text-zinc-100 text-zinc-900 mt-0.5">
                  {selectedDate}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const [y, m, d] = selectedDate.split('-').map(Number);
                    const prev = new Date(y, m - 1, d - 1);
                    setSelectedDate(
                      `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-${String(
                        prev.getDate()
                      ).padStart(2, '0')}`
                    );
                  }}
                  className="p-2 rounded-lg border dark:border-zinc-700 border-zinc-300 dark:bg-zinc-800 bg-zinc-100 text-zinc-700 dark:text-zinc-200 hover:opacity-80 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const [y, m, d] = selectedDate.split('-').map(Number);
                    const next = new Date(y, m - 1, d + 1);
                    setSelectedDate(
                      `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(
                        next.getDate()
                      ).padStart(2, '0')}`
                    );
                  }}
                  className="p-2 rounded-lg border dark:border-zinc-700 border-zinc-300 dark:bg-zinc-800 bg-zinc-100 text-zinc-700 dark:text-zinc-200 hover:opacity-80 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setNewEvent((prev) => ({ ...prev, date: selectedDate }));
                    setShowAddModal(true);
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-medium dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-950 text-zinc-50 hover:opacity-90 transition flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Event
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {selectedDateEvents.length === 0 ? (
                <div className="py-12 text-center text-sm dark:text-zinc-500 text-zinc-400">
                  No personal events scheduled for {selectedDate}.
                </div>
              ) : (
                selectedDateEvents.map((evt) => {
                  const cfg = CATEGORY_CONFIG[evt.category] || CATEGORY_CONFIG.PERSONAL;
                  const waLink = getWhatsAppEventLink(evt.id);

                  return (
                    <div
                      key={evt.id}
                      className={`p-5 rounded-xl border transition flex items-start gap-4 ${
                        evt.isCompleted
                          ? 'dark:bg-zinc-950/40 bg-zinc-50/80 dark:border-zinc-800/60 border-zinc-200 opacity-60'
                          : 'dark:bg-zinc-850 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm'
                      }`}
                    >
                      <button
                        onClick={() => togglePersonalEvent(evt.id)}
                        className="mt-1 text-zinc-400 hover:text-emerald-500 transition shrink-0"
                      >
                        {evt.isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full border flex items-center gap-1 font-medium ${cfg.badgeClass}`}
                          >
                            <cfg.icon className="w-3.5 h-3.5" />
                            {cfg.label}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded border ${PRIORITY_BADGES[evt.priority]}`}
                          >
                            {evt.priority}
                          </span>
                          <span className="text-xs font-mono dark:text-zinc-400 text-zinc-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                            {evt.startTime}
                            {evt.endTime ? ` – ${evt.endTime}` : ''}
                          </span>
                        </div>

                        <h4
                          className={`text-base font-semibold mt-2 ${
                            evt.isCompleted
                              ? 'line-through dark:text-zinc-400 text-zinc-400'
                              : 'dark:text-zinc-100 text-zinc-900'
                          }`}
                        >
                          {evt.title}
                        </h4>

                        {evt.description && (
                          <p className="text-sm dark:text-zinc-400 text-zinc-600 mt-1.5">
                            {evt.description}
                          </p>
                        )}

                        {evt.location && (
                          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-2">
                            <MapPin className="w-3.5 h-3.5 text-rose-400" />
                            <span>{evt.location}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1 text-xs shadow-sm"
                          >
                            <Send className="w-3.5 h-3.5" /> Send Reminder
                          </a>
                        )}
                        <button
                          onClick={() => deletePersonalEvent(evt.id)}
                          className="p-2 rounded-lg dark:hover:bg-rose-950 hover:bg-rose-100 text-zinc-400 hover:text-rose-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stream / All Events List View */}
      {viewMode === 'stream' && (
        <div className="p-6 rounded-xl border dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b dark:border-zinc-800 border-zinc-200 pb-3">
            <h3 className="font-semibold text-base dark:text-zinc-100 text-zinc-900">
              Master Personal Events Directory ({filteredEvents.length} total)
            </h3>
            <span className="text-xs dark:text-zinc-400 text-zinc-500">
              Chronological schedule (Oct 08 – Dec 03, 2026)
            </span>
          </div>

          <div className="divide-y dark:divide-zinc-800 divide-zinc-200">
            {filteredEvents.map((evt) => {
              const cfg = CATEGORY_CONFIG[evt.category] || CATEGORY_CONFIG.PERSONAL;
              const waLink = getWhatsAppEventLink(evt.id);

              return (
                <div
                  key={evt.id}
                  className="py-3.5 flex items-center justify-between gap-4 hover:dark:bg-zinc-800/30 hover:bg-zinc-50 px-2 rounded-lg transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => togglePersonalEvent(evt.id)}
                      className="text-zinc-400 hover:text-emerald-500 transition shrink-0"
                    >
                      {evt.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-semibold dark:text-zinc-300 text-zinc-700">
                          {evt.date}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border flex items-center gap-1 ${cfg.badgeClass}`}
                        >
                          <cfg.icon className="w-2.5 h-2.5" />
                          {cfg.label}
                        </span>
                        <span className="text-[10px] font-mono dark:text-zinc-400 text-zinc-500">
                          {evt.startTime}
                        </span>
                      </div>

                      <h4
                        className={`text-sm font-medium mt-1 truncate ${
                          evt.isCompleted
                            ? 'line-through dark:text-zinc-500 text-zinc-400'
                            : 'dark:text-zinc-200 text-zinc-900'
                        }`}
                      >
                        {evt.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded dark:hover:bg-emerald-950 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => deletePersonalEvent(evt.id)}
                      className="p-1.5 rounded dark:hover:bg-rose-950 hover:bg-rose-100 text-zinc-400 hover:text-rose-500 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ADD PERSONAL EVENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl border dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b dark:border-zinc-800 border-zinc-200 pb-3">
              <div className="flex items-center gap-2 text-emerald-500">
                <Plus className="w-5 h-5" />
                <h3 className="text-base font-semibold dark:text-zinc-100 text-zinc-900">
                  Schedule Personal Life Event
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-zinc-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g., Morning Calisthenics & Core Workout"
                  className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                    Date (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value as PersonalEventCategory })
                    }
                    className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {Object.entries(CATEGORY_CONFIG).map(([k, cfg]) => (
                      <option key={k} value={k}>
                        {cfg.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    placeholder="e.g., 07:00 AM"
                    className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                    End Time (Optional)
                  </label>
                  <input
                    type="text"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    placeholder="e.g., 08:00 AM"
                    className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newEvent.priority}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, priority: e.target.value as PersonalEventPriority })
                    }
                    className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="URGENT">🔥 Urgent</option>
                    <option value="HIGH">⚡ High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="e.g., Home Gym / Dept Lab 4"
                    className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                  Description / Action Notes
                </label>
                <textarea
                  rows={2}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Additional context, links, or specific checklist details..."
                  className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg dark:bg-zinc-800/50 bg-zinc-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.reminderWhatsApp}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, reminderWhatsApp: e.target.checked })
                    }
                    className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="dark:text-zinc-200 text-zinc-800 font-medium">
                    Enable WhatsApp 1-Click Reminder
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.isRecurringDaily}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, isRecurringDaily: e.target.checked })
                    }
                    className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="dark:text-zinc-200 text-zinc-800 font-medium">
                    Daily Recurring
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t dark:border-zinc-800 border-zinc-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP CONFIGURATION MODAL */}
      {showWhatsAppSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl border dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b dark:border-zinc-800 border-zinc-200 pb-3">
              <div className="flex items-center gap-2 text-emerald-500">
                <Smartphone className="w-5 h-5" />
                <h3 className="text-base font-semibold dark:text-zinc-100 text-zinc-900">
                  WhatsApp Integration Settings
                </h3>
              </div>
              <button
                onClick={() => setShowWhatsAppSettingsModal(false)}
                className="text-zinc-400 hover:text-zinc-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                  Recipient Phone Number (with country code)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={whatsAppSettings.countryCode}
                    onChange={(e) =>
                      updateWhatsAppSettings({ countryCode: e.target.value })
                    }
                    placeholder="+91"
                    className="w-20 px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 font-mono text-center"
                  />
                  <input
                    type="text"
                    value={whatsAppSettings.phoneNumber}
                    onChange={(e) =>
                      updateWhatsAppSettings({ phoneNumber: e.target.value })
                    }
                    placeholder="9876543210"
                    className="flex-1 px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 font-mono"
                  />
                </div>
                <p className="text-[11px] dark:text-zinc-500 text-zinc-400 mt-1">
                  Enter your mobile number to receive reminders on your own WhatsApp, or leave blank to choose contact on send.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium dark:text-zinc-300 text-zinc-700 mb-1">
                  Custom Alert Message Prefix
                </label>
                <input
                  type="text"
                  value={whatsAppSettings.customMessagePrefix || ''}
                  onChange={(e) =>
                    updateWhatsAppSettings({ customMessagePrefix: e.target.value })
                  }
                  placeholder="🔔 *SPPU AI&DS ExamOS Alert*"
                  className="w-full px-3 py-2 rounded-lg border dark:bg-zinc-800 bg-zinc-50 dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900"
                />
              </div>

              <div className="p-3.5 rounded-xl border dark:border-emerald-800/60 border-emerald-300 dark:bg-emerald-950/30 bg-emerald-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-xs dark:text-emerald-300 text-emerald-900 font-mono">
                      Automated 4x Daily Briefing Protocol
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-600 text-white">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg dark:bg-zinc-900/80 bg-white/80 border dark:border-zinc-800 border-zinc-200">
                    <div className="font-bold text-emerald-500">🌅 08:00 AM</div>
                    <div className="dark:text-zinc-400 text-zinc-600">Morning Briefing</div>
                  </div>
                  <div className="p-2 rounded-lg dark:bg-zinc-900/80 bg-white/80 border dark:border-zinc-800 border-zinc-200">
                    <div className="font-bold text-sky-500">☀️ 02:00 PM</div>
                    <div className="dark:text-zinc-400 text-zinc-600">Midday Sync</div>
                  </div>
                  <div className="p-2 rounded-lg dark:bg-zinc-900/80 bg-white/80 border dark:border-zinc-800 border-zinc-200">
                    <div className="font-bold text-amber-500">🌆 07:30 PM</div>
                    <div className="dark:text-zinc-400 text-zinc-600">Deep Work Sprint</div>
                  </div>
                  <div className="p-2 rounded-lg dark:bg-zinc-900/80 bg-white/80 border dark:border-zinc-800 border-zinc-200">
                    <div className="font-bold text-purple-500">🌙 11:00 PM</div>
                    <div className="dark:text-zinc-400 text-zinc-600">Night Audit</div>
                  </div>
                </div>

                <div className="space-y-2 pt-1 border-t dark:border-emerald-800/40 border-emerald-200 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={whatsAppSettings.enableAutoBriefings !== false}
                      onChange={(e) =>
                        updateWhatsAppSettings({ enableAutoBriefings: e.target.checked })
                      }
                      className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="dark:text-zinc-200 text-zinc-800 font-medium">
                      Enable background automatic triggers
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={whatsAppSettings.autoOpenTab !== false}
                      onChange={(e) =>
                        updateWhatsAppSettings({ autoOpenTab: e.target.checked })
                      }
                      className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="dark:text-zinc-200 text-zinc-800 font-medium">
                      Auto-launch WhatsApp Web in new tab at scheduled times
                    </span>
                  </label>
                </div>
              </div>

              <div className="p-3 rounded-lg dark:bg-zinc-800/40 bg-zinc-100 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatsAppSettings.autoFormatEmoji}
                    onChange={(e) =>
                      updateWhatsAppSettings({ autoFormatEmoji: e.target.checked })
                    }
                    className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="dark:text-zinc-200 text-zinc-800 font-medium">
                    Auto-format emojis and bold markdown in WhatsApp messages
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t dark:border-zinc-800 border-zinc-200">
                <button
                  type="button"
                  onClick={() => setShowWhatsAppSettingsModal(false)}
                  className="px-4 py-2 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
