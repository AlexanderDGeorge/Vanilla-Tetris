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
            audio.volume = '0.3';
        }
    }

    fetchLeaders() {
        // grabs leaderboard from localStorage and parses
        let leaders = localStorage.getItem('leaderboard');
        if (leaders) this.leaders = JSON.parse(leaders);
        this.populateLeaderboard();
    }

    populateLeaderboard() {
        for (let i = 0; i < 5; i++) {
            if (this.leaders[i]) {
                for (let [name, score] of Object.entries(this.leaders[i])) {
                    leaderboard[i].innerHTML = `${name}: ${score}`;
                }
            }
        }
    }

    handleScore(score) {
        if (this.leaders[4]) {
            if (score > Object.values(this.leaders[4])[0]) this.getName(score);
            else this.handleRestart();
        } else {
            this.getName(score);
        }
    }

    getName(score) {
        const content = document.getElementById('name-modal');
        const input = document.getElementById('modal-input');
        const button = document.getElementById('modal-submit');
        modal.style.display = 'block';
        content.style.display = 'flex';
        button.onclick = () => {
            let name = input.value;
            modal.style.display = 'none';
            content.style.display = 'none';
            this.addNewLeader(name, score);
            this.handleRestart();
        }
    }

    addNewLeader(name, score) {
        let index = -1;
        // loops through leaders to find where to insert new score
        for (let i = 0; i < 5; i++) {
            if (!this.leaders[i]) {
                index = i;
                break;
            } else {
                let highscore = Object.values(this.leaders[i])[0];
                if (score > highscore) {
                    index = i;
                    break;
                }
            }
        }

        if (index > -1) {
            this.leaders.splice(index, 1, { [name] : score });
            localStorage.setItem('leaderboard', JSON.stringify(this.leaders));
        }

        this.fetchLeaders();
    }

    handleRestart() {
        const content = document.getElementById('restart-modal');
        const restart = document.getElementById('restart-button');
        modal.style.display = 'block';
        content.style.display = 'flex';
        document.addEventListener('click', function(e){
            if (restart.contains(e)) {
                modal.style.display = 'none';
                content.style.display = 'none';
            }
        })
    }
}

export default Menu;