'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, RotateCcw, Sparkles } from 'lucide-react';

export const ConfusionMatrixSolver: React.FC = () => {
  const [mode, setMode] = useState<'2x2' | '3x3'>('3x3');

  // 2x2 State
  const [tp, setTp] = useState<number>(85);
  const [fp, setFp] = useState<number>(15);
  const [fn, setFn] = useState<number>(10);
  const [tn, setTn] = useState<number>(90);

  // 3x3 State (SPPU May 2023 Exam Preset)
  const [matrix3x3, setMatrix3x3] = useState<number[][]>([
    [40, 5, 5],
    [3, 45, 2],
    [2, 8, 40],
  ]);

  const classNames = ['Class A', 'Class B', 'Class C'];

  const handlePresetSPPU = () => {
    setMode('3x3');
    setMatrix3x3([
      [40, 5, 5],
      [3, 45, 2],
      [2, 8, 40],
    ]);
  };

  // 2x2 Calculations
  const total2x2 = tp + fp + fn + tn;
  const accuracy2x2 = total2x2 > 0 ? (tp + tn) / total2x2 : 0;
  const precision2x2 = tp + fp > 0 ? tp / (tp + fp) : 0;
  const recall2x2 = tp + fn > 0 ? tp / (tp + fn) : 0;
  const specificity2x2 = tn + fp > 0 ? tn / (tn + fp) : 0;
  const f12x2 = precision2x2 + recall2x2 > 0 ? (2 * precision2x2 * recall2x2) / (precision2x2 + recall2x2) : 0;
  const fpr2x2 = 1 - specificity2x2;

  // 3x3 Calculations
  const total3x3 = matrix3x3.flat().reduce((acc, v) => acc + v, 0);
  const totalTp3x3 = matrix3x3[0][0] + matrix3x3[1][1] + matrix3x3[2][2];
  const overallAccuracy3x3 = total3x3 > 0 ? totalTp3x3 / total3x3 : 0;

  const classMetrics = [0, 1, 2].map((i) => {
    const classTp = matrix3x3[i][i];
    // Predicted is row i
    const predTotal = matrix3x3[i][0] + matrix3x3[i][1] + matrix3x3[i][2];
    // Actual is column i
    const actualTotal = matrix3x3[0][i] + matrix3x3[1][i] + matrix3x3[2][i];

    const prec = predTotal > 0 ? classTp / predTotal : 0;
    const rec = actualTotal > 0 ? classTp / actualTotal : 0;
    const f1 = prec + rec > 0 ? (2 * prec * rec) / (prec + rec) : 0;

    return {
      name: classNames[i],
      tp: classTp,
      predTotal,
      actualTotal,
      precision: prec,
      recall: rec,
      f1,
    };
  });

  const macroPrecision = classMetrics.reduce((acc, c) => acc + c.precision, 0) / 3;
  const macroRecall = classMetrics.reduce((acc, c) => acc + c.recall, 0) / 3;
  const macroF1 = classMetrics.reduce((acc, c) => acc + c.f1, 0) / 3;
  const microF1 = overallAccuracy3x3;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            Confusion Matrix & Multi-Class Metrics Solver
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Step-by-step derivation generator for SPPU Machine Learning classification numericals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('2x2')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              mode === '2x2'
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle hover:text-text-primary'
            }`}
          >
            2x2 Binary
          </button>
          <button
            onClick={() => setMode('3x3')}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              mode === '3x3'
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle hover:text-text-primary'
            }`}
          >
            3x3 Multi-Class
          </button>
          <button
            onClick={handlePresetSPPU}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-semantic-amber-bg text-semantic-amber-text border border-semantic-amber-border rounded-md hover:brightness-110 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load SPPU May 2023 PYQ
          </button>
        </div>
      </div>

      {mode === '2x2' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 2x2 Input Table */}
          <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-lg p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Input 2x2 Confusion Matrix</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <label className="text-xs text-text-muted block mb-1">True Positives (TP)</label>
                <input
                  type="number"
                  value={tp}
                  onChange={(e) => setTp(Number(e.target.value))}
                  className="w-full bg-surface-1 border border-border-accent rounded px-2.5 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
                />
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <label className="text-xs text-text-muted block mb-1">False Positives (FP)</label>
                <input
                  type="number"
                  value={fp}
                  onChange={(e) => setFp(Number(e.target.value))}
                  className="w-full bg-surface-1 border border-border-accent rounded px-2.5 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
                />
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <label className="text-xs text-text-muted block mb-1">False Negatives (FN)</label>
                <input
                  type="number"
                  value={fn}
                  onChange={(e) => setFn(Number(e.target.value))}
                  className="w-full bg-surface-1 border border-border-accent rounded px-2.5 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
                />
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <label className="text-xs text-text-muted block mb-1">True Negatives (TN)</label>
                <input
                  type="number"
                  value={tn}
                  onChange={(e) => setTn(Number(e.target.value))}
                  className="w-full bg-surface-1 border border-border-accent rounded px-2.5 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
                />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border-subtle flex justify-between text-xs text-text-muted font-mono">
              <span>Total Instances: {total2x2}</span>
              <span>Positives: {tp + fn} | Negatives: {tn + fp}</span>
            </div>
          </div>

          {/* 2x2 Derived Results */}
          <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-lg p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Computed Performance Metrics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <div className="text-xs text-text-secondary">Accuracy</div>
                <div className="text-lg font-mono font-semibold text-semantic-emerald-text">
                  {(accuracy2x2 * 100).toFixed(2)}%
                </div>
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <div className="text-xs text-text-secondary">Precision</div>
                <div className="text-lg font-mono font-semibold text-semantic-sky-text">
                  {(precision2x2 * 100).toFixed(2)}%
                </div>
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <div className="text-xs text-text-secondary">Recall (Sensitivity)</div>
                <div className="text-lg font-mono font-semibold text-semantic-sky-text">
                  {(recall2x2 * 100).toFixed(2)}%
                </div>
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <div className="text-xs text-text-secondary">Specificity</div>
                <div className="text-lg font-mono font-semibold text-text-primary">
                  {(specificity2x2 * 100).toFixed(2)}%
                </div>
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <div className="text-xs text-text-secondary">F1-Score</div>
                <div className="text-lg font-mono font-semibold text-semantic-amber-text">
                  {f12x2.toFixed(4)}
                </div>
              </div>
              <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                <div className="text-xs text-text-secondary">False Positive Rate</div>
                <div className="text-lg font-mono font-semibold text-semantic-rose-text">
                  {(fpr2x2 * 100).toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Step-by-Step LaTeX Derivation Box */}
            <div className="p-4 bg-canvas rounded border border-border-accent/60 space-y-3 font-mono text-xs">
              <div className="text-text-muted font-sans font-medium text-xs uppercase tracking-wider">
                Exam Derivation Format
              </div>
              <KatexMath math={`\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN} = \\frac{${tp} + ${tn}}{${total2x2}} = \\frac{${tp + tn}}{${total2x2}} = ${(accuracy2x2 * 100).toFixed(2)}\\%`} block />
              <KatexMath math={`\\text{Precision} = \\frac{TP}{TP + FP} = \\frac{${tp}}{${tp + fp}} = ${(precision2x2).toFixed(4)} \\; (${(precision2x2 * 100).toFixed(2)}\\%)`} block />
              <KatexMath math={`\\text{Recall} = \\frac{TP}{TP + FN} = \\frac{${tp}}{${tp + fn}} = ${(recall2x2).toFixed(4)} \\; (${(recall2x2 * 100).toFixed(2)}\\%)`} block />
              <KatexMath math={`F_1 = \\frac{2 \\cdot P \\cdot R}{P + R} = \\frac{2 \\cdot ${(precision2x2).toFixed(4)} \\cdot ${(recall2x2).toFixed(4)}}{${(precision2x2 + recall2x2).toFixed(4)}} = ${f12x2.toFixed(4)}`} block />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 3x3 Matrix Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-lg p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Input 3x3 Confusion Matrix</h3>
              <p className="text-xs text-text-muted mb-3">Rows = Predicted Classes | Columns = Actual Classes</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle text-text-secondary">
                      <th className="p-2 text-left">Pred \ Act</th>
                      <th className="p-2 text-center">Act A</th>
                      <th className="p-2 text-center">Act B</th>
                      <th className="p-2 text-center">Act C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrix3x3.map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-border-subtle/50">
                        <td className="p-2 text-text-muted font-medium">Pred {String.fromCharCode(65 + rIdx)}</td>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-1">
                            <input
                              type="number"
                              value={cell}
                              onChange={(e) => {
                                const newM = matrix3x3.map((r, ri) =>
                                  r.map((c, ci) => (ri === rIdx && ci === cIdx ? Number(e.target.value) : c))
                                );
                                setMatrix3x3(newM);
                              }}
                              className={`w-16 text-center py-1.5 rounded border font-mono text-xs focus:outline-none ${
                                rIdx === cIdx
                                  ? 'bg-semantic-emerald-bg text-semantic-emerald-text border-semantic-emerald-border font-bold'
                                  : 'bg-surface-2 text-text-primary border-border-subtle'
                              }`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 pt-3 border-t border-border-subtle flex justify-between text-xs text-text-muted font-mono">
                <span>Total Samples: {total3x3}</span>
                <span>Correct: {totalTp3x3}</span>
              </div>
            </div>

            {/* 3x3 Class-wise & Macro Summary */}
            <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4">
              <h3 className="text-sm font-semibold text-text-primary">Class-Wise & Macro Metrics</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                  <div className="text-xs text-text-secondary">Overall Accuracy</div>
                  <div className="text-lg font-mono font-semibold text-semantic-emerald-text">
                    {(overallAccuracy3x3 * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                  <div className="text-xs text-text-secondary">Macro Precision</div>
                  <div className="text-lg font-mono font-semibold text-semantic-sky-text">
                    {(macroPrecision * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                  <div className="text-xs text-text-secondary">Macro Recall</div>
                  <div className="text-lg font-mono font-semibold text-semantic-sky-text">
                    {(macroRecall * 100).toFixed(2)}%
                  </div>
                </div>
                <div className="p-3 bg-surface-2 rounded border border-border-subtle">
                  <div className="text-xs text-text-secondary">Macro F1-Score</div>
                  <div className="text-lg font-mono font-semibold text-semantic-amber-text">
                    {macroF1.toFixed(4)}
                  </div>
                </div>
              </div>

              {/* Class-by-Class Table */}
              <div className="overflow-x-auto border border-border-subtle rounded">
                <table className="w-full text-xs font-mono">
                  <thead className="bg-surface-2 text-text-secondary">
                    <tr>
                      <th className="p-2 text-left">Class</th>
                      <th className="p-2 text-center">TP</th>
                      <th className="p-2 text-center">Pred Total</th>
                      <th className="p-2 text-center">Actual Total</th>
                      <th className="p-2 text-center">Precision</th>
                      <th className="p-2 text-center">Recall</th>
                      <th className="p-2 text-center">F1-Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {classMetrics.map((cm, idx) => (
                      <tr key={idx}>
                        <td className="p-2 text-text-primary font-medium">{cm.name}</td>
                        <td className="p-2 text-center text-semantic-emerald-text">{cm.tp}</td>
                        <td className="p-2 text-center text-text-muted">{cm.predTotal}</td>
                        <td className="p-2 text-center text-text-muted">{cm.actualTotal}</td>
                        <td className="p-2 text-center text-semantic-sky-text">{(cm.precision * 100).toFixed(2)}%</td>
                        <td className="p-2 text-center text-semantic-sky-text">{(cm.recall * 100).toFixed(2)}%</td>
                        <td className="p-2 text-center text-semantic-amber-text">{cm.f1.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Master LaTeX Formula Derivation for 3x3 */}
          <div className="p-5 bg-surface-1 border border-border-subtle rounded-lg space-y-4">
            <h4 className="text-sm font-semibold text-text-primary">Step-by-Step SPPU Answer Sheet Derivations</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {classMetrics.map((cm, idx) => (
                <div key={idx} className="p-3.5 bg-canvas rounded border border-border-accent/50 text-xs font-mono space-y-2">
                  <div className="text-semantic-sky-text font-bold uppercase">{cm.name} Derivation</div>
                  <KatexMath math={`P_{${cm.name[6]}} = \\frac{TP}{TP + FP} = \\frac{${cm.tp}}{${cm.predTotal}} = ${(cm.precision).toFixed(4)}`} block />
                  <KatexMath math={`R_{${cm.name[6]}} = \\frac{TP}{TP + FN} = \\frac{${cm.tp}}{${cm.actualTotal}} = ${(cm.recall).toFixed(4)}`} block />
                  <KatexMath math={`F1_{${cm.name[6]}} = \\frac{2 \\cdot P \\cdot R}{P + R} = ${cm.f1.toFixed(4)}`} block />
                </div>
              ))}
            </div>

            <div className="p-4 bg-canvas rounded border border-border-accent/70 text-xs font-mono space-y-2">
              <div className="text-semantic-amber-text font-bold">Overall Accuracy & Macro F1 Formulation:</div>
              <KatexMath math={`\\text{Overall Accuracy} = \\frac{\\sum TP_i}{\\text{Total}} = \\frac{${classMetrics[0].tp} + ${classMetrics[1].tp} + ${classMetrics[2].tp}}{${total3x3}} = \\frac{${totalTp3x3}}{${total3x3}} = ${(overallAccuracy3x3 * 100).toFixed(2)}\\%`} block />
              <KatexMath math={`F1_{\\text{macro}} = \\frac{F1_A + F1_B + F1_C}{3} = \\frac{${classMetrics[0].f1.toFixed(4)} + ${classMetrics[1].f1.toFixed(4)} + ${classMetrics[2].f1.toFixed(4)}}{3} = \\mathbf{${macroF1.toFixed(4)}}`} block />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
