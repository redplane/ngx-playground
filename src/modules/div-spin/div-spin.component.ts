import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {ISize} from '../../models/size.interface';
import {SpinBoxComponent} from '../shared/spin-box/spin-box.component';
import {Prize} from '../../models/prize';
import {SpinnerItem} from '../shared/spin-box/spinner-item';
import {PrizeService} from '../../services/prize.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'div-spin',
  templateUrl: 'div-spin.component.html',
  styleUrls: ['div-spin.component.scss']
})
export class DivSpinComponent implements OnInit {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _spinBoxSize: ISize;

  @ViewChild(SpinBoxComponent, {static: false})
  public spinner: SpinBoxComponent;

  public prizes: Prize[];


  //#endregion

  //#region Accessors

  public get spinBoxSize(): ISize {
    return this._spinBoxSize;
  }

  //#endregion

  //#region Constructor

  constructor(protected prizeService: PrizeService) {
  }

  //#endregion

  //#region Methods

  public clickSpin(itemId?: string): void {
    this.spinner
      .spin(200, 40, itemId);
  }


  //#endregion
  ngOnInit(): void {
    this.prizeService
      .loadAvailablePrizesAsync()
      .subscribe(items => {
        this.prizes = items;
      });
  }
}
