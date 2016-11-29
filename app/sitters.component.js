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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var sitter_service_1 = require('./sitter.service');
var SittersComponent = (function () {
    function SittersComponent(sitterService, router) {
        this.sitterService = sitterService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    SittersComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    SittersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sitters = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time
            ? _this.sitterService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    SittersComponent.prototype.onSelect = function (sitter) {
        this.selectedSitter = sitter;
    };
    SittersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-sitters',
            templateUrl: './sitters.component.html',
            styleUrls: ['./sitters.component.css'],
            providers: [sitter_service_1.SitterService]
        }), 
        __metadata('design:paramtypes', [sitter_service_1.SitterService, router_1.Router])
    ], SittersComponent);
    return SittersComponent;
}());
exports.SittersComponent = SittersComponent;
//# sourceMappingURL=sitters.component.js.map