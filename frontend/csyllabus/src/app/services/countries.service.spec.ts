import { TestBed, inject } from '@angular/core/testing';
import {Http, HttpModule} from '@angular/http';
import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountriesService],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([CountriesService], (service: CountriesService) => {
    expect(service).toBeTruthy();
  }));
});
