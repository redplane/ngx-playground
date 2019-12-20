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

  public loadImageFromBlobAsync(blob: Blob): Observable<HTMLImageElement> {
    return this.loadDataUrlFromBlobAsync(blob)
      .pipe(
        flatMap(this.loadImageFromDataUrlAsync)
      );
  }

  public loadImageFromDataUrlAsync(dataUrl: string): Observable<HTMLImageElement> {

    return new Observable<HTMLImageElement>(observer => {
      const htmlImageElement = new Image();

      htmlImageElement.onload = () => {
        observer.next(htmlImageElement);
      };

      htmlImageElement.onloadend = () => {
        observer.complete();
      };

      htmlImageElement.onabort = () => {
        observer.error('ERROR_ABORT_LOADING');
      };

      htmlImageElement.onerror = () => {
        observer.error('ERROR_LOADING');
      };

      htmlImageElement.src = dataUrl;
    });

  }

  public drawCanvasFromHtmlImageAsync(htmlCanvasElement: HTMLCanvasElement,
                                      imageSource: HTMLImageElement): void {
    const context = htmlCanvasElement.getContext('2d');
    context.drawImage(imageSource, 0, 0, htmlCanvasElement.width, htmlCanvasElement.width);
  }

  public drawCanvasFromDataUrlAsync(htmlCanvasElement: HTMLCanvasElement, dataUrl: string): Observable<void> {
    return this.loadImageFromDataUrlAsync(dataUrl)
      .pipe(
        flatMap(htmlImageElement => {
          this.drawCanvasFromHtmlImageAsync(htmlCanvasElement, htmlImageElement);
          return of(void (0));
        })
      );
  }

}
