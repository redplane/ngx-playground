import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const moduleRoutes: Routes = [
  {
    path: 'image-merge',
    loadChildren: () => import('./image-merge/image-merge.module')
      .then(m => m.ImageMergeModule)
  },
  {
    path: 'canvas-image',
    loadChildren: () => import('./canvas-image/canvas-image.module')
      .then(m => m.CanvasImageModule)
  },
  {
    path: 'div-spin',
    loadChildren: () => import('./div-spin/div-spin.module')
      .then(m => m.DivSpinModule)
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
