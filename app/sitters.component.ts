import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
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
    private router: Router) { }

  sitters: Observable<Sitter[]>;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectedSitter: Sitter;

    ngOnInit(): void {
       this.sitters = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.sitterService.search(term)
        : Observable.of<Sitter[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Sitter[]>([]);
      });
  }
  onSelect(sitter: Sitter): void {
    this.selectedSitter = sitter;
  }

}
