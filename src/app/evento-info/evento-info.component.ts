import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventModel } from 'src/models/event.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-evento-info',
  templateUrl: './evento-info.component.html',
  styleUrls: ['./evento-info.component.scss'],
})
export class EventoInfoComponent implements OnInit {
  id: string = "";
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
  };
  eventsArray: EventModel[] = [];
  isModalOpen = false;
  cardNumber: string = '';
  cardHolder: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  cvv: string = '';

  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private route: ActivatedRoute, private eventsService: EventsService, private router: Router, private modalController: ModalController) {
  }

  async ngOnInit() {
    await this.eventsService.actualizarEventsArray();
    this.eventsArray = this.eventsService.events;

    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.eventsService.Ids.find(id => id == this.id) === undefined) {
      this.router.navigate(["/home/**"]);
      return;
    }
    const event = this.eventoPorId(this.id);
    if (event) {
      console.log(event);
      this.evento = { ...event };
    }
  }

  eventoPorId(id: string): EventModel | undefined {
    return this.eventsService.events.find(evento => evento.id == id);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  generateQRCode() {
    var QRCode = require('qrcode');
    if (this.canvas) {
      QRCode.toCanvas(this.canvas.nativeElement, JSON.stringify(this.evento), function (error: any) {
        if (error) console.error(error)
        console.log('success!');
      });
      /** Reducir asientos en 1,
       * modificar en la base de datos y
       * reiniciar info del arreglo
       */
      this.cardNumber = '';
      this.cardHolder = '';
      this.expiryMonth = '';
      this.expiryYear = '';
      this.cvv = '';
    }
  }

  registrar() {
    /** Verificar que esté loggeado,
     * si no lo está, usar this.router.navigate(['/home/login/']);
     */
    this.setOpen(true);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}

