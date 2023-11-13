import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users/user.service';
import { RegistrarUsuarioComponent } from '../registrar-usuario/registrar-usuario.component';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';
import { ActualizarUsuarioComponent } from '../actualizar-usuario/actualizar-usuario.component';
import { ActualizarCuentaComponent } from '../actualizar-cuenta/actualizar-cuenta.component';

export interface UserData {
  id: number,
  nombre: string,
  apellidos: string,
  email: string,
  telefono: string,
  genero: string,
  roles: any,
  banco: string,
  cuentasBancarias: any
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'email', 'genero', 'rol', 'celular', 'acciones'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]);
  listaUsuario: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true} ) sort !: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios() {
    this.userService.obtenerListaUsuarios().subscribe(
      (datos) => {
        this.listaUsuario = datos;
        this.dataSource.data = this.listaUsuario;
        console.log(this.dataSource.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarUsuarioDialog(id: number) {
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  actualizarUsuarioDialog(id: number) {
    let userUpdate = this.dataSource.data.find(user => user.id === id);

    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      data: { user: userUpdate }
    });
  }

  editarCuentaBancaria(id: number) {
    let userUpdate = this.dataSource.data.find(user => user.id === id);

    const cuentaUpdate = this.dialog.open(ActualizarCuentaComponent, {
      data: { user: userUpdate }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregarUsuarioDialog(): void {
    const dialogRef = this.dialog.open(RegistrarUsuarioComponent, { });

    dialogRef.afterClosed().subscribe(result => { });
  }
}