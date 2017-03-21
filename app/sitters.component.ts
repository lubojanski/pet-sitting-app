import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { Sitter } from './sitter';
import { MapComponent } from './map.component';
import { SitterService } from './sitter.service';

@Component({
  moduleId: module.id,
  selector: 'my-sitters',
  templateUrl: './sitters.component.html',
  styleUrls: ['./sitters.component.css'],
  providers: [SitterService]
})
export class SittersComponent implements OnInit{
  constructor(
    private sitterService: SitterService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild('gmap') myMap: MapComponent;
  sitters: Observable<Sitter[]>;
  address: Observable<string>;
  addresses: string[] = [];
  private searchTerms = new Subject<string>();

  search(term: string): void {

    //this.router.navigate(['/sitters', term]);
    //this.myMap.geocodeAddress(term);
    this.addresses.length = 0; 
    this.sitters.subscribe( sitters => sitters
                              .map( sitter => this.addresses
                              .push(sitter.city +" " + sitter.address)));
    console.log(this.addresses);
    this.searchTerms.next(term);
    setTimeout( () => this.myMap.geocodeAddress(term, this.addresses), 2000);
  }

  selectedSitter: Sitter;

  ngOnInit(): void {
       this.sitters = this.searchTerms
      .debounceTime(300)      
      .distinctUntilChanged()
      .switchMap(term => term ?
      this.sitterService.search(term)
      :
      Observable.of<Sitter[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Sitter[]>([]);
      });

      this.route.params
      .switchMap((params: Params) =>  this.sitterService.search(params['city']))
      .subscribe(sitters => this.sitters = Observable.of(sitters));
     
  }
  onSelect(sitter: Sitter): void {
    this.selectedSitter = sitter;
  }

}
