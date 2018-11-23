export default class Config {
    public showControls: boolean = false;
    public autoPlay: boolean = false;
    public enableVisualization: boolean = true;
    public audioUrl: string = '';
    public crossOrigin: string = 'anonymous';

    constructor (fromObj: any) {
        for (let property in fromObj) {
            for(let ownProperty in this) {
                if(property === ownProperty) {
                    this[ownProperty] = fromObj[property];
                }
            }
        }
    }


}
