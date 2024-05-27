import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/models/event.model';
import { EventsService } from '../events.service';
import { firebaseService } from '../firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  eventosArray: EventModel[] = this.eventsService.events;
  eventosFiltrados: EventModel[] = [];
  dependencia: string = "";
  busquedaActiva: boolean = false;

  constructor(private router: Router, private eventsService: EventsService, private fbService: firebaseService) { }

  async ngOnInit() {
    // Actualizamos eventosArray al iniciar el componente
    await this.eventsService.actualizarEventsArray();
    this.eventosArray = this.eventsService.events;

    // Mostramos todos los eventos al inicio
    this.eventosFiltrados = this.eventosArray;
  }

  crearEvento() {
    /** if user no tiene permisos o no está loggeado: return */
    this.router.navigate(['/home/crearEvento']);
  }

  gestionarEvento() {
    /** if user no tiene permisos o no está loggeado: return */
    this.router.navigate(['/home/gestionarEvento']);
  }

  goToEvento(id: string) {
    this.router.navigate(['/home/evento', id]);
  }

  busqueda() {
    if (this.dependencia !== "") {
      this.busquedaActiva = true;
      this.eventosFiltrados = this.eventosArray.filter(evento =>
        evento.dependencia.toUpperCase() === this.dependencia.toUpperCase()
      );
    } else {
      this.busquedaActiva = false;
      this.eventosFiltrados = this.eventosArray;
    }
  }
}
