import { AfterViewInit, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/users/user.service';
import { UserUpdate } from '../actualizar-usuario/actualizar-usuario.component';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserData } from '../lista-usuarios/lista-usuarios.component';
import { CuentaBancariaService } from 'src/app/services/cuentaBancaria/cuenta-bancaria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface CuentaData {
  banco: string,
  cuenta: string
  userId: number
}

export interface UpdateCuentaData {
  id: number;
}

@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.css']
})
export class ActualizarCuentaComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['banco', 'cuenta', 'acciones'];
  dataSource: MatTableDataSource<CuentaData> = new _MatTableDataSource<CuentaData>([]);
  listaCuentas: any = [];
  suscription !: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort !: MatSort;

  formulario : FormGroup = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    cuenta: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<ActualizarCuentaComponent>,
    private cuentaService: CuentaBancariaService,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private userId: UpdateCuentaData
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerListaCuentasBancarias();

    this.suscription = this.cuentaService.refresh$.subscribe(() => {
      this.obtenerListaCuentasBancarias();
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('observable cerrado');
  }

  private obtenerListaCuentasBancarias() {
    this.cuentaService.obtenerCuentasBancarias(this.userId.id).subscribe(
      (response) => {
        this.listaCuentas = response;
        this.dataSource.data = this.listaCuentas;
        console.log(this.dataSource.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.dialogRef.close();
  }

  agregarCuentaBancaria() {

    if (this.formulario.invalid) {
      return;
    }

    let banco = this.formulario.get('banco')?.value;
    let cuenta = this.formulario.get('cuenta')?.value;

    this.cuentaService.agregarCuentaBancaria(banco, cuenta, this.userId.id).subscribe(
      (response) => {
        console.log(response);
        //this.dialogRef.close();
        this.snack.open('Cuenta bancaria registrada !', 'Aceptar',{
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

  eliminarCuenta(id: number) {
    this.cuentaService.eliminarCuentaBancaria(id).subscribe(
      (response) => {
        console.log(response);
        //this.dialogRef.close();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBankError() {
    return this.formulario.get('banco')?.hasError('required') ? 'Banco es requerido' : '';
  }

  getCuentaBancariaError() {
    return this.formulario.get('cuenta')?.hasError('required') ? 'Cuenta es requerida' : '';
  }
}
