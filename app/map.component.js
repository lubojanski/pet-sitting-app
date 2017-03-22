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
        this.markers = [];
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        console.log("map oninit");
        var mapProp = {
            zoom: 12,
            center: { lat: 51.110, lng: 17.030 },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.geocoder = new google.maps.Geocoder();
        var map = new google.maps.Map(document.getElementById("gmap"), mapProp);
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(pos);
                map.setCenter(pos);
            });
        }
        this.map = map;
        if (this.city) {
            this.setMapCenter(this.city);
        }
    };
    MapComponent.prototype.setMapCenter = function (address) {
        var _this = this;
        this.geocoder.geocode({ 'address': address }, function (results, status) {
            _this.map.setCenter(results[0].geometry.location);
        });
    };
    MapComponent.prototype.geocodeAddress = function (address, addresses) {
        this.deleteMarkers();
        this.addresses = addresses;
        console.log("adresy w addresses:" + addresses);
        this.setMapCenter(address);
        this.AddressesToLatLng(addresses); // TODO geocode address on sitter create (OVER_QUERY_LIMIT)
    };
    MapComponent.prototype.deleteMarkers = function () {
        this.clearMarkers();
        this.markers = [];
    };
    MapComponent.prototype.clearMarkers = function () {
        this.setMapOnAll(null);
    };
    MapComponent.prototype.setMapOnAll = function (map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    };
    MapComponent.prototype.AddressesToLatLng = function (addresses) {
        var _this = this;
        var _loop_1 = function(addr) {
            setTimeout(function () {
                _this.geocoder.geocode({ 'address': addr }, function (results, status) {
                    if (status === 'OK') {
                        console.log("adres w geo: " + addr);
                        _this.addMarker(results);
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
        for (var _i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
            var addr = addresses_1[_i];
            _loop_1(addr);
        }
        ;
    };
    MapComponent.prototype.addMarker = function (results) {
        var marker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location
        });
        this.markers.push(marker);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Observable_1.Observable)
    ], MapComponent.prototype, "sitters", void 0);
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