import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { RegistrarEventoComponent } from '../registrar-evento/registrar-evento.component';
import { EliminarEventoComponent } from '../eliminar-evento/eliminar-evento.component';
import { ActualizarEventoComponent } from '../actualizar-evento/actualizar-evento.component';
import { ListaParticipantesComponent } from '../lista-participantes/lista-participantes.component';

export interface EventoData {
  id: number,
  titulo: string,
  lugar: string,
  fecha: string,
  horaInicio: string,
  horaFinal: string,
  requerimientos: string,
}

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  listaEventosGenerales !: EventoData[];
  suscription !: Subscription

  constructor(
    private eventoService: EventosService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerEventosGenerales();

    this.suscription = this.eventoService.refresh$.subscribe(() => {
      this.obtenerEventosGenerales();
    })
  }

  private obtenerEventosGenerales() {
    this.eventoService.obtenerEventosPorFase('GENERAL').subscribe(
      (datos) => {
        this.listaEventosGenerales = datos;
        console.log(this.listaEventosGenerales);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarEventoDialog() {
    const dialoRef = this.dialog.open(RegistrarEventoComponent, { });

    dialoRef.afterClosed().subscribe(result => { });
  }

  actualizaEventoDialog(id: number) {
    let eventoUpdate = this.listaEventosGenerales.find(evento => evento.id === id);

    const dialogRef = this.dialog.open(ActualizarEventoComponent, {
      data: { evento: eventoUpdate}
    });
  }

  seleccionarParticipantesEvento(id: number) {
    let dialogRef = this.dialog.open(ListaParticipantesComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  eliminarEventoDialog(id: number) {
    const dialogRef = this.dialog.open(EliminarEventoComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => { });
  }
}
