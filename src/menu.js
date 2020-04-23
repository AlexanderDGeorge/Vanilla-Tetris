const start = document.getElementById('start');
const pauseToggle = document.getElementById('pause-toggle');
const leaderboardToggle = document.getElementById('leaderboard-toggle');
const muteToggle = document.getElementById('mute-toggle');
const help = document.getElementById('help-view');
const leaderboard = document.getElementById('leaderboard-view');
const audio = document.getElementById('audio');
const modal = document.getElementById('modal');

class Menu {
    constructor() {
        this.pause = false;
        this.leaderboard = false;
        this.mute = false;
        this.leaders = [];
        this.menuHandler();
        this.fetchLeaders();
    }

    menuHandler() {
        pauseToggle.onclick = () => {
            this.pause = !this.pause;
            this.handlePause();
        }

        leaderboardToggle.onclick = () => {
            this.leaderboard = !this.leaderboard;
            this.handleLeaderboard();
        }

        muteToggle.onclick = () => {
            this.mute = !this.mute;
            this.handleMute();
        }
    }

    handlePause() {
        if (this.pause) {
            help.style.zIndex = '1';
            leaderboard.style.zIndex = '-1';
            pauseToggle.innerHTML = 'resume';
        } else {
            pauseToggle.innerHTML = 'pause';
            help.style.zIndex = '-1';
            leaderboard.style.zIndex = '-1';
        }
    }

    handleLeaderboard() {
        if (this.leaderboard) {
            help.style.zIndex = '-1';
            leaderboard.style.zIndex = '1';
            pauseToggle.innerHTML = 'resume';
        } else {
            pauseToggle.innerHTML = 'pause';
            help.style.zIndex = '-1';
            leaderboard.style.zIndex = '-1';
        }
    }

    handleMute() {
        if (this.mute) {
            muteToggle.innerHTML = 'unmute';
            audio.volume = '0';
        } else {
            muteToggle.innerHTML = 'mute';
            audio.volume = '0.5';
        }
    }

    fetchLeaders() {
        // grabs leaderboard from localStorage and parses
        let leaders = localStorage.getItem('leaderboard');
        if (leaders) this.leaders = JSON.parse(leaders);
        this.populateLeaderboard();
    }

    populateLeaderboard() {
        let j = 0;
        leaderboard.childNodes.forEach((child, i) => {
            // evens are text, odds are li
            if(i % 2 === 1) {
                child.innerHTML = this.leaders[j];
                j++;
            }
        })
    }








}

export default Menu;