import {NgModule} from '@angular/core';
import {DivSpinComponent} from './div-spin.component';
import {RouterModule, Routes} from '@angular/router';

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
    RouterModule.forChild(moduleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DivSpinRoutingModule {

}
