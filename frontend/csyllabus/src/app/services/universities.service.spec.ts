import { TestBed, inject } from '@angular/core/testing';
import {Http, HttpModule} from '@angular/http';
import { UniversitiesService } from './universities.service';

describe('UniversitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversitiesService],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([UniversitiesService], (service: UniversitiesService) => {
    expect(service).toBeTruthy();
  }));
});
