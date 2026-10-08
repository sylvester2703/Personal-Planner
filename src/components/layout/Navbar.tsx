'use client';

import React, { useEffect, useState } from 'react';
import { useExamStore } from '@/store/useExamStore';
import {
  Calendar,
  CalendarDays,
  FolderOpen,
  BookOpen,
  Timer,
  BarChart3,
  Search,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Sun,
  Moon,
  MessageSquare,
  Sparkles,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const {
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    activeStopwatch,
    pauseStopwatch,
    startStopwatch,
    resetStopwatch,
    tickStopwatch,
    selectedDate,
    schedules,
    whatsAppSettings,
    getWhatsAppDailyDigestLink,
  } = useExamStore();

  // Interval timer for active stopwatch
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeStopwatch.isRunning) {
      interval = setInterval(() => {
        tickStopwatch();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeStopwatch.isRunning, tickStopwatch]);

  // Format stopwatch seconds
  const formatSeconds = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentSchedule = schedules.find((s) => s.date === selectedDate) || schedules[0];

  return (
    <>
      <header className="sticky top-0 z-40 dark:bg-zinc-950/95 bg-white/95 backdrop-blur border-b dark:border-zinc-800 border-zinc-200 transition-colors shadow-sm">
        {/* Top Utility Bar */}
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand & Pattern Tag */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl dark:bg-zinc-850 bg-zinc-100 border dark:border-zinc-700 border-zinc-300 flex items-center justify-center dark:text-sky-400 text-sky-600 font-mono font-bold text-base shadow-sm">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold dark:text-zinc-50 text-zinc-900 text-base tracking-tight">
                    SPPU AI&DS ExamOS
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700 border-zinc-300">
                    2019 Pattern
                  </span>
                </div>
                <div className="text-xs font-mono dark:text-zinc-400 text-zinc-500">
                  Oct 08 – Dec 03, 2026 Academic Operating System
                </div>
              </div>
            </div>

            {/* Current Phase Badge */}
            {currentSchedule && (
              <div className="hidden xl:flex items-center gap-2 ml-4 pl-4 border-l dark:border-zinc-800 border-zinc-200 font-mono text-xs">
                <span className="dark:text-zinc-400 text-zinc-500">Active Date:</span>
                <span className="dark:text-zinc-100 text-zinc-900 font-bold">{currentSchedule.date}</span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800/60 bg-purple-100 text-purple-800 border border-purple-300">
                  {currentSchedule.phase}
                </span>
              </div>
            )}
          </div>

          {/* Center / Right Tools: Automated WhatsApp Daemon, Stopwatch, Theme & Search */}
          <div className="flex items-center gap-3">
            {/* Automated WhatsApp Daemon Status Pill */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border dark:bg-emerald-950/40 bg-emerald-50 dark:border-emerald-800/60 border-emerald-300 text-xs font-mono text-emerald-700 dark:text-emerald-300 shadow-sm"
              title="Automated WhatsApp Briefings active at 8:00 AM, 2:00 PM, 7:30 PM, 11:00 PM"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">Auto-WhatsApp Briefings:</span>
              <span className="font-bold dark:text-emerald-200 text-emerald-900">8 AM • 2 PM • 7:30 PM • 11 PM</span>
            </div>

            {/* Live Stopwatch Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 dark:bg-zinc-900 bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-xl text-xs font-mono shadow-sm">
              <Timer
                className={`w-4 h-4 ${
                  activeStopwatch.isRunning ? 'text-emerald-500 animate-pulse' : 'text-zinc-400'
                }`}
              />
              <span className="dark:text-zinc-100 text-zinc-900 font-bold text-sm">
                {formatSeconds(activeStopwatch.elapsedSeconds)}
              </span>
              <div className="flex items-center gap-1 border-l dark:border-zinc-700 border-zinc-300 pl-2">
                {activeStopwatch.isRunning ? (
                  <button
                    onClick={pauseStopwatch}
                    className="text-zinc-400 hover:text-zinc-100 p-0.5"
                    title="Pause Stopwatch"
                  >
                    <Pause className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => startStopwatch()}
                    className="text-zinc-400 hover:text-emerald-500 p-0.5"
                    title="Start Stopwatch"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={resetStopwatch}
                  className="text-zinc-400 hover:text-rose-500 p-0.5"
                  title="Reset Stopwatch"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 dark:bg-zinc-900 bg-zinc-100 border dark:border-zinc-800 border-zinc-200 hover:border-zinc-400 rounded-xl text-xs font-mono dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-100 hover:text-zinc-900 transition shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search OS...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] dark:bg-zinc-800 bg-zinc-200 border dark:border-zinc-700 border-zinc-300 rounded dark:text-zinc-400 text-zinc-600 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* LIGHT / DARK MODE TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border dark:border-zinc-800 border-zinc-200 dark:bg-zinc-900 bg-zinc-100 dark:text-amber-400 text-amber-600 hover:opacity-80 transition shadow-sm"
              title={`Switch to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>
          </div>
        </div>

        {/* Bottom Tab Bar with Active Tab Indicators */}
        <div className="max-w-[1600px] mx-auto px-4 overflow-x-auto scrollbar-none flex items-center gap-2 border-t dark:border-zinc-800/60 border-zinc-200 py-2">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition ${
              activeTab === 'schedule'
                ? 'dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-900 border dark:border-zinc-700 border-zinc-300 shadow-sm'
                : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900 hover:dark:bg-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-500" />
            <span>57-Day Academic Schedule</span>
          </button>

          {/* PERSONAL PLANNER CALENDAR TAB */}
          <button
            onClick={() => setActiveTab('personal_calendar')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition ${
              activeTab === 'personal_calendar'
                ? 'dark:bg-emerald-950/60 bg-emerald-100 dark:text-emerald-300 text-emerald-900 border dark:border-emerald-800/80 border-emerald-300 shadow-sm'
                : 'dark:text-emerald-400 text-emerald-700 hover:dark:bg-emerald-950/30 hover:bg-emerald-50'
            }`}
          >
            <CalendarDays className="w-4 h-4 text-emerald-500" />
            <span className="flex items-center gap-1.5">
              Personal Planner
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </button>

          {/* GOOGLE DRIVE PYQ PAPERS TAB */}
          <button
            onClick={() => setActiveTab('pyq_drive')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition ${
              activeTab === 'pyq_drive'
                ? 'dark:bg-sky-950/60 bg-sky-100 dark:text-sky-300 text-sky-900 border dark:border-sky-800/80 border-sky-300 shadow-sm'
                : 'dark:text-sky-400 text-sky-700 hover:dark:bg-sky-950/30 hover:bg-sky-50'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-sky-500" />
            <span className="flex items-center gap-1.5">
              PYQ Question Papers (Drive)
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-500 text-white font-mono">4 Folders</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition ${
              activeTab === 'syllabus'
                ? 'dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-900 border dark:border-zinc-700 border-zinc-300 shadow-sm'
                : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900 hover:dark:bg-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Syllabus & PYQ Marking Rubrics</span>
          </button>

          <button
            onClick={() => setActiveTab('focus')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition ${
              activeTab === 'focus'
                ? 'dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-900 border dark:border-zinc-700 border-zinc-300 shadow-sm'
                : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900 hover:dark:bg-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Timer className="w-4 h-4 text-rose-500" />
            <span>Focus Engine & Timer</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition ${
              activeTab === 'analytics'
                ? 'dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-900 border dark:border-zinc-700 border-zinc-300 shadow-sm'
                : 'dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200 hover:text-zinc-900 hover:dark:bg-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-purple-500" />
            <span>Readiness Analytics</span>
          </button>
        </div>
      </header>
    </>
  );
};


