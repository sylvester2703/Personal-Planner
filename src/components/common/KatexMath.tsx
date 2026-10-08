'use client';

import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexMathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KatexMath: React.FC<KatexMathProps> = ({ math, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.innerText = math;
        }
      }
    }
  }, [math, block]);

  return (
    <span
      ref={containerRef}
      className={`katex-render-container ${block ? 'block my-2 overflow-x-auto py-1 text-center' : 'inline-block px-0.5'} ${className}`}
    />
  );
};
