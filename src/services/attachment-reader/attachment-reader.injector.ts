import {InjectionToken} from '@angular/core';
import {IAttachmentReaderService} from './attachment-reader-service.interface';

export const ATTACHMENT_READER_SERVICE_INJECTOR = new InjectionToken<IAttachmentReaderService>('ATTACHMENT_SERVICE_INJECTOR');
