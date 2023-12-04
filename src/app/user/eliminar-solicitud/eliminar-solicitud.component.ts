import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudService } from 'src/app/services/solicitudes/solicitud.service';
import { SolicitudData } from '../eventos-generales/enviar-solicitud/enviar-solicitud.component';

@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarSolicitudComponent>,
    private solicitudService: SolicitudService,
    private matSnack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: SolicitudData
  ) { }

  cancelar() {
    this.dialogRef.close({ solicitudEnviada: false });
  }

  eliminar() {
    this.solicitudService.eliminarSolicitud(this.data.userId, this.data.eventoId).subscribe(
      (result) => {
        console.log(result);
        if (result) {
          this.dialogRef.close({ solicitudEnviada: true });
          this.matSnack.open('Solicitud eliminada !', 'Aceptar', {
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
