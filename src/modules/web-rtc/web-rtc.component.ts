import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'web-rtc',
  templateUrl: 'web-rtc.component.html',
  styleUrls: ['web-rtc.component.scss']
})
export class WebRtcComponent implements AfterViewInit {

  //#region Properties

  @ViewChild('videoPlayer', {static: false})
  public videoPlayerElementRef: ElementRef;

  //#endregion

  //#region Constructor

  constructor() {
  }

  //#endregion

  //#region Methods

  public ngAfterViewInit(): void {
    const htmlVideoElement = this.videoPlayerElementRef
      .nativeElement as HTMLVideoElement;

    const mediaSource = new MediaSource();
    const buffer = mediaSource.addSourceBuffer('aaa');
  }

  //#endregion
}
