import { ActivateAfterPokemonDataGuard } from './services/activateAfterPokemonDataGuard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'pokemons',
    component: PokemonsComponent,
    canActivate: [ActivateAfterPokemonDataGuard],
  },
  { path: 'pokemons/:name', component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
