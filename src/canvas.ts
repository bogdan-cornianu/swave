import Config from "./config";

declare var window: any;

export default class Canvas {
    protected ctx: CanvasRenderingContext2D;
    protected canvas: HTMLCanvasElement;

    constructor (private hostElement: HTMLElement) {
        this.canvas = document.createElement('canvas');
        hostElement.appendChild(this.canvas);
        this.canvas.id = 'swave-canvas';
        this.canvas.width = hostElement.clientWidth;
        this.canvas.height= hostElement.clientHeight;
        this.ctx = this.canvas.getContext('2d');
    }

    public destroyCanvas () {
        this.hostElement.removeChild(this.canvas);
    }
}