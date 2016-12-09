import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { Sitter } from './sitter';
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


  sitters: Observable<Sitter[]>;
  address: string;
  private searchTerms = new Subject<string>();

  search(term: string): void {
        this.address = term;
        this.searchTerms.next(term);
        this.router.navigate(['/sitters', term]);
      
      

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
      .switchMap((params: Params) => this.sitterService.search(params['city']))
      .subscribe(sitters => this.sitters = Observable.of(sitters));

      



  }
  onSelect(sitter: Sitter): void {
    this.selectedSitter = sitter;
  }

}
