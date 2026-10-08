'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, Plus, Trash2, Sparkles } from 'lucide-react';

interface DataPoint {
  id: number;
  name: string;
  x1: number;
  x2: number;
  label: string;
}

export const KNNDistanceSolver: React.FC = () => {
  // SPPU Standard Exam Dataset Preset (e.g. Physics vs Chemistry Scores predicting Pass/Fail or Grade)
  const [points, setPoints] = useState<DataPoint[]>([
    { id: 1, name: 'P1', x1: 7, x2: 7, label: 'Bad' },
    { id: 2, name: 'P2', x1: 7, x2: 4, label: 'Bad' },
    { id: 3, name: 'P3', x1: 3, x2: 4, label: 'Good' },
    { id: 4, name: 'P4', x1: 1, x2: 4, label: 'Good' },
    { id: 5, name: 'P5', x1: 4, x2: 5, label: 'Bad' },
    { id: 6, name: 'P6', x1: 3, x2: 5, label: 'Good' },
  ]);

  const [queryX1, setQueryX1] = useState<number>(3);
  const [queryX2, setQueryX2] = useState<number>(7);
  const [kVal, setKVal] = useState<number>(3);
  const [metric, setMetric] = useState<'euclidean' | 'manhattan'>('euclidean');

  // Compute distances
  const calculated = points.map((p) => {
    const diffX1 = p.x1 - queryX1;
    const diffX2 = p.x2 - queryX2;
    const euclideanDist = Math.sqrt(diffX1 * diffX1 + diffX2 * diffX2);
    const manhattanDist = Math.abs(diffX1) + Math.abs(diffX2);
    const dist = metric === 'euclidean' ? euclideanDist : manhattanDist;

    return {
      ...p,
      diffX1,
      diffX2,
      euclideanDist,
      manhattanDist,
      dist,
      squaredSum: diffX1 * diffX1 + diffX2 * diffX2,
    };
  });

  // Sort by distance ascending
  const sorted = [...calculated].sort((a, b) => a.dist - b.dist);
  const kNearest = sorted.slice(0, Math.min(kVal, sorted.length));

  // Tally votes
  const votes: Record<string, number> = {};
  kNearest.forEach((p) => {
    votes[p.label] = (votes[p.label] || 0) + 1;
  });

  let predictedClass = 'N/A';
  let maxVotes = -1;
  Object.entries(votes).forEach(([lbl, count]) => {
    if (count > maxVotes) {
      maxVotes = count;
      predictedClass = lbl;
    }
  });

  const handleAddPoint = () => {
    const newId = points.length > 0 ? Math.max(...points.map((p) => p.id)) + 1 : 1;
    setPoints([
      ...points,
      { id: newId, name: `P${newId}`, x1: 5, x2: 5, label: 'Good' },
    ]);
  };

  const handleDeletePoint = (id: number) => {
    if (points.length <= 2) return;
    setPoints(points.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            K-Nearest Neighbors (KNN) Manual Distance Trace
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Step-by-step Euclidean / Manhattan distance matrix, sorting, and voting classifier for SPPU exams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setPoints([
                { id: 1, name: 'P1', x1: 7, x2: 7, label: 'Bad' },
                { id: 2, name: 'P2', x1: 7, x2: 4, label: 'Bad' },
                { id: 3, name: 'P3', x1: 3, x2: 4, label: 'Good' },
                { id: 4, name: 'P4', x1: 1, x2: 4, label: 'Good' },
                { id: 5, name: 'P5', x1: 4, x2: 5, label: 'Bad' },
                { id: 6, name: 'P6', x1: 3, x2: 5, label: 'Good' },
              ]);
              setQueryX1(3);
              setQueryX2(7);
              setKVal(3);
              setMetric('euclidean');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-semantic-amber-bg text-semantic-amber-text border border-semantic-amber-border rounded-md hover:brightness-110 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load SPPU Standard KNN Preset
          </button>
        </div>
      </div>

      {/* Query Point & Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-surface-1 border border-border-subtle rounded-lg p-5">
        <div>
          <label className="text-xs text-text-muted block mb-1">Query Point X1 (Feature 1)</label>
          <input
            type="number"
            value={queryX1}
            onChange={(e) => setQueryX1(Number(e.target.value))}
            className="w-full bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Query Point X2 (Feature 2)</label>
          <input
            type="number"
            value={queryX2}
            onChange={(e) => setQueryX2(Number(e.target.value))}
            className="w-full bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">K Value (Neighbors)</label>
          <input
            type="number"
            min={1}
            max={points.length}
            value={kVal}
            onChange={(e) => setKVal(Math.max(1, Number(e.target.value)))}
            className="w-full bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Distance Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as any)}
            className="w-full bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-semantic-sky-text"
          >
            <option value="euclidean">Euclidean (L2 Norm)</option>
            <option value="manhattan">Manhattan (L1 Norm)</option>
          </select>
        </div>
      </div>

      {/* Dataset & Distance Computation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-text-primary">Training Dataset & Distance Matrix</h3>
            <button
              onClick={handleAddPoint}
              className="flex items-center gap-1 text-xs font-mono text-semantic-sky-text hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Point
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
                <tr>
                  <th className="p-2 text-left">Point</th>
                  <th className="p-2 text-center">X1</th>
                  <th className="p-2 text-center">X2</th>
                  <th className="p-2 text-center">Class</th>
                  <th className="p-2 text-center">Calculation Details</th>
                  <th className="p-2 text-center">Distance</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {calculated.map((p) => {
                  const isTopK = kNearest.some((k) => k.id === p.id);
                  return (
                    <tr
                      key={p.id}
                      className={isTopK ? 'bg-semantic-sky-bg/40 font-medium' : 'hover:bg-surface-2/50'}
                    >
                      <td className="p-2 text-text-primary">{p.name}</td>
                      <td className="p-1 text-center">
                        <input
                          type="number"
                          value={p.x1}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPoints(points.map((pt) => (pt.id === p.id ? { ...pt, x1: val } : pt)));
                          }}
                          className="w-12 text-center py-1 bg-surface-2 border border-border-subtle rounded text-xs font-mono"
                        />
                      </td>
                      <td className="p-1 text-center">
                        <input
                          type="number"
                          value={p.x2}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPoints(points.map((pt) => (pt.id === p.id ? { ...pt, x2: val } : pt)));
                          }}
                          className="w-12 text-center py-1 bg-surface-2 border border-border-subtle rounded text-xs font-mono"
                        />
                      </td>
                      <td className="p-1 text-center">
                        <input
                          type="text"
                          value={p.label}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPoints(points.map((pt) => (pt.id === p.id ? { ...pt, label: val } : pt)));
                          }}
                          className="w-16 text-center py-1 bg-surface-2 border border-border-subtle rounded text-xs font-mono"
                        />
                      </td>
                      <td className="p-2 text-center text-text-muted">
                        {metric === 'euclidean'
                          ? `√[(${p.x1}-${queryX1})² + (${p.x2}-${queryX2})²] = √${p.squaredSum}`
                          : `|${p.x1}-${queryX1}| + |${p.x2}-${queryX2}|`}
                      </td>
                      <td className="p-2 text-center font-bold text-text-primary">
                        {p.dist.toFixed(3)}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleDeletePoint(p.id)}
                          className="text-text-secondary hover:text-semantic-rose-text"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prediction Results & Voting */}
        <div className="lg:col-span-5 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">Ranked Nearest Neighbors & Majority Vote</h3>

          <div className="p-4 bg-surface-2 rounded border border-border-subtle space-y-3">
            <div className="text-xs text-text-secondary">Predicted Class for ({queryX1}, {queryX2}) at K={kVal}:</div>
            <div className="text-2xl font-mono font-bold text-semantic-emerald-text">
              {predictedClass}
            </div>

            <div className="text-xs text-text-muted border-t border-border-subtle pt-2 space-y-1 font-mono">
              {Object.entries(votes).map(([lbl, count]) => (
                <div key={lbl} className="flex justify-between">
                  <span>Votes for &apos;{lbl}&apos;:</span>
                  <span className="font-bold text-text-primary">{count} / {kNearest.length}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-canvas rounded border border-border-accent/60 space-y-2 text-xs font-mono">
            <div className="text-semantic-sky-text font-bold uppercase tracking-wider">
              Top {kVal} Nearest Neighbors
            </div>
            {kNearest.map((p, idx) => (
              <div key={p.id} className="flex justify-between items-center py-1 border-b border-border-subtle/40">
                <span>
                  Rank {idx + 1}: <strong className="text-text-primary">{p.name}</strong> ({p.x1}, {p.x2})
                </span>
                <span className="text-text-muted">
                  Dist: <span className="text-semantic-amber-text">{p.dist.toFixed(3)}</span> | Class: <span className="text-semantic-emerald-text">{p.label}</span>
                </span>
              </div>
            ))}
          </div>

          {/* KaTeX formula box */}
          <div className="p-4 bg-canvas rounded border border-border-accent/60 text-xs font-mono space-y-2">
            <div className="text-text-muted font-bold">Euclidean Distance Formula:</div>
            <KatexMath math={`d(\\mathbf{p}, \\mathbf{q}) = \\sqrt{(x_{p1} - x_{q1})^2 + (x_{p2} - x_{q2})^2}`} block />
          </div>
        </div>
      </div>
    </div>
  );
};
