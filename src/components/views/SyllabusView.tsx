'use client';

import React, { useState } from 'react';
import { SYLLABUS_DATA } from '@/data/syllabusData';
import { SubjectCode } from '@/types';
import { KatexMath } from '@/components/common/KatexMath';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
  FileCheck,
} from 'lucide-react';

export const SyllabusView: React.FC = () => {
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<SubjectCode>('ML');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<3 | 4 | 5 | 6>(3);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>('ml-u3-q1');

  const currentSubject =
    SYLLABUS_DATA.find((s) => s.code === selectedSubjectCode) || SYLLABUS_DATA[0];

  const currentUnit =
    currentSubject.units.find((u) => u.unitNumber === selectedUnitNumber) ||
    currentSubject.units[0];

  return (
    <div className="space-y-6">
      {/* Subject Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SYLLABUS_DATA.map((subj) => {
          const isSelected = subj.code === selectedSubjectCode;
          return (
            <button
              key={subj.code}
              onClick={() => {
                setSelectedSubjectCode(subj.code);
                setSelectedUnitNumber(3);
                setExpandedQuestionId(null);
              }}
              className={`p-5 rounded-2xl border text-left transition-all shadow-sm ${
                isSelected
                  ? 'bg-surface-elevated border-semantic-sky-text ring-2 ring-semantic-sky-text shadow-md'
                  : 'bg-surface-1 border-border-subtle hover:border-border-accent hover:bg-surface-2'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-text-muted">
                  Course {subj.courseCode}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-surface-2 text-text-secondary border border-border-subtle">
                  {subj.credits} Credits
                </span>
              </div>
              <div className="text-lg font-bold text-text-primary mt-1.5 truncate tracking-tight">
                {subj.name}
              </div>
              <div className="text-xs text-text-secondary font-mono mt-1 font-medium">
                4 Units (Units 3, 4, 5, 6)
              </div>
            </button>
          );
        })}
      </div>

      {/* Subject Header & Units Switcher */}
      <div className="bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-text-muted font-medium">
              <span>SPPU BE AI&DS (2019 Pattern)</span>
              <span>•</span>
              <span>Course Code: {currentSubject.courseCode}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-mono mt-1 tracking-tight">
              {currentSubject.name} — Syllabus & Question Bank
            </h2>
            <p className="text-sm sm:text-base text-text-muted mt-2 font-sans max-w-4xl leading-relaxed">
              {currentSubject.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-sm font-mono text-text-secondary font-semibold">Select Unit:</span>
            <div className="flex items-center gap-1.5">
              {([3, 4, 5, 6] as const).map((uNum) => (
                <button
                  key={uNum}
                  onClick={() => {
                    setSelectedUnitNumber(uNum);
                    setExpandedQuestionId(null);
                  }}
                  className={`w-10 h-10 rounded-xl text-sm font-mono font-bold transition-all border shadow-sm ${
                    selectedUnitNumber === uNum
                      ? 'bg-semantic-sky-bg text-semantic-sky-text border-semantic-sky-border ring-2 ring-semantic-sky-text'
                      : 'bg-surface-2 text-text-muted border-border-subtle hover:text-text-primary hover:bg-surface-elevated'
                  }`}
                >
                  U{uNum}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Unit Info Card */}
        <div className="p-5 bg-surface-2/70 rounded-xl border border-border-subtle space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-semantic-sky-text" />
              <span className="text-base sm:text-lg font-bold text-text-primary font-mono">
                Unit {currentUnit.unitNumber}: {currentUnit.title}
              </span>
            </div>
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-semantic-amber-bg text-semantic-amber-text border border-semantic-amber-border shadow-sm">
              Exam Weightage: ~{currentUnit.weightageMarks} Marks
            </span>
          </div>
          <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
            {currentUnit.overview}
          </p>
        </div>
      </div>

      {/* Key Syllabus Topics & Core Derivations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Key Topics List */}
        <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2 font-mono">
            <BookOpen className="w-5 h-5 text-semantic-sky-text" />
            Official SPPU Syllabus Topics
          </h3>

          <div className="space-y-2.5">
            {currentUnit.keyTopics.map((topic, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-surface-2/70 rounded-xl border border-border-subtle/70 text-sm font-mono text-text-muted flex items-start gap-2.5"
              >
                <span className="text-semantic-sky-text font-bold mt-0.5">•</span>
                <span className="text-text-primary font-medium">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Core Mathematical Derivations & Formulas */}
        <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-text-primary flex items-center gap-2 font-mono">
            <Sparkles className="w-5 h-5 text-semantic-amber-text" />
            Essential Mathematical Derivations & Equations
          </h3>

          <div className="space-y-3.5">
            {currentUnit.coreDerivations.map((d, idx) => (
              <div
                key={idx}
                className="p-5 bg-canvas rounded-xl border border-border-accent/60 space-y-2.5 shadow-sm"
              >
                <div className="text-sm sm:text-base font-bold font-mono text-semantic-amber-text">
                  {d.title}
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                  {d.description}
                </p>
                <div className="py-2 overflow-x-auto">
                  <KatexMath math={d.latexEquation} block />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* University PYQ Model Answers Bank */}
      <div className="bg-surface-1 border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-text-primary font-mono flex items-center gap-2.5">
              <GraduationCap className="w-6 h-6 text-semantic-emerald-text" />
              SPPU Previous Year Questions & Master Model Solutions
            </h3>
            <p className="text-sm text-text-muted mt-1 font-sans">
              Authentic university question papers with step-by-step scoring templates.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {currentUnit.modelQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="border border-border-subtle rounded-2xl overflow-hidden transition-all bg-surface-2/40 hover:border-border-accent shadow-sm"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                      <span className="px-3 py-1 rounded-md font-bold bg-semantic-emerald-bg text-semantic-emerald-text border border-semantic-emerald-border">
                        {q.marks} Marks
                      </span>
                      <span className="px-3 py-1 rounded-md bg-surface-elevated text-text-primary border border-border-subtle font-semibold">
                        {q.year}
                      </span>
                      <span className="px-3 py-1 rounded-md bg-semantic-purple-bg text-semantic-purple-text border border-semantic-purple-border font-semibold">
                        Bloom: {q.bloomsLevel}
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-bold text-text-primary font-sans leading-snug">
                      {q.questionText}
                    </div>
                  </div>

                  <div className="text-text-muted p-1 rounded-lg">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-6 border-t border-border-subtle bg-surface-1 space-y-4 font-sans text-sm">
                    {/* Key Scoring Points */}
                    <div className="p-4 bg-surface-2 rounded-xl border border-border-subtle space-y-2 font-mono">
                      <div className="text-semantic-sky-text font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                        <FileCheck className="w-4 h-4" /> Key SPPU Examiner Marking Criteria:
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-text-muted text-xs sm:text-sm">
                        {q.keyPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Formatted Markdown Solution */}
                    <div className="space-y-3 prose prose-invert max-w-none text-text-primary font-sans leading-relaxed">
                      <div className="whitespace-pre-line text-xs sm:text-sm font-sans text-text-primary/95 leading-relaxed bg-canvas p-5 rounded-xl border border-border-accent/40 font-mono">
                        {q.modelAnswerMarkdown}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
