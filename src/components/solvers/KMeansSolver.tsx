'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, RefreshCw } from 'lucide-react';

interface ClusterPoint {
  id: string;
  x: number;
  y: number;
}

export const KMeansSolver: React.FC = () => {
  // SPPU Standard 2D Clustering Numerical Dataset
  const [points, setPoints] = useState<ClusterPoint[]>([
    { id: 'A1', x: 2, y: 10 },
    { id: 'A2', x: 2, y: 5 },
    { id: 'A3', x: 8, y: 4 },
    { id: 'A4', x: 5, y: 8 },
    { id: 'A5', x: 7, y: 5 },
    { id: 'A6', x: 6, y: 4 },
    { id: 'A7', x: 1, y: 2 },
    { id: 'A8', x: 4, y: 9 },
  ]);

  const [c1, setC1] = useState<{ x: number; y: number }>({ x: 2, y: 10 }); // Point A1
  const [c2, setC2] = useState<{ x: number; y: number }>({ x: 5, y: 8 });  // Point A4
  const [c3, setC3] = useState<{ x: number; y: number }>({ x: 1, y: 2 });  // Point A7
  const [k, setK] = useState<2 | 3>(2);

  // Iteration 1 Calculations: Compute distance of each point to all centroids
  const assignments = points.map((p) => {
    const d1 = Math.sqrt((p.x - c1.x) ** 2 + (p.y - c1.y) ** 2);
    const d2 = Math.sqrt((p.x - c2.x) ** 2 + (p.y - c2.y) ** 2);
    const d3 = Math.sqrt((p.x - c3.x) ** 2 + (p.y - c3.y) ** 2);

    let assignedCluster = 1;
    let minDist = d1;

    if (d2 < minDist) {
      minDist = d2;
      assignedCluster = 2;
    }
    if (k === 3 && d3 < minDist) {
      minDist = d3;
      assignedCluster = 3;
    }

    return {
      ...p,
      d1,
      d2,
      d3,
      assignedCluster,
      minDist,
    };
  });

  // Calculate new centroids
  const cluster1Points = assignments.filter((p) => p.assignedCluster === 1);
  const cluster2Points = assignments.filter((p) => p.assignedCluster === 2);
  const cluster3Points = assignments.filter((p) => p.assignedCluster === 3);

  const newC1 = {
    x: cluster1Points.length > 0 ? cluster1Points.reduce((s, p) => s + p.x, 0) / cluster1Points.length : c1.x,
    y: cluster1Points.length > 0 ? cluster1Points.reduce((s, p) => s + p.y, 0) / cluster1Points.length : c1.y,
  };

  const newC2 = {
    x: cluster2Points.length > 0 ? cluster2Points.reduce((s, p) => s + p.x, 0) / cluster2Points.length : c2.x,
    y: cluster2Points.length > 0 ? cluster2Points.reduce((s, p) => s + p.y, 0) / cluster2Points.length : c2.y,
  };

  const newC3 = {
    x: cluster3Points.length > 0 ? cluster3Points.reduce((s, p) => s + p.x, 0) / cluster3Points.length : c3.x,
    y: cluster3Points.length > 0 ? cluster3Points.reduce((s, p) => s + p.y, 0) / cluster3Points.length : c3.y,
  };

  // Inertia (WCSS)
  const inertia = assignments.reduce((acc, p) => acc + p.minDist ** 2, 0);

  const applyNextIteration = () => {
    setC1(newC1);
    setC2(newC2);
    if (k === 3) setC3(newC3);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            K-Means Centroid Update & Distance Solver
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Step-by-step distance calculation, cluster assignment, and centroid mean recalculation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setK(2)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              k === 2
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            K = 2 Clusters
          </button>
          <button
            onClick={() => setK(3)}
            className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors ${
              k === 3
                ? 'bg-surface-elevated text-text-primary border-border-accent'
                : 'bg-surface-1 text-text-muted border-border-subtle'
            }`}
          >
            K = 3 Clusters
          </button>
          <button
            onClick={applyNextIteration}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-semantic-sky-bg text-semantic-sky-text border border-semantic-sky-border rounded-md hover:brightness-110"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Apply Next Iteration Centroids
          </button>
        </div>
      </div>

      {/* Centroid Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface-1 border border-border-subtle rounded-lg p-5">
        <div className="p-3 bg-surface-2 rounded border border-border-subtle">
          <div className="text-xs text-semantic-sky-text font-bold mb-2">Initial Centroid C1 (Cluster 1)</div>
          <div className="flex gap-2">
            <div>
              <span className="text-xs text-text-muted">X:</span>
              <input
                type="number"
                value={c1.x}
                onChange={(e) => setC1({ ...c1, x: Number(e.target.value) })}
                className="w-16 ml-1 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary"
              />
            </div>
            <div>
              <span className="text-xs text-text-muted">Y:</span>
              <input
                type="number"
                value={c1.y}
                onChange={(e) => setC1({ ...c1, y: Number(e.target.value) })}
                className="w-16 ml-1 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary"
              />
            </div>
          </div>
        </div>

        <div className="p-3 bg-surface-2 rounded border border-border-subtle">
          <div className="text-xs text-semantic-amber-text font-bold mb-2">Initial Centroid C2 (Cluster 2)</div>
          <div className="flex gap-2">
            <div>
              <span className="text-xs text-text-muted">X:</span>
              <input
                type="number"
                value={c2.x}
                onChange={(e) => setC2({ ...c2, x: Number(e.target.value) })}
                className="w-16 ml-1 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary"
              />
            </div>
            <div>
              <span className="text-xs text-text-muted">Y:</span>
              <input
                type="number"
                value={c2.y}
                onChange={(e) => setC2({ ...c2, y: Number(e.target.value) })}
                className="w-16 ml-1 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary"
              />
            </div>
          </div>
        </div>

        {k === 3 && (
          <div className="p-3 bg-surface-2 rounded border border-border-subtle">
            <div className="text-xs text-semantic-purple-text font-bold mb-2">Initial Centroid C3 (Cluster 3)</div>
            <div className="flex gap-2">
              <div>
                <span className="text-xs text-text-muted">X:</span>
                <input
                  type="number"
                  value={c3.x}
                  onChange={(e) => setC3({ ...c3, x: Number(e.target.value) })}
                  className="w-16 ml-1 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary"
                />
              </div>
              <div>
                <span className="text-xs text-text-muted">Y:</span>
                <input
                  type="number"
                  value={c3.y}
                  onChange={(e) => setC3({ ...c3, y: Number(e.target.value) })}
                  className="w-16 ml-1 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step 1: Distance Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-1 border border-border-subtle rounded-lg p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Iteration 1: Distance & Cluster Assignment</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
                <tr>
                  <th className="p-2 text-left">Point</th>
                  <th className="p-2 text-center">Coord (X, Y)</th>
                  <th className="p-2 text-center">Dist to C1 ({c1.x}, {c1.y})</th>
                  <th className="p-2 text-center">Dist to C2 ({c2.x}, {c2.y})</th>
                  {k === 3 && <th className="p-2 text-center">Dist to C3 ({c3.x}, {c3.y})</th>}
                  <th className="p-2 text-center">Assigned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {assignments.map((p) => (
                  <tr key={p.id}>
                    <td className="p-2 text-text-primary font-bold">{p.id}</td>
                    <td className="p-2 text-center text-text-muted">({p.x}, {p.y})</td>
                    <td className={`p-2 text-center ${p.assignedCluster === 1 ? 'font-bold text-semantic-sky-text' : 'text-text-muted'}`}>
                      {p.d1.toFixed(3)}
                    </td>
                    <td className={`p-2 text-center ${p.assignedCluster === 2 ? 'font-bold text-semantic-amber-text' : 'text-text-muted'}`}>
                      {p.d2.toFixed(3)}
                    </td>
                    {k === 3 && (
                      <td className={`p-2 text-center ${p.assignedCluster === 3 ? 'font-bold text-semantic-purple-text' : 'text-text-muted'}`}>
                        {p.d3.toFixed(3)}
                      </td>
                    )}
                    <td className="p-2 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        p.assignedCluster === 1
                          ? 'bg-semantic-sky-bg text-semantic-sky-text'
                          : p.assignedCluster === 2
                          ? 'bg-semantic-amber-bg text-semantic-amber-text'
                          : 'bg-semantic-purple-bg text-semantic-purple-text'
                      }`}>
                        Cluster {p.assignedCluster}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Step 2: New Updated Centroids */}
        <div className="lg:col-span-4 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">Step 2: Recalculated Centroid Means</h3>

          <div className="p-3.5 bg-surface-2 rounded border border-border-subtle space-y-2 text-xs font-mono">
            <div className="text-semantic-sky-text font-bold">New Centroid Mean 1:</div>
            <div className="text-text-muted">
              Points in C1: {cluster1Points.map((p) => p.id).join(', ') || 'None'} ({cluster1Points.length} points)
            </div>
            <div className="text-sm font-bold text-text-primary">
              m1 = ({newC1.x.toFixed(2)}, {newC1.y.toFixed(2)})
            </div>
          </div>

          <div className="p-3.5 bg-surface-2 rounded border border-border-subtle space-y-2 text-xs font-mono">
            <div className="text-semantic-amber-text font-bold">New Centroid Mean 2:</div>
            <div className="text-text-muted">
              Points in C2: {cluster2Points.map((p) => p.id).join(', ') || 'None'} ({cluster2Points.length} points)
            </div>
            <div className="text-sm font-bold text-text-primary">
              m2 = ({newC2.x.toFixed(2)}, {newC2.y.toFixed(2)})
            </div>
          </div>

          {k === 3 && (
            <div className="p-3.5 bg-surface-2 rounded border border-border-subtle space-y-2 text-xs font-mono">
              <div className="text-semantic-purple-text font-bold">New Centroid Mean 3:</div>
              <div className="text-text-muted">
                Points in C3: {cluster3Points.map((p) => p.id).join(', ') || 'None'} ({cluster3Points.length} points)
              </div>
              <div className="text-sm font-bold text-text-primary">
                m3 = ({newC3.x.toFixed(2)}, {newC3.y.toFixed(2)})
              </div>
            </div>
          )}

          <div className="p-3 bg-canvas rounded border border-border-accent/60 text-xs font-mono">
            <div className="text-text-secondary">Current Inertia (WCSS):</div>
            <div className="text-lg font-bold text-semantic-emerald-text">{inertia.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
