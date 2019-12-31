import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {VideoService} from '../../services/video.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'video-player',
  templateUrl: 'video-player.component.html'
})
export class VideoPlayerComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _mediaSource: MediaSource;

  public mediaUrl: string | SafeUrl;

  public get mediaSource(): MediaSource {
    return this._mediaSource;
  }

  constructor(protected videoService: VideoService,
              protected sanitizer: DomSanitizer, protected changeDetectorRef: ChangeDetectorRef) {
    this._mediaSource = new MediaSource();
    this.mediaUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this._mediaSource));
    this._mediaSource.addEventListener('sourceopen', (e) => {
      const sourceBuffer = this._mediaSource.addSourceBuffer('video/webm; codecs="vp09.00.10.08"');
      this.videoService
        .loadVideoAsync('videoplayback.webm', 1024, 1024 * 1024)
        .subscribe(data => {
          sourceBuffer.appendBuffer(data);
        });

    }, {once: true});
  }

  ngOnInit(): void {
  }
}
