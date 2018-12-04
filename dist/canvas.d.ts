export default class Canvas {
    private hostElement;
    protected ctx: CanvasRenderingContext2D;
    protected canvas: HTMLCanvasElement;
    constructor(hostElement: HTMLElement);
    destroyCanvas(): void;
}
