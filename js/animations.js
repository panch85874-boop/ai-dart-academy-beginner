(function () {
  "use strict";

  function launchDart(success) {
    const dart = document.getElementById("animatedDart");
    const target = document.querySelector("#answerStage .target");
    if (!dart || !target) return;
    dart.classList.remove("hit", "miss");
    target.classList.remove("hit-flash");
    void dart.offsetWidth;
    dart.classList.add(success ? "hit" : "miss");
    if (success) {
      window.setTimeout(() => target.classList.add("hit-flash"), 360);
    }
  }

  function confetti() {
    const layer = document.getElementById("confettiLayer");
    if (!layer) return;
    layer.innerHTML = "";
    const colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#7b61ff"];
    for (let i = 0; i < 34; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 320}ms`;
      layer.appendChild(piece);
    }
  }

  window.AcademyAnimations = {
    launchDart,
    confetti
  };
})();