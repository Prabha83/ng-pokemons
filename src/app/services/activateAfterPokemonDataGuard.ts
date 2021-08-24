import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { PokemonsService } from './pokemons.service';

@Injectable()
export class ActivateAfterPokemonDataGuard implements CanActivate {
  constructor(private pokemonService: PokemonsService) {}

  canActivate() {
    if (this.pokemonService.pokemons.length === 0) {
      return this.pokemonService
        .getPokemons(500)
        .toPromise()
        .then((response) => {
          this.pokemonService.pokemons = response.results;
          return true;
        })
        .catch((error) => {
          return false;
        });
    } else {
      return true;
    }
  }
}
