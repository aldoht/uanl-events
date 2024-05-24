import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  user: any = {
    username: "",
    passwd: ""
  }

  constructor(private router: Router) { }

  ngOnInit() {}

  iniciarSesion() {
    /** Consultar datos para validar el inicio de sesión,
     * si las credenciales son válidas, usar las siguientes líneas
     */
    this.user = {
      username: "",
      passwd: ""
    }
    this.router.navigate(['/home']);
  }

}
