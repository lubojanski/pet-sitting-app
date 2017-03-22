import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Sitter } from './sitter';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html'
})
export class MapComponent implements AfterViewInit {

    constructor(
    private route: ActivatedRoute,
  ) {}

  @Input() sitters: Observable<Sitter[]>;
  map: any;
  geocoder: any;
  city: string;
 addresses: Array<string> = [];  
  markers: Array<any> = [];


  ngAfterViewInit() {
    console.log("map oninit");
    var mapProp = {
            zoom: 12,
            center: {lat:51.110, lng:17.030},
            mapTypeId: google.maps.MapTypeId.ROADMAP    
        };
    this.geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById("gmap"), mapProp);
    
            // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos);

            
            map.setCenter(pos);
            
          })}

          this.map = map;
    if(this.city){
    this.setMapCenter(this.city);  
    }
  }
  setMapCenter(address: string){
       this.geocoder.geocode({'address': address}, (results, status) => {
       this.map.setCenter(results[0].geometry.location);
       });
    }

  geocodeAddress(address: string, addresses: string[]) {
      this.deleteMarkers();
     this.addresses = addresses;
      console.log("adresy w addresses:" + addresses);    
      this.setMapCenter(address);
      this.AddressesToLatLng(addresses);  // TODO geocode address on sitter create (OVER_QUERY_LIMIT)
      }

  deleteMarkers() {
        this.clearMarkers();
        this.markers = [];
      }
  clearMarkers() {
        this.setMapOnAll(null);
      }
  setMapOnAll(map) {
        for (var i = 0; i < this.markers.length; i++) {
         this.markers[i].setMap(map);
        }
    }

  AddressesToLatLng(addresses: string[]){
        for( let addr of addresses){
        setTimeout( () => {
        this.geocoder.geocode({'address': addr}, (results, status) => {
          if (status === 'OK') {
            console.log("adres w geo: " + addr);
            this.addMarker(results);
          } else {
    
             if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
               console.log(status);
             }
            console.log(addr + ' Geocode was not successful for the following reason: ' + status);
          }
        });
        }, 200);

       };
    }
    addMarker(results){
            let marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location
            })
            this.markers.push(marker);
          
    }

 




}
// AIzaSyC4B8S6ppHJT23epfObJTIt_9D6VmlRZdk