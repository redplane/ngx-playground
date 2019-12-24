import {Component} from '@angular/core';
import {ISize} from '../../models/size.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'div-spin',
  templateUrl: 'div-spin.component.html',
  styleUrls: ['div-spin.component.scss']
})
export class DivSpinComponent {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _spinBoxSize: ISize;

  //#endregion

  //#region Accessors

  public get spinBoxSize(): ISize {
    return this._spinBoxSize;
  }

  //#endregion

  //#region Constructor

  constructor() {
    this._spinBoxSize = {width: 0, height: 0};
  }

  //#endregion

  //#region Methods

  public handleSpinBoxContainerResized(resizedSize: ISize): void {
    this._spinBoxSize = resizedSize;
    console.log(this._spinBoxSize);
  }


  //#endregion
}
