(function () {
  "use strict";

  const supported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  let enabled = true;

  function setEnabled(value) {
    enabled = Boolean(value);
    if (!enabled) stop();
  }

  function speak(text) {
    if (!enabled || !supported || !text) return false;
    stop();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-TW";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    return true;
  }

  function stop() {
    if (supported) window.speechSynthesis.cancel();
  }

  window.SpeechController = {
    supported,
    setEnabled,
    speak,
    stop
  };
})();