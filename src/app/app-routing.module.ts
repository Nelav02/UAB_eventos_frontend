import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { adminGuard } from './services/guards/admin.guard';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { userGuard } from './services/guards/user.guard';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { ListaEventosGeneralesComponent } from './user/eventos-generales/lista-eventos-generales/lista-eventos-generales.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DashboardAdminComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'lista_usuarios',
        component: ListaUsuariosComponent
      },
      {
        path: 'lista_eventos_generales',
        component: ListaEventosComponent
      }
    ]
  },
  {
    path: 'user',
    component: DashboardUserComponent,
    canActivate: [userGuard],
    children: [
      {
        path: 'lista_eventos_generales',
        component: ListaEventosGeneralesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
