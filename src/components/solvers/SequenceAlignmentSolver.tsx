'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, Sparkles } from 'lucide-react';

export const SequenceAlignmentSolver: React.FC = () => {
  const [algo, setAlgo] = useState<'global' | 'local'>('global');
  const [seq1, setSeq1] = useState<string>('ACGT');
  const [seq2, setSeq2] = useState<string>('ACT');
  const [matchScore, setMatchScore] = useState<number>(1);
  const [mismatchPenalty, setMismatchPenalty] = useState<number>(-1);
  const [gapPenalty, setGapPenalty] = useState<number>(-2);

  const n = seq1.length;
  const m = seq2.length;

  // Initialize Matrix (n+1) x (m+1)
  const matrix: number[][] = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(0));

  const traceback: string[][] = Array(n + 1)
    .fill('')
    .map(() => Array(m + 1).fill(''));

  // Base Initialization
  if (algo === 'global') {
    for (let i = 0; i <= n; i++) matrix[i][0] = i * gapPenalty;
    for (let j = 0; j <= m; j++) matrix[0][j] = j * gapPenalty;
  }

  // Fill Dynamic Programming Matrix
  let maxLocalScore = -1;
  let maxLocalI = 0;
  let maxLocalJ = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = matrix[i - 1][j - 1] + (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchPenalty);
      const deleteGap = matrix[i - 1][j] + gapPenalty;
      const insertGap = matrix[i][j - 1] + gapPenalty;

      if (algo === 'global') {
        const val = Math.max(match, deleteGap, insertGap);
        matrix[i][j] = val;
        if (val === match) traceback[i][j] = 'diag';
        else if (val === deleteGap) traceback[i][j] = 'up';
        else traceback[i][j] = 'left';
      } else {
        // Smith-Waterman Local
        const val = Math.max(0, match, deleteGap, insertGap);
        matrix[i][j] = val;
        if (val >= maxLocalScore) {
          maxLocalScore = val;
          maxLocalI = i;
          maxLocalJ = j;
        }
      }
    }
  }

  // Traceback logic for global
  let aligned1 = '';
  let aligned2 = '';
  let curI = n;
  let curJ = m;

  while (curI > 0 || curJ > 0) {
    if (curI > 0 && curJ > 0 && (matrix[curI][curJ] === matrix[curI - 1][curJ - 1] + (seq1[curI - 1] === seq2[curJ - 1] ? matchScore : mismatchPenalty))) {
      aligned1 = seq1[curI - 1] + aligned1;
      aligned2 = seq2[curJ - 1] + aligned2;
      curI--;
      curJ--;
    } else if (curI > 0 && matrix[curI][curJ] === matrix[curI - 1][curJ] + gapPenalty) {
      aligned1 = seq1[curI - 1] + aligned1;
      aligned2 = '-' + aligned2;
      curI--;
    } else {
      aligned1 = '-' + aligned1;
      aligned2 = seq2[curJ - 1] + aligned2;
      curJ--;
    }
  }

  const finalScore = algo === 'global' ? matrix[n][m] : maxLocalScore;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            Bioinformatics Dynamic Programming Sequence Alignment Solver
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Needleman-Wunsch Global & Smith-Waterman Local Alignment scoring matrix and traceback path.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAlgo('global')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              algo === 'global'
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            Needleman-Wunsch (Global)
          </button>
          <button
            onClick={() => setAlgo('local')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              algo === 'local'
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            Smith-Waterman (Local)
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-surface-1 border border-border-subtle rounded-lg p-5">
        <div>
          <label className="text-xs text-text-muted block mb-1">Sequence 1 (Rows)</label>
          <input
            type="text"
            value={seq1}
            onChange={(e) => setSeq1(e.target.value.toUpperCase())}
            className="w-full bg-surface-2 border border-border-accent rounded px-2.5 py-1 text-xs font-mono text-text-primary"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Sequence 2 (Cols)</label>
          <input
            type="text"
            value={seq2}
            onChange={(e) => setSeq2(e.target.value.toUpperCase())}
            className="w-full bg-surface-2 border border-border-accent rounded px-2.5 py-1 text-xs font-mono text-text-primary"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Match Score</label>
          <input
            type="number"
            value={matchScore}
            onChange={(e) => setMatchScore(Number(e.target.value))}
            className="w-full bg-surface-2 border border-border-accent rounded px-2.5 py-1 text-xs font-mono text-text-primary"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Mismatch Penalty</label>
          <input
            type="number"
            value={mismatchPenalty}
            onChange={(e) => setMismatchPenalty(Number(e.target.value))}
            className="w-full bg-surface-2 border border-border-accent rounded px-2.5 py-1 text-xs font-mono text-text-primary"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Gap Penalty (d)</label>
          <input
            type="number"
            value={gapPenalty}
            onChange={(e) => setGapPenalty(Number(e.target.value))}
            className="w-full bg-surface-2 border border-border-accent rounded px-2.5 py-1 text-xs font-mono text-text-primary"
          />
        </div>
      </div>

      {/* Matrix Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-lg p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Dynamic Programming Score Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-center border-collapse">
              <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2">&epsilon;</th>
                  {seq2.split('').map((char, idx) => (
                    <th key={idx} className="p-2 text-semantic-sky-text">{char} ({idx + 1})</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {matrix.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2 font-bold text-semantic-amber-text bg-surface-2/40">
                      {rIdx === 0 ? 'ε' : `${seq1[rIdx - 1]} (${rIdx})`}
                    </td>
                    {row.map((cell, cIdx) => {
                      const isEnd = rIdx === n && cIdx === m;
                      return (
                        <td
                          key={cIdx}
                          className={`p-2 border border-border-subtle/50 ${
                            isEnd
                              ? 'bg-semantic-emerald-bg text-semantic-emerald-text font-bold border-semantic-emerald-border'
                              : 'text-text-muted'
                          }`}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traceback Alignment */}
        <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-semibold text-text-primary font-sans">Optimal Traceback Alignment</h3>

          <div className="p-4 bg-surface-2 rounded border border-border-subtle space-y-2">
            <div className="text-xs text-text-secondary">Optimal Alignment Score:</div>
            <div className="text-2xl font-bold text-semantic-emerald-text">{finalScore}</div>
          </div>

          <div className="p-4 bg-canvas rounded border border-border-accent/60 space-y-2">
            <div className="text-semantic-sky-text font-bold uppercase">Aligned String Output:</div>
            <div className="text-base tracking-widest text-text-primary font-bold">
              Seq 1: {aligned1.split('').join(' ')}
            </div>
            <div className="text-base tracking-widest text-text-primary font-bold">
              Seq 2: {aligned2.split('').join(' ')}
            </div>
          </div>

          <div className="p-3 bg-canvas rounded border border-border-accent/60 space-y-1 text-text-muted text-[11px]">
            <div>Recurrence Equation:</div>
            <KatexMath math={`M(i, j) = \\max \\{ M(i-1, j-1) + S, \\; M(i-1, j) - d, \\; M(i, j-1) - d \\}`} block />
          </div>
        </div>
      </div>
    </div>
  );
};
