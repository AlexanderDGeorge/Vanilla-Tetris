import * as Math from "mathjs";
import Tetromino from "./tetromino";
import {
  EMPTY,
  MINO,
  TETROMINOS
} from "./constants";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.speed = 1000;
    this.score = 0;
    this.board = [];
    this.tetrominos = [];
    this.current;
    this.run = this.run.bind(this);
    this.input = this.input.bind(this);
  }

  input(e) {
    if (e.keyCode === 37) {
      this.current.left();
    }
    if (e.keyCode === 38) {
      this.current.rotate();
    }
    if (e.keyCode === 39) {
      this.current.right();
    }
    if (e.keyCode === 40) {
      this.current.down();
    }
  }

  start() {
    // initializes board
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 20; j++) {
        this.board[i][j] = EMPTY;
      }
    }

    // initializes tetrominos
    for (let i = 0; i < 3; i++) {
      this.next();
    }

    // grab first tetromino
    this.current = this.tetrominos.shift();
    this.next();
   
    // draw board, listen for user input and start game
    this.draw();
    document.addEventListener("keydown", this.input);
    setInterval(this.run, this.speed);
  }

  run() {
    if (this.current.down() === false) {
      // down is not a valid move, check if row is full and get the next tetromino
      this.isRowFull();
      this.current = this.tetrominos.shift();
      this.next();
    }
  }

  draw() {
    // draws the board
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 20; j++){
        this.fillMino(i, j, this.board[i][j])
      }
    }
  }

  fillMino(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * MINO, y * MINO, MINO, MINO);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x * MINO, y * MINO, MINO, MINO);
  }
  
  next() {
    // function generates next tetromino
    let i = Math.floor(Math.random() * 6);
    let tetromino = TETROMINOS[i];
    this.tetrominos.push(new Tetromino(this.ctx, this.board, tetromino))
  }

  isRowFull() {
    for (let j = 19; j > 0; j--) {
      for (let i = 0; i < 10; i++){
        if (this.board[i][j] === EMPTY){
          break;
        } 
        else if (i === 9){
          debugger;
          this.clearRow(j);
          debugger;
        } 
      }
    }
    return false;
  }

  clearRow(row) {
    this.board = Math.transpose(this.board);
    this.board.splice(row, 1);
    this.board.unshift(this.emptyRow());
    this.board = Math.transpose(this.board);
    this.draw();
  }

  emptyRow() {
    let row = [];
    for (let i = 0; i < 10; i++){
      row.push(EMPTY);
    }
    return row;
  }

  speed() {
    // function updates speed based on level
  }
}

export default Game;
