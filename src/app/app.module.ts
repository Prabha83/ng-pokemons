import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonsService } from './services/pokemons.service';
import { ActivateAfterPokemonDataGuard } from './services/activateAfterPokemonDataGuard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonsComponent,
    PokemonDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PokemonsService, ActivateAfterPokemonDataGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
