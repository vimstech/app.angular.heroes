import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero, Ability } from '../hero';
import { AbilityService } from '../ability.service';

@Component({
  selector: 'sq-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  private hero: Hero;
  private abilities: string;
  private ability: Ability;

  constructor(
    private heroService: HeroService,
    private abilityService: AbilityService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.ability = new Ability();
  }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
      if (hero.abilities) {
        this.abilities = hero.abilities.map(a => a.name).join(', ');
      }
      this.ability.hero_id = this.hero._id;
    });
  }

  save() {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }

  add() {
    this.abilityService.addAbility(this.hero, this.ability).subscribe(ability => {
      this.hero.abilities.push(ability);
      this.abilities = this.hero.abilities.map(a => a.name).join(', ')
      this.ability.name = ''
    })
  }
}
