const score = document.getElementById("score");
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

  updateScore(score) {
    this.score += score;
    this.lines++;
    if (this.score < 50) { this.level = 0; this.speed = 1000 }
    else if (this.score < 100) { this.level = 1; this.speed = 900 }
    else if (this.score < 150) { this.level = 2; this.speed = 800 }
    else if (this.score < 200) { this.level = 3; this.speed = 700 }
    else if (this.score < 250) { this.level = 4; this.speed = 600 }
    else if (this.score < 300) { this.level = 5; this.speed = 500 }
    else if (this.score < 350) { this.level = 6; this.speed = 400 }
    else if (this.score < 400) { this.level = 7; this.speed = 300 }
    else if (this.score < 450) { this.level = 8; this.speed = 200 }
    else if (this.score < 500) { this.level = 9; this.speed = 100 }
    else { this.level = 10; this.speed = 50 }
    this.printStats();
  }

  getSpeed() {
    return this.speed;
  }

  printStats() {
    score.innerHTML = this.score;
    level.innerHTML = this.level;
    lines.innerHTML = this.lines;
  }
}

export default Stats;