import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IImageProcessService} from './image-processor-service.interface';

@Injectable()
export class ImageProcessorService implements IImageProcessService {

  //#region Constructor

  constructor() {
  }

  //#endregion

  //#region Methods

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

  //#endregion
}
