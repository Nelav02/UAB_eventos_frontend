import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudService } from 'src/app/services/solicitudes/solicitud.service';

export interface EventoId {
  id: number;
}

@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.css']
})
export class ListaParticipantesComponent implements OnInit {

  toppings = new FormControl('');

  listaParticipantes: any[] = []

  constructor(
    public dialogRef: MatDialogRef<ListaParticipantesComponent>,
    private solicitudService: SolicitudService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private eventoId: EventoId
  ) { }

  ngOnInit(): void {
    this.obtenerListaParticipantes();
    console.log(this.toppings.value?.[0])
  }

  cancelar() {
    this.dialogRef.close();
  }

  public getEmail(user: any): string {
    return user.email
  }

  private obtenerListaParticipantes() {
    this.solicitudService.obtenerUsuariosPorEvento(this.eventoId.id).subscribe(
      (response) => {
        this.listaParticipantes = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
