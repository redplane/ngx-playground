import {AfterViewInit, Component} from '@angular/core';
import {VideoService} from '../../services/video.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-player',
  templateUrl: 'video-player.component.html'
})
export class VideoPlayerComponent {

  // tslint:disable-next-line:variable-name
  private _mediaSource: MediaSource;

  public mediaSourceUrl: string | SafeUrl = null;

  constructor(protected videoService: VideoService,
              protected sanitizer: DomSanitizer) {
    this._mediaSource = new MediaSource();
    this.mediaSourceUrl = this.sanitizer.bypassSecurityTrustUrl( window.URL.createObjectURL(this._mediaSource));

    this._mediaSource.addEventListener('sourceopen', (e) => {

      this.videoService
        .loadVideoAsync('elephants-dream.webm', 0, 32768)
        .subscribe(data => {
          const sourceBuffer = this._mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
          sourceBuffer.appendBuffer(data);
        });

    }, false);
  }
}
