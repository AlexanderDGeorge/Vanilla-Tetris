import Board from '../app/board';

window.addEventListener("DOMContentLoaded", event => {
    const canvas = document.getElementById("board-canvas");
    const board = new Board(canvas);
})