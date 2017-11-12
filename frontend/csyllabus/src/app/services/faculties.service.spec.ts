import { TestBed, inject } from '@angular/core/testing';
import {Http, HttpModule} from '@angular/http';
import { FacultiesService } from './faculties.service';

describe('FacultiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultiesService],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([FacultiesService], (service: FacultiesService) => {
    expect(service).toBeTruthy();
  }));
});
