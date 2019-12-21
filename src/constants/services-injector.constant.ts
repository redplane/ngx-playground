import {InjectionToken} from '@angular/core';
import {IAttachmentReaderService} from '../services/attachment-reader/attachment-reader-service.interface';
import {IImageProcessService} from '../services/media-processor/image-processor-service.interface';
import {ICanvasProcessorService} from '../services/media-processor/canvas-processor-service.interface';

export const ATTACHMENT_READER_SERVICE_INJECTOR = new InjectionToken<IAttachmentReaderService>('ATTACHMENT_READER_SERVICE_INJECTOR');
export const IMAGE_PROCESSOR_SERVICE_INJECTOR = new InjectionToken<IImageProcessService>('IMAGE_PROCESSOR_SERVICE_INJECTOR');
export const CANVAS_PROCESSOR_SERVICE_INJECTOR = new InjectionToken<ICanvasProcessorService>('CANVAS_SERVICE_INJECTOR');
