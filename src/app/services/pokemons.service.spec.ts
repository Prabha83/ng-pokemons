import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonResponse } from '../models/pokemonResponse';
import { pokemon, pokemons } from '../utils/testdata';

import { PokemonsService } from './pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PokemonsService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(PokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have method to get all pokemons', () => {
    // Arrange
    const apiResponse: PokemonResponse = {
      count: 10,
      results: pokemons,
      next: '',
      previous: '',
    };
    httpClientSpy.get.and.returnValue(of(apiResponse));

    // Act
    service.getPokemons(10).subscribe((data) => {
      // Assert
      expect(data.count).toBe(10);
      expect(data.results.length).toBe(10);
    });
  });

  it('should have method to get pokemon details', () => {
    // Arrange
    const apiResponse = pokemon;
    httpClientSpy.get.and.returnValue(of(apiResponse));

    // Act
    service.getPokemonDetails('test').subscribe((data: any) => {
      // Assert
      expect(data.name).toBe('ditto');
    });
  });
});
