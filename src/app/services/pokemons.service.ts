import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonResponse } from '../models/pokemonResponse';
import { Pokemon } from '../models/pokemon';

@Injectable()
export class PokemonsService {
  private API_BASE_URL: string = 'https://pokeapi.co/api/v2/';

  pokemons: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  getPokemons(limit: number): Observable<PokemonResponse> {
    const apiUrl: string = `${this.API_BASE_URL}pokemon?limit=${limit}&offset=0`;
    return this.http.get<PokemonResponse>(apiUrl);
  }

  getPokemonDetails(key: string) {
    const apiUrl: string = `${this.API_BASE_URL}pokemon/${key}`;
    return this.http.get(apiUrl);
  }
}
