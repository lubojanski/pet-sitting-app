import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }  from './app.component';
import { SitterDetailComponent } from './sitter-detail.component';
import { SittersComponent} from './sitters.component';
import { SitterService} from './sitter.service';
import './rxjs-extensions';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SitterDetailComponent,
    SittersComponent
  ],
  providers: [
    SitterService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 


  
}