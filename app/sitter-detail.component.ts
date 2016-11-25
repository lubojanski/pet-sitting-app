import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Sitter } from './sitter';
import { SitterService } from './sitter.service';
@Component({
  moduleId: module.id,
  selector: 'my-sitter-detail',
  template: `
    <div *ngIf="sitter">
      <h2>{{sitter.name}} details!</h2>
      <div><label>id: </label>{{sitter.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="sitter.name" placeholder="name"/>
      </div>
    </div>
  `
})
export class SitterDetailComponent implements OnInit {
  sitter: Sitter;

  constructor(
    private sitterService: SitterService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.sitterService.getSitter(+params['id']))
      .subscribe(sitter => this.sitter = sitter);
  }

  goBack(): void {
    this.location.back();
  }
}