import { Component } from '@angular/core';
import { Sitter } from './sitter';
import { SitterService } from './sitter.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-sitters',
  templateUrl: './app/sitters.component.html',
  styleUrls: ['./app/sitters.component.css']
})
export class SittersComponent implements OnInit{
  constructor(private sitterService: SitterService) { }

  sitters: Sitter[];
  selectedSitter: Sitter;
  findSitters(city : string): void {
     this.sitterService.findSitters(city)
     .then(sitters => this.sitters = sitters);
  }
    ngOnInit(): void {
      this.sitterService.getSitters()
      .then(sitters => this.sitters = sitters.slice(0, 6));
  }
  onSelect(sitter: Sitter): void {
    this.selectedSitter = sitter;
  }

}
