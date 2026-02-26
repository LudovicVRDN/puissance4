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

/*-------------------------------Dark / Light mode side---------------------------- */
//Select HTML
const html = document.querySelector("html") as HTMLElement;
//Select button in HTML
const darkLightBtn = document.querySelector("#darkLight") as HTMLButtonElement;

darkLightBtn.addEventListener("click", () => {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
        darkLightBtn.innerText = "Light Mode ";
    } else if (!html.classList.contains("dark")) {
        darkLightBtn.innerText = "Dark Mode ";
    }
});

/*-----------------Get user's answer and display the main screen-----------------*/
//Create player object
interface IplayerInfo {
    namePlayer : string
    playerTitle : HTMLHeadingElement
}

const player1 :IplayerInfo = {
    namePlayer : "",
    playerTitle : document.querySelector('.playerTitle1') as HTMLHeadingElement
}

const player2 :IplayerInfo = {
    namePlayer : "",
    playerTitle :document.querySelector('.playerTitle2') as HTMLHeadingElement
}
//Select Btn in HTMl
const validateBtn = document.querySelector("#validate") as HTMLButtonElement;
//Create playingMode 
let playingMode: string = "";
//Select fieldSet in HTML
const field = document.querySelector("fieldset") as HTMLFieldSetElement;
//Select playForm
const playForm = document.querySelector('form') as HTMLFormElement;
//Select firstWindow
const popup = document.querySelector('#firstWindow') as HTMLElement
//Select mainScreen
const main = document.querySelector('#mainScreen') as HTMLElement

//Create function showAlertMessage
function showAlertMessage(message:string, Btn :HTMLButtonElement){
        if (
            !document.querySelector(".alert")
        ) // search if class alert already exists
        {
            const alert = document.createElement("p"); //Create new p element
            alert.innerText = `${message}` // Add inner text
            alert.classList.add("text-red-600", "alert"); // Add class
            Btn.insertAdjacentElement("beforebegin", alert); //Insert in HTMl
        }
    }

//ValidateBtn event Listener
validateBtn?.addEventListener("click", (e) => {
    e.preventDefault(); // No refresh
    //Select input with name = playerChoice
    const choice = document.querySelector(
        'input[name = "playerChoice"]:checked',
    ) as HTMLInputElement;

    //If choice is not checked
    if (!choice) {
        const alertMessage = "Vous devez choisir contre qui jouer !"
     showAlertMessage(alertMessage,validateBtn)
     return
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
    playingMode = choice.value
});
//field event Listener for beginGame Btn
playForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //select Input 
    const inputPlayer = document.querySelector('#playerName') as HTMLInputElement;
    const inputFriend = document.querySelector('#friendName') as HTMLInputElement;
    //create names 
    const namePlayer = (inputPlayer.value.trim()) || "player 1"
    const nameFriend = inputFriend ? inputFriend.value.trim() : "computer"

    //set inner text
    player1.playerTitle.innerText = `${namePlayer}`;
    player2.playerTitle.innerText = `${nameFriend}`
        
        popup.classList.add('fade-out');
        setTimeout(() => {
            popup.classList.add('hidden');
            main.classList.remove('hidden');
            setTimeout(() => {
                main.classList.add('fade-in');
            }, 10);
        }, 400)
    
})

/*-------------------------------------Game Side----------------------------- */
//Select article and "jetons"
let colonnes = Array.from(document.querySelectorAll("article"))
let lignes = Array.from(document.querySelectorAll(".jetons"));

//Select score in HTML 
let victoryScore = document.querySelector(".victoire") as HTMLElement;
let lossScore = document.querySelector(".defaite") as HTMLElement;
let player2win = document.querySelector(".victoire_player2") as HTMLElement;
let player2loss = document.querySelector(".defaite_player2") as HTMLElement;

//Select validatePlayAgain
const playAgainBtn = document.querySelector('#validatePlayAgain') as HTMLButtonElement;

//Create victory count
let victoryCount = 0;
let lossCount = 0
let victoryCountJ2 = 0;
let lossCountJ2 = 0

//select plateau in HTML
const playingBoard = document.querySelector(".plateau") as HTMLElement

//Create isEnd 
let isEnd = false

//Create div and article for change in HTMl
let div: HTMLElement;
let article: HTMLElement;

//Create type for my 2DArray
type player = 'player1' | 'player2' | null;
//Create null 2DArray
const playingArea: player[][] = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];
//Create wait function 

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

//Create function render

async function render(player: player, colIndex: number, rowIndex: number) {
    //Create col for columns  
    const col = playingBoard.children[colIndex] as HTMLElement;
    //Create row 
    const cell = col.children[rowIndex] as HTMLElement;
    //Check row
    if (!cell) return;
    //add CSS class
    cell.classList.add("enter");
    if (player !== null) {
        await wait(10)
        cell.classList.remove("enter");
        cell.classList.add(player);
    }
}
//Create function for changePlayer 
function changePlayer() {
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
}

//Create function playerTurn

async function playTurn(player: player, colonne: number): Promise<boolean | void>  {
    //Check player value
    if (player === null) return;
    //check if row and col are free
    for (let ligne: number = 5; ligne >= 0; ligne--) {
        const currentRow: player[] | undefined = playingArea[ligne];
        if (currentRow && currentRow[colonne] === null) {
            currentRow[colonne] = player;

            //Call render
            await render(player, colonne, ligne);

            //Wait for victory
            await wait(300)
            checkVictory(player, colonne, ligne)
            return true
        }
    }
    return false
}

//Create function aiTurn

async function aiTurn(player: player) :Promise<void> {
    //Check if ai Can play
    if (isEnd === true || playingMode !== "computer") {
        //CHANGE PLAYER
        return
    }
    //Search emptycols and check for play in it 
    let emptyCols: number[] = [];
    for (let c: number = 0; c < 7; c++) {
        if (playingArea.some(ligne => ligne[c] === null)) {
            emptyCols.push(c);
        }
    }
    //Create randomIndex
    let randomIndex: number = Math.floor(Math.random() * emptyCols.length);
    //Create chosen col
    let chosenCol: number = emptyCols[randomIndex]!;

    await playTurn(player, chosenCol)
}

//Create function for count each tokens

function countTokens(player: player, column: number, row: number, x: number, y: number) :number {
    let count: number = 0;
    let r = row + y;
    let c = column + x;

    //While c and r still in the playing area & its the same player 
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && playingArea[r]?.[c] === player) {
        count++;
        r += y;
        c += x;
    }
    return count;
}

//Create function for checkVictory 

function checkVictory(player: player, column: number, row: number) :void {
    if (!player) return;
    interface direction {
        x: number,
        y: number
    }
    const directions: direction[] = [
        { x: 1, y: 0 },  // check align (<->)
        { x: 0, y: 1 },  // check align (|)
        { x: 1, y: 1 },  // check align (\)
        { x: 1, y: -1 }  // check align (/)
    ];
    for (let { x, y } of directions) {
        let count = 1;

        //look left to right
        count += countTokens(player, column, row, x, y)
        //look right to left
        count += countTokens(player, column, row, -x, -y)
        //check if 4 is aligned
        if (count >= 4) {
            victory(player)
        }
    }

}

//Function victory

function victory(player: player): void {
    isEnd = true;
    //If player1 Victory
    if (player === "player1") {
        victoryCount++;
        lossCountJ2++
        victoryScore.innerText = `Victoires : ${victoryCount}`;
        player2loss.innerText = `Defaites : ${lossCountJ2}`;
        displayPopUp(player1.playerTitle.innerText)
    }
    //If player2 Victory
    else if (player === "player2") {
        alert("Victoire du player 2 !");
        victoryCountJ2++;
        lossCount++;
        player2win.innerText = `Victoires : ${victoryCountJ2}`;
        lossScore.innerText = `Défaites : ${lossCount}`;
        displayPopUp(player2.playerTitle.innerText)
    }
}

//function cleanBoard

function cleanBoard() :void {
    lignes.forEach(div => {
        div.classList.remove("player1", "player2", "enter");
    });
}

//Create playAgain
const playAgain = document.querySelector("#again") as HTMLElement;
//select playAgainTitle
const playAgainTitle = document.querySelector('.playAgainTitle') as HTMLElement;

//function displayPopup 
async function displayPopUp(player:string) :Promise<void>{
    playAgain.classList.remove('hidden');
    playAgainTitle.innerText = `${player} a gagné ! On rejoue ?`;
}

//Create resetGame
function resetGame() :void {
    const choice = document.querySelector('input[name = "playAgain"]:checked') as HTMLInputElement;
    if(!choice){
        const alertMessage = "Vous devez choisir si vous voulez rejouer ou non !"
        showAlertMessage(alertMessage,playAgainBtn)
        return
    }

    if(choice.value === 'oui')
        for (let ligne = 5; ligne >= 0; ligne--) {
            for (let colonne = 6; colonne >= 0; colonne--) {
                playingArea[ligne]![colonne] = null
                
            }
        isEnd = false;
        currentPlayer = 'player1'
        cleanBoard()
        playAgain.classList.add('hidden');
    }else {
        playAgain.innerHTML = `
        <p>Merci à ${player1.playerTitle.innerText} et à ${player2.playerTitle.innerText} on se revoit très vite pour la revanche ! 😉</p>
        <button id="refresh" class="bg-gray-200 w-35 h-15 text-black m-5 text-xl">Retour à l'accueil</button>
        `
    }
}


let currentPlayer: player = "player1";


colonnes.forEach((col, colonne) => {
    col.addEventListener("click", async () => {
        // check if game is done
        if (isEnd === true) return;

        // Playing vs a friend
        if (playingMode === "friend") {
            // call async playTurn
            
            //Create hasPlayed for check if tokens in placed
            const hasPlayed = await playTurn(currentPlayer, colonne);
            // Check isEnd true or false is it's not changePlayer
            if (hasPlayed && !isEnd){
                changePlayer();
            } 
            return;
        }
        // AI mode
        if (playingMode === "computer") {
            //Can't click if it's not player 1 turn
            if (currentPlayer !== "player1") return;
            //call playTurn for player
            const hasPlayed = await playTurn(currentPlayer, colonne);
            //check isEnd is true or false
            if (hasPlayed && !isEnd) {
                //Change player
                changePlayer();
                //call wait 
                await wait(800);

                // let AI play
                await aiTurn('player2');
                //// Check isEnd true or false is it's not changePlayer
                if (!isEnd) changePlayer(); 
            }
        }
    });
});
//PlayAgainBtn eventListener
playAgainBtn.addEventListener('click',async () =>{
    resetGame();
})
//PlayAgain eventListener
playAgain.addEventListener('click',(e) =>{
    const target = e.target as HTMLElement;
    if(target.matches('#refresh')){
        location.reload()
    }
})
