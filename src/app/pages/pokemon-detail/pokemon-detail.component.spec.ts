import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonsService } from 'src/app/services/pokemons.service';

import { PokemonDetailComponent } from './pokemon-detail.component';

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  const fakeActivatedRoute = {
    params: of({ name: 1 }),
  };

  const mockPokemonDetails = {
    name: 'hello',
    id: 20,
    height: 6,
    weight: 40,
  };

  beforeEach(async () => {
    const mockPokemonService = jasmine.createSpyObj('PokemonsService', [
      'getPokemonDetails',
    ]);
    (
      mockPokemonService as jasmine.SpyObj<PokemonsService>
    ).getPokemonDetails.and.returnValue(of(mockPokemonDetails));

    await TestBed.configureTestingModule({
      declarations: [PokemonDetailComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: PokemonsService, useValue: mockPokemonService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
