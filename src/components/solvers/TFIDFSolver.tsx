'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Calculator, Sparkles } from 'lucide-react';

export const TFIDFSolver: React.FC = () => {
  // SPPU Standard Exam Corpus Preset
  const [doc1, setDoc1] = useState<string>('data science AI');
  const [doc2, setDoc2] = useState<string>('data mining AI');
  const [doc3, setDoc3] = useState<string>('science research');
  const [query, setQuery] = useState<string>('data science');

  // Tokenization helper
  const tokenize = (text: string) =>
    text
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0);

  const docs = [
    { id: 'D1', name: 'Document 1', text: doc1, tokens: tokenize(doc1) },
    { id: 'D2', name: 'Document 2', text: doc2, tokens: tokenize(doc2) },
    { id: 'D3', name: 'Document 3', text: doc3, tokens: tokenize(doc3) },
  ];

  const queryTokens = tokenize(query);
  const n = docs.length;

  // Extract unique vocabulary
  const vocabSet = new Set<string>();
  docs.forEach((d) => d.tokens.forEach((t) => vocabSet.add(t)));
  queryTokens.forEach((t) => vocabSet.add(t));
  const vocabulary = Array.from(vocabSet).sort();

  // Compute DF and IDF for each term (using log10 as in SPPU standard solutions)
  const idfMap: Record<string, { df: number; idf: number }> = {};
  vocabulary.forEach((term) => {
    let df = 0;
    docs.forEach((d) => {
      if (d.tokens.includes(term)) df++;
    });
    const idf = df > 0 ? Math.log10(n / df) : 0;
    idfMap[term] = { df, idf };
  });

  // Calculate TF-IDF vectors
  const getTfIdfVector = (tokens: string[]) => {
    return vocabulary.map((term) => {
      const tf = tokens.filter((t) => t === term).length;
      const idf = idfMap[term]?.idf || 0;
      return tf * idf;
    });
  };

  const queryVec = getTfIdfVector(queryTokens);
  const queryNorm = Math.sqrt(queryVec.reduce((sum, v) => sum + v * v, 0));

  const docResults = docs.map((d) => {
    const vec = getTfIdfVector(d.tokens);
    const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
    let dotProduct = 0;
    vec.forEach((v, idx) => {
      dotProduct += v * queryVec[idx];
    });
    const cosineSim = queryNorm > 0 && norm > 0 ? dotProduct / (queryNorm * norm) : 0;

    return {
      ...d,
      vec,
      norm,
      dotProduct,
      cosineSim,
    };
  });

  const sortedDocs = [...docResults].sort((a, b) => b.cosineSim - a.cosineSim);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Calculator className="w-5 h-5 text-semantic-sky-text" />
            TF-IDF & Cosine Similarity Ranking Solver
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Full manual calculation trace for Information Retrieval (IR Unit 3) vector space models.
          </p>
        </div>

        <button
          onClick={() => {
            setDoc1('data science AI');
            setDoc2('data mining AI');
            setDoc3('science research');
            setQuery('data science');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-semantic-amber-bg text-semantic-amber-text border border-semantic-amber-border rounded-md hover:brightness-110"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Load SPPU Dec 2023 PYQ Preset
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-surface-1 border border-border-subtle rounded-lg p-5">
        <div>
          <label className="text-xs text-text-muted block mb-1">Document 1 (D1)</label>
          <input
            type="text"
            value={doc1}
            onChange={(e) => setDoc1(e.target.value)}
            className="w-full bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-xs font-mono text-text-primary"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Document 2 (D2)</label>
          <input
            type="text"
            value={doc2}
            onChange={(e) => setDoc2(e.target.value)}
            className="w-full bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-xs font-mono text-text-primary"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted block mb-1">Document 3 (D3)</label>
          <input
            type="text"
            value={doc3}
            onChange={(e) => setDoc3(e.target.value)}
            className="w-full bg-surface-2 border border-border-accent rounded px-3 py-1.5 text-xs font-mono text-text-primary"
          />
        </div>
        <div>
          <label className="text-xs text-semantic-sky-text font-bold block mb-1">Search Query (Q)</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-surface-2 border border-semantic-sky-border rounded px-3 py-1.5 text-xs font-mono text-text-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Vocabulary & IDF Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">1. Vocabulary & Inverse Document Frequency (IDF)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead className="bg-surface-2 text-text-secondary border-b border-border-subtle">
                <tr>
                  <th className="p-2 text-left">Term (t)</th>
                  <th className="p-2 text-center">Doc Frequency (DF)</th>
                  <th className="p-2 text-center">N / DF</th>
                  <th className="p-2 text-center">IDF = log10(N/DF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {vocabulary.map((term) => (
                  <tr key={term}>
                    <td className="p-2 text-text-primary font-bold">{term}</td>
                    <td className="p-2 text-center text-text-muted">{idfMap[term].df}</td>
                    <td className="p-2 text-center text-text-muted">
                      {n} / {idfMap[term].df} = {(n / Math.max(1, idfMap[term].df)).toFixed(2)}
                    </td>
                    <td className="p-2 text-center font-bold text-semantic-sky-text">
                      {idfMap[term].idf.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cosine Similarity Rankings */}
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary">2. Cosine Similarity & Ranked Search Output</h3>

          <div className="space-y-3">
            {sortedDocs.map((d, rankIdx) => (
              <div
                key={d.id}
                className="p-3.5 bg-surface-2 rounded border border-border-subtle flex items-center justify-between font-mono text-xs"
              >
                <div>
                  <div className="text-text-primary font-bold">
                    Rank #{rankIdx + 1}: {d.id} ({d.name})
                  </div>
                  <div className="text-text-muted text-[11px] mt-0.5">&quot;{d.text}&quot;</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-text-secondary">Sim(Q, {d.id})</div>
                  <div className="text-lg font-bold text-semantic-emerald-text">
                    {d.cosineSim.toFixed(4)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-canvas rounded border border-border-accent/60 text-xs font-mono space-y-2">
            <div className="text-text-muted font-bold">Formula Applied:</div>
            <KatexMath math={`\\text{Sim}(Q, D) = \\frac{\\mathbf{q} \\cdot \\mathbf{d}}{\\|\\mathbf{q}\\| \\cdot \\|\\mathbf{d}\\|}`} block />
            <div className="text-[11px] text-text-secondary">
              Query vector norm: ||q|| = {queryNorm.toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
