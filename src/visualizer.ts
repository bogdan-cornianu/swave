import Canvas from "./canvas";

export default class Visualizer extends Canvas {

    constructor (hostElement: HTMLElement, private analyserNode: AnalyserNode) {
        super(hostElement);
        this.animate();
    }

    public animate() {
        const WIDTH = this.canvas.clientWidth;
        const HEIGHT = this.canvas.clientHeight;
        this.analyserNode.fftSize = 256;
        let bufferLengthAlt = this.analyserNode.frequencyBinCount;
        let dataArrayAlt = new Uint8Array(bufferLengthAlt);

        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        let draw = () => {
            let drawVisual = requestAnimationFrame(draw);
            this.analyserNode.getByteFrequencyData(dataArrayAlt);

            this.ctx.fillStyle = 'rgb(255, 255, 255)';
            this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

            var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
            var barHeight;
            var x = 0;

            for (var i = 0; i < bufferLengthAlt; i++) {
                barHeight = dataArrayAlt[i];

                this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',15,156)';
                this.ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

                x += barWidth + 1;
            }
        }
        draw();
    }
}