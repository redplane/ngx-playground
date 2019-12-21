import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CanvasImageComponent} from './canvas-image.component';
import {MediaProcessorModule} from '../../services/media-processor/media-processor.module';
import {AttachmentReaderModule} from '../../services/attachment-reader/attachment-reader.module';

const moduleRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CanvasImageComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(moduleRoutes),
    MediaProcessorModule,
    AttachmentReaderModule,
    CommonModule
  ],
  declarations: [
    CanvasImageComponent
  ],
  exports: [
    RouterModule
  ]
})
export class CanvasImageRoutingModule {

}
