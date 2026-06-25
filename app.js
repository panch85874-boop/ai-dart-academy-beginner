(function () {
  "use strict";

  const PASS_SCORE = 12;
  const state = {
    level: 1,
    questions: [],
    index: 0,
    score: 0,
    hadWrongTry: false,
    currentAnswered: false
  };

  const el = {
    homeView: document.getElementById("homeView"),
    gameView: document.getElementById("gameView"),
    completeView: document.getElementById("completeView"),
    levelGrid: document.getElementById("levelGrid"),
    badgeGrid: document.getElementById("badgeGrid"),
    overallProgress: document.getElementById("overallProgress"),
    badgeCount: document.getElementById("badgeCount"),
    todayLevel: document.getElementById("todayLevel"),
    soundToggle: document.getElementById("soundToggle"),
    currentLevelLabel: document.getElementById("currentLevelLabel"),
    currentLevelTitle: document.getElementById("currentLevelTitle"),
    currentLevelGoal: document.getElementById("currentLevelGoal"),
    questionProgress: document.getElementById("questionProgress"),
    meterFill: document.getElementById("meterFill"),
    scoreNow: document.getElementById("scoreNow"),
    gameTypePill: document.getElementById("gameTypePill"),
    questionText: document.getElementById("questionText"),
    choiceArea: document.getElementById("choiceArea"),
    puzzleArea: document.getElementById("puzzleArea"),
    feedback: document.getElementById("feedback"),
    nextButton: document.getElementById("nextButton"),
    retryButton: document.getElementById("retryButton"),
    completeTitle: document.getElementById("completeTitle"),
    completeMessage: document.getElementById("completeMessage"),
    completeBadge: document.getElementById("completeBadge"),
    resultStars: document.getElementById("resultStars"),
    nextLevelButton: document.getElementById("nextLevelButton")
  };

  function meta(level) {
    return window.BEGINNER_LEVEL_META.find((item) => item.level === level);
  }

  function setView(name) {
    [el.homeView, el.gameView, el.completeView].forEach((view) => view.classList.remove("active"));
    el[name].classList.add("active");
  }

  function progress() {
    return window.ProgressStore.load();
  }

  function renderHome() {
    const saved = progress();
    const completedCount = Object.keys(saved.completed).length;
    el.overallProgress.textContent = `已完成 ${completedCount} / 10 關`;
    el.badgeCount.textContent = `${completedCount} / 10`;
    el.levelGrid.innerHTML = "";
    el.badgeGrid.innerHTML = "";

    window.BEGINNER_LEVEL_META.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "level-card";
      if (saved.completed[item.level]) button.classList.add("completed");
      if (saved.lastLevel === item.level) button.classList.add("current");
      const levelNumber = document.createElement("strong");
      levelNumber.textContent = `Level ${item.level}`;
      const levelTitle = document.createElement("span");
      levelTitle.textContent = item.title;
      const levelScore = document.createElement("span");
      const bestScore = Number(saved.scores[item.level]) || 0;
      levelScore.textContent = `最佳 ${bestScore} / 15`;
      button.append(levelNumber, levelTitle, levelScore);
      button.addEventListener("click", () => startLevel(item.level));
      el.levelGrid.appendChild(button);

      const badge = document.createElement("div");
      badge.className = `badge ${saved.badges[item.level] ? "on" : ""}`;
      badge.textContent = saved.badges[item.level] ? item.badge : `Level ${item.level}`;
      el.badgeGrid.appendChild(badge);
    });

    const recommendLevel = Math.min(10, saved.lastLevel || 1);
    const recommend = meta(recommendLevel);
    el.todayLevel.textContent = "";
    const todayTitle = document.createElement("strong");
    todayTitle.textContent = `Level ${recommend.level}：${recommend.title}`;
    const todayGoal = document.createElement("span");
    todayGoal.textContent = recommend.goal;
    el.todayLevel.append(todayTitle, document.createElement("br"), todayGoal);
    syncSoundButton();
  }

  function syncSoundButton() {
    const saved = progress();
    window.SpeechController.setEnabled(saved.soundEnabled);
    el.soundToggle.textContent = `聲音：${saved.soundEnabled ? "開" : "關"}`;
    el.soundToggle.setAttribute("aria-pressed", String(saved.soundEnabled));
  }

  function startLevel(level) {
    state.level = level;
    state.questions = window.BEGINNER_LEVELS.filter((item) => item.level === level);
    state.index = 0;
    state.score = 0;
    state.hadWrongTry = false;
    state.currentAnswered = false;
    const item = meta(level);
    el.currentLevelLabel.textContent = `Level ${level}`;
    el.currentLevelTitle.textContent = item.title;
    el.currentLevelGoal.textContent = item.goal;
    setView("gameView");
    speak(item.intro);
    renderQuestion();
  }

  function renderQuestion() {
    const item = state.questions[state.index];
    state.hadWrongTry = false;
    state.currentAnswered = false;
    el.feedback.textContent = "";
    el.feedback.className = "feedback";
    el.choiceArea.innerHTML = "";
    el.puzzleArea.innerHTML = "";
    el.nextButton.disabled = true;
    el.retryButton.disabled = false;

    el.questionText.textContent = item.question;
    el.gameTypePill.textContent = item.gameType === "dart" ? "射飛鏢選擇題" : "Prompt 拼圖";
    el.questionProgress.textContent = `第 ${state.index + 1} / ${state.questions.length} 題`;
    el.meterFill.style.width = `${(state.index / state.questions.length) * 100}%`;
    el.scoreNow.textContent = String(state.score);

    if (item.gameType === "dart") {
      window.DartGame.render(el.choiceArea, item, handleAnswer);
    } else {
      window.PromptPuzzle.render(el.puzzleArea, item, handlePuzzleAnswer);
    }
    speak(item.voiceText);
  }

  function handlePuzzleAnswer(correct, selected, reset) {
    handleAnswer(correct, selected.join(" / "), reset);
  }

  function handleAnswer(correct, selected, resetPuzzle) {
    const item = state.questions[state.index];
    window.AcademyAnimations.launchDart(correct);
    if (correct) {
      if (!state.hadWrongTry && !state.currentAnswered) state.score += 1;
      state.currentAnswered = true;
      el.scoreNow.textContent = String(state.score);
      el.feedback.textContent = `${item.rewardText} ${item.explanation}`;
      el.feedback.className = "feedback good";
      el.nextButton.disabled = false;
      if (item.gameType === "dart") window.DartGame.lock(el.choiceArea);
      speak(item.rewardText);
      return;
    }
    state.hadWrongTry = true;
    el.feedback.textContent = `先別急，再試一次。提示：${item.hint}`;
    el.feedback.className = "feedback try";
    if (item.gameType === "dart") window.DartGame.unlock(el.choiceArea);
    if (typeof resetPuzzle === "function") resetPuzzle();
    speak(`提示：${item.hint}`);
  }

  function nextQuestion() {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
      return;
    }
    finishLevel();
  }

  function finishLevel() {
    const passed = state.score >= PASS_SCORE;
    const item = meta(state.level);
    window.ProgressStore.saveLevelResult(state.level, state.score, passed);
    el.completeTitle.textContent = passed ? `${item.title} 過關！` : `${item.title} 已完成練習`;
    el.completeMessage.textContent = passed
      ? `你拿到「${item.badge}」徽章。第一次答對 ${state.score} 題，已達過關標準。`
      : `第一次答對 ${state.score} 題，還差一點。可以重新練習，目標是 12 題以上。`;
    el.completeBadge.textContent = passed ? "★" : "↻";
    el.resultStars.textContent = passed ? "★★★★★" : "★★★☆☆";
    el.nextLevelButton.disabled = !passed || state.level >= 10;
    setView("completeView");
    window.AcademyAnimations.confetti();
    speak(passed ? `恭喜完成 ${item.title}。你拿到徽章。` : "練習完成，重新挑戰會更穩。");
  }

  function speak(text) {
    window.SpeechController.speak(text);
  }

  document.getElementById("startButton").addEventListener("click", () => startLevel(progress().lastLevel || 1));
  document.getElementById("resumeButton").addEventListener("click", () => startLevel(progress().lastLevel || 1));
  document.getElementById("homeButton").addEventListener("click", () => { window.SpeechController.stop(); renderHome(); setView("homeView"); });
  document.getElementById("backToLevels").addEventListener("click", () => { window.SpeechController.stop(); renderHome(); setView("homeView"); });
  document.getElementById("completeHomeButton").addEventListener("click", () => { renderHome(); setView("homeView"); });
  document.getElementById("practiceAgainButton").addEventListener("click", () => startLevel(state.level));
  document.getElementById("nextLevelButton").addEventListener("click", () => startLevel(Math.min(10, state.level + 1)));
  document.getElementById("nextButton").addEventListener("click", nextQuestion);
  document.getElementById("retryButton").addEventListener("click", renderQuestion);
  document.getElementById("playLevelIntro").addEventListener("click", () => speak(meta(state.level).intro));
  document.getElementById("replayQuestion").addEventListener("click", () => speak(state.questions[state.index].voiceText));
  el.soundToggle.addEventListener("click", () => {
    const saved = progress();
    window.ProgressStore.setSound(!saved.soundEnabled);
    syncSoundButton();
  });

  renderHome();
})();