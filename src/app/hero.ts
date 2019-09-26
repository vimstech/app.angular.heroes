export class Ability {
  _id: string;
  name: string;
  power: number;
  hero_id: string
}

export class Hero {
  _id: string;
  name: string;
  created_at: string;
  updated_at: string;
  abilities: Array<Ability>;
}
