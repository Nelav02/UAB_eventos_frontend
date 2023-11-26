import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { DeleteData } from 'src/app/usuarios/eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-eliminar-evento',
  templateUrl: './eliminar-evento.component.html',
  styleUrls: ['./eliminar-evento.component.css']
})
export class EliminarEventoComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarEventoComponent>,
    private eventoService: EventosService,
    private matSnack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: DeleteData
  ) { }

  eliminar() {
    this.eventoService.eliminarEvento(this.data.id).subscribe(
      (response) => {
        this.dialogRef.close();
        this.matSnack.open('Evento eliminado !', 'Aceptar', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
        })
      },
      (error) => {
        console.log('Error al eliminar evento', error);
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
  }

}
