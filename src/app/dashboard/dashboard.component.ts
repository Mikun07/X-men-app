import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Villan } from '../villan';
import { HeroService } from '../hero.service';
import { VillanService } from '../villan.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  villans: Villan[] = [];

  constructor(private heroService: HeroService, private villanService: VillanService) { }

  ngOnInit() {
    this.getHeroes();
    this.getVillans();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getVillans(): void {
    this.villanService.getVillans()
      .subscribe(villans => this.villans = villans.slice(1, 5));
  }
  
}
