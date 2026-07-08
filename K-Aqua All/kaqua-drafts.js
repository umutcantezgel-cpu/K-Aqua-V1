// K-Aqua — draft persistence for forms (localStorage). Plain JS, loads before views.
// useDraft(key, initial): drop-in useState replacement that survives reloads.
(function () {
  function useDraft(key, initial) {
    var K = 'kaqua-draft-' + key;
    var pair = React.useState(function () {
      try {
        var s = localStorage.getItem(K);
        if (!s) return initial;
        var parsed = JSON.parse(s);
        if (Array.isArray(initial)) return Array.isArray(parsed) ? parsed : initial;
        if (initial && typeof initial === 'object') return Object.assign({}, initial, parsed);
        return parsed == null ? initial : parsed;
      } catch (e) { return initial; }
    });
    React.useEffect(function () {
      try { localStorage.setItem(K, JSON.stringify(pair[0])); } catch (e) {}
    }, [pair[0]]);
    return pair;
  }
  function clearDraft(keys) {
    (Array.isArray(keys) ? keys : [keys]).forEach(function (k) {
      try { localStorage.removeItem('kaqua-draft-' + k); } catch (e) {}
    });
  }
  window.useDraft = useDraft;
  window.clearDraft = clearDraft;
})();
