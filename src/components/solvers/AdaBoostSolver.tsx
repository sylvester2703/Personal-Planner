'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, Sparkles } from 'lucide-react';

interface AdaSample {
  id: number;
  x: number;
  y: 1 | -1;
  h1: 1 | -1;
}

export const AdaBoostSolver: React.FC = () => {
  // SPPU Standard 5-Sample Exam Problem
  const [samples, setSamples] = useState<AdaSample[]>([
    { id: 1, x: 1.0, y: 1, h1: 1 },
    { id: 2, x: 2.0, y: 1, h1: 1 },
    { id: 3, x: 3.0, y: 1, h1: -1 }, // Misclassified
    { id: 4, x: 4.0, y: -1, h1: -1 },
    { id: 5, x: 5.0, y: -1, h1: 1 },  // Misclassified
  ]);

  const n = samples.length;
  const initialWeight = 1 / n;

  // Step 1: Compute weighted error epsilon_1
  const misclassifiedWeightsSum = samples
    .filter((s) => s.y !== s.h1)
    .reduce((acc) => acc + initialWeight, 0);

  const epsilon1 = Math.max(0.001, Math.min(0.999, misclassifiedWeightsSum));

  // Step 2: Classifier weight alpha_1
  const alpha1 = 0.5 * Math.log((1 - epsilon1) / epsilon1);

  // Step 3: Unnormalized weights
  const unnormalized = samples.map((s) => {
    const isCorrect = s.y === s.h1;
    const factor = isCorrect ? Math.exp(-alpha1) : Math.exp(alpha1);
    const unnormWeight = initialWeight * factor;
    return {
      ...s,
      isCorrect,
      factor,
      unnormWeight,
    };
  });

  // Step 4: Normalization factor Z_1
  const z1 = unnormalized.reduce((acc, s) => acc + s.unnormWeight, 0);

  // Step 5: Updated weights w_i^(2)
  const results = unnormalized.map((s) => ({
    ...s,
    w2: s.unnormWeight / z1,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            AdaBoost Sample & Classifier Weight Solver
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Step-by-step derivation of error rate, classifier weight, and normalized distribution.
          </p>
        </div>

        <button
          onClick={() => {
            setSamples([
              { id: 1, x: 1.0, y: 1, h1: 1 },
              { id: 2, x: 2.0, y: 1, h1: 1 },
              { id: 3, x: 3.0, y: 1, h1: -1 },
              { id: 4, x: 4.0, y: -1, h1: -1 },
              { id: 5, x: 5.0, y: -1, h1: 1 },
            ]);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-semantic-amber-bg text-semantic-amber-text border border-semantic-amber-border rounded-md hover:brightness-110"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Reset to SPPU 5-Sample Preset
        </button>
      </div>

      {/* Interactive Sample Table */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Training Dataset & Weak Classifier Predictions</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
              <tr>
                <th className="p-2 text-left">Sample (i)</th>
                <th className="p-2 text-center">Feature (x)</th>
                <th className="p-2 text-center">True Label (y)</th>
                <th className="p-2 text-center">Weak Classifier (h1)</th>
                <th className="p-2 text-center">Initial Weight w1</th>
                <th className="p-2 text-center">Classification</th>
                <th className="p-2 text-center">Multiplier Factor</th>
                <th className="p-2 text-center">New Weight w2</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {results.map((s) => (
                <tr key={s.id} className={!s.isCorrect ? 'bg-semantic-rose-bg/30' : ''}>
                  <td className="p-2 text-text-primary font-bold">x_{s.id}</td>
                  <td className="p-2 text-center text-text-muted">{s.x}</td>
                  <td className="p-2 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold ${s.y === 1 ? 'text-semantic-emerald-text' : 'text-semantic-rose-text'}`}>
                      {s.y > 0 ? '+1' : '-1'}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <select
                      value={s.h1}
                      onChange={(e) => {
                        const val = Number(e.target.value) as 1 | -1;
                        setSamples(samples.map((item) => (item.id === s.id ? { ...item, h1: val } : item)));
                      }}
                      className="bg-surface-2 border border-border-accent rounded px-2 py-1 text-xs font-mono text-text-primary"
                    >
                      <option value={1}>+1</option>
                      <option value={-1}>-1</option>
                    </select>
                  </td>
                  <td className="p-2 text-center text-text-muted">1/{n} = {initialWeight.toFixed(3)}</td>
                  <td className="p-2 text-center">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      s.isCorrect ? 'bg-semantic-emerald-bg text-semantic-emerald-text' : 'bg-semantic-rose-bg text-semantic-rose-text'
                    }`}>
                      {s.isCorrect ? 'Correct' : 'Misclassified'}
                    </span>
                  </td>
                  <td className="p-2 text-center text-text-muted">
                    {s.isCorrect ? `exp(-${alpha1.toFixed(3)}) = ${s.factor.toFixed(3)}` : `exp(+${alpha1.toFixed(3)}) = ${s.factor.toFixed(3)}`}
                  </td>
                  <td className="p-2 text-center font-bold text-semantic-amber-text">
                    {s.w2.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step Derivation Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-surface-1 border border-border-subtle rounded-lg text-xs font-mono space-y-2">
          <div className="text-semantic-rose-text font-bold uppercase">1. Weighted Error Rate:</div>
          <p className="text-text-muted">Sum of weights of all misclassified samples:</p>
          <KatexMath math={`\\epsilon_1 = \\sum_{i: y_i \\ne h(x_i)} w_i^{(1)} = ${misclassifiedWeightsSum.toFixed(4)}`} block />
        </div>

        <div className="p-4 bg-surface-1 border border-border-subtle rounded-lg text-xs font-mono space-y-2">
          <div className="text-semantic-sky-text font-bold uppercase">2. Classifier Importance:</div>
          <p className="text-text-muted">Classifier weight alpha formulation:</p>
          <KatexMath math={`\\alpha_1 = \\frac{1}{2} \\ln\\left(\\frac{1 - ${epsilon1.toFixed(3)}}{${epsilon1.toFixed(3)}}\\right) = \\mathbf{${alpha1.toFixed(4)}}`} block />
        </div>

        <div className="p-4 bg-surface-1 border border-border-subtle rounded-lg text-xs font-mono space-y-2">
          <div className="text-semantic-emerald-text font-bold uppercase">3. Normalization Factor:</div>
          <p className="text-text-muted">Sum of unnormalized weights:</p>
          <KatexMath math={`Z_1 = \\sum w_i^{(1)} e^{-\\alpha_1 y_i h_1(x_i)} = \\mathbf{${z1.toFixed(4)}}`} block />
        </div>
      </div>
    </div>
  );
};
