import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';
import { UserData } from '../lista-usuarios/lista-usuarios.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit{

  hide = true;

  formulario : FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(5)]),
    phone: new FormControl('',[Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]*$')]),
    genero: new FormControl('',[Validators.required]),
    rol: new FormControl('',[Validators.required]),
    cuentasBancarias: new FormArray([])
  });

  cuentaForm : FormGroup = new FormGroup({
    banco: new FormControl('',[Validators.required]),
    cuenta: new FormControl('', [Validators.required])
  })

  constructor(
    public dialogRef: MatDialogRef<RegistrarUsuarioComponent>,
    private userService: UserService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formulario.get('rol')?.valueChanges.subscribe(role => this.onRoleChange(role));
    this.onRoleChange(this.formulario.get('rol')?.value);
  }

  cancelar(): void {
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

  getBankError() {
    return this.formulario.get('banco')?.hasError('required') ? 'Banco es requerido' : '';
  }

  getCuentaBancariaError() {
    return this.formulario.get('cuenta')?.hasError('required') ? 'Cuenta es requerida' : '';
  }

  registrarUser() {

    if (this.formulario.invalid || this.cuentaForm.invalid) {
      console.log('hola')
      return;
    }

    if (this.formulario.get('rol')?.value === 'USER') {
      (this.formulario.get('cuentasBancarias') as FormArray).push(this.cuentaForm);
    }

    let newUser: any = {
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password')?.value,
      nombre: this.formulario.get('name')?.value,
      apellidos: this.formulario.get('last_name')?.value,
      telefono: this.formulario.get('phone')?.value,
      genero: this.formulario.get('genero')?.value,
      banco: this.formulario.get('banco')?.value,
      cuentasbancarias: this.formulario.get('cuentasBancarias')?.value,
      roles: [this.formulario.get('rol')?.value,]
    }

    newUser.cuentasbancarias = newUser.cuentasbancarias.reduce((map: {[key: string]: string}, obj: {banco: string, cuenta: string}) => {
      map[obj.banco] = obj.cuenta;
      return map;
    }, {});

    this.userService.registrarUsuario(newUser).subscribe(
      (response) => {
        this.dialogRef.close();
        this.snack.open('Usuario registrado !', 'Aceptar',{
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 3000
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onRoleChange(rol: string) {
    if (rol == 'USER') {
      this.cuentaForm.get('banco')?.enable();
      this.cuentaForm.get('cuenta')?.enable();
    } else {
      this.cuentaForm.get('banco')?.disable();
      this.cuentaForm.get('cuenta')?.disable();
    }
  }
}
