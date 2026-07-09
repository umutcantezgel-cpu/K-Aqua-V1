'use client';

import React from 'react';

const primaryNodes = [
  { id: 'sf', name: 'San Francisco', x: 18, y: 38 },
  { id: 'ny', name: 'New York', x: 28, y: 35 },
  { id: 'sp', name: 'São Paulo', x: 35, y: 65 },
  { id: 'ld', name: 'London', x: 48, y: 25 },
  { id: 'bl', name: 'Berlin', x: 52, y: 23 },
  { id: 'ty', name: 'Tokyo', x: 85, y: 35 },
  { id: 'sg', name: 'Singapore', x: 78, y: 55 },
  { id: 'sy', name: 'Sydney', x: 88, y: 75 },
];

const secondaryNodes = [
  { id: 'n1', x: 22, y: 45 },
  { id: 'n2', x: 45, y: 30 },
  { id: 'n3', x: 55, y: 45 },
  { id: 'n4', x: 70, y: 30 },
  { id: 'n5', x: 82, y: 50 },
  { id: 'n6', x: 40, y: 55 },
  { id: 'n7', x: 60, y: 20 },
  { id: 'n8', x: 75, y: 40 },
  { id: 'n9', x: 32, y: 42 },
  { id: 'n10', x: 80, y: 65 },
];

export default function FooterMap() {
  return (
    <div className="relative w-full aspect-[2/1] md:aspect-[3/1] bg-[#050505] rounded-2xl overflow-hidden border border-white/5 group">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4%_8%] md:bg-[size:2%_4%]" />
      
      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-cyan-900/20" />

      {/* Abstract Connections */}
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-60"
        style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.3))' }}
      >
        <path
          d="M 180 190 Q 300 75 480 125 T 850 175"
          fill="none"
          stroke="url(#glow-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 280 175 Q 400 300 350 325"
          fill="none"
          stroke="url(#glow-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 520 115 Q 650 200 780 275 T 880 375"
          fill="none"
          stroke="url(#glow-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 480 125 Q 500 200 550 225 T 780 275"
          fill="none"
          stroke="url(#glow-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <defs>
          <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6,182,212,0)" />
            <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Secondary Background Nodes */}
      {secondaryNodes.map((loc) => (
        <div
          key={loc.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan-800/40"
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
        />
      ))}

      {/* Primary Pulsing Nodes */}
      {primaryNodes.map((loc, i) => (
        <div
          key={loc.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair z-10 group/node"
          style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
        >
          {/* Ping effect with slight animation delay offset based on index */}
          <div 
            className="absolute inset-0 rounded-full bg-cyan-400 opacity-40 animate-ping"
            style={{ animationDuration: `${2 + i * 0.3}s` }}
          />
          
          {/* Core dot */}
          <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_3px_rgba(6,182,212,0.8)] transition-transform duration-300 group-hover/node:scale-150 group-hover/node:bg-cyan-200" />
          
          {/* Hover Label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 text-[10px] md:text-xs font-mono text-cyan-100 whitespace-nowrap bg-black/90 px-2 py-1.5 rounded border border-cyan-500/50 backdrop-blur-md pointer-events-none z-20 shadow-xl shadow-cyan-900/20">
            {loc.name}
            <div className="text-[8px] text-cyan-500/80 mt-0.5 tracking-wider font-bold">STATUS: ONLINE</div>
          </div>
        </div>
      ))}
      
      {/* Overlay Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-500/30 opacity-50" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-500/30 opacity-50" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-cyan-500/30 opacity-50" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-500/30 opacity-50" />
    </div>
  );
}
