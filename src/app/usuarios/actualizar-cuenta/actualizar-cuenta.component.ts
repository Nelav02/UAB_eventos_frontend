import { AfterViewInit, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/users/user.service';
import { UserUpdate } from '../actualizar-usuario/actualizar-usuario.component';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface CuentaData {
  banco: string,
  cuenta: string
}

@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.css']
})
export class ActualizarCuentaComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['banco', 'cuenta', 'acciones'];
  dataSource: MatTableDataSource<CuentaData> = new _MatTableDataSource<CuentaData>([]);
  listaCuenta: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort !: MatSort;

  constructor(
    public dialogRef: MatDialogRef<ActualizarCuentaComponent>,
    private userService: UserService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: UserUpdate
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    const mapCuentaBancaria = this.data.user.cuentasBancarias;
    console.log(mapCuentaBancaria);
    this.listaCuenta = Array.from(mapCuentaBancaria, ([banco, cuenta]) => ({banco, cuenta}));
    console.log(this.listaCuenta);
    this.dataSource.data = this.listaCuenta;
    console.log(this.dataSource.data);
  }

}
