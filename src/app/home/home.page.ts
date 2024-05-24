import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/models/event.model';
import { EventsService } from '../events.service';

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

  constructor(private router: Router, private eventsService: EventsService) { }

  ngOnInit(): void {
    /** Si no está loggeado, usar esta línea */
    // this.router.navigate(['/home/login']);

    // Inicialmente, mostramos todos los eventos
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
