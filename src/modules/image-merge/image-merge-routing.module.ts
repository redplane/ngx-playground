import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageMergeComponent} from './image-merge.component';
import {CommonModule} from '@angular/common';
import {ResizeSensorModule} from '../../directives/resize-sensor/resize-sensor.module';

const moduleRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ImageMergeComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(moduleRoutes),
    CommonModule,
    ResizeSensorModule
  ],
  declarations: [
    ImageMergeComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ImageMergeRoutingModule {

}
