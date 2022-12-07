import { TestBed } from '@angular/core/testing';

import { CompleteRegistrationService } from './complete-registration.service';

describe('CompleteRegistrationService', () => {
  let service: CompleteRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
