import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincuentasComponent } from './admincuentas.component';

describe('AdmincuentasComponent', () => {
  let component: AdmincuentasComponent;
  let fixture: ComponentFixture<AdmincuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincuentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
