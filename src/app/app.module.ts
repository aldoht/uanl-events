import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"uanl-events","appId":"1:1095309073571:web:08a366ed453b127c1eb316","storageBucket":"uanl-events.appspot.com","apiKey":"AIzaSyBKqlewv8fmh670mkDVXJ6OU68Iw0jt_xw","authDomain":"uanl-events.firebaseapp.com","messagingSenderId":"1095309073571","measurementId":"G-WP5YSK0EZ0"})), provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}
