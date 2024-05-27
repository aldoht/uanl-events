import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/models/event.model';
import { EventsService } from '../events.service';
import { concat } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firebaseService } from '../firebase-service.service';

@Component({
  selector: 'app-gestionar-evento',
  templateUrl: './gestionar-evento.component.html',
  styleUrls: ['./gestionar-evento.component.scss'],
})
export class GestionarEventoComponent  implements OnInit {
  fechaCompleta: string;
  evento: any = {
    IdEvento: 0,
    Nombre: "",
    Descripcion: "",
    Fecha: "",
    Hora: "",
    Lugar: "",
    Costo: 0,
    IdCategoria: 1,
    IdUsuario: "",
    IdDependencia: 1,
    EsNumerado: 0,
    Cupo: 0,
    Poster: "poster.jpg"
  }
  privacidad: string = "";
  eventosArray: EventModel[] = [];
  todasIds: string[] = [];
  arrayNumber: number[] = [];

  getNumberArray(num: number | null): number[] {
    if (!num) return [];
    let arr: number[] = [];
    for (let i = 0; i < num; i++) {
      arr.push(i);
    }
    console.log(arr);
    return arr;
  }

  constructor(private router: Router, private eventsService: EventsService, private http: HttpClient, private fbService: firebaseService) {
    this.eventosArray = this.eventsService.events;
    this.todasIds = eventsService.Ids;
    this.fechaCompleta = "2024-05-27T00:00:00";
  }

  ngOnInit() {}

  modificarInfo() {
    this.evento.Fecha = this.fechaCompleta.slice(0,10);
    this.evento.Hora = this.fechaCompleta.slice(11);
    this.evento.IdEvento = +this.evento.IdEvento;
    this.evento.IdUsuario = this.fbService.authUser()?.uid;
    this.evento.Costo = +this.evento.Costo;
    this.evento.IdCategoria = +this.evento.IdCategoria;
    this.evento.Cupo = +this.evento.Cupo;
    this.evento.IdDependencia = +this.evento.IdDependencia;
    if (this.evento.Cupo != 0) this.evento.EsNumerado = 1;
    let info = JSON.stringify(this.evento);
    console.log(info);
    this.http.put('http://localhost:58683/api/event/' + this.evento.IdEvento, info, {headers: {'Content-Type': 'application/json'}})
      .subscribe(
        (response) => {
          console.log('Evento creado correctamente', response);
        },
        (error) => {
          console.error('Error al crear el evento', error);
        }
      );
    this.limpiarEvento();
    this.router.navigate(['/home/']);
  }

  async actualizarInfo() {
    this.eventosArray = await this.eventsService.obtenerEventos();
    console.log('ola', this.eventosArray);
    for (let evento of this.eventosArray) {
      if (evento.id == this.evento.IdEvento) {
        this.evento.Nombre = evento.nombre;
        this.evento.Descripcion = evento.descripcion;
        this.evento.Fecha = evento.fecha;
        this.evento.Hora = evento.hora;
        this.evento.Lugar = evento.lugar;
        this.evento.Costo = evento.costo;
        this.evento.IdCategoria = evento.tipo;
        this.evento.IdUsuario = evento.organizador;
        this.evento.IdDependencia = evento.dependencia;
        this.evento.Cupo = evento.asientos;
  
        // Actualiza la fecha completa
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
