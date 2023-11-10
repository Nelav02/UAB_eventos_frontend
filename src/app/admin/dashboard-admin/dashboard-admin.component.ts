import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  // - NavBar ------------------------------
  isLoggedIn = false;
  user: any = null;

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(
      (data) => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
      }
    )
  }

  public logOut() {
    this.loginService.logOut();
    this.router.navigate(['']);
  }
  // - NavBar ------------------------------

}
