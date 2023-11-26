import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventosService } from 'src/app/services/eventos/eventos.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY'
  }
}

@Component({
  selector: 'app-registrar-evento',
  templateUrl: './registrar-evento.component.html',
  styleUrls: ['./registrar-evento.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RegistrarEventoComponent {

  formulario: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    lugar: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    requerimientos: new FormControl('', [Validators.required]),
    fase: new FormControl('GENERAL', [Validators.required]),
    horaInicio: new FormControl('',[Validators.required]),
    horaFinal: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<RegistrarEventoComponent>,
    private eventoService: EventosService,
    private snack: MatSnackBar
  ) { }

  cancelar(): void {
    this.dialogRef.close();
  }

  registrarEvento() {
    if (this.formulario.invalid) {
      return;
    }

    let fecha = this.formulario.get('fecha')?.value;
    let fechaISO = fecha.toISOString().split('T')[0];
     

    let newEvento: any = {
      titulo: this.formulario.get('titulo')?.value,
      lugar: this.formulario.get('lugar')?.value,
      requerimientos: this.formulario.get('requerimientos')?.value,
      fecha: fechaISO,
      fase: [this.formulario.get('fase')?.value],
      horaInicio: this.formulario.get('horaInicio')?.value + ':00',
      horaFinal: this.formulario.get('horaFinal')?.value + ':00'
    }

    console.log(newEvento);
    this.eventoService.registrarEvento(newEvento).subscribe(
      (reponse) => {
        this.dialogRef.close();
        this.snack.open('Evento registrado !', 'Aceptar',{
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
        });
      },
      (error) => {
        this.snack.open('Error al registrar evento !', 'Aceptar',{
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
        });
        console.log(error);
      }
    );
  }

  getTituloError() {
    return this.formulario.get('titulo')?.hasError('required') ? 'Título es requerido' : '';
  }

  getLugarError() {
    return this.formulario.get('lugar')?.hasError('required') ? 'Lugar es requerido' : '';
  }

  getFechaError() {
    return this.formulario.get('fecha')?.hasError('required') ? 'Fecha es requerida' : '';
  }

  getRequerimientosError() {
    return this.formulario.get('requerimientos')?.hasError('required') ? 'Requerimientos es requerido' : '';
  }

  getHoraInicioError() {
    return this.formulario.get('horaInicio')?.hasError('required') ? 'Hora de inicio es requerida' : '';
  }

  getHoraFinalError() {
    return this.formulario.get('horaFinal')?.hasError('required') ? 'Hora de fin es requerida' : '';
  }

}
