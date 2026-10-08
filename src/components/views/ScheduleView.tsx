'use client';

import React, { useState } from 'react';
import { useExamStore } from '@/store/useExamStore';
import { SubTask, SubjectCode, PhaseType, DayType } from '@/types';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Play,
  ArrowRight,
  Plus,
  Trash2,
  Filter,
  Sparkles,
  CalendarDays,
  ShieldCheck,
  RotateCw,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScheduleView: React.FC = () => {
  const {
    schedules,
    selectedDate,
    setSelectedDate,
    toggleTask,
    auditAndRolloverDay,
    autoRedistributeBacklog,
    rescheduleTask,
    addTask,
    deleteTask,
    startStopwatch,
    phaseFilter,
    setPhaseFilter,
    subjectFilter,
    setSubjectFilter,
    getWhatsAppTaskLink,
  } = useExamStore();


  const [rescheduleModalTask, setRescheduleModalTask] = useState<SubTask | null>(null);
  const [targetDateInput, setTargetDateInput] = useState<string>('');

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState<SubjectCode>('ML');
  const [newTaskUnit, setNewTaskUnit] = useState<3 | 4 | 5 | 6>(3);
  const [newTaskTimeSlot, setNewTaskTimeSlot] = useState('7:30 PM – 10:00 PM');
  const [newTaskHours, setNewTaskHours] = useState(2.5);
  const [newTaskPriority, setNewTaskPriority] = useState<SubTask['priority']>('P1');

  // Filter schedules by Phase
  const filteredSchedules = schedules.filter((s) => {
    if (phaseFilter !== 'ALL' && s.phase !== phaseFilter) return false;
    return true;
  });

  const activeDay = schedules.find((s) => s.date === selectedDate) || schedules[0];

  // Filter active day's tasks by subject if filter is applied
  const visibleTasks = activeDay.tasks.filter((t) => {
    if (subjectFilter !== 'ALL' && t.subjectCode !== subjectFilter) return false;
    return true;
  });

  const completedHours = activeDay.tasks
    .filter((t) => t.isCompleted)
    .reduce((acc, t) => acc + t.plannedHours, 0);

  const totalTasksCount = activeDay.tasks.length;
  const completedTasksCount = activeDay.tasks.filter((t) => t.isCompleted).length;
  const backlogTasksCount = activeDay.tasks.filter((t) => t.isBacklog && !t.isCompleted).length;

  const handleTaskToggle = (task: SubTask) => {
    toggleTask(task.id);
    if (!task.isCompleted) {
      // Trigger subtle celebration when completing
      try {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#34d399', '#38bdf8', '#fbbf24'],
        });
      } catch {}
    }
  };

  const handleRescheduleSubmit = () => {
    if (rescheduleModalTask && targetDateInput) {
      rescheduleTask(rescheduleModalTask.id, targetDateInput);
      setRescheduleModalTask(null);
      setTargetDateInput('');
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    addTask(selectedDate, {
      subjectCode: newTaskSubject,
      unit: newTaskUnit,
      timeSlot: newTaskTimeSlot,
      plannedHours: newTaskHours,
      title: newTaskTitle,
      description: newTaskDesc,
      priority: newTaskPriority,
    });

    setIsAddTaskModalOpen(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  // Phase metadata badge helper
  const getPhaseBadge = (phase: PhaseType) => {
    switch (phase) {
      case 'FOUNDATION':
        return 'bg-semantic-sky-bg text-semantic-sky-text border-semantic-sky-border';
      case 'SUBMISSIONS':
        return 'bg-semantic-amber-bg text-semantic-amber-text border-semantic-amber-border';
      case 'PRACTICALS':
        return 'bg-semantic-purple-bg text-semantic-purple-text border-semantic-purple-border';
      case 'INTENSIVE':
        return 'bg-semantic-rose-bg text-semantic-rose-text border-semantic-rose-border';
      case 'MOCKS':
        return 'bg-semantic-emerald-bg text-semantic-emerald-text border-semantic-emerald-border';
      case 'EXAM_BUFFER':
        return 'bg-surface-elevated text-text-primary border-border-accent';
    }
  };

  const getPriorityBadge = (priority: SubTask['priority']) => {
    switch (priority) {
      case 'P1':
        return 'bg-semantic-amber-bg text-semantic-amber-text border-semantic-amber-border';
      case 'P2':
        return 'bg-semantic-sky-bg text-semantic-sky-text border-semantic-sky-border';
      case 'APPLICATION':
        return 'bg-semantic-emerald-bg text-semantic-emerald-text border-semantic-emerald-border';
      case 'ROUTINE':
        return 'bg-surface-elevated text-text-secondary border-border-subtle';
    }
  };

  const getSubjectColor = (subj: SubjectCode) => {
    switch (subj) {
      case 'ML':
        return 'text-semantic-emerald-text';
      case 'DMV':
        return 'text-semantic-sky-text';
      case 'BIF':
        return 'text-semantic-amber-text';
      case 'IR':
        return 'text-semantic-purple-text';
      case 'PRACTICAL':
        return 'text-semantic-rose-text';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter & Phase Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-1 border border-border-subtle rounded-lg p-3">
        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
          <span className="text-text-secondary mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Phase:
          </span>
          {(['ALL', 'FOUNDATION', 'SUBMISSIONS', 'PRACTICALS', 'INTENSIVE', 'MOCKS', 'EXAM_BUFFER'] as const).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPhaseFilter(p)}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  phaseFilter === p
                    ? 'bg-surface-elevated text-text-primary border border-border-accent font-bold'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-2'
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-text-secondary">Subject:</span>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value as any)}
            className="bg-surface-2 border border-border-accent rounded px-2.5 py-1 text-xs font-mono text-text-primary focus:outline-none"
          >
            <option value="ALL">All Subjects</option>
            <option value="ML">ML (Machine Learning)</option>
            <option value="DMV">DMV (Data Mining & Viz)</option>
            <option value="BIF">BIF (Bioinformatics)</option>
            <option value="IR">IR (Information Retrieval)</option>
            <option value="PRACTICAL">Lab Practicals</option>
          </select>
        </div>
      </div>

      {/* 57-Day Interactive Horizontal Calendar Strip */}
      <div className="bg-surface-1 border border-border-subtle rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs sm:text-sm text-text-secondary font-mono mb-3 px-1 font-medium">
          <span>57-Day Continuous Schedule Timeline (Oct 08 – Dec 03, 2026)</span>
          <span className="px-2 py-0.5 rounded bg-surface-2 border border-border-subtle">Showing {filteredSchedules.length} Days</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {filteredSchedules.map((schedule) => {
            const isSelected = schedule.date === selectedDate;
            const completed = schedule.tasks.filter((t) => t.isCompleted).length;
            const total = schedule.tasks.length;
            const isDone = total > 0 && completed === total;
            const hasBacklog = schedule.tasks.some((t) => t.isBacklog && !t.isCompleted);

            return (
              <button
                key={schedule.date}
                onClick={() => setSelectedDate(schedule.date)}
                className={`flex-shrink-0 w-28 p-3 rounded-xl border text-left transition-all font-mono shadow-sm ${
                  isSelected
                    ? 'bg-surface-elevated border-semantic-sky-text ring-2 ring-semantic-sky-text shadow-md'
                    : 'bg-surface-2/70 border-border-subtle hover:border-border-accent hover:bg-surface-2'
                }`}
              >
                <div className="text-xs text-text-secondary font-semibold uppercase tracking-wider truncate">
                  {schedule.dayOfWeek.slice(0, 3)}
                </div>
                <div className="text-base font-bold text-text-primary mt-0.5 tracking-tight">
                  {schedule.date.slice(5)}
                </div>
                <div className="flex items-center justify-between text-xs mt-2.5 pt-1.5 border-t border-border-subtle">
                  <span className={`font-bold ${isDone ? 'text-semantic-emerald-text' : hasBacklog ? 'text-semantic-rose-text' : 'text-text-muted'}`}>
                    {completed}/{total}
                  </span>
                  <span className="text-text-secondary font-semibold">{schedule.targetHours}h</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Header & Actions */}
      <div className="bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-mono tracking-tight">
                {activeDay.date} — {activeDay.dayOfWeek}
              </h1>
              <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase border ${getPhaseBadge(activeDay.phase)}`}>
                {activeDay.phase}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-surface-2 text-text-secondary border border-border-subtle">
                {activeDay.dayType}
              </span>
            </div>
            <p className="text-sm sm:text-base text-text-muted mt-2 font-sans leading-relaxed">
              Focus Objective: <strong className="text-text-primary font-semibold">{activeDay.notes}</strong>
            </p>
          </div>

          {/* Action Buttons: Audit Day, Auto-Redistribute, Add Task */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs sm:text-sm">
            <button
              onClick={() => auditAndRolloverDay(activeDay.date)}
              className="flex items-center gap-2 px-3.5 py-2 bg-surface-2 hover:bg-surface-elevated text-text-primary border border-border-subtle rounded-xl transition-all font-semibold shadow-sm"
              title="Mark incomplete tasks as Backlog"
            >
              <ShieldCheck className="w-4 h-4 text-semantic-amber-text" />
              <span>Audit Day ({activeDay.isAudited ? 'Audited' : 'Pending'})</span>
            </button>

            <button
              onClick={autoRedistributeBacklog}
              className="flex items-center gap-2 px-3.5 py-2 bg-semantic-sky-bg text-semantic-sky-text border border-semantic-sky-border rounded-xl hover:brightness-110 transition-all font-semibold shadow-sm"
              title="Redistribute backlog tasks into upcoming available slots"
            >
              <RotateCw className="w-4 h-4" />
              <span>Auto-Redistribute Backlogs</span>
            </button>

            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-surface-elevated hover:bg-surface-3 text-text-primary border border-border-accent rounded-xl transition-all font-semibold shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Subtask</span>
            </button>
          </div>
        </div>

        {/* Study Hours & Progress Bar */}
        <div className="space-y-2 pt-2 font-mono text-xs sm:text-sm">
          <div className="flex justify-between text-text-secondary font-medium">
            <span>
              Target Load: <strong className="text-text-primary">{activeDay.targetHours} Hours</strong> | Completed: <strong className="text-semantic-emerald-text">{completedHours.toFixed(1)} Hours</strong>
            </span>
            <span>
              Tasks: {completedTasksCount}/{totalTasksCount} Completed {backlogTasksCount > 0 && `(${backlogTasksCount} Backlog)`}
            </span>
          </div>
          <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden border border-border-subtle">
            <div
              className="h-full bg-semantic-emerald-text transition-all duration-300 rounded-full"
              style={{
                width: `${activeDay.targetHours > 0 ? Math.min(100, (completedHours / activeDay.targetHours) * 100) : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-text-primary font-sans flex items-center justify-between">
          <span>Scheduled Subtasks ({visibleTasks.length})</span>
          <span className="text-xs sm:text-sm text-text-secondary font-mono font-medium">Deterministic Execution Protocol</span>
        </h3>

        {visibleTasks.length === 0 ? (
          <div className="p-10 text-center bg-surface-1 border border-border-subtle rounded-2xl text-text-muted text-base font-mono">
            No tasks match the active filters for this date.
          </div>
        ) : (
          visibleTasks.map((task) => (
            <div
              key={task.id}
              className={`p-5 rounded-2xl border transition-all shadow-sm ${
                task.isCompleted
                  ? 'bg-surface-1/40 border-border-subtle opacity-75'
                  : task.isBacklog
                  ? 'bg-semantic-rose-bg/10 border-semantic-rose-border/60'
                  : 'bg-surface-1 border-border-subtle hover:border-border-accent hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Completion Checkbox */}
                <button
                  onClick={() => handleTaskToggle(task)}
                  className="mt-1 text-text-muted hover:text-semantic-emerald-text transition-colors flex-shrink-0"
                >
                  {task.isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-semantic-emerald-text" />
                  ) : (
                    <Circle className="w-6 h-6 text-border-accent hover:border-text-primary" />
                  )}
                </button>

                {/* Main Task Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Subject Badge */}
                    <span className={`text-sm font-mono font-bold ${getSubjectColor(task.subjectCode)}`}>
                      [{task.subjectCode} {task.unit ? `Unit ${task.unit}` : ''}]
                    </span>

                    {/* Task Title */}
                    <span className={`text-base sm:text-lg font-bold ${task.isCompleted ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                      {task.title}
                    </span>

                    {/* Priority Badge */}
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono uppercase font-bold border ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>

                    {/* Backlog Tag */}
                    {task.isBacklog && (
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-semantic-rose-bg text-semantic-rose-text border border-semantic-rose-border flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Backlog Rollover
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-sans">
                    {task.description}
                  </p>

                  {/* Footer Meta: Time slot, planned hours, stopwatch trigger & WhatsApp alert */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs sm:text-sm font-mono dark:text-zinc-400 text-zinc-600">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 dark:text-zinc-200 text-zinc-800 font-medium">
                        <Clock className="w-4 h-4 text-sky-500" /> {task.timeSlot}
                      </span>
                      <span className="font-semibold dark:text-zinc-300 text-zinc-700">{task.plannedHours} hrs</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* 1-Click WhatsApp Task Reminder */}
                      {getWhatsAppTaskLink && (
                        <a
                          href={getWhatsAppTaskLink(task.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 dark:bg-emerald-950/50 bg-emerald-100 text-emerald-700 dark:text-emerald-300 hover:opacity-90 rounded-xl text-xs font-semibold border dark:border-emerald-800/60 border-emerald-300 transition shadow-sm"
                          title="Send task reminder to WhatsApp"
                        >
                          <Send className="w-3.5 h-3.5" /> WhatsApp
                        </a>
                      )}

                      <button
                        onClick={() => startStopwatch(task.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 dark:bg-zinc-800 bg-zinc-100 hover:dark:bg-zinc-750 hover:bg-zinc-200 dark:text-zinc-100 text-zinc-900 rounded-xl text-xs font-semibold border dark:border-zinc-700 border-zinc-300 transition shadow-sm"
                        title="Start timer for this task"
                      >
                        <Play className="w-3.5 h-3.5 text-emerald-500" /> Focus
                      </button>

                      <button
                        onClick={() => {
                          setRescheduleModalTask(task);
                          setTargetDateInput(task.currentScheduledDate);
                        }}
                        className="dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-100 hover:text-zinc-900 text-xs font-medium hover:underline transition px-1"
                      >
                        Reschedule
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="dark:text-zinc-500 text-zinc-400 hover:text-rose-500 p-1.5 transition rounded-lg"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleModalTask && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-surface-1 border border-border-accent rounded-lg max-w-md w-full p-6 space-y-4 shadow-card-elevated">
            <h3 className="text-base font-semibold text-text-primary font-sans">
              Reschedule Subtask
            </h3>
            <p className="text-text-muted">
              Move &apos;{rescheduleModalTask.title}&apos; to a new date:
            </p>

            <div>
              <label className="text-text-secondary block mb-1">Target Date (YYYY-MM-DD):</label>
              <input
                type="date"
                min="2026-10-08"
                max="2026-12-03"
                value={targetDateInput}
                onChange={(e) => setTargetDateInput(e.target.value)}
                className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRescheduleModalTask(null)}
                className="px-3 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-muted rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleSubmit}
                className="px-4 py-1.5 bg-semantic-sky-bg text-semantic-sky-text border border-semantic-sky-border rounded hover:brightness-110"
              >
                Confirm Move
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Task Modal */}
      {isAddTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-surface-1 border border-border-accent rounded-lg max-w-lg w-full p-6 space-y-4 shadow-card-elevated">
            <h3 className="text-base font-semibold text-text-primary font-sans">
              Add Custom Subtask for {selectedDate}
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="text-text-secondary block mb-1">Task Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SVM Dual Optimization Derivation"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-text-secondary block mb-1">Detailed Execution Description:</label>
                <textarea
                  rows={2}
                  placeholder="Detailed notes on what to solve, derive, or execute..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary focus:outline-none font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-text-secondary block mb-1">Subject:</label>
                  <select
                    value={newTaskSubject}
                    onChange={(e) => setNewTaskSubject(e.target.value as SubjectCode)}
                    className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary"
                  >
                    <option value="ML">Machine Learning (ML)</option>
                    <option value="DMV">Data Mining & Viz (DMV)</option>
                    <option value="BIF">Bioinformatics (BIF)</option>
                    <option value="IR">Information Retrieval (IR)</option>
                    <option value="PRACTICAL">Lab Practical</option>
                    <option value="GENERAL">General / College</option>
                  </select>
                </div>

                <div>
                  <label className="text-text-secondary block mb-1">Unit Number:</label>
                  <select
                    value={newTaskUnit}
                    onChange={(e) => setNewTaskUnit(Number(e.target.value) as any)}
                    className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary"
                  >
                    <option value={3}>Unit 3</option>
                    <option value={4}>Unit 4</option>
                    <option value={5}>Unit 5</option>
                    <option value={6}>Unit 6</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-text-secondary block mb-1">Time Slot:</label>
                  <input
                    type="text"
                    value={newTaskTimeSlot}
                    onChange={(e) => setNewTaskTimeSlot(e.target.value)}
                    className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary"
                  />
                </div>

                <div>
                  <label className="text-text-secondary block mb-1">Planned Hours:</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newTaskHours}
                    onChange={(e) => setNewTaskHours(Number(e.target.value))}
                    className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary"
                  />
                </div>

                <div>
                  <label className="text-text-secondary block mb-1">Priority:</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full bg-surface-2 border border-border-accent rounded p-2 text-text-primary"
                  >
                    <option value="P1">P1 (Core)</option>
                    <option value="P2">P2 (Secondary)</option>
                    <option value="APPLICATION">Application</option>
                    <option value="ROUTINE">Routine</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="px-3 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-muted rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-semantic-emerald-bg text-semantic-emerald-text border border-semantic-emerald-border rounded hover:brightness-110"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
