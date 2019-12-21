import {NgModule} from '@angular/core';
import {SpinBoxComponent} from './spin-box.component';
import {ResizeSensorModule} from '../../../directives/resize-sensor/resize-sensor.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ResizeSensorModule
  ],
  declarations: [
    SpinBoxComponent
  ],
  exports: [
    SpinBoxComponent
  ]
})
export class SpinBoxModule {

}
