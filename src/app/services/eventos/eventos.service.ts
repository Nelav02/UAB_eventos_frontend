import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
}
