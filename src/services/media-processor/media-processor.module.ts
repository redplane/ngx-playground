import {NgModule} from '@angular/core';
import {CANVAS_PROCESSOR_SERVICE_INJECTOR, IMAGE_PROCESSOR_SERVICE_INJECTOR} from '../../constants/services-injector.constant';
import {ImageProcessorService} from './image-processor.service';
import {CanvasProcessorService} from './canvas-processor.service';

@NgModule({
  providers: [
    {
      provide: IMAGE_PROCESSOR_SERVICE_INJECTOR,
      useClass: ImageProcessorService
    },
    {
      provide: CANVAS_PROCESSOR_SERVICE_INJECTOR,
      useClass: CanvasProcessorService
    }
  ]
})
export class MediaProcessorModule {
}
