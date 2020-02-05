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
    this.run = this.run.bind(this); // keeps context in setInterval
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

    // draw board and start game
    this.draw();
    setInterval(this.run, this.speed);
  }

  run() {
    if (this.current.down() === false) {
      // down is not a valid move, check if row is full and get the next tetromino
      this.isRowFull();
      this.current = this.tetrominos.shift();
      this.next();
      debugger;
    }
  }

  draw() {
    // draws the board
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 20; j++){
        this.fillMino(i, j, "white")
      }
    }
  }

  fillMino(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * MINO, y * MINO, MINO, MINO);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x * MINO, y * MINO, MINO, MINO);
  }
  
  check() {
    // function checks the position of the current tetromino and dispatches necessary actions
    if (this.current.down() === false) {
      // down is not a valid move, we get the next tetromino
      this.current = this.tetrominos.shift();
      this.next();
    }
  }
  
  next() {
    // function generates next tetromino
    let i = Math.floor(Math.random() * 6);
    let tetromino = TETROMINOS[i];
    this.tetrominos.push(new Tetromino(this.ctx, this.board, tetromino))
  }

  isRowFull() {
    for (let j = 0; j < 19; j++) {
      for (let i = 0; i < 10; i++){
        if (this.board[i][j] === EMPTY){
          break;
        } 
        else if (i === 9){
          debugger;
          return true;
        } 
      }
    }
    return false;
  }

  score() {
    // function updates and maintains score
  }

  remove() {
    // function handles removing and updating rows from grid
  }

  speed() {
    // function updates speed based on level
  }
}

export default Game;
