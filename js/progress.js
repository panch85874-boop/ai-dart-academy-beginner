(function () {
  "use strict";

  const STORAGE_KEY = "ai-dart-academy-beginner-progress-v1";
  const fallback = {
    lastLevel: 1,
    soundEnabled: true,
    scores: {},
    completed: {},
    badges: {}
  };

  function load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(fallback);
      return Object.assign(structuredClone(fallback), JSON.parse(raw));
    } catch (error) {
      console.warn("無法讀取進度，改用空白進度。", error);
      return structuredClone(fallback);
    }
  }

  function save(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setSound(enabled) {
    const state = load();
    state.soundEnabled = Boolean(enabled);
    save(state);
    return state;
  }

  function saveLevelResult(level, score, passed) {
    const state = load();
    const previous = state.scores[level] || 0;
    state.scores[level] = Math.max(previous, score);
    state.lastLevel = Math.min(10, passed ? level + 1 : level);
    if (passed) {
      state.completed[level] = true;
      state.badges[level] = true;
    }
    save(state);
    return state;
  }

  window.ProgressStore = {
    load,
    save,
    setSound,
    saveLevelResult,
    STORAGE_KEY
  };
})();