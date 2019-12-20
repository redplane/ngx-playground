import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {ATTACHMENT_READER_SERVICE_INJECTOR} from '../../services/attachment-reader/attachment-reader.injector';
import {IAttachmentReaderService} from '../../services/attachment-reader/attachment-reader-service.interface';
import {finalize, flatMap} from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'image-merge',
  templateUrl: './image-merge.component.html'
})
export class ImageMergeComponent {

  //#region Properties

  @ViewChild('htmlFileSelector', {static: false})
  public htmlFileSelector: ElementRef;

  public canvases: HTMLCanvasElement[];

  //#endregion

  //#region Constructor

  constructor(@Inject(ATTACHMENT_READER_SERVICE_INJECTOR) protected attachmentReaderService: IAttachmentReaderService) {
    this.canvases = [];
  }

  //#endregion

  //#region Methods

  public attachmentSelected(event: Event): void {
    const htmlInputElement = event.target as HTMLInputElement;
    const attachments = htmlInputElement.files;
    this.attachmentReaderService
      .loadImageFromBlobAsync(attachments[0])
      .pipe(
        finalize(() => {
          htmlInputElement.value = null;
        })
      )
      .subscribe();
  }

  public clickAttachmentSelection(): void {
    (this.htmlFileSelector.nativeElement as HTMLInputElement).click();
  }

  //#endregion
}
