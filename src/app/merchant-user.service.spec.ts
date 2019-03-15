import { TestBed } from '@angular/core/testing';

import { MerchantUserService } from './merchant-user.service';

describe('MerchantUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchantUserService = TestBed.get(MerchantUserService);
    expect(service).toBeTruthy();
  });
});
