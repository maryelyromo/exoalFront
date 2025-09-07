import { TestBed } from '@angular/core/testing';

import { RevisorService } from './revisor.service';

describe('RevisorService', () => {
  let service: RevisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
