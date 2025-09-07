import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectproyectoComponent } from './selectproyecto.component';

describe('SelectproyectoComponent', () => {
  let component: SelectproyectoComponent;
  let fixture: ComponentFixture<SelectproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectproyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
