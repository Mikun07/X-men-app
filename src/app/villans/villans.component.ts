import { Component, OnInit } from '@angular/core';

import { Villan } from '../villan';
import { VillanService } from '../villan.service';

@Component({
  selector: 'app-villans',
  templateUrl: './villans.component.html',
  styleUrls: ['./villans.component.css']
})
export class VillansComponent implements OnInit {
  villans: Villan[] = [];

  constructor(private villanService: VillanService,) { }

  ngOnInit () {
    this.getVillans();
  }

  getVillans(): void {
    this.villanService.getVillans()
    .subscribe(villans => this.villans = villans);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.villanService.addVillan({ name } as Villan)
      .subscribe(villan => {
        this.villans.push(villan);
      });
  }

  delete(villan: Villan): void {
    this.villans = this.villans.filter(v => v !== villan);
    this.villanService.deleteVillans(villan.id).subscribe();
  }

}