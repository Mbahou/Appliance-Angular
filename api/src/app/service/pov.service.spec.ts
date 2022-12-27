import { TestBed } from '@angular/core/testing';

import { PovService } from './pov.service';

describe('PovService', () => {
  let service: PovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
