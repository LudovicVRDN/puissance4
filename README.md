[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Application **Puissance 4** en **TypeScript vanilla** (ES6+ modules).Logique de placement de jetons dans la grille ,Jouable contre un ordinateur ou un ami , vérification des emplacements des jetons, responsive CSS/Tailwind, switch Dark Mode Light Mode,Possibilité de rejouer.

[![Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge&logo=netlify)](https://puissancefour.netlify.app)

## 📋 Sommaire
- [Fonctionnalités](#fonctionnalités)
- [Démarrage](#démarrage)
- [Structure](#structure)
- [Technologies](#technologies)
- [Développement](#développement)
- [Licence](#licence)

## ✨ Fonctionnalités
- 👥 **Jeu Contre un ami ou un ordinateur** : Le joueur choisit contre qui il joue au début de la partie.
- ✅ **Vérification de la victoire** : A la fin de chaque coup joué l'emplacement des jetons est vérifié si 4 sont alignés (haut,bas,droite,gauche et toutes les diagonales) C'est gagné.
- 📱 **Responsive** : Mobile-first (Flexbox/Grid)
- ✅ **Possibilité de rejouer** : A la fin de la partie le jeu propose automatiquement de rejouer.
- 🌙 **Dark Mode / Light Mode** : L'utilisateur peut choisir le mode qui lui convient le mieux avec un clic sur le bouton correspondant.

## 🚀 Démarrage
1. Clone : `git clone https://github.com/LudovicVRDN/puissance4`
2. VSCode : Ouvrir dossier > **Live Server** sur `index.html`

## 📁 Structure
```plaintext
puissance4/
├── dist/
│   ├── index.d.ts           # Déclarations TypeScript (généré)
│   ├── index.js             # JavaScript compilé (généré)
│   ├── index.js.map         # Source map (généré)
│   ├── index.d.ts.map       # Source map déclarations (généré)
│   └── output.css           # CSS compilé (généré)
├── media/
│   └── manette.png          # Assets images
├── node_modules/            # Dépendances npm (ne pas commiter)
├── src/
│   ├── index.ts             # Point d'entrée TypeScript
│   ├── input.css            # Styles Tailwind (directives @tailwind)
│   └── index.html           # Page HTML principale
├── package.json
├── package-lock.json
├── tsconfig.json            # Configuration TypeScript
└── README.md
```

## 🛠️ Technologies
| Frontend | Outils | Build |
|----------|--------|-------|
| TypeScript 5.4 | VSCode Live Server | tsc | 
| HTML5/CSS3/ |Tailwind  | |

## 🔧 Développement
```
npm i -D typescript @types/node
npm run dev # tsc --watch + Live Server
npm run build # tsc → JS dist/
```
**Portfolio** : [github.com/LudovicVRDN](https://github.com/LudovicVRDN) | 