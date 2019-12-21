import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {ATTACHMENT_READER_SERVICE_INJECTOR, IMAGE_PROCESSOR_SERVICE_INJECTOR} from '../../constants/services-injector.constant';
import {IImageProcessService} from '../../services/media-processor/image-processor-service.interface';
import {IAttachmentReaderService} from '../../services/attachment-reader/attachment-reader-service.interface';
import {fromEvent, Observable} from 'rxjs';
import {IPosition} from '../../models/position.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'canvas-image',
  templateUrl: 'canvas-image.component.html'
})
export class CanvasImageComponent implements AfterViewInit {

  @ViewChild('htmlCanvasElement', {static: false})
  public htmlCanvasElementRef: ElementRef;

  public position: IPosition = {x: 0, y: 0};

  constructor(@Inject(IMAGE_PROCESSOR_SERVICE_INJECTOR) protected imageProcessorService: IImageProcessService,
              @Inject(ATTACHMENT_READER_SERVICE_INJECTOR) protected attachmentReaderService: IAttachmentReaderService) {
  }

  ngAfterViewInit(): void {

    const htmlCanvasElement = this.htmlCanvasElementRef.nativeElement as HTMLCanvasElement;
    const htmlCanvasContext = htmlCanvasElement.getContext('2d');
    const blackWatchImageUrl = '/assets/black-watch.png';

    const observable = new Observable(observer => {
      const image = new Image();
      image.onload = () => {
        observer.next(image);
      };

      image.onloadend = () => {
        observer.complete();
      };

      image.src = blackWatchImageUrl;
    });


    observable.subscribe((image: HTMLImageElement) => {

      this.position = {x: 0, y: 0};
      htmlCanvasContext.drawImage(image, 0, 0, image.width,    image.height,     // source rectangle
        0, 0, 32, 32); // destination rectangle

      fromEvent(document, 'keypress')
        .subscribe((event: KeyboardEvent) => {

          const oldPosition = {...this.position};

          switch (event.key) {
            case 'w':
              this.position.y -= 10;
              break;
            case 'a':
              this.position.x -= 10;
              break;
            case 's':
              this.position.y += 10;
              break;
            case 'd':
              this.position.x += 10;
              break;
          }

          if (this.position.y < -64) {
            this.position.y = 405;
          } else if (this.position.y > 405) {
            this.position.y = 0;
          }

          htmlCanvasContext.clearRect(oldPosition.x, oldPosition.y, 64, 64);
          htmlCanvasContext.drawImage(image, this.position.x, this.position.y, 64, 64);
        });
    });

  }
}
