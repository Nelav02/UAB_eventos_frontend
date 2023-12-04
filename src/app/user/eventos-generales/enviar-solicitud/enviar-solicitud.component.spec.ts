import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarSolicitudComponent } from './enviar-solicitud.component';

describe('EnviarSolicitudComponent', () => {
  let component: EnviarSolicitudComponent;
  let fixture: ComponentFixture<EnviarSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviarSolicitudComponent]
    });
    fixture = TestBed.createComponent(EnviarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
