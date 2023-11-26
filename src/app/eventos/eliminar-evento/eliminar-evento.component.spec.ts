import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEventoComponent } from './eliminar-evento.component';

describe('EliminarEventoComponent', () => {
  let component: EliminarEventoComponent;
  let fixture: ComponentFixture<EliminarEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarEventoComponent]
    });
    fixture = TestBed.createComponent(EliminarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
