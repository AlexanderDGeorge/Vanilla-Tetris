const start = document.getElementById('start');
const pauseToggle = document.getElementById('pause-toggle');
const leaderboardToggle = document.getElementById('leaderboard-toggle');
const muteToggle = document.getElementById('mute-toggle');
const help = document.getElementById('help-view');
const leaderboardView = document.getElementById('leaderboard-view');
const leaderboard = document.getElementsByClassName('leaderboard');
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
            leaderboardView.style.zIndex = '-1';
            pauseToggle.innerHTML = 'resume';
        } else {
            pauseToggle.innerHTML = 'pause';
            help.style.zIndex = '-1';
            leaderboardView.style.zIndex = '-1';
        }
    }

    handleLeaderboard() {
        if (this.leaderboard) {
            help.style.zIndex = '-1';
            leaderboardView.style.zIndex = '1';
            pauseToggle.innerHTML = 'resume';
        } else {
            pauseToggle.innerHTML = 'pause';
            help.style.zIndex = '-1';
            leaderboardView.style.zIndex = '-1';
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
        console.log(this.leaders)
        this.populateLeaderboard();
    }

    populateLeaderboard() {
        for (let i = 0; i < 5; i++) {
            if (this.leaders[i]) {
                for (let [name, score] of Object.entries(this.leaders[i])) {
                    console.log(name, score);
                    leaderboard[i].innerHTML = `${name}: ${score}`;
                }
            }
        }
    }

    handleScore(new_score) {
        const content = document.getElementById('name-modal');
        const input = document.getElementById('modal-input');
        const button = document.getElementById('modal-submit');
        let key = this.leaders[5].keys[0];
        if (this.leaders[5] || this.leaders[5][key] < new_score) {
            modal.style.display = 'block';
            content.style.display = 'flex';
            button.onclick = () => {
                let name = input.value;
                this.addNewLeader(name, new_score);
                this.handleRestart();
                modal.style.display = 'none';
                content.style.display = 'none';
            }
        } else {
            this.handleRestart();
        }
    }

    addNewLeader(name, new_score) {
        let index = -1;
        // loops through leaders to find where to insert new score
        for (let i = 0; i < 5; i++) {
            if (this.leaders[i]) {
                for (let [_, score] of Object.entries(this.leaders[i])) {
                    if (new_score > score) {
                        index = i;
                    }
                }
                if (index > -1) break; 
            } else {
                index = i;
                break;
            }
        }

        if (index > -1) {
            this.leaders.splice(index, { name: new_score });
            localStorage.setItem('leaderboard', JSON.stringify(this.leaders));
        }

        this.fetchLeaders();
    }

    handleRestart() {
        const content = document.getElementById('restart-modal');
        const button = document.getElementById('restart-button');
        modal.style.display = 'block';
        content.style.display = 'flex';
        button.onclick = () => {
            modal.style.display = 'none';
            content.style.display = 'none';
            return true;
        }
    }
}

export default Menu;