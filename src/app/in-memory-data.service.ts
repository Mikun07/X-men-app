import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero'; 
import { Villan } from './villan';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Cyclops' },
      { id: 12, name: 'Storm' },
      { id: 13, name: 'Wolverine' },
      { id: 14, name: 'Gambit' },
      { id: 15, name: 'Ice-man' },
      { id: 16, name: 'Jean Grey' },
      { id: 17, name: 'Rogue' },
      { id: 18, name: 'Nigthcrawler' },
      { id: 19, name: 'ShadowCat' },
      { id: 20, name: 'Beast' }
    ];
    return {heroes};
  }

  createDab() {
    const villans = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {villans};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

  genIds(villans: Villan[]): number {
    return villans.length > 0 ? Math.max(...villans.map(villan => villan.id)) + 1 : 11;
  }
}
