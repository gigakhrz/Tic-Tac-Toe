//bindings
//player chooses element.
const chooseXO = document.querySelectorAll(".choose");
//The player chooses the game mode.
const chooseMode = document.querySelectorAll(".mode-button");
//game modes pages.
const homePage = document.querySelector(".newgame");
const boardGame = document.querySelector(".game-board");
//restart-game
const restart = document.querySelector('.reset');
const restartDiv = document.querySelector('.restart-game');
const noCancel = document.querySelector('.no-cancel');
const yesRestart = document.querySelector('.yes-restart');
//game boxes 
const gameBox = document.querySelectorAll('.game-box');
// show result 
const player1Win = document.querySelector('.player-1x-win');
const player2Win = document.querySelector('.player-2o-win');
const roundTied = document.querySelector('.round-tied');

//for background
const background = document.querySelector(".background");
console.log(background);

let freeButons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
let turn = 'x';
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
]

//player chooses element.
const chooseElement = (icon) => {
    if(icon === 'x'){
        chooseXO[0].classList.add("active");
        chooseXO[1].classList.remove("active");
        player1 = "x";
    }else {
        chooseXO[1].classList.add("active");
        chooseXO[0].classList.remove("active");
        player1 = "o";
    }
}

// The player chooses the game mode.
//დასასრულებელია
const startGame = (gamemode) => {
    homePage.style.display = "none";
    if(gamemode === "vscpu"){
        boardGame.style.display = "flex";
    }
}

//restart game 
const restartGame = () => {
    restart.addEventListener('click', () =>{
        restartDiv.style.display = "flex";
    })

    noCancel.addEventListener('click', () => {
        restartDiv.style.display = "none";
    })

    yesRestart.addEventListener('click', () => {
        restartDiv.style.display = "none";
    })
}

// hover on div

const hoverOnBox = () => {
    for (let i = 0; i < freeButons.length; i++) {
        const boxIndex = freeButons[i];
        if (turn ==='x'){
            gameBox[boxIndex].classList.add ('xhover')
            gameBox[boxIndex].classList.remove ('ohover')
        }else {
            gameBox[boxIndex].classList.remove ('xhover')
            gameBox[boxIndex].classList.add ('ohover')
        }
    }
}

// add icons 

const addClick = () => {
    for (let i = 0; i < gameBox.length; i++) {
        gameBox[i].onclick = (event) =>{
            event.target.classList.remove('xhover');
            event.target.classList.remove ('ohover');

            const gameBoxIndex = freeButons.indexOf(i);
            freeButons.splice(gameBoxIndex, 1);
            
            const icon = document.createElement('img');
            icon.classList.add('icons');
            
            if (turn === 'x') {
                icon.src = './assets/icon-x.svg';
                event.target.append(icon);
                xArray.push(i);
                turn = 'o';
            }else{
                icon.src = './assets/icon-o.svg';
                event.target.append(icon);
                oArray.push(i);
                turn = 'x';
            }
    
            hoverOnBox();
            event.target.onclick=null;

           checkWinner();
        }
    }
}

//It is used in the function addClick
const checkWinner = () => {
    for (let i = 0; i < winnigCombinations.length; i++) {
      const [a, b, c] = winnigCombinations[i];
      if (xArray.includes(a) && xArray.includes(b) && xArray.includes(c)) {
        player1Win.style.display = 'flex';

        gameBox[a].classList.add('x-winner-active');
        gameBox[b].classList.add('x-winner-active');
        gameBox[c].classList.add('x-winner-active');

        gameBox[a].innerHTML = "";
        gameBox[b].innerHTML = "";
        gameBox[c].innerHTML = "";

        background.style.display = 'flex';
        
      } else if(oArray.includes(a) && oArray.includes(b) && oArray.includes(c)){
        player2Win.style.display = 'flex';

        gameBox[a].classList.add('o-winner-active');
        gameBox[b].classList.add('o-winner-active');
        gameBox[c].classList.add('o-winner-active');

        gameBox[a].innerHTML = "";
        gameBox[b].innerHTML = "";
        gameBox[c].innerHTML = "";

        background.style.display = 'flex';

      }else if (freeButons.length === 0) {
        roundTied.style.display = 'flex';
        background.style.display = 'flex';
      }
    }
};
  
// main functions
restartGame();
hoverOnBox();
addClick();









