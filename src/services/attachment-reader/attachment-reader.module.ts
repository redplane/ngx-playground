import {NgModule} from '@angular/core';
import {ATTACHMENT_READER_SERVICE_INJECTOR} from './attachment-reader.injector';
import {AttachmentReaderService} from './attachment-reader.service';

@NgModule({
  providers: [
    {
      provide: ATTACHMENT_READER_SERVICE_INJECTOR,
      useClass: AttachmentReaderService
    }
  ]
})
export class AttachmentReaderModule {
}
