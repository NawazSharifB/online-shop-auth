import { TestBed } from '@angular/core/testing';
import { ShopClientService } from './shop-client.service';

describe('ShopClientService', () => {
  let service: ShopClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
