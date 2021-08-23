import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit {
  @Input()
  pokemonDetails?: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const name = params['name'];
      this.getDetails(name);
    });
  }

  private getDetails(name: string) {
    this.pokemonService.getPokemonDetails(name).subscribe((data) => {
      console.log(data);
      this.pokemonDetails = data;
    });
  }

  get pokemonImage(): string {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.pokemonId}.png`;
  }

  get pokemonId(): string {
    return this.pokemonDetails?.id.toString().padStart(3, '0');
  }

  get pokemonWeight(): number {
    return this.pokemonDetails?.weight / 10;
  }

  get pokemonHeight(): number {
    return this.pokemonDetails?.height / 10;
  }
}
