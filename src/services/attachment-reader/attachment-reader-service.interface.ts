import {Observable} from 'rxjs';

export interface IAttachmentReaderService {

  //#region Methods

  loadDataUrlFromBlobAsync(blob: Blob): Observable<string>;

  loadTextFromBlobAsync(blob: Blob): Observable<string>;

  loadImageFromBlobAsync(blob: Blob): Observable<HTMLImageElement>;

  drawCanvasFromHtmlImageAsync(htmlCanvasElement: HTMLCanvasElement,
                               imageSource: HTMLImageElement): void;

  //#endregion

}
