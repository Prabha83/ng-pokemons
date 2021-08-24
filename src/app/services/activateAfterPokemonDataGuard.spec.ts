import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonResponse } from '../models/pokemonResponse';
import { pokemons } from '../utils/testdata';
import { ActivateAfterPokemonDataGuard } from './activateAfterPokemonDataGuard';
import { PokemonsService } from './pokemons.service';

describe('ActivateAfterPokemonDataGuard guard', () => {
  let dataGuard: ActivateAfterPokemonDataGuard;
  let mockPokemonService: jasmine.SpyObj<PokemonsService>;

  const mockPokemons: PokemonResponse = {
    count: 10,
    results: pokemons,
    next: '',
    previous: '',
  };

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonsService', [
      'getPokemons',
    ]);
    mockPokemonService.getPokemons.and.returnValue(of(mockPokemons));

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ActivateAfterPokemonDataGuard,
        { provide: PokemonsService, useValue: mockPokemonService },
      ],
    });
    dataGuard = TestBed.inject(ActivateAfterPokemonDataGuard);
  });

  it('should be created', () => {
    expect(dataGuard).toBeTruthy();
  });

  it('should call api and set list of pokemons', async () => {
    // Arrange
    mockPokemonService.pokemons = [];

    // Act
    const actual = await dataGuard.canActivate();

    // Assert
    expect(actual).toBe(true);
    expect(mockPokemonService.getPokemons).toHaveBeenCalledTimes(1);
    expect(mockPokemonService.pokemons.length).toBe(10);
  });

  it('should not call service when data exists', async () => {
    // Arrange
    mockPokemonService.pokemons = pokemons;

    // Act
    const actual = await dataGuard.canActivate();

    // Assert
    expect(actual).toBe(true);
    expect(mockPokemonService.getPokemons).not.toHaveBeenCalled();
  });
});
