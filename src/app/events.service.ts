import { Injectable } from '@angular/core';
import { EventModel } from 'src/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsArray: EventModel[] = [{
    id: "2",
    nombre: "alo",
    descripcion: "Es una AFI",
    fecha: "2024-05-30",
    hora: "14:00",
    lugar: "Pozo",
    costo: 0,
    tipo: "AFI",
    organizador: "RH",
    dependencia: "FCFM",
    privacidad: "Público",
    asientos: null
  },
  {
    id: "5",
    nombre: "ola",
    descripcion: "Es un Webinar",
    fecha: "2024-05-28",
    hora: "16:00",
    lugar: "El Pozo",
    costo: 0,
    tipo: "Webinar",
    organizador: "ADMIN",
    dependencia: "FCB",
    privacidad: "Público",
    asientos: 20
  }];

  private idArray: string[] = [];

  private idBuscar: string = "";

  obtenerIds() {
    for (let evento of this.eventsArray) {
      this.idArray.push(evento.id);
    }
  }

  get events() {
    return this.eventsArray;
  }

  get Ids() {
    return this.idArray;
  }

  set Id(id: string) {
    this.idBuscar = id;
  }

  get Id() {
    return this.idBuscar;
  }

  eventoPorId(id: string) {
    for (let evento of this.eventsArray) {
      if (evento.id === id) return evento;
    }
    return null;
  }

  constructor() {
    /** Función para obtener eventsArray */
    this.obtenerIds();
  }

  /** Obtener eventsArray directamente desde la base de datos */
}
