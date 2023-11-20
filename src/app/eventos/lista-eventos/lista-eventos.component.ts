import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/services/eventos/eventos.service';

export interface EventoData {
  id: number,
  titulo: string,
  lugar: string,
  fecha: string,
  horaInicio: string,
  horaFinal: string,
  requerimientos: string,
}

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  listaEventos !: EventoData[];
  suscription !: Subscription

  constructor(
    private eventoService: EventosService
  ) { }

  ngOnInit(): void {
    this.obtenerEventos();

    this.suscription = this.eventoService.refresh$.subscribe(() => {
      this.obtenerEventos();
    })
  }

  private obtenerEventos() {
    this.eventoService.obtenerListaEventos().subscribe(
      (datos) => {
        this.listaEventos = datos;
        console.log(this.listaEventos);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
