import Tetromino from "./tetromino";
import {
  I, J, L, O, S, T, Z,
  EMPTY,
  SQUARE,
  PIECES
} from "./constants";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.speed = 1500;
    this.board = [];
    this.pieces = [];
    this.current;
    this.run = this.run.bind(this);
  }

  start() {
    // initializes board
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 20; j++) {
        this.board[i][j] = EMPTY;
      }
    }

    // initializes pieces
    for (let i = 0; i < 3; i++) {
      this.next();
    }

    // grab first piece
    this.current = this.pieces.shift();
    this.next();

    this.draw();
    this.run();
    //setInterval(this.run, this.speed);
  }

  run() {
    console.log(this);
    this.current.draw();
    this.current.down();
    this.current.right();
  }

  draw() {
    // draws the board
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 20; j++){
        this.fillSquare(i, j, "white")
      }
    }
  }

  fillSquare(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
  }

  step() {
    // function calls move and check
    this.move();
    this.check();
  }

  next() {
    // function generates next piece
    let i = Math.floor(Math.random() * 6);
    let piece = PIECES[i];
    switch (piece) {
      case I:
        this.pieces.push(new Tetromino(this.ctx, this.board, piece));
      case J:
        this.pieces.push(new Tetromino(this.ctx, this.board, piece));
      case L:
        this.pieces.push(new Tetromino(this.ctx, this.board, piece));
      case O:
        this.pieces.push(new Tetromino(this.ctx, this.board, piece));
      case S:
        this.pieces.push(new Tetromino(this.ctx, this.board, piece));
      case T:
        this.pieces.push(new Tetromino(this.ctx, this.board, piece));
      case Z:
        this.pieces.push(new Tetromino(this.ctx, this.board, piece));
    }
  }

  check() {
    // function checks the position of the current piece and dispatches necessary function
    // could call score, remove, or next
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
