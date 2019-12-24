import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {SpinStatuses} from './spin-statuses.enum';
import {ISize} from '../../../models/size.interface';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
// @ts-ignore
import anime from 'animejs';
import {SpinnerItem} from './spinner-item';
import {Observable} from 'rxjs';
import {cloneDeep} from 'lodash';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spin-box',
  templateUrl: 'spin-box.component.html',
  styleUrls: ['spin-box.component.scss'],
  exportAs: 'spinBox'
})
export class SpinBoxComponent implements OnInit {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _itemSize: ISize = {width: 0, height: 0};

  // Duration for spinning.
  // tslint:disable-next-line:variable-name
  private _duration: number;

  // Animation instance.
  // tslint:disable-next-line:variable-name
  private _animationInstance: anime.AnimeInstance;

  // List of items inside spinner.
  // tslint:disable-next-line:variable-name
  private _items: SpinnerItem[] = [];

  @ViewChild('initialCarousel', {static: false})
  public initialCarousel: ElementRef;

  // Whether slot is spinning or not.
  // tslint:disable-next-line:variable-name
  private _controlSpinStatus: SpinStatuses = SpinStatuses.initial;

  // tslint:disable-next-line:no-input-rename
  @Input('disabled')
  public hasControlDisabled = false;

  // Called when spin is stopped.
  // tslint:disable-next-line:no-output-rename
  @Output('spin-stopped')
  // tslint:disable-next-line:variable-name
  private _spinStoppedEvent: EventEmitter<void>;

  // Called when spin is started.
  // tslint:disable-next-line:no-output-rename
  @Output('spin-started')
  // tslint:disable-next-line:variable-name
  private _spinStartedEvent: EventEmitter<void>;

  //#endregion

  //#region Accessors

  // Check whether spinner is spinning or not.
  public get spinning(): boolean {
    return this._controlSpinStatus === SpinStatuses.spinning;
  }

  // Common size for every items that are inside spinner.
  public get itemSize(): ISize {
    return this._itemSize;
  }

  public get items(): SpinnerItem[] {
    const items = cloneDeep<SpinnerItem[]>(this._items);
    return items;
  }

  @Input('items')
  public set items(value: SpinnerItem[]) {
    if (!value) {
      this._items = value;
      return;
    }

    this._items = value;
  }

  @Input('size')
  public set boxSize(size: ISize) {
    const clonedSize = cloneDeep<ISize>(size);
    if (clonedSize.width < 0) {
      clonedSize.width = 0;
    }

    if (clonedSize.height < 0) {
      clonedSize.height = 0;
    }

    this._itemSize = clonedSize;
  }

  //#endregion

  //#region Constructor

  public constructor() {

    const items: SpinnerItem[] = [];
    items.push(new SpinnerItem('1', '/assets/blue-bottle.png'));
    items.push(new SpinnerItem('2', '/assets/budweiser.png'));
    items.push(new SpinnerItem('3', '/assets/foutain.png'));
    items.push(new SpinnerItem('4', '/assets/fuze-tea.png'));
    items.push(new SpinnerItem('1', '/assets/blue-bottle.png'));

    this._items = items;

    // Emitted when spin is stopped.
    this._spinStoppedEvent = new EventEmitter<void>();
    this._spinStartedEvent = new EventEmitter<void>();
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
  public spin(duration: number, maxLoop: number): void {

    if (!this.items || !this.items.length) {
      throw new Error('NO_ITEMS_AVAILABLE');
    }

    if (this._animationInstance) {
      if (this._animationInstance.began && !this._animationInstance.paused) {
        throw new Error('SPIN_ALREADY_STARTED');
      }

      if (this._animationInstance.paused) {
        this._animationInstance.play();
        return;
      }
    }

    // Calculate height
    const totalHeight = (this.items.length - 1) * this.itemSize.height;
    let loopCounter = 0;

    const htmlElement = this.initialCarousel.nativeElement as HTMLElement;

    this._animationInstance = this
      .addAnimation({
        targets: htmlElement,
        translateY: `-${totalHeight}px`,
        loop: true,
        duration,
        easing: 'linear'
      });

    this._animationInstance
      .loopComplete = (anim) => {
      loopCounter++;

      if (loopCounter > maxLoop) {
        this._spinStoppedEvent.emit();
        this.stop();
      }
    };

    this._animationInstance
      .loopBegin = () => {
      this._spinStartedEvent.emit();
    };

  }

  // Pause the spinner.
  public pause(): void {

    if (this._animationInstance) {
      this._animationInstance.pause();
    }
  }

  public stop(): void {
    if (!this._animationInstance) {
      return;
    }

    this._animationInstance.pause();
    this._animationInstance.seek(0);
    anime.remove(this._animationInstance);
    this._animationInstance = null;
  }

  // Called when slot size is changed.
  public handleSlotSizeChanged(changedSize: ISize): void {

    if (this._itemSize.height === changedSize.height && this._itemSize.width === changedSize.width) {
      return;
    }

    this._itemSize = {...changedSize};
  }

  // Add animation to a specific instance.
  protected addAnimation(options: anime.AnimeParams): anime.AnimeInstance {
    return anime(options);
  }

  //#endregion
}
