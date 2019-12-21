import {IAttachmentReaderService} from './attachment-reader-service.interface';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable()
export class AttachmentReaderService implements IAttachmentReaderService {


  // Load data url from blob asynchronously.
  public loadDataUrlFromBlobAsync(blob: Blob): Observable<string> {

    return new Observable<string>(observer => {
      const fileReader = new FileReader();

      fileReader.onload = (event: ProgressEvent) => {
        observer.next(fileReader.result as string);
      };

      fileReader.onloadend = () => {
        observer.complete();
      };

      fileReader.onabort = () => {
        observer.error('FILE_READ_ABORT');
      };

      fileReader.onerror = (event: ProgressEvent) => {
        observer.error(fileReader.error);
      };

      fileReader.readAsDataURL(blob);
    });

  }

  public loadTextFromBlobAsync(blob: Blob, encoding?: string): Observable<string> {
    return new Observable(observer => {
      const fileReader = new FileReader();

      fileReader.onload = (event: ProgressEvent) => {
        observer.next(fileReader.result as string);
      };

      fileReader.onloadend = () => {
        observer.complete();
      };

      fileReader.onabort = () => {
        observer.error('FILE_READ_ABORT');
      };

      fileReader.onerror = (event: ProgressEvent) => {
        observer.error(fileReader.error);
      };

      fileReader.readAsText(blob, encoding);
    });
  }

}
