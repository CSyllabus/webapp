import { TestBed, inject } from '@angular/core/testing';
import {Http, HttpModule} from '@angular/http';
import { ProgramsService } from './programs.service';

describe('ProgramsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramsService],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([ProgramsService], (service: ProgramsService) => {
    expect(service).toBeTruthy();
  }));
});
