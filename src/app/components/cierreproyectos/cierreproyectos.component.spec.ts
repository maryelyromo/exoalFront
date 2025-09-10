import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreproyectosComponent } from './cierreproyectos.component';

describe('CierreproyectosComponent', () => {
  let component: CierreproyectosComponent;
  let fixture: ComponentFixture<CierreproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CierreproyectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CierreproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
