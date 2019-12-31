import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoadViewViewModel} from '../view-models/load-video.view-model';

@Injectable()
export class VideoService {

  constructor(protected httpClient: HttpClient) {
  }

  public loadVideoAsync(fileName: string, start: number, end: number): Observable<ArrayBuffer> {
    const fullUrl = `http://localhost:57366/api/video`;
    const model = new LoadViewViewModel(fileName, start, end);
    return this.httpClient
      .post(fullUrl, model, {
        responseType: 'arraybuffer'
      });
  }

}
