import { TestBed, inject } from '@angular/core/testing';

import { FacultiesService } from './faculties.service';

describe('FacultiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultiesService]
    });
  });

  it('should be created', inject([FacultiesService], (service: FacultiesService) => {
    expect(service).toBeTruthy();
  }));
});
