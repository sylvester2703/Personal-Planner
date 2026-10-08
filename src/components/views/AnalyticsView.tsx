'use client';

import React from 'react';
import { useExamStore } from '@/store/useExamStore';
import { SubjectCode } from '@/types';
import { BarChart3, TrendingUp, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Target, Award } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { schedules } = useExamStore();

  // Total metrics
  let totalTasks = 0;
  let completedTasks = 0;
  let backlogTasks = 0;
  let totalTargetHours = 0;
  let totalCompletedHours = 0;

  const subjectStats: Record<
    SubjectCode,
    { total: number; completed: number; hours: number; completedHours: number }
  > = {
    ML: { total: 0, completed: 0, hours: 0, completedHours: 0 },
    DMV: { total: 0, completed: 0, hours: 0, completedHours: 0 },
    BIF: { total: 0, completed: 0, hours: 0, completedHours: 0 },
    IR: { total: 0, completed: 0, hours: 0, completedHours: 0 },
    PRACTICAL: { total: 0, completed: 0, hours: 0, completedHours: 0 },
    GENERAL: { total: 0, completed: 0, hours: 0, completedHours: 0 },
  };

  const unitStats: Record<number, { total: number; completed: number }> = {
    3: { total: 0, completed: 0 },
    4: { total: 0, completed: 0 },
    5: { total: 0, completed: 0 },
    6: { total: 0, completed: 0 },
  };

  schedules.forEach((day) => {
    totalTargetHours += day.targetHours;
    day.tasks.forEach((t) => {
      totalTasks++;
      if (t.isCompleted) {
        completedTasks++;
        totalCompletedHours += t.plannedHours;
      }
      if (t.isBacklog && !t.isCompleted) {
        backlogTasks++;
      }

      if (subjectStats[t.subjectCode]) {
        subjectStats[t.subjectCode].total++;
        subjectStats[t.subjectCode].hours += t.plannedHours;
        if (t.isCompleted) {
          subjectStats[t.subjectCode].completed++;
          subjectStats[t.subjectCode].completedHours += t.plannedHours;
        }
      }

      if (t.unit && unitStats[t.unit]) {
        unitStats[t.unit].total++;
        if (t.isCompleted) unitStats[t.unit].completed++;
      }
    });
  });

  const overallPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const hoursPercent = totalTargetHours > 0 ? (totalCompletedHours / totalTargetHours) * 100 : 0;

  // Estimated Readiness Score based on completion & backlog penalty
  const readinessScore = Math.max(
    10,
    Math.min(99, Math.round(overallPercent * 0.95 + (backlogTasks === 0 ? 5 : -Math.min(10, backlogTasks))))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-text-muted font-medium">
              <span>Executive Telemetry</span>
              <span>•</span>
              <span>57-Day Burndown & Readiness</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-mono mt-1 flex items-center gap-2.5 tracking-tight">
              <BarChart3 className="w-7 h-7 text-semantic-purple-text" />
              Academic Readiness & Burndown Analytics
            </h1>
            <p className="text-sm sm:text-base text-text-muted mt-1 font-sans">
              Comprehensive telemetry tracking across all 57 calendar days, subject syllabi, and units.
            </p>
          </div>

          <div className="p-4 bg-surface-2 rounded-xl border border-border-subtle flex items-center gap-3.5 font-mono shadow-sm">
            <Award className="w-8 h-8 text-semantic-emerald-text" />
            <div>
              <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Estimated Exam Readiness</div>
              <div className="text-2xl font-bold text-semantic-emerald-text">
                {readinessScore}% Index
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-surface-1 border border-border-subtle rounded-2xl shadow-sm">
          <div className="text-xs sm:text-sm text-text-secondary font-mono font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-semantic-emerald-text" /> Task Completion
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-text-primary mt-2">
            {overallPercent.toFixed(1)}%
          </div>
          <div className="text-xs text-text-muted font-mono mt-1">
            {completedTasks} of {totalTasks} Subtasks
          </div>
        </div>

        <div className="p-5 bg-surface-1 border border-border-subtle rounded-2xl shadow-sm">
          <div className="text-xs sm:text-sm text-text-secondary font-mono font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-semantic-sky-text" /> Planned Study Hours
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-semantic-sky-text mt-2">
            {totalCompletedHours.toFixed(1)}h
          </div>
          <div className="text-xs text-text-muted font-mono mt-1">
            Target: {totalTargetHours.toFixed(1)} Total Hours
          </div>
        </div>

        <div className="p-5 bg-surface-1 border border-border-subtle rounded-2xl shadow-sm">
          <div className="text-xs sm:text-sm text-text-secondary font-mono font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-semantic-rose-text" /> Active Backlogs
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-semantic-rose-text mt-2">
            {backlogTasks}
          </div>
          <div className="text-xs text-text-muted font-mono mt-1">
            Tasks Needing Redistribution
          </div>
        </div>

        <div className="p-5 bg-surface-1 border border-border-subtle rounded-2xl shadow-sm">
          <div className="text-xs sm:text-sm text-text-secondary font-mono font-semibold flex items-center gap-2">
            <Target className="w-4 h-4 text-semantic-amber-text" /> Total Calendar Span
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-text-primary mt-2">
            57 Days
          </div>
          <div className="text-xs text-text-muted font-mono mt-1">
            Oct 08 to Dec 03, 2026
          </div>
        </div>
      </div>

      {/* Subject-Wise Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-text-primary font-mono">
            Subject-Wise Progress Breakdown
          </h3>

          <div className="space-y-4">
            {(
              [
                { code: 'ML', name: 'Machine Learning (Course 417521)' },
                { code: 'DMV', name: 'Data Mining & Visualization (Course 417522)' },
                { code: 'BIF', name: 'Bioinformatics (Course 417523)' },
                { code: 'IR', name: 'Information Retrieval (Course 417524)' },
                { code: 'PRACTICAL', name: 'Lab Practicals & Journal Viva' },
              ] as const
            ).map((subj) => {
              const stat = subjectStats[subj.code];
              const pct = stat.total > 0 ? (stat.completed / stat.total) * 100 : 0;
              return (
                <div key={subj.code} className="p-4 bg-surface-2 rounded-xl border border-border-subtle space-y-2 font-mono text-xs sm:text-sm shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-text-primary">{subj.name}</span>
                    <span className="text-text-muted font-semibold">
                      {stat.completed}/{stat.total} tasks ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-1 rounded-full overflow-hidden border border-border-subtle">
                    <div
                      className="h-full bg-semantic-sky-text transition-all duration-300 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unit-Wise Mastery Heatmaps */}
        <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-text-primary font-mono">
            End-Sem Syllabus Unit Completion
          </h3>

          <div className="grid grid-cols-2 gap-3.5">
            {([3, 4, 5, 6] as const).map((unit) => {
              const stat = unitStats[unit];
              const pct = stat.total > 0 ? (stat.completed / stat.total) * 100 : 0;
              return (
                <div key={unit} className="p-5 bg-surface-2 rounded-xl border border-border-subtle space-y-2 font-mono text-xs sm:text-sm text-center shadow-sm">
                  <div className="text-text-secondary uppercase font-bold text-xs tracking-wider">Unit {unit}</div>
                  <div className="text-3xl font-bold text-text-primary">{pct.toFixed(0)}%</div>
                  <div className="text-xs text-text-muted">
                    {stat.completed} / {stat.total} Tasks
                  </div>
                  <div className="w-full h-2 bg-surface-1 rounded-full overflow-hidden border border-border-subtle">
                    <div
                      className="h-full bg-semantic-emerald-text transition-all rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-canvas rounded-xl border border-border-accent/60 text-xs sm:text-sm font-mono text-text-muted space-y-1.5 shadow-sm">
            <div className="text-text-primary font-bold">SPPU Scoring Advice:</div>
            <div>• Units 3 and 4 carry 36% weightage in End-Sem paper.</div>
            <div>• All 4 numerical questions appear from Units 3, 4, 5, and 6.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
