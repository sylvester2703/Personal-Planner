import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: 'SPPU AI&DS ExamOS — Deterministic Academic Operating System',
  description:
    'Production-grade deterministic academic operating system and personal life management system for SPPU BE Artificial Intelligence & Data Science (2019 Pattern) candidates.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#09090b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-canvas text-text-primary">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-canvas text-text-primary antialiased selection:bg-semantic-sky-bg selection:text-semantic-sky-text">
        {children}
      </body>
    </html>
  );
}
