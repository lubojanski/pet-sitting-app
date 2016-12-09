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
    function SittersComponent(sitterService, route, router) {
        this.sitterService = sitterService;
        this.route = route;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    SittersComponent.prototype.search = function (term) {
        this.address = term;
        this.searchTerms.next(term);
        this.router.navigate(['/sitters', term]);
    };
    SittersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sitters = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) { return term ?
            _this.sitterService.search(term)
            :
                Observable_1.Observable.of([]); })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
        this.route.params
            .switchMap(function (params) { return _this.sitterService.search(params['city']); })
            .subscribe(function (sitters) { return _this.sitters = Observable_1.Observable.of(sitters); });
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
        __metadata('design:paramtypes', [sitter_service_1.SitterService, router_1.ActivatedRoute, router_1.Router])
    ], SittersComponent);
    return SittersComponent;
}());
exports.SittersComponent = SittersComponent;
//# sourceMappingURL=sitters.component.js.map