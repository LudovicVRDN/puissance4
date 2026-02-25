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
//Select HTML
const html = document.querySelector('html');
//Select button in HTML
const darkLightBttn = document.querySelector("#darkLight");
darkLightBttn.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        darkLightBttn.innerText = 'Light Mode ';
    }
    else if (!html.classList.contains('dark')) {
        darkLightBttn.innerText = 'Dark Mode ';
    }
});
