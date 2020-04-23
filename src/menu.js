const start = document.getElementById('start');
const pause = document.getElementById('pause');
const leaderboard = document.getElementById('leaderboard');
const helpMenu = document.getElementById('help-menu');
const leaderboardMenu = document.getElementById('leaderboard-menu');
const audio = document.getElementById('audio');
const modal = document.getElementById('modal');

class Menu {
    constructor() {
        this.pause = false;
        this.leaderboard = false;
        this.mute = false;
        this.leaders = [];

    }

    fetchLeaders() {
        // grabs leaderboard from localStorage and parses
        let leaders = localStorage.getItem('leaderboard');
        if (leaders) this.leaders = JSON.parse(leaders);
    }

    




}