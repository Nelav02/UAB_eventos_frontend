import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../lista-usuarios/lista-usuarios.component';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit{

  //form: FormGroup;

  email = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required, Validators.minLength(4)])

  hide = true;

  constructor(
    public dialogRef: MatDialogRef<RegistrarUsuarioComponent>,
    //private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    //this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    /*this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });*/
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'Email es requerido';
    }
    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'Constraseña es requerida';
    }
    return this.password.hasError('minlength') ? 'Mínimo 4 carácteres' : '';
  }
}
