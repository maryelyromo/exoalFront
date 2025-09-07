import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosrevisadosComponent } from './proyectosrevisados.component';

describe('ProyectosrevisadosComponent', () => {
  let component: ProyectosrevisadosComponent;
  let fixture: ComponentFixture<ProyectosrevisadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosrevisadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosrevisadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
