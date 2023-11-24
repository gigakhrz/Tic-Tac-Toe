//player chooses element.
const chooseXO = document.querySelectorAll(".choose");
//The player chooses the game mode.
const chooseMode = document.querySelector(".mode-button");
//game modes pages.
const homePage = document.querySelector(".newgame");
const boardGame = document.querySelector(".game-board");
//restart-game
const restart = document.querySelector(".reset");
const restartDiv = document.querySelector(".restart-game");
const noCancel = document.querySelector(".no-cancel");
const yesRestart = document.querySelector(".yes-restart");
//turn
const turnO = document.querySelector(".o-o");
const turnX = document.querySelector(".x");
//game boxes
const gameBox = document.querySelectorAll(".game-box");
// show result
const player1Win = document.querySelector(".player-1x-win");
const player2Win = document.querySelector(".player-2o-win");
const roundTied = document.querySelector(".round-tied");
//result buttons
const quit = document.querySelectorAll(".quit");
const nextRound = document.querySelectorAll(".next-round");

//for background
const background = document.querySelector(".background");

//score divs
const playerX = document.querySelector(".your-score");
const playerO = document.querySelector(".cpu-score");
const ties = document.querySelector(".ties");

//logo svg.
const logo = document.getElementById("main-menu");

let freeButons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
let turn = "x";
let player1;
let winnigCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//winning counts
let countX = 0;
let countO = 0;
let countTied = 0;

//player chooses element.
const chooseElement = (icon) => {
  if (icon === "x") {
    chooseXO[0].classList.add("active");
    chooseXO[1].classList.remove("active");
    player1 = "x";
  } else {
    chooseXO[1].classList.add("active");
    chooseXO[0].classList.remove("active");
    player1 = "o";
  }
};

const startGame = () => {
  chooseMode.addEventListener("click", () => {
    homePage.style.display = "none";
    boardGame.style.display = "flex";
    differentPlayer();
  });
};

const differentPlayer = () => {
  if (player1 === "x") {
    playerX.firstElementChild.textContent = "X (P1)";
    playerO.firstElementChild.textContent = "O (P2)";
    player1Win.firstElementChild.textContent = "PLAYER 1 WINS!";
    player2Win.firstElementChild.textContent = "PLAYER 2 WINS!";
  } else if (player1 === "o") {
    playerX.firstElementChild.textContent = "X (P2)";
    playerO.firstElementChild.textContent = "O (P1)";
    player1Win.firstElementChild.textContent = "PLAYER 2 WINS!";
    player2Win.firstElementChild.textContent = "PLAYER 1 WINS!";
  } else {
    homePage.style.display = "flex";
    boardGame.style.display = "none";
  }
};

//restart Game
const restartGame = () => {
  restart.addEventListener("click", () => {
    restartDiv.style.display = "flex";
  });

  noCancel.addEventListener("click", () => {
    restartDiv.style.display = "none";
  });

  yesRestart.addEventListener("click", () => {
    restartDiv.style.display = "none";
    countO = 0;
    countX = 0;
    countTied = 0;
    playerX.lastElementChild.textContent = countX;
    playerO.lastElementChild.textContent = countO;
    ties.lastElementChild.textContent = countTied;
    for (let index = 0; index < gameBox.length; index++) {
      if (gameBox[index].hasChildNodes()) {
        newGame();
        gameBox[index].innerHTML = "";
      }
    }
  });
};

// hover on div

const hoverOnBox = () => {
  for (let i = 0; i < freeButons.length; i++) {
    const boxIndex = freeButons[i];
    if (turn === "x") {
      gameBox[boxIndex].classList.add("xhover");
      gameBox[boxIndex].classList.remove("ohover");
    } else {
      gameBox[boxIndex].classList.remove("xhover");
      gameBox[boxIndex].classList.add("ohover");
    }
  }
};

// add icons

const addClick = () => {
  for (let i = 0; i < gameBox.length; i++) {
    gameBox[i].onclick = (event) => {
      event.target.classList.remove("xhover");
      event.target.classList.remove("ohover");

      const gameBoxIndex = freeButons.indexOf(i);
      freeButons.splice(gameBoxIndex, 1);

      const icon = document.createElement("img");
      icon.classList.add("icons");

      if (turn === "x") {
        icon.src = "./assets/icon-x.svg";
        event.target.append(icon);
        xArray.push(i);
        turn = "o";
      } else {
        icon.src = "./assets/icon-o.svg";
        event.target.append(icon);
        oArray.push(i);
        turn = "x";
      }

      hoverOnBox();
      event.target.onclick = null;

      checkWinner();
      turnXO();
    };
  }
};

//It is used in the function addClick
const checkWinner = () => {
  for (let i = 0; i < winnigCombinations.length; i++) {
    if (
      xArray.includes(winnigCombinations[i][0]) &&
      xArray.includes(winnigCombinations[i][1]) &&
      xArray.includes(winnigCombinations[i][2])
    ) {
      player1Win.style.display = "flex";
      background.style.display = "flex";
      const [a, b, c] = winnigCombinations[i];

      gameBox[a].classList.add("x-winner-active");
      gameBox[b].classList.add("x-winner-active");
      gameBox[c].classList.add("x-winner-active");

      gameBox[a].innerHTML = "";
      gameBox[b].innerHTML = "";
      gameBox[c].innerHTML = "";

      countX++;
      return;
    } else if (
      oArray.includes(winnigCombinations[i][0]) &&
      oArray.includes(winnigCombinations[i][1]) &&
      oArray.includes(winnigCombinations[i][2])
    ) {
      player2Win.style.display = "flex";
      background.style.display = "flex";

      const [a, b, c] = winnigCombinations[i];

      gameBox[a].classList.add("o-winner-active");
      gameBox[b].classList.add("o-winner-active");
      gameBox[c].classList.add("o-winner-active");

      gameBox[a].innerHTML = "";
      gameBox[b].innerHTML = "";
      gameBox[c].innerHTML = "";

      countO++;
      return;
    }
  }

  if (freeButons.length === 0 && !checkTie()) {
    roundTied.style.display = "flex";
    background.style.display = "flex";
    countTied++;
  }
};

const checkTie = () => {
  for (let i = 0; i < winnigCombinations.length; i++) {
    if (
      xArray.includes(winnigCombinations[i][0]) &&
      xArray.includes(winnigCombinations[i][1]) &&
      xArray.includes(winnigCombinations[i][2])
    ) {
      return true;
    } else if (
      oArray.includes(winnigCombinations[i][0]) &&
      oArray.includes(winnigCombinations[i][1]) &&
      oArray.includes(winnigCombinations[i][2])
    ) {
      return true;
    }
  }
  return false;
};

const button = () => {
  for (let i = 0; i < quit.length; i++) {
    quit[i].addEventListener("click", () => {
      location.reload();
    });
  }

  for (let j = 0; j < nextRound.length; j++) {
    nextRound[j].addEventListener("click", () => {
      player1Win.style.display = "none";
      player2Win.style.display = "none";
      roundTied.style.display = "none";
      playerX.lastElementChild.textContent = countX;
      playerO.lastElementChild.textContent = countO;
      ties.lastElementChild.textContent = countTied;
      background.style.display = "none";

      for (let e = 0; e < gameBox.length; e++) {
        gameBox[e].classList.remove("o-winner-active");
        gameBox[e].classList.remove("x-winner-active");
      }

      turn = "x";
      turnXO();
      for (let index = 0; index < gameBox.length; index++) {
        if (gameBox[index].hasChildNodes()) {
          newGame();
          gameBox[index].innerHTML = "";
        }
      }
    });
  }
};
// when want next round
const newGame = () => {
  freeButons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xArray = [];
  oArray = [];
  turn = "x";
  hoverOnBox();
  addClick();
  turnXO();
};

const turnXO = () => {
  if (turn === "x") {
    turnX.style.display = "block";
    turnO.style.display = "none";
  } else {
    turnX.style.display = "none";
    turnO.style.display = "block";
  }
};

//when clicked will return main menu

logo.addEventListener("click", () => {
  location.reload();
});

// main functions
startGame();
restartGame();
hoverOnBox();
addClick();
button();
