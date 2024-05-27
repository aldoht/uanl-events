import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firebaseService } from '../firebase-service.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  user: any = {
    uid: "",
    mail: "",
    passwd: ""
  }

  constructor(private router: Router, private nS: NotificationsService, private fbS: firebaseService) { }

  ngOnInit() {}

  iniciarSesion() {
    this.fbS.login(this.user.mail, this.user.passwd).subscribe(() => {
      if (this.fbS.isAuthenticated) {
        this.nS.createNotification("Inicio de sesión exitoso", "Success", 1500);
        this.router.navigate(['/home']);
      }
      else {
        this.nS.createNotification("Usuario o contraseña incorrectos", "Error", 1500);
      }
    });
    
    this.user = {
      uid: "",
      mail: "",
      passwd: ""
    }
    this.router.navigate(['/home']);
  }

}
