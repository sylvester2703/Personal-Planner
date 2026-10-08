'use client';

import React, { useState } from 'react';
import { KatexMath } from '@/components/common/KatexMath';
import { Compass, Sparkles } from 'lucide-react';

interface ResiduePreset {
  name: string;
  phi: number;
  psi: number;
  expectedRegion: string;
  status: 'allowed' | 'partially_allowed' | 'disallowed';
}

export const RamachandranInspector: React.FC = () => {
  const [phi, setPhi] = useState<number>(-57);
  const [psi, setPsi] = useState<number>(-47);
  const [selectedResidue, setSelectedResidue] = useState<string>('Right-handed alpha-helix (Standard)');

  const presets: ResiduePreset[] = [
    { name: 'Right-handed alpha-helix (Standard)', phi: -57, psi: -47, expectedRegion: 'Bottom-Left (Quadrant III)', status: 'allowed' },
    { name: 'Anti-parallel beta-sheet', phi: -139, psi: 135, expectedRegion: 'Top-Left (Quadrant II)', status: 'allowed' },
    { name: 'Parallel beta-sheet', phi: -119, psi: 113, expectedRegion: 'Top-Left (Quadrant II)', status: 'allowed' },
    { name: 'Collagen triple helix', phi: -51, psi: 153, expectedRegion: 'Top-Left (Quadrant II)', status: 'allowed' },
    { name: 'Left-handed alpha-helix', phi: 57, psi: 47, expectedRegion: 'Top-Right (Quadrant I)', status: 'partially_allowed' },
    { name: 'Steric Clash Conformation', phi: 60, psi: -120, expectedRegion: 'Bottom-Right (Quadrant IV)', status: 'disallowed' },
  ];

  // Evaluate current phi, psi
  const evaluateRegion = (p: number, s: number) => {
    if (p >= -180 && p <= -45 && s >= 45 && s <= 180) {
      return {
        conformation: 'Beta-Pleated Sheet (Parallel / Anti-parallel)',
        quadrant: 'Top-Left (Quadrant II)',
        status: 'Favored / Core Allowed Region',
        color: 'text-semantic-emerald-text',
        bgColor: 'bg-semantic-emerald-bg',
      };
    }
    if (p >= -180 && p <= -45 && s >= -75 && s <= -20) {
      return {
        conformation: 'Right-handed Alpha-Helix (alpha_R)',
        quadrant: 'Bottom-Left (Quadrant III)',
        status: 'Favored / Core Allowed Region',
        color: 'text-semantic-sky-text',
        bgColor: 'bg-semantic-sky-bg',
      };
    }
    if (p >= 30 && p <= 90 && s >= 30 && s <= 90) {
      return {
        conformation: 'Left-handed Alpha-Helix (alpha_L)',
        quadrant: 'Top-Right (Quadrant I)',
        status: 'Partially Allowed (Common in Glycine / Loops)',
        color: 'text-semantic-amber-text',
        bgColor: 'bg-semantic-amber-bg',
      };
    }
    return {
      conformation: 'Disallowed Conformation',
      quadrant: 'Severe Steric Clash Region',
      status: 'Energetically Unfavorable (Forbidden by Van der Waals radii)',
      color: 'text-semantic-rose-text',
      bgColor: 'bg-semantic-rose-bg',
    };
  };

  const currentEvaluation = evaluateRegion(phi, psi);

  // SVG coordinate transformation: Phi in [-180, 180] -> X in [0, 300], Psi in [-180, 180] -> Y in [300, 0]
  const mapCoordToSvg = (p: number, s: number) => {
    const x = ((p + 180) / 360) * 280 + 20;
    const y = 300 - (((s + 180) / 360) * 280 + 10);
    return { x, y };
  };

  const pointSvg = mapCoordToSvg(phi, psi);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Compass className="w-5 h-5 text-semantic-sky-text" />
            Ramachandran Plot Dihedral Angle ($\phi, \psi$) Inspector
          </h2>
          <p className="text-sm text-text-muted mt-0.5">
            Interactive structural bioinformatics validation tool for protein backbone conformations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedResidue}
            onChange={(e) => {
              const found = presets.find((p) => p.name === e.target.value);
              if (found) {
                setSelectedResidue(found.name);
                setPhi(found.phi);
                setPsi(found.psi);
              }
            }}
            className="bg-surface-1 border border-border-accent rounded px-3 py-1.5 text-xs font-mono text-text-primary focus:outline-none"
          >
            {presets.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} ({p.phi}&deg;, {p.psi}&deg;)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Plot */}
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-5 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-text-primary self-start mb-3">
            Backbone Torsion Angle Coordinate Plane
          </h3>

          <div className="relative w-[320px] h-[320px] bg-canvas border border-border-accent rounded p-2">
            <svg viewBox="0 0 320 320" className="w-full h-full font-mono text-[9px] select-none">
              {/* Grid Background */}
              <rect x="20" y="20" width="280" height="280" fill="#121215" stroke="#27272a" strokeWidth="1" />

              {/* Favored Zones */}
              {/* Beta-Sheet Region (Top-Left) */}
              <rect x="35" y="30" width="95" height="100" fill="rgba(52, 211, 153, 0.15)" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1" />
              <text x="50" y="70" fill="#34d399" fontSize="10" fontWeight="bold">Beta-Sheet</text>

              {/* Right-Handed Alpha-Helix Region (Bottom-Left) */}
              <rect x="35" y="180" width="95" height="60" fill="rgba(56, 189, 248, 0.15)" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
              <text x="45" y="215" fill="#38bdf8" fontSize="10" fontWeight="bold">Alpha_R Helix</text>

              {/* Left-Handed Alpha-Helix Region (Top-Right) */}
              <rect x="180" y="70" width="60" height="60" fill="rgba(251, 191, 36, 0.15)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" />
              <text x="185" y="105" fill="#fbbf24" fontSize="9" fontWeight="bold">Alpha_L</text>

              {/* Center Axes */}
              <line x1="160" y1="20" x2="160" y2="300" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="20" y1="160" x2="300" y2="160" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />

              {/* Axis Labels */}
              <text x="15" y="165" fill="#a1a1aa" textAnchor="end">-180&deg;</text>
              <text x="305" y="165" fill="#a1a1aa" textAnchor="start">+180&deg;</text>
              <text x="160" y="15" fill="#a1a1aa" textAnchor="middle">&psi; = +180&deg;</text>
              <text x="160" y="315" fill="#a1a1aa" textAnchor="middle">&psi; = -180&deg;</text>

              {/* Current Coordinate Marker */}
              <circle cx={pointSvg.x} cy={pointSvg.y} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex gap-4 mt-3 text-xs text-text-muted font-mono">
            <span>&phi; (Phi): <strong className="text-text-primary">{phi}&deg;</strong></span>
            <span>&psi; (Psi): <strong className="text-text-primary">{psi}&deg;</strong></span>
          </div>
        </div>

        {/* Controls & Structural Evaluation */}
        <div className="lg:col-span-6 bg-surface-1 border border-border-subtle rounded-lg p-5 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-semibold text-text-primary font-sans">Conformation Diagnostic Report</h3>

          <div className={`p-4 rounded border border-border-subtle ${currentEvaluation.bgColor} space-y-2`}>
            <div className="text-xs text-text-secondary uppercase">Predicted Secondary Structure:</div>
            <div className={`text-lg font-bold ${currentEvaluation.color}`}>
              {currentEvaluation.conformation}
            </div>
            <div className="text-text-primary">Quadrant: {currentEvaluation.quadrant}</div>
            <div className="text-text-muted text-[11px]">{currentEvaluation.status}</div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Dihedral Angle &phi; (C&alpha; - N torsion):</span>
                <span className="font-bold text-text-primary">{phi}&deg;</span>
              </div>
              <input
                type="range"
                min={-180}
                max={180}
                value={phi}
                onChange={(e) => setPhi(Number(e.target.value))}
                className="w-full accent-semantic-sky-text"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Dihedral Angle &psi; (C&alpha; - C&apos; torsion):</span>
                <span className="font-bold text-text-primary">{psi}&deg;</span>
              </div>
              <input
                type="range"
                min={-180}
                max={180}
                value={psi}
                onChange={(e) => setPsi(Number(e.target.value))}
                className="w-full accent-semantic-sky-text"
              />
            </div>
          </div>

          <div className="p-3 bg-canvas rounded border border-border-accent/60 space-y-1 text-text-muted text-[11px]">
            <div className="font-bold text-text-primary">Key SPPU Exam Rules:</div>
            <div>• <strong>Glycine:</strong> Has no $\beta$-carbon side-chain $\rightarrow$ adopts angles anywhere on the plot.</div>
            <div>• <strong>Proline:</strong> Rigid 5-membered ring restricts $\phi$ strictly around $-65^\circ \pm 15^\circ$.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
