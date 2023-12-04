import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudService } from 'src/app/services/solicitudes/solicitud.service';

export interface SolicitudData {
  userId: number,
  eventoId: number
}

@Component({
  selector: 'app-enviar-solicitud',
  templateUrl: './enviar-solicitud.component.html',
  styleUrls: ['./enviar-solicitud.component.css']
})
export class EnviarSolicitudComponent {

  constructor(
    public dialogRef: MatDialogRef<EnviarSolicitudComponent>,
    private solicitudService: SolicitudService,
    private matSnack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: SolicitudData
  ) { }

  cancelar() {
    this.dialogRef.close({ solicitudEnviada: false });
  }

  enviarSolicitud() {
    this.solicitudService.registrarSolicitud(this.data.userId, this.data.eventoId).subscribe(
      (result) => {
        console.log(result);
        if (result) {
          this.dialogRef.close({ solicitudEnviada: true });
          this.matSnack.open('Solicitud enviada !', 'Aceptar', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
          });
        } else {
          this.dialogRef.close({ solicitudEnviada: false });
          this.matSnack.open('Ya enviaste la solicitud antes !', 'Aceptar', {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
            duration: 5000
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
