import { Component, OnInit } from '@angular/core';
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

  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  loginData = {
    email : '',
    password : ''
  }

  constructor(
    private snack: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void { 
    this.loginService.logOut();
  }

  formSubmit() {

    if (this.loginData.email.trim() == "" || this.loginData.email.trim() == null) {
      this.snack.open('El email es requerido !', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    if (this.loginData.password.trim() == "" || this.loginData.password.trim() == null) {
      this.snack.open('La contraseña es requerida !', 'Aceptar', {
        duration: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
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
        this.snack.open('Detalles inválidos, vuelva a intentarlo !', 'Aceptar', {
          duration: 3000
        });
      }
    );
  }
}