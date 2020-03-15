import { MINO } from "./constants";

const next0 = document.getElementById("next1").getContext("2d");
const next1 = document.getElementById("next2").getContext("2d");
const next2 = document.getElementById("next3").getContext("2d");

class Next {
  constructor(tetrominos) {
    this.zer = tetrominos[0][0];
    this.one = tetrominos[1][0];
    this.two = tetrominos[2][0];
  }

  printNext() {
    next0.canvas.height = MINO * 4;
    next0.canvas.width  = MINO * 4;
    next1.canvas.height = MINO * 4;
    next1.canvas.width  = MINO * 4;
    next2.canvas.height = MINO * 4;
    next2.canvas.width  = MINO * 4;

    
  }

  fillMino(x, y, color) {
    next0.fillStyle = color;
    next0.fillRect(x * MINO, y * MINO, MINO, MINO);
    next0.strokeStyle = "black";
    next0.strokeRect(x * MINO, y * MINO, MINO, MINO);
  }
}

export default Next;