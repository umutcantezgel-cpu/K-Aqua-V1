import React, { useRef, useEffect } from 'react';
import { ZipLevel, Coord, OneWay, Portal } from '../../lib/zip-levels';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

function coordsEqual(a: Coord, b: Coord) {
  return a.x === b.x && a.y === b.y;
}

export interface ZipGameState {
  path: Coord[];
  isDrawing: boolean;
  handlePointerDown: (c: Coord) => void;
  handlePointerEnter: (c: Coord) => void;
  handlePointerUp: () => void;
  isObstacle: (c: Coord) => boolean;
  getCheckpointIndex: (c: Coord) => number;
  getOneWay: (c: Coord) => OneWay | undefined;
  getPortal: (c: Coord) => Portal | undefined;
  isValidMove: (from: Coord, to: Coord) => boolean;
}

interface ZipGridProps {
  level: ZipLevel;
  gameState: ZipGameState;
  hintPath?: Coord[];
}

export default function ZipGrid({ level, gameState, hintPath = [] }: ZipGridProps) {
  const {
    path,
    isDrawing,
    handlePointerDown,
    handlePointerEnter,
    handlePointerUp,
    isObstacle,
    getCheckpointIndex,
    getOneWay,
    getPortal,
    isValidMove
  } = gameState;

  // Global pointer up listener to catch mouse up outside the grid
  useEffect(() => {
    const onGlobalUp = () => handlePointerUp();
    window.addEventListener('pointerup', onGlobalUp);
    return () => window.removeEventListener('pointerup', onGlobalUp);
  }, [handlePointerUp]);

  const gridRef = useRef<HTMLDivElement>(null);

  // SVG Path generation
  const generateSvgPath = (nodes: Coord[], startIndex: number = 0) => {
    if (nodes.length === 0) return '';
    
    return nodes.map((p, i) => {
      const cx = (p.x + 0.5) * (100 / level.width);
      const cy = (p.y + 0.5) * (100 / level.height);
      
      let command = 'L';
      if (i === 0 && startIndex === 0) {
        command = 'M';
      } else if (i > 0) {
        const prev = nodes[i - 1]!;
        const dist = Math.abs(prev.x - p.x) + Math.abs(prev.y - p.y);
        if (dist > 1) {
          // This was a teleport jump! Break the SVG line.
          command = 'M';
        }
      } else {
        command = 'M'; // Fallback if starting from middle
      }
      return `${command} ${cx} ${cy}`;
    }).join(' ');
  };

  const isCoordInPath = (x: number, y: number) => {
    return path.some(p => p.x === x && p.y === y);
  };
  
  const isCoordInHint = (x: number, y: number) => {
    return hintPath.some(p => p.x === x && p.y === y);
  };

  const renderOneWayIcon = (oneWay: OneWay, inPath: boolean, inHint: boolean) => {
    const Icon = {
      up: ChevronUp,
      down: ChevronDown,
      left: ChevronLeft,
      right: ChevronRight
    }[oneWay.direction];
    
    const colorClass = inPath 
      ? 'text-sky-500 drop-shadow-sm' 
      : inHint 
      ? 'text-yellow-500 drop-shadow-sm'
      : 'text-slate-300';
      
    return (
      <Icon 
        size={24} 
        className={`z-20 transition-colors duration-300 ${colorClass}`}
      />
    );
  };

  const lastNode = path.length > 0 ? path[path.length - 1] : null;
  const lastNodeIsPortal = lastNode ? getPortal(lastNode) : null;
  
  // Combine lastNode and hintPath for drawing the continuous hint line
  const fullHintPath = lastNode && hintPath.length > 0 ? [lastNode, ...hintPath] : [];

  return (
    <div 
      className="relative w-full max-w-lg aspect-square bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-200 select-none touch-none p-2"
      ref={gridRef}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="w-full h-full"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${level.width}, 1fr)`,
          gridTemplateRows: `repeat(${level.height}, 1fr)`,
          gap: '4px',
        }}
      >
        {/* SVG overlay for drawing the pipe path */}
        <svg 
          className="absolute inset-2 pointer-events-none z-10" 
          style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }}
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Hint Path (Ghost) */}
          {fullHintPath.length > 1 && (
            <path
              d={generateSvgPath(fullHintPath, 1)}
              fill="none"
              stroke="#eab308" // Tailwind yellow-500
              strokeWidth="6"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-[dash_1s_linear_infinite] opacity-60"
            />
          )}
        
          <path
            d={generateSvgPath(path, 0)}
            fill="none"
            stroke="#0ea5e9" // Tailwind sky-500
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'd 0.1s ease-out' }}
          />
          {/* Draw circles at path joints to make it look like continuous pipes */}
          {path.map((p, i) => (
            <circle
              key={`joint-${i}`}
              cx={(p.x + 0.5) * (100 / level.width)}
              cy={(p.y + 0.5) * (100 / level.height)}
              r="3"
              fill="#0ea5e9"
            />
          ))}
        </svg>

        {/* CSS for animating the dashed line */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            to {
              stroke-dashoffset: -16;
            }
          }
        `}} />

        {/* Grid Tiles */}
        {Array.from({ length: level.height }).map((_, y) => (
          Array.from({ length: level.width }).map((_, x) => {
            const coord = { x, y };
            const obstacle = isObstacle(coord);
            const cpIndex = getCheckpointIndex(coord);
            const isCheckPoint = cpIndex !== -1;
            const oneWay = getOneWay(coord);
            const portal = getPortal(coord);
            const inPath = isCoordInPath(x, y);
            const inHint = isCoordInHint(x, y);

            // UX Logik: Highlight valid next moves
            let isValidNext = false;
            let isSisterPortal = false;

            if (isDrawing && lastNode && !inPath && !obstacle) {
              const isAdjacent = Math.abs(x - lastNode.x) + Math.abs(y - lastNode.y) === 1;
              if (isAdjacent && isValidMove(lastNode, coord)) {
                isValidNext = true;
              }
            }

            if (lastNode && !isDrawing && lastNodeIsPortal && portal) {
               // If we stopped drawing at a portal, highlight its sister!
               if (portal.groupId === lastNodeIsPortal.groupId && !coordsEqual(portal, lastNodeIsPortal)) {
                 isSisterPortal = true;
               }
            }

            return (
              <div
                key={`${x}-${y}`}
                className={`
                  relative flex items-center justify-center rounded-lg border
                  transition-all duration-300
                  ${obstacle ? 'bg-slate-200 border-slate-300' : 'bg-white border-slate-200 shadow-sm'}
                  ${inPath ? 'bg-sky-50 border-sky-200' : inHint ? 'bg-yellow-50 border-yellow-200 ring-1 ring-yellow-400' : 'hover:bg-slate-50'}
                  ${isValidNext ? 'ring-2 ring-sky-400 bg-sky-100 shadow-[inset_0_0_10px_rgba(56,189,248,0.2)]' : ''}
                  ${isSisterPortal ? 'ring-4 ring-sky-400 z-30 animate-pulse scale-105' : ''}
                  cursor-pointer
                `}
                onPointerDown={() => handlePointerDown(coord)}
                onPointerEnter={() => handlePointerEnter(coord)}
              >
                {obstacle && (
                  <div className="absolute inset-0 opacity-20 pointer-events-none rounded-lg" 
                       style={{
                         backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #94a3b8 5px, #94a3b8 10px)'
                       }}
                  />
                )}
                
                {oneWay && !obstacle && !isCheckPoint && !portal && renderOneWayIcon(oneWay, inPath, inHint)}
                
                {portal && !obstacle && !isCheckPoint && (
                  <div 
                    className={`w-8 h-8 rounded-full z-20 transition-all duration-500 border-2 border-white shadow-md ${inPath || isSisterPortal ? 'animate-pulse scale-110' : ''}`}
                    style={{ 
                      backgroundColor: portal.color, 
                      opacity: inPath || isSisterPortal || inHint ? 1 : 0.7
                    }}
                  />
                )}

                {isCheckPoint && (
                  <div className={`
                    w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl z-20 shadow-sm
                    ${inPath ? 'bg-sky-500 text-white border-2 border-sky-600' : inHint ? 'bg-yellow-500 text-white border-2 border-yellow-600' : 'bg-slate-100 text-slate-500 border-2 border-slate-300'}
                    transition-all duration-300
                  `}>
                    {cpIndex + 1}
                  </div>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
}
