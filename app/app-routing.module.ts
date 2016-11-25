import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SittersComponent }      from './sitters.component';
import { SitterDetailComponent }  from './sitter-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/sitters', pathMatch: 'full' },
  { path: 'detail/:id', component: SitterDetailComponent },
  { path: 'sitters',     component: SittersComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}