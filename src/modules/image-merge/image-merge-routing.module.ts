import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageMergeComponent} from './image-merge.component';

const moduleRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ImageMergeComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(moduleRoutes)
  ],
  declarations: [
    ImageMergeComponent
  ],
  exports: [
    RouterModule
  ]
})
export class ImageMergeRoutingModule {

}
