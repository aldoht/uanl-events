import { Injectable } from '@angular/core';
import { EventModel } from 'src/models/event.model';
import { UsersService } from './users.service';
import { firebaseService } from './firebase-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsArray: EventModel[] = [];
  private idArray: string[] = [];
  private dependenciasArray: string[] = ["Rectoría", "FCFM", "FCB", "FIME", "FCQ", "FACPYA", "FAECO", "FAEN", "FACPYRI", "FARQ"];
  private tiposArray: string[] = [
    "Académico", "AFI", "Becas", "Caminata", "Campamento", "Campaña", "Cátedra", "Ceremonia", "Certamen", "Certificación",
    "Ciclo de película", "Clase magistral", "Coloquio", "Concurso", "Conferencia", "Congreso", "Convocatoria", "Cultural", "Cumbre",
    "Curso", "Danza", "Deportes", "Diálogo", "Diplomado", "Emprendimiento", "Encuentro", "Espectáculo", "Espectáculo Danza", "Eventos",
    "Exposición", "Feria", "Jornada", "Masterclass", "Musical", "Ópera", "Pláticas", "Premio", "Presentación", "Programa", "Recorridos",
    "Responsabilidad Social", "Reunión", "Seminario", "Sesión", "Sesión Informativa", "Simposio", "Sorteo", "Taller", "Teatro", "Torneo",
    "Transmisión", "Turismo", "Webinar"
  ];
  private idBuscar: string = "";

  constructor(private fbService: firebaseService) {
  }

  async obtenerEventos(): Promise<EventModel[]> {
    try {
      const url = 'http://localhost:58683/api/event';
      const res = await fetch(url);
      const eventosFromDb = await res.json();

      console.log(eventosFromDb);
      
      const eventos = eventosFromDb.map((eventFromDb: any) => {
        return {
          id: eventFromDb.IdEvento,
          nombre: eventFromDb.Nombre,
          descripcion: eventFromDb.Descripcion,
          fecha: eventFromDb.Fecha.slice(0, 10),
          hora: eventFromDb.Hora,
          lugar: eventFromDb.Lugar,
          costo: eventFromDb.Costo,
          tipo: this.tiposArray[eventFromDb.IdTipo - 1],
          organizador: eventFromDb.IdUsuario,
          dependencia: this.dependenciasArray[eventFromDb.IdDependencia - 1],
          privacidad: "Público",
          asientos: eventFromDb.cupo
        } as EventModel;
      });

      return eventos;
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  }

  async actualizarEventsArray() {
    try {
      this.eventsArray = await this.obtenerEventos();
      this.obtenerIds(); // Actualiza también el arreglo de IDs
    } catch (error) {
      console.error('Error al actualizar eventsArray:', error);
    }
  }

  obtenerIds() {
    this.idArray = this.eventsArray.map(evento => evento.id);
  }

  get events(): EventModel[] {
    return this.eventsArray;
  }

  get Ids(): string[] {
    return this.idArray;
  }

  set Id(id: string) {
    this.idBuscar = id;
  }

  get Id(): string {
    return this.idBuscar;
  }

  eventoPorId(id: string): EventModel | null {
    return this.eventsArray.find(evento => evento.id === id) || null;
  }
}
