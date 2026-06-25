(function () {
  "use strict";

  function render(container, item, onAnswer) {
    let selected = [];
    container.innerHTML = "";

    const bank = document.createElement("div");
    bank.className = "puzzle-bank";
    const answerBox = document.createElement("div");
    answerBox.className = "puzzle-answer";
    const check = document.createElement("button");
    check.type = "button";
    check.className = "primary-action";
    check.textContent = "檢查拼圖";

    function drawAnswer() {
      answerBox.innerHTML = "";
      selected.forEach((text) => {
        const slot = document.createElement("span");
        slot.className = "answer-slot";
        slot.textContent = text;
        answerBox.appendChild(slot);
      });
    }

    item.options.forEach((option) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "puzzle-chip";
      chip.textContent = option;
      chip.addEventListener("click", () => {
        if (chip.classList.contains("selected")) return;
        chip.classList.add("selected");
        selected.push(option);
        drawAnswer();
      });
      bank.appendChild(chip);
    });

    check.addEventListener("click", () => {
      const correct = selected.length === item.answer.length && selected.every((part, index) => part === item.answer[index]);
      onAnswer(correct, selected.slice(), () => {
        selected = [];
        container.querySelectorAll(".puzzle-chip").forEach((chip) => chip.classList.remove("selected"));
        drawAnswer();
      });
    });

    container.appendChild(bank);
    container.appendChild(answerBox);
    container.appendChild(check);
  }

  window.PromptPuzzle = {
    render
  };
})();