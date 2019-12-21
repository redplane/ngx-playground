import {NgModule} from '@angular/core';
import {DivSpinComponent} from './div-spin.component';
import {RouterModule, Routes} from '@angular/router';
import {SpinBoxModule} from '../shared/spin-box/spin-box.module';

const moduleRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DivSpinComponent
  }
];

@NgModule({
  declarations: [
    DivSpinComponent
  ],
  imports: [
    SpinBoxModule,
    RouterModule.forChild(moduleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DivSpinRoutingModule {

}
