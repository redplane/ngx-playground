import {NgModule} from '@angular/core';
import {WebRtcComponent} from './web-rtc.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WebRtcComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    WebRtcComponent
  ]
})
export class WebRtcRoutingModule {

}
