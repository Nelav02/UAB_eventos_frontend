import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Componentes de Angular Material
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { RegistrarUsuarioComponent } from './usuarios/registrar-usuario/registrar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';
import { ActualizarUsuarioComponent } from './usuarios/actualizar-usuario/actualizar-usuario.component';
import { ActualizarCuentaComponent } from './usuarios/actualizar-cuenta/actualizar-cuenta.component';
import { MY_FORMATS, RegistrarEventoComponent } from './eventos/registrar-evento/registrar-evento.component';
import { EliminarEventoComponent } from './eventos/eliminar-evento/eliminar-evento.component';
import { ActualizarEventoComponent } from './eventos/actualizar-evento/actualizar-evento.component';
import { ListaParticipantesComponent } from './eventos/lista-participantes/lista-participantes.component';
import { ListaEventosGeneralesComponent } from './user/eventos-generales/lista-eventos-generales/lista-eventos-generales.component';
import { EnviarSolicitudComponent } from './user/eventos-generales/enviar-solicitud/enviar-solicitud.component';
import { EliminarSolicitudComponent } from './user/eliminar-solicitud/eliminar-solicitud.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardAdminComponent,
    DashboardUserComponent,
    ListaEventosComponent,
    ListaUsuariosComponent,
    RegistrarUsuarioComponent,
    EliminarUsuarioComponent,
    ActualizarUsuarioComponent,
    ActualizarCuentaComponent,
    RegistrarEventoComponent,
    EliminarEventoComponent,
    ActualizarEventoComponent,
    ListaParticipantesComponent,
    ListaEventosGeneralesComponent,
    EnviarSolicitudComponent,
    EliminarSolicitudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    //FormControl,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    NgxMaterialTimepickerModule,
    NgxMatTimepickerModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
