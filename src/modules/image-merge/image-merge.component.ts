import {AfterContentInit, AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {
  ATTACHMENT_READER_SERVICE_INJECTOR,
  CANVAS_PROCESSOR_SERVICE_INJECTOR,
  IMAGE_PROCESSOR_SERVICE_INJECTOR
} from '../../constants/services-injector.constant';
import {IAttachmentReaderService} from '../../services/attachment-reader/attachment-reader-service.interface';
import {finalize, flatMap} from 'rxjs/operators';
import {ImageItem} from '../../models/image-item';
import {cloneDeep} from 'lodash';
import {IImageProcessService} from '../../services/media-processor/image-processor-service.interface';
import {ICanvasProcessorService} from '../../services/media-processor/canvas-processor-service.interface';
import {ISize} from '../../models/size.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'image-merge',
  templateUrl: './image-merge.component.html'
})
export class ImageMergeComponent implements AfterViewInit {

  //#region Properties

  @ViewChild('htmlFileSelector', {static: false})
  public htmlFileSelector: ElementRef;

  @ViewChild('htmlCanvasElement', {static: false})
  public htmlCanvasElementRef: ElementRef;

  public addedImageItems: ImageItem[];

  public htmlCanvas: HTMLCanvasElement;

  //#endregion

  //#region Constructor

  constructor(@Inject(ATTACHMENT_READER_SERVICE_INJECTOR) protected attachmentReaderService: IAttachmentReaderService,
              @Inject(IMAGE_PROCESSOR_SERVICE_INJECTOR) protected imageProcessorService: IImageProcessService,
              @Inject(CANVAS_PROCESSOR_SERVICE_INJECTOR) protected canvasProcessorService: ICanvasProcessorService) {
    this.addedImageItems = [];
  }

  //#endregion

  //#region Methods

  public attachmentSelected(event: Event): void {
    const htmlInputElement = event.target as HTMLInputElement;
    const attachments = htmlInputElement.files;
    const attachment = attachments[0];


    const addedImageItems = cloneDeep<ImageItem[]>(this.addedImageItems);

    this.attachmentReaderService
      .loadDataUrlFromBlobAsync(attachment)
      .pipe(
        finalize(() => {
          htmlInputElement.value = null;
        }),
        flatMap(dataUrl => {
          addedImageItems.push(new ImageItem(attachment.name, dataUrl));
          return this.imageProcessorService
            .loadImageFromDataUrlAsync(dataUrl);
        })
      )
      .subscribe(htmlImageElement => {

        this.addedImageItems = addedImageItems;

        // if (this.htmlCanvas.width !== htmlImageElement.width) {
        //   this.htmlCanvas.width = htmlImageElement.width;
        // }
        //
        // if (this.htmlCanvas.height !== htmlImageElement.height) {
        //   this.htmlCanvas.height = htmlImageElement.height;
        // }

        console.log(`${htmlImageElement.width} - ${htmlImageElement.height}`);

        // this.canvasProcessorService
        //   .drawCanvasFromHtmlImage(this.htmlCanvas,
        //     htmlImageElement, 0, 0,
        //     htmlImageElement.width, htmlImageElement.height);
      });
  }

  public clickAttachmentSelection(): void {
    (this.htmlFileSelector.nativeElement as HTMLInputElement).click();
  }

  public clickClearCanvas(): void {
    this.htmlCanvas.getContext('2d')
      .clearRect(0, 0, this.htmlCanvas.width, this.htmlCanvas.height);
  }

  public handleCanvasResizeEvent(size: ISize): void {
    console.log(`Width = ${size.width} | Height = ${size.height}`);
  }

  //#endregion

  ngAfterViewInit(): void {
    this.htmlCanvas = this.htmlCanvasElementRef.nativeElement;
  }
}
