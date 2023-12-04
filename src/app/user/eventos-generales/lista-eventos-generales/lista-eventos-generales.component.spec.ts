import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEventosGeneralesComponent } from './lista-eventos-generales.component';

describe('ListaEventosGeneralesComponent', () => {
  let component: ListaEventosGeneralesComponent;
  let fixture: ComponentFixture<ListaEventosGeneralesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEventosGeneralesComponent]
    });
    fixture = TestBed.createComponent(ListaEventosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
