import { TestBed, inject } from '@angular/core/testing';
import {Http, HttpModule} from '@angular/http';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [ HttpModule ]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));
});
