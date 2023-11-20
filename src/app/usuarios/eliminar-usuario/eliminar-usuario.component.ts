import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/users/user.service';

export interface DeleteData {
  id: number;
}

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioComponent>,
    private userService: UserService,
    private matSnack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: DeleteData
  ) { }

  eliminar() {
    this.userService.eliminarUsuario(this.data.id).subscribe(
      (response) => {
        this.dialogRef.close();
        this.matSnack.open('Usuario eliminado !', 'Aceptar', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
        })
      },
      (error) => {
        console.log('Error al eliminar el usuario', error);
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
  }
}
