import {Observable} from 'rxjs';

export interface IAttachmentReaderService {

  //#region Methods

  loadDataUrlFromBlobAsync(blob: Blob): Observable<string>;

  loadTextFromBlobAsync(blob: Blob): Observable<string>;

  //#endregion

}
