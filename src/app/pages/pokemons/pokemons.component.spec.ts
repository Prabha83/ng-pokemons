import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokemonResponse } from 'src/app/models/pokemonResponse';
import { PokemonsService } from 'src/app/services/pokemons.service';
import { pokemons } from 'src/app/utils/testdata';

import { PokemonsComponent } from './pokemons.component';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonsService>;

  const mockPokemons: PokemonResponse = {
    count: 10,
    results: pokemons,
    next: '',
    previous: '',
  };

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonsService', [
      'getPokemonDetails',
    ]);
    mockPokemonService.getPokemonDetails.and.returnValue(of(mockPokemons));
    mockPokemonService.pokemons = pokemons;

    await TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      imports: [HttpClientModule],
      providers: [{ provide: PokemonsService, useValue: mockPokemonService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial values', () => {
    // Assert
    expect(component.page).toBe(1);
    expect(component.pageSize).toBe(20);
    expect(component.sortingType).toBe('');
  });

  it('should set pokemons data on component load', () => {
    // Assert
    component.pokemons = [];

    // Act
    component.ngOnInit();

    // Assert
    expect(component.collectionSize).toBe(10);
    expect(component.pokemons.length).toBe(10);
  });

  it('should return pokemonId from link', () => {
    // Act
    const id = component.getPokemonId('https://pokeapi.co/api/v2/pokemon/20/');

    // Assert
    expect(id).toBe('020');
  });

  it('should sort a to z', () => {
    // Arrange
    component.sortingType = '1';

    // Act
    component.onSort();

    // Assert
    expect(component.pokemons[0].name).toBe('arbok');
  });

  it('should sort z to a', () => {
    // Arrange
    component.sortingType = '2';

    // Act
    component.onSort();

    // Assert
    expect(component.pokemons[0].name).toBe('spearow');
  });
});
