import * as webvtt from "node-webvtt"

class vttDecoder {

    private webvttParsedCaption: any;

    constructor () {}
    public setCaption(vttFileUrl: string) {
        if (vttFileUrl) {
            fetch(vttFileUrl)
                .then((resp) => resp.text())
                .then((data) => {
                    this.webvttParsedCaption = webvtt.parse(data);
                })
        }
        
    }

    public getCaptionForTime(time: number) {
        if (this.webvttParsedCaption) {
            return this.webvttParsedCaption.cues.find((c) => {
                if (c.start <= time && c.end >= time) {
                    return c;
                }
            })
        }
        return null;
    }

    public getCaptions() {
        if (this.webvttParsedCaption) {
            return this.webvttParsedCaption.cues;
        }
        return null;
    }
}

export const decoder = new vttDecoder();