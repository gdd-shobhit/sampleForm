import { TestBed, async, inject } from '@angular/core/testing';

import { EnrollmentGuard } from './enrollment.guard';

describe('EnrollmentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrollmentGuard]
    });
  });

  it('should ...', inject([EnrollmentGuard], (guard: EnrollmentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
