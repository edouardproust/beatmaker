class BeatMaker {

    constructor() {
        // retrieve cookie
        this.percuNames = this.getCookie('beatmaker_tracks');
        // selectors
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.slider = document.querySelector('.slider');
        this.tempoNumber = document.querySelector('.tempo-nr');
        this.audioSelects = document.querySelectorAll('.audio-select');
        this.muteBtns = document.querySelectorAll('.mute-btn');
        // vars
        this.tempo;
        this.intervalId;
        this.isPlaying = false;
        this.playingPadIndex = null;
        // methods
        this.tempoInit();
    }

    tempoInit() {
        this.tempoNumber.innerText = this.slider.value;
        this.tempo = this.slider.value;
    }

    play() {
        this.isPlaying = true;
        let interval = 1000 / (this.slider.value / 60);
        this.intervalId = setInterval(() => {
            this.repeat();
        }, interval);
        return this.intervalId;
    }

    repeat() {
        this.playingPadIndex = this.playingPadIndex !== null ? this.playingPadIndex % 8 : 0;
        let bar = document.querySelectorAll('.pad.p'+beatMaker.playingPadIndex);
        bar.forEach(pad => {
            this.percuNames.forEach(percuName => {
                if(pad.classList.contains(percuName) && pad.classList.contains('active')) {
                    let beat = document.querySelector('audio.beat.'+percuName);
                    beat.play();
                    beat.currentTime = 0;
                }
            });
            pad.classList.add('played');
            pad.addEventListener('transitionend', function(){ 
                this.classList.remove('played');
            });
        });
        this.playingPadIndex++;
    }

    stop() {
        this.isPlaying = false;
        this.playingPadIndex = 0;
        clearInterval(this.intervalId);
    }

    pause() {
        this.isPlaying = false;
        clearInterval(this.intervalId);
    }

    // Events functions

    playOrStop(event) {
        // vars
        let btnIcon = this.playBtn.querySelector('*');
        let btnText = this.playBtn.querySelector('.btn-text');
        // process
        if(!this.isPlaying) { // if is not playing
            this.play();
            btnIcon.classList.remove('fa-play');
            btnIcon.classList.add('fa-stop');
            btnText.innerText = "Stop";
        } else { // if is playing
            this.stop();
            btnIcon.classList.remove('fa-stop');
            btnIcon.classList.add('fa-play');
            btnText.innerText = "Play";
        }
    }

    activatePad(event) {
        event.target.classList.toggle('active');
    }

    changeTempoNumber(event) {
        this.tempoNumber.innerText = event.target.value;
    }    

    changeTempo(event) {
        this.tempo = event.target.value;
        if(this.isPlaying) {
            this.pause();
            this.play();
        }
    }

    selectSound(event) {
        let percuName = event.target.classList[1];
        let audioFilePath = event.target.value;
        let audioHtml = document.querySelector('.beat.'+percuName);
        audioHtml.src = audioFilePath;
    }

    muteOrUnmute(event) {
        // vars
        let clickedBtn = event.target;
        let mutePercuName = event.target.classList[1];
        let trackToMute = document.querySelector('audio.beat.'+mutePercuName);
        // process
        clickedBtn.classList.toggle('active');
        if(clickedBtn.classList.contains('active')) { // mute the line
            clickedBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            trackToMute.volume = 0;
        } else { // unmute the line
            clickedBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            trackToMute.volume = 1;
        }
    }

    getCookie(id) {
        let cookies = document.cookie.split(';').reduce(
            (cookies, cookie) => {
            const [name, val] = cookie.split('=').map(c => c.trim());
            cookies[name] = decodeURIComponent(val);
            return cookies;
        }, {});
        let value = cookies[id];
        // Get array of tracks
        if(value[0] === '[') {
            ['["', '"]'].forEach((str) => {
                value = value.replace(str, '')
            })
            value = value.split('","')
        }
        return value;
    }

}