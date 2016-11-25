"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var sitter_service_1 = require('./sitter.service');
var SitterDetailComponent = (function () {
    function SitterDetailComponent(sitterService, route, location) {
        this.sitterService = sitterService;
        this.route = route;
        this.location = location;
    }
    SitterDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.sitterService.getSitter(+params['id']); })
            .subscribe(function (sitter) { return _this.sitter = sitter; });
    };
    SitterDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    SitterDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-sitter-detail',
            template: "\n    <div *ngIf=\"sitter\">\n      <h2>{{sitter.name}} details!</h2>\n      <div><label>id: </label>{{sitter.id}}</div>\n      <div>\n        <label>name: </label>\n        <input [(ngModel)]=\"sitter.name\" placeholder=\"name\"/>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [sitter_service_1.SitterService, router_1.ActivatedRoute, common_1.Location])
    ], SitterDetailComponent);
    return SitterDetailComponent;
}());
exports.SitterDetailComponent = SitterDetailComponent;
//# sourceMappingURL=sitter-detail.component.js.map