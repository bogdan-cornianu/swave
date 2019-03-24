# Swave [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bogdan-cornianu_swave&metric=alert_status)](https://sonarcloud.io/dashboard?id=bogdan-cornianu_swave)

Swave is a Javascript audio player library with waveform visualization.

Live Demo: https://bogdan-cornianu.github.io/swave/examples/

## Installation
`npm install swave`

## Usage
```
let swave = new Swave(document.querySelector('.swave-canvas-wrapper'), {audioUrl: 'url...'});
swave.play();
```
Swave uses [Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for visualizations,  [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) for audio streaming and a [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element to draw the sound bars.  
The first argument of the constructor is the html element where the canvas should be drawn.  
The second argument is a configuration object:
* **`audioUrl`: required**, the url for the audio to be played
* `enableVisualization`: false by default
* `autoPlay`: false by default
* `crossOrigin`: "anonymous" by default
* `showControls`: false by default. If enabled, will display the audio element's playback controls
  
Swave exposes several methods which you can use to build an audio player:  
* `play()`: starts playing the audio
* `stop()`: stops playing the audio
* `pause()`: pauses the current playing audio
* `setVolume(number)`: values between 0.1 and 1
* `enableVisualization(HTMLElement)`: shows the sound bars
* `disableVisualization()`: hides the sound bars
* `getDuration()`: the length of the audio, in seconds
* `setCurrentTime(number)`: set the current time of the audio
* `getCurrentTime()`: get the time of the audio as it plays
* `changeAudio(string)`: the new url of the audio  

## Contributing
If you find any bugs or have ideas of how Swave can be improved, please open an issue at https://github.com/bogdan-cornianu/swave/issues  
If you would like to contribute code please have a look at our open issues, pick something you like and have fun :)
* clone the repo
* `npm install` to install the dev dependencies
* `npm run start` will start the webpack dev server
* `npm run build` will build the production bundle
* fix a bug, implement a feature
* open a pull request

## Credits
Cosmin Seviciu https://github.com/ZetCoby
