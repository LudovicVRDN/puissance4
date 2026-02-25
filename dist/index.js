"use strict";
/*
Créer un jeu de puissance 4 jouable contre un ami ou contre un ordinateur :
* Dans une modale ne donnant pas accès à la page principale demander à l'utilisateur son nom et sil joue avec un ami
* Demander le nom de l'ami.
* Afficher le plateau et les scores .
* Faire apparaitre au click sur une colonne le jeton de la couleur correspondante.
* Faire une animation faisant tombé le jeton.
* Vérifier si 4 jetons sont alignés à chaque coups.
* Si 4 Jetons sont alignés affiché une modale de victoire en grisant le fond.
* Proposer de jouer à nouveau.
* Ajouter la fonctionnalité du dark mode / light mode
*/
/*Dark / Light mode side */
//Select HTML
const html = document.querySelector("html");
//Select button in HTML
const darkLightBttn = document.querySelector("#darkLight");
darkLightBttn.addEventListener("click", () => {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
        darkLightBttn.innerText = "Light Mode ";
    }
    else if (!html.classList.contains("dark")) {
        darkLightBttn.innerText = "Dark Mode ";
    }
});
/*Get user's answer and display the main screen*/
const validateBttn = document.querySelector("#validate");
//Create playingMode 
let playingMode = "";
//Select fieldSet in HTML
const field = document.querySelector("fieldset");
//Select firstWindow
const popup = document.querySelector('#firstWindow');
//Select mainScreen
const main = document.querySelector('#mainScreen');
//ValidateBttn event Listener
validateBttn === null || validateBttn === void 0 ? void 0 : validateBttn.addEventListener("click", (e) => {
    e.preventDefault(); // No refresh
    //Selet input with name = playerChoice
    const choice = document.querySelector('input[name = "playerChoice"]:checked');
    //If choice is not checked
    if (!choice) {
        if (!document.querySelector(".alert")) // search if class alert already exists
         {
            const alert = document.createElement("p"); //Create new p element
            alert.innerText = "Vous devez choisir contre qui jouer"; // Add inner text
            alert.classList.add("text-red-600", "alert"); // Add class
            validateBttn.insertAdjacentElement("beforebegin", alert); //Insert in HTMl
        }
    }
    //if choice is ami
    if (choice.value === "ami") {
        field.innerHTML = `
    <div class="flex flex-col gap-2 mb-4 text-white">
      <label for="playerName">Quel est ton nom ?</label>
      <input type="text" class="w-45 p-1 border rounded" id="playerName">

      <label for="friendName">Quel est le nom de ton adversaire ?</label>
      <input type="text" class="w-25 p-1 border rounded" id="friendName">
        <button class="bg-gray-200 w-20 h-8 text-black m-5 text-xl beginGame">Ok</button>
    </div>
    `; // Create new innerHtml for field
    }
    //If choice is ordinateur
    else if (choice.value === "ordinateur") {
        field.innerHTML = ` 
    <div class="flex flex-col gap-2 mb-4 text-white">
      <label for="playerName">Quel est ton nom ?</label>
      <input type="text" class="w-45 p-1 border rounded" id="playerName">
      <button class="bg-gray-200 w-20 h-8 text-black m-5 text-xl beginGame">Ok</button>
      `; // Create new innerHTMl for field
    }
    //Change playingMode Value
    playingMode = choice.value;
});
//field event Listener for beginGame bttn
field.addEventListener('click', (e) => {
    //select Input 
    const inputPlayer = document.querySelector('#playerName');
    const inputFriend = document.querySelector('#friendName');
    //create names 
    const namePlayer = inputPlayer ? inputPlayer.value.trim() : "Joueur 1";
    const nameFriend = inputFriend ? inputFriend.value.trim() : "Ordinateur";
    //Change text for Player1 and Player 2
    const player1 = document.querySelector('.player1');
    const player2 = document.querySelector('.player2');
    //set inner text
    player1.innerText = `${namePlayer}`;
    player2.innerText = `${nameFriend}`;
    const target = e.target;
    if (target.matches('.beginGame')) {
        console.log("Heho");
        popup.classList.add('fade-out');
        setTimeout(() => {
            popup.classList.add('hidden');
            main.classList.remove('hidden');
            setTimeout(() => {
                main.classList.add('fade-in');
            }, 10);
        }, 400);
    }
});
//Create null 2DArray
const playingArea = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];
