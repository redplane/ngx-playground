import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const moduleRoutes: Routes = [
  {
    path: 'image-merge',
    loadChildren: () => import('./image-merge/image-merge.module')
      .then(m => m.ImageMergeModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(moduleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
