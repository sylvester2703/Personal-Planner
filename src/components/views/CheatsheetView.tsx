'use client';

import React from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Printer, FileText, Download, Sparkles } from 'lucide-react';

export const CheatsheetView: React.FC = () => {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span>High-Density Reference</span>
            <span>•</span>
            <span>SPPU End-Sem Master Formula Cheat Sheet</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary font-mono mt-1 flex items-center gap-2">
            <FileText className="w-6 h-6 text-semantic-emerald-text" />
            Print-Ready Exam Day Formula Cheat Sheet
          </h1>
          <p className="text-xs text-text-muted mt-1 font-sans">
            Ultra-compact, editorial reference card covering all 4 subjects (Units 3, 4, 5, 6) for rapid pre-exam revision.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-semantic-emerald-bg text-semantic-emerald-text border border-semantic-emerald-border rounded-lg text-xs font-mono font-bold hover:brightness-110 shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF (Ctrl+P)</span>
        </button>
      </div>

      {/* High-Density Printable Sheet */}
      <div className="bg-surface-1 border border-border-subtle rounded-lg p-8 space-y-8 print:p-0 print:border-none print:bg-white print:text-black">
        {/* Document Title Banner */}
        <div className="border-b border-border-accent pb-4 text-center space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-text-secondary">
            Savitribai Phule Pune University (SPPU, 2019 Pattern) • Final Year BE AI&DS
          </div>
          <h2 className="text-2xl font-bold font-mono text-text-primary print:text-black">
            Master Theory & Mathematical Formula Cheat Sheet
          </h2>
          <div className="text-xs font-mono text-text-muted">
            Subjects: Machine Learning (417521) | DMV (417522) | Bioinformatics (417523) | IR (417524)
          </div>
        </div>

        {/* SECTION 1: MACHINE LEARNING (ML) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-border-subtle text-semantic-emerald-text font-mono font-bold text-sm uppercase">
            <span>1. Machine Learning (Units 3–6)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* SVM Slack & Primal */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">Soft-Margin SVM Dual & Primal:</div>
              <KatexMath math={`\\min_{\\mathbf{w}, b, \\xi} \\frac{1}{2}\\|\\mathbf{w}\\|^2 + C \\sum_{i=1}^N \\xi_i \\quad \\text{s.t.} \\quad y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1 - \\xi_i`} block />
              <div className="text-[10px] text-text-muted">RBF Kernel: $K(x, z) = \\exp(-\\gamma \\|x - z\\|^2)$ | Poly: $K(x, z) = (x^T z + c)^d$</div>
            </div>

            {/* Decision Tree Criteria */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">Entropy, Information Gain & Gini:</div>
              <KatexMath math={`H(S) = -\\sum p_i \\log_2(p_i), \\quad Gini(S) = 1 - \\sum p_i^2, \\quad IG = H(S) - \\sum \\frac{|S_v|}{|S|} H(S_v)`} block />
            </div>

            {/* K-Means & GMM EM */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">K-Means Inertia & GMM Responsibility:</div>
              <KatexMath math={`J = \\sum_{k=1}^K \\sum_{x \\in C_k} \\|x - \\mu_k\\|^2, \\quad \\gamma_{ik} = \\frac{\\pi_k \\mathcal{N}(x_i | \\mu_k, \\Sigma_k)}{\\sum_j \\pi_j \\mathcal{N}(x_i | \\mu_j, \\Sigma_j)}`} block />
            </div>

            {/* AdaBoost Alpha & Weights */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">AdaBoost Weight & Alpha Updates:</div>
              <KatexMath math={`\\alpha_t = \\frac{1}{2}\\ln\\left(\\frac{1-\\epsilon_t}{\\epsilon_t}\\right), \\quad w_i^{(t+1)} = \\frac{w_i^{(t)} e^{-\\alpha_t y_i h_t(x_i)}}{Z_t}, \\quad P(\\text{OOB}) = \\frac{1}{e} \\approx 36.8\\%`} block />
            </div>

            {/* CNN Dimensions & Backprop */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5 md:col-span-2">
              <div className="font-bold text-text-primary">CNN Spatial Arithmetic & Backprop Gradient:</div>
              <KatexMath math={`W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} - K + 2P}{S} \\right\\rfloor + 1, \\quad \\frac{\\partial E}{\\partial w_{jk}} = -(y_k - \\hat{y}_k) \\sigma'(z_k) a_j`} block />
            </div>
          </div>
        </div>

        {/* SECTION 2: DATA MINING & VISUALIZATION (DMV) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-border-subtle text-semantic-sky-text font-mono font-bold text-sm uppercase">
            <span>2. Data Mining & Visualization (Units 3–6)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Lie Factor & Data-Ink */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">Tufte Lie Factor & Data-Ink Ratio:</div>
              <KatexMath math={`\\text{Lie Factor} = \\frac{\\text{Size of effect in graphic}}{\\text{Size of effect in data}}, \\quad \\text{Data-Ink Ratio} = \\frac{\\text{Data-Ink}}{\\text{Total Ink}}`} block />
            </div>

            {/* Force-Directed Graph Layout */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">Fruchterman-Reingold Graph Forces:</div>
              <KatexMath math={`f_a(d) = \\frac{d^2}{k}, \\quad f_r(d) = \\frac{k^2}{d}, \\quad k = C \\sqrt{\\frac{\\text{Area}}{|V|}}`} block />
            </div>

            {/* Mackinlay Encodings Ranking */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5 md:col-span-2">
              <div className="font-bold text-text-primary">Mackinlay Ranking of Visual Channels:</div>
              <div className="text-[11px] text-text-muted">
                • <strong>Quantitative:</strong> Position &gt; Length &gt; Angle &gt; Area &gt; Volume &gt; Color Saturation &gt; Color Hue<br />
                • <strong>Ordinal:</strong> Position &gt; Density &gt; Color Saturation &gt; Color Hue &gt; Texture &gt; Connection<br />
                • <strong>Nominal:</strong> Position &gt; Color Hue &gt; Texture &gt; Connection &gt; Containment &gt; Density &gt; Shape
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: BIOINFORMATICS (BIF) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-border-subtle text-semantic-amber-text font-mono font-bold text-sm uppercase">
            <span>3. Bioinformatics (Units 3–6)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Needleman-Wunsch & Smith-Waterman */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">Needleman-Wunsch vs. Smith-Waterman:</div>
              <KatexMath math={`M(i, j) = \\max \\{ M(i-1, j-1) + S, \\; M(i-1, j) - d, \\; M(i, j-1) - d \\}`} block />
              <div className="text-[10px] text-text-muted">Smith-Waterman Local Alignment incorporates: $\\max(0, \\dots)$</div>
            </div>

            {/* Ramachandran Plot Quadrants */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">Ramachandran Torsion Angle Ranges:</div>
              <div className="text-[10px] text-text-muted leading-relaxed">
                • <strong>Top-Left:</strong> $\\beta$-Sheets ($\\phi \\in [-180, -45], \\psi \\in [45, 180]$)<br />
                • <strong>Bottom-Left:</strong> $\\alpha_R$-Helix ($\\phi \\approx -57^\\circ, \\psi \\approx -47^\\circ$)<br />
                • <strong>Top-Right:</strong> $\\alpha_L$-Helix (Glycine / Loops) | <strong>Bottom-Right:</strong> Disallowed
              </div>
            </div>

            {/* Network Biology Centrality */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5 md:col-span-2">
              <div className="font-bold text-text-primary">Network Biology Metrics & Scale-Free Degree:</div>
              <KatexMath math={`P(k) \\propto k^{-\\gamma} \\; (2 < \\gamma < 3), \\quad C_i = \\frac{2 e_i}{k_i(k_i - 1)}, \\quad B(v) = \\sum_{s \\ne v \\ne t} \\frac{\\sigma_{st}(v)}{\\sigma_{st}}`} block />
            </div>
          </div>
        </div>

        {/* SECTION 4: INFORMATION RETRIEVAL (IR) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-border-subtle text-semantic-purple-text font-mono font-bold text-sm uppercase">
            <span>4. Information Retrieval (Units 3–6)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* TF-IDF & Cosine */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">TF-IDF Vector Space & BM25:</div>
              <KatexMath math={`\\text{Sim}(q, d) = \\frac{\\sum w_{t, q} w_{t, d}}{\\sqrt{\\sum w_{t, q}^2} \\sqrt{\\sum w_{t, d}^2}}, \\quad \\text{IDF}(t) = \\log_{10}\\left(\\frac{N}{DF_t}\\right)`} block />
            </div>

            {/* PageRank Power Iteration */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5">
              <div className="font-bold text-text-primary">PageRank Random Surfer Matrix:</div>
              <KatexMath math={`\\mathbf{r}^{(k+1)} = d \\cdot \\mathbf{M} \\mathbf{r}^{(k)} + \\frac{1 - d}{N} \\mathbf{e} \\quad (d = 0.70 \\text{ for SPPU})`} block />
            </div>

            {/* NDCG & MAP Evaluation */}
            <div className="p-3 bg-canvas border border-border-subtle rounded space-y-1.5 md:col-span-2">
              <div className="font-bold text-text-primary">Discounted Cumulative Gain (NDCG) & Mean Average Precision (MAP):</div>
              <KatexMath math={`\\text{DCG}_p = \\sum_{i=1}^p \\frac{2^{r_i} - 1}{\\log_2(i + 1)}, \\quad \\text{NDCG}_p = \\frac{\\text{DCG}_p}{\\text{IDCG}_p}, \\quad \\text{MAP} = \\frac{1}{|Q|} \\sum_{q=1}^{|Q|} \\text{AP}(q)`} block />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
