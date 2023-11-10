import { TestBed } from '@angular/core/testing';

import { VideoTypeService } from './video-type.service';

describe('VideoTypeService', () => {
  let service: VideoTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
