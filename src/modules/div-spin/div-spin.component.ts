import {Component, ContentChild, ViewChild} from '@angular/core';
import {ISize} from '../../models/size.interface';
import {SpinBoxComponent} from '../shared/spin-box/spin-box.component';

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

  @ContentChild(SpinBoxComponent, {static: false})
  public spinner: SpinBoxComponent;

  //#endregion

  //#region Accessors

  public get spinBoxSize(): ISize {
    return this._spinBoxSize;
  }

  //#endregion

  //#region Constructor

  constructor() {
  }

  //#endregion

  //#region Methods

  public clickSpin(): void {
    this.spinner
      .spin(200, 40);
  }


  //#endregion
}
