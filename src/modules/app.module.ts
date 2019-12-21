import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AttachmentReaderModule} from '../services/attachment-reader/attachment-reader.module';
import {AppRoutingModule} from './app-routing.module';
import {MediaProcessorModule} from '../services/media-processor/media-processor.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AttachmentReaderModule,
    MediaProcessorModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
