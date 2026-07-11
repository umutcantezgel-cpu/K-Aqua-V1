/* eslint-disable react/jsx-no-literals */
"use client";

import React, { useState, useEffect } from 'react';
import { Undo2, RotateCcw, ArrowLeft, Flame, Star, Sparkles, Lightbulb, Info, X } from 'lucide-react';
import { ZIP_LEVELS, Coord } from '../../lib/zip-levels';
import { useZipGame } from '../../hooks/useZipGame';
import ZipGrid from './ZipGrid';
import { useRouter } from 'next/navigation';

export default function ZipGameClient() {
  const router = useRouter();
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [hasMounted, setHasMounted] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [earnedStars, setEarnedStars] = useState<number>(3);
  const [streak, setStreak] = useState<number>(0);
  
  // Hint State
  const [hintPath, setHintPath] = useState<Coord[]>([]);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  // Load progress and streak from localStorage
  useEffect(() => {
    setHasMounted(true);
    
    // Auto-show instructions for first timers
    if (!localStorage.getItem('kaqua_zip_played_before')) {
      setShowInstructions(true);
      localStorage.setItem('kaqua_zip_played_before', 'true');
    }

    const savedLevel = localStorage.getItem('kaqua_zip_level');
    if (savedLevel) {
      const parsed = parseInt(savedLevel, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= ZIP_LEVELS.length) {
        setCurrentLevelId(parsed);
      }
    }

    const savedStreak = parseInt(localStorage.getItem('kaqua_zip_streak') || '0', 10);
    setStreak(isNaN(savedStreak) ? 0 : savedStreak);
  }, []);

  const updateStreakOnWin = () => {
    const today = new Date().toISOString().split('T')[0]!;
    const lastPlayed = localStorage.getItem('kaqua_zip_last_played');
    
    if (lastPlayed !== today) {
      let newStreak = 1;
      if (lastPlayed) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0]!;
        if (lastPlayed === yesterdayStr) {
          newStreak = streak + 1;
        }
      }
      setStreak(newStreak);
      localStorage.setItem('kaqua_zip_last_played', today);
      localStorage.setItem('kaqua_zip_streak', newStreak.toString());
    }
  };

  const currentLevel = ZIP_LEVELS.find(l => l.id === currentLevelId) || ZIP_LEVELS[0]!;

  const handleWin = (undos: number, finalTime: number) => {
    let stars = 3;
    if (undos > 0 && undos <= 3) stars = 2;
    if (undos > 3) stars = 1;
    
    setEarnedStars(stars);
    updateStreakOnWin();
    
    // Save best time
    if (bestMs === null || finalTime < bestMs) {
      localStorage.setItem(`kaqua_zip_best_${currentLevelId}`, finalTime.toString());
      setBestMs(finalTime);
    }

    setShowVictory(true);
    setIsPlaying(false);

    // Auto-advance after animation
    setTimeout(() => {
      nextLevel();
    }, 2800);
  };

  const [incompleteWarning, setIncompleteWarning] = useState<boolean>(false);
  
  const handleIncomplete = () => {
    setIncompleteWarning(true);
    setTimeout(() => setIncompleteWarning(false), 2000);
  };

  const gameHook = useZipGame(currentLevel, (undos) => handleWin(undos, elapsedMs), handleIncomplete);
  const { undo, reset, path } = gameHook;
  
  // Timer State
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [bestMs, setBestMs] = useState<number | null>(null);

  // Load best time
  useEffect(() => {
    const savedBest = localStorage.getItem(`kaqua_zip_best_${currentLevelId}`);
    if (savedBest) {
      setBestMs(parseInt(savedBest, 10));
    } else {
      setBestMs(null);
    }
  }, [currentLevelId]);

  // Start timer on first move
  useEffect(() => {
    if (path.length === 1 && !isPlaying && !showVictory) {
      setIsPlaying(true);
      setElapsedMs(0);
    }
    if (path.length === 0) {
      setIsPlaying(false);
      setElapsedMs(0);
    }
  }, [path.length, isPlaying, showVictory]);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !showVictory) {
      const startTime = Date.now() - elapsedMs;
      interval = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showVictory, elapsedMs]);
  
  // Custom reset that also resets timer
  const handleReset = () => {
    reset();
    setIsPlaying(false);
    setElapsedMs(0);
  };
  
  // Reset hint when path changes
  useEffect(() => {
    setHintPath([]);
    setHintMessage(null);
  }, [path]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    const msStr = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${m}:${s}.${msStr}`;
  };

  const handleHint = () => {
    if (!currentLevel.solution) {
      setHintMessage("Für dieses Level gibt es leider keinen Tipp.");
      return;
    }
    
    // Check if current path matches solution prefix
    let onPath = true;
    for (let i = 0; i < path.length; i++) {
       const p = path[i];
       const s = currentLevel.solution[i];
       if (!s || !p || p.x !== s.x || p.y !== s.y) {
         onPath = false;
         break;
       }
    }

    if (!onPath) {
      setHintMessage("Du bist auf dem falschen Weg. Nutze 'Undo'!");
    } else {
      setHintMessage(null);
      const nextSteps = currentLevel.solution.slice(path.length, path.length + 3);
      setHintPath(nextSteps);
    }
  };

  const nextLevel = () => {
    setCurrentLevelId(prevId => {
      const nextId = prevId + 1;
      if (nextId <= ZIP_LEVELS.length) {
        localStorage.setItem('kaqua_zip_level', nextId.toString());
        return nextId;
      } else {
        localStorage.setItem('kaqua_zip_level', '1');
        return 1;
      }
    });
    setShowVictory(false);
  };

  if (!hasMounted) return null;

  const isGameComplete = currentLevelId === ZIP_LEVELS.length && showVictory;

  return (
    <div className="min-h-[100dvh] w-full bg-slate-50 text-slate-900 flex flex-col items-center pt-8 pb-16 px-4 font-sans relative overflow-hidden overscroll-none touch-pan-y">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-2xl bg-sky-400/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-lg flex flex-col gap-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium hidden sm:inline">{"Zurück"}</span>
          </button>
          
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-sky-600 uppercase tracking-widest">
                {"Z I P"}
              </h1>
              {streak > 0 && (
                <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold border border-orange-200">
                  <Flame size={12} fill="currentColor" className="animate-pulse" />
                  {streak}
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              {"Level "} {currentLevelId} <span className="opacity-50">/ {ZIP_LEVELS.length}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setShowInstructions(true)}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all active:scale-95 shadow-sm"
              aria-label="Info"
            >
              <Info size={20} />
            </button>
            <button 
              onClick={handleHint}
              className="p-2 rounded-lg bg-white border border-slate-200 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 transition-all active:scale-95 shadow-sm"
              aria-label="Tipp"
            >
              <Lightbulb size={20} />
            </button>
            <button 
              onClick={undo}
              disabled={path.length === 0}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-white transition-all active:scale-95 shadow-sm relative"
              aria-label="Undo"
            >
              <Undo2 size={20} />
            </button>
            <button 
              onClick={handleReset}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all active:scale-95 shadow-sm"
              aria-label="Restart"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
        
        {/* Timer Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">{"Zeit"}</span>
            <span className="font-mono text-lg font-bold text-sky-600 w-24 inline-block text-right tabular-nums">
              {formatTime(elapsedMs)}
            </span>
          </div>
          {bestMs !== null && (
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">{"Best"}</span>
              <span className="font-mono font-semibold w-20 inline-block text-right tabular-nums">{formatTime(bestMs)}</span>
            </div>
          )}
        </div>
      </header>

      {/* Game Grid */}
      <main className="w-full max-w-lg flex-1 flex flex-col items-center justify-center z-10">
        <ZipGrid level={currentLevel} gameState={{ ...gameHook }} hintPath={hintPath} />
        
        <div className="mt-6 w-full h-16 flex flex-col items-center">
          {hintMessage && (
            <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm font-medium text-center text-yellow-800 animate-in fade-in slide-in-from-bottom-2 w-full shadow-sm">
              <span className="font-bold mr-1">{"Tipp:"}</span> {hintMessage}
            </div>
          )}
          
          {incompleteWarning && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm font-bold text-center text-red-600 animate-in fade-in zoom-in w-full shadow-sm">
              {"Fast! Du musst aber ALLE leeren Felder füllen!"}
            </div>
          )}
        </div>
      </main>

      {/* Footer Instructions */}
      <div className="mt-12 text-center text-slate-500 font-medium text-sm max-w-xs z-10">
        <p>{"Klicke auf das "}{<Info size={14} className="inline mb-1" />}{" Icon für die Spielanleitung."}</p>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-8 w-full max-w-sm relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowInstructions(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black text-sky-600 mb-4 uppercase tracking-wider">{"So geht's!"}</h2>
            
            <div className="space-y-4 text-slate-600 font-medium text-sm">
              <p>
                <strong className="text-slate-800">{"1. Zahlen verbinden:"}</strong><br/>
                {"Starte bei der "}<span className="inline-block px-2 py-0.5 bg-sky-500 text-white rounded text-xs font-bold mx-1">{"1"}</span>{" und verbinde alle Zahlen in der richtigen Reihenfolge bis zum Ziel."}
              </p>
              <p>
                <strong className="text-slate-800">{"2. Raster füllen (IQ-Test):"}</strong><br/>
                {"Um ein Level abzuschließen, musst du "}<strong className="text-red-500">{"JEDES einzelne leere Feld"}</strong>{" des Rasters mit deinem Rohr ausfüllen!"}
              </p>
              <p>
                <strong className="text-slate-800">{"3. Einbahnstraßen:"}</strong><br/>
                {"Pfeile auf dem Spielfeld zwingen dich, in die angegebene Richtung zu gehen."}
              </p>
              <p>
                <strong className="text-slate-800">{"4. Portale:"}</strong><br/>
                {"Führt dein Weg in ein Portal (z.B. rot), musst du den Finger anheben und am anderen roten Portal weiterzeichnen!"}
              </p>
            </div>
            
            <button 
              onClick={() => setShowInstructions(false)}
              className="mt-8 w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] transition-all active:scale-95"
            >
              {"Verstanden!"}
            </button>
          </div>
        </div>
      )}

      {/* Victory Fullscreen Overlay */}
      {showVictory && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm animate-in fade-in duration-500" />
          
          <div className="relative flex flex-col items-center justify-center z-10 animate-in zoom-in-50 duration-[600ms] delay-100 ease-out fill-mode-both">
            {/* Stars Explosion */}
            <div className="flex gap-4 mb-4">
              {[1, 2, 3].map((star) => (
                <div 
                  key={star} 
                  className={`transition-all duration-700 ease-out delay-[${star * 200}ms] ${star <= earnedStars ? 'scale-100 opacity-100' : 'scale-50 opacity-20'}`}
                >
                  <Star 
                    size={64} 
                    className={star <= earnedStars ? "text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,1)]" : "text-slate-300"} 
                    fill={star <= earnedStars ? "currentColor" : "none"} 
                  />
                </div>
              ))}
            </div>

            {/* Victory Text */}
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-blue-700 drop-shadow-xl -rotate-3 scale-110 mb-6">
              {isGameComplete ? "ALL CLEARED!" : "CLEARED!"}
            </h2>
            
            {/* Time Stats */}
            <div className="flex flex-col items-center gap-1 bg-white p-4 rounded-2xl border border-slate-200 mb-8 shadow-2xl">
              <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">{"Zeit"}</p>
              <p className="font-mono text-3xl font-black text-sky-600">
                {formatTime(elapsedMs)}
              </p>
              {bestMs !== null && elapsedMs <= bestMs && elapsedMs > 0 && (
                <div className="mt-2 text-xs font-bold bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full border border-yellow-200 animate-pulse">
                  {"NEUER REKORD!"}
                </div>
              )}
            </div>
            
            {/* Sparkles */}
            <Sparkles size={48} className="absolute -top-10 -right-10 text-yellow-400 animate-pulse drop-shadow-md" />
            <Sparkles size={32} className="absolute -bottom-4 -left-8 text-sky-400 animate-pulse drop-shadow-md" style={{ animationDelay: '0.3s' }} />

            <div className="px-6 py-2 bg-slate-100 border border-slate-200 rounded-full animate-bounce mt-4 shadow-sm">
              <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                {isGameComplete ? "Restarting..." : "Loading Next Level..."}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
