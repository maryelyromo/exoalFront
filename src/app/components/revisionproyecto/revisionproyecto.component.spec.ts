import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionproyectoComponent } from './revisionproyecto.component';

describe('RevisionproyectoComponent', () => {
  let component: RevisionproyectoComponent;
  let fixture: ComponentFixture<RevisionproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionproyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
