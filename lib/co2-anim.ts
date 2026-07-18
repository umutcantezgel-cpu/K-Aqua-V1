import { useState, useRef, useEffect } from 'react';

export function useTweenedValue(target: number, duration: number = 500) {
  const [display, setDisplay] = useState(target);
  const ref = useRef({ timer: null as any, last: target });
  
  useEffect(() => {
    const from = ref.current.last;
    if (from === target) { setDisplay(target); return; }
    const startTime = Date.now();
    clearTimeout(ref.current.timer);
    
    function tick() {
      const t = Math.min(1, (Date.now() - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = from + (target - from) * eased;
      ref.current.last = val;
      setDisplay(val);
      if (t < 1) ref.current.timer = setTimeout(tick, 16);
      else ref.current.last = target;
    }
    tick();
    return () => clearTimeout(ref.current.timer);
  }, [target, duration]);
  
  return display;
}

export function useTweenedSeries(series: any[], duration: number = 500) {
  const [display, setDisplay] = useState(series);
  const ref = useRef({ timer: null as any, lastValues: null as any });
  
  useEffect(() => {
    const targetValues = series.map((s) => s.points.map((p: any) => p.value));
    const fromValues = ref.current.lastValues || targetValues;
    const startTime = Date.now();
    clearTimeout(ref.current.timer);
    
    function tick() {
      const t = Math.min(1, (Date.now() - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const values = series.map((s, si) => {
        return s.points.map((p: any, pi: number) => {
          const f = (fromValues[si] && fromValues[si][pi] != null) ? fromValues[si][pi] : targetValues[si][pi];
          return f + (targetValues[si][pi] - f) * eased;
        });
      });
      ref.current.lastValues = values;
      setDisplay(series.map((s, si) => {
        return { ...s, points: s.points.map((p: any, pi: number) => ({ year: p.year, value: values[si][pi] })) };
      }));
      if (t < 1) ref.current.timer = setTimeout(tick, 16);
    }
    tick();
    return () => clearTimeout(ref.current.timer);
  }, [series, duration]);
  
  return display;
}
