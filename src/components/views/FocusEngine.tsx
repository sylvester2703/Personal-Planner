'use client';

import React, { useState, useEffect } from 'react';
import { useExamStore } from '@/store/useExamStore';
import { Timer, Play, Pause, RotateCcw, CheckCircle2, Flame, Bell, Coffee, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FocusEngine: React.FC = () => {
  const {
    activeStopwatch,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    schedules,
    selectedDate,
    toggleTask,
  } = useExamStore();

  const [mode, setMode] = useState<'stopwatch' | 'pomodoro'>('pomodoro');
  const [pomodoroMinutes, setPomodoroMinutes] = useState<number>(50);
  const [breakMinutes, setBreakMinutes] = useState<number>(10);
  const [pomodoroSecondsLeft, setPomodoroSecondsLeft] = useState<number>(50 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState<boolean>(false);
  const [pomodoroPhase, setPomodoroPhase] = useState<'WORK' | 'BREAK'>('WORK');
  const [completedSessionsCount, setCompletedSessionsCount] = useState<number>(3);

  const activeDay = schedules.find((s) => s.date === selectedDate) || schedules[0];
  const activeTask = activeDay.tasks.find((t) => t.id === activeStopwatch.taskId) || activeDay.tasks[0];

  // Pomodoro timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPomodoroRunning) {
      interval = setInterval(() => {
        setPomodoroSecondsLeft((prev) => {
          if (prev <= 1) {
            // Switch phase or complete
            if (pomodoroPhase === 'WORK') {
              setPomodoroPhase('BREAK');
              setCompletedSessionsCount((c) => c + 1);
              try {
                confetti({
                  particleCount: 40,
                  spread: 60,
                  origin: { y: 0.6 },
                });
              } catch {}
              return breakMinutes * 60;
            } else {
              setPomodoroPhase('WORK');
              return pomodoroMinutes * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPomodoroRunning, pomodoroPhase, breakMinutes, pomodoroMinutes]);

  const formatSec = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatStopwatchHours = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSetPomodoroPreset = (work: number, brk: number) => {
    setPomodoroMinutes(work);
    setBreakMinutes(brk);
    setPomodoroSecondsLeft(work * 60);
    setIsPomodoroRunning(false);
    setPomodoroPhase('WORK');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-text-muted font-medium">
              <span>Deep Work Engine</span>
              <span>•</span>
              <span>Cognitive Sprint Automation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-mono mt-1 flex items-center gap-2.5 tracking-tight">
              <Timer className="w-7 h-7 text-semantic-rose-text" />
              Focus Engine & Deep Work Protocol
            </h1>
            <p className="text-sm sm:text-base text-text-muted mt-1 font-sans">
              High-intensity uninterrupted study blocks linked directly to today&apos;s scheduled SPPU subtasks.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMode('pomodoro')}
              className={`px-4 py-2 text-xs sm:text-sm font-mono font-semibold rounded-xl border transition-all shadow-sm ${
                mode === 'pomodoro'
                  ? 'bg-surface-elevated text-text-primary border-border-accent ring-1 ring-border-accent'
                  : 'bg-surface-2 text-text-muted border-border-subtle hover:text-text-primary'
              }`}
            >
              Pomodoro Mode
            </button>
            <button
              onClick={() => setMode('stopwatch')}
              className={`px-4 py-2 text-xs sm:text-sm font-mono font-semibold rounded-xl border transition-all shadow-sm ${
                mode === 'stopwatch'
                  ? 'bg-surface-elevated text-text-primary border-border-accent ring-1 ring-border-accent'
                  : 'bg-surface-2 text-text-muted border-border-subtle hover:text-text-primary'
              }`}
            >
              Stopwatch Mode
            </button>
          </div>
        </div>
      </div>

      {/* Main Focus Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timer Card */}
        <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
          {/* Linked Task Banner */}
          {activeTask && (
            <div className="w-full p-4 bg-surface-2/80 rounded-xl border border-border-subtle flex items-center justify-between text-left font-mono text-xs sm:text-sm shadow-sm">
              <div>
                <div className="text-text-secondary text-xs uppercase tracking-wider font-semibold">Active Focus Target:</div>
                <div className="text-text-primary font-bold truncate max-w-md text-sm sm:text-base mt-0.5">
                  [{activeTask.subjectCode}] {activeTask.title}
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs bg-semantic-sky-bg text-semantic-sky-text font-bold border border-semantic-sky-border">
                {activeTask.timeSlot}
              </span>
            </div>
          )}

          {/* Time Display */}
          {mode === 'pomodoro' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm font-mono font-bold uppercase tracking-widest text-text-secondary">
                {pomodoroPhase === 'WORK' ? (
                  <span className="text-semantic-rose-text flex items-center gap-2">
                    <Flame className="w-5 h-5 animate-pulse" /> Deep Work Block
                  </span>
                ) : (
                  <span className="text-semantic-emerald-text flex items-center gap-2">
                    <Coffee className="w-5 h-5" /> Cognitive Recovery Break
                  </span>
                )}
              </div>
              <div className="text-7xl sm:text-9xl font-mono font-bold text-text-primary tracking-tight py-2">
                {formatSec(pomodoroSecondsLeft)}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm font-mono font-bold uppercase tracking-widest text-text-secondary">
                Cumulative Session Stopwatch
              </div>
              <div className="text-7xl sm:text-9xl font-mono font-bold text-text-primary tracking-tight py-2">
                {formatStopwatchHours(activeStopwatch.elapsedSeconds)}
              </div>
            </div>
          )}

          {/* Timer Controls */}
          <div className="flex items-center gap-3 font-mono text-sm">
            {mode === 'pomodoro' ? (
              <>
                <button
                  onClick={() => setIsPomodoroRunning(!isPomodoroRunning)}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md ${
                    isPomodoroRunning
                      ? 'bg-surface-elevated text-text-primary border border-border-accent'
                      : 'bg-semantic-rose-bg text-semantic-rose-text border border-semantic-rose-border hover:brightness-110'
                  }`}
                >
                  {isPomodoroRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPomodoroRunning ? 'Pause Sprint' : 'Start Focus Sprint'}
                </button>
                <button
                  onClick={() => {
                    setIsPomodoroRunning(false);
                    setPomodoroSecondsLeft(pomodoroMinutes * 60);
                    setPomodoroPhase('WORK');
                  }}
                  className="p-3.5 bg-surface-2 hover:bg-surface-elevated text-text-muted hover:text-text-primary rounded-xl border border-border-subtle shadow-sm transition"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => (activeStopwatch.isRunning ? pauseStopwatch() : startStopwatch())}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md ${
                    activeStopwatch.isRunning
                      ? 'bg-surface-elevated text-text-primary border border-border-accent'
                      : 'bg-semantic-emerald-bg text-semantic-emerald-text border border-semantic-emerald-border hover:brightness-110'
                  }`}
                >
                  {activeStopwatch.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {activeStopwatch.isRunning ? 'Pause Stopwatch' : 'Start Stopwatch'}
                </button>
                <button
                  onClick={resetStopwatch}
                  className="p-3.5 bg-surface-2 hover:bg-surface-elevated text-text-muted hover:text-semantic-rose-text rounded-xl border border-border-subtle shadow-sm transition"
                  title="Reset Stopwatch"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Interval Presets */}
          {mode === 'pomodoro' && (
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-5 border-t border-border-subtle/50 w-full font-mono text-xs sm:text-sm">
              <span className="text-text-secondary mr-2 font-medium">Presets:</span>
              <button
                onClick={() => handleSetPomodoroPreset(25, 5)}
                className="px-3.5 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-muted hover:text-text-primary rounded-xl border border-border-subtle font-medium transition shadow-sm"
              >
                25 / 5 min
              </button>
              <button
                onClick={() => handleSetPomodoroPreset(50, 10)}
                className="px-3.5 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-muted hover:text-text-primary rounded-xl border border-border-subtle font-bold text-text-primary transition shadow-sm"
              >
                50 / 10 min (Recommended)
              </button>
              <button
                onClick={() => handleSetPomodoroPreset(90, 20)}
                className="px-3.5 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-muted hover:text-text-primary rounded-xl border border-border-subtle font-medium transition shadow-sm"
              >
                90 / 20 min (Ultradian)
              </button>
            </div>
          )}
        </div>

        {/* Task Binding & Session Log */}
        <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-text-primary flex items-center justify-between font-mono">
            <span>Today&apos;s Focus Targets</span>
            <span className="text-xs sm:text-sm font-mono text-semantic-emerald-text font-bold">
              {completedSessionsCount} Sprints Logged Today
            </span>
          </h3>

          <div className="space-y-2.5">
            {activeDay.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => startStopwatch(task.id)}
                className={`p-4 rounded-xl border text-xs sm:text-sm font-mono cursor-pointer transition-all shadow-sm ${
                  activeStopwatch.taskId === task.id
                    ? 'bg-semantic-sky-bg/40 border-semantic-sky-border ring-1 ring-semantic-sky-border'
                    : 'bg-surface-2 border-border-subtle hover:border-border-accent hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-text-primary">
                    [{task.subjectCode}] {task.title}
                  </span>
                  <span className="text-text-muted font-semibold">{task.plannedHours}h</span>
                </div>
                <div className="text-xs sm:text-sm text-text-muted truncate mt-1 font-sans">
                  {task.description}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-canvas rounded-xl border border-border-accent/60 text-xs sm:text-sm font-mono space-y-2 text-text-muted">
            <div className="text-text-primary font-bold">Deep Work Protocol:</div>
            <div>• Zero tab-switching or social media checking during active sprints.</div>
            <div>• Keep notebook open for pencil derivations and manual numerical solving.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
