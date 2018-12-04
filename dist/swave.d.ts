export default class Swave {
    private hostElement;
    private config;
    private audio;
    private audioCtx;
    private audioSource;
    private gainNode;
    private analyserNode;
    private visualizer;
    constructor(hostElement: HTMLElement, config?: {});
    private loadAudio;
    private setAudioNode;
    private loadConfig;
    play(): void;
    stop(): void;
    pause(): void;
    setVolume(volume: number): void;
    enableVisualization(): void;
    disableVisualization(): void;
    getDuration(): number;
    setCurrentTime(time: number): void;
    getCurrentTime(): number;
    changeAudio(audioUrl: string): void;
}
