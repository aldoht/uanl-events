import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/models/event.model';
import { firebaseService } from '../firebase-service.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss'],
})
export class CrearEventoComponent  implements OnInit {
  fechaCompleta: string = "2024-05-27T00:00:00";
  evento: any = {
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
  arrayNumber: number[] = [];

  constructor(private router: Router, private http: HttpClient, private fbS: firebaseService) { }

  ngOnInit() {
  }
  
  enviarInfo() {
    this.evento.Fecha = this.fechaCompleta.slice(0,10);
    this.evento.Hora = this.fechaCompleta.slice(11);
    this.evento.IdUsuario = 'user1';
    this.evento.Costo = +this.evento.Costo;
    this.evento.IdCategoria = +this.evento.IdCategoria;
    this.evento.Cupo = +this.evento.Cupo;
    this.evento.IdDependencia = +this.evento.IdDependencia;
    if (this.evento.Cupo != 0) this.evento.EsNumerado = 1;
    let info = JSON.stringify(this.evento);
    /** Enviar datos a la base de datos */
    console.log(info);
    this.http.post('http://localhost:58683/api/event', info, {headers: {'Content-Type': 'application/json'}})
      .subscribe(
        (response) => {
          console.log('Evento creado correctamente', response);
        },
        (error) => {
          console.error('Error al crear el evento', error);
        }
      );
    /** Si todo es correcto, usar las siguientes líneas */
    this.evento = {
      Nombre: "",
      Descripcion: "",
      Fecha: "",
      Hora: "",
      Lugar: "",
      Costo: 0,
      IdCategoria: 1,
      IdUsuario: "",
      IdDependencia: 1,
      EsNumerado: false,
      Cupo: 0,
      Poster: "poster.jpg"
    }
    this.privacidad = "Público";
    this.router.navigate(['/home/']);
  }

  getNumberArray(num: number | null): number[] {
    if (!num) return [];
    let arr: number[] = [];
    for (let i = 0; i < num; i++) {
      arr.push(i);
    }
    console.log(arr);
    return arr;
  }
}
