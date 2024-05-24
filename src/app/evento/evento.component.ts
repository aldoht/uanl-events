import { Component, OnInit, Input } from '@angular/core';
import { EventModel } from 'src/models/event.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
})
export class EventoComponent  implements OnInit {
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

  @Input() inputId!: string;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    if (this.inputId) {
      this.dataPorId(this.inputId);
    }
  }

  dataPorId(id: string) {
    for (let evento of this.eventsService.events) {
      if (evento.id === id) {
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
        return;
      }
    }
  }
}
