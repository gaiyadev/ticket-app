import { TestBed } from '@angular/core/testing';
import {AuthGuardGuard} from "./authguard.guard";


describe('AuthguardGuard', () => {
  let guard: AuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
