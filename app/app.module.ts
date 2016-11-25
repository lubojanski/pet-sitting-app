import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { SitterDetailComponent } from './sitter-detail.component';
import { SittersComponent} from './sitters.component';
import { SitterService} from './sitter.service';



import { RouterModule }   from '@angular/router';
import { AppRoutingModule }     from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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