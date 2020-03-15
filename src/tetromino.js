import {
  I, J, L, O, S, T, Z,
  EMPTY,
  LBLUE,  //I
  DBLUE,  //J
  ORANGE, //L
  YELLOW, //O
  GREEN,  //S
  PURPLE, //T
  RED,    //Z
  MINO,
} from "./constants";

class Tetromino {
  constructor(ctx, board, tetromino) {
    this.ctx = ctx;
    this.board = board;
    this.tetromino = tetromino;
    this.index = 0;
    this.color = this.setColor();
    this.domain = this.tetromino[this.index];
    this.x = this.tetromino !== O ? 4 : 3;
    this.y = -2;
  }

  setColor() {
    switch(this.tetromino){
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

  fillMino(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * MINO, y * MINO, MINO, MINO);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x * MINO, y * MINO, MINO, MINO);
  }

  draw() {
    // draws tetromino on canvas
    // updates board
    for (let i = 0; i < this.domain.length; i++){
      for (let j = 0; j < this.domain.length; j++){
        if (this.domain[i][j]){
          this.fillMino(i + this.x, j + this.y, this.color);
          this.board[i + this.x][j + this.y] = this.color;
        }
      }
    }
  }

  clear() {
    // clears tetromino on canvas
    // updates board
    for (let i = 0; i < this.domain.length; i++) {
      for (let j = 0; j < this.domain.length; j++) {
        if (this.domain[i][j]) {
          this.fillMino(i + this.x, j + this.y, EMPTY);
          this.board[i + this.x][j + this.y] = EMPTY;
        }
      }
    }
  }

  down() {
    // move tetromino down
    this.clear();
    if (this.validMove(this.x, this.y + 1, this.domain)) {
      this.y++;
      this.draw();
      // return true;
    } else {
      this.draw();
      return false;
    }
  }

  left() {
    // move tetromino left
    this.clear();
    if (this.validMove(this.x - 1, this.y, this.domain)) {
      this.x--;
    }
    this.draw();
  }

  right() {
    // move tetromino right
    this.clear();
    if (this.validMove(this.x + 1, this.y, this.domain)) {
      this.x++;
    }
    this.draw();
  }

  rotate() {
    // "rotates" tetromino; grabs next position from tetromino
    this.clear();
    if (this.validMove(this.x, this.y, this.tetromino[(this.index + 1) % 4])){
      this.index = (this.index + 1) % 4;
      this.domain = this.tetromino[this.index];
    }
    this.draw();
  }

  validMove(x, y, domain) {
    // checks if tetromino stays within board and not moving on top of another tetromino
    for (let i = 0; i < domain.length; i++) {
      for (let j = 0; j < domain.length; j++) {
        if (domain[i][j]){
          if ((x + i) < 0 || (x + i) > 9) { return false }
          else if (y < 0) { break }
          else if (this.board[x + i][y + j] !== EMPTY) { return false }
          //else if ((y + j) > 19) { return false };
        }
      }
    }
    return true;
  }
}

export default Tetromino;
