export interface EventModel {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  costo: number;
  tipo: string;
  organizador: string;
  dependencia: string;
  privacidad: string;
  asientos: number | null;
}
