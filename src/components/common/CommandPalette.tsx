'use client';

import React, { useState, useEffect } from 'react';
import { useExamStore } from '@/store/useExamStore';
import {
  Search,
  Calendar,
  CalendarDays,
  FolderOpen,
  BookOpen,
  Timer,
  BarChart3,
  ArrowRight,
  Sun,
  Moon,
  MessageSquare,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const {
    setActiveTab,
    setSelectedDate,
    schedules,
    personalEvents,
    toggleTheme,
    theme,
    getWhatsAppDailyDigestLink,
    selectedDate,
  } = useExamStore();
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search Items
  const navItems = [
    { name: '57-Day Academic Schedule & Audit', tab: 'schedule' as const, icon: Calendar, cat: 'Navigation' },
    { name: 'Personal Life & Routine Calendar', tab: 'personal_calendar' as const, icon: CalendarDays, cat: 'Navigation' },
    { name: 'SPPU PYQ Question Papers (Google Drive)', tab: 'pyq_drive' as const, icon: FolderOpen, cat: 'Navigation' },
    { name: 'Syllabus & PYQ Vault (Units 3–6)', tab: 'syllabus' as const, icon: BookOpen, cat: 'Navigation' },
    { name: 'Focus Engine & Pomodoro Timer', tab: 'focus' as const, icon: Timer, cat: 'Navigation' },
    { name: 'Readiness & Burndown Analytics', tab: 'analytics' as const, icon: BarChart3, cat: 'Navigation' },
  ];

  // Quick Action triggers
  const actionItems = [
    {
      name: `Toggle Theme (Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode)`,
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      name: `Send Today's WhatsApp Briefing (${selectedDate})`,
      icon: MessageSquare,
      action: () => {
        const link = getWhatsAppDailyDigestLink(selectedDate);
        window.open(link, '_blank');
        onClose();
      },
    },
  ];

  // Search within schedule tasks
  const matchedTasks: { title: string; date: string; subject: string; timeSlot: string }[] = [];
  if (query.trim().length > 1) {
    const qLower = query.toLowerCase();
    schedules.forEach((day) => {
      day.tasks.forEach((t) => {
        if (
          t.title.toLowerCase().includes(qLower) ||
          t.description.toLowerCase().includes(qLower) ||
          t.subjectCode.toLowerCase().includes(qLower)
        ) {
          if (matchedTasks.length < 5) {
            matchedTasks.push({
              title: t.title,
              date: day.date,
              subject: t.subjectCode,
              timeSlot: t.timeSlot,
            });
          }
        }
      });
    });
  }

  const filteredNav = navItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = actionItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 p-4 font-mono">
      <div className="dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b dark:border-zinc-800 border-zinc-200 dark:bg-zinc-850/50 bg-zinc-50">
          <Search className="w-4 h-4 dark:text-zinc-400 text-zinc-500" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, subject (ML, DMV, BIF, IR), or topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm dark:text-zinc-100 text-zinc-900 focus:outline-none placeholder:text-zinc-400 font-sans"
          />
          <kbd className="px-2 py-0.5 text-[10px] dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-400 text-zinc-600 rounded border dark:border-zinc-700 border-zinc-300">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] dark:text-zinc-400 text-zinc-500 uppercase tracking-wider font-bold">
                Quick Actions
              </div>
              <div className="space-y-1">
                {filteredActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.name}
                      onClick={act.action}
                      className="w-full p-2.5 rounded-lg dark:hover:bg-zinc-800 hover:bg-zinc-100 text-left flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2.5 text-xs dark:text-zinc-200 text-zinc-800 font-medium">
                        <Icon className="w-4 h-4 text-emerald-500" />
                        <span>{act.name}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 dark:text-zinc-400 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div>
            <div className="px-2 py-1 text-[10px] dark:text-zinc-400 text-zinc-500 uppercase tracking-wider font-bold">
              Views & Tools
            </div>
            <div className="space-y-1">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.tab);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg dark:hover:bg-zinc-800 hover:bg-zinc-100 text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-xs dark:text-zinc-200 text-zinc-800">
                      <Icon className="w-4 h-4 text-sky-500" />
                      <span>{item.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 dark:text-zinc-400 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Matched Schedule Tasks */}
          {matchedTasks.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] dark:text-zinc-400 text-zinc-500 uppercase tracking-wider font-bold">
                Matching Scheduled Subtasks
              </div>
              <div className="space-y-1">
                {matchedTasks.map((task, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDate(task.date);
                      setActiveTab('schedule');
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-lg dark:hover:bg-zinc-800 hover:bg-zinc-100 text-left flex items-center justify-between group transition-colors text-xs"
                  >
                    <div className="space-y-0.5 truncate">
                      <div className="dark:text-zinc-100 text-zinc-900 font-bold truncate">
                        [{task.subject}] {task.title}
                      </div>
                      <div className="text-[10px] dark:text-zinc-400 text-zinc-500 font-sans">
                        Scheduled on {task.date} ({task.timeSlot})
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-300 text-zinc-700">
                      Go to Date
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950/50 bg-zinc-50 flex items-center justify-between text-[11px] dark:text-zinc-400 text-zinc-500">
          <span>Navigate with <strong>Tab / Enter</strong></span>
          <span>SPPU AI&DS ExamOS v1.1</span>
        </div>
      </div>
    </div>
  );
};

