import {AfterContentInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SpinStatuses} from './spin-statuses.constant';
import {ISize} from '../../../models/size.interface';
// @ts-ignore
import anime from 'animejs';
import {SpinnerItem} from './spinner-item';
import {cloneDeep, shuffle} from 'lodash';
import {IMAGE_PROCESSOR_SERVICE_INJECTOR} from '../../../constants/services-injector.constant';
import {IImageProcessService} from '../../../services/media-processor/image-processor-service.interface';
import {SpinBoxInitializationStatuses} from './spin-box-initialization-statuses.constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spin-box',
  templateUrl: 'spin-box.component.html',
  styleUrls: ['spin-box.component.scss'],
  exportAs: 'spinBox'
})
export class SpinBoxComponent implements OnInit, AfterContentInit {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _itemSize: ISize = {width: 0, height: 0};

  // tslint:disable-next-line:variable-name
  private _initialItems: SpinnerItem[] = [];

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
  private _spinStatus = SpinStatuses.idling;

  // Whether control is being initialized or not.
  // tslint:disable-next-line:variable-name
  private _controlInitializationStatus = SpinBoxInitializationStatuses.initializingControl;

  // tslint:disable-next-line:no-input-rename
  @Input('disabled')
  public hasControlDisabled = false;

  // tslint:disable-next-line:no-output-rename
  @Output('spin-status-updated')
  public readonly spinStatusUpdatedEvent: EventEmitter<string>;

  //#endregion

  //#region Accessors

  // Check whether spinner is spinning or not.
  public get spinning(): boolean {
    return this._spinStatus === SpinStatuses.spinning;
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
      this._items = [];
      return;
    }

    this._initialItems = cloneDeep<SpinnerItem[]>(value);
    this._items = shuffle<SpinnerItem>(this._initialItems);
    this._items = this._items.concat(this._items[0]);
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(IMAGE_PROCESSOR_SERVICE_INJECTOR) protected imageProcessorService: IImageProcessService) {
    this.spinStatusUpdatedEvent = new EventEmitter<string>();
  }

  //#endregion

  //#region Methods

  /*
  * Called when component is initialized.
  * */
  public ngOnInit(): void {
  }

  public ngAfterContentInit(): void {
    this._controlInitializationStatus = SpinBoxInitializationStatuses.initializingControlDone;
  }

  /*
  * Start spinning.
  * */
  public spin(duration: number, maxLoop: number, wonItemId?: string): void {

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

    if (this.spinning) {
      throw new Error('SPIN_ALREADY_STARTED');
    }

    // Calculate height
    let loopCounter = 0;

    // Initialize items list.
    this.items = this._initialItems;

    const htmlElement = this.initialCarousel
      .nativeElement as HTMLElement;

    this._animationInstance = this
      .addAnimation({
        targets: htmlElement,
        translateY: ['0%', '-100%'],
        loop: true,
        duration,
        easing: 'linear',
        begin: () => {
          this.updateSpinStatus(SpinStatuses.beginSpinning);
        },
        complete: () => {
          this.updateSpinStatus(SpinStatuses.idling);
        },
        loopComplete: () => {
          loopCounter++;

          if (loopCounter > maxLoop) {
            this.stop(wonItemId);
          }
        }
      });
  }

  // Pause the spinner.
  public pause(): void {

    if (this._animationInstance) {
      this._animationInstance.pause();
    }

    this.updateSpinStatus(SpinStatuses.idling);
  }

  // Id of prize that needs to display.
  public stop(itemId?: string): void {
    if (!this._animationInstance) {
      return;
    }

    if (itemId) {
      const itemIndex = this._items
        .findIndex(item => item.id === itemId);

      if (itemIndex < 0) {
        this.updateSpinStatus(SpinStatuses.finishedSpinning);
        throw new Error(`Item with id: ${itemId} is not found`);
      }

      this._items = [this._items[itemIndex]]
        .concat(this._items);
    }


    this._animationInstance.pause();
    this._animationInstance.seek(0);
    anime.remove(this._animationInstance);
    this._animationInstance = null;
    this.updateSpinStatus(SpinStatuses.finishedSpinning);
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

  // Update spin status.
  protected updateSpinStatus(status: string): void {
    this._spinStatus = status;
    this.spinStatusUpdatedEvent.emit(status);
  }

  //#endregion
}
