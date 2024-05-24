import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/models/event.model';
import { EventsService } from '../events.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-gestionar-evento',
  templateUrl: './gestionar-evento.component.html',
  styleUrls: ['./gestionar-evento.component.scss'],
})
export class GestionarEventoComponent  implements OnInit {
  fechaCompleta: string;
  evento: EventModel = {
    id: "",
    nombre: "",
    descripcion: "",
    fecha: "",
    hora: "",
    lugar: "",
    costo: 0,
    tipo: "",
    organizador: "",
    dependencia: "",
    privacidad: "Público",
    asientos: null
  }
  eventosArray: EventModel[] = [];
  todasIds: string[] = [];

  constructor(private router: Router, private eventsService: EventsService) {
    this.eventosArray = this.eventsService.events;
    this.todasIds = eventsService.Ids;
    this.fechaCompleta = "2024-05-27T00:00:00";
  }

  ngOnInit() {}

  modificarInfo() {
    this.evento.fecha = this.fechaCompleta.slice(0,10);
    this.evento.hora = this.fechaCompleta.slice(11);
    /** Buscar Id en la base de datos
     * y actualizar la info del formulario (this.evento)
     */
    this.limpiarEvento();
    this.router.navigate(['/home/']);
  }

  actualizarInfo() {
    for (let evento of this.eventosArray) {
      if (evento.id == this.evento.id) {
        this.evento = {
          id: evento.id,
          nombre: evento.nombre,
          descripcion: evento.descripcion,
          fecha: evento.fecha,
          hora: evento.hora,
          lugar: evento.lugar,
          costo: evento.costo,
          tipo: evento.tipo,
          organizador: evento.organizador,
          dependencia: evento.dependencia,
          privacidad: evento.privacidad,
          asientos: evento.asientos
        }
        this.fechaCompleta = evento.fecha.concat("T", evento.hora);
        return;
      }
    }
  }

  limpiarEvento() {
    this.evento = {
      id: "",
      nombre: "",
      descripcion: "",
      fecha: "",
      hora: "",
      lugar: "",
      costo: 0,
      tipo: "",
      organizador: "",
      dependencia: "",
      privacidad: "Público",
      asientos: null
    }
  }
}
