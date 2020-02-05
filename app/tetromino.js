class Tetromino {
  constructor(ctx, board, domain) {
    this.ctx = ctx;
    this.board = board;
    this.domain = domain;
  }

  fillSquare(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE);
  }

  draw() {
    this.domain.forEach(coord => {
      let x = coord[0];
      let y = coord[1];
      this.fillSquare(x, y, YELLOW);
    });
  }

  clear() {
    this.domain.forEach(coord => {
      let x = coord[0];
      let y = coord[1];
      this.fillSquare(x, y, "white");
    });
  }

  down() {
    this.clear();
    this.domain.map(coord => {
      coord[1] += 1;
    });
    this.draw();
  }

  left() {
    this.clear();
    this.domain.map(coord => {
      coord[0] -= 1;
    });
    this.draw();
  }

  right() {
    this.clear();
    this.domain.map(coord => {
      coord[0] += 1;
    });
    this.draw();
  }
}

export default Tetromino;
