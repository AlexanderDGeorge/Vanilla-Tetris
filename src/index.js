import Board from './board';

window.addEventListener("DOMContentLoaded", event => {
    const canvas = document.getElementById("board-canvas");
    const board = new Board(canvas);
})