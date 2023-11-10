import { TestBed } from '@angular/core/testing';

import { UrlExistsService } from './url-exists.service';

describe('UrlExistsService', () => {
  let service: UrlExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
