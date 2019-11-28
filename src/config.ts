export default class Config {
    public showControls: boolean = false;
    public autoPlay: boolean = false;
    public audioUrl: string = '';
    public captionUrl: string = '';
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
