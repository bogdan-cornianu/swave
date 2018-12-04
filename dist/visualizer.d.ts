import Canvas from "./canvas";
export default class Visualizer extends Canvas {
    private analyserNode;
    constructor(hostElement: HTMLElement, analyserNode: AnalyserNode);
    animate(): void;
    removeVisualizations(): void;
}
