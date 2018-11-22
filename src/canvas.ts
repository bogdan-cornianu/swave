export default class Canvas {
    public ctx: CanvasRenderingContext2D;
    constructor (canvas: HTMLCanvasElement, config:any) {
        canvas.width = window.innerWidth-20;
        canvas.height= window.innerHeight-20;
        this.ctx = canvas.getContext('2d');
    }

}