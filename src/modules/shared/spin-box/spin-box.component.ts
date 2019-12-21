import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {SpinStatuses} from './spin-statuses.enum';
import {ISize} from '../../../models/size.interface';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spin-box',
  templateUrl: 'spin-box.component.html',
  styleUrls: ['spin-box.component.scss'],
  animations: [
    trigger('verticalMove', [
      state('true', style({
        top: '{{x}}'
      }), {params: {x: '0'}}),
      transition('* => true', animate('10s'))
    ])
  ],
  exportAs: 'spin-box'
})
export class SpinBoxComponent implements OnInit {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _itemSize: ISize = {width: 0, height: 0};

  private _activeCarouselStackIndex = 0;

  @Input('placeholder-prize-photo')
  public readonly placeholderPrizePhoto: string;

  // Prize photo.
  @Input('prize-photo')
  public readonly prizePhoto: string;

  // Image that used to display while slot is spinning.
  @Input('spin-background')
  public readonly spinBackgroundPhoto: string;

  // Whether slot is spinning or not.
  // tslint:disable-next-line:variable-name
  private _controlSpinStatus: SpinStatuses = SpinStatuses.initial;

  public get spinning(): boolean {
    return this._controlSpinStatus === SpinStatuses.spinning;
  }

  // tslint:disable-next-line:no-input-rename
  @Input('hidden')
  public bIsComponentHidden = false;

  // Interval to execute spinner animation.
  private _animationInterval: any;

  // Called when spin is stopped.
  @Output('on-spin-stopped')
  // tslint:disable-next-line:variable-name
  private _ngOnSpinStopped: EventEmitter<void>;

  // Called when spin is started.
  @Output('on-spin-started')
  // tslint:disable-next-line:variable-name
  private _ngOnSpinStarted: EventEmitter<Promise<void>>;

  public colors = ['#5F2C50', '#EA4154', '#F35734', '#E9D62A', '#3BB070'];

  public hasAnimationStarted = false;

  //#endregion

  //#region Accessors

  public get itemSize(): ISize {
    return this._itemSize;
  }

  public get activeCarouselStackIndex(): number {
    return this._activeCarouselStackIndex;
  }

  //#endregion

  //#region Constructor

  public constructor() {

    this.prizePhoto = '';
    this.spinBackgroundPhoto = '';
    this._animationInterval = null;

    // Emitted when spin is stopped.
    this._ngOnSpinStopped = new EventEmitter<void>();
    this._ngOnSpinStarted = new EventEmitter<Promise<void>>();
  }

  //#endregion

  //#region Methods

  /*
  * Called when component is initialized.
  * */
  public ngOnInit(): void {
    this._controlSpinStatus = SpinStatuses.initial;
  }

  /*
  * Start spinning.
  * */
  public spin(duration: number, reverseTime: number): Promise<void> {

    return null;
    // // Reset to initial state.
    // this._controlSpinStatus = SpinStatuses.initial;
    //
    // // Clear the previous animation interval.
    // if (this._animationInterval) {
    //   clearInterval(this._animationInterval);
    //   this._animationInterval = null;
    // }
    //
    // // Extend the dur
    // const extendedDuration: number = duration + 5000;
    // let position = 10000;
    // let iReverseTime = reverseTime;
    // if (iReverseTime < 0) {
    //   iReverseTime = 2;
    // }
    //
    // // Initialize spinner task.
    // const spinTask = (): void => {
    //   $(this._spinBackground.nativeElement).animate({
    //     backgroundPositionY: `+=${position}%`
    //   }, extendedDuration);
    //
    //   position *= -1;
    // };
    //
    // // Initialize new animation interval
    // this._animationInterval = setInterval(spinTask, duration / iReverseTime);
    //
    // // Initialize main task promise.
    // const pSpinPromise = new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //
    //     // Stop the spinner.
    //     this.stop();
    //
    //     resolve();
    //   }, duration);
    // });
    //
    // // Spin the wheel.
    // spinTask();
    //
    // // Set status to spinning.
    // this._controlSpinStatus = SpinStatuses.spinning;
    //
    // this._ngOnSpinStarted.emit();
    // return pSpinPromise;
  }

  /*
  * Stop the spinner.
  * */
  public stop(): void {

    // Clear the interval.
    if (this._animationInterval) {
      clearInterval(this._animationInterval);
      this._animationInterval = null;
    }

    // Stop spinning.
    this._controlSpinStatus = SpinStatuses.finished;

    // Emit the stop event.
    this._ngOnSpinStopped.emit();
  }

  /*
  * Get prize display.
  * */
  public ngGetPrizeDisplay(): string {
    switch (this._controlSpinStatus) {
      case SpinStatuses.finished:
        return this.prizePhoto;
      default:
        if (!this.placeholderPrizePhoto || !this.placeholderPrizePhoto.length) {
          return this.prizePhoto;
        }

        return this.placeholderPrizePhoto;

    }
  }

  public handleSlotSizeChanged(changedSize: ISize): void {
    this._itemSize = {...changedSize};
  }

  public handleVerticalMoveDoneEvent(event: any): void {
    console.log(event);
    this._activeCarouselStackIndex = Math.abs(this._activeCarouselStackIndex - 1);
    console.log(this._activeCarouselStackIndex);
  }

  public loadSizeInUnit(size: number, unit: string): string {
    return `${size}${unit}`;
  }

  public clickSpin(): void {
    this.hasAnimationStarted = true;
  }

  //#endregion
}
