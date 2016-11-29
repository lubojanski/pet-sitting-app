import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <router-outlet></router-outlet>
        `
})
export class AppComponent {
  title = 'Sit doge';
}