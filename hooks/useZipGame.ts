import { useState, useCallback, useEffect } from 'react';
import { ZipLevel, Coord, OneWay, Portal } from '../lib/zip-levels';

function coordsEqual(a: Coord, b: Coord) {
  return a.x === b.x && a.y === b.y;
}

export function useZipGame(level: ZipLevel, onWin: (undoCount: number) => void, onIncomplete?: () => void) {
  const [path, setPath] = useState<Coord[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoCount, setUndoCount] = useState(0);

  // Reset path when level changes
  useEffect(() => {
    setPath([]);
    setIsDrawing(false);
    setUndoCount(0);
  }, [level]);

  // Check if a tile is an obstacle
  const isObstacle = useCallback((c: Coord) => {
    return level.obstacles.some(obs => coordsEqual(obs, c));
  }, [level]);

  // Find if a tile is a oneWay, return it
  const getOneWay = useCallback((c: Coord) => {
    return level.oneWays?.find(ow => coordsEqual(ow, c));
  }, [level]);

  // Find if a tile is a portal
  const getPortal = useCallback((c: Coord) => {
    return level.portals?.find(p => coordsEqual(p, c));
  }, [level]);

  // Find sister portal
  const getSisterPortal = useCallback((portal: Portal) => {
    return level.portals?.find(p => p.groupId === portal.groupId && !coordsEqual(p, portal));
  }, [level]);

  // Find if a tile is a checkpoint, and return its index (0-based)
  const getCheckpointIndex = useCallback((c: Coord) => {
    return level.checkpoints.findIndex(cp => coordsEqual(cp, c));
  }, [level]);

  const isDirectionValid = useCallback((from: Coord, to: Coord, direction: string) => {
    if (direction === 'up') return to.y < from.y;
    if (direction === 'down') return to.y > from.y;
    if (direction === 'left') return to.x < from.x;
    if (direction === 'right') return to.x > from.x;
    return true;
  }, []);

  const isValidMove = useCallback((from: Coord, to: Coord) => {
    const fromOneWay = getOneWay(from);
    if (fromOneWay && !isDirectionValid(from, to, fromOneWay.direction)) {
      return false;
    }
    
    const toOneWay = getOneWay(to);
    if (toOneWay && !isDirectionValid(from, to, toOneWay.direction)) {
      return false;
    }

    return true;
  }, [getOneWay, isDirectionValid]);

  // Verify the entire path is valid so far (checkpoints hit in correct order)
  const isPathValid = useCallback((currentPath: Coord[]) => {
    let nextCheckpointIndex = 0;
    
    // Must start at checkpoint 0
    if (currentPath.length > 0 && !coordsEqual(currentPath[0]!, level.checkpoints[0]!)) {
      return false;
    }

    for (const p of currentPath) {
      const cpIndex = getCheckpointIndex(p);
      if (cpIndex !== -1) {
        if (cpIndex !== nextCheckpointIndex) {
          // Hit a checkpoint out of order
          return false;
        }
        nextCheckpointIndex++;
      }
    }
    return true;
  }, [level, getCheckpointIndex]);

  // Check victory condition
  useEffect(() => {
    if (path.length === 0) return;
    
    // Check if path ends at the last checkpoint
    const lastNode = path[path.length - 1]!;
    const finalCp = level.checkpoints[level.checkpoints.length - 1]!;
    
    if (coordsEqual(lastNode, finalCp)) {
      // Ensure all checkpoints were visited in order
      let cpVisited = 0;
      for (const p of path) {
         if (getCheckpointIndex(p) === cpVisited) cpVisited++;
      }
      
      if (cpVisited === level.checkpoints.length) {
        const targetLength = level.width * level.height - level.obstacles.length;
        if (path.length === targetLength) {
          onWin(undoCount);
        } else {
          if (onIncomplete) onIncomplete();
        }
      }
    }
  }, [path, level, getCheckpointIndex, onWin, undoCount]);

  const handlePointerDown = (c: Coord) => {
    // Only allow starting if the path is empty and we click the first checkpoint
    if (path.length === 0) {
      if (coordsEqual(c, level.checkpoints[0]!)) {
        setPath([c]);
        setIsDrawing(true);
      }
    } else {
      const last = path[path.length - 1]!;
      if (coordsEqual(last, c)) {
        setIsDrawing(true);
      } else {
        const index = path.findIndex(p => coordsEqual(p, c));
        if (index !== -1) {
          setPath(path.slice(0, index + 1));
          setIsDrawing(true);
        } else {
          // PORTAL RESUME LOGIC
          const lastPortal = getPortal(last);
          if (lastPortal) {
            const sister = getSisterPortal(lastPortal);
            if (sister && coordsEqual(c, sister)) {
              // Valid teleport! Append the sister portal to path.
              const newPath = [...path, c];
              if (isPathValid(newPath)) {
                setPath(newPath);
                setIsDrawing(true);
              }
              return; // Exit early
            }
          }

          // Clicked empty space, if it's adjacent to last, move there
          const isAdjacent = Math.abs(last.x - c.x) + Math.abs(last.y - c.y) === 1;
          if (isAdjacent && !isObstacle(c) && isValidMove(last, c)) {
            const newPath = [...path, c];
            if (isPathValid(newPath)) {
              setPath(newPath);
              setIsDrawing(true);
            }
          }
        }
      }
    }
  };

  const handlePointerEnter = (c: Coord) => {
    if (!isDrawing) return;
    if (path.length === 0) return;

    const last = path[path.length - 1]!;
    
    // If entered the previous tile, truncate (backtrack)
    if (path.length >= 2 && coordsEqual(c, path[path.length - 2]!)) {
      setPath(path.slice(0, path.length - 1));
      return;
    }

    // If entered a tile already in path, truncate to that tile
    const existingIndex = path.findIndex(p => coordsEqual(p, c));
    if (existingIndex !== -1) {
      setPath(path.slice(0, existingIndex + 1));
      return;
    }

    // Move to new adjacent tile
    const isAdjacent = Math.abs(last.x - c.x) + Math.abs(last.y - c.y) === 1;
    if (isAdjacent && !isObstacle(c) && isValidMove(last, c)) {
      const newPath = [...path, c];
      if (isPathValid(newPath)) {
        setPath(newPath);
      }
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const undo = () => {
    if (path.length > 1) {
      setPath(path.slice(0, path.length - 1));
      setUndoCount(prev => prev + 1);
    } else if (path.length === 1) {
      setPath([]);
      setUndoCount(prev => prev + 1);
    }
  };

  const reset = () => {
    setPath([]);
    setUndoCount(prev => prev + 1);
  };

  return {
    path,
    isDrawing,
    handlePointerDown,
    handlePointerEnter,
    handlePointerUp,
    undo,
    reset,
    undoCount,
    isObstacle,
    getOneWay,
    getPortal,
    getCheckpointIndex,
    isValidMove
  };
}
