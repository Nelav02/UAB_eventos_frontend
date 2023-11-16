import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  private _refresh$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refresh$() {
    return this._refresh$;
  }

  public obtenerCuentasBancarias(id: number): Observable<any> {
    let param1 = new HttpParams().set('userId', id.toString())
    return this.httpClient.get(`${baseUrl}/api/bank/getCuentasBancarias`, {params: param1});
  }

  public agregarCuentaBancaria(param1: string, param2: string, param3: number) {
    const body = {
      banco: param1,
      cuenta: param2,
      userId: param3
    };
    
    return this.httpClient.post(`${baseUrl}/api/bank/addCuentaBancaria`, body)
        .pipe(
          tap(() => {
            this._refresh$.next();
          })
        );
  }

  public eliminarCuentaBancaria(id: number) {
    let param1 = new HttpParams().set('idCuenta', id.toString());
    return this.httpClient.delete(`${baseUrl}/api/bank/deleteCuentaBancaria`, {params: param1})
        .pipe(
          tap(() => {
            this._refresh$.next();
          })
        );
  }
}
