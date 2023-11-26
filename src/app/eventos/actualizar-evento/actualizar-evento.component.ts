import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { EventoData } from '../lista-eventos/lista-eventos.component';

export interface EventoUpdate {
  evento: EventoData
}

@Component({
  selector: 'app-actualizar-evento',
  templateUrl: './actualizar-evento.component.html',
  styleUrls: ['./actualizar-evento.component.css']
})
export class ActualizarEventoComponent implements OnInit {

  formulario !: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ActualizarEventoComponent>,
    private eventoService: EventosService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: EventoUpdate
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      titulo: [this.data.evento.titulo, [Validators.required]],
      lugar: [this.data.evento.lugar, [Validators.required]],
      fecha: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaFinal: ['', [Validators.required]],
      requerimientos: [this.data.evento.requerimientos, [Validators.required]]
    });
  }

  actualizarEvento() {

    if (this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);

    let fecha = this.formulario.get('fecha')?.value;
    let fechaISO = fecha.toISOString().split('T')[0];
     

    let eventoUpdate: any = {
      titulo: this.formulario.get('titulo')?.value,
      lugar: this.formulario.get('lugar')?.value,
      fecha: fechaISO,
      horaInicio: this.formulario.get('horaInicio')?.value + ':00',
      horaFinal: this.formulario.get('horaFinal')?.value + ':00',
      fase: ['GENERAL'],
      requerimientos: this.formulario.get('requerimientos')?.value
    }
    console.log(eventoUpdate);

    this.eventoService.actualizarEvento(eventoUpdate, this.data.evento.id).subscribe(
      (response) => {
        this.dialogRef.close();
        this.snack.open('Evento actualizado !', 'Aceptar',{
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
        });
      },
      (error) => {
        console.log('Error al actualizar usuario',error);
      }
    );

  }

  cancelar() {
    this.dialogRef.close();
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
