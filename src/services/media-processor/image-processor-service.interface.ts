import {Observable} from 'rxjs';

export interface IImageProcessService {

  //#region Methods

  loadImageFromDataUrlAsync(dataUrl: string): Observable<HTMLImageElement>;

  //#endregion

}
