import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {
  user: any = {
    username: "",
    correo: "",
    passwd: ""
  }

  constructor(private router: Router) { }

  ngOnInit() {}

  crearUsuario() {
    /** Validar los datos
     * y añadir el usuario a la base de datos,
     * luego usar las siguientes líneas
     */
    this.user = {
      username: "",
      correo: "",
      passw: ""
    }
    this.router.navigate(['/home/']);
  }

}
