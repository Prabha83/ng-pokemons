import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filter = new FormControl('');
  page = 1;
  pageSize = 20;
  collectionSize = 0;
  sortingType = '';

  constructor(private pokemonService: PokemonsService) {
    this.filter.valueChanges.subscribe((x) => {
      this.pokemons = this.pokemonService.pokemons.filter(
        (p) =>
          p.name.includes(this.filter.value) ||
          p.url.includes(this.filter.value)
      );
    });
  }

  ngOnInit(): void {
    this.collectionSize = this.pokemonService.pokemons.length;
    this.getList();
  }

  private compare = (v1: string, v2: string) =>
    v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

  getList(): void {
    const pageData = this.pokemonService.pokemons.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
    this.pokemons = this.pokemons.concat(pageData);
  }

  getPokemonId(link: string): string {
    return link.split('/')[6].padStart(3, '0');
  }

  get hideLoadMore(): boolean {
    return this.pokemons.length !== this.collectionSize;
  }

  onSort(): void {
    if (this.sortingType) {
      this.pokemons = this.pokemons.sort((a: Pokemon, b: Pokemon) => {
        const res = this.compare(a.name, b.name);
        return this.sortingType === '1' ? res : -res;
      });
    }
  }

  loadMore(): void {
    this.page++;
    this.getList();
  }
}
