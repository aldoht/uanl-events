import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CrearEventoComponent } from '../crear-evento/crear-evento.component';
import { GestionarEventoComponent } from '../gestionar-evento/gestionar-evento.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { EventoInfoComponent } from '../evento-info/evento-info.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'crearEvento',
    component: CrearEventoComponent
  },
  {
    path: 'gestionarEvento',
    component: GestionarEventoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'evento/:id',
    component: EventoInfoComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
