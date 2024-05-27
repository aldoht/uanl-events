import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  async obtenerUsuarioPorId(id: string) {
    try {
      const url = 'http://localhost:58683/api/users/' + id;
      const res = await fetch(url);
      const usuariosFromDb = await res.json();
      
      console.log(usuariosFromDb);
      return usuariosFromDb;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  }
}
