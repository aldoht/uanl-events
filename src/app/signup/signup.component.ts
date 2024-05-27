import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from '../user.model';
import { firebaseService } from '../firebase-service.service';
import { NotificationsService } from '../notifications.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  user: userModel = {
    uid: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dependencia: 0,
    telefono: "",
    correo: "",
    passwd: ""
  }

  constructor(private router: Router, private firebaseService: firebaseService, private notServ: NotificationsService, private http: HttpClient) { }

  ngOnInit() {
    
  }

  allLetter(inputtxt: string) {
    var letters = /^[A-Za-z]+$/;
    return inputtxt.match(letters) ? true : false;
  }

  allNumbers(inputtxt: string) {
    var letters = /([0-9])\w{9}/;
    return inputtxt.match(letters) ? true : false;
  }
  
  crearUsuario() {
    /** Validación de datos */
    if (!this.allLetter(this.user.nombre) || !this.allLetter(this.user.apellidoPaterno) || !this.allLetter(this.user.apellidoMaterno)){
      this.notServ.createNotification("Nombre o apellido inválido", "danger", 1500);
      return;
    }
    if (!this.allNumbers(this.user.telefono)) {
      this.notServ.createNotification("Teléfono inválido", "danger", 1500);
      return;
    }
    /** Inserción a firebaseauth y asignación de uid */
    this.firebaseService.createUser(this.user.correo, this.user.passwd)
      .then((userCredential) => {
        this.user.uid = userCredential.user!.uid;
        if (this.user.uid === null) return;
        /** Inserción a la base de datos */
        let dbUser = {
          IdUsuario: this.user.uid,
          Nombre: this.user.nombre,
          ApellidoPaterno: this.user.apellidoPaterno,
          ApellidoMaterno: this.user.apellidoMaterno,
          IdDependencia: +this.user.dependencia,
          Telefono: this.user.telefono,
          Correo: this.user.correo,
          IdRol: 5
        }
        let db = JSON.stringify(dbUser);
        console.log(db);
        this.http.post('http://localhost:58683/api/user', db, {headers: {'Content-Type': 'application/json'}})
        .subscribe(
          (response) => {
            console.log('Evento creado correctamente', response);
          },
          (error) => {
            console.error('Error al crear el evento', error);
          }
        );
        this.user = {
          uid: "",
          nombre: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          dependencia: 0,
          telefono: "",
          correo: "",
          passwd: ""
        }
        this.notServ.createNotification("Se ha creado exitosamente la cuenta", "success", 1500);
        this.router.navigate(['/home/']);
      })
      .catch((reason) => {
        let message;

        switch (reason.message) {
          case "Firebase: Error (auth/invalid-email).":
            message = "Correo no válido.";
            break;
          case "Firebase: Error (auth/invalid-credential).":
            message = "Las credenciales no son válidas.";
            break;
          case "Firebase: Error (auth/weak-password).":
            message = "La contraseña debe de tener al menos 6 caracteres."
            break;
          case "Firebase: Error (auth/email-already-in-use).":
            message = "El correo ya fue vinculado a otra cuenta.";
            break;
          default:
            message = "Error desconocido";
            break;
        }

        this.notServ.createNotification(message, "danger", 1500);
      });
  }

}
