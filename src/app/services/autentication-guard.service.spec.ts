import { TestBed } from '@angular/core/testing';

import { AutenticationGuardService } from './autentication-guard.service';

describe('AutenticationGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticationGuardService = TestBed.get(AutenticationGuardService);
    expect(service).toBeTruthy();
  });
});
