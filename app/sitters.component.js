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
var sitter_service_1 = require('./sitter.service');
var SittersComponent = (function () {
    function SittersComponent(sitterService) {
        this.sitterService = sitterService;
    }
    SittersComponent.prototype.findSitters = function (city) {
        var _this = this;
        this.sitterService.findSitters(city)
            .then(function (sitters) { return _this.sitters = sitters; });
    };
    SittersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sitterService.getSitters()
            .then(function (sitters) { return _this.sitters = sitters.slice(0, 6); });
    };
    SittersComponent.prototype.onSelect = function (sitter) {
        this.selectedSitter = sitter;
    };
    SittersComponent = __decorate([
        core_1.Component({
            selector: 'my-sitters',
            templateUrl: './app/sitters.component.html',
            styleUrls: ['./app/sitters.component.css']
        }), 
        __metadata('design:paramtypes', [sitter_service_1.SitterService])
    ], SittersComponent);
    return SittersComponent;
}());
exports.SittersComponent = SittersComponent;
//# sourceMappingURL=sitters.component.js.map