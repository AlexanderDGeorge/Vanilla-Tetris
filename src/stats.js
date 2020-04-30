const scoreview = document.getElementById("scoreview");
const level = document.getElementById("level");
const lines = document.getElementById("lines");

class Stats {
  constructor() {
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.speed = 1000;
    this.printStats();
  }

  updateScore(lines) {
    if (lines === 1) this.score += 40 * (this.level + 1);
    else if (lines === 2) this.score += 100 * (this.level + 1);
    else if (lines === 3) this.score += 300 * (this.level + 1);
    else if (lines === 4) this.score += 1200 * (this.level + 1);
    this.lines += lines;
    if (this.lines < 5) { this.level = 0; this.speed = 1000 }
    else if (this.lines < 10) { this.level = 1; this.speed = 900 }
    else if (this.lines < 15) { this.level = 2; this.speed = 800 }
    else if (this.lines < 20) { this.level = 3; this.speed = 700 }
    else if (this.lines < 25) { this.level = 4; this.speed = 600 }
    else if (this.lines < 30) { this.level = 5; this.speed = 500 }
    else if (this.lines < 35) { this.level = 6; this.speed = 400 }
    else if (this.lines < 40) { this.level = 7; this.speed = 300 }
    else if (this.lines < 45) { this.level = 8; this.speed = 200 }
    else if (this.lines < 50) { this.level = 9; this.speed = 100 }
    else { this.level = 10; this.speed = 50 }
    this.printStats();
  }

  getSpeed() {
    return this.speed;
  }

  getScore() {
     return this.score;
  }

  printStats() {
    scoreview.innerHTML = this.score;
    level.innerHTML = this.level;
    lines.innerHTML = this.lines;
  }
}

export default Stats;