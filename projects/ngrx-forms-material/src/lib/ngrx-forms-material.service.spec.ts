import { TestBed } from '@angular/core/testing';

import { NgrxFormsMaterialService } from './ngrx-forms-material.service';

describe('NgrxFormsMaterialService', () => {
  let service: NgrxFormsMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxFormsMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
