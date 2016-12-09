import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SittersComponent }      from './sitters.component';
import { SitterDetailComponent }  from './sitter-detail.component';

const routes: Routes = [
  { path: '', component: SittersComponent },
  { path: 'sitter/:id', component: SitterDetailComponent },
  { path: 'sitters/:city',     component: SittersComponent },
  { path: 'sitters',     component: SittersComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}