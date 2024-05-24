import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/models/event.model';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss'],
})
export class CrearEventoComponent  implements OnInit {
  fechaCompleta: string = "2024-05-27T00:00:00";
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
  arrayNumber: number[] = [];

  constructor(private router: Router) { }

  ngOnInit() {}

  enviarInfo() {
    this.evento.fecha = this.fechaCompleta.slice(0,10);
    this.evento.hora = this.fechaCompleta.slice(11);
    /** Validar los datos */
    /** Enviar datos a la base de datos */
    /** Si todo es correcto, usar las siguientes líneas */
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
