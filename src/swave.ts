import Config from './config';
import Visualizer from './visualizer';

export default class Swave {

    private hostElement: HTMLElement;
    private config: Config;
    private audio: HTMLAudioElement;
    private audioCtx: AudioContext;
    private audioSource: MediaElementAudioSourceNode;
    private gainNode: GainNode;
    private analyserNode: AnalyserNode;
    private visualizer: Visualizer;

    constructor (hostElement: HTMLElement, config = {}) {
        this.hostElement = hostElement;
        this.config = new Config(config);
        this.loadConfig();
        this.loadAudio();
    }

    private loadAudio (): void {
        this.audioCtx = new AudioContext();
        this.audioSource = this.audioCtx.createMediaElementSource(this.audio)
        this.gainNode = this.audioCtx.createGain();
        this.analyserNode = this.audioCtx.createAnalyser();
        this.setAudioNode(this.gainNode, null, this.analyserNode);
        this.setAudioNode(this.analyserNode, this.gainNode, null);
    }

    private setAudioNode (node: AnalyserNode | GainNode, previousNode?: AnalyserNode | GainNode, nextNode?: AnalyserNode | GainNode): void {
        if (previousNode) {
            previousNode.connect(node);
        } else {
            this.audioSource.connect(node);
        }
        if (nextNode) {
            node.connect(nextNode);
        } else {
            node.connect(this.audioCtx.destination);
        }
    }

    private loadConfig (): void {
        this.audio = new Audio(this.config.audioUrl);
        this.audio.crossOrigin = this.config.crossOrigin;
        this.audio.controls = this.config.showControls;
        this.audio.autoplay = this.config.autoPlay;
    }

    public play (): void {
        this.audio.play();
        if (this.config.enableVisualization) {
            this.enableVisualization();
        }
    }

    public stop (): void {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    public pause (): void {
        this.audio.pause();
    }

    public setVolume (volume: number): void {
        if (this.gainNode) {
            if (volume > 1) {
                volume = 1;
            }
            if (volume < 0.1) {
                volume = 0.1;
            }
            this.gainNode.gain.value = volume * volume;
        }
    }

    public enableVisualization (): void {
        if (!this.visualizer) {
            this.visualizer = new Visualizer(this.hostElement, this.analyserNode);
        }
    }

    public disableVisualization (): void {
        if (this.visualizer) {
            this.visualizer.destroyCanvas();
            this.visualizer = null;
        }
    }

    public getDuration (): number {
        return this.audio ? this.audio.duration : null;
    }

    public setCurrentTime (time: number): void {
        if (time <= this.audio.duration) {
            this.audio.currentTime = time;
        }
    }

    public getCurrentTime (): number {
        return this.audio ? this.audio.currentTime : null;
    }

    public changeAudio(audioUrl: string): void {
        if (audioUrl !== this.audio.currentSrc) {
            this.audio.src = audioUrl;
        }
    }
}

declare var window: any;
window.Swave = Swave;
