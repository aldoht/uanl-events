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

  constructor(private router: Router, private eventsService: EventsService) { }

  ngOnInit(): void {
    /** Si no está loggeado, usar esta línea */
    // this.router.navigate(['/home/login']);
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
}
