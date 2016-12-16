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
var Observable_1 = require('rxjs/Observable');
var router_1 = require('@angular/router');
var MapComponent = (function () {
    function MapComponent(route) {
        this.route = route;
        this.addresses = [];
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.setAddress(params['city']); })
            .subscribe(function (address) { return _this.adres = address; });
        console.log("adres:" + this.adres);
        this.geocoder = new google.maps.Geocoder();
        var mapProp = {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);
        this.geocoder.geocode({ 'address': this.adres }, function (results, status) {
            _this.map.setCenter(results[0].geometry.location);
        });
    };
    MapComponent.prototype.setAddress = function (address) {
        return this.address = Observable_1.Observable.of(address);
    };
    MapComponent.prototype.geocodeAddress = function (address) {
        var _this = this;
        console.log("fired");
        this.addresses = [];
        this.sitters.subscribe(function (sitters) { return sitters
            .map(function (sitter) { return _this.addresses
            .push(sitter.city + " " + sitter.address); }); });
        //console.log("adres : " + this.address);
        this.geocoder.geocode({ 'address': address }, function (results, status) {
            _this.map.setCenter(results[0].geometry.location);
        });
        // TODO geocode address on sitter create
        var _loop_1 = function(addr) {
            setTimeout(function () {
                _this.geocoder.geocode({ 'address': addr }, function (results, status) {
                    if (status === 'OK') {
                        var marker = new google.maps.Marker({
                            map: _this.map,
                            position: results[0].geometry.location,
                            center: results[0].geometry.location
                        });
                    }
                    else {
                        if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                            console.log(status);
                        }
                        console.log(addr + ' Geocode was not successful for the following reason: ' + status);
                    }
                });
            }, 200);
        };
        for (var _i = 0, _a = this.addresses; _i < _a.length; _i++) {
            var addr = _a[_i];
            _loop_1(addr);
        }
        ;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], MapComponent.prototype, "sitters", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], MapComponent.prototype, "address", void 0);
    MapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'map',
            templateUrl: 'map.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
// AIzaSyC4B8S6ppHJT23epfObJTIt_9D6VmlRZdk 
//# sourceMappingURL=map.component.js.map