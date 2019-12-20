import {AfterContentInit, AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {ATTACHMENT_READER_SERVICE_INJECTOR} from '../../services/attachment-reader/attachment-reader.injector';
import {IAttachmentReaderService} from '../../services/attachment-reader/attachment-reader-service.interface';
import {finalize, flatMap} from 'rxjs/operators';
import {ImageItem} from '../../models/image-item';
import {cloneDeep} from 'lodash';

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

  constructor(@Inject(ATTACHMENT_READER_SERVICE_INJECTOR) protected attachmentReaderService: IAttachmentReaderService) {
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
          return this.attachmentReaderService
            .loadImageFromDataUrlAsync(dataUrl);
        })
      )
      .subscribe(htmlImageElement => {

        this.addedImageItems = addedImageItems;

        if (this.htmlCanvas.width < htmlImageElement.width) {
          this.htmlCanvas.width = htmlImageElement.width;
        }

        if (this.htmlCanvas.height < htmlImageElement.height) {
          this.htmlCanvas.height = htmlImageElement.height;
        }

        this.attachmentReaderService
          .drawCanvasFromHtmlImageAsync(this.htmlCanvas, htmlImageElement);
      });
  }

  public clickAttachmentSelection(): void {
    (this.htmlFileSelector.nativeElement as HTMLInputElement).click();
  }

  //#endregion

  ngAfterViewInit(): void {
    console.log(this.htmlCanvasElementRef.nativeElement);
    this.htmlCanvas = this.htmlCanvasElementRef.nativeElement;
  }
}
