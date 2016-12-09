import { Component, OnInit, Input } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Sitter } from './sitter';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html'
})
export class MapComponent implements OnInit {

  @Input() sitters: Observable<Sitter[]>;
  @Input() address: string;
  map: any;
  geocoder: any;
  addresses: Array<string> = []; 

  ngOnInit() {
    var mapProp = {
            center: new google.maps.LatLng(52.2297, 21.0122),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            
        };
      this.map = new google.maps.Map(document.getElementById("gmap"), mapProp);

      this.geocoder = new google.maps.Geocoder();
  }

  geocodeAddress(address: string) {
        var geocoder = this.geocoder;
       var  resultsMap = this.map;
       this.addresses = [];
       this.sitters.subscribe( sitters => sitters
                              .map( sitter => this.addresses
                              .push(sitter.city +" " + sitter.address)));

       console.log("adresy: " + this.addresses);
       
       geocoder.geocode({'address': address}, (results, status) => {
         this.map.setCenter(results[0].geometry.location);
       });

       // TODO geocode address on sitter create
      for( let addr of this.addresses){
        setTimeout( () => {
        geocoder.geocode({'address': addr}, (results, status) => {
          if (status === 'OK') {
            let marker = new google.maps.Marker({
              map: resultsMap,
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