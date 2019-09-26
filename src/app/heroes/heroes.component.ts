import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'sq-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero._id).subscribe(_ => {
      this.heroes = this.heroes.filter((h) => h._id !== hero._id);
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      hero.abilities = [];
      this.heroes.push(hero);
    });
  }

  abilities (hero: Hero) {
    return hero.abilities.map((a: any) => a.name).join(', ');
  }
}
