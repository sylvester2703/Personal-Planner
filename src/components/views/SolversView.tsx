'use client';

import React, { useState } from 'react';
import { ConfusionMatrixSolver } from '@/components/solvers/ConfusionMatrixSolver';
import { KNNDistanceSolver } from '@/components/solvers/KNNDistanceSolver';
import { KMeansSolver } from '@/components/solvers/KMeansSolver';
import { AdaBoostSolver } from '@/components/solvers/AdaBoostSolver';
import { TFIDFSolver } from '@/components/solvers/TFIDFSolver';
import { HierarchicalClusterSolver } from '@/components/solvers/HierarchicalClusterSolver';
import { PageRankSolver } from '@/components/solvers/PageRankSolver';
import { SequenceAlignmentSolver } from '@/components/solvers/SequenceAlignmentSolver';
import { RamachandranInspector } from '@/components/solvers/RamachandranInspector';
import { IREvaluationSolver } from '@/components/solvers/IREvaluationSolver';
import { Calculator, Cpu, Compass, BookOpen, Layers } from 'lucide-react';

type SolverId =
  | 'confusion'
  | 'knn'
  | 'kmeans'
  | 'adaboost'
  | 'tfidf'
  | 'hierarchical'
  | 'pagerank'
  | 'alignment'
  | 'ramachandran'
  | 'ireval';

interface SolverMeta {
  id: SolverId;
  name: string;
  subject: string;
  unit: string;
  description: string;
}

export const SolversView: React.FC = () => {
  const [activeSolver, setActiveSolver] = useState<SolverId>('confusion');

  const solversList: SolverMeta[] = [
    {
      id: 'confusion',
      name: 'Confusion Matrix & Metrics',
      subject: 'ML',
      unit: 'Unit 3',
      description: '2x2 & 3x3 Precision, Recall, Accuracy, Specificity, F1 & Macro-F1',
    },
    {
      id: 'knn',
      name: 'KNN Distance & Voting',
      subject: 'ML',
      unit: 'Unit 3',
      description: 'Step-by-step Euclidean / Manhattan distance trace & class voting',
    },
    {
      id: 'kmeans',
      name: 'K-Means Centroid Updates',
      subject: 'ML',
      unit: 'Unit 4',
      description: '2D distance matrices, cluster assignment, and centroid mean recalculation',
    },
    {
      id: 'adaboost',
      name: 'AdaBoost Weights & Alphas',
      subject: 'ML',
      unit: 'Unit 5',
      description: 'Weighted error, classifier weight alpha_t, and normalized distribution w_i',
    },
    {
      id: 'tfidf',
      name: 'TF-IDF & Cosine Similarity',
      subject: 'IR',
      unit: 'Unit 3',
      description: 'Term frequency, IDF log10(N/DF), document vectors, and cosine angles',
    },
    {
      id: 'hierarchical',
      name: 'Hierarchical Matrix Reduction',
      subject: 'IR',
      unit: 'Unit 4',
      description: 'Single-Link & Complete-Link iterative matrix reduction and merge tree',
    },
    {
      id: 'pagerank',
      name: 'PageRank Power Iteration',
      subject: 'IR',
      unit: 'Unit 5',
      description: 'Transition matrix M, damping factor d=0.70, and Step 1 & 2 Power Iterations',
    },
    {
      id: 'ireval',
      name: 'IR Evaluation: NDCG & MAP',
      subject: 'IR',
      unit: 'Unit 6',
      description: 'Precision@K, Average Precision (AP), MRR, DCG@K, IDCG@K, and NDCG@K',
    },
    {
      id: 'alignment',
      name: 'Needleman-Wunsch Alignment',
      subject: 'BIF',
      unit: 'Unit 6',
      description: 'Dynamic programming scoring grid, match/mismatch penalties, and traceback',
    },
    {
      id: 'ramachandran',
      name: 'Ramachandran Plot Inspector',
      subject: 'BIF',
      unit: 'Unit 3',
      description: 'Torsion angles (Phi, Psi) validation, alpha-helix & beta-sheet zones',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span>Mathematical Engine</span>
              <span>•</span>
              <span>SPPU BE AI&DS Numerical Suite</span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary font-mono mt-1 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-semantic-emerald-text" />
              10 Interactive SPPU Exam Solvers
            </h1>
            <p className="text-xs text-text-muted mt-1 font-sans max-w-3xl">
              Zero mock calculations. High-precision numerical engines with step-by-step LaTeX formula derivations tailored for university question patterns.
            </p>
          </div>
        </div>

        {/* Solver Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-4 border-t border-border-subtle">
          {solversList.map((s) => {
            const isSelected = activeSolver === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSolver(s.id)}
                className={`p-2.5 rounded-md border text-left transition-all font-mono ${
                  isSelected
                    ? 'bg-surface-elevated border-semantic-sky-text shadow-sm ring-1 ring-semantic-sky-text'
                    : 'bg-surface-2/60 border-border-subtle hover:border-border-accent hover:bg-surface-2'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-semantic-sky-text">{s.subject} {s.unit}</span>
                </div>
                <div className="text-xs font-bold text-text-primary mt-0.5 truncate">
                  {s.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Solver Render */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-6">
        {activeSolver === 'confusion' && <ConfusionMatrixSolver />}
        {activeSolver === 'knn' && <KNNDistanceSolver />}
        {activeSolver === 'kmeans' && <KMeansSolver />}
        {activeSolver === 'adaboost' && <AdaBoostSolver />}
        {activeSolver === 'tfidf' && <TFIDFSolver />}
        {activeSolver === 'hierarchical' && <HierarchicalClusterSolver />}
        {activeSolver === 'pagerank' && <PageRankSolver />}
        {activeSolver === 'ireval' && <IREvaluationSolver />}
        {activeSolver === 'alignment' && <SequenceAlignmentSolver />}
        {activeSolver === 'ramachandran' && <RamachandranInspector />}
      </div>
    </div>
  );
};
