import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class VideoService {

  constructor(protected httpClient: HttpClient) {
  }

  public loadVideoAsync(fileName: string, start: number, end: number): Observable<ArrayBuffer> {
    const fullUrl = `http://localhost:64186/api/video?from=${start}&to=${end}&fileName=${fileName}`;
    return this.httpClient
      .get(fullUrl, {
        responseType: 'arraybuffer'
      });
  }

}
