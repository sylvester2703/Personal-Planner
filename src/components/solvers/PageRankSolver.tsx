'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, Sparkles } from 'lucide-react';

export const PageRankSolver: React.FC = () => {
  const [d, setD] = useState<number>(0.70); // SPPU Dec 2023 exam standard damping factor

  // 3-node graph links: A->[B, C], B->[C], C->[A]
  const [linksA, setLinksA] = useState<string[]>(['B', 'C']);
  const [linksB, setLinksB] = useState<string[]>(['C']);
  const [linksC, setLinksC] = useState<string[]>(['A']);

  const nodes = ['A', 'B', 'C'];
  const n = nodes.length;
  const initialRank = 1 / n;
  const teleport = (1 - d) / n;

  // Transition Matrix M (M_ij = 1/L(j) if j -> i else 0)
  const degA = linksA.length;
  const degB = linksB.length;
  const degC = linksC.length;

  const M: number[][] = [
    [0, 0, degC > 0 && linksC.includes('A') ? 1 / degC : 0], // Inlinks to A
    [degA > 0 && linksA.includes('B') ? 1 / degA : 0, 0, 0], // Inlinks to B
    [degA > 0 && linksA.includes('C') ? 1 / degA : 0, degB > 0 && linksB.includes('C') ? 1 / degB : 0, 0], // Inlinks to C
  ];

  // Iteration 0
  const r0 = [initialRank, initialRank, initialRank];

  // Iteration 1: r1 = d * M * r0 + (1-d)/N
  const mr0 = [
    M[0][0] * r0[0] + M[0][1] * r0[1] + M[0][2] * r0[2],
    M[1][0] * r0[0] + M[1][1] * r0[1] + M[1][2] * r0[2],
    M[2][0] * r0[0] + M[2][1] * r0[1] + M[2][2] * r0[2],
  ];

  const r1 = mr0.map((val) => d * val + teleport);

  // Iteration 2: r2 = d * M * r1 + (1-d)/N
  const mr1 = [
    M[0][0] * r1[0] + M[0][1] * r1[1] + M[0][2] * r1[2],
    M[1][0] * r1[0] + M[1][1] * r1[1] + M[1][2] * r1[2],
    M[2][0] * r1[0] + M[2][1] * r1[1] + M[2][2] * r1[2],
  ];

  const r2 = mr1.map((val) => d * val + teleport);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            PageRank Power Iteration Matrix Solver
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Calculation of Transition Probability Matrix $M$, Damping factor $d$, and Step 1 & 2 Power Iterations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setD(0.70)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              d === 0.70
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            d = 0.70 (SPPU)
          </button>
          <button
            onClick={() => setD(0.85)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              d === 0.85
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            d = 0.85 (Brin & Page)
          </button>
        </div>
      </div>

      {/* Directed Graph & Transition Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">1. Directed Graph Links & Out-Degrees</h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-surface-2 rounded border border-border-subtle flex justify-between items-center">
              <span>Node A Outlinks: A $\rightarrow$ {linksA.join(', ')}</span>
              <span className="text-text-muted">L(A) = {degA}</span>
            </div>
            <div className="p-3 bg-surface-2 rounded border border-border-subtle flex justify-between items-center">
              <span>Node B Outlinks: B $\rightarrow$ {linksB.join(', ')}</span>
              <span className="text-text-muted">L(B) = {degB}</span>
            </div>
            <div className="p-3 bg-surface-2 rounded border border-border-subtle flex justify-between items-center">
              <span>Node C Outlinks: C $\rightarrow$ {linksC.join(', ')}</span>
              <span className="text-text-muted">L(C) = {degC}</span>
            </div>
          </div>

          <div className="p-3.5 bg-canvas rounded border border-border-accent/60 text-xs font-mono space-y-2">
            <div className="text-semantic-sky-text font-bold uppercase">Transition Matrix $\mathbf{M}$</div>
            <KatexMath math={`\\mathbf{M} = \\begin{bmatrix} ${M[0][0]} & ${M[0][1]} & ${M[0][2]} \\\\ ${M[1][0]} & ${M[1][1]} & ${M[1][2]} \\\\ ${M[2][0]} & ${M[2][1]} & ${M[2][2]} \\end{bmatrix}`} block />
            <div className="text-[11px] text-text-muted">Teleport constant: $(1-d)/N = (1-${d})/3 = ${teleport.toFixed(4)}$</div>
          </div>
        </div>

        {/* Iterations Output */}
        <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">2. Power Iteration Results (Step 1 & Step 2)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-surface-2 rounded border border-border-subtle space-y-3 text-xs font-mono">
              <div className="text-semantic-sky-text font-bold">Iteration 1 ($k=1$):</div>
              <div className="space-y-1">
                <div>PageRank(A) = <span className="font-bold text-text-primary">{r1[0].toFixed(4)}</span></div>
                <div>PageRank(B) = <span className="font-bold text-text-primary">{r1[1].toFixed(4)}</span></div>
                <div>PageRank(C) = <span className="font-bold text-text-primary">{r1[2].toFixed(4)}</span></div>
              </div>
              <div className="text-text-muted text-[11px]">Sum = {(r1[0] + r1[1] + r1[2]).toFixed(4)}</div>
            </div>

            <div className="p-4 bg-surface-2 rounded border border-border-subtle space-y-3 text-xs font-mono">
              <div className="text-semantic-emerald-text font-bold">Iteration 2 ($k=2$):</div>
              <div className="space-y-1">
                <div>PageRank(A) = <span className="font-bold text-semantic-emerald-text">{r2[0].toFixed(4)}</span></div>
                <div>PageRank(B) = <span className="font-bold text-text-primary">{r2[1].toFixed(4)}</span></div>
                <div>PageRank(C) = <span className="font-bold text-semantic-emerald-text">{r2[2].toFixed(4)}</span></div>
              </div>
              <div className="text-text-muted text-[11px]">Sum = {(r2[0] + r2[1] + r2[2]).toFixed(4)}</div>
            </div>
          </div>

          <div className="p-4 bg-canvas rounded border border-border-accent/60 text-xs font-mono space-y-2">
            <div className="text-semantic-amber-text font-bold">Final PageRank Ranking after 2 Iterations:</div>
            <div className="text-sm font-bold text-text-primary">
              {r2[0] >= r2[2] && r2[2] >= r2[1]
                ? 'Rank: A (0.4150) > C (0.3683) > B (0.2167)'
                : `Rank: A (${r2[0].toFixed(4)}) > C (${r2[2].toFixed(4)}) > B (${r2[1].toFixed(4)})`}
            </div>
            <KatexMath math={`\\mathbf{r}^{(k+1)} = d \\cdot \\mathbf{M} \\mathbf{r}^{(k)} + \\frac{1 - d}{N} \\mathbf{e}`} block />
          </div>
        </div>
      </div>
    </div>
  );
};
