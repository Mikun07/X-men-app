import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { VillansComponent } from './villans/villans.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { VillanDetailComponent } from './villan-detail/villan-detail.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'villans', component: VillansComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailsComponent},
  { path: 'detail/:id', component: VillanDetailComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }