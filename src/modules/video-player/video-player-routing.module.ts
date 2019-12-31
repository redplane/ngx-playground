import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {VideoPlayerComponent} from './video-player.component';
import {MediaProcessorModule} from '../../services/media-processor/media-processor.module';
import {AttachmentReaderModule} from '../../services/attachment-reader/attachment-reader.module';

const moduleRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VideoPlayerComponent
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
    VideoPlayerComponent
  ],
  exports: [
    RouterModule
  ]
})
export class VideoPlayerRoutingModule {

}
