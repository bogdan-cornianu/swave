let playerManager = {
    swave: null,
    playButton: null,
    pauseButton: null,
    canvasContainer: null,
    loadAudioButton: null,
    loadAudioInput: null,
    playerPlays: false,
    audioUrl: null,
    overlay: null,
    volumeInput: null,
    seekerElement: null,
    seekerTimer: null,
    audioDuration: 0,

    init: function () {
        this.getElements();
        this.addClickEvents();
    },

    getElements: function () {
        this.playButton = document.querySelector('.controls .play');
        this.pauseButton = document.querySelector('.controls .pause');
        this.loadAudioButton = document.querySelector('.load-audio');
        this.loadAudioInput = document.querySelector('.audio-url');
        this.canvasContainer = document.querySelector('.swave-canvas-wrapper');
        this.overlay = document.querySelector('.overlay');
        this.volumeInput = document.querySelector('.volume-input');
        this.seekerElement = document.querySelector('.seeker');
    },

    addClickEvents: function () {
        this.playButton.addEventListener("click", () => {
            this.playerPlays = true;
            this.togglePlayPause();
            this.swave.play();
            this.startSeeker();
        },false);

        this.pauseButton.addEventListener("click", () => {
            this.playerPlays = false;
            this.togglePlayPause();
            this.swave.pause();
            this.startSeeker();
        },false);

        this.loadAudioButton.addEventListener("click", () => {
            this.audioUrl = this.loadAudioInput.value;
            this.toggleOverly();
            this.initSwave();
        },false);

        this.volumeInput.addEventListener("change", (e) => {
            if (this.swave) {
               this.swave.setVolume(e.target.value);
            }
        },false);
    },

    initSwave: function () {
        this.swave = new Swave(this.canvasContainer, {audioUrl: this.audioUrl});
        this.audioDuration = this.swave.getDuration();
    },

    togglePlayPause: function () {
        if (this.playerPlays) {
            this.playButton.style.display = "none"
            this.pauseButton.style.display = "inline-block"
        } else {
            this.playButton.style.display = "inline-block"
            this.pauseButton.style.display = "none"
        }
    },

    toggleOverly () {
        if (this.audioUrl) {
            this.overlay.style.display = "none"
        } else {
            this.overlay.style.display = "block"
        }
    },

    startSeeker () {
        this.seekerTimer = setInterval(() => {
            this.seekerElement.value = (this.swave.getCurrentTime() / this.swave.getDuration()) * 100;
        }, 200)
    },

    stopSeeker () {
        clearInterval(this.seekerTimer);
    },

    resize: function () {
        this.swave.disableVisualization();
        this.swave.enableVisualization();
    }

}

document.addEventListener("DOMContentLoaded", function() {
    playerManager.init();
});
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        playerManager.resize();
    }, 250);
});