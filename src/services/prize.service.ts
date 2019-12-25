import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Prize} from '../models/prize';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class PrizeService {

  //#region Constructor

  constructor(protected httpClient: HttpClient) {
  }

  //#endregion

  //#region Methods

  public loadAvailablePrizesAsync(): Observable<Prize[]> {
    return this.httpClient
      .get('/assets/data/available-items.json')
      .pipe(
        map(items => items as Prize[])
      );
  }

  //#endregion
}
