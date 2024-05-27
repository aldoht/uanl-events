import { Injectable, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, Auth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class firebaseService {

  private firebaseAuth = inject(Auth);

  constructor(private router: Router, private notServ: NotificationsService) {
  }

  createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  login(email: string, password: string) {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }

  checkLogged(): boolean {
    const auth = getAuth();
    let logged = false;
    onAuthStateChanged(auth, (user) => {
      logged = user ? true : false;
    });
    return logged;
  }

  get auth() {
    return this.firebaseAuth;
  }

  authUser() {
    return getAuth().currentUser;
  }

  get isAuthenticated(): boolean {
    return this.authUser() !== null;
  }

  get shouldSetup(): boolean {
    return this.isAuthenticated;
  }
}

