// score object //
const score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  tie: 0,
  loss: 0,
};
// score object //
// main game function

function playGame(playMove) {
  const computerMove = pickComputerMove();

  let result = "";

  // paper selected

  if (playMove === "paper") {
    if (computerMove === "paper") {
      result = "You Tie";
    } else if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "scissor") {
      result = "You Lose";
    }
  }
  // paper selected End

  // scissor selected
  else if (playMove === "scissor") {
    if (computerMove === "scissor") {
      result = "You Tie";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "rock") {
      result = "You Lose";
    }
    // scissor selected End

    // rock selected
  } else if (playMove === "rock") {
    if (computerMove === "rock") {
      result = "You Tie";
    } else if (computerMove === "scissor") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "You Lose";
    }
    // rock selected End
  }
  // check win or tie or loss in score mark //

  if (result === "You Tie") {
    score.tie += 1;
  } else if (result === "You win") {
    score.win += 1;
  } else if (result === "You Lose") {
    score.loss += 1;
  }
  //check win or tie loos in score mark //
  localStorage.setItem("score", JSON.stringify(score));
  const moveElement = document.querySelector(".js-display-move");
  moveElement.innerHTML = `You <img src= "/images/${playMove}-emoji.png"/ class ="move-icon">  <img src= "/images/${computerMove}-emoji.png"/ class ="move-icon"> Computer`;
  const resultElement = document.querySelector(".js-display-result");
  resultElement.innerHTML = `${result}`;
  const scoreElement = document.querySelector(".js-display-score");
  scoreElement.innerHTML = `win:${score.win}.Lose:${score.loss}.Tie:${score.tie}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "scissor";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "paper";
  }
  return computerMove;
}
// reset update //
function resetUpdate() {
  const scoreElement = document.querySelector(".js-display-score");
  scoreElement.innerHTML = `win:${score.win}.Lose:${score.loss}.Tie:${score.tie}`;
}
// auto play //
let isAutoPlaying = false;
let interValid;
function autoPlay() {
  if (!isAutoPlaying) {
    interValid = setInterval(function () {
      const playMove = pickComputerMove();
      playGame(playMove);
      isAutoPlaying = true;
    }, 1000);
  } else {
    clearInterval(interValid);
    isAutoPlaying = false;
  }
}
// different type of add Event Listenter //
// add event listenter click-> interaction //
const rockElement = document.querySelector(".js-rock-button");
rockElement.addEventListener("click", () => {
  playGame("rock");
});
const paperElement = document.querySelector(".js-paper-button");
paperElement.addEventListener("click", () => {
  playGame("paper");
});
const scissorElement = document.querySelector(".js-scissor-button");
scissorElement.addEventListener("click", () => {
  playGame("scissor");
});

// add Event listeneter keydown -> interaction //
// webpage is full access in body //
document.body.addEventListener("keydown", (event) => {
  // console.log("keydown");
  console.log(event.key);
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissor");
  } else if (event.key === "Backspace") {
    resetConfirmation();
  }
});
// auto play button use addListeners //
const autoPlayElement = document.querySelector(".js-auto-play-button");
console.log(autoPlayElement);
autoPlayElement.addEventListener("click", () => {
  autoPlay();
  if (autoPlayElement.innerHTML === "Auto play") {
    autoPlayElement.innerHTML = "Stop playing";
  } else {
    autoPlayElement.innerHTML = "Auto play";
  }
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();
  }
});
// Reset button use addEventListener //
const resetButtonElement = document.querySelector(".js-reset-score-button");
resetButtonElement.addEventListener("click", () => {
  resetConfirmation();
});
// reset score //
function resetScore() {
  score.win = 0;
  score.tie = 0;
  score.loss = 0;
  resetUpdate();
  localStorage.removeItem("score");
}
// reset confirmation //
function resetConfirmation() {
  const confirmation = document.querySelector(".js-reset-score-confirmation");
  confirmation.innerHTML = `Are you sure you want to reset the score ? <button class ="js-confirm-yes">Yes</button"><button class="js-confirm-no">No</button> `;

  document.querySelector(".js-confirm-yes").addEventListener("click", () => {
    resetScore();
    hideResetconfirmation();
  });
}
// hide the reset score confiremation method
function hideResetconfirmation() {
  document.querySelector(".js-reset-score-confirmation").innerHTML = "";
}
