import {
  I, J, L, O, S, T, Z,
  YELLOW, //O
  ORANGE, //L
  PURPLE, //T
  DBLUE,  //J
  LBLUE,  //I
  GREEN,  //S
  RED,    //Z
  SQUARE,
} from "./constants";

class Tetromino {
  constructor(ctx, board, piece) {
    this.ctx = ctx;
    this.board = board;
    this.piece = piece;
    this.index = 0;
    this.color = this.setColor();
    this.domain = this.piece[this.index];
    this.x = 3;
    this.y = -2;
  }

  setColor() {
    switch(this.piece){
      case O:
        return this.color = YELLOW;
      case L:
        return this.color = ORANGE;
      case T:
        return this.color = PURPLE;
      case J:
        return this.color = DBLUE;
      case I: 
        return this.color = LBLUE;
      case S:
        return this.color = GREEN;
      case Z:
        return this.color = RED;
    }
  }

  fillSquare(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
  }

  draw() {
    for (let i = 0; i < this.domain.length; i++){
      for (let j = 0; j < this.domain.length; j++){
        if (this.domain[i][j]){
          this.fillSquare(i + this.x, j + this.y, this.color);
        }
      }
    }
  }

  clear() {
    for (let i = 0; i < this.domain.length; i++) {
      for (let j = 0; j < this.domain.length; j++) {
        if (this.domain[i][j]) {
          this.fillSquare(i + this.x, j + this.y, "white");
        }
      }
    }
  }

  down() {
    if (this.validMove(this.x, this.y + 1, this.domain)) {
      this.clear();
      this.y++;
      this.draw();
    }
  }

  left() {
    if (this.validMove(this.x - 1, this.y, this.domain)) {
      this.clear();
      this.x--;
      this.draw();
    }
  }

  right() {
    if (this.validMove(this.x + 1, this.y, this.domain)) {
      this.clear();
      this.x++;
      this.draw();
    }
  }

  rotate() {
    if (this.validMove(this.x, this.y, this.piece[this.index + 1])){
      this.clear();
      this.index = (this.index + 1) % 4;
      this.draw();
    }
  }

  validMove(x, y, domain) {
    for (let i = 0; i < domain.length; i++) {
      for (let j = 0; j < domain.length; j++) {
        if (domain[i][j]){
          if ((x + i) < 0 || (x + i) > 9) { return false };
          if ((y + j) < 0 || (y + j) > 19){ return false };
        }
      }
    }
    return true;
  }
}

export default Tetromino;
