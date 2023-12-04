import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventoData } from 'src/app/eventos/lista-eventos/lista-eventos.component';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SolicitudService } from 'src/app/services/solicitudes/solicitud.service';
import { EnviarSolicitudComponent } from '../enviar-solicitud/enviar-solicitud.component';
import { EliminarSolicitudComponent } from '../../eliminar-solicitud/eliminar-solicitud.component';

@Component({
  selector: 'app-lista-eventos-generales',
  templateUrl: './lista-eventos-generales.component.html',
  styleUrls: ['./lista-eventos-generales.component.css']
})
export class ListaEventosGeneralesComponent implements OnInit {

  listEventosGenerales !: EventoData[];
  suscription !: Subscription;
  user: any = null;
  botonSolicitar: boolean = false;

  constructor(
    private eventoService: EventosService,
    public dialog: MatDialog,
    private loginService: LoginService,
    private solicitudService: SolicitudService
  ) { }

  ngOnInit(): void {
    this.obtenerEventosGenerales();
    this.user = this.loginService.getUser();
    console.log(this.user.id)

    this.suscription = this.eventoService.refresh$.subscribe(() => {
      this.obtenerEventosGenerales();
    })
  }

  private obtenerEventosGenerales() {
    this.eventoService.obtenerEventosPorFase('GENERAL').subscribe(
      (datos) => {
        this.listEventosGenerales = datos;
        console.log(this.listEventosGenerales);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarSolicitudDialog(eventoId: number) {

    let dialogRef = this.dialog.open(EnviarSolicitudComponent, { 
      data: { userId: this.user.id, eventoId: eventoId }
    });

    dialogRef.afterClosed().subscribe(result => { 
      this.botonSolicitar = result.solicitudEnviada;
      console.log('creado:' + this.botonSolicitar);
    });
  }

  eliminarSolicitudDialog(eventoId: number) {

    let dialogRef = this.dialog.open(EliminarSolicitudComponent, {
      data: { userId: this.user.id, eventoId: eventoId }
    });

    dialogRef.afterClosed().subscribe(result => { 
      this.botonSolicitar = result.solicitudEnviada;
      console.log('eliminado:' + this.botonSolicitar);
    });
  }
}