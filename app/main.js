import Game from './game';

window.addEventListener("DOMContentLoaded", (event) => {
  const canvas = document.getElementById("canvas");
  const game = new Game(canvas);
  game.start();
})