import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Villan } from '../villan';
import { VillanService } from '../villan.service';

@Component({
  selector: 'app-villan-detail',
  templateUrl: './villan-detail.component.html',
  styleUrls: ['./villan-detail.component.css']
})
export class VillanDetailComponent implements OnInit {
  villan: Villan;
  villans: Villan[];

  constructor(
    private route: ActivatedRoute,
    private  villanService: VillanService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVillan();
  }

  getVillan(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.villanService.getVillans()
      .subscribe(villan => this.villans = villan);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.villanService.updateVillan(this.villan)
      .subscribe(() => this.goBack());
  }
}
