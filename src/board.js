import * as Math from "mathjs";
import Tetromino from "./tetromino";
import {
  EMPTY,
  MINO,
  TETROMINOS
} from "./constants";
import Stats from "./stats";

const pause = document.getElementById("pause");
const help = document.getElementById("help");
const helpMenu = document.getElementById("help-menu");
const audio = document.getElementById("audio");

class Board {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.board = [];
    this.tetrominos = [];
    this.stats = new Stats();
    this.speed;
    this.current;
    this.interval;
    this.pause = false;
    this.input = this.input.bind(this);
    this.step = this.step.bind(this);
    this.pauseGame();
    this.helpMenu();
    this.init();
  }

  input(e) {
    if (e.keyCode === 32) {
      //this.current.drop();
    }
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
    if (e.keyCode === 72) {
      //this.current.hold();
    }
  }

  init() {
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
    this.current = new Tetromino(
      this.ctx,
      this.board,
      this.tetrominos.shift()
    );
    this.next();
   
    // draw board, listen for user input, and start game
    this.draw();
    document.addEventListener("keydown", this.input);
    audio.play();
    this.step()
  }

  step() {
    if (this.speed !== this.stats.getSpeed()) {
      this.speed = this.stats.getSpeed();
      clearInterval(this.interval);
      this.interval = setInterval(this.step, this.speed);
    }
    if (this.current.down() === false) {
      // down is not a valid move, check if row is full and get the next tetromino
      let reduce = this.isRowFull();
      while (reduce) { 
        reduce = this.isRowFull();
      }
      if (this.isGameOver()) {
        // alert("GAME OVER");
        clearInterval(this.interval);
        this.handleGameOver();
      } else {
        this.current = new Tetromino(
          this.ctx,
          this.board,
          this.tetrominos.shift()
        );
        this.next();
      }
    }
  }

  pauseGame() {
    pause.onclick = () => { 
      this.pause = !this.pause 
      if (this.pause) {
        pause.innerHTML = "resume"
        clearInterval(this.interval);
        audio.pause();
        helpMenu.style.zIndex = '1';
      } else {
        pause.innerHTML = "pause"
        this.interval = setInterval(this.step, this.speed);
        audio.play();
        helpMenu.style.zIndex = '-1';
      }
    }
  }

  helpMenu() {
    help.onclick = () => { 
      this.pause = !this.pause;
      helpMenu.style.zIndex = this.pause ? "1" : "-1";
    }
  } 

  draw() {
    // draws the board
    this.ctx.canvas.height = MINO * 20;
    this.ctx.canvas.width = MINO * 10;
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
    let i = Math.floor(Math.random() * 7);
    let tetromino = TETROMINOS[i];
    this.tetrominos.push(tetromino)
  }

  isRowFull() {
    for (let j = 19; j > 0; j--) {
      for (let i = 0; i < 10; i++){
        if (this.board[i][j] === EMPTY){
          break;
        } 
        else if (i === 9){
          this.clearRow(j);
          return true;
        } 
      }
    }
    return false;
  }

  isGameOver() {
    if (this.current.y <= 0) {

      return true
    } else {
      return false
    }
  }

  clearRow(row) {
    //clears a full row of tetrominos
    this.board = Math.transpose(this.board);
    this.board.splice(row, 1);
    this.board.unshift(this.emptyRow());
    this.board = Math.transpose(this.board);
    this.draw();
    this.stats.updateScore(10)
  }

  emptyRow() {
    // generates an empty row to push to board
    let row = [];
    for (let i = 0; i < 10; i++){
      row.push(EMPTY);
    }
    return row;
  }

  handleGameOver() {
    let score = this.stats.score;
    let highscore = localStorage.getItem('highscore');
    if (highscore) {
      highscore = JSON.parse(highscore);
      highscore = Object.values(highscore)[0];
      if (score > highscore) {
        score = this.useHighscoreModal(score);
        localStorage.setItem('highscore', JSON.stringify(score));
      }
    } else {
      score = this.useHighscoreModal(score)
      localStorage.setItem('highscore', JSON.stringify(score));
    }

  }

  useHighscoreModal(score) {
    const modal = document.getElementById('modal');
    const modalbox = document.getElementById('modal-content');
    const input = document.getElementById('highscore-input');

    document.getElementById('highscore').innerHTML = score;
    modal.style.display = 'block';
    let name;
    window.addEventListener('click', function(e){
      if (!modalbox.contains(e.target)){
        name = input.value;
        modal.style.display = 'none';
      }
    })

    return { name: score }
  }
}

export default Board;
