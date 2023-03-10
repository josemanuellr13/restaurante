import { TestBed } from '@angular/core/testing';

import { SesionLocalService } from './sesion-local.service';

describe('SesionLocalService', () => {
  let service: SesionLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
