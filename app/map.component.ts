import { Component, OnInit, Input } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Sitter } from './sitter';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html'
})
export class MapComponent implements OnInit {

    constructor(
    private route: ActivatedRoute,
  ) {}

  @Input() sitters: Observable<Sitter[]>;
  @Input() address: Observable<string>;
  map: any;
  geocoder: any;
  adres: string;
  addresses: Array<string> = []; 

  ngOnInit() {

     this.route.params
     .switchMap((params: Params) =>  this.setAddress(params['city']))
     .subscribe( address => this.adres = address);

          console.log("adres:" +this.adres);

    this.geocoder = new google.maps.Geocoder();


    var mapProp = {
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            
        };
      this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);

    this.geocoder.geocode({'address': this.adres}, (results, status) => {
    this.map.setCenter(results[0].geometry.location);
       });

     

  }
setAddress(address: string): Observable<string>{
   return this.address = Observable.of(address);
}
  geocodeAddress(address: string) {
    console.log("fired");
       this.addresses = [];
       this.sitters.subscribe( sitters => sitters
                              .map( sitter => this.addresses
                              .push(sitter.city +" " + sitter.address)));


       //console.log("adres : " + this.address);
       
       this.geocoder.geocode({'address': address}, (results, status) => {
         this.map.setCenter(results[0].geometry.location);
       });

       // TODO geocode address on sitter create
      for( let addr of this.addresses){
        setTimeout( () => {
        this.geocoder.geocode({'address': addr}, (results, status) => {
          if (status === 'OK') {
            let marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              center: results[0].geometry.location
            });
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


}
// AIzaSyC4B8S6ppHJT23epfObJTIt_9D6VmlRZdk