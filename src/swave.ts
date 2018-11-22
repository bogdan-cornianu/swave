import {config as defaultConfig} from './config';

class Swave {

    private element: HTMLElement;
    private config:any;
    private audio: HTMLAudioElement;
    private audioCtx: AudioContext;
    private audioSource: MediaElementAudioSourceNode;
    private gainNode: GainNode;
    private analyserNode: AnalyserNode;

    constructor (element: HTMLElement, config = {}) {
        this.element = element;
        this.config = {...defaultConfig, ...config};
        this.loadAudio();

    }

    private loadAudio () {
        this.audio = new Audio(this.config.file);
        this.audio.crossOrigin = this.config.crossOrigin;
        this.audio.controls = this.config.showControls;
        this.audio.autoplay = this.config.autoPlay;
        this.audioCtx = new AudioContext();
        this.audioSource = this.audioCtx.createMediaElementSource(this.audio)
        this.gainNode = this.audioCtx.createGain();
        this.analyserNode = this.audioCtx.createAnalyser();
        this.setAudioNode(this.gainNode, null, this.analyserNode);
        this.setAudioNode(this.analyserNode, this.gainNode, null);

    }

    private setAudioNode (node: AnalyserNode | GainNode, previousNode?: AnalyserNode | GainNode, nextNode?: AnalyserNode | GainNode) {
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

    public play (): void {
        this.audio.play();
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
            this.gainNode.gain.value = volume
        }
    }

}
