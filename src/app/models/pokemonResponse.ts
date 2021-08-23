import { Pokemon } from './pokemon';

export interface PokemonResponse {
  count: number;
  results: Pokemon[];
  next: string;
  previous: string;
}
