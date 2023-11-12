import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/users/user.service';
import { UserData } from '../lista-usuarios/lista-usuarios.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserUpdate {
  user: UserData;
}

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit{

  hide = true;

  formulario !: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ActualizarUsuarioComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: UserUpdate
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      name: [this.data.user.nombre, [Validators.required]],
      last_name: [this.data.user.apellidos, [Validators.required]],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      phone: [this.data.user.telefono, [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      genero: [this.data.user.genero, [Validators.required]],
      rol: [this.data.user.roles[0].name, [Validators.required]]
    });
  }

  actualizarUser() {
    if (this.formulario.invalid) {
      return;
    }

    let userActualizado: any = {
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password')?.value,
      nombre: this.formulario.get('name')?.value,
      apellidos: this.formulario.get('last_name')?.value,
      telefono: this.formulario.get('phone')?.value,
      genero: this.formulario.get('genero')?.value,
      roles: [this.formulario.get('rol')?.value,]
    }

    this.userService.actualizarUsuario(userActualizado, this.data.user.id).subscribe(
      (response) => {
        this.dialogRef.close();
        this.snack.open('Usuario actualizado !', 'Aceptar',{
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
        });
      },
      (error) => {
        console.log('Error al registrar usuario',error);
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
  }

  getNameError() {
    return this.formulario.get('name')?.hasError('required') ? 'Nombre es requerido' : '';
  }

  getLastNameError() {
    return this.formulario.get('last_name')?.hasError('required') ? 'Apellido es requerido' : '';
  }

  getEmailError() {
    if (this.formulario.get('email')?.hasError('required')) {
      return 'Email es requerido';
    }
    return this.formulario.get('email')?.hasError('email') ? 'Email inválido' : '';
  }

  getPasswordError() {
    if (this.formulario.get('password')?.hasError('required')) {
      return 'Constraseña es requerida';
    }
    return this.formulario.get('password')?.hasError('minlength') ? 'Mínimo 5 carácteres' : '';
  }

  getPhoneNumberError() {
    if (this.formulario.get('phone')?.hasError('required')) {
      return 'Celular es requerido';
    }

    if (this.formulario.get('phone')?.hasError('pattern')) {
      return 'Ingresa solo números'
    }
    return this.formulario.get('phone')?.hasError('minlength') ? 'Mínimo 7 dígitos' : '';
  }

  getGenderError() {
    return this.formulario.get('genero')?.hasError('required') ? 'Género es requerido' : '';
  }

  getRolError() {
    return this.formulario.get('rol')?.hasError('required') ? 'Rol requerido' : '';
  }
}