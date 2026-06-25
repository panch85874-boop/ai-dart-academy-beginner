(function () {
  "use strict";

  function render(container, item, onAnswer) {
    container.innerHTML = "";
    item.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.textContent = option;
      button.addEventListener("click", () => {
        const correct = option === item.answer;
        button.classList.add(correct ? "correct" : "wrong");
        onAnswer(correct, option);
      });
      container.appendChild(button);
    });
  }

  function lock(container) {
    container.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
  }

  function unlock(container) {
    container.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
      button.classList.remove("wrong");
    });
  }

  window.DartGame = {
    render,
    lock,
    unlock
  };
})();