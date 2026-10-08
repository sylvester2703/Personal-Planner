'use client';

import React, { useState } from 'react';
import { useExamStore } from '@/store/useExamStore';
import { PersonalTodoCategory } from '@/types';
import {
  Wifi,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Calendar,
  Clock,
  Heart,
  GraduationCap,
} from 'lucide-react';

export const LifeTracker: React.FC = () => {
  const {
    dailyHotspotQuotaMB,
    consumedHotspotMB,
    updateHotspotUsage,
    resetDailyHotspot,
    hotspotHistory,
    personalTodos,
    addPersonalTodo,
    togglePersonalTodo,
    deletePersonalTodo,
  } = useExamStore();

  const [activeCategory, setActiveCategory] = useState<PersonalTodoCategory | 'ALL'>('ALL');
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState<PersonalTodoCategory>('PERSONAL');
  const [newTodoTime, setNewTodoTime] = useState('');
  const [customUsageInput, setCustomUsageInput] = useState<number>(100);

  const remainingMB = Math.max(0, dailyHotspotQuotaMB - consumedHotspotMB);
  const usagePercent = Math.min(100, (consumedHotspotMB / dailyHotspotQuotaMB) * 100);
  const isCritical = remainingMB < 250;

  const filteredTodos = personalTodos.filter((t) => {
    if (activeCategory !== 'ALL' && t.category !== activeCategory) return false;
    return true;
  });

  const handleAddTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    addPersonalTodo(newTodoText.trim(), newTodoCategory, newTodoTime.trim() || undefined);
    setNewTodoText('');
    setNewTodoTime('');
  };

  const getCategoryBadge = (cat: PersonalTodoCategory) => {
    switch (cat) {
      case 'HOTSPOT':
        return 'bg-semantic-sky-bg text-semantic-sky-text border-semantic-sky-border';
      case 'PRAYER':
        return 'bg-semantic-purple-bg text-semantic-purple-text border-semantic-purple-border';
      case 'COLLEGE':
        return 'bg-semantic-amber-bg text-semantic-amber-text border-semantic-amber-border';
      case 'PERSONAL':
        return 'bg-semantic-emerald-bg text-semantic-emerald-text border-semantic-emerald-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span>Personal Operating System</span>
              <span>•</span>
              <span>Resource & Life Protocol</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary font-mono mt-1 flex items-center gap-2">
              <Wifi className="w-6 h-6 text-semantic-sky-text" />
              Hotspot Data & Daily Life Protocol
            </h1>
            <p className="text-xs text-text-muted mt-1 font-sans">
              Strict mobile hotspot quota tracking, daily prayers, college journal signoffs, and circadian wellness.
            </p>
          </div>
        </div>
      </div>

      {/* Hotspot Quota Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hotspot Visual Meter Card */}
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary font-mono flex items-center gap-2">
              <Wifi className="w-4 h-4 text-semantic-sky-text" />
              Daily Mobile Hotspot Cap
            </h3>
            <span className="text-xs font-mono text-text-secondary">
              Quota: {dailyHotspotQuotaMB} MB/day
            </span>
          </div>

          {/* Usage Meter */}
          <div className="p-5 bg-surface-2 rounded-lg border border-border-subtle space-y-3 font-mono">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-text-secondary">Remaining Data:</div>
                <div className={`text-4xl font-bold ${isCritical ? 'text-semantic-rose-text' : 'text-semantic-emerald-text'}`}>
                  {remainingMB} MB
                </div>
              </div>
              <div className="text-right text-xs text-text-muted">
                Consumed: <strong className="text-text-primary">{consumedHotspotMB} MB</strong> ({usagePercent.toFixed(1)}%)
              </div>
            </div>

            <div className="w-full h-3 bg-surface-1 rounded-full overflow-hidden border border-border-subtle">
              <div
                className={`h-full transition-all duration-300 ${
                  isCritical
                    ? 'bg-semantic-rose-text'
                    : usagePercent > 75
                    ? 'bg-semantic-amber-text'
                    : 'bg-semantic-sky-text'
                }`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>

            {isCritical && (
              <div className="p-2.5 bg-semantic-rose-bg border border-semantic-rose-border rounded text-xs text-semantic-rose-text flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>Critical data alert: Less than 250 MB remaining. Disable background video and downloads.</span>
              </div>
            )}
          </div>

          {/* Quick Log Buttons */}
          <div className="space-y-2 font-mono text-xs">
            <div className="text-text-secondary text-[11px]">Log Hotspot Consumption:</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateHotspotUsage(100)}
                className="px-3 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-primary rounded border border-border-subtle"
              >
                +100 MB
              </button>
              <button
                onClick={() => updateHotspotUsage(250)}
                className="px-3 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-primary rounded border border-border-subtle"
              >
                +250 MB
              </button>
              <button
                onClick={() => updateHotspotUsage(500)}
                className="px-3 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-primary rounded border border-border-subtle"
              >
                +500 MB
              </button>
              <button
                onClick={() => resetDailyHotspot()}
                className="px-3 py-1.5 bg-surface-2 hover:bg-surface-elevated text-text-muted hover:text-semantic-rose-text rounded border border-border-subtle ml-auto flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Daily
              </button>
            </div>
          </div>
        </div>

        {/* Hotspot Usage History */}
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary font-mono">
            Recent Data Log History
          </h3>

          <div className="space-y-2 font-mono text-xs">
            {hotspotHistory.map((h, idx) => (
              <div
                key={idx}
                className="p-3 bg-surface-2 rounded border border-border-subtle flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-text-muted" />
                  <span className="text-text-primary font-bold">{h.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted">{h.consumedMB} MB consumed</span>
                  <span className="text-semantic-emerald-text font-bold">
                    {Math.max(0, 2000 - h.consumedMB)} MB saved
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-canvas rounded border border-border-accent/60 text-xs font-mono text-text-muted">
            <strong className="text-text-primary">Rule of Thumb:</strong> 2000 MB allows approx 3 hours of Zoom / Google Meet or 12 hours of uninterrupted documentation, Jupyter execution, and PDF reading.
          </div>
        </div>
      </div>

      {/* Personal Routines & Checklists */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-text-primary font-mono flex items-center gap-2">
              <Heart className="w-5 h-5 text-semantic-rose-text" />
              Daily Routines, Prayers & College Admin Checklist
            </h3>
            <p className="text-xs text-text-muted font-sans mt-0.5">
              Maintain equilibrium between technical study blocks and physical/spiritual well-being.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1 font-mono text-xs">
            {(['ALL', 'PRAYER', 'COLLEGE', 'HOTSPOT', 'PERSONAL'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  activeCategory === cat
                    ? 'bg-surface-elevated text-text-primary border border-border-accent font-bold'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-2'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleAddTodoSubmit} className="flex flex-wrap gap-2 pt-2">
          <input
            type="text"
            placeholder="Add new routine checklist item..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="flex-1 min-w-[240px] bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-xs font-mono text-text-primary focus:outline-none"
          />
          <input
            type="text"
            placeholder="Time (e.g. 05:00 PM)"
            value={newTodoTime}
            onChange={(e) => setNewTodoTime(e.target.value)}
            className="w-36 bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-xs font-mono text-text-primary focus:outline-none"
          />
          <select
            value={newTodoCategory}
            onChange={(e) => setNewTodoCategory(e.target.value as PersonalTodoCategory)}
            className="bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-xs font-mono text-text-primary"
          >
            <option value="PRAYER">Prayer / Mindfulness</option>
            <option value="COLLEGE">College Submission</option>
            <option value="HOTSPOT">Hotspot Data</option>
            <option value="PERSONAL">Personal Wellness</option>
          </select>
          <button
            type="submit"
            className="flex items-center gap-1 px-4 py-1.5 bg-semantic-sky-bg text-semantic-sky-text border border-semantic-sky-border rounded text-xs font-mono hover:brightness-110"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </form>

        {/* Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                todo.isDone
                  ? 'bg-surface-2/40 border-border-subtle opacity-70'
                  : 'bg-surface-2 border-border-subtle hover:border-border-accent'
              }`}
            >
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <button
                  onClick={() => togglePersonalTodo(todo.id)}
                  className="mt-0.5 text-text-muted hover:text-semantic-emerald-text"
                >
                  {todo.isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-semantic-emerald-text" />
                  ) : (
                    <Circle className="w-4 h-4 text-border-accent" />
                  )}
                </button>

                <div className="space-y-1 min-w-0">
                  <div className={`text-xs font-medium ${todo.isDone ? 'line-through text-text-muted' : 'text-text-primary font-sans'}`}>
                    {todo.text}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className={`px-1.5 py-0.2 rounded border font-bold uppercase ${getCategoryBadge(todo.category)}`}>
                      {todo.category}
                    </span>
                    {todo.time && (
                      <span className="text-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {todo.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deletePersonalTodo(todo.id)}
                className="text-text-secondary hover:text-semantic-rose-text p-1"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
