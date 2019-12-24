import {AfterViewInit, Directive, ElementRef, EventEmitter, Host, Input, OnDestroy, Output, ViewContainerRef} from '@angular/core';
import {ResizeSensor} from 'css-element-queries';
import {ISize} from '../../models/size.interface';
import {ReplaySubject, Subscription} from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[resize-sensor]'
})
export class ResizeSensorDirective implements AfterViewInit, OnDestroy {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private _hasSensorEnabled = false;

  // tslint:disable-next-line:variable-name
  private _elementResizedEvent: EventEmitter<ISize>;

  // tslint:disable-next-line:variable-name
  private _attachedSensor: ResizeSensor;

  // tslint:disable-next-line:variable-name
  private _handleSensorAttachmentSubject: ReplaySubject<'attach' | 'detach'>;

  // tslint:disable-next-line:variable-name
  private _handleSensorAttachmentSubscription: Subscription;

  // tslint:disable-next-line:variable-name
  private _htmlElement: HTMLElement;

  //#endregion

  //#region Accessors

  @Input('resize-sensor')
  public set hasSensorEnabled(on: boolean) {
    this._hasSensorEnabled = on;
    this._handleSensorAttachmentSubject
      .next(on ? 'attach' : 'detach');
  }

  public get hasSensorEnabled(): boolean {
    return this._hasSensorEnabled;
  }

  @Output('resized')
  public get elementResizedEvent(): EventEmitter<ISize> {
    return this._elementResizedEvent;
  }

  //#endregion

  //#region Constructor

  constructor(protected elementRef: ElementRef) {
    this._htmlElement = elementRef.nativeElement;
    this._elementResizedEvent = new EventEmitter<ISize>();
    this._handleSensorAttachmentSubject = new ReplaySubject<'attach' | 'detach'>();
  }

  //#endregion

  //#region Methods

  public ngAfterViewInit(): void {
    this._handleSensorAttachmentSubject
      .next(this.hasSensorEnabled ? 'attach' : 'detach');

    this._handleSensorAttachmentSubscription = this._handleSensorAttachmentSubject
      .subscribe(mode => this.handleSensorAttachment(mode));
  }

  public ngOnDestroy(): void {
    if (this._handleSensorAttachmentSubscription) {
      this._handleSensorAttachmentSubscription.unsubscribe();
      this._handleSensorAttachmentSubscription = null;
    }

    if (this._handleSensorAttachmentSubject) {
      this._handleSensorAttachmentSubject.unsubscribe();
      this._handleSensorAttachmentSubject = null;
    }

    if (this._attachedSensor) {
      this._attachedSensor.detach();
      this._attachedSensor = null;
    }
  }

  protected handleSensorAttachment(mode: 'attach' | 'detach'): void {

    const nativeElement = this._htmlElement;

    if (this._attachedSensor) {
      this._attachedSensor.detach();
    }

    if (mode === 'attach') {
      this._attachedSensor = new ResizeSensor(nativeElement, () => {
        const size: ISize = {
          width: nativeElement.offsetWidth,
          height: nativeElement.offsetHeight
        };

        this._elementResizedEvent
          .emit(size);
        console.log(size);
      });
    }
  }

  //#endregion
}
