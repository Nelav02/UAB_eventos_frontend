import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public registrarUsuario(user: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/auth/register`, user);
  }

  public obtenerListaUsuarios(): Observable<any> {
    return this.httpClient.get(`${baseUrl}/api/management/getAll`);
  }

  public actualizarUsuario(user: any, id: number) {
    let param = new HttpParams().set('id', id.toString());
    return this.httpClient.put(`${baseUrl}/api/management/update`, user, {params: param});
  }

  public eliminarUsuario(id: number): Observable<any> {
    let params = new HttpParams().set('id', id.toString());
    return this.httpClient.delete(`${baseUrl}/api/management/delete`, {params: params});
  }
}
