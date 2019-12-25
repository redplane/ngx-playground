import {Component} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'web-rtc',
  templateUrl: 'web-rtc.component.html',
  styleUrls: ['web-rtc.component.scss']
})
export class WebRtcComponent {

  constructor() {
    const video = new HTMLVideoElement();
    video.srcObject = new MediaStream();
  }
}
