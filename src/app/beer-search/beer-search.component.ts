import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
  } from 'rxjs/operators';

import { Beer } from '../beer';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-beer-search',
  templateUrl: './beer-search.component.html',
  styleUrls: ['./beer-search.component.css']
})
export class BeerSearchComponent implements OnInit {

  beer$: Observable<Beer[]>;
  private searchTerms = new Subject<string>();

  constructor(private beerService: BeerService) { }

  ngOnInit() {
    this.beer$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.beerService.getBeersByName(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
