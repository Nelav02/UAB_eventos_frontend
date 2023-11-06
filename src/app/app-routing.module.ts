import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { adminGuard } from './services/guards/admin.guard';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { userGuard } from './services/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardAdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'user',
    component: DashboardUserComponent,
    canActivate: [userGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
