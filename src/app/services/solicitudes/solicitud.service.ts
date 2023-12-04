import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public registrarSolicitud(userId: number, eventoId: number): Observable<any> {
    let params = new HttpParams().set('userId', userId.toString()).set('eventoId', eventoId);
    return this.httpClient.post(`${baseUrl}/request/management/saveSolicitud`, null, {params: params});
  }

  public eliminarSolicitud(userId: number, eventoId: number): Observable<any> {
    let params = new HttpParams().set('userId', userId.toString()).set('eventoId', eventoId);
    return this.httpClient.delete(`${baseUrl}/request/management/deleteSolicitud`, {params: params});
  }

  public obtenerUsuariosPorEvento(eventoId: number): Observable<any> {
    let param = new HttpParams().set('eventoId', eventoId.toString());
    return this.httpClient.get(`${baseUrl}/request/management/getUsersByEventoId`, {params: param});
  }

  public confirmarSolicitud(userId: number, eventoId: number): Observable<any> {
    let params = new HttpParams().set('userId', userId.toString()).set('eventoId', eventoId);
    return this.httpClient.delete(`${baseUrl}/request/management/confirmarSolicitud`, {params: params});
  }
}
