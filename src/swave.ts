import Config from './config';
import Visualizer from './visualizer';

class Swave {

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

    private loadAudio () {
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

    private loadConfig () {
        this.audio = new Audio(this.config.file);
        this.audio.crossOrigin = this.config.crossOrigin;
        this.audio.controls = this.config.showControls;
        this.audio.autoplay = this.config.autoPlay;
        if (this.config.enableVisualization) {
            this.enableVisualization();
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

    public enableVisualization (): void {
        this.visualizer = new Visualizer(this.hostElement, this.analyserNode);
    }

    public disableVisualization (): void {
        if (this.visualizer) {
            this.visualizer.destroyCanvas();
            this.visualizer = null;
        }
    }
}
