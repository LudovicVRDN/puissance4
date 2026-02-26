"use strict";
/*
Créer un jeu de puissance 4 jouable contre un friend ou contre un computer :
* Dans une modale ne donnant pas accès à la page principale demander à l'utilisateur son nom et sil joue avec un friend
* Demander le nom de l'friend.
* Afficher le plateau et les scores .
* Faire apparaitre au click sur une colonne le jeton de la couleur correspondante.
* Faire une animation faisant tombé le jeton.
* Vérifier si 4 jetons sont alignés à chaque coups.
* Si 4 Jetons sont alignés affiché une modale de victoire en grisant le fond.
* Proposer de jouer à nouveau.
* Ajouter la fonctionnalité du dark mode / light mode
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*-------------------------------Dark / Light mode side---------------------------- */
//Select HTML
const html = document.querySelector("html");
//Select button in HTML
const darkLightBtn = document.querySelector("#darkLight");
darkLightBtn.addEventListener("click", () => {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
        darkLightBtn.innerText = "Light Mode ";
    }
    else if (!html.classList.contains("dark")) {
        darkLightBtn.innerText = "Dark Mode ";
    }
});
const player1 = {
    namePlayer: "",
    playerTitle: document.querySelector('.playerTitle1')
};
const player2 = {
    namePlayer: "",
    playerTitle: document.querySelector('.playerTitle2')
};
//Select Btn in HTMl
const validateBtn = document.querySelector("#validate");
//Create playingMode 
let playingMode = "";
//Select fieldSet in HTML
const field = document.querySelector("fieldset");
//Select playForm
const playForm = document.querySelector('form');
//Select firstWindow
const popup = document.querySelector('#firstWindow');
//Select mainScreen
const main = document.querySelector('#mainScreen');
//Create function showAlertMessage
function showAlertMessage(message, Btn) {
    if (!document.querySelector(".alert")) // search if class alert already exists
     {
        const alert = document.createElement("p"); //Create new p element
        alert.innerText = `${message}`; // Add inner text
        alert.classList.add("text-red-600", "alert"); // Add class
        Btn.insertAdjacentElement("beforebegin", alert); //Insert in HTMl
    }
}
//ValidateBtn event Listener
validateBtn === null || validateBtn === void 0 ? void 0 : validateBtn.addEventListener("click", (e) => {
    e.preventDefault(); // No refresh
    //Select input with name = playerChoice
    const choice = document.querySelector('input[name = "playerChoice"]:checked');
    //If choice is not checked
    if (!choice) {
        const alertMessage = "Vous devez choisir contre qui jouer !";
        showAlertMessage(alertMessage, validateBtn);
        return;
    }
    //if choice is friend
    if (choice.value === "friend") {
        field.innerHTML = `
    <div class="flex flex-col gap-2 mb-4 text-white">
      <label for="playerName">Quel est ton nom ?</label>
      <input type="text" class="w-45 p-1 border rounded" id="playerName" required>

      <label for="friendName">Quel est le nom de ton adversaire ?</label>
      <input type="text" class="w-25 p-1 border rounded" id="friendName" required>
        <button type="submit" class="bg-gray-200 w-20 h-8 text-black m-5 text-xl beginGame">Ok</button>
    </div>
    `; // Create new innerHtml for field
    }
    //If choice is computer
    else if (choice.value === "computer") {
        field.innerHTML = ` 
    <div class="flex flex-col gap-2 mb-4 text-white">
      <label for="playerName">Quel est ton nom ?</label>
      <input type="text" class="w-45 p-1 border rounded" id="playerName" required>
      <button type="submit" class="bg-gray-200 w-20 h-8 text-black m-5 text-xl beginGame">Ok</button>
      `; // Create new innerHTMl for field
    }
    //Change playingMode Value
    playingMode = choice.value;
});
//field event Listener for beginGame Btn
playForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //select Input 
    const inputPlayer = document.querySelector('#playerName');
    const inputFriend = document.querySelector('#friendName');
    //create names 
    const namePlayer = (inputPlayer.value.trim()) || "player 1";
    const nameFriend = inputFriend ? inputFriend.value.trim() : "computer";
    //set inner text
    player1.playerTitle.innerText = `${namePlayer}`;
    player2.playerTitle.innerText = `${nameFriend}`;
    popup.classList.add('fade-out');
    setTimeout(() => {
        popup.classList.add('hidden');
        main.classList.remove('hidden');
        setTimeout(() => {
            main.classList.add('fade-in');
        }, 10);
    }, 400);
});
/*-------------------------------------Game Side----------------------------- */
//Select article and "jetons"
let colonnes = Array.from(document.querySelectorAll("article"));
let lignes = Array.from(document.querySelectorAll(".jetons"));
//Select score in HTML 
let victoryScore = document.querySelector(".victoire");
let lossScore = document.querySelector(".defaite");
let player2win = document.querySelector(".victoire_player2");
let player2loss = document.querySelector(".defaite_player2");
//Select validatePlayAgain
const playAgainBtn = document.querySelector('#validatePlayAgain');
//Create victory count
let victoryCount = 0;
let lossCount = 0;
let victoryCountJ2 = 0;
let lossCountJ2 = 0;
//select plateau in HTML
const playingBoard = document.querySelector(".plateau");
//Create isEnd 
let isEnd = false;
//Create div and article for change in HTMl
let div;
let article;
//Create null 2DArray
const playingArea = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];
//Create wait function 
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//Create function render
function render(player, colIndex, rowIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        //Create col for columns  
        const col = playingBoard.children[colIndex];
        //Create row 
        const cell = col.children[rowIndex];
        //Check row
        if (!cell)
            return;
        //add CSS class
        cell.classList.add("enter");
        if (player !== null) {
            yield wait(10);
            cell.classList.remove("enter");
            cell.classList.add(player);
        }
    });
}
//Create function for changePlayer 
function changePlayer() {
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
}
//Create function playerTurn
function playTurn(player, colonne) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check player value
        if (player === null)
            return;
        //check if row and col are free
        for (let ligne = 5; ligne >= 0; ligne--) {
            const currentRow = playingArea[ligne];
            if (currentRow && currentRow[colonne] === null) {
                currentRow[colonne] = player;
                //Call render
                yield render(player, colonne, ligne);
                //Wait for victory
                yield wait(300);
                checkVictory(player, colonne, ligne);
                return true;
            }
        }
        return false;
    });
}
//Create function aiTurn
function aiTurn(player) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check if ai Can play
        if (isEnd === true || playingMode !== "computer") {
            //CHANGE PLAYER
            return;
        }
        //Search emptycols and check for play in it 
        let emptyCols = [];
        for (let c = 0; c < 7; c++) {
            if (playingArea.some(ligne => ligne[c] === null)) {
                emptyCols.push(c);
            }
        }
        //Create randomIndex
        let randomIndex = Math.floor(Math.random() * emptyCols.length);
        //Create chosen col
        let chosenCol = emptyCols[randomIndex];
        yield playTurn(player, chosenCol);
    });
}
//Create function for count each tokens
function countTokens(player, column, row, x, y) {
    var _a;
    let count = 0;
    let r = row + y;
    let c = column + x;
    //While c and r still in the playing area & its the same player 
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && ((_a = playingArea[r]) === null || _a === void 0 ? void 0 : _a[c]) === player) {
        count++;
        r += y;
        c += x;
    }
    return count;
}
//Create function for checkVictory 
function checkVictory(player, column, row) {
    if (!player)
        return;
    const directions = [
        { x: 1, y: 0 }, // check align (<->)
        { x: 0, y: 1 }, // check align (|)
        { x: 1, y: 1 }, // check align (\)
        { x: 1, y: -1 } // check align (/)
    ];
    for (let { x, y } of directions) {
        let count = 1;
        //look left to right
        count += countTokens(player, column, row, x, y);
        //look right to left
        count += countTokens(player, column, row, -x, -y);
        //check if 4 is aligned
        if (count >= 4) {
            victory(player);
        }
    }
}
//Function victory
function victory(player) {
    isEnd = true;
    //If player1 Victory
    if (player === "player1") {
        victoryCount++;
        lossCountJ2++;
        victoryScore.innerText = `Victoires : ${victoryCount}`;
        player2loss.innerText = `Defaites : ${lossCountJ2}`;
        displayPopUp(player1.playerTitle.innerText);
    }
    //If player2 Victory
    else if (player === "player2") {
        alert("Victoire du player 2 !");
        victoryCountJ2++;
        lossCount++;
        player2win.innerText = `Victoires : ${victoryCountJ2}`;
        lossScore.innerText = `Défaites : ${lossCount}`;
        displayPopUp(player2.playerTitle.innerText);
    }
}
//function cleanBoard
function cleanBoard() {
    lignes.forEach(div => {
        div.classList.remove("player1", "player2", "enter");
    });
}
//Create playAgain
const playAgain = document.querySelector("#again");
//select playAgainTitle
const playAgainTitle = document.querySelector('.playAgainTitle');
//function displayPopup 
function displayPopUp(player) {
    return __awaiter(this, void 0, void 0, function* () {
        playAgain.classList.remove('hidden');
        playAgainTitle.innerText = `${player} a gagné ! On rejoue ?`;
    });
}
//Create resetGame
function resetGame() {
    const choice = document.querySelector('input[name = "playAgain"]:checked');
    if (!choice) {
        const alertMessage = "Vous devez choisir si vous voulez rejouer ou non !";
        showAlertMessage(alertMessage, playAgainBtn);
        return;
    }
    if (choice.value === 'oui')
        for (let ligne = 5; ligne >= 0; ligne--) {
            for (let colonne = 6; colonne >= 0; colonne--) {
                playingArea[ligne][colonne] = null;
            }
            isEnd = false;
            currentPlayer = 'player1';
            cleanBoard();
            playAgain.classList.add('hidden');
        }
    else {
        playAgain.innerHTML = `
        <p>Merci à ${player1.playerTitle.innerText} et à ${player2.playerTitle.innerText} on se revoit très vite pour la revanche ! 😉</p>
        <button id="refresh" class="bg-gray-200 w-35 h-15 text-black m-5 text-xl">Retour à l'accueil</button>
        `;
    }
}
let currentPlayer = "player1";
colonnes.forEach((col, colonne) => {
    col.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        // check if game is done
        if (isEnd === true)
            return;
        // Playing vs a friend
        if (playingMode === "friend") {
            // call async playTurn
            //Create hasPlayed for check if tokens in placed
            const hasPlayed = yield playTurn(currentPlayer, colonne);
            // Check isEnd true or false is it's not changePlayer
            if (hasPlayed && !isEnd) {
                changePlayer();
            }
            return;
        }
        // AI mode
        if (playingMode === "computer") {
            //Can't click if it's not player 1 turn
            if (currentPlayer !== "player1")
                return;
            //call playTurn for player
            const hasPlayed = yield playTurn(currentPlayer, colonne);
            //check isEnd is true or false
            if (hasPlayed && !isEnd) {
                //Change player
                changePlayer();
                //call wait 
                yield wait(800);
                // let AI play
                yield aiTurn('player2');
                //// Check isEnd true or false is it's not changePlayer
                if (!isEnd)
                    changePlayer();
            }
        }
    }));
});
//PlayAgainBtn eventListener
playAgainBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    resetGame();
}));
//PlayAgain eventListener
playAgain.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('#refresh')) {
        location.reload();
    }
});
