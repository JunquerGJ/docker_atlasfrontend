import { TestBed } from '@angular/core/testing';

import { IpsService } from './ips.service';

describe('IpsService', () => {
  let service: IpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
