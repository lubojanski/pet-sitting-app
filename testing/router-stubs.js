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
// @Injectable()
// export class ActivatedRouteStub {
//   // ActivatedRoute.params is Observable
//   private subject = new BehaviorSubject(this.testParams);
//   params = this.subject.asObservable();
//   // Test parameters
//   private _testParams: {};
//   get testParams() { return this._testParams; }
//   set testParams(params: {}) {
//     this._testParams = params;
//     this.subject.next(params);
//   }
//   // ActivatedRoute.snapshot.params
//   get snapshot() {
//     return { params: this.testParams };
//   }
// }
var RouterLinkStubDirective = (function () {
    function RouterLinkStubDirective() {
        this.navigatedTo = null;
    }
    RouterLinkStubDirective.prototype.onClick = function () {
        this.navigatedTo = this.linkParams;
    };
    __decorate([
        core_1.Input('routerLink'), 
        __metadata('design:type', Object)
    ], RouterLinkStubDirective.prototype, "linkParams", void 0);
    RouterLinkStubDirective = __decorate([
        core_1.Directive({
            selector: '[routerLink]',
            host: {
                '(click)': 'onClick()'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], RouterLinkStubDirective);
    return RouterLinkStubDirective;
}());
exports.RouterLinkStubDirective = RouterLinkStubDirective;
//# sourceMappingURL=router-stubs.js.map