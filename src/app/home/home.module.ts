import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { EventoComponent } from '../evento/evento.component';
import { CrearEventoComponent } from '../crear-evento/crear-evento.component';
import { GestionarEventoComponent } from '../gestionar-evento/gestionar-evento.component';
import { EventoInfoComponent } from '../evento-info/evento-info.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { NotFoundComponent } from '../not-found/not-found.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, EventoComponent, CrearEventoComponent, GestionarEventoComponent, EventoInfoComponent, LoginComponent, SignupComponent, NotFoundComponent]
})
export class HomePageModule {}
