import { TestBed } from '@angular/core/testing';

import { VideosDataService } from './videos-data.service';

describe('VideosDataService', () => {
  let service: VideosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
