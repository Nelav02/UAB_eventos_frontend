import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _refresh$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refresh$() {
    return this._refresh$;
  }

  public registrarUsuario(user: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/auth/register`, user)
        .pipe(
          tap(() => {
            this._refresh$.next();
          })
        );
  }

  public obtenerListaUsuarios(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/api/management/getAll`);
  }

  public actualizarUsuario(user: any, id: number) {
    let param = new HttpParams().set('id', id.toString());
    return this.httpClient.put(`${baseUrl}/api/management/update`, user, {params: param})
        .pipe(
          tap(() => {
            this._refresh$.next();
          })
        );
  }

  public eliminarUsuario(id: number): Observable<any> {
    let params = new HttpParams().set('id', id.toString());
    return this.httpClient.delete(`${baseUrl}/api/management/delete`, {params: params})
        .pipe(
          tap(() => {
            this._refresh$.next();
          }) 
        );
  }
}
