import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  formulario : FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(5)])
  });

  constructor(
    private snack: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void { 
    this.loginService.logOut();
  }

  getEmailError() {
    if (this.formulario.get('email')?.hasError('required')) {
      return 'Email requerido';
    }
    return this.formulario.get('email')?.hasError('email') ? 'Email inválido' : '';
  }

  getPasswordError() {
    if (this.formulario.get('password')?.hasError('required')) {
      return 'Contraseña requerida';
    }
    return this.formulario.get('password')?.hasError('minlength') ? 'Mínimo 5 carácteres' : '';
  }

  formSubmit() {

    if (this.formulario.invalid) {
      this.snack.open('Detalles inválidos, vuelva a intentarlo !', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    let loginData: any = {
      email : this.formulario.get('email')?.value,
      password : this.formulario.get('password')?.value
    }

    this.loginService.generateToken(loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user:any) => {
            this.loginService.setUser(user);
            console.log(user);

            if (this.loginService.getUserRole() == 'ROLE_ADMIN') {
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }
            else if (this.loginService.getUserRole() == 'ROLE_USER') {
              this.router.navigate(['user']);
              this.loginService.loginStatusSubject.next(true);
            }
            else {
              this.loginService.logOut();
            }
          });
      },
      (error) => {
        console.log(error);
        this.snack.open('Ocurrio un error en el sistema !', 'Aceptar', {
          duration: 3000
        });
      }
    );
  }
}