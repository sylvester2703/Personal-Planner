'use client';

import React, { useState, useEffect } from 'react';
import { useExamStore } from '@/store/useExamStore';
import { Navbar } from '@/components/layout/Navbar';
import { ScheduleView } from '@/components/views/ScheduleView';
import { PersonalCalendarView } from '@/components/views/PersonalCalendarView';
import { DrivePYQView } from '@/components/views/DrivePYQView';
import { SyllabusView } from '@/components/views/SyllabusView';
import { FocusEngine } from '@/components/views/FocusEngine';
import { AnalyticsView } from '@/components/views/AnalyticsView';
import { CommandPalette } from '@/components/common/CommandPalette';
import { WhatsAppAutoScheduler } from '@/components/common/WhatsAppAutoScheduler';

export default function ExamOSApp() {
  const { activeTab, theme } = useExamStore();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync theme class with document root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-zinc-950 bg-slate-50 dark:text-zinc-50 text-zinc-900 transition-colors font-sans antialiased">
      {/* Automated WhatsApp Background Scheduler (8:00 AM, 2:00 PM, 7:30 PM, 11:00 PM) */}
      <WhatsAppAutoScheduler />

      {/* Top Navbar */}
      <Navbar onOpenSearch={() => setIsCommandPaletteOpen(true)} />

      {/* Main View Port */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'schedule' && <ScheduleView />}
        {activeTab === 'personal_calendar' && <PersonalCalendarView />}
        {activeTab === 'pyq_drive' && <DrivePYQView />}
        {activeTab === 'syllabus' && <SyllabusView />}
        {activeTab === 'focus' && <FocusEngine />}
        {activeTab === 'analytics' && <AnalyticsView />}
      </main>

      {/* Global Quick Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}

