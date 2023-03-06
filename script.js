//bindings
//player chooses element.
const chooseXO = document.querySelectorAll(".choose");
//The player chooses the game mode.
const chooseMode = document.querySelectorAll(".mode-button");
//game modes pages.
const homePage = document.querySelector(".newgame");
const boardGame = document.querySelector(".game-board");
//restart-game
const restart = document.querySelector('.restart-game');


let player1;
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
//დასასრულებელია!!!!!!!!!!!!!!!!!!!!!!!!
const startGame = (gamemode) => {
    homePage.style.display = "none";
    if(gamemode === "vscpu"){
        boardGame.style.display = "block";
    }
}



//restart game 
const restartGame = () => {
    restart.style.display = ('flex');
}


// choose quit or restart 
//დასასრულებელია!!!!!!!!!!!!!!!!!!!!!!!!
const quitOrRestart = (x) => {
    if (x==='quit'){
        homePage.style.display = "flex";
        boardGame.style.display = "none";
        restart.style.display = ('none');
    } else{
        homePage.style.display = "none";
        boardGame.style.display = "flex";
        restart.style.display = ('none');
        //-----------------------------------------
    }
}





