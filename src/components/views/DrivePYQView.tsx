'use client';

import React, { useState } from 'react';
import { DRIVE_PYQ_LINKS } from '@/data/drivePyqLinks';
import { SubjectCode } from '@/types';
import {
  FolderOpen,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  FileText,
  Search,
  Sparkles,
  Layers,
  GraduationCap,
  Calendar,
} from 'lucide-react';

export function DrivePYQView() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectCode | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const filteredLinks = DRIVE_PYQ_LINKS.filter((item) => {
    const matchSubj = selectedSubject === 'ALL' || item.subject === selectedSubject;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseCode.includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubj && matchSearch;
  });

  const handleCopyLink = (url: string, subj: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(subj);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  const getSubjectColor = (subj: SubjectCode) => {
    switch (subj) {
      case 'ML':
        return {
          bg: 'dark:bg-emerald-950/30 bg-emerald-50/70',
          border: 'dark:border-emerald-800/50 border-emerald-200',
          badge: 'dark:bg-emerald-950/60 dark:text-emerald-400 bg-emerald-100 text-emerald-800 border-emerald-300',
          btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        };
      case 'DMV':
        return {
          bg: 'dark:bg-sky-950/30 bg-sky-50/70',
          border: 'dark:border-sky-800/50 border-sky-200',
          badge: 'dark:bg-sky-950/60 dark:text-sky-400 bg-sky-100 text-sky-800 border-sky-300',
          btn: 'bg-sky-600 hover:bg-sky-700 text-white',
        };
      case 'BIF':
        return {
          bg: 'dark:bg-amber-950/30 bg-amber-50/70',
          border: 'dark:border-amber-800/50 border-amber-200',
          badge: 'dark:bg-amber-950/60 dark:text-amber-400 bg-amber-100 text-amber-800 border-amber-300',
          btn: 'bg-amber-600 hover:bg-amber-700 text-white',
        };
      case 'IR':
        return {
          bg: 'dark:bg-purple-950/30 bg-purple-50/70',
          border: 'dark:border-purple-800/50 border-purple-200',
          badge: 'dark:bg-purple-950/60 dark:text-purple-400 bg-purple-100 text-purple-800 border-purple-300',
          btn: 'bg-purple-600 hover:bg-purple-700 text-white',
        };
      default:
        return {
          bg: 'dark:bg-zinc-900 bg-white',
          border: 'dark:border-zinc-800 border-zinc-200',
          badge: 'dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border-zinc-300',
          btn: 'bg-zinc-900 hover:bg-zinc-800 text-white',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl border dark:bg-zinc-900/90 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl dark:bg-sky-950/50 bg-sky-100 border dark:border-sky-800/60 border-sky-300 flex items-center justify-center text-sky-500 shadow-sm">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold dark:text-zinc-50 text-zinc-900 tracking-tight">
                SPPU University PYQ Question Papers Vault
              </h1>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 border dark:border-zinc-700 border-zinc-300">
                Google Drive Cloud
              </span>
            </div>
            <p className="text-sm dark:text-zinc-400 text-zinc-600 mt-1">
              Direct access to all official Savitribai Phule Pune University past examination question papers and solution keys (2019 Pattern).
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search papers or course codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm dark:bg-zinc-800 bg-zinc-100 border dark:border-zinc-700 border-zinc-300 dark:text-zinc-100 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedSubject('ALL')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
            selectedSubject === 'ALL'
              ? 'dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-900 text-zinc-50 dark:border-zinc-100 border-zinc-900 shadow-sm'
              : 'dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200'
          }`}
        >
          All Subjects (4)
        </button>
        {DRIVE_PYQ_LINKS.map((item) => {
          const isSelected = selectedSubject === item.subject;
          return (
            <button
              key={item.subject}
              onClick={() => setSelectedSubject(isSelected ? 'ALL' : item.subject)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition flex items-center gap-2 ${
                isSelected
                  ? 'dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-900 text-zinc-50 dark:border-zinc-100 border-zinc-900 shadow-sm'
                  : 'dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 dark:text-zinc-400 text-zinc-600 hover:dark:text-zinc-200'
              }`}
            >
              <span>{item.subject}</span>
              <span className="text-xs opacity-75 font-mono">({item.courseCode})</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Subject Drive Folders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLinks.map((item) => {
          const colors = getSubjectColor(item.subject);

          return (
            <div
              key={item.subject}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${colors.bg} ${colors.border}`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono border ${colors.badge}`}>
                        Course {item.courseCode}
                      </span>
                      <span className="text-xs font-mono dark:text-zinc-400 text-zinc-500">
                        SPPU Final Year AI&DS
                      </span>
                    </div>

                    <h2 className="text-xl font-bold dark:text-zinc-50 text-zinc-900 mt-2">
                      {item.name} ({item.subject})
                    </h2>
                  </div>

                  <div className="w-10 h-10 rounded-xl dark:bg-zinc-800 bg-white border dark:border-zinc-700 border-zinc-300 flex items-center justify-center text-zinc-600 dark:text-zinc-300 shadow-sm shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm dark:text-zinc-300 text-zinc-700 mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Included Question Papers List */}
                <div className="mt-4 pt-4 border-t dark:border-zinc-800/80 border-zinc-200/80">
                  <div className="text-xs font-semibold uppercase tracking-wider dark:text-zinc-400 text-zinc-500 font-mono mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Available Question Papers & Solutions:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.paperYears.map((paper, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono dark:bg-zinc-900/80 bg-white/80 border dark:border-zinc-800 border-zinc-200 flex items-center gap-1.5 dark:text-zinc-300 text-zinc-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{paper}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t dark:border-zinc-800/80 border-zinc-200/80 flex items-center gap-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-sm ${colors.btn}`}
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Open Google Drive Folder</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  onClick={() => handleCopyLink(item.url, item.subject)}
                  title="Copy Google Drive URL"
                  className="p-2.5 rounded-xl border dark:border-zinc-700 border-zinc-300 dark:bg-zinc-800 bg-white dark:text-zinc-200 text-zinc-700 hover:opacity-80 transition shadow-sm"
                >
                  {copiedLink === item.subject ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Examination Scoring Strategy Note */}
      <div className="p-6 rounded-2xl border dark:bg-zinc-900 bg-white dark:border-zinc-800 border-zinc-200 shadow-sm space-y-2">
        <h3 className="text-base font-bold dark:text-zinc-100 text-zinc-900 flex items-center gap-2 font-mono">
          <GraduationCap className="w-5 h-5 text-emerald-500" />
          SPPU 2019 Pattern End-Sem Exam Writing Protocol (70 Marks)
        </h3>
        <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
          The SPPU End-Sem question paper is structured into 4 sections for Units 3, 4, 5, and 6 (each containing an internal choice: e.g., Q3 OR Q4 for 17/18 marks each). Always start with high-confidence mathematical derivations (e.g. AdaBoost weights, PageRank formula, TF-IDF cosine similarity, Single-Link clustering) accompanied by labeled neat diagrams before writing theoretical explanations.
        </p>
      </div>
    </div>
  );
}
