'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator } from 'lucide-react';

export const HierarchicalClusterSolver: React.FC = () => {
  const [linkage, setLinkage] = useState<'single' | 'complete'>('single');

  // SPPU Standard 5-Document Distance Matrix
  const initialLabels = ['D1', 'D2', 'D3', 'D4', 'D5'];
  const [matrix] = useState<number[][]>([
    [0, 2, 6, 10, 9],
    [2, 0, 5, 9, 8],
    [6, 5, 0, 4, 5],
    [10, 9, 4, 0, 3],
    [9, 8, 5, 3, 0],
  ]);

  // Merge step simulation
  const findMinPair = (mat: number[][]) => {
    let minVal = Infinity;
    let minI = -1;
    let minJ = -1;
    for (let i = 0; i < mat.length; i++) {
      for (let j = i + 1; j < mat.length; j++) {
        if (mat[i][j] < minVal) {
          minVal = mat[i][j];
          minI = i;
          minJ = j;
        }
      }
    }
    return { minI, minJ, minVal };
  };

  const step1 = findMinPair(matrix);

  // Compute intermediate 4x4 matrix by merging minI and minJ
  const mergedName = `(${initialLabels[step1.minI]}, ${initialLabels[step1.minJ]})`;
  const remainingIndices = initialLabels
    .map((_, idx) => idx)
    .filter((idx) => idx !== step1.minI && idx !== step1.minJ);

  const newLabels4x4 = [mergedName, ...remainingIndices.map((idx) => initialLabels[idx])];
  const newMatrix4x4: number[][] = Array(newLabels4x4.length)
    .fill(0)
    .map(() => Array(newLabels4x4.length).fill(0));

  for (let r = 0; r < newLabels4x4.length; r++) {
    for (let c = 0; c < newLabels4x4.length; c++) {
      if (r === c) {
        newMatrix4x4[r][c] = 0;
      } else if (r === 0 || c === 0) {
        const otherIdx = r === 0 ? remainingIndices[c - 1] : remainingIndices[r - 1];
        const distA = matrix[step1.minI][otherIdx];
        const distB = matrix[step1.minJ][otherIdx];
        newMatrix4x4[r][c] = linkage === 'single' ? Math.min(distA, distB) : Math.max(distA, distB);
      } else {
        const origR = remainingIndices[r - 1];
        const origC = remainingIndices[c - 1];
        newMatrix4x4[r][c] = matrix[origR][origC];
      }
    }
  }

  const step2 = findMinPair(newMatrix4x4);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            Hierarchical Clustering Distance Matrix Reduction Solver
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Single-Linkage (MIN) and Complete-Linkage (MAX) step-by-step distance matrix solver.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLinkage('single')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              linkage === 'single'
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            Single-Link (MIN)
          </button>
          <button
            onClick={() => setLinkage('complete')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              linkage === 'complete'
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            Complete-Link (MAX)
          </button>
        </div>
      </div>

      {/* Initial 5x5 Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Initial Distance Matrix D0 (5x5)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-center">
              <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
                <tr>
                  <th className="p-2"></th>
                  {initialLabels.map((l) => (
                    <th key={l} className="p-2">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {matrix.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2 font-bold text-text-primary bg-surface-2/40">{initialLabels[rIdx]}</td>
                    {row.map((val, cIdx) => {
                      const isMinPair =
                        (rIdx === step1.minI && cIdx === step1.minJ) ||
                        (rIdx === step1.minJ && cIdx === step1.minI);
                      return (
                        <td
                          key={cIdx}
                          className={`p-2 ${
                            isMinPair
                              ? 'bg-semantic-emerald-bg text-semantic-emerald-text font-bold border border-semantic-emerald-border'
                              : 'text-text-muted'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-surface-2 rounded border border-border-subtle text-xs font-mono space-y-1">
            <div className="text-semantic-emerald-text font-bold">Step 1 Identified Minimum Distance:</div>
            <div>
              min D(x, y) = D({initialLabels[step1.minI]}, {initialLabels[step1.minJ]}) = {step1.minVal}
            </div>
            <div className="text-text-muted">
              Merge clusters &#123;{initialLabels[step1.minI]}, {initialLabels[step1.minJ]}&#125; at height h = {step1.minVal}.
            </div>
          </div>
        </div>

        {/* Reduced 4x4 Matrix */}
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">Reduced Matrix D1 after Step 1 Merge (4x4)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-center">
              <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
                <tr>
                  <th className="p-2"></th>
                  {newLabels4x4.map((l) => (
                    <th key={l} className="p-2">{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {newMatrix4x4.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2 font-bold text-text-primary bg-surface-2/40">{newLabels4x4[rIdx]}</td>
                    {row.map((val, cIdx) => {
                      const isNextMin =
                        (rIdx === step2.minI && cIdx === step2.minJ) ||
                        (rIdx === step2.minJ && cIdx === step2.minI);
                      return (
                        <td
                          key={cIdx}
                          className={`p-2 ${
                            isNextMin
                              ? 'bg-semantic-amber-bg text-semantic-amber-text font-bold border border-semantic-amber-border'
                              : 'text-text-muted'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-surface-2 rounded border border-border-subtle text-xs font-mono space-y-1">
            <div className="text-semantic-amber-text font-bold">Step 2 Next Merge:</div>
            <div>
              Next min D(x, y) = D({newLabels4x4[step2.minI]}, {newLabels4x4[step2.minJ]}) = {step2.minVal}
            </div>
            <div className="text-text-muted">
              Merge clusters &#123;{newLabels4x4[step2.minI]}, {newLabels4x4[step2.minJ]}&#125; at height h = {step2.minVal}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
