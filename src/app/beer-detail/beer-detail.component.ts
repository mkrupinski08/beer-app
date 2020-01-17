import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
//import { Location } from '@angular/common';

import { Beer } from '../beer';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {

  beer: Beer;

  constructor(
    //private route: ActivatedRoute,
    private beerService: BeerService
    /*private location: Location*/) { }

  ngOnInit() {
    this.getRandomBeer();
  }

 // goBack(): void {
 //   this.location.back();
 // }

  getRandomBeer(): void {
    this.beerService.getRandomBeer()
        .subscribe(beer => this.beer = beer);
  }

}
