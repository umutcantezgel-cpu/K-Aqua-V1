/* K-Aqua CO2 Dashboard — fluid animation helpers: tween a single number or a
   whole set of chart series toward new target values (ease-out, timer-driven)
   whenever inputs change, instead of snapping instantly. Uses setTimeout
   rather than requestAnimationFrame — rAF gets throttled/paused in
   backgrounded or non-visible preview documents, which would freeze the
   animation entirely; setTimeout keeps ticking regardless. Plain hooks (no JSX). */
function useTweenedValue(target, duration) {
  duration = duration || 500;
  const [display, setDisplay] = React.useState(target);
  const ref = React.useRef({ timer: null, last: target });
  React.useEffect(function () {
    const from = ref.current.last;
    if (from === target) { setDisplay(target); return undefined; }
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
    return function () { clearTimeout(ref.current.timer); };
  }, [target, duration]);
  return display;
}

function useTweenedSeries(series, duration) {
  duration = duration || 500;
  const [display, setDisplay] = React.useState(series);
  const ref = React.useRef({ timer: null, lastValues: null });
  React.useEffect(function () {
    const targetValues = series.map(function (s) { return s.points.map(function (p) { return p.value; }); });
    const fromValues = ref.current.lastValues || targetValues;
    const startTime = Date.now();
    clearTimeout(ref.current.timer);
    function tick() {
      const t = Math.min(1, (Date.now() - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const values = series.map(function (s, si) {
        return s.points.map(function (p, pi) {
          const f = (fromValues[si] && fromValues[si][pi] != null) ? fromValues[si][pi] : targetValues[si][pi];
          return f + (targetValues[si][pi] - f) * eased;
        });
      });
      ref.current.lastValues = values;
      setDisplay(series.map(function (s, si) {
        return Object.assign({}, s, { points: s.points.map(function (p, pi) { return { year: p.year, value: values[si][pi] }; }) });
      }));
      if (t < 1) ref.current.timer = setTimeout(tick, 16);
    }
    tick();
    return function () { clearTimeout(ref.current.timer); };
  }, [series, duration]);
  return display;
}

Object.assign(window, { useTweenedValue, useTweenedSeries });
