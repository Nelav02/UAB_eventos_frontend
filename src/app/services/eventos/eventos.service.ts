import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import baseUrl from '../helper';
import { EventoData } from 'src/app/eventos/lista-eventos/lista-eventos.component';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private _refresh$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refresh$() {
    return this._refresh$;
  }

  public obtenerListaEventos(): Observable<EventoData[]> {
    return this.httpClient.get<EventoData[]>(`${baseUrl}/event/management/getAllEventos`);
  }

  public registrarEvento(evento: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/event/management/saveEvento`, evento)
        .pipe(
          tap(() => {
            this._refresh$.next();
          })
        );
  }

  public actualizarEvento(evento: any, id: number) {
    let param = new HttpParams().set('id', id.toString());
    return this.httpClient.put(`${baseUrl}/event/management/updateEvento`, evento, {params: param})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  public actualizarHorarioEvento(evento: any, id: number) {
    let param = new HttpParams().set('id', id.toString());
    return this.httpClient.put(`${baseUrl}/event/management/updateHorario`, evento, {params: param})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  public eliminarEvento(id: number): Observable<any> {
    let params = new HttpParams().set('id', id.toString());
    return this.httpClient.delete(`${baseUrl}/event/management/deleteEvento`, {params: params})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
