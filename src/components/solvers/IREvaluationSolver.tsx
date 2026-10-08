'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, Sparkles } from 'lucide-react';

export const IREvaluationSolver: React.FC = () => {
  // SPPU May 2024 Exam Problem: Relevance grades [3, 2, 0, 1, 2] for 5 ranked items
  const [relevanceScores, setRelevanceScores] = useState<number[]>([3, 2, 0, 1, 2]);
  const [totalRelevantInCorpus, setTotalRelevantInCorpus] = useState<number>(4);

  const k = relevanceScores.length;

  // DCG Calculation: (2^rel - 1) / log2(i + 1)
  const dcgTable = relevanceScores.map((rel, idx) => {
    const rank = idx + 1;
    const gain = Math.pow(2, rel) - 1;
    const discount = Math.log2(rank + 1);
    const discountedGain = discount > 0 ? gain / discount : 0;
    const isBinaryRelevant = rel > 0;

    return {
      rank,
      rel,
      gain,
      discount,
      discountedGain,
      isBinaryRelevant,
    };
  });

  const dcg = dcgTable.reduce((acc, row) => acc + row.discountedGain, 0);

  // Ideal DCG (sort relevance scores descending)
  const idealRelevance = [...relevanceScores].sort((a, b) => b - a);
  const idcgTable = idealRelevance.map((rel, idx) => {
    const rank = idx + 1;
    const gain = Math.pow(2, rel) - 1;
    const discount = Math.log2(rank + 1);
    return gain / discount;
  });

  const idcg = idcgTable.reduce((acc, v) => acc + v, 0);
  const ndcg = idcg > 0 ? dcg / idcg : 0;

  // Precision@K and Recall@K at each rank
  let cumulativeRelevant = 0;
  let runningPrecisionSum = 0;
  const precisionRecallTable = dcgTable.map((row) => {
    if (row.isBinaryRelevant) {
      cumulativeRelevant++;
    }
    const precAtK = cumulativeRelevant / row.rank;
    const recAtK = totalRelevantInCorpus > 0 ? cumulativeRelevant / totalRelevantInCorpus : 0;
    if (row.isBinaryRelevant) {
      runningPrecisionSum += precAtK;
    }
    return {
      ...row,
      cumulativeRelevant,
      precAtK,
      recAtK,
    };
  });

  // Average Precision (AP)
  const averagePrecision = cumulativeRelevant > 0 ? runningPrecisionSum / cumulativeRelevant : 0;

  // Reciprocal Rank (RR): 1 / first relevant rank
  const firstRelRank = dcgTable.findIndex((r) => r.isBinaryRelevant) + 1;
  const reciprocalRank = firstRelRank > 0 ? 1 / firstRelRank : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            IR Evaluation Metrics Solver: MAP, MRR & NDCG@K
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Calculation of Precision@K, Average Precision (AP), Mean Reciprocal Rank (MRR), and Discounted Cumulative Gain (NDCG@K).
          </p>
        </div>

        <button
          onClick={() => {
            setRelevanceScores([3, 2, 0, 1, 2]);
            setTotalRelevantInCorpus(4);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-semantic-amber-bg text-semantic-amber-text border border-semantic-amber-border rounded-md hover:brightness-110"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Load SPPU May 2024 PYQ Preset
        </button>
      </div>

      {/* Input relevance scores */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Ranked Document Relevance Inputs</h3>
        <div className="flex flex-wrap items-center gap-4">
          {relevanceScores.map((score, idx) => (
            <div key={idx} className="p-3 bg-surface-2 rounded border border-border-subtle text-xs font-mono">
              <label className="text-text-muted block mb-1">Rank #{idx + 1} Relevance</label>
              <input
                type="number"
                min={0}
                max={5}
                value={score}
                onChange={(e) => {
                  const newScores = [...relevanceScores];
                  newScores[idx] = Number(e.target.value);
                  setRelevanceScores(newScores);
                }}
                className="w-16 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary focus:outline-none"
              />
            </div>
          ))}
          <div className="p-3 bg-surface-2 rounded border border-border-subtle text-xs font-mono">
            <label className="text-text-muted block mb-1">Total Relevant in Corpus</label>
            <input
              type="number"
              min={1}
              value={totalRelevantInCorpus}
              onChange={(e) => setTotalRelevantInCorpus(Math.max(1, Number(e.target.value)))}
              className="w-20 py-1 px-2 bg-surface-1 border border-border-accent rounded text-xs font-mono text-text-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-surface-1 border border-border-subtle rounded-lg">
          <div className="text-xs text-text-secondary font-mono">NDCG@{k}</div>
          <div className="text-2xl font-mono font-bold text-semantic-emerald-text mt-1">
            {(ndcg * 100).toFixed(2)}%
          </div>
          <div className="text-[11px] text-text-muted font-mono mt-0.5">Score: {ndcg.toFixed(4)}</div>
        </div>

        <div className="p-4 bg-surface-1 border border-border-subtle rounded-lg">
          <div className="text-xs text-text-secondary font-mono">Average Precision (AP)</div>
          <div className="text-2xl font-mono font-bold text-semantic-sky-text mt-1">
            {(averagePrecision * 100).toFixed(2)}%
          </div>
          <div className="text-[11px] text-text-muted font-mono mt-0.5">AP: {averagePrecision.toFixed(4)}</div>
        </div>

        <div className="p-4 bg-surface-1 border border-border-subtle rounded-lg">
          <div className="text-xs text-text-secondary font-mono">Reciprocal Rank (RR)</div>
          <div className="text-2xl font-mono font-bold text-semantic-amber-text mt-1">
            1 / {firstRelRank}
          </div>
          <div className="text-[11px] text-text-muted font-mono mt-0.5">RR: {reciprocalRank.toFixed(3)}</div>
        </div>

        <div className="p-4 bg-surface-1 border border-border-subtle rounded-lg">
          <div className="text-xs text-text-secondary font-mono">Precision@{k}</div>
          <div className="text-2xl font-mono font-bold text-text-primary mt-1">
            {(precisionRecallTable[k - 1]?.precAtK * 100 || 0).toFixed(2)}%
          </div>
          <div className="text-[11px] text-text-muted font-mono mt-0.5">
            Recall@{k}: {(precisionRecallTable[k - 1]?.recAtK * 100 || 0).toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Full Step-by-Step Table */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Step-by-Step Discounted Cumulative Gain Table</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
              <tr>
                <th className="p-2 text-center">Rank (i)</th>
                <th className="p-2 text-center">Relevance (r_i)</th>
                <th className="p-2 text-center">Gain = 2^r - 1</th>
                <th className="p-2 text-center">Discount = log2(i+1)</th>
                <th className="p-2 text-center">Discounted Gain</th>
                <th className="p-2 text-center">Ideal Gain</th>
                <th className="p-2 text-center">Precision@i</th>
                <th className="p-2 text-center">Recall@i</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-center">
              {precisionRecallTable.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-2 text-text-primary font-bold">#{row.rank}</td>
                  <td className="p-2 text-semantic-sky-text font-bold">{row.rel}</td>
                  <td className="p-2 text-text-muted">{row.gain}</td>
                  <td className="p-2 text-text-muted">{row.discount.toFixed(4)}</td>
                  <td className="p-2 font-bold text-semantic-emerald-text">{row.discountedGain.toFixed(4)}</td>
                  <td className="p-2 text-text-muted">{idcgTable[idx].toFixed(4)}</td>
                  <td className="p-2 text-semantic-sky-text">{(row.precAtK * 100).toFixed(1)}%</td>
                  <td className="p-2 text-semantic-amber-text">{(row.recAtK * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-border-subtle flex flex-wrap justify-between gap-2 text-xs font-mono text-text-muted">
          <span>Total DCG@{k} = <strong className="text-semantic-emerald-text">{dcg.toFixed(4)}</strong></span>
          <span>Ideal IDCG@{k} = <strong className="text-text-primary">{idcg.toFixed(4)}</strong></span>
          <span>NDCG@{k} = {dcg.toFixed(4)} / {idcg.toFixed(4)} = <strong className="text-semantic-emerald-text">{ndcg.toFixed(4)} ({(ndcg * 100).toFixed(2)}%)</strong></span>
        </div>
      </div>
    </div>
  );
};
