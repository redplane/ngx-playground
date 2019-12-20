import {NgModule} from '@angular/core';
import {AttachmentReaderModule} from '../../services/attachment-reader/attachment-reader.module';
import {ImageMergeRoutingModule} from './image-merge-routing.module';

@NgModule({
  imports: [
    ImageMergeRoutingModule,
    AttachmentReaderModule
  ]
})
export class ImageMergeModule {

}
