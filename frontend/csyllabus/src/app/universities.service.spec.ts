import { TestBed, inject } from '@angular/core/testing';

import { UniversitiesService } from './universities.service';

describe('UniversitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversitiesService]
    });
  });

  it('should be created', inject([UniversitiesService], (service: UniversitiesService) => {
    expect(service).toBeTruthy();
  }));
});
